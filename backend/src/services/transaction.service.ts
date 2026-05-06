 import { PrismaClient, TransactionType } from '@prisma/client';
  import { NotFoundError } from '../utils/errors';

  const prisma = new PrismaClient();

  export const transactionService = {
    async create(userId: string, accountId: string, data: any) {
      return prisma.$transaction(async (tx) => {
        const account = await tx.account.findFirst({ where: { id: accountId, userId } });
        if (!account) throw new NotFoundError('Account not found');

        const amount = new Prisma.Decimal(data.amount);
        const newBalance = data.transactionType === TransactionType.DEBIT
          ? account.balance.minus(amount)
          : account.balance.plus(amount);
        await tx.account.update({ where: { id: accountId }, data: { balance: newBalance } });

        const transaction = await tx.transaction.create({
          data: { ...data, userId, accountId, amount },
        });

        await tx.auditLog.create({
          data: { userId, action: 'CREATE', entityType: 'Transaction', entityId: transaction.id, newValues: transaction
  },
        });

        return transaction;
      });
    },

    async list(userId: string, cursor?: string, limit = 20) {
      const txs = await prisma.transaction.findMany({
        where: { userId },
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        orderBy: { transactionDate: 'desc' },
      });
      return { data: txs.slice(0, limit), nextCursor: txs.length > limit ? txs[limit].id : null };
    },
  };

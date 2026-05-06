import { useEffect, useState } from 'react';
  import { motion } from 'framer-motion';
  import GlassCard from '../components/common/GlassCard';
  import { useTransactions } from '../../hooks/useTransactions';

  const Transactions = () => {
    const { data, isLoading, fetchNextPage } = useTransactions();
    const [cursor, setCursor] = useState<string | undefined>();

    useEffect(() => { if (cursor) fetchNextPage({ cursor }); }, [cursor]);

    if (isLoading) return <div>Loading...</div>;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="heading-1">Transactions</h1>
        <div className="space-y-4">
          {data?.pages.map((page) =>
            page.data.map((tx: any) => (
              <motion.div key={tx.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <GlassCard className="p-4 flex justify-between items-center">
                  <div>
                    <div className="body-text">{tx.description || 'No description'}</div>
                    <div className="caption">{new Date(tx.transactionDate).toLocaleDateString()}</div>
                  </div>
                  <div className={`heading-3 ${tx.transactionType === 'CREDIT' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.transactionType === 'CREDIT' ? '+' : '-'}${tx.amount}
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>
        {data?.pages[data.pages.length - 1]?.nextCursor && (
          <button onClick={() => setCursor(data.pages[data.pages.length - 1].nextCursor)} className="mt-4 p-2 bg-blue-500   text-white rounded-lg">Load More</button>
        )}
      </motion.div>
    );
  };

  export default Transactions;

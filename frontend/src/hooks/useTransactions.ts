import { useInfiniteQuery } from '@tanstack/react-query';
  import api from '../../utils/api';

  export const useTransactions = () => useInfiniteQuery({
    queryKey: ['transactions'],
    queryFn: ({ pageParam }) => api.get('/api/transactions', { params: { cursor: pageParam } }).then(res => res.data),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });

import { useInfiniteQuery } from '@tanstack/react-query';
import { useDependencies } from '../context/DependenciesContext';

export const useFeeds = (limit: number = 10, userId?: string) => {
  const { getFeedsUseCase } = useDependencies();

  return useInfiniteQuery({
    queryKey: ['feeds', userId],
    queryFn: ({ pageParam = 1 }) => getFeedsUseCase.execute(pageParam as number, limit, userId),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      const { page, totalPages } = lastPage.meta || {};
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

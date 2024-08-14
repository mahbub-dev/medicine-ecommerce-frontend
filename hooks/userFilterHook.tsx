// hooks/useOrderFilters.ts
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useOrderFilters = () => {
  const { query, push } = useRouter();

  // Get filter values from the query parameters
  const startDate = useMemo(() => query.startDate as string | undefined, [query.startDate]);
  const endDate = useMemo(() => query.endDate as string | undefined, [query.endDate]);
  const status = useMemo(() => query.status as string | undefined, [query.status]);

  // Function to set filter values in the query parameters
  const setFilter = (name: string, value: string | undefined) => {
    const newQuery = { ...query, [name]: value };
    push({
      pathname: '/orders',
      query: newQuery,
    });
  };

  return {
    startDate,
    endDate,
    status,
    setFilter,
  };
};

export default useOrderFilters;

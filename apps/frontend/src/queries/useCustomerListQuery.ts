import { objectToSearchParams } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';

type Params = {
  sortBy?: 'asc' | 'desc' | '';
  name?: string;
};

const getCustomers = async (params: Params) =>
  await (
    await fetch('http://localhost:4000/api/customers' + objectToSearchParams(params), {
      method: 'get',
    })
  ).json();

export const useCustomerListQuery = (params: Params = {}) =>
  useSuspenseQuery({
    queryKey: ['/api/customers', params],
    queryFn: () => getCustomers(params),
  });

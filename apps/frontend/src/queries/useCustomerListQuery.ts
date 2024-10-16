import { apiClient } from '@/core/ApiClient';
import { objectToSearchParams } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';

export type SortBy = 'asc' | 'desc' | '';
type Params = {
  sortBy: SortBy;
  name: string;
};

type Response = {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
}[];

const getCustomers = async (params: Params) =>
  await apiClient.get<Response>('/api/customers' + objectToSearchParams(params));

export const useCustomerListQuery = (params: Params) =>
  useSuspenseQuery({
    queryKey: ['/api/customers', params],
    queryFn: () => getCustomers(params),
  });

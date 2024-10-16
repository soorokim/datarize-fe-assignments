import { apiClient } from '@/core/ApiClient';
import { useSuspenseQuery } from '@tanstack/react-query';

type Params = {
  from?: string;
  to?: string;
};

type Response = {
  count: number;
  range: string;
}[];

const getPurchaseFrequency = async (params: Params) =>
  await apiClient.get<Response>('/api/purchase-frequency', { params });

export const usePurchaseFrequencyQuery = (params: Params) =>
  useSuspenseQuery({
    queryKey: ['/api/purchase-frequency', params],
    queryFn: () => getPurchaseFrequency(params),
  });

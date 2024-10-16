import { objectToSearchParams } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';

type Params = {
  from?: string;
  to?: string;
};

const getPurchaseFrequency = async (params: Params) =>
  await (
    await fetch('http://localhost:4000/api/purchase-frequency' + objectToSearchParams(params), { method: 'get' })
  ).json();

export const usePurchaseFrequencyQuery = (params: Params = {}) =>
  useSuspenseQuery({
    queryKey: ['/api/purchase-frequency', params],
    queryFn: () => getPurchaseFrequency(params),
  });

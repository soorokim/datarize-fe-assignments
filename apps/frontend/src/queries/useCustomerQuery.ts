import { apiClient } from '@/core/ApiClient';
import { useSuspenseQuery } from '@tanstack/react-query';

type Params = {
  id: number;
};

type Response = {
  date: string;
  imgSrc: string;
  price: number;
  product: string;
  quantity: number;
}[];

const getCustomer = async (params: Params) => await apiClient.get<Response>(`/api/customers/${params.id}/purchases`);

export const useCustomerQuery = (params: Params) =>
  useSuspenseQuery({
    queryKey: ['/api/customers/{id}/purchases', params],
    queryFn: () => getCustomer(params),
    select: (data) => data.map(({ quantity, ...rest }) => rest),
  });

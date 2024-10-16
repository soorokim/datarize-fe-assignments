import { useSuspenseQuery } from '@tanstack/react-query';

type Params = {
  id: number;
};

const getCustomer = async (params: Params) =>
  await (
    await fetch(`http://localhost:4000/api/customers/${params.id}/purchases`, {
      method: 'get',
    })
  ).json();

export const useCustomerQuery = (params: Params) =>
  useSuspenseQuery({
    queryKey: ['/api/customers/{id}/purchases', params],
    queryFn: () => getCustomer(params),
  });

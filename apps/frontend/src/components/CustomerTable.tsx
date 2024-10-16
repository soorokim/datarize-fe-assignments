import { useCustomerListQuery } from '@/queries/useCustomerListQuery';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const CustomerTable = ({
  name,
  sortBy,
  onClickRow,
}: {
  name: string;
  sortBy: 'asc' | 'desc' | '';
  onClickRow: (id: number) => void;
}) => {
  const { data } = useCustomerListQuery({ name, sortBy });
  const handleOnClick = (id: number) => () => onClickRow(id);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">ID</TableHead>
          <TableHead className="text-center">이름</TableHead>
          <TableHead className="text-center">총 구매 횟수</TableHead>
          <TableHead className="text-right">총 구매 금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(data as { id: number; name: string; count: number; totalAmount: number }[]).map(
          ({ id, name, count, totalAmount }) => (
            <TableRow key={id} onClick={handleOnClick(id)}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell className="text-center"> {count}</TableCell>
              <TableCell className="text-right">{totalAmount.toLocaleString()}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

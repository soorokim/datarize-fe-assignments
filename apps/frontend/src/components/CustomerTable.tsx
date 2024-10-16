import { SortBy, useCustomerListQuery } from '@/queries/useCustomerListQuery';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { numberToWonString } from '@/lib/utils';

export const CustomerTable = ({
  name,
  sortBy,
  onClickRow,
}: {
  name: string;
  sortBy: SortBy;
  onClickRow: (id: number) => void;
}) => {
  const { data, error, isFetching } = useCustomerListQuery({ name, sortBy });
  const handleOnClick = (id: number) => () => onClickRow(id);

  if (error && !isFetching) {
    throw error;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">ID</TableHead>
          <TableHead className="text-center">이름</TableHead>
          <TableHead className="text-center">총 구매 횟수</TableHead>
          <TableHead className="text-right">총 구매 금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, name, count, totalAmount }) => (
          <TableRow key={id} onClick={handleOnClick(id)}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell className="text-center"> {count}</TableCell>
            <TableCell className="text-right">{numberToWonString(totalAmount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

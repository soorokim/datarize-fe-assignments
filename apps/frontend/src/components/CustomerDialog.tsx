import { useCustomerQuery } from '@/queries/useCustomerQuery';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from './ui/table';
import { numberToWonString } from '@/lib/utils';

export const CustomerDialog = ({
  id,
  open,
  onOpenChange,
}: {
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { data } = useCustomerQuery({ id });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[50%]">
        <DialogHeader>
          <DialogTitle>구매내역 상세</DialogTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">구매 날짜</TableHead>
                <TableHead className="text-center">품목</TableHead>
                <TableHead className="text-center">가격</TableHead>
                <TableHead className="text-center">썸네일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(({ date, imgSrc, price, product }) => (
                <TableRow key={date + product}>
                  <TableCell className="text-center">{date}</TableCell>
                  <TableCell className="text-center">{product}</TableCell>
                  <TableCell className="text-center"> {numberToWonString(price)}</TableCell>
                  <TableCell className="text-center flex justify-center">
                    <img src={imgSrc} className="w-32 h-32 object-cover" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

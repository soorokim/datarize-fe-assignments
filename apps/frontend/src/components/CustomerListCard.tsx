import { Suspense, useRef, useState } from 'react';
import { CustomerTable } from './CustomerTable';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CustomerDialog } from './CustomerDialog';
import { SortBy } from '@/queries/useCustomerListQuery';

export const CustomerListCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('');
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const onSearch = () => {
    if (inputRef.current) {
      setName(inputRef.current.value);
    }
  };

  const onClickSort = (sort: SortBy) => () => {
    setSortBy(sort);
  };

  const onReset = () => {
    setSortBy('');
    setName('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onClickRow = (id: number) => {
    setSelectedId(id);
    setVisible(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>고객 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input ref={inputRef} className="w-200" placeholder="이름을 입력하세요" />
          <Button onClick={onSearch}>검색</Button>
          {sortBy === 'asc' ? (
            <Button onClick={onClickSort('desc')} variant="outline">
              내림차순
            </Button>
          ) : (
            <Button onClick={onClickSort('asc')} variant="outline">
              오름차순
            </Button>
          )}
          <Button onClick={onReset} variant="outline">
            초기화
          </Button>
        </div>
        <Suspense fallback="loading...">
          <CustomerTable name={name} sortBy={sortBy} onClickRow={onClickRow} />
        </Suspense>
      </CardContent>
      {visible && (
        <Suspense fallback="loading...">
          <CustomerDialog id={selectedId} open={visible} onOpenChange={setVisible} />
        </Suspense>
      )}
    </Card>
  );
};

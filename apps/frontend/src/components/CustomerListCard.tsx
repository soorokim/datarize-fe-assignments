import { Suspense, useRef, useState } from 'react';
import { CustomerTable } from './CustomerTable';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const CustomerListCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | ''>('');

  const onSearch = () => {
    if (inputRef.current) {
      setName(inputRef.current.value);
    }
  };

  const onClickSort = (sort: 'asc' | 'desc') => () => {
    setSortBy(sort);
  };

  const onInitialize = () => {
    setSortBy('');
    setName('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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
          <Button onClick={onInitialize} variant="outline">
            초기화
          </Button>
        </div>
        <Suspense fallback="loading...">
          <CustomerTable name={name} sortBy={sortBy} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

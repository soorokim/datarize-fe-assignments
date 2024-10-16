import { Suspense, useState } from 'react';
import { CustomerTable } from './CustomerTable';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CustomerDialog } from './CustomerDialog';
import { SortBy } from '@/queries/useCustomerListQuery';

const USERNAME_INPUT_NAME = 'name';

export const CustomerListCard = () => {
  const [name, setName] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('');
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const onClickSort = (sort: SortBy) => () => {
    setSortBy(sort);
  };

  const onReset = () => {
    setSortBy('');
    setName('');
  };

  const onClickRow = (id: number) => {
    setSelectedId(id);
    setVisible(true);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get(USERNAME_INPUT_NAME);
    if (typeof name === 'string') {
      setName(name ?? '');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>고객 목록</CardTitle>
        <form onSubmit={onSubmit}>
          <div className="flex gap-2">
            <Input name={USERNAME_INPUT_NAME} className="w-200" placeholder="이름을 입력하세요" />
            <Button type="submit">검색</Button>

            {sortBy === 'asc' ? (
              <Button onClick={onClickSort('desc')} variant="outline" type="button">
                내림차순
              </Button>
            ) : (
              <Button onClick={onClickSort('asc')} variant="outline" type="button">
                오름차순
              </Button>
            )}
            <Button onClick={onReset} variant="outline" type="reset">
              초기화
            </Button>
          </div>
        </form>
      </CardHeader>
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

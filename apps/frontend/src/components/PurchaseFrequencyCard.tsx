import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DatePickerWithRange } from './ui/date-picker-with-range';
import { Suspense, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from './ui/button';
import { PurchaseFrequencyChart } from './PurchaseFrequencyChart';
import { JULY_FIRST_DAY, JULY_LAST_DAY } from '@/constants';
import { kstToUtc } from '@/lib/utils';

export const PurchaseFrequencyCard = () => {
  const dateRangeRef = useRef<DateRange | undefined>();
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({
    from: kstToUtc(JULY_FIRST_DAY).toISOString(),
    to: kstToUtc(JULY_LAST_DAY).toISOString(),
  });

  const onClick = () => {
    if (dateRangeRef.current) {
      setDateRange({
        from: dateRangeRef.current.from && kstToUtc(dateRangeRef.current.from).toISOString(),
        to: dateRangeRef.current.to && kstToUtc(dateRangeRef.current.to).toISOString(),
      });
    }
  };

  const onChangeDateRange = (data: DateRange | undefined) => {
    dateRangeRef.current = data;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>가격대별 구매 빈도 차트</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <DatePickerWithRange onChange={onChangeDateRange} />
          <Button onClick={onClick}>검색</Button>
        </div>
        <Suspense fallback="loading...">
          <PurchaseFrequencyChart dateRange={dateRange} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

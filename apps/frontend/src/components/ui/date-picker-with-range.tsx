import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ko } from 'date-fns/locale';

const DATE_FORMAT = 'y년 M월 d일';

const toUTCString = (date?: Date) =>
  date ? new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())) : undefined;

const toKoFormatString = (date: Date) => format(date, DATE_FORMAT, { locale: ko });

export function DatePickerWithRange({
  onChange,
  className,
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  onChange: (data: DateRange | undefined) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  const handleOnChange = (data: DateRange | undefined) => {
    if (data) {
      const fromDate = toUTCString(data.from);
      const toDate = toUTCString(data.to);

      const utcDateRange = {
        from: fromDate,
        to: toDate,
      };
      onChange(utcDateRange);
      setDate(data);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {toKoFormatString(date.from)} - {toKoFormatString(date.to)}
                </>
              ) : (
                toKoFormatString(date.from)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disableNavigation
            locale={ko}
            initialFocus
            mode="range"
            defaultMonth={new Date(Date.UTC(2024, 6, 1, -9))}
            selected={date}
            onSelect={handleOnChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

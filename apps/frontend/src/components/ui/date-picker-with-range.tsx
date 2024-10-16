import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ko } from 'date-fns/locale';
import { JULY_FIRST_DAY, JULY_LAST_DAY } from '@/constants';

const DATE_FORMAT = 'y년 M월 d일';

const toKoFormatString = (date: Date) => format(date, DATE_FORMAT, { locale: ko });

export function DatePickerWithRange({
  onChange,
  className,
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  onChange: (data: DateRange | undefined) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: JULY_FIRST_DAY,
    to: JULY_LAST_DAY,
  });

  const handleOnChange = (data: DateRange | undefined) => {
    onChange(data);
    setDate(data);
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
            defaultMonth={JULY_FIRST_DAY}
            selected={date}
            onSelect={handleOnChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

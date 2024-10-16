import { usePurchaseFrequencyQuery } from '@/queries/usePurchaseFrequencyQuery';
import { BarChart, CartesianGrid, XAxis, Bar } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { numberToWonString } from '@/lib/utils';

const chartConfig = {
  count: {
    label: 'count',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export const PurchaseFrequencyChart = ({ dateRange }: { dateRange: { from?: string; to?: string } }) => {
  const { data, error, isFetching } = usePurchaseFrequencyQuery(dateRange);

  if (error && !isFetching) {
    throw error;
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={data as { count: number; range: string }[]}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="range"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            value
              .split(' - ')
              .map((n: string) => numberToWonString(parseInt(n)))
              .join(' - ')
          }
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" />
      </BarChart>
    </ChartContainer>
  );
};

import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, toDate } from "date-fns";

const DataCard = ({ data, isLoading, isError, error }) => {
  if (isLoading) return null;

  if (!data || isError) {
    return null;
  }

  const last30DaysEnergyProduction = data.slice(0, 30).map((el) => {
    return {
      date: format(toDate(el._id.date), "MMM d"),
      energy: el.totalEnergy,
    };
  });

  const chartConfig = {
    energy: {
      label: "Energy",
      color: "oklch(54.6% 0.245 262.881)",
    },
  };

  const title = "Last 30 days energy production";

  console.log(last30DaysEnergyProduction);

  return (
    <Card className="rounded-md p-4">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      <div>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={last30DaysEnergyProduction}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="energy"
              type="natural"
              fill="var(--color-energy)"
              fillOpacity={0.4}
              stroke="var(--color-energy)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default DataCard;

import { ChartDoughnut } from "../shared/chart-doughnut";
import { DataCard } from "../shared/data-card";
import { Flex } from "../shared/flex";

type DashboardChartsProps = {
  data: { incomes: {}; expenses: {} };
};

export const DashboardCharts = ({ data }: DashboardChartsProps) => {
  const styleCard = { width: { md: "100%" }, alignItems: "center" };
  return (
    <Flex fullwidth sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <DataCard sx={styleCard}>
        {data?.incomes && <ChartDoughnut data={data?.incomes} title="Tracked Incomes" />}
      </DataCard>
      <DataCard sx={styleCard}>
        {data?.expenses && <ChartDoughnut data={data?.expenses} title="Tracked Expenses" />}
      </DataCard>
    </Flex>
  );
};

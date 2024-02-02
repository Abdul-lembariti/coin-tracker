import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data, error } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );

  if (isLoading) {
    return <div>Loading chart...</div>;
  }

  if (error) {
    return <div>Error: </div>;
  }

  const chartData = data ? data.map((item) => ({
    x: new Date(item.time_close).getTime(),
    y: [item.open, item.high, item.low, item.close]
  })) : [];

  return (
    <ApexChart
      type="candlestick"
      series={[{ data: chartData }]}
      options={{
        theme: { mode: 'dark' },
        chart: { height: 300, width: 500, toolbar: { show: false }, background: 'transparent' },
        grid: { show: false },
        xaxis: { type: 'datetime', axisBorder: { show: false }, axisTicks: { show: false }, labels: { show: false } },
        tooltip: { x: { format: 'dd MMM yyyy' }, y: { formatter: (value) => `$${value.toFixed(2)}` } },
      }}
    />
  );
}

export default Chart;

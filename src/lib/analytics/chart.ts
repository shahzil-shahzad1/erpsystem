// types/chart.ts
export interface ChartDataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
  yAxisID?: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface SalesDataset {
  label: string;
  data: number[];
  borderColor: string[];
  backgroundColor: string[];
  borderWidth: number;
}

export interface SalesData {
  labels: string[];
  datasets: SalesDataset[];
}

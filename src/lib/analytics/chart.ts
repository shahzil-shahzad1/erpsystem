// types/chart.ts
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill?: boolean;
    borderColor?: string;
    tension?: number;
    backgroundColor?: string | string[];
    borderWidth?: number;
  }[];
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

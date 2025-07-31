import { supabase } from './supabase'

// Financial Trend Data
export async function getFinancialTrendData() {
  const { data, error } = await supabase
    .from('financial_trend')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw error

  return {
    labels: data.map(item => item.month),
    datasets: [
      { 
        label: 'Revenue ($K)', 
        data: data.map(item => item.revenue),
        fill: false, 
        borderColor: 'rgb(40, 167, 69)', 
        tension: 0.1 
      },
      { 
        label: 'Gross Profit ($K)', 
        data: data.map(item => item.gross_profit),
        fill: false, 
        borderColor: 'rgb(54, 162, 235)', 
        tension: 0.1 
      },
      { 
        label: 'Net Profit ($K)', 
        data: data.map(item => item.net_profit),
        fill: false, 
        borderColor: '#f5793b', 
        tension: 0.1 
      },
    ]
  }
}

export interface StatCardProps {
  id?: number;
  title: string;
  value: string;
  situation: string;
  status: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  trend?: string;
}

export async function getAnalyticsOverviewCards(): Promise<StatCardProps[]> {
  const { data, error } = await supabase
    .from('analytics_overview_cards')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;

  // Transform the data to match your frontend interface
  return data.map(item => ({
    id: item.id,
    title: item.title,
    value: item.value,
    situation: item.situation,
    status: item.status,
    icon: item.icon,
    iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-500",
    trend: item.trend || undefined
  }));
}

// Sales by Category Data
export async function getSalesByCategoryData() {
  const { data, error } = await supabase
    .from('sales_by_category')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw error

  return {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Sales ($K)',
        data: data.map(item => item.sales),
        backgroundColor: Array(data.length).fill('#f5793b'),
        borderColor: Array(data.length).fill('#f5793b'),
        borderWidth: 1,
      },
    ]
  }
}

// Inventory Flow Data
export async function getInventoryFlowData() {
  const { data, error } = await supabase
    .from('inventory_flow')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw error

  return {
    labels: data.map(item => item.quarter),
    datasets: [
      { 
        label: 'Inbound Units (K)', 
        data: data.map(item => item.inbound_units),
        fill: false, 
        borderColor: 'rgb(40, 167, 69)', 
        tension: 0.1, 
        yAxisID: 'y' 
      },
      { 
        label: 'Outbound Units (K)', 
        data: data.map(item => item.outbound_units),
        fill: false, 
        borderColor: '#f5793b', 
        tension: 0.1, 
        yAxisID: 'y' 
      },
      { 
        label: 'Inventory Value ($M)', 
        data: data.map(item => item.inventory_value),
        fill: false, 
        borderColor: 'rgb(54, 162, 235)', 
        tension: 0.1, 
        yAxisID: 'y1' 
      },
    ]
  }
}

// HR Cost Trend Data
export async function getHrCostTrendData() {
  const { data, error } = await supabase
    .from('hr_cost_trend')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw error

  return {
    labels: data.map(item => item.month),
    datasets: [
      { 
        label: 'Active Employees', 
        data: data.map(item => item.active_employees),
        fill: false, 
        borderColor: '#f5793b', 
        tension: 0.1, 
        yAxisID: 'y' 
      },
      { 
        label: 'Total Payroll ($K)', 
        data: data.map(item => item.total_payroll),
        fill: false, 
        borderColor: 'rgb(54, 162, 235)', 
        tension: 0.1, 
        yAxisID: 'y1' 
      },
    ]
  }
}


interface AnalyticsAlert {
  type: "alert" | "recommendation";
  icon: string;
  color: string;
  text: string;
}

export async function getAnalyticsAlerts(): Promise<AnalyticsAlert[]> {
  const { data, error } = await supabase
    .from('analytics_alerts')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;

  // Transform the data to match your frontend interface
  return data.map(item => ({
    type: item.type as "alert" | "recommendation",
    icon: item.icon , // Fallback to AlertCircle if icon not found
    color: "text-orange-500",
    text: item.text
  }));
}
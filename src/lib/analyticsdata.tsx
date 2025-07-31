// import { DollarSign, Percent, Users, Package, ShoppingCart, TrendingUp, Smile, AlertCircle, Lightbulb } from 'lucide-react';

// Interface for StatCard props (adapted from InventoryCard/EmployeeCard)
// interface StatCardProps {
//   title: string;
//   value: string;
//   situation: string;
//   status: string; // e.g., "Healthy", "Attention needed"
//   icon: React.ElementType;
//   iconBgColor: string; // Tailwind class for icon background
//   iconColor: string; // Tailwind class for icon color
//   trend?: string; // e.g., "+6.1%"
// }
// export const analyticsOverviewCards: StatCardProps[] = [
//   { title: "Total Revenue", value: "$1.2M", situation: "This Quarter", status: "Healthy", icon: DollarSign, iconBgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-500", trend: "+10.2%" },
//   { title: "Net Profit Margin", value: "18%", situation: "Trailing 30 Days", status: "Healthy", icon: Percent, iconBgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-500", trend: "+1.2%" },
//   { title: "Active Employees", value: "155", situation: "Current Headcount", status: "Healthy", icon: Users, iconBgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-500" },
//   { title: "Total Inventory Value", value: "$345K", situation: "Current Stock", status: "Healthy", icon: Package, iconBgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-500", trend: "-5%" },
//   { title: "Orders Processed", value: "2,100", situation: "This Month", status: "Healthy", icon: ShoppingCart, iconBgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-500", trend: "+15%" },
//   { title: "Avg. Order Value", value: "$575", situation: "This Month", status: "Healthy", icon: DollarSign, iconBgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-500", trend: "+3.1%" },
//   { title: "Employee Turnover Rate", value: "8%", situation: "Last 12 Months", status: "Attention needed", icon: TrendingUp, iconBgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-500", trend: "+0.5%" },
//   { title: "New Customers", value: "120", situation: "Last 30 Days", status: "Healthy", icon: Smile, iconBgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-500" },
// ];

// export const financialTrendData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//   datasets: [
//     { label: 'Revenue ($K)', data: [500, 550, 600, 580, 650, 700, 680], fill: false, borderColor: '#f5793b', tension: 0.1 },
//     { label: 'Gross Profit ($K)', data: [200, 220, 240, 230, 260, 280, 270], fill: false, borderColor: 'rgb(54, 162, 235)', tension: 0.1 },
//     { label: 'Net Profit ($K)', data: [90, 100, 110, 105, 120, 130, 125], fill: false, borderColor: '#f5793b', tension: 0.1 },
//   ],
// };

// export const salesByCategoryData = {
//   labels: ['Electronics', 'Clothing', 'Home Goods', 'Books', 'Services'],
//   datasets: [
//     {
//       label: 'Sales ($K)',
//       data: [350, 280, 190, 80, 100],
//       backgroundColor: [
//         '#f5793b',
//         '#f5793b',
//         '#f5793b',
//         '#f5793b',
//         '#f5793b',
//       ],
//       borderColor: [
//         '#f5793b',
//         '#f5793b',
//         '#f5793b',
//         '#f5793b',
//         '#f5793b',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// export const inventoryFlowValueData = {
//   labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
//   datasets: [
//     { label: 'Inbound Units (K)', data: [12, 15, 13, 16, 14, 18], fill: false, borderColor: 'rgb(40, 167, 69)', tension: 0.1, yAxisID: 'y' },
//     { label: 'Outbound Units (K)', data: [10, 11, 12.5, 13, 15, 17], fill: false, borderColor: '#f5793b', tension: 0.1, yAxisID: 'y' },
//     { label: 'Inventory Value ($M)', data: [0.8, 0.9, 0.85, 0.95, 0.9, 1.0], fill: false, borderColor: 'rgb(54, 162, 235)', tension: 0.1, yAxisID: 'y1' },
//   ],
// };

// export const hrCostTrendData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//   datasets: [
//     { label: 'Active Employees', data: [140, 145, 148, 150, 152, 155, 153], fill: false, borderColor: '#f5793b', tension: 0.1, yAxisID: 'y' },
//     { label: 'Total Payroll ($K)', data: [240, 250, 255, 260, 265, 270, 268], fill: false, borderColor: 'rgb(54, 162, 235)', tension: 0.1, yAxisID: 'y1' },
//   ],
// };


// interface AnalyticsAlert {
//   type: "alert" | "recommendation";
//   icon: React.ElementType;
//   color: string;
//   text: string;
// }

// export const analyticsAlerts: AnalyticsAlert[] = [
//   { type: "alert", icon: AlertCircle, color: "text-orange-500", text: "Urgent: Stock level for 'Product X' is critically low (5 units left)." },
//   { type: "recommendation", icon: Lightbulb, color: "text-orange-500", text: "Consider a marketing campaign for 'Category Y' to boost Q3 sales." },
//   { type: "alert", icon: AlertCircle, color: "text-orange-500", text: "Employee turnover rate in Sales department increased by 3% this quarter." },
//   { type: "recommendation", icon: Lightbulb, color: "text-orange-500", text: "Average delivery time for inbound shipments from 'Supplier Z' has increased by 2 days." },
// ];

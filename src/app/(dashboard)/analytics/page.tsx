import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

// Importing Components 
import SearchBar from '@/components/analytics/SearchBar';
import KeyFinancialTrends from '@/components/analytics/KeyFinancialTrends';
import SalesPerformance from '@/components/analytics/SalesPerformance';
import InventoryFlowChart from '@/components/analytics/InventoryFlowChart';
import WorkforcePayrollChart from '@/components/analytics/WorkforePayrollChart';

import { fetchDashboardData } from "@/lib/analytics/data";
import { IconRenderer } from "@/components/analytics/IconRenderer";

import { ChartData } from '@/lib/analytics/chart';
import { SalesData } from '@/lib/analytics/chart';

const BusinessAnalyticsPage: React.FC =  async () => {

 const {
  financialData,
  salesByCategoryData,
  inventoryFlowData,
  hrCostTrendData,
  analyticsOverviewCards,
  analyticsAlerts
}: {
  financialData: ChartData;
  salesByCategoryData: SalesData;
  inventoryFlowData: ChartData;
  hrCostTrendData: ChartData;
} = await fetchDashboardData();


  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 font-sans text-gray-900 dark:text-white">
      {/* Header Section */}
      <div className={cn("mb-8 p-3 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl", pacifico.className)}>
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 dark:from-orange-400 dark:via-orange-300 dark:to-orange-400">Business Analytics</h1>
        <p className="text-zinc-800 dark:text-zinc-200 text-xs">Comprehensive insights into business performance and trends</p>
      </div>

      {/* Global Filters / Time Period Selector & Action Button */}
      <SearchBar analyticsoverviewData = {analyticsOverviewCards}/>

      {/* Top Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Key Financial Trends Chart */}
        <KeyFinancialTrends financialdata = {financialData}/>

        {/* Sales Performance by Category Chart */}
        <SalesPerformance salesData = {salesByCategoryData}/>
      </div>

      {/* Middle Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Inventory Flow & Value Trend Chart */}
        <InventoryFlowChart inventoryFlowData = {inventoryFlowData}/>

        {/* Workforce & Payroll Cost Trend Chart */}
       <WorkforcePayrollChart hrcostdata={hrCostTrendData} />
      </div>

      {/* Critical Alerts & Actionable Insights Section */}
      <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 w-full">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Critical Alerts & Actionable Insights</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Immediate notifications and strategic recommendations.</p>
        <ul className="space-y-4">
          {analyticsAlerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <li key={index} className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <IconRenderer iconName={Icon} className={`mt-1 mr-3 flex-shrink-0 ${alert.color}`} />
                <p className="text-gray-800 dark:text-gray-200 text-base">{alert.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BusinessAnalyticsPage;

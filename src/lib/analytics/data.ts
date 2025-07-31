import { 
  getFinancialTrendData,
  getSalesByCategoryData,
  getInventoryFlowData,
  getHrCostTrendData,
  getAnalyticsOverviewCards,
  getAnalyticsAlerts
} from './supabaseData';

export async function fetchDashboardData() {
  const [
    financialData,
    salesByCategoryData,
    inventoryFlowData,
    hrCostTrendData,
    analyticsOverviewCards,
    analyticsAlerts,
  ] = await Promise.all([
    getFinancialTrendData(),
    getSalesByCategoryData(),
    getInventoryFlowData(),
    getHrCostTrendData(),
    getAnalyticsOverviewCards(),
    getAnalyticsAlerts()
  ]);

  return {
    financialData,
    salesByCategoryData,
    inventoryFlowData,
    hrCostTrendData,
    analyticsOverviewCards,
    analyticsAlerts
  };
}
"use client"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Title as ChartTitle } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, ChartTitle);

// import { ChartData } from '@/lib/analytics/chart';

const InventoryFlowChart = ({inventoryFlowData }) => {
  return (
   <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
             <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Inventory Flow & Value Trend</h2>
             <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Inbound/outbound units and total inventory value.</p>
             <div className="h-64">
               <Line data={inventoryFlowData} />
             </div>
           </div>
  )
}

export default InventoryFlowChart

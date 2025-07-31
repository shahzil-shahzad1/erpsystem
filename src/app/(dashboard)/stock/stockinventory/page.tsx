// app/(commercial)/stock/inventory/page.tsx
"use client";

import React, { useState } from 'react';
import {ChevronDown, Download } from 'lucide-react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

import WarehouseStockSections from '@/components/commercial/WarehouseLowStock';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);
// IMport inventory card 
import InventoryCard from '@/components/stock/InventoryCard';

// Import Data 
import { inventoryCardsData } from '@/lib/stockdata';
import { inventoryTrendData } from '@/lib/stockdata';
import { categoryDistributionData } from '@/lib/stockdata';


const StockInventoryPage = () => {
  // State for search term and filters (if needed, similar to SalesDashboard)
  // const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 font-sans text-gray-900 dark:text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 inset-0 p-2 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md">
        <div className="text-center md:text-left">
          <h1 className={cn("text-lg font-bold text-zinc-900 dark:text-zinc-100", pacifico.className)}>Stock Inventory</h1>
          <p className="text-zinc-800 dark:text-zinc-200 text-xs">Monitor inventory levels and warehouse management</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none bg-white text-sm dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent w-full"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home & Garden</option>
              <option>Jewelry</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>
          <button className="bg-white/50 dark:bg-gray-800/50 text-black dark:text-white flex text-sm items-center justify-center py-2 px-4 rounded-lg shadow-md hover:bg-[#e5a004] transition-all duration-200">
            <Download size={18} className="mr-2" />
            Stock Report
          </button>
        </div>
      </div>

      {/* Inventory Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {inventoryCardsData.map((card, index) => (
          <InventoryCard key={index} {...card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Trend Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Inventory Trend</h2>
          <div className="h-64">
            {/* Pass the dynamic options to the Line chart */}
            <Line data={inventoryTrendData}  />
            {/* options={getChartOptions(document.documentElement.classList.contains('dark'))} */}
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Category Distribution</h2>
          <div className="h-64 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/2 h-full">
              {/* Pass the dynamic options to the Pie chart */}
              <Pie data={categoryDistributionData} />
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6">
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                {categoryDistributionData.labels.map((label, index) => (
                  <li key={label} className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: categoryDistributionData.datasets[0].backgroundColor[index] }}></span>
                      {label}
                    </span>
                    <span>{categoryDistributionData.datasets[0].data[index]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <WarehouseStockSections/>
    </div>
  );
};

export default StockInventoryPage;

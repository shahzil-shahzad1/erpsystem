// app/(commercial)/warehouse/management/page.tsx
"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Warehouse, PackageOpen, PackageCheck, CheckCircle, AlertCircle } from 'lucide-react';

 import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

// Dummy data for WarehouseUtilizationCard
import WarehouseUtilizationCard from '@/components/stock/WarehouseUtilizationCard';

// Dummy data for Warehouse Utilization
import { warehouseData } from '@/lib/stockdata';

// Dummy data detailedWarehouseInventory
import { detailedWarehouseInventory } from '@/lib/stockdata';

// Dummy data for Recent Warehouse Activities
import { recentWarehouseActivities } from '@/lib/stockdata';

const WarehouseManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUtilization, setFilterUtilization] = useState('All');
  const [expandedWarehouse, setExpandedWarehouse] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterUtilization(event.target.value);
  };

  const toggleWarehouseExpansion = (warehouseName: string) => {
    setExpandedWarehouse(prev => (prev === warehouseName ? null : warehouseName));
  };

  const filteredWarehouses = warehouseData.filter(wh => {
    const matchesSearch = wh.location.toLowerCase().includes(searchTerm.toLowerCase());
    const utilization = (wh.current / wh.capacity) * 100;
    const matchesFilter = filterUtilization === 'All' ||
                          (filterUtilization === 'High Utilization' && utilization >= 80) ||
                          (filterUtilization === 'Medium Utilization' && utilization >= 50 && utilization < 80) ||
                          (filterUtilization === 'Low Utilization' && utilization < 50);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 font-sans text-gray-900 dark:text-white">
      {/* Header Section */}
      <div className="mb-8 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md p-2 rounded-xl">
        <h1 className={cn("text-lg font-bold text-zinc-900 dark:text-zinc-100", pacifico.className)}>Warehouse Management</h1>
        <p className="text-zinc-800 dark:text-zinc-200 text-xs">Overview of warehouse space, inventory distribution, and operations</p>
      </div>

      {/* Filter/Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-lg p-6 rounded-xl border border-gray-200 dark:border-zinc-900 ">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search warehouses or locations..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            className="appearance-none bg-white text-sm dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent w-full"
            value={filterUtilization}
            onChange={handleFilterChange}
          >
            <option>All</option>
            <option>High Utilization</option>
            <option>Medium Utilization</option>
            <option>Low Utilization</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Warehouse Utilization Section (Left Column) */}
        <div className="lg:col-span-2 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Warehouse Utilization</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Current space usage across all active warehouses</p>
          {filteredWarehouses.map((data, index) => (
            <WarehouseUtilizationCard key={index} {...data} />
          ))}
        </div>

        {/* Recent Warehouse Activities Section (Right Column - Smaller Card) */}
        <div className="lg:col-span-1 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Recent In/Out Shipments</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Latest movements of inventory</p>
          {recentWarehouseActivities.map(activity => (
            <div key={activity.id} className="flex items-center mb-3 last:mb-0 text-gray-700 dark:text-gray-300">
              {activity.type === 'inbound' ? (
                <PackageCheck size={18} className="text-green-500 mr-3 flex-shrink-0" />
              ) : (
                <PackageOpen size={18} className="text-red-500 mr-3 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-zinc-900 dark:text-white">{activity.product} ({activity.quantity})</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.warehouse} - {activity.date}</p>
              </div>
              {/* Replaced ArrowRight with CheckCircle for inbound */}
              {activity.type === 'inbound' ? (
                <CheckCircle size={16} className="text-green-500 ml-2" />
              ) : (
              // Replaced ArrowLeft with AlertCircle for outbound
                <AlertCircle size={16} className="text-red-500 ml-2" />
              )}
            </div>
          ))}
        </div>

        {/* Inventory Distribution by Warehouse Section (Full Width below others on mobile, spans 2 columns on larger screens) */}
        <div className="lg:col-span-3 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 mt-6">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Detailed Inventory by Warehouse</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Breakdown of products in each warehouse location</p>
          {detailedWarehouseInventory.map((whInv, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <button
                onClick={() => toggleWarehouseExpansion(whInv.warehouse)}
                className="flex items-center justify-between w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="font-semibold text-zinc-900 dark:text-white flex items-center">
                  <Warehouse size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                  {whInv.warehouse}
                </span>
                <ChevronDown size={18} className={`text-gray-500 dark:text-gray-400 transform transition-transform duration-220 ${expandedWarehouse === whInv.warehouse ? 'rotate-180' : ''}`} />
              </button>
              {expandedWarehouse === whInv.warehouse && (
                <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <ul className="space-y-1">
                    {whInv.products.slice(0, 5).map((product, prodIndex) => ( // Show top 5 products
                      <li key={prodIndex} className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                        <span>{product.name} ({product.category})</span>
                        <span className="font-medium">{product.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  {whInv.products.length > 5 && (
                    <button className="mt-3 text-xs text-[#b16a04] hover:underline dark:text-[#e5a004]">
                      View All Products ({whInv.products.length})
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WarehouseManagementPage;

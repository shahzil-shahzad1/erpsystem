// app/stock/sourcing/page.tsx
"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, PlusCircle } from 'lucide-react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);



import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

import SourceInventoryCard from '@/components/stock/SourceInventoryCard';

// Dummy data for Sourcing Overview Cards
import { sourcingCardsData } from '@/lib/stockdata';

// Dummy data for Pending Purchase Orders Table
import { pendingPOsData } from '@/lib/stockdata';

// Dummy data for Purchase Order Status Distribution Chart
import { poStatusDistributionData } from '@/lib/stockdata';

// Dummy data for Monthly Procurement Spending Chart
import { spendingTrendData } from '@/lib/stockdata';

// Dummy data for Recent Supplier Activity Table
import { recentSupplierActivityData } from '@/lib/stockdata';


const StockSourcingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPOStatus, setFilterPOStatus] = useState('All');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePOStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterPOStatus(event.target.value);
  };

  const handleCreateNewPO = () => {
    alert("Create New Purchase Order button clicked!");
  };

  // Helper function to get status color for table cells
  const getPOStatusColorClass = (status: string) => {
    switch (status) {
      case 'Received':
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Ordered':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Filter logic for Pending Purchase Orders table
  const filteredPendingPOs = pendingPOsData.filter(po => {
    const matchesSearch = po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          po.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterPOStatus === 'All' || po.status === filterPOStatus;
    return matchesSearch && matchesStatus;
  });
  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 font-sans text-gray-900 dark:text-white">
      {/* Header Section */}
      <div className="mb-8 p-2 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl">
        <h1 className={cn("text-lg font-bold text-zinc-900 dark:text-zinc-100",pacifico.className) }>Sourcing Management</h1>
        <p className="text-zinc-800 dark:text-zinc-200 text-xs">Oversee supplier relationships and procurement operations</p>
      </div>

      {/* Filter/Search Bar & Action Button */}
      <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Supplier, PO, or Product..."
            className="w-full text-sm pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none text-sm bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white py-1.5 px-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent w-full text-sm"
              value={filterPOStatus}
              onChange={handlePOStatusChange}
            >
              <option>All</option>
              <option>Draft</option>
              <option>Pending Approval</option>
              <option>Ordered</option>
              <option>Received</option>
              <option>Cancelled</option>
            </select>
            <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={handleCreateNewPO}
            className="bg-white/50 dark:bg-gray-800/50 text-black dark:text-white flex text-sm items-center justify-center py-1.5 px-3 rounded-lg shadow-md hover:bg-[#e5a004] transition-all duration-200 w-full sm:w-auto whitespace-nowrap text-sm"
          >
            <PlusCircle size={18} className="mr-1.5" />
            Create New Purchase Order
          </button>
        </div>
      </div>

      {/* Sourcing Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {sourcingCardsData.map((card, index) => (
          <SourceInventoryCard key={index} {...card} />
        ))}
      </div>

      {/* Pending Purchase Orders Table */}
      <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Pending Purchase Orders</h2>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PO Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Supplier</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPendingPOs.length > 0 ? (
              filteredPendingPOs.map((po) => (
                <tr key={po.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">{po.poNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{po.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{po.orderDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{po.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPOStatusColorClass(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => alert(`Viewing details for PO: ${po.poNumber}`)}
                      className="text-[#b16a04] hover:text-[#e5a004] transition-colors duration-200 mr-2"
                    >
                      View Details
                    </button>
                    {po.status === 'Pending Approval' && (
                      <button
                        onClick={() => alert(`Approving PO: ${po.poNumber}`)}
                        className="text-green-600 hover:text-green-800 transition-colors duration-200"
                      >
                        Approve
                      </button>
                    )}
                    {po.status === 'Draft' && (
                      <button
                        onClick={() => alert(`Editing PO: ${po.poNumber}`)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">No matching purchase orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Row (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Purchase Order Status Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Purchase Order Status Distribution</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-6">Breakdown of purchase orders by status.</p>
          <div className="h-64 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/2 h-full">
              <Pie data={poStatusDistributionData} />
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6">
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                {poStatusDistributionData.labels.map((label, index) => (
                  <li key={label} className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: poStatusDistributionData.datasets[0].backgroundColor[index] }}></span>
                      {label}
                    </span>
                    <span>{poStatusDistributionData.datasets[0].data[index]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Monthly Procurement Spending Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Monthly Procurement Spending</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-6">Total spending on procurement over time.</p>
          <div className="h-64">
            <Line data={spendingTrendData} />
          </div>
        </div>
      </div>

      {/* Recent Supplier Activity Table */}
      <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Recent Supplier Activity</h2>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Supplier</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Activity Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Associated PO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentSupplierActivityData.length > 0 ? (
              recentSupplierActivityData.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">{activity.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{activity.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{activity.activityType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{activity.associatedPO}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">No recent supplier activity found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockSourcingPage;

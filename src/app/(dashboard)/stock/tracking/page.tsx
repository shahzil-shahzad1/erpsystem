// app/stock/tracking/page.tsx
"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, Truck } from 'lucide-react';
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
// Dummy data for Shipment Overview Cards
import { shipmentCardsData } from '@/lib/stockdata';

// Dummy data for Live Shipment Status Table
import { liveShipmentsData } from '@/lib/stockdata';

// Dummy data for Shipment Status Distribution Chart
import { shipmentStatusDistributionData } from '@/lib/stockdata';

// Dummy data for Average Delivery Time Trend Chart
import { avgDeliveryTimeTrendData } from '@/lib/stockdata';

// Dummy data for Recent Deliveries/Received Items Table
import { recentDeliveriesData } from '@/lib/stockdata';


const StockTrackingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterShipmentStatus, setFilterShipmentStatus] = useState('All');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleShipmentStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterShipmentStatus(event.target.value);
  };

  const handleInitiateNewShipment = () => {
    alert("Initiate New Shipment button clicked!");
  };

  // Helper function to get status color for table cells
  const getShipmentStatusColorClass = (status: string) => {
    switch (status) {
      case 'Delivered':
      case 'Received':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'In Transit (Customs)':
      case 'Out for Delivery':
      case 'Processing at Warehouse':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Delayed (Weather)':
      case 'Exception (Documentation)':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Filter logic for Live Shipment Status table
  const filteredLiveShipments = liveShipmentsData.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          shipment.currentStatus.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterShipmentStatus === 'All' || shipment.currentStatus.includes(filterShipmentStatus);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 font-sans text-gray-900 dark:text-white">
      {/* Header Section */}
      <div className="mb-8 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md p-2 rounded-xl">
        <h1 className={cn("text-lg font-bold text-zinc-900 dark:text-zinc-100", pacifico.className)}>Tracking Management</h1>
        <p className="text-zinc-800 dark:text-zinc-200 text-xs">Monitor inbound and outbound inventory movements</p>
      </div>

      {/* Filter/Search Bar & Action Button */}
      <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Tracking #, Order ID..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none bg-white dark:bg-[#1a1a1a] text-sm border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white py-1.5 px-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent w-full text-sm"
              value={filterShipmentStatus}
              onChange={handleShipmentStatusChange}
            >
              <option>All</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Delayed</option>
              <option>Processing</option>
              <option>Exception</option>
            </select>
            <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={handleInitiateNewShipment}
            className="bg-white/50 dark:bg-gray-800/50 text-black dark:text-white text-sm flex items-center justify-center py-1.5 px-3 rounded-lg shadow-md hover:bg-[#e5a004] transition-all duration-200 w-full sm:w-auto whitespace-nowrap text-sm"
          >
            <Truck size={18} className="mr-1.5" />
            Initiate New Shipment
          </button>
        </div>
      </div>

      {/* Shipment Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {shipmentCardsData.map((card, index) => (
          <SourceInventoryCard key={index} {...card} />
        ))}
      </div>

      {/* Live Shipment Status Table */}
      <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Live Shipment Status</h2>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tracking Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Origin</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Destination</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ETA</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLiveShipments.length > 0 ? (
              filteredLiveShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">{shipment.trackingNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{shipment.origin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{shipment.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getShipmentStatusColorClass(shipment.currentStatus)}`}>
                      {shipment.currentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{shipment.eta}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{shipment.lastUpdate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">No matching shipments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Row (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Shipment Status Distribution Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Shipment Status Distribution</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-6">Breakdown of shipments by their current status.</p>
          <div className="h-64 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/2 h-full">
              <Pie data={shipmentStatusDistributionData} />
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6">
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                {shipmentStatusDistributionData.labels.map((label, index) => (
                  <li key={label} className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: shipmentStatusDistributionData.datasets[0].backgroundColor[index] }}></span>
                      {label}
                    </span>
                    <span>{shipmentStatusDistributionData.datasets[0].data[index]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Average Delivery Time Trend Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Average Delivery Time (Days)</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-6">Trend of average delivery times over months.</p>
          <div className="h-64">
            <Line data={avgDeliveryTimeTrendData} />
          </div>
        </div>
      </div>

      {/* Recent Deliveries/Received Items Table */}
      <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Recent Deliveries & Receipts</h2>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tracking Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Items</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentDeliveriesData.length > 0 ? (
              recentDeliveriesData.map((delivery) => (
                <tr key={delivery.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">{delivery.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{delivery.trackingNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{delivery.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{delivery.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getShipmentStatusColorClass(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">No recent deliveries or receipts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTrackingPage;

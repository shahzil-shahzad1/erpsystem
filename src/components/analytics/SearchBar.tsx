"use client"
import React from 'react'
import { useState } from 'react';
import { Search, ChevronDown, Download } from 'lucide-react';

import StatCard from '@/components/analytics/StatCard';

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

interface SearchBarProps {
  analyticsoverviewData: StatCardProps[]; // Now accepts array
}

const SearchBar = ({analyticsoverviewData}: {analyticsoverviewData: SearchBarProps}) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Custom Range');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTimePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimePeriod(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleExportReport = () => {
    alert("Export Report button clicked!");
  };

  // Filter logic for analytics overview cards
  const filteredCards = analyticsoverviewData.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.situation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTimePeriod = selectedTimePeriod === 'All' || 
                              (selectedTimePeriod === 'Last 7 Days' && card.situation.includes('This Week')) ||
                              (selectedTimePeriod === 'Last 30 Days' && card.situation.includes('This Month') || card.situation.includes('Last 30 Days')) ||
                              (selectedTimePeriod === 'This Quarter' && card.situation.includes('This Quarter')) ||
                              (selectedTimePeriod === 'Last Quarter' && card.situation.includes('Last Quarter')) ||
                              (selectedTimePeriod === 'This Year' && card.situation.includes('This Year')) ||
                              (selectedTimePeriod === 'Last Year' && card.situation.includes('Last Year')) ||
                              (selectedTimePeriod === 'Custom Range' && true); // Custom range would require more complex date picker logic

    return matchesSearch && matchesTimePeriod;
  });

  return (
    <div className="">
      <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full text-sm pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
    
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {/* Time Period Selector */}
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none text-sm bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white py-1.5 px-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent w-full"
              value={selectedTimePeriod}
              onChange={handleTimePeriodChange}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Last Quarter</option>
              <option>This Year</option>
              <option>Last Year</option>
              <option>Custom Range</option>
            </select>
            <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>
          {/* Export Report Button */}
          <button
            onClick={handleExportReport}
            className="bg-white/50 dark:bg-gray-800/50 text-black dark:text-white py-1.5 px-3 rounded-lg shadow-md flex items-center justify-center transition-all duration-200 w-full sm:w-auto whitespace-nowrap text-sm"
          >
            <Download size={18} className="mr-1.5" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center col-span-full">No matching analytics cards found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

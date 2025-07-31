import React from 'react'

import { IconRenderer } from './IconRenderer';
// Interface for StatCard props (adapted from InventoryCard/EmployeeCard)
interface StatCardProps {
  title: string;
  value: string;
  situation: string;
  status: string; // e.g., "Healthy", "Attention needed"
  icon: string,
  iconBgColor: string; // Tailwind class for icon background
  iconColor: string; // Tailwind class for icon color
  trend?: string; // e.g., "+6.1%"
}

// StatCard Component (reused for consistent styling)
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor, iconColor, situation, status, trend }) => {
  return (
    <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-5 group flex items-center justify-between border border-gray-200 dark:border-zinc-900 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      <div>
        <p className="text-gray-600 dark:text-zinc-200 text-sm">{title}</p>
        <p className={`text-lg font-bold text-zinc-900 dark:text-white`}>{value}</p>
        <p className="text-gray-600 dark:text-gray-300">{situation}</p>
        {trend && (
          <p className={`text-xs font-semibold ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </p>
        )}
        <p className={`font-bold ${status === "Healthy" ? "text-green-400" : status === "Critical" ? "text-red-400" : "text-orange-400"}`}>{status}</p>
      </div>
      <div className={`p-3 rounded-2xl ${iconBgColor}`}>
        <IconRenderer iconName={icon} className={`${iconColor}`}  />
      </div>
    </div>
  );
};

export default StatCard
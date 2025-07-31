import React from 'react'
import { MapPin } from 'lucide-react'; 
// Reusing the WarehouseUtilizationCard component and its props interface
interface WarehouseUtilizationCardProps {
  location: string;
  current: number;
  capacity: number;
  // Removed lightColor and darkColor from props as they will be defined internally
}

export const WarehouseUtilizationCard: React.FC<WarehouseUtilizationCardProps> = ({ location, current, capacity }) => {
  const utilization = (current / capacity) * 100;
  const progressBarWidth = `${utilization}%`;

  // Define the single color for the progress bar, adapting to light/dark mode
  const progressBarColor = "bg-[#f5793b] dark:bg-orange-400"; // Consistent blue for both modes

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center text-zinc-900 dark:text-white mb-1">
        <MapPin size={16} className="mr-2 text-gray-600 dark:text-gray-300" />
        <span className="font-semibold">{location}</span>
        <span className="ml-auto text-sm text-gray-600 dark:text-gray-300">{current}/{capacity}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        {/* Apply the consistent progressBarColor here */}
        <div className={`h-2.5 rounded-full ${progressBarColor}`} style={{ width: progressBarWidth }}></div>
      </div>
      <p className="text-right text-sm font-medium mt-1 text-gray-600 dark:text-gray-300">Utilization: {utilization.toFixed(0)}%</p>
    </div>
  );
};

export default WarehouseUtilizationCard

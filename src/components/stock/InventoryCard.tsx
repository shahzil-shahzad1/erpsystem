import React from 'react'

// Interface for InventoryCard props
interface InventoryCardProps {
  title: string;
  value: string;
  situation: string;
  status: string;
  icon: React.ElementType; // Lucide React icon component
  iconBgColor: string; // Tailwind class for icon background
  iconColor: string; // Tailwind class for icon color
}

// Inventory Card Component
const InventoryCard: React.FC<InventoryCardProps> = ({ title, value, icon: Icon, iconBgColor, iconColor, situation, status }) => {
  return (
    <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-5 group flex items-center justify-between border border-gray-200 dark:border-zinc-900 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      <div>
        <p className="text-gray-600 dark:text-zinc-200 text-sm">{title}</p>
        <p className={`text-lg font-bold`}>{value}</p>
        <p>{situation}</p>
        <p className={`font-bold text-xs ${status == "Healthy" ? "text-green-400" : "text-red-400"}`}>{status}</p>
      </div>
      <div className={`p-3 rounded-2xl ${iconBgColor}`}>
        <Icon size={18} className={iconColor} />
      </div>
    </div>
  );
};

export default InventoryCard

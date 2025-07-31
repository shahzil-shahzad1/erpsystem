import React from 'react'

// Interface for Overview Card props
interface OverviewCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
}

// Overview Card Component
const PurchaseOverviewCard: React.FC<OverviewCardProps> = ({ title, value, icon: Icon, iconBgColor, iconColor }) => {
  return (
    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md inset-0 rounded-xl shadow-lg p-5 flex flex-col items-start justify-between border border-gray-200 dark:border-zinc-900 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      <div className={`p-3 rounded-2xl ${iconBgColor} mb-3`}>
        <Icon size={18} className={iconColor} />
      </div>
      <p className="text-gray-600 dark:text-zinc-200 text-sm">{title}</p>
      <p className="text-lg font-bold text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
};

export default PurchaseOverviewCard

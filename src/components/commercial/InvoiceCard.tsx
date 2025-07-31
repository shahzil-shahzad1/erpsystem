import React from 'react'

// Interface for InvoiceCard props (adapted from InventoryCard)
interface InvoiceCardProps {
  title: string;
  value: string;
  situation: string;
  status: string;
  icon: React.ElementType; // Lucide React icon component
  iconBgColor: string; // Tailwind class for icon background
  iconColor: string; // Tailwind class for icon color
}

// Invoice Card Component (adapted from InventoryCard)
const InvoiceCard: React.FC<InvoiceCardProps> = ({ title, value, icon: Icon, iconBgColor, iconColor, situation, status }) => {
  return (
    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md inset-0 rounded-xl shadow-lg p-5 group flex items-center justify-between border border-gray-200 dark:border-zinc-900 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      <div>
        <p className="text-gray-600 dark:text-zinc-200 text-sm">{title}</p>
        <p className={`text-lg font-bold text-zinc-900 dark:text-white`}>{value}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{situation}</p>
        <p className={`font-bold text-xs ${status === "Healthy" ? "text-green-400" : status === "Critical" ? "text-red-400" : "text-orange-400"}`}>{status}</p>
      </div>
      <div className={`p-3 rounded-2xl ${iconBgColor}`}>
        <Icon size={18} className={iconColor} />
      </div>
    </div>
  );
};

export default InvoiceCard

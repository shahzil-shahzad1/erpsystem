import { ReceiptText} from 'lucide-react';
// Interface for ReorderRecommendationItem props
interface ReorderRecommendationItemProps {
  product: string;
  recommendedQty: number;
  reason: string;
}

// Reorder Recommendation Item Component
const ReorderRecommendationItem: React.FC<ReorderRecommendationItemProps> = ({ product, recommendedQty, reason }) => {
  return (
    <div className="flex items-center justify-between mb-4 last:mb-0">
      <div className="flex items-start">
        <ReceiptText size={18} className="mr-3 text-blue-500 flex-shrink-0 mt-1" />
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white">{product}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Recommended: {recommendedQty}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Reason: {reason}</p>
        </div>
      </div>
      <button className="bg-[#b16a04] text-white py-1 px-3 rounded-lg shadow-md hover:bg-[#e5a004] transition-all duration-200 text-sm">
        Order Now
      </button>
    </div>
  );
};

export default ReorderRecommendationItem

// components/PricingCard.tsx
import React from "react";

interface PricingCardProps {
  title: string;
  originalPrice: number; // in dollars
  offerPrice: number; // in dollars
  offerLimitText?: string; // e.g., "Only for first 1,000 users"
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  originalPrice,
  offerPrice,
  offerLimitText = "",
}) => {
  const discount = Math.round(((originalPrice - offerPrice) / originalPrice) * 100);

  return (
    <div className="bg-white border rounded-xl shadow-md p-6 w-full max-w-sm text-center">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      <div className="flex justify-center items-baseline gap-2 mb-1">
        <span className="text-gray-500 line-through text-sm">${originalPrice.toFixed(2)}</span>
        <span className="text-2xl font-bold text-black">${offerPrice.toFixed(2)}</span>
        <span className="text-sm text-green-600 font-semibold">({discount}% OFF)</span>
      </div>

      {offerLimitText && (
        <p className="text-xs text-gray-600 italic">{offerLimitText}</p>
      )}

      <button className="mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition">
        Get Lifetime Access
      </button>
    </div>
  );
};

export default PricingCard;

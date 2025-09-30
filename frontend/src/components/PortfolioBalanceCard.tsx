import React from "react";

interface PortfolioBalanceCardProps {
  grams: number;
  value: number;
  returnsPercent: number;
}

const PortfolioBalanceCard: React.FC<PortfolioBalanceCardProps> = ({
  grams,
  value,
  returnsPercent,
}) => {
  return (
    <div className="bg-[#160c32] p-6 rounded-xl shadow-md text-white">
      <h2 className="text-lg font-semibold mb-3">Portfolio Balance</h2>
      <p className="text-2xl font-bold">₹{value.toLocaleString("en-IN")}</p>
      <p className="text-sm text-gray-400">{grams} grams of gold</p>
      <p
        className={`mt-2 text-sm font-medium ${
          returnsPercent >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {returnsPercent >= 0 ? "+" : ""}
        {returnsPercent.toFixed(2)}%
      </p>
    </div>
  );
};

export default PortfolioBalanceCard;

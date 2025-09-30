import React from "react";

interface Transaction {
  id: number;
  date: string;
  type: "buy" | "sell";
  amount: number;
}

interface RecentTransactionsCardProps {
  transactions: Transaction[];
}

const RecentTransactionsCard: React.FC<RecentTransactionsCardProps> = ({
  transactions,
}) => {
  return (
    <div className="bg-[#160c32] p-6 rounded-xl shadow-md text-white">
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      <ul className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between items-center text-sm border-b border-gray-700 pb-2"
            >
              <span className="text-gray-300">{tx.date}</span>
              <span
                className={`font-medium ${
                  tx.type === "buy" ? "text-green-400" : "text-red-400"
                }`}
              >
                {tx.type === "buy" ? "+" : "-"}₹
                {tx.amount.toLocaleString("en-IN")}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No recent transactions</p>
        )}
      </ul>
    </div>
  );
};

export default RecentTransactionsCard;

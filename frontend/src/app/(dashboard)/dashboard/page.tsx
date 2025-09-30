'use client';
import { useState, useEffect, SVGProps } from 'react';
import { ArrowDownLeft, ArrowUpRight, Coins, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Type for our gold price data (no changes needed here)
type GoldData = {
  price: number;
  change: number;
  percentChange: number;
};

// Main Dashboard Page Component
export default function DashboardPage() {
  const [modal, setModal] = useState<'buy' | 'sell' | null>(null);
  const [goldData, setGoldData] = useState<GoldData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- (MODIFIED) This useEffect hook is updated to use the new API endpoint ---
  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        setLoading(true);
        // We still call our own simple backend route
        const response = await fetch('/api/gold'); 

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();

        // Use the new data fields returned by our API route
        setGoldData({
          price: data.price_gram,
          change: data.change_gram,
          percentChange: data.percent_change,
        });
        setError(null);

      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred');
        // Update fallback data with a realistic per-gram price
        setGoldData({ price: 7150.00, change: 30.00, percentChange: 0.42 });
      } finally {
        setLoading(false);
      }
    };

    fetchGoldPrice();
    const intervalId = setInterval(fetchGoldPrice, 5 * 60 * 1000); // Refreshes every 5 mins
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="bg-[#0f1c2c] text-[#e0e0e0] font-sans min-h-screen flex">
      {/* --- Sidebar Navigation --- */}
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Current Value" value="₹1,24,843.50" change="+2.1%" isPositive />
              <StatCard title="Total Investment" value="₹1,10,000.00" />
              <StatCard title="Total Returns" value="₹14,843.50" change="+13.5%" isPositive />
            </div>
            <GoldChartCard
              onBuy={() => setModal('buy')}
              onSell={() => setModal('sell')}
              goldData={goldData}
              loading={loading}
              error={error}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-[#0a1624] p-6 rounded-2xl space-y-6">
              <PortfolioBalanceCard />
              <RecentTransactionsCard />
            </div>
          </div>
        </div>
      </main>
      {modal === 'buy' && <TransactionModal type="buy" onClose={() => setModal(null)} livePrice={goldData?.price} />}
      {modal === 'sell' && <TransactionModal type="sell" onClose={() => setModal(null)} livePrice={goldData?.price} />}
    </div>
  );
}

/* ---------------- Sidebar ---------------- */
function Sidebar() {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboardIcon />, active: true },
    { name: 'Portfolio', href: '/portfolio', icon: <BriefcaseIcon /> },
    { name: 'Transactions', href: '/transactions', icon: <ReceiptTextIcon /> },
    { name: 'Settings', href: '/settings', icon: <SettingsIcon /> },
  ];

  return (
    <aside className="bg-[#0a1624] w-20 lg:w-64 p-4 lg:p-6 flex flex-col">
      <div className="flex items-center space-x-2 mb-12">
        <GoldCoinIcon className="h-8 w-8 text-[#d4af37]" />
        <span className="text-2xl font-bold hidden lg:block">Aureus</span>
      </div>

      <nav className="flex-1 space-y-4">
        {navItems.map(item => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              item.active ? 'bg-[#1a2b44]/60 text-[#d4af37]' : 'hover:bg-[#1a2b44]/30 text-[#e0e0e0]'
            }`}
          >
            <div className="h-6 w-6">{item.icon}</div>
            <span className="ml-4 font-semibold hidden lg:block">{item.name}</span>
          </a>
        ))}
      </nav>

      <div>
        <a
          href="#"
          className="flex items-center p-3 rounded-lg hover:bg-[#1a2b44]/30 text-[#e0e0e0]"
        >
          <LogOutIcon className="h-6 w-6" />
          <span className="ml-4 font-semibold hidden lg:block">Logout</span>
        </a>
      </div>
    </aside>
  );
}

/* ---------------- Header ---------------- */
function DashboardHeader() {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-[#a0a0a0]">Welcome back, Investor!</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-[#0a1624] hover:bg-[#1a2b44]">
          <BellIcon className="h-6 w-6 text-[#e0e0e0]" />
        </button>
        <div className="flex items-center space-x-3 bg-[#0a1624] p-2 rounded-full">
          <img
            src="https://placehold.co/40x40/d4af37/0f1c2c?text=U"
            alt="User"
            className="h-8 w-8 rounded-full"
          />
          <span className="font-semibold hidden sm:block">User</span>
        </div>
      </div>
    </header>
  );
}

/* ---------------- StatCard ---------------- */
function StatCard({
  title,
  value,
  change,
  isPositive,
}: {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}) {
  return (
    <div className="bg-[#0a1624] p-5 rounded-2xl">
      <p className="text-[#a0a0a0] text-sm">{title}</p>
      <div className="flex justify-between items-end">
        <p className="text-2xl font-bold mt-1">{value}</p>
        {change && (
          <p className={`text-sm font-semibold ${isPositive ? 'text-[#d4af37]' : 'text-[#ff7f7f]'}`}>
            {change}
          </p>
        )}
      </div>
    </div>
  );
}

function GoldChartCard({ onBuy, onSell }: { onBuy: () => void; onSell: () => void }) {
  return (
    <div className="bg-[#0a1624] p-6 rounded-2xl mt-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Gold Price (24K)</h2>
          <p className="text-3xl font-extrabold text-[#d4af37] mt-2">₹7,250.50 / gm</p>
          <p className="text-[#d4af37]/80 font-semibold">+₹15.20 (+0.21%) Today</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onBuy}
            className="bg-[#d4af37] text-[#0f1c2c] font-bold py-2 px-6 rounded-full hover:bg-[#e0b731] transition-colors"
          >
            Buy
          </button>
          <button
            onClick={onSell}
            className="bg-[#e05f5f] text-[#0f1c2c] font-bold py-2 px-6 rounded-full hover:bg-[#ff7f7f] transition-colors"
          >
            Sell
          </button>
        </div>
      </div>
      <div className="h-80 mt-6 flex items-center justify-center text-[#a0a0a0] relative">
        <LineChartIcon className="w-full h-full opacity-10" />
        <span className="absolute">Chart Data Would Be Displayed Here</span>
      </div>
    </div>
  );
}

/* ---------------- Portfolio Balance ---------------- */
function PortfolioBalanceCard() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Portfolio Balance</h3>
      <div className="bg-[#0a1624] p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-[#d4af37] p-3 rounded-full">
            <GoldBarIcon className="h-6 w-6 text-[#0f1c2c]" />
          </div>
          <div>
            <p className="font-bold text-lg">Digital Gold</p>
            <p className="text-sm text-[#a0a0a0]">17.22 grams</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">₹1,24,843.50</p>
          <p className="text-sm text-[#d4af37]">+13.5%</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Recent Transactions ---------------- */
function RecentTransactionsCard() {
  const transactions = [
    { type: 'Bought', amount: '2.5 gm', value: '₹18,125.00', date: 'Sep 25, 2025' },
    { type: 'Sold', amount: '1.0 gm', value: '₹7,200.00', date: 'Sep 22, 2025' },
    { type: 'Bought', amount: '5.0 gm', value: '₹35,950.00', date: 'Sep 15, 2025' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((tx, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-full ${
                  tx.type === 'Bought' ? 'bg-[#d4af37]/20' : 'bg-[#ff7f7f]/20'
                }`}
              >
                {tx.type === 'Bought' ? (
                  <ArrowDownLeftIcon className="h-5 w-5 text-[#d4af37]" />
                ) : (
                  <ArrowUpRightIcon className="h-5 w-5 text-[#ff7f7f]" />
                )}
              </div>
              <div>
                <p className="font-semibold">{tx.type} Gold</p>
                <p className="text-sm text-[#a0a0a0]">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{tx.value}</p>
              <p className="text-sm text-[#a0a0a0]">{tx.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionModal({ type, onClose }: { type: 'buy' | 'sell'; onClose: () => void }) {
  const isBuy = type === 'buy';
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a1624] w-full max-w-md rounded-2xl p-6 border border-[#1a2b44]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{isBuy ? 'Buy Digital Gold' : 'Sell Digital Gold'}</h2>
          <button onClick={onClose} className="text-[#a0a0a0] hover:text-[#d4af37]">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-center bg-[#0f1c2c] p-3 rounded-lg">
            Live Price: <span className="font-bold text-[#d4af37]">₹7,250.50 / gm</span>
          </p>
          <div>
            <label className="text-sm text-[#a0a0a0]">Enter Amount (₹)</label>
            <input
              type="number"
              placeholder="e.g., 1000"
              className="w-full bg-[#0f1c2c] border border-[#1a2b44] rounded-lg py-3 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>
          <div className="text-center text-[#a0a0a0]">OR</div>
          <div>
            <label className="text-sm text-[#a0a0a0]">Enter Grams (gm)</label>
            <input
              type="number"
              placeholder="e.g., 1.5"
              className="w-full bg-[#0f1c2c] border border-[#1a2b44] rounded-lg py-3 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>
          <div className="bg-[#0f1c2c] p-4 rounded-lg text-sm space-y-2">
            <div className="flex justify-between">
              <span>Gold Value</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between">
              <span>GST (3%)</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-[#1a2b44] pt-2 mt-2">
              <span>Total</span>
              <span>₹0.00</span>
            </div>
          </div>
          <button
            className={`w-full font-bold py-3 rounded-full text-lg transition-colors ${
              isBuy
                ? 'bg-[#d4af37] hover:bg-[#e0b731] text-[#0f1c2c]'
                : 'bg-[#e05f5f] hover:bg-[#ff7f7f] text-[#0f1c2c]'
            }`}
          >
            Proceed to {isBuy ? 'Payment' : 'Sell'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- SVG Icons ---
function GoldCoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.093c-1.72.23-2.813.516-3.454.816a.75.75 0 00-.43 1.112c.188.303.626.734 1.258 1.153 1.483.992 2.022 1.928 1.684 2.852-.337.922-1.422 1.32-2.823 1.322v.093a.75.75 0 001.5 0v-.093c1.72-.23 2.813-.516 3.454-.816a.75.75 0 00.43-1.112c-.188-.303-.626-.734-1.258-1.153-1.483-.992-2.022-1.928-1.684-2.852.337-.922 1.422-1.32 2.823-1.322V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Use the same SVGs from your previous code and they inherit currentColor
function LayoutDashboardIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function BriefcaseIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function ReceiptTextIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function SettingsIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function LogOutIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function BellIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function LineChartIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function GoldBarIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function ArrowDownLeftIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function ArrowUpRightIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }
function XIcon(props?: SVGProps<SVGSVGElement>) { return <svg {...props}></svg>; }

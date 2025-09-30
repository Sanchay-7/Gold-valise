'use client';

import { useState, useEffect, SVGProps, ReactNode } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- TYPE DEFINITION for a transaction object ---
interface Transaction {
  id: number;
  type: 'Bought' | 'Sold';
  date: string;
  amountGrams: number;
  value: number;
  status: string;
}

// --- DYNAMIC MOCK DATA FOR EACH TIME RANGE ---
const data1W = [
  { name: 'Sep 21', buy: 1200, sell: 500 },
  { name: 'Sep 22', buy: 3000, sell: 1400 },
  { name: 'Sep 23', buy: 800, sell: 4000 },
  { name: 'Sep 24', buy: 2780, sell: 1908 },
  { name: 'Sep 25', buy: 4890, sell: 2800 },
  { name: 'Sep 26', buy: 2390, sell: 1800 },
  { name: 'Today', buy: 3490, sell: 4300 },
];

const data1M = [
  { name: 'Week 1', buy: 4000, sell: 2400 },
  { name: 'Week 2', buy: 3000, sell: 1398 },
  { name: 'Week 3', buy: 2000, sell: 9800 },
  { name: 'Week 4', buy: 2780, sell: 3908 },
];

const data6M = [
  { name: 'Apr', buy: 2100, sell: 1400 },
  { name: 'May', buy: 3200, sell: 1998 },
  { name: 'Jun', buy: 5000, sell: 4800 },
  { name: 'Jul', buy: 2780, sell: 3908 },
  { name: 'Aug', buy: 4890, sell: 4800 },
  { name: 'Sep', buy: 3390, sell: 3800 },
];

const data1Y = [
  { name: 'Oct', buy: 2400, sell: 1400 }, { name: 'Nov', buy: 3000, sell: 1398 },
  { name: 'Dec', buy: 2000, sell: 9800 }, { name: 'Jan', buy: 2780, sell: 3908 },
  { name: 'Feb', buy: 1890, sell: 4800 }, { name: 'Mar', buy: 2390, sell: 3800 },
  { name: 'Apr', buy: 3490, sell: 4300 }, { name: 'May', buy: 4000, sell: 2400 },
  { name: 'Jun', buy: 3000, sell: 1398 }, { name: 'Jul', buy: 2000, sell: 9800 },
  { name: 'Aug', buy: 2780, sell: 3908 }, { name: 'Sep', buy: 1890, sell: 4800 },
];

// --- MAIN TRANSACTIONS PAGE ---
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<{ transactions: Transaction[] }>('/api/transactions');
        setTransactions(response.data.transactions);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError("Couldn't load transaction history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="bg-[#0f1c2c] text-[#e0e0e0] font-sans min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <TransactionsHeader />
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SummaryCard title="Total Gold Bought" value="19.2 gm" icon={<ArrowDownLeftIcon className="h-6 w-6 text-[#d4af37]" />} />
          <SummaryCard title="Total Gold Sold" value="6.2 gm" icon={<ArrowUpRightIcon className="h-6 w-6 text-[#ef4444]" />} />
          <SummaryCard title="Total Investment" value="₹1,37,765" icon={<WalletIcon className="h-6 w-6 text-[#22c55e]" />} />
          <SummaryCard title="Net Returns" value="₹4,945" isPositive={true} icon={<TrendingUpIcon className="h-6 w-6 text-[#d4af37]" />} />
        </motion.div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            <div className="xl:col-span-2">
                <HistoryChartCard />
            </div>
            <div className="xl:col-span-1">
                <TransactionHistoryList transactions={transactions} loading={loading} error={error} />
            </div>
        </div>
      </main>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---
function TransactionsHeader() {
  return (
    <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-[#d4af37]/80">Review your complete transaction history.</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 bg-[#0a1624] hover:bg-[#1a2b44] py-2 px-4 rounded-full transition-colors">
            <DownloadIcon className="h-5 w-5 text-[#e0e0e0]" />
            <span className="font-semibold text-[#e0e0e0]">Download Statement</span>
        </button>
      </div>
    </header>
  );
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function SummaryCard({ title, value, icon, isPositive }: { title: string; value: string; icon: ReactNode; isPositive?: boolean }) {
    return (
      <motion.div className="bg-[#0a1624] p-5 rounded-2xl flex items-center space-x-4" variants={cardVariants}>
        <div className="bg-[#1a2b44] p-3 rounded-full">{icon}</div>
        <div>
          <p className="text-[#a0a0a0] text-sm">{title}</p>
          <p className={`text-xl font-bold mt-1 ${isPositive === true ? 'text-[#d4af37]' : isPositive === false ? 'text-[#ef4444]' : ''}`}>
            {value}
          </p>
        </div>
      </motion.div>
    );
}

function HistoryChartCard() {
    const [activeRange, setActiveRange] = useState('1M');
    const ranges = ['1W', '1M', '6M', '1Y'];

    let chartData;
    switch (activeRange) {
        case '1W':
            chartData = data1W;
            break;
        case '6M':
            chartData = data6M;
            break;
        case '1Y':
            chartData = data1Y;
            break;
        case '1M':
        default:
            chartData = data1M;
            break;
    }

    return (
        <motion.div 
            className="bg-[#0a1624] p-6 rounded-2xl h-full min-h-[500px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h2 className="text-xl font-bold">Transaction Volume</h2>
                <div className="flex space-x-1 bg-[#0f1c2c] p-1 rounded-full mt-3 sm:mt-0">
                    {ranges.map(range => (
                        <button key={range} onClick={() => setActiveRange(range)} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${activeRange === range ? 'bg-[#d4af37] text-[#0f1c2c]' : 'text-[#e0e0e0] hover:bg-[#1a2b44]'}`}>
                            {range}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-8 h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a2b44" />
                        <XAxis dataKey="name" stroke="#d4af37" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#d4af37" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value)/1000}k`} />
                        <Tooltip
                            cursor={{ fill: '#1a2b44' }}
                            contentStyle={{ backgroundColor: '#0f1c2c', border: '1px solid #d4af37' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '14px', color: '#e0e0e0' }} iconSize={10} />
                        <Bar dataKey="buy" name="Buy" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="sell" name="Sell" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

// --- TRANSACTION HISTORY LIST ---
const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
};
const listItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

function TransactionHistoryList({ transactions, loading, error }: { transactions: Transaction[]; loading: boolean; error: string | null; }) {
    const renderContent = () => {
        if (loading) {
            return (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 animate-pulse">
                            <div className="h-11 w-11 rounded-full bg-[#1a2b44]"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 rounded bg-[#1a2b44] w-3/4"></div>
                                <div className="h-3 rounded bg-[#1a2b44] w-1/2"></div>
                            </div>
                            <div className="space-y-2 text-right">
                                <div className="h-4 rounded bg-[#1a2b44] w-20 ml-auto"></div>
                                <div className="h-3 rounded bg-[#1a2b44] w-12 ml-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        if (error) return <div className="text-center text-[#ef4444] py-10">{error}</div>;
        if (transactions.length === 0) return <div className="text-center text-[#a0a0a0]/80 py-10">No transactions found.</div>;

        return (
            <motion.div className="space-y-4" variants={listContainerVariants} initial="hidden" animate="visible">
                {transactions.map(tx => (
                    <motion.div key={tx.id} className="flex justify-between items-center" variants={listItemVariants}>
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${tx.type === 'Bought' ? 'bg-green-700/20' : 'bg-red-700/20'}`}>
                                {tx.type === 'Bought' ? <ArrowDownLeftIcon className="h-5 w-5 text-[#d4af37]" /> : <ArrowUpRightIcon className="h-5 w-5 text-[#ef4444]" />}
                            </div>
                            <div>
                                <p className="font-semibold">{tx.type} Gold</p>
                                <p className="text-[#a0a0a0]/80 text-sm">{tx.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">₹{tx.value.toLocaleString('en-IN')}</p>
                            <p className="text-[#a0a0a0]/80 text-sm">{tx.amountGrams} gm</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    return (
        <motion.div className="bg-[#0a1624] rounded-2xl h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="p-6 border-b border-[#1a2b44]">
                <h2 className="text-xl font-bold">Transaction History</h2>
            </div>
            <div className="p-6 max-h-[450px] overflow-y-auto">
                {renderContent()}
            </div>
        </motion.div>
    );
}

// --- SIDEBAR ---
function Sidebar() {
    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboardIcon /> },
        { name: 'Portfolio', href: '/portfolio', icon: <BriefcaseIcon /> },
        { name: 'Transactions', href: '/transactions', icon: <ReceiptTextIcon />, active: true },
        { name: 'Settings', href: "/settings", icon: <SettingsIcon /> },
    ];
    return (
        <aside className="bg-[#0a1624] w-20 lg:w-64 p-4 lg:p-6 flex flex-col">
            <div className="flex items-center space-x-2 mb-12">
                <a href="/dashboard"><GoldCoinIcon className="h-8 w-8 text-[#d4af37]" /></a>
                <a href="/dashboard"><span className="text-2xl font-bold hidden lg:block text-[#d4af37]">Aureus</span></a>
            </div>
            <nav className="flex-1 space-y-4">
                {navItems.map(item => (
                    <a key={item.name} href={item.href} className={`flex items-center p-3 rounded-lg transition-colors ${item.active ? 'bg-[#d4af37]/20 text-[#e0e0e0]' : 'hover:bg-[#1a2b44] text-[#a0a0a0]'}`}>
                        <div className="h-6 w-6">{item.icon}</div>
                        <span className="ml-4 font-semibold hidden lg:block">{item.name}</span>
                    </a>
                ))}
            </nav>
            <div>
                <a href="#" className="flex items-center p-3 rounded-lg hover:bg-[#1a2b44] text-[#a0a0a0]">
                    <LogOutIcon className="h-6 w-6" />
                    <span className="ml-4 font-semibold hidden lg:block">Logout</span>
                </a>
            </div>
        </aside>
    );
}

// --- SVG ICONS ---
function GoldCoinIcon(props: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.093c-1.72.23-2.813.516-3.454.816a.75.75 0 00-.43 1.112c.188.303.626.734 1.258 1.153 1.483.992 2.022 1.928 1.684 2.852-.337.922-1.422 1.32-2.823 1.322v.093a.75.75 0 001.5 0v-.093c1.72-.23 2.813-.516 3.454-.816a.75.75 0 00.43-1.112c-.188-.303-.626-.734-1.258-1.153-1.483-.992-2.022-1.928-1.684-2.852.337-.922 1.422-1.32 2.823-1.322V6z" clipRule="evenodd" /></svg>; }
function LayoutDashboardIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>; }
function BriefcaseIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>; }
function ReceiptTextIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1Z" /><path d="M14 8H8" /><path d="M16 12H8" /><path d="M11 16H8" /></svg>; }
function SettingsIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>; }
function LogOutIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>; }
function ArrowDownLeftIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 7 7 17" /><path d="M17 17H7V7" /></svg>; }
function ArrowUpRightIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 17h10V7" /><path d="M7 7l10 10" /></svg>; }
function DownloadIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>; }
function WalletIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>; }
function TrendingUpIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>; }

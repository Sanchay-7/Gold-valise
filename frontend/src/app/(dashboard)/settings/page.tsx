'use client';

import { useState, SVGProps, FormEvent } from 'react';
import { motion } from 'framer-motion';

// --- MAIN SETTINGS PAGE ---
export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('amol@example.com');
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleNotifications = () => setNotifications(prev => !prev);

  const handleEmailUpdate = (e: FormEvent) => {
    e.preventDefault();
    alert(`Email updated to: ${email}`);
  };

  const handlePasswordUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert("New password and confirmation do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPassword({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirm) alert("Account deleted successfully!");
  };

  return (
    <div className={`font-sans min-h-screen flex ${theme === 'dark' ? 'bg-[#0f1c2c] text-[#e0e0e0]' : 'bg-gray-100 text-gray-800'}`}>
      <Sidebar active="Settings" />
      <main className="flex-1 p-6 overflow-y-auto space-y-6">

        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-[#d4af37]/80">Manage your preferences and account settings.</p>
        </header>

        {/* Theme & Notifications */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h2 className="text-xl font-bold">Theme</h2>
            <p className="text-[#a0a0a0]">Switch between dark and light mode.</p>
            <button 
              onClick={toggleTheme} 
              className="bg-[#1a2b44] hover:bg-[#223450] text-[#e0e0e0] py-2 px-4 rounded-full w-40 mt-3 transition-colors"
            >
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">Notifications</h2>
            <p className="text-[#a0a0a0]">Enable or disable notifications.</p>
            <button 
              onClick={toggleNotifications} 
              className={`py-2 px-4 rounded-full w-40 mt-3 transition-colors ${notifications ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
            >
              {notifications ? 'Enabled' : 'Disabled'}
            </button>
          </Card>
        </motion.div>

        {/* Account Info */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <InfoRow label="Username" value={username} />
          <InfoRow label="Email" value={email} />
          <InfoRow label="Membership" value="Premium" />
        </Card>

        {/* Update Email */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Update Email</h2>
          <form onSubmit={handleEmailUpdate} className="space-y-3">
            <input 
              type="email" 
              className="w-full p-3 rounded-lg bg-[#1a2b44] text-[#e0e0e0] focus:outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="bg-[#d4af37] text-[#0f1c2c] py-2 px-4 rounded-full hover:bg-[#c19c2c] transition-colors">
              Update Email
            </button>
          </form>
        </Card>

        {/* Change Password */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordUpdate} className="space-y-3">
            <input 
              type="password" 
              placeholder="Current Password"
              className="w-full p-3 rounded-lg bg-[#1a2b44] text-[#e0e0e0] focus:outline-none"
              value={password.current}
              onChange={e => setPassword(prev => ({ ...prev, current: e.target.value }))}
              required
            />
            <input 
              type="password" 
              placeholder="New Password"
              className="w-full p-3 rounded-lg bg-[#1a2b44] text-[#e0e0e0] focus:outline-none"
              value={password.new}
              onChange={e => setPassword(prev => ({ ...prev, new: e.target.value }))}
              required
            />
            <input 
              type="password" 
              placeholder="Confirm New Password"
              className="w-full p-3 rounded-lg bg-[#1a2b44] text-[#e0e0e0] focus:outline-none"
              value={password.confirm}
              onChange={e => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
              required
            />
            <button type="submit" className="bg-[#d4af37] text-[#0f1c2c] py-2 px-4 rounded-full hover:bg-[#c19c2c] transition-colors">
              Update Password
            </button>
          </form>
        </Card>

        {/* Delete Account */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-red-400">Delete Account</h2>
          <p className="text-[#a0a0a0] mb-3">This action is irreversible. Proceed with caution.</p>
          <button 
            onClick={handleDeleteAccount} 
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full transition-colors"
          >
            Delete Account
          </button>
        </Card>

      </main>
    </div>
  );
}

// --- REUSABLE CARD ---
function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      className="bg-[#0a1624] p-6 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// --- REUSABLE INFO ROW ---
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-[#1a2b44] rounded-lg mb-2">
      <span className="text-[#a0a0a0] font-semibold">{label}</span>
      <span className="text-[#e0e0e0]">{value}</span>
    </div>
  );
}

// --- SIDEBAR ---
function Sidebar({ active }: { active?: string }) {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboardIcon /> },
    { name: 'Portfolio', href: '/portfolio', icon: <BriefcaseIcon /> },
    { name: 'Transactions', href: '/transactions', icon: <ReceiptTextIcon /> },
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
          <a key={item.name} href={item.href} className={`flex items-center p-3 rounded-lg transition-colors ${active === item.name ? 'bg-[#d4af37]/20 text-[#e0e0e0]' : 'hover:bg-[#1a2b44] text-[#a0a0a0]'}`}>
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
function GoldCoinIcon(props: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.093c-1.72.23-2.813.516-3.454.816a.75.75 0 00-.43 1.112c.188.303.626.734 1.258 1.153 1.483.992 2.022 1.928 1.684 2.852-.337.922-1.422 1.32-2.823 1.322v.093a.75.75 0 001.5 0v-.093c1.72-.23 2.813-.516 3.454-.816a.75.75 0 00.43-1.112c-.188-.303-.626-.734-1.258-1.153-1.483-.992-2.022-1.928-1.684-2.852.337-.922 1.422-1.32 2.823-1.322V6z" /></svg>; }
function LayoutDashboardIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>; }
function BriefcaseIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>; }
function ReceiptTextIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1Z" /><path d="M14 8H8" /><path d="M16 12H8" /><path d="M11 16H8" /></svg>; }
function SettingsIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="3" /></svg>; }
function LogOutIcon(props?: SVGProps<SVGSVGElement>) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>; }

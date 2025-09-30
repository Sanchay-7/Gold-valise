"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  BarChart3,
  Search,
  Settings,
} from "lucide-react";
import "./page.css"; // import the separate CSS file

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("positions");

  const holdings = [
    { name: "Digital Gold", qty: 5, avg: 5900, current: 6000, pnl: 500 },
  ];

  const positions = [
    { name: "GOLD OCT 60000 CE", type: "NRML", ltp: 296.7, pnl: 500 },
    { name: "GOLD OCT 60500 CE", type: "NRML", ltp: 248.25, pnl: 200 },
    { name: "GOLD SEP 59000 CE", type: "NRML", ltp: 47.95, pnl: 450 },
  ];

  const totalPL =
    activeTab === "holdings"
      ? holdings.reduce((sum, h) => sum + h.pnl, 0)
      : positions.reduce((sum, p) => sum + p.pnl, 0);

  return (
    <div className="portfolio">
      {/* Header */}
      <header className="portfolio-header">
        <h1>Portfolio</h1>
        <div className="header-actions">
          <Search size={20} />
          <Settings size={20} />
        </div>
      </header>

      {/* Tabs */}
      <div className="portfolio-tabs">
        <button
          onClick={() => setActiveTab("holdings")}
          className={activeTab === "holdings" ? "active" : ""}
        >
          Holdings ({holdings.length})
        </button>
        <button
          onClick={() => setActiveTab("positions")}
          className={activeTab === "positions" ? "active" : ""}
        >
          Positions ({positions.length})
        </button>
      </div>

      {/* Total P&L */}
      <div className="portfolio-pl">
        <p>Total P&amp;L</p>
        <span className={totalPL >= 0 ? "positive" : "negative"}>
          {totalPL >= 0 ? "+" : ""}
          {totalPL.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Content */}
      <div className="portfolio-content">
        {activeTab === "holdings" &&
          holdings.map((h, idx) => (
            <div key={idx} className="portfolio-item">
              <div>
                <p className="name">{h.name}</p>
                <p className="subtext">
                  Qty: {h.qty} | Avg: ₹{h.avg}
                </p>
              </div>
              <div className="right">
                <p className={h.pnl >= 0 ? "positive" : "negative"}>
                  {h.pnl >= 0 ? "+" : ""}
                  {h.pnl}
                </p>
                <p className="subtext">LTP: ₹{h.current}</p>
              </div>
            </div>
          ))}

        {activeTab === "positions" &&
          positions.map((p, idx) => (
            <div key={idx} className="portfolio-item">
              <div>
                <p className="name">{p.name}</p>
                <p className="subtext">{p.type}</p>
              </div>
              <div className="right">
                <p className={p.pnl >= 0 ? "positive" : "negative"}>
                  {p.pnl >= 0 ? "+" : ""}
                  {p.pnl}
                </p>
                <p className="subtext">LTP: ₹{p.ltp}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Bottom Nav */}
      <nav className="portfolio-nav">
        <div>
          <BarChart3 size={20} />
          <span>Watchlist</span>
        </div>
        <div>
          <Briefcase size={20} />
          <span>Orders</span>
        </div>
        <div className="active">
          <Briefcase size={20} />
          <span>Portfolio</span>
        </div>
        <div>
          <TrendingUp size={20} />
          <span>Bids</span>
        </div>
        <div>
          <TrendingDown size={20} />
          <span>Profile</span>
        </div>
      </nav>
    </div>
  );
}

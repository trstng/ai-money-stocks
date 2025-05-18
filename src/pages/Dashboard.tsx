
import React from "react";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    // No navigation here - Auth state will trigger the appropriate redirects
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-aineon">AI Money</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2 border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard content - unchanged */}
        <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stock cards */}
          <div className="bg-gray-800 border border-aipurple/30 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-aineon">AAPL</h3>
            <p className="text-2xl font-bold mb-1">$178.72</p>
            <p className="text-green-400 mb-4">+2.35 (1.32%)</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Volume</span>
                <span>58.7M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Range</span>
                <span>$175.80 - $179.25</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-aipurple/30 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-aineon">MSFT</h3>
            <p className="text-2xl font-bold mb-1">$417.45</p>
            <p className="text-red-400 mb-4">-3.22 (0.78%)</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Volume</span>
                <span>22.3M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Range</span>
                <span>$415.12 - $421.66</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-aipurple/30 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-aineon">TSLA</h3>
            <p className="text-2xl font-bold mb-1">$175.34</p>
            <p className="text-green-400 mb-4">+7.83 (4.52%)</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Volume</span>
                <span>103.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Range</span>
                <span>$168.45 - $177.23</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 border border-aipurple/30 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Technical Analysis</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium mb-2 text-aipurple">Moving Averages</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>20-Day SMA</span>
                    <span className="text-green-400">Bullish</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50-Day SMA</span>
                    <span className="text-green-400">Bullish</span>
                  </div>
                  <div className="flex justify-between">
                    <span>200-Day SMA</span>
                    <span className="text-red-400">Bearish</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-aipurple">Oscillators</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>RSI (14)</span>
                    <span className="text-yellow-400">Neutral (58.3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MACD (12,26,9)</span>
                    <span className="text-green-400">Bullish</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stochastic (14,3,3)</span>
                    <span className="text-red-400">Bearish</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-aipurple/30 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Backtest Results</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-3 text-aipurple">20-Day SMA Strategy</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Total Return</p>
                    <p className="text-xl font-bold text-green-400">+23.7%</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Win Rate</p>
                    <p className="text-xl font-bold">67%</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Profit Factor</p>
                    <p className="text-xl font-bold">2.1</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Max Drawdown</p>
                    <p className="text-xl font-bold text-red-400">-12.4%</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3 text-aipurple">RSI Oversold/Overbought</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Total Return</p>
                    <p className="text-xl font-bold text-green-400">+18.3%</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Win Rate</p>
                    <p className="text-xl font-bold">59%</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Profit Factor</p>
                    <p className="text-xl font-bold">1.7</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">Max Drawdown</p>
                    <p className="text-xl font-bold text-red-400">-8.9%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";
import { Home, LogOut, ChartBar, ChartLine, ChartPie, DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";

// Mock stock data
const stockData = [
  { name: "Jan", price: 148.45, sma: 142.25, rsi: 62, volume: 45000, above_sma: 18 },
  { name: "Feb", price: 156.72, sma: 150.64, rsi: 68, volume: 55400, above_sma: 20 },
  { name: "Mar", price: 163.98, sma: 158.28, rsi: 72, volume: 62000, above_sma: 22 },
  { name: "Apr", price: 159.32, sma: 160.14, rsi: 48, volume: 48900, above_sma: 14 },
  { name: "May", price: 166.87, sma: 162.35, rsi: 58, volume: 52500, above_sma: 18 },
  { name: "Jun", price: 172.43, sma: 165.82, rsi: 65, volume: 58700, above_sma: 21 },
  { name: "Jul", price: 168.76, sma: 167.47, rsi: 55, volume: 50200, above_sma: 16 },
  { name: "Aug", price: 178.52, sma: 170.14, rsi: 75, volume: 67800, above_sma: 23 },
  { name: "Sep", price: 185.23, sma: 174.45, rsi: 80, volume: 72300, above_sma: 25 },
  { name: "Oct", price: 180.15, sma: 177.82, rsi: 62, volume: 61500, above_sma: 19 },
  { name: "Nov", price: 188.74, sma: 180.68, rsi: 70, volume: 66400, above_sma: 22 },
  { name: "Dec", price: 195.32, sma: 184.29, rsi: 78, volume: 75100, above_sma: 24 }
];

// Mock backtest results
const backtestResults = [
  { strategy: "RSI Oversold", win_rate: 68, profit_factor: 1.85, trades: 124, expectancy: 2.3 },
  { strategy: "Golden Cross", win_rate: 62, profit_factor: 1.65, trades: 45, expectancy: 1.8 },
  { strategy: "MACD Divergence", win_rate: 59, profit_factor: 1.72, trades: 87, expectancy: 1.9 },
  { strategy: "Bollinger Bounce", win_rate: 72, profit_factor: 2.1, trades: 103, expectancy: 2.6 },
];

// Portfolio performance data
const portfolioData = [
  { name: "Jan", ai_strategy: 5.2, market: 3.1 },
  { name: "Feb", ai_strategy: 2.1, market: 1.4 },
  { name: "Mar", ai_strategy: -1.8, market: -2.3 },
  { name: "Apr", ai_strategy: 3.7, market: 2.2 },
  { name: "May", ai_strategy: 6.5, market: 4.1 },
  { name: "Jun", ai_strategy: 4.2, market: 3.8 },
  { name: "Jul", ai_strategy: -0.5, market: -1.2 },
  { name: "Aug", ai_strategy: 7.8, market: 5.4 },
  { name: "Sep", ai_strategy: 9.2, market: 6.5 },
  { name: "Oct", ai_strategy: -2.3, market: -4.1 },
  { name: "Nov", ai_strategy: 5.9, market: 3.2 },
  { name: "Dec", ai_strategy: 8.3, market: 5.8 },
];

// Mock stocks for watchlist
const watchlistStocks = [
  { symbol: "AAPL", name: "Apple Inc", price: 188.92, change: 2.34 },
  { symbol: "MSFT", name: "Microsoft Corp", price: 334.45, change: -1.23 },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 142.18, change: 5.67 },
  { symbol: "AMZN", name: "Amazon.com Inc", price: 156.78, change: 3.45 },
  { symbol: "META", name: "Meta Platforms", price: 321.56, change: -2.78 }
];

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-aidark retro-grid">
      {/* Dashboard layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-20 md:w-64 h-screen fixed bg-card border-r border-border">
          <div className="flex flex-col items-center md:items-start p-4 md:p-6">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-gradient-to-r from-aipurple to-aineon flex items-center justify-center">
                <DollarSign className="text-white h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="hidden md:block text-xl font-bold ml-2 text-white">
                AI Money
              </span>
            </div>
            
            <nav className="w-full space-y-1">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "overview" ? "bg-aipurple hover:bg-aipurple/90" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <Home className="w-5 h-5 mr-2" />
                <span className="hidden md:inline-flex">Overview</span>
              </Button>
              
              <Button
                variant={activeTab === "stocks" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "stocks" ? "bg-aipurple hover:bg-aipurple/90" : ""}`}
                onClick={() => setActiveTab("stocks")}
              >
                <ChartLine className="w-5 h-5 mr-2" />
                <span className="hidden md:inline-flex">Stocks</span>
              </Button>
              
              <Button
                variant={activeTab === "backtest" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "backtest" ? "bg-aipurple hover:bg-aipurple/90" : ""}`}
                onClick={() => setActiveTab("backtest")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                <span className="hidden md:inline-flex">Backtest</span>
              </Button>
              
              <Button
                variant={activeTab === "performance" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "performance" ? "bg-aipurple hover:bg-aipurple/90" : ""}`}
                onClick={() => setActiveTab("performance")}
              >
                <ChartBar className="w-5 h-5 mr-2" />
                <span className="hidden md:inline-flex">Performance</span>
              </Button>
            </nav>
            
            <div className="mt-auto">
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="w-full justify-start text-red-500 hover:text-red-400"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span className="hidden md:inline-flex">Logout</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="ml-20 md:ml-64 p-6 w-full">
          <TabsContent value="overview" className={activeTab === "overview" ? "block" : "hidden"}>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-aidark neon-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    Portfolio Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">$124,568.45</div>
                  <p className="text-sm text-green-500">+15.23% (YTD)</p>
                </CardContent>
              </Card>
              
              <Card className="bg-aidark neon-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                    <ChartPie className="h-4 w-4 mr-2 text-aipurple" />
                    Active Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">4</div>
                  <p className="text-sm text-aipurple">2 profitable, 2 monitoring</p>
                </CardContent>
              </Card>
              
              <Card className="bg-aidark neon-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 text-aiorange" />
                    Backtest Runs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">28</div>
                  <p className="text-sm text-aiorange">Last run: Today</p>
                </CardContent>
              </Card>
              
              <Card className="bg-aidark neon-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                    <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
                    Win Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">68%</div>
                  <p className="text-sm text-red-500">124 trades</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Performance chart */}
            <Card className="mb-8 bg-aidark neon-border">
              <CardHeader>
                <CardTitle className="text-white">Performance vs Market</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolioData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1A1F2C",
                          borderColor: "#9b87f5",
                          color: "#fff",
                        }}
                      />
                      <Line
                        name="AI Strategy"
                        type="monotone"
                        dataKey="ai_strategy"
                        stroke="#9b87f5"
                        strokeWidth={3}
                        dot={{ stroke: "#9b87f5", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        name="Market"
                        type="monotone"
                        dataKey="market"
                        stroke="#888"
                        strokeWidth={2}
                        dot={{ stroke: "#888", strokeWidth: 1, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Watchlist */}
            <Card className="bg-aidark neon-border">
              <CardHeader>
                <CardTitle className="text-white">Watchlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 text-muted-foreground">Symbol</th>
                        <th className="text-left py-3 text-muted-foreground">Name</th>
                        <th className="text-right py-3 text-muted-foreground">Price</th>
                        <th className="text-right py-3 text-muted-foreground">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlistStocks.map((stock) => (
                        <tr key={stock.symbol} className="border-b border-border/50">
                          <td className="py-3 font-medium text-white">{stock.symbol}</td>
                          <td className="py-3 text-muted-foreground">{stock.name}</td>
                          <td className="py-3 text-right font-medium text-white">${stock.price}</td>
                          <td className={`py-3 text-right font-medium ${
                            stock.change > 0 ? "text-green-500" : "text-red-500"
                          }`}>
                            {stock.change > 0 ? "+" : ""}{stock.change}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stocks" className={activeTab === "stocks" ? "block" : "hidden"}>
            <h1 className="text-3xl font-bold text-white mb-8">Stock Analysis</h1>
            
            {/* AAPL Stock analysis */}
            <Card className="mb-8 bg-aidark neon-border">
              <CardHeader>
                <CardTitle className="text-white">AAPL - Apple Inc.</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorSma" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D946EF" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#D946EF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1A1F2C",
                          borderColor: "#9b87f5",
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#9b87f5"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                      <Area
                        type="monotone"
                        dataKey="sma"
                        stroke="#D946EF"
                        fillOpacity={0.3}
                        fill="url(#colorSma)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Technical indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RSI Chart */}
              <Card className="bg-aidark neon-border">
                <CardHeader>
                  <CardTitle className="text-white">RSI (Relative Strength Index)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stockData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#F97316",
                            color: "#fff",
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rsi" 
                          stroke="#F97316" 
                          dot={{ stroke: "#F97316", strokeWidth: 2, r: 3 }}
                        />
                        {/* Overbought line */}
                        <Line 
                          dataKey={() => 70} 
                          stroke="#ea384c" 
                          strokeDasharray="5 5" 
                          dot={false}
                        />
                        {/* Oversold line */}
                        <Line 
                          dataKey={() => 30} 
                          stroke="#1EAEDB" 
                          strokeDasharray="5 5" 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Volume Chart */}
              <Card className="bg-aidark neon-border">
                <CardHeader>
                  <CardTitle className="text-white">Trading Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stockData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#9b87f5",
                            color: "#fff",
                          }}
                        />
                        <Bar dataKey="volume" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Days Above SMA */}
              <Card className="bg-aidark neon-border">
                <CardHeader>
                  <CardTitle className="text-white">Days Above 20 SMA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stockData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#D946EF",
                            color: "#fff",
                          }}
                        />
                        <Bar dataKey="above_sma" fill="#D946EF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Key Stats */}
              <Card className="bg-aidark neon-border">
                <CardHeader>
                  <CardTitle className="text-white">Key Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground">Current Price</p>
                      <p className="text-xl font-bold text-white">$195.32</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">52 Week Range</p>
                      <p className="text-white">$124.17 - $198.23</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Market Cap</p>
                      <p className="text-white">$2.94T</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Dividend Yield</p>
                      <p className="text-white">0.54%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">P/E Ratio</p>
                      <p className="text-white">32.45</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Beta</p>
                      <p className="text-white">1.28</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="backtest" className={activeTab === "backtest" ? "block" : "hidden"}>
            <h1 className="text-3xl font-bold text-white mb-8">Strategy Backtesting</h1>
            
            {/* Backtest results */}
            <Card className="mb-8 bg-aidark neon-border">
              <CardHeader>
                <CardTitle className="text-white">Backtest Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 text-muted-foreground">Strategy</th>
                        <th className="text-right py-3 text-muted-foreground">Win Rate</th>
                        <th className="text-right py-3 text-muted-foreground">Profit Factor</th>
                        <th className="text-right py-3 text-muted-foreground">Trades</th>
                        <th className="text-right py-3 text-muted-foreground">Expectancy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backtestResults.map((result, index) => (
                        <tr key={index} className="border-b border-border/50 hover:bg-muted/5">
                          <td className="py-3 font-medium text-white">{result.strategy}</td>
                          <td className="py-3 text-right font-medium text-white">{result.win_rate}%</td>
                          <td className="py-3 text-right font-medium text-white">{result.profit_factor}</td>
                          <td className="py-3 text-right text-muted-foreground">{result.trades}</td>
                          <td className="py-3 text-right text-muted-foreground">${result.expectancy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Strategy comparison */}
            <Card className="mb-8 bg-aidark neon-border">
              <CardHeader>
                <CardTitle className="text-white">Strategy Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={backtestResults} 
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#444" />
                      <XAxis type="number" stroke="#888" />
                      <YAxis dataKey="strategy" type="category" stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1A1F2C",
                          borderColor: "#9b87f5",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="win_rate" fill="#9b87f5" name="Win Rate (%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Optimization parameters */}
            <Card className="bg-aidark neon-border">
              <CardHeader>
                <CardTitle className="text-white">Strategy Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-muted">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm text-white">RSI Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Overbought Level:</span>
                          <span className="text-white">70</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Oversold Level:</span>
                          <span className="text-white">30</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Period:</span>
                          <span className="text-white">14 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm text-white">Moving Averages</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fast MA Period:</span>
                          <span className="text-white">20 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Slow MA Period:</span>
                          <span className="text-white">50 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="text-white">Exponential</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm text-white">MACD Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fast Period:</span>
                          <span className="text-white">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Slow Period:</span>
                          <span className="text-white">26</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Signal Period:</span>
                          <span className="text-white">9</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm text-white">Bollinger Bands</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Period:</span>
                          <span className="text-white">20</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Standard Deviation:</span>
                          <span className="text-white">2.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">MA Type:</span>
                          <span className="text-white">Simple</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className={activeTab === "performance" ? "block" : "hidden"}>
            <h1 className="text-3xl font-bold text-white mb-8">Performance Analytics</h1>
            
            {/* Yearly performance */}
            <Card className="mb-8 bg-aidark neon-border">
              <CardHeader>
                <CardTitle className="text-white">Annual Performance (2023)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolioData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1A1F2C",
                          borderColor: "#9b87f5",
                          color: "#fff",
                        }}
                      />
                      <Line
                        name="AI Strategy"
                        type="monotone"
                        dataKey="ai_strategy"
                        stroke="#9b87f5"
                        strokeWidth={3}
                        dot={{ stroke: "#9b87f5", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        name="Market"
                        type="monotone"
                        dataKey="market"
                        stroke="#888"
                        strokeWidth={2}
                        dot={{ stroke: "#888", strokeWidth: 1, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Performance statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-aidark neon-border">
                <CardHeader>
                  <CardTitle className="text-white">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Annualized Return</span>
                      <span className="text-xl font-bold text-white">32.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sharpe Ratio</span>
                      <span className="text-xl font-bold text-white">2.14</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Maximum Drawdown</span>
                      <span className="text-xl font-bold text-red-500">-12.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Alpha</span>
                      <span className="text-xl font-bold text-aipurple">8.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Beta</span>
                      <span className="text-xl font-bold text-white">0.85</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-aidark neon-border">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Returns (%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {portfolioData.map((month, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-md ${
                          month.ai_strategy >= 0 ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        <div className="text-xs text-muted-foreground">{month.name}</div>
                        <div
                          className={`text-lg font-bold ${
                            month.ai_strategy >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {month.ai_strategy > 0 ? "+" : ""}
                          {month.ai_strategy}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Strategy allocation */}
            <Card className="bg-aidark neon-border">
              <CardHeader>
                <CardTitle className="text-white">Strategy Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="col-span-1 md:col-span-3">
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={backtestResults} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="strategy" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1A1F2C",
                              borderColor: "#D946EF",
                              color: "#fff",
                            }}
                          />
                          <Bar dataKey="profit_factor" fill="#D946EF" name="Profit Factor" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="md:border-l border-border pl-0 md:pl-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Capital Allocation</div>
                        <div className="flex items-center mt-1">
                          <div className="w-3 h-3 rounded-full bg-aipurple mr-2"></div>
                          <div className="text-sm">RSI Oversold: 40%</div>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-3 h-3 rounded-full bg-aineon mr-2"></div>
                          <div className="text-sm">Golden Cross: 25%</div>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-3 h-3 rounded-full bg-aiorange mr-2"></div>
                          <div className="text-sm">MACD Divergence: 15%</div>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-3 h-3 rounded-full bg-aiblue mr-2"></div>
                          <div className="text-sm">Bollinger Bounce: 20%</div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border mt-4">
                        <div className="text-sm text-muted-foreground mb-2">Rebalance Frequency</div>
                        <div className="text-white">Monthly</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

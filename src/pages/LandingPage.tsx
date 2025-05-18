
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/App";
import { ArrowDown } from "lucide-react";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cube1Ref = useRef<HTMLDivElement>(null);
  const cube2Ref = useRef<HTMLDivElement>(null);
  const cube3Ref = useRef<HTMLDivElement>(null);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Handle parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        
        if (heroRef.current) {
          heroRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
        
        if (cube1Ref.current) {
          cube1Ref.current.style.transform = `translateY(${scrollPosition * 0.2}px) rotate(${scrollPosition * 0.05}deg)`;
        }
        
        if (cube2Ref.current) {
          cube2Ref.current.style.transform = `translateY(${scrollPosition * -0.15}px) rotate(${scrollPosition * -0.08}deg)`;
        }
        
        if (cube3Ref.current) {
          cube3Ref.current.style.transform = `translateY(${scrollPosition * 0.1}px) rotate(${scrollPosition * -0.05}deg)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-aidark overflow-hidden">
      {/* Parallax wrapper */}
      <div ref={parallaxRef} className="relative">
        {/* Hero section */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden retro-grid">
          <div className="hero-glow"></div>
          <div ref={heroRef} className="container mx-auto px-4 z-10">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
                <span className="text-aipurple animate-pulse-glow">AI</span>{" "}
                <span className="text-white">MONEY</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
                Algorithmic intelligence meets technical analysis. Trade smarter with backtested strategies powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#auth"
                  className="px-8 py-3 bg-gradient-to-r from-aipurple to-aineon text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="px-8 py-3 bg-transparent border border-aipurple text-white font-medium rounded-md hover:bg-aipurple/10 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          
          {/* 3D elements */}
          <div
            ref={cube1Ref}
            className="absolute -top-20 left-[10%] w-40 h-40 md:w-60 md:h-60 bg-gradient-to-br from-aipurple/20 to-transparent border border-aipurple/30 rounded-lg transform rotate-12 animate-float"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            ref={cube2Ref}
            className="absolute top-40 right-[5%] w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-aineon/20 to-transparent border border-aineon/30 rounded-lg transform -rotate-6 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            ref={cube3Ref}
            className="absolute bottom-20 left-[20%] w-28 h-28 md:w-40 md:h-40 bg-gradient-to-br from-aiorange/20 to-transparent border border-aiorange/30 rounded-lg transform rotate-45 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          
          {/* Scroll down indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-muted-foreground mb-2">Scroll Down</span>
            <ArrowDown className="h-6 w-6 text-aipurple" />
          </div>
        </div>

        {/* Feature highlights */}
        <div id="features" className="py-24 bg-aidark">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-glow text-white">
              Why <span className="text-aipurple">AI Money</span> Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg neon-border bg-aidark">
                <h3 className="text-2xl font-bold mb-3 text-white">Machine Learning</h3>
                <p className="text-muted-foreground">
                  Our algorithms analyze thousands of data points to identify patterns that humans might miss.
                </p>
              </div>
              
              <div className="p-6 rounded-lg neon-border bg-aidark">
                <h3 className="text-2xl font-bold mb-3 text-white">Technical Analysis</h3>
                <p className="text-muted-foreground">
                  Combine traditional indicators like RSI, MACD, and moving averages with cutting-edge AI.
                </p>
              </div>
              
              <div className="p-6 rounded-lg neon-border bg-aidark">
                <h3 className="text-2xl font-bold mb-3 text-white">Backtesting</h3>
                <p className="text-muted-foreground">
                  Test your strategies against decades of historical market data to see what really works.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="py-24 bg-gradient-to-b from-aidark to-aidark/95">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              How It <span className="text-aineon">Works</span>
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative pl-10 pb-10">
                <div className="absolute left-0 top-0 h-full w-1 bg-aipurple"></div>
                <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-aipurple -ml-1.5"></div>
                <h3 className="text-2xl font-bold mb-3 text-white">Analyze</h3>
                <p className="text-muted-foreground">
                  Our system analyzes market data and identifies potential trading opportunities based on your criteria.
                </p>
              </div>
              
              <div className="relative pl-10 pb-10">
                <div className="absolute left-0 top-0 h-full w-1 bg-aineon"></div>
                <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-aineon -ml-1.5"></div>
                <h3 className="text-2xl font-bold mb-3 text-white">Backtest</h3>
                <p className="text-muted-foreground">
                  Test your strategies against historical data to see how they would have performed.
                </p>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-aiorange -ml-1.5"></div>
                <h3 className="text-2xl font-bold mb-3 text-white">Execute</h3>
                <p className="text-muted-foreground">
                  Use our insights to make informed trading decisions or let our AI execute trades automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth section */}
        <div id="auth" className="py-24 bg-aidark">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8 text-white">
                Join <span className="text-aiorange">AI Money</span> Today
              </h2>
              <AuthForm />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-8 bg-aidark border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">© 2025 AI Money. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-white">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-white">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-white">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

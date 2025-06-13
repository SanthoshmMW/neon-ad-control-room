
import React from 'react';
import { Activity, Zap, MapPin, TrendingUp } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <header className="border-b cyber-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg cyber-gradient">
              <Activity className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-2xl font-bold cyber-text-glow">
                Japan OOH Command Center
              </h1>
              <p className="text-muted-foreground">
                Digital Out-of-Home Supply-Side Platform - Japan Market
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary neon-pulse"></div>
              <span className="text-primary">Live Japan Feed</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>Active Screens: 2,847</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Japan Markets: 8</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>+12.4% Fill Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

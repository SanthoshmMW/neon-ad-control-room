
import React from 'react';
import { Activity, Zap, Globe, TrendingUp } from 'lucide-react';

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
                Campaign Command Center
              </h1>
              <p className="text-muted-foreground">
                Programmatic Advertising Mission Control
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary neon-pulse"></div>
              <span className="text-primary">Live Feed Active</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>DSP Connected: 3/3</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Global RTB</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>+15.2% Performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, TrendingUp, Monitor } from 'lucide-react';

interface LocationData {
  market: string;
  performance: number;
  revenue: string;
  screens: number;
  trend: 'up' | 'down';
}

export const PerformanceGlobe = () => {
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [locationData] = useState<LocationData[]>([
    { market: 'New York Metro', performance: 94, revenue: '$34,560', screens: 847, trend: 'up' },
    { market: 'Los Angeles', performance: 87, revenue: '$28,230', screens: 623, trend: 'up' },
    { market: 'Chicago', performance: 91, revenue: '$19,440', screens: 445, trend: 'up' },
    { market: 'Miami-Dade', performance: 76, revenue: '$12,920', screens: 287, trend: 'down' },
    { market: 'Dallas-Fort Worth', performance: 83, revenue: '$16,180', screens: 356, trend: 'up' }
  ]);

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="cyber-border bg-card/80 backdrop-blur">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Monitor className="h-5 w-5 text-primary" />
          <CardTitle className="cyber-text-glow">OOH Market Performance</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Market Performance Visualization */}
          <div className="w-full h-48 relative rounded-lg bg-gradient-to-br from-cyber-navy to-background cyber-border overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-lg"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
            />
            
            {/* Market hotspots representing major OOH locations */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-primary cyber-glow animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-secondary cyber-glow-magenta animate-pulse" />
            <div className="absolute bottom-1/3 left-1/2 w-4 h-4 rounded-full bg-primary cyber-glow animate-pulse" />
            <div className="absolute top-2/3 left-1/4 w-2 h-2 rounded-full bg-primary cyber-glow animate-pulse" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold cyber-text-glow">96.8%</div>
                <div className="text-xs text-muted-foreground">Network Uptime</div>
              </div>
            </div>
          </div>
          
          {/* Market Performance List */}
          <div className="mt-4 space-y-2">
            {locationData.map((location, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all cyber-border bg-background/30 hover:bg-background/50 ${
                  selectedMarket === location.market ? 'cyber-glow' : ''
                }`}
                onClick={() => setSelectedMarket(location.market)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{location.market}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-primary font-medium">
                      {location.revenue}
                    </span>
                    <TrendingUp className={`h-3 w-3 ${
                      location.trend === 'up' ? 'text-primary' : 'text-secondary'
                    }`} />
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Performance</span>
                      <span>{location.performance}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="cyber-gradient h-1 rounded-full transition-all duration-500"
                        style={{ width: `${location.performance}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Active Screens</div>
                    <div className="text-sm font-medium text-primary">{location.screens}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, MapPin, TrendingUp } from 'lucide-react';

interface GeoData {
  region: string;
  performance: number;
  revenue: string;
  trend: 'up' | 'down';
}

export const PerformanceGlobe = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [geoData] = useState<GeoData[]>([
    { region: 'North America', performance: 89, revenue: '$24,560', trend: 'up' },
    { region: 'Europe', performance: 76, revenue: '$18,230', trend: 'up' },
    { region: 'APAC', performance: 92, revenue: '$31,440', trend: 'up' },
    { region: 'Latin America', performance: 67, revenue: '$8,920', trend: 'down' },
    { region: 'Middle East', performance: 74, revenue: '$12,180', trend: 'up' }
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
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle className="cyber-text-glow">Global Performance</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Simplified 3D Globe Visualization */}
          <div className="w-full h-48 relative rounded-lg bg-gradient-to-br from-cyber-navy to-background cyber-border overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-lg"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
            />
            
            {/* Performance hotspots */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-primary cyber-glow animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-secondary cyber-glow-magenta animate-pulse" />
            <div className="absolute bottom-1/3 left-1/2 w-4 h-4 rounded-full bg-primary cyber-glow animate-pulse" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold cyber-text-glow">94.2%</div>
                <div className="text-xs text-muted-foreground">Global Uptime</div>
              </div>
            </div>
          </div>
          
          {/* Regional Performance List */}
          <div className="mt-4 space-y-2">
            {geoData.map((region, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all cyber-border bg-background/30 hover:bg-background/50 ${
                  selectedRegion === region.region ? 'cyber-glow' : ''
                }`}
                onClick={() => setSelectedRegion(region.region)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{region.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-primary font-medium">
                      {region.revenue}
                    </span>
                    <TrendingUp className={`h-3 w-3 ${
                      region.trend === 'up' ? 'text-primary' : 'text-secondary'
                    }`} />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Performance</span>
                    <span>{region.performance}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="cyber-gradient h-1 rounded-full transition-all duration-500"
                      style={{ width: `${region.performance}%` }}
                    />
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


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MapPin, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface CountryData {
  country: string;
  flag: string;
  bidRequests: number;
  bidResponses: number;
  adPlays: number;
  billableAdPlays: number;
  revenue: number;
  screens: number;
  performance: number;
  status: 'on-track' | 'below-threshold' | 'exceeding';
  trend: 'up' | 'down';
}

interface CountryPerformanceProps {
  onBack: () => void;
  onDealDrillDown: (country: string) => void;
}

export const CountryPerformance = ({ onBack, onDealDrillDown }: CountryPerformanceProps) => {
  const [countries] = useState<CountryData[]>([
    {
      country: 'United States',
      flag: '🇺🇸',
      bidRequests: 18420,
      bidResponses: 15680,
      adPlays: 13240,
      billableAdPlays: 11890,
      revenue: 52340,
      screens: 1247,
      performance: 85,
      status: 'below-threshold',
      trend: 'up'
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      bidRequests: 8950,
      bidResponses: 7820,
      adPlays: 6890,
      billableAdPlays: 6120,
      revenue: 28470,
      screens: 543,
      performance: 92,
      status: 'on-track',
      trend: 'up'
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      bidRequests: 7680,
      bidResponses: 6420,
      adPlays: 5730,
      billableAdPlays: 5180,
      revenue: 21890,
      screens: 421,
      performance: 78,
      status: 'below-threshold',
      trend: 'down'
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      bidRequests: 5230,
      bidResponses: 4650,
      adPlays: 4120,
      billableAdPlays: 3755,
      revenue: 16080,
      screens: 342,
      performance: 89,
      status: 'on-track',
      trend: 'up'
    },
    {
      country: 'Australia',
      flag: '🇦🇺',
      bidRequests: 5000,
      bidResponses: 4080,
      adPlays: 3200,
      billableAdPlays: 2000,
      revenue: 6000,
      screens: 294,
      performance: 45,
      status: 'below-threshold',
      trend: 'down'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-primary/20 text-primary border-primary/50';
      case 'below-threshold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'exceeding': return 'bg-primary/20 text-primary border-primary/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack} className="cyber-border">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Global
          </Button>
          <h2 className="text-lg font-semibold cyber-text-glow">Performance by Country</h2>
        </div>
      </div>

      <div className="grid gap-4">
        {countries.map((country, index) => (
          <Card 
            key={index} 
            className="cyber-border bg-card/80 backdrop-blur hover-cyber-glow cursor-pointer"
            onClick={() => onDealDrillDown(country.country)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{country.country}</h3>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{country.screens} screens</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(country.status)}>
                    {country.status === 'on-track' ? 'On Track' : 'Below Target'}
                  </Badge>
                  {country.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5 text-primary" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-secondary" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Bid Requests</div>
                  <div className="text-lg font-semibold text-primary">
                    {country.bidRequests.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Responses</div>
                  <div className="text-lg font-semibold text-primary">
                    {country.bidResponses.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Ad Plays</div>
                  <div className="text-lg font-semibold text-primary">
                    {country.adPlays.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Billable</div>
                  <div className="text-lg font-semibold text-primary">
                    {country.billableAdPlays.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Revenue</div>
                  <div className="text-lg font-semibold text-primary">
                    ${country.revenue.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Performance</div>
                  <div className="text-lg font-semibold">
                    {country.performance}%
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Overall Performance</span>
                  <span>{country.performance}%</span>
                </div>
                <Progress value={country.performance} className="h-2" />
              </div>

              {country.status === 'below-threshold' && (
                <div className="mt-3 flex items-center space-x-2 text-yellow-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs">Click to analyze deal performance and issues</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

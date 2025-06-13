
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target, Zap, Monitor, Send, Play } from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  change: number;
  progress: number;
  threshold: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  status: 'on-track' | 'below-threshold' | 'exceeding';
}

interface MetricsGridProps {
  onCountryDrillDown?: () => void;
}

export const MetricsGrid = ({ onCountryDrillDown }: MetricsGridProps) => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: 'Bid Requests',
      value: '45,280',
      change: 12.4,
      progress: 89,
      threshold: 50000,
      icon: <Send className="h-5 w-5" />,
      trend: 'up',
      status: 'below-threshold'
    },
    {
      title: 'Bid Responses',
      value: '38,650',
      change: 8.7,
      progress: 85,
      threshold: 45000,
      icon: <Target className="h-5 w-5" />,
      trend: 'up',
      status: 'below-threshold'
    },
    {
      title: 'Ad Plays',
      value: '32,180',
      change: 6.2,
      progress: 83,
      threshold: 38000,
      icon: <Play className="h-5 w-5" />,
      trend: 'up',
      status: 'below-threshold'
    },
    {
      title: 'Billable Ad Plays',
      value: '28,945',
      change: 5.8,
      progress: 90,
      threshold: 32000,
      icon: <Zap className="h-5 w-5" />,
      trend: 'up',
      status: 'below-threshold'
    },
    {
      title: 'Revenue',
      value: '$124,780',
      change: 15.2,
      progress: 78,
      threshold: 160000,
      icon: <DollarSign className="h-5 w-5" />,
      trend: 'up',
      status: 'below-threshold'
    },
    {
      title: 'Active Screens',
      value: '2,847',
      change: -0.3,
      progress: 95,
      threshold: 3000,
      icon: <Monitor className="h-5 w-5" />,
      trend: 'down',
      status: 'on-track'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.title === 'Bid Requests' 
          ? `${(Math.random() * 5000 + 42000).toFixed(0)}` 
          : metric.value,
        progress: Math.min(100, Math.max(0, metric.progress + (Math.random() - 0.5) * 3))
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-primary';
      case 'below-threshold': return 'text-yellow-400';
      case 'exceeding': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track': return 'On Track';
      case 'below-threshold': return 'Below Target';
      case 'exceeding': return 'Exceeding';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold cyber-text-glow">Global OOH Performance</h2>
        <div className="text-sm text-muted-foreground">
          Click any metric to drill down by country
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card 
            key={index} 
            className="cyber-border bg-card/80 backdrop-blur hover-cyber-glow cursor-pointer transition-all"
            onClick={onCountryDrillDown}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="text-primary">{metric.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold cyber-text-glow mb-2">
                {metric.value}
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-xs">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-primary" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-secondary" />
                  )}
                  <span className={metric.trend === 'up' ? 'text-primary' : 'text-secondary'}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
                
                <div className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {getStatusBadge(metric.status)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Target Progress</span>
                  <span>{metric.progress}%</span>
                </div>
                <Progress 
                  value={metric.progress} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

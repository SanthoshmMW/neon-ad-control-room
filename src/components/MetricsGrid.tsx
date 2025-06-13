
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target, Zap, Monitor } from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  change: number;
  progress: number;
  threshold: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

export const MetricsGrid = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: 'Impression Requests/min',
      value: '8,432',
      change: 15.7,
      progress: 84,
      threshold: 85,
      icon: <Zap className="h-5 w-5" />,
      trend: 'up'
    },
    {
      title: 'Fill Rate',
      value: '76.3%',
      change: 4.2,
      progress: 76,
      threshold: 80,
      icon: <Target className="h-5 w-5" />,
      trend: 'up'
    },
    {
      title: 'Revenue Today',
      value: '$94,670',
      change: 12.1,
      progress: 78,
      threshold: 120000,
      icon: <DollarSign className="h-5 w-5" />,
      trend: 'up'
    },
    {
      title: 'Active Screens',
      value: '2,847',
      change: -0.3,
      progress: 95,
      threshold: 3000,
      icon: <Monitor className="h-5 w-5" />,
      trend: 'down'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.title === 'Impression Requests/min' 
          ? `${(Math.random() * 2000 + 7000).toFixed(0)}` 
          : metric.value,
        progress: Math.min(100, Math.max(0, metric.progress + (Math.random() - 0.5) * 5))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="cyber-border bg-card/80 backdrop-blur hover-cyber-glow">
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
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-3">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-primary" />
              ) : (
                <TrendingDown className="h-3 w-3 text-secondary" />
              )}
              <span className={metric.trend === 'up' ? 'text-primary' : 'text-secondary'}>
                {metric.change > 0 ? '+' : ''}{metric.change}% from yesterday
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Performance</span>
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
  );
};

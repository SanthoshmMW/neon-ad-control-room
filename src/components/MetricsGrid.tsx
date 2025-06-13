
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target, Zap, AlertTriangle } from 'lucide-react';

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
      title: 'Bid Requests/sec',
      value: '24,586',
      change: 12.3,
      progress: 78,
      threshold: 85,
      icon: <Zap className="h-5 w-5" />,
      trend: 'up'
    },
    {
      title: 'Win Rate',
      value: '23.7%',
      change: -2.1,
      progress: 67,
      threshold: 75,
      icon: <Target className="h-5 w-5" />,
      trend: 'down'
    },
    {
      title: 'Revenue Today',
      value: '$47,832',
      change: 8.9,
      progress: 89,
      threshold: 50000,
      icon: <DollarSign className="h-5 w-5" />,
      trend: 'up'
    },
    {
      title: 'Discrepancies',
      value: '2.3%',
      change: -0.8,
      progress: 23,
      threshold: 5,
      icon: <AlertTriangle className="h-5 w-5" />,
      trend: 'down'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.title === 'Bid Requests/sec' 
          ? `${(Math.random() * 5000 + 22000).toFixed(0)}` 
          : metric.value,
        progress: Math.min(100, Math.max(0, metric.progress + (Math.random() - 0.5) * 5))
      })));
    }, 2000);

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
                <span>Progress</span>
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

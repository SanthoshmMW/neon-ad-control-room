
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface ThresholdData {
  metric: string;
  current: number;
  target: number;
  projected: number;
  status: 'on-track' | 'at-risk' | 'behind';
  trend: 'up' | 'down' | 'stable';
}

export const ThresholdMonitor = () => {
  const thresholds: ThresholdData[] = [
    {
      metric: 'Daily Revenue',
      current: 124780,
      target: 160000,
      projected: 145000,
      status: 'at-risk',
      trend: 'up'
    },
    {
      metric: 'Billable Ad Plays',
      current: 28945,
      target: 35000,
      projected: 32500,
      status: 'at-risk',
      trend: 'up'
    },
    {
      metric: 'Fill Rate',
      current: 76.3,
      target: 85.0,
      projected: 82.0,
      status: 'at-risk',
      trend: 'up'
    },
    {
      metric: 'Screen Uptime',
      current: 95.2,
      target: 98.0,
      projected: 96.8,
      status: 'behind',
      trend: 'stable'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-primary/20 text-primary border-primary/50';
      case 'at-risk': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'behind': return 'bg-destructive/20 text-destructive border-destructive/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'at-risk': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'behind': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-primary" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-destructive" />;
      default: return <div className="w-3 h-3 rounded-full bg-muted" />;
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100);
  };

  const formatValue = (metric: string, value: number) => {
    if (metric === 'Daily Revenue') return `$${value.toLocaleString()}`;
    if (metric.includes('Rate') || metric.includes('Uptime')) return `${value}%`;
    return value.toLocaleString();
  };

  return (
    <Card className="cyber-border bg-card/80 backdrop-blur">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle className="cyber-text-glow">Threshold Monitor</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {thresholds.map((threshold, index) => (
            <div key={index} className="p-4 rounded-lg cyber-border bg-background/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(threshold.status)}
                  <div>
                    <h4 className="font-semibold">{threshold.metric}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      {getTrendIcon(threshold.trend)}
                      <span>Projected: {formatValue(threshold.metric, threshold.projected)}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(threshold.status)}>
                  {threshold.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Current</div>
                  <div className="font-semibold text-primary">
                    {formatValue(threshold.metric, threshold.current)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Target</div>
                  <div className="font-semibold">
                    {formatValue(threshold.metric, threshold.target)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Gap</div>
                  <div className={`font-semibold ${threshold.current >= threshold.target ? 'text-primary' : 'text-destructive'}`}>
                    {threshold.current >= threshold.target ? '+' : ''}
                    {formatValue(threshold.metric, threshold.current - threshold.target)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress to Target</span>
                  <span>{calculateProgress(threshold.current, threshold.target).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={calculateProgress(threshold.current, threshold.target)} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface DealData {
  dealId: string;
  bidRequests: number;
  bidResponses: number;
  adPlays: number;
  billableAdPlays: number;
  revenue: number;
  screens: number;
  performance: number;
  status: 'on-track' | 'below-threshold' | 'exceeding';
}

interface MetricsGridProps {
  onCountryDrillDown?: () => void;
}

export const MetricsGrid = ({ onCountryDrillDown }: MetricsGridProps) => {
  const [activeTab, setActiveTab] = useState('max');
  
  const dspData = {
    max: {
      metrics: [
        {
          title: 'Bid Requests',
          value: '18,420',
          change: 8.4,
          progress: 82,
          threshold: 22000,
          icon: <Send className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Bid Responses',
          value: '15,680',
          change: 6.7,
          progress: 85,
          threshold: 18000,
          icon: <Target className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Ad Plays',
          value: '13,240',
          change: 5.2,
          progress: 88,
          threshold: 15000,
          icon: <Play className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Billable Ad Plays',
          value: '11,890',
          change: 4.8,
          progress: 90,
          threshold: 13000,
          icon: <Zap className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Revenue',
          value: '¥2,847,600',
          change: 12.2,
          progress: 75,
          threshold: 3800000,
          icon: <DollarSign className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Active Screens',
          value: '847',
          change: 0.2,
          progress: 95,
          threshold: 900,
          icon: <Monitor className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'on-track' as const
        }
      ],
      deals: [
        { dealId: 'MAX-JP-001', bidRequests: 6420, bidResponses: 5680, adPlays: 4890, billableAdPlays: 4340, revenue: 1247800, screens: 280, performance: 92, status: 'on-track' as const },
        { dealId: 'MAX-JP-002', bidRequests: 5200, bidResponses: 4100, adPlays: 3650, billableAdPlays: 3250, revenue: 890400, screens: 245, performance: 78, status: 'below-threshold' as const },
        { dealId: 'MAX-JP-003', bidRequests: 6800, bidResponses: 5900, adPlays: 4700, billableAdPlays: 4300, revenue: 709400, screens: 322, performance: 85, status: 'on-track' as const }
      ]
    },
    ttd: {
      metrics: [
        {
          title: 'Bid Requests',
          value: '14,280',
          change: 3.4,
          progress: 71,
          threshold: 20000,
          icon: <Send className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Bid Responses',
          value: '11,650',
          change: 2.7,
          progress: 82,
          threshold: 14000,
          icon: <Target className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Ad Plays',
          value: '9,180',
          change: 1.2,
          progress: 76,
          threshold: 12000,
          icon: <Play className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Billable Ad Plays',
          value: '8,055',
          change: 0.8,
          progress: 81,
          threshold: 10000,
          icon: <Zap className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Revenue',
          value: '¥1,932,200',
          change: 5.2,
          progress: 64,
          threshold: 3000000,
          icon: <DollarSign className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Active Screens',
          value: '654',
          change: -0.3,
          progress: 93,
          threshold: 700,
          icon: <Monitor className="h-5 w-5" />,
          trend: 'down' as const,
          status: 'on-track' as const
        }
      ],
      deals: [
        { dealId: 'TTD-JP-001', bidRequests: 5280, bidResponses: 4350, adPlays: 3480, billableAdPlays: 3055, revenue: 847200, screens: 218, performance: 84, status: 'on-track' as const },
        { dealId: 'TTD-JP-002', bidRequests: 4200, bidResponses: 3100, adPlays: 2700, billableAdPlays: 2300, revenue: 540000, screens: 196, performance: 69, status: 'below-threshold' as const },
        { dealId: 'TTD-JP-003', bidRequests: 4800, bidResponses: 4200, adPlays: 3000, billableAdPlays: 2700, revenue: 545000, screens: 240, performance: 88, status: 'on-track' as const }
      ]
    },
    dv360: {
      metrics: [
        {
          title: 'Bid Requests',
          value: '12,580',
          change: 15.4,
          progress: 84,
          threshold: 15000,
          icon: <Send className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Bid Responses',
          value: '11,320',
          change: 14.7,
          progress: 90,
          threshold: 12500,
          icon: <Target className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Ad Plays',
          value: '9,760',
          change: 12.2,
          progress: 87,
          threshold: 11000,
          icon: <Play className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Billable Ad Plays',
          value: '9,000',
          change: 11.8,
          progress: 90,
          threshold: 10000,
          icon: <Zap className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'on-track' as const
        },
        {
          title: 'Revenue',
          value: '¥2,000,980',
          change: 18.2,
          progress: 80,
          threshold: 2500000,
          icon: <DollarSign className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'below-threshold' as const
        },
        {
          title: 'Active Screens',
          value: '1,346',
          change: 2.1,
          progress: 96,
          threshold: 1400,
          icon: <Monitor className="h-5 w-5" />,
          trend: 'up' as const,
          status: 'on-track' as const
        }
      ],
      deals: [
        { dealId: 'DV360-JP-001', bidRequests: 4580, bidResponses: 4120, adPlays: 3760, billableAdPlays: 3400, revenue: 820980, screens: 432, performance: 91, status: 'on-track' as const },
        { dealId: 'DV360-JP-002', bidRequests: 4000, bidResponses: 3600, adPlays: 3200, billableAdPlays: 2900, revenue: 680000, screens: 456, performance: 86, status: 'on-track' as const },
        { dealId: 'DV360-JP-003', bidRequests: 4000, bidResponses: 3600, adPlays: 2800, billableAdPlays: 2700, revenue: 500000, screens: 458, performance: 72, status: 'below-threshold' as const }
      ]
    }
  };

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

  const getDealStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-primary/20 text-primary border-primary/50';
      case 'below-threshold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'exceeding': return 'bg-primary/20 text-primary border-primary/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const renderMetrics = (metrics: Metric[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
  );

  const renderDeals = (deals: DealData[]) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold cyber-text-glow">Deal Performance</h3>
      <div className="grid gap-4">
        {deals.map((deal, index) => (
          <Card key={index} className="cyber-border bg-card/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{deal.dealId}</h4>
                  <div className="text-sm text-muted-foreground">{deal.screens} screens</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getDealStatusColor(deal.status)}`}>
                  {deal.status === 'on-track' ? 'On Track' : 'Below Target'}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Bid Requests</div>
                  <div className="text-lg font-semibold text-primary">
                    {deal.bidRequests.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Responses</div>
                  <div className="text-lg font-semibold text-primary">
                    {deal.bidResponses.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Ad Plays</div>
                  <div className="text-lg font-semibold text-primary">
                    {deal.adPlays.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Billable</div>
                  <div className="text-lg font-semibold text-primary">
                    {deal.billableAdPlays.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Revenue</div>
                  <div className="text-lg font-semibold text-primary">
                    ¥{deal.revenue.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Performance</div>
                  <div className="text-lg font-semibold">
                    {deal.performance}%
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Performance</span>
                  <span>{deal.performance}%</span>
                </div>
                <Progress value={deal.performance} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold cyber-text-glow">Japan Programmatic Command Center</h2>
        <div className="text-sm text-muted-foreground">
          Real-time DSP performance monitoring
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 cyber-border">
          <TabsTrigger value="max" className="cyber-text-glow">MAX</TabsTrigger>
          <TabsTrigger value="ttd" className="cyber-text-glow">TTD</TabsTrigger>
          <TabsTrigger value="dv360" className="cyber-text-glow">DV360</TabsTrigger>
        </TabsList>

        <TabsContent value="max" className="space-y-6">
          {renderMetrics(dspData.max.metrics)}
          {renderDeals(dspData.max.deals)}
        </TabsContent>

        <TabsContent value="ttd" className="space-y-6">
          {renderMetrics(dspData.ttd.metrics)}
          {renderDeals(dspData.ttd.deals)}
        </TabsContent>

        <TabsContent value="dv360" className="space-y-6">
          {renderMetrics(dspData.dv360.metrics)}
          {renderDeals(dspData.dv360.deals)}
        </TabsContent>
      </Tabs>
    </div>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, ChevronDown, Activity } from 'lucide-react';

interface DealData {
  dealId: string;
  dsp: string;
  bidRequests: number;
  bidResponses: number;
  adPlays: number;
  billableAdPlays: number;
  revenue: number;
  fillRate: number;
  performance: number;
  status: 'meeting-threshold' | 'below-threshold' | 'failing';
  issues: string[];
  inventoryPerformance: { location: string; performance: number; status: string }[];
}

interface DealPerformanceProps {
  country: string;
  onBack: () => void;
}

export const DealPerformance = ({ country, onBack }: DealPerformanceProps) => {
  const [deals] = useState<DealData[]>([
    {
      dealId: 'DL-US-001',
      dsp: 'Google DV360',
      bidRequests: 8420,
      bidResponses: 7280,
      adPlays: 6240,
      billableAdPlays: 5890,
      revenue: 24680,
      fillRate: 86.4,
      performance: 92,
      status: 'meeting-threshold',
      issues: [],
      inventoryPerformance: [
        { location: 'Times Square North', performance: 95, status: 'excellent' },
        { location: 'Penn Station Hub', performance: 88, status: 'good' },
        { location: 'Brooklyn Bridge Plaza', performance: 91, status: 'excellent' }
      ]
    },
    {
      dealId: 'DL-US-002',
      dsp: 'The Trade Desk',
      bidRequests: 5680,
      bidResponses: 3420,
      adPlays: 2890,
      billableAdPlays: 2340,
      revenue: 8920,
      fillRate: 60.2,
      performance: 68,
      status: 'below-threshold',
      issues: ['Low bid response rate', 'Timeout errors', 'Creative size mismatch'],
      inventoryPerformance: [
        { location: 'Manhattan Midtown', performance: 45, status: 'poor' },
        { location: 'Central Park South', performance: 72, status: 'fair' },
        { location: 'Financial District', performance: 38, status: 'poor' }
      ]
    },
    {
      dealId: 'DL-US-003',
      dsp: 'Amazon DSP',
      bidRequests: 4320,
      bidResponses: 1240,
      adPlays: 980,
      billableAdPlays: 660,
      revenue: 2740,
      fillRate: 28.7,
      performance: 32,
      status: 'failing',
      issues: ['Connection timeouts', 'Budget exhausted', 'Geo-targeting conflicts', 'Creative approval delays'],
      inventoryPerformance: [
        { location: 'LaGuardia Airport', performance: 25, status: 'critical' },
        { location: 'JFK Terminal 4', performance: 41, status: 'poor' },
        { location: 'Newark Hub', performance: 30, status: 'critical' }
      ]
    }
  ]);

  const [expandedDeal, setExpandedDeal] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'meeting-threshold': return 'bg-primary/20 text-primary border-primary/50';
      case 'below-threshold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'failing': return 'bg-destructive/20 text-destructive border-destructive/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'meeting-threshold': return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'below-threshold': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'failing': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getInventoryStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-primary';
      case 'good': return 'text-primary';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-destructive';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack} className="cyber-border">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Countries
          </Button>
          <h2 className="text-lg font-semibold cyber-text-glow">Deal Performance - {country}</h2>
        </div>
      </div>

      <div className="space-y-4">
        {deals.map((deal) => (
          <Card key={deal.dealId} className="cyber-border bg-card/80 backdrop-blur">
            <Collapsible
              open={expandedDeal === deal.dealId}
              onOpenChange={() => setExpandedDeal(expandedDeal === deal.dealId ? null : deal.dealId)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-background/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(deal.status)}
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{deal.dealId}</span>
                          <Badge variant="outline" className="text-xs">
                            {deal.dsp}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Fill Rate: {deal.fillRate}% | Performance: {deal.performance}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(deal.status)}>
                        {deal.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {/* Deal Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
                        ${deal.revenue.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Fill Rate</div>
                      <div className="text-lg font-semibold">
                        {deal.fillRate}%
                      </div>
                    </div>
                  </div>

                  {/* Issues Analysis */}
                  {deal.issues.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-destructive flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Identified Issues</span>
                      </h4>
                      <div className="space-y-2">
                        {deal.issues.map((issue, index) => (
                          <div key={index} className="p-3 rounded-lg cyber-border bg-destructive/10">
                            <div className="text-sm text-destructive">{issue}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inventory Performance */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <span>Inventory Performance Breakdown</span>
                    </h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Location</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deal.inventoryPerformance.map((location, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{location.location}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="w-24">
                                  <Progress value={location.performance} className="h-2" />
                                </div>
                                <span className="text-sm">{location.performance}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`text-sm font-medium ${getInventoryStatusColor(location.status)}`}>
                                {location.status.toUpperCase()}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

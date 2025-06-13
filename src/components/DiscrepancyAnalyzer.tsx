
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

interface Discrepancy {
  id: string;
  type: 'impression' | 'revenue' | 'timeout';
  severity: 'high' | 'medium' | 'low';
  source: string;
  description: string;
  probability: number;
  status: 'active' | 'investigating' | 'resolved';
}

export const DiscrepancyAnalyzer = () => {
  const [discrepancies] = useState<Discrepancy[]>([
    {
      id: '1',
      type: 'impression',
      severity: 'high',
      source: 'DV360',
      description: 'Impression mismatch: 12% variance detected',
      probability: 89,
      status: 'active'
    },
    {
      id: '2',
      type: 'timeout',
      severity: 'medium',
      source: 'TTD',
      description: 'Bid timeout spikes in APAC regions',
      probability: 67,
      status: 'investigating'
    },
    {
      id: '3',
      type: 'revenue',
      severity: 'low',
      source: 'MediaMath',
      description: 'Revenue tracking delay ~2.3 minutes',
      probability: 34,
      status: 'resolved'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-primary/20 text-primary border-primary/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'investigating': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-primary" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="cyber-border bg-card/80 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <CardTitle className="cyber-text-glow">Discrepancy Analyzer</CardTitle>
          </div>
          <Button size="sm" className="cyber-gradient text-background hover:opacity-80">
            <Zap className="h-4 w-4 mr-2" />
            Auto-Resolve
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {discrepancies.map((discrepancy) => (
            <div 
              key={discrepancy.id} 
              className="p-4 rounded-lg cyber-border bg-background/50 hover-cyber-glow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(discrepancy.status)}
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {discrepancy.source} - {discrepancy.type}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {discrepancy.description}
                    </p>
                  </div>
                </div>
                <Badge className={getSeverityColor(discrepancy.severity)}>
                  {discrepancy.severity}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Root Cause Probability</span>
                  <span className="text-primary">{discrepancy.probability}%</span>
                </div>
                <Progress value={discrepancy.probability} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground capitalize">
                  Status: {discrepancy.status}
                </span>
                <Button variant="outline" size="sm" className="cyber-border">
                  Investigate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Target, DollarSign, Zap } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'bid_adjustment' | 'inventory' | 'targeting';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  confidence: number;
}

export const RecommendationsEngine = () => {
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'bid_adjustment',
      priority: 'high',
      title: 'Increase Mobile Video Bids',
      description: 'Mobile video inventory showing 89% win rate with 23% higher eCPM',
      impact: '+$2,340 daily revenue',
      confidence: 94
    },
    {
      id: '2',
      type: 'inventory',
      priority: 'medium',
      title: 'Expand Premium CTV Sources',
      description: 'Connected TV inventory from Roku/Samsung showing strong performance',
      impact: '+15% reach expansion',
      confidence: 78
    },
    {
      id: '3',
      type: 'targeting',
      priority: 'high',
      title: 'Geo-Targeting Optimization',
      description: 'Reduce spend in underperforming regions, increase in APAC markets',
      impact: '+18% efficiency gain',
      confidence: 87
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bid_adjustment': return <DollarSign className="h-4 w-4" />;
      case 'inventory': return <Target className="h-4 w-4" />;
      case 'targeting': return <TrendingUp className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-primary/20 text-primary border-primary/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  return (
    <Card className="cyber-border bg-card/80 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="cyber-text-glow">Smart Recommendations</CardTitle>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/50">
            AI-Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="p-4 rounded-lg cyber-border bg-background/50 hover-cyber-glow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{rec.title}</h4>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {rec.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-primary font-medium">{rec.impact}</span>
                      <span className="text-muted-foreground">
                        {rec.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" className="cyber-border">
                  Details
                </Button>
                <Button size="sm" className="cyber-gradient text-background hover:opacity-80">
                  <Zap className="h-3 w-3 mr-1" />
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

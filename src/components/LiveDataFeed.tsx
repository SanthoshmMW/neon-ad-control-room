
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, DollarSign, Target } from 'lucide-react';

interface DataEvent {
  id: string;
  timestamp: Date;
  type: 'bid' | 'win' | 'impression' | 'revenue';
  source: string;
  value: string;
  status: 'success' | 'warning' | 'error';
}

export const LiveDataFeed = () => {
  const [events, setEvents] = useState<DataEvent[]>([]);

  const generateRandomEvent = (): DataEvent => {
    const types: DataEvent['type'][] = ['bid', 'win', 'impression', 'revenue'];
    const sources = ['DV360', 'TTD', 'MediaMath', 'Amazon DSP'];
    const statuses: DataEvent['status'][] = ['success', 'success', 'success', 'warning', 'error'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const values = {
      bid: `$${(Math.random() * 10).toFixed(2)}`,
      win: `${(Math.random() * 100).toFixed(1)}%`,
      impression: `${Math.floor(Math.random() * 1000)}`,
      revenue: `$${(Math.random() * 100).toFixed(2)}`
    };

    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type,
      source: sources[Math.floor(Math.random() * sources.length)],
      value: values[type],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prev => {
        const newEvent = generateRandomEvent();
        return [newEvent, ...prev.slice(0, 9)]; // Keep only 10 most recent
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'bid': return <Target className="h-3 w-3" />;
      case 'win': return <Zap className="h-3 w-3" />;
      case 'impression': return <Activity className="h-3 w-3" />;
      case 'revenue': return <DollarSign className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-primary/20 text-primary border-primary/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'error': return 'bg-destructive/20 text-destructive border-destructive/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  return (
    <Card className="cyber-border bg-card/80 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="cyber-text-glow">Live Data Feed</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary neon-pulse" />
            <span className="text-xs text-primary">Real-time</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="flex items-center justify-between p-3 rounded-lg cyber-border bg-background/30 animate-data-flow"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1.5 rounded-full ${getStatusColor(event.status)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div>
                  <div className="text-sm font-medium capitalize">
                    {event.type} - {event.source}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">
                  {event.value}
                </div>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Waiting for live data...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

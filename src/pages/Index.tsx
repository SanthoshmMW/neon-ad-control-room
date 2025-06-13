
import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricsGrid } from '@/components/MetricsGrid';
import { DiscrepancyAnalyzer } from '@/components/DiscrepancyAnalyzer';
import { RecommendationsEngine } from '@/components/RecommendationsEngine';
import { PerformanceGlobe } from '@/components/PerformanceGlobe';
import { LiveDataFeed } from '@/components/LiveDataFeed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background particle-bg">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        <MetricsGrid />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <DiscrepancyAnalyzer />
            <RecommendationsEngine />
          </div>
          
          <div className="space-y-8">
            <PerformanceGlobe />
            <LiveDataFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

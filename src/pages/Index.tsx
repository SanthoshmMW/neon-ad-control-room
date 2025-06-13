
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricsGrid } from '@/components/MetricsGrid';
import { CountryPerformance } from '@/components/CountryPerformance';
import { DealPerformance } from '@/components/DealPerformance';
import { DiscrepancyAnalyzer } from '@/components/DiscrepancyAnalyzer';
import { RecommendationsEngine } from '@/components/RecommendationsEngine';
import { PerformanceGlobe } from '@/components/PerformanceGlobe';
import { LiveDataFeed } from '@/components/LiveDataFeed';
import { ThresholdMonitor } from '@/components/ThresholdMonitor';

type ViewState = 'global' | 'country' | 'deals';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('global');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleCountryDrillDown = () => {
    setCurrentView('country');
  };

  const handleDealDrillDown = (country: string) => {
    setSelectedCountry(country);
    setCurrentView('deals');
  };

  const handleBackToGlobal = () => {
    setCurrentView('global');
  };

  const handleBackToCountry = () => {
    setCurrentView('country');
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'country':
        return (
          <CountryPerformance 
            onBack={handleBackToGlobal}
            onDealDrillDown={handleDealDrillDown}
          />
        );
      case 'deals':
        return (
          <DealPerformance 
            country={selectedCountry}
            onBack={handleBackToCountry}
          />
        );
      default:
        return (
          <MetricsGrid onCountryDrillDown={handleCountryDrillDown} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background particle-bg">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        {renderMainContent()}
        
        {currentView === 'global' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <DiscrepancyAnalyzer />
              <RecommendationsEngine />
            </div>
            
            <div className="space-y-8">
              <ThresholdMonitor />
              <PerformanceGlobe />
              <LiveDataFeed />
            </div>
          </div>
        )}
        
        {currentView === 'deals' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <ThresholdMonitor />
            <LiveDataFeed />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

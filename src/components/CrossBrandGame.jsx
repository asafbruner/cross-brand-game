import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronRight, Search, DollarSign, TrendingUp } from 'lucide-react';

const CrossBrandGame = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [scenario1Choice, setScenario1Choice] = useState(null);
  const [scenario2Complete, setScenario2Complete] = useState(false);
  
  const COLORS = {
    purple: '#6B46C1',
    pink: '#D53F8C',
    black: '#1A202C',
    gray: '#718096',
    green: '#48BB78'
  };

  // Data for the pie charts
  const initialData = [
    { name: 'Wasted Spend', value: 40 },
    { name: 'Efficient Spend', value: 60 }
  ];

  const optimizedData = [
    { name: 'Wasted Spend', value: 10 },
    { name: 'Efficient Spend', value: 90 }
  ];

  const IntroScreen = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white p-8">
      <div className="text-4xl font-bold mb-8">Cross-Brand</div>
      <h1 className="text-2xl md:text-3xl text-center mb-8">
        Optimize your brand campaigns! Ready to play?
      </h1>
      <button
        onClick={() => setCurrentScreen('scenario1')}
        className="bg-white text-purple-600 px-8 py-4 rounded-lg text-xl font-semibold 
                   hover:bg-purple-100 transition-colors flex items-center gap-2"
      >
        Start Game <ChevronRight />
      </button>
    </div>
  );

  const Scenario1 = () => (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">
        Scenario 1: Brand Cannibalization Issue
      </h2>
      <div className="mb-8">
        <p className="text-gray-700 mb-4">
          Your branded campaigns are competing against organic traffic. Here's your current ad spend distribution:
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={scenario1Choice === 'optimize' ? optimizedData : initialData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animate
              >
                {initialData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? COLORS.pink : COLORS.purple} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {!scenario1Choice ? (
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setScenario1Choice('optimize')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Optimize Campaigns
          </button>
          <button
            onClick={() => setScenario1Choice('nothing')}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Do Nothing
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-xl mb-4">Results:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 text-purple-600 mb-2">
                  <DollarSign /> CPC
                </div>
                <div className="text-2xl font-bold">-35%</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 text-purple-600 mb-2">
                  <TrendingUp /> CTR
                </div>
                <div className="text-2xl font-bold">+45%</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 text-purple-600 mb-2">
                  <Search /> CVR
                </div>
                <div className="text-2xl font-bold">+25%</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('scenario2')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Next Scenario
          </button>
        </div>
      )}
    </div>
  );

  const Scenario2 = () => (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">
        Scenario 2: Competitors Bidding on Your Brand
      </h2>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="border rounded-lg p-4 mb-4">
          <div className={`p-4 ${!scenario2Complete ? 'bg-gray-100' : 'bg-purple-50'} rounded mb-2`}>
            <div className="text-sm text-gray-500">Ad</div>
            <div className="font-medium">
              {scenario2Complete ? 'Your Brand - Official Site' : 'Competitor Ad'}
            </div>
          </div>
          <div className={`p-4 ${scenario2Complete ? 'bg-gray-100' : 'bg-purple-50'} rounded`}>
            <div className="text-sm text-gray-500">Ad</div>
            <div className="font-medium">
              {scenario2Complete ? 'Competitor Ad' : 'Your Brand - Official Site'}
            </div>
          </div>
        </div>

        {!scenario2Complete ? (
          <button
            onClick={() => setScenario2Complete(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 w-full"
          >
            Activate Cross-Brand
          </button>
        ) : (
          <button
            onClick={() => setCurrentScreen('results')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 w-full"
          >
            View Final Results
          </button>
        )}
      </div>
    </div>
  );

  const ResultsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          See Your Campaign Optimization Results!
        </h2>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Achievement Summary:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75">Wasted Spend Reduced</div>
              <div className="text-3xl font-bold">$12,450</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75">ROI Improvement</div>
              <div className="text-3xl font-bold">+156%</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl mb-6">
            Ready to see these results in your real campaigns?
          </p>
          <a
            href="https://meetings-eu1.hubspot.com/gil-suhar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg 
                     text-xl font-semibold hover:bg-purple-100 transition-colors"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </div>
  );

  const screenComponents = {
    intro: IntroScreen,
    scenario1: Scenario1,
    scenario2: Scenario2,
    results: ResultsScreen
  };

  const CurrentScreen = screenComponents[currentScreen];

  return (
    <div className="min-h-screen bg-gray-50">
      <CurrentScreen />
    </div>
  );
};

export default CrossBrandGame;
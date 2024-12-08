import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronRight, Search, TrendingUp, Users } from 'lucide-react';

// Company configurations
const companies = {
  default: {
    name: 'Cross-Brand',
    colors: {
      primary: '#6B46C1', // Purple
      secondary: '#D53F8C', // Pink
      accent: '#F3E8FF', // Light purple
      text: '#2D3B45'
    },
    metrics: {
      metric1: { label: 'Cost Reduction', value: '+45%' },
      metric2: { label: 'Campaign Efficiency', value: '+38%' },
      metric3: { label: 'ROI Improvement', value: '+52%' }
    },
    cta: {
      text: 'Ready to optimize your marketing campaigns?',
      buttonText: 'Book a Demo',
      link: 'https://meetings-eu1.hubspot.com/gil-suhar/'
    }
  },
  coursera: {
    name: 'Coursera',
    colors: {
      primary: '#0056D2',
      secondary: '#00419E',
      accent: '#B4D5FF',
      text: '#2D3B45'
    },
    metrics: {
      metric1: { label: 'Learner Engagement', value: '+45%' },
      metric2: { label: 'Course Completion', value: '+38%' },
      metric3: { label: 'Revenue per Learner', value: '+52%' }
    },
    cta: {
      text: 'Ready to optimize your learning campaigns?',
      buttonText: 'Talk to Coursera',
      link: 'https://www.coursera.org/business/contact-sales'
    }
  },
  hubspot: {
    name: 'HubSpot',
    colors: {
      primary: '#FF7A59',
      secondary: '#FF8F73',
      accent: '#FFF1EE',
      text: '#2D3E50'
    },
    metrics: {
      metric1: { label: 'Lead Generation', value: '+65%' },
      metric2: { label: 'Conversion Rate', value: '+42%' },
      metric3: { label: 'Customer Acquisition', value: '+38%' }
    },
    cta: {
      text: 'Ready to supercharge your marketing?',
      buttonText: 'Talk to HubSpot',
      link: 'https://www.hubspot.com/products/get-started'
    }
  }
};

// Get company from URL parameter
const getCompanyFromUrl = () => {
  if (typeof window === 'undefined') return companies.default; // Default for SSR
  const urlParams = new URLSearchParams(window.location.search);
  const companyParam = urlParams.get('company')?.toLowerCase();
  return companies[companyParam as keyof typeof companies] || companies.default;
};

// Set the company based on URL parameter
const COMPANY = getCompanyFromUrl();

const BrandGame: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'scenario1' | 'scenario2' | 'results'>('intro');
  const [scenario1Choice, setScenario1Choice] = useState<'optimize' | 'nothing' | null>(null);
  const [scenario2Complete, setScenario2Complete] = useState(false);

  const initialData = [
    { name: 'Wasted Spend', value: 40 },
    { name: 'Efficient Spend', value: 60 }
  ];

  const optimizedData = [
    { name: 'Wasted Spend', value: 10 },
    { name: 'Efficient Spend', value: 90 }
  ];

  const IntroScreen: React.FC = () => (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-8"
      style={{ background: `linear-gradient(135deg, ${COMPANY.colors.primary} 0%, ${COMPANY.colors.secondary} 100%)` }}
    >
      <div className="text-5xl font-bold text-white mb-8">
        {COMPANY.name}
      </div>
      <h1 className="text-2xl md:text-3xl text-center mb-8 text-white">
        Optimize your digital marketing campaigns! Ready to play?
      </h1>
      <button
        onClick={() => setCurrentScreen('scenario1')}
        className="bg-white px-8 py-4 rounded-lg text-xl font-semibold 
                   hover:bg-opacity-90 transition-colors flex items-center gap-2"
        style={{ color: COMPANY.colors.primary }}
      >
        Start Game <ChevronRight />
      </button>
    </div>
  );

  const Scenario1: React.FC = () => (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-2xl font-bold mb-6" style={{ color: COMPANY.colors.primary }}>
        Scenario 1: Campaign Optimization Challenge
      </h2>
      <div className="mb-8">
        <p className="text-gray-700 mb-4">
          Your campaigns are competing against each other, leading to wasted spend. Here's your current budget allocation:
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
              >
                {initialData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? COMPANY.colors.secondary : COMPANY.colors.primary} 
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
            className="px-6 py-3 rounded-lg text-white hover:opacity-90 transition-colors"
            style={{ backgroundColor: COMPANY.colors.primary }}
          >
            Optimize Campaigns
          </button>
          <button
            onClick={() => setScenario1Choice('nothing')}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:opacity-90"
          >
            Do Nothing
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: COMPANY.colors.accent }}>
            <h3 className="font-semibold text-xl mb-4">Results:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(COMPANY.metrics).map((metric, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-2 mb-2" style={{ color: COMPANY.colors.primary }}>
                    {index === 0 ? <TrendingUp /> : index === 1 ? <Users /> : <Search />}
                    {metric.label}
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('scenario2')}
            className="px-6 py-3 rounded-lg text-white hover:opacity-90"
            style={{ backgroundColor: COMPANY.colors.primary }}
          >
            Next Scenario
          </button>
        </div>
      )}
    </div>
  );

  // ... Rest of the components remain similar but using COMPANY colors

  const ResultsScreen: React.FC = () => (
    <div 
      className="min-h-screen p-8"
      style={{ background: `linear-gradient(135deg, ${COMPANY.colors.primary} 0%, ${COMPANY.colors.secondary} 100%)` }}
    >
      <div className="max-w-3xl mx-auto text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">
          See Your Campaign Optimization Results!
        </h2>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Achievement Summary:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75">Budget Optimization</div>
              <div className="text-3xl font-bold">$12,450 Saved</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75">Performance Improvement</div>
              <div className="text-3xl font-bold">+156%</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl mb-6">{COMPANY.cta.text}</p>
          <a
            href={COMPANY.cta.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white px-8 py-4 rounded-lg 
                     text-xl font-semibold hover:bg-opacity-90 transition-colors"
            style={{ color: COMPANY.colors.primary }}
          >
            {COMPANY.cta.buttonText}
          </a>
        </div>
      </div>
    </div>
  );

  const Scenario2: React.FC = () => (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-2xl font-bold mb-6" style={{ color: COMPANY.colors.primary }}>
        Scenario 2: Competitors Bidding on Your Brand
      </h2>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="border rounded-lg p-4 mb-4">
          <div className={`p-4 ${!scenario2Complete ? 'bg-gray-100' : COMPANY.colors.accent} rounded mb-2`}>
            <div className="text-sm text-gray-500">Ad</div>
            <div className="font-medium">
              {scenario2Complete ? `${COMPANY.name} - Official Site` : 'Competitor Ad'}
            </div>
          </div>
          <div className={`p-4 ${scenario2Complete ? 'bg-gray-100' : COMPANY.colors.accent} rounded`}>
            <div className="text-sm text-gray-500">Ad</div>
            <div className="font-medium">
              {scenario2Complete ? 'Competitor Ad' : `${COMPANY.name} - Official Site`}
            </div>
          </div>
        </div>

        {!scenario2Complete ? (
          <button
            onClick={() => setScenario2Complete(true)}
            className="px-6 py-3 rounded-lg text-white hover:opacity-90 w-full"
            style={{ backgroundColor: COMPANY.colors.primary }}
          >
            Optimize Brand Campaign
          </button>
        ) : (
          <button
            onClick={() => setCurrentScreen('results')}
            className="px-6 py-3 rounded-lg text-white hover:opacity-90 w-full"
            style={{ backgroundColor: COMPANY.colors.primary }}
          >
            View Final Results
          </button>
        )}
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

export default BrandGame;
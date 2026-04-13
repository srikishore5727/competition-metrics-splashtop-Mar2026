import { Search, AlertTriangle, Target, Users } from 'lucide-react';
import { useState } from 'react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
} from './design-system';

// Missing Keywords Data (Sheet4 CSV)
const missingKeywordsData = [
  { keyword: 'remote login',                 intent: 'Navigational, Transactional', volume: 2900, kd: 100, cpc: 0, cd: 0, ft: 0, pa: 3,  cp: 6,  cisco: 9,  cs: 11 },
  { keyword: 'remote access to computer',    intent: 'Informational',               volume: 1900, kd: 70,  cpc: 0, cd: 0, ft: 0, pa: 5,  cp: 3,  cisco: 30, cs: 7  },
  { keyword: 'remote desktop free',          intent: 'Informational',               volume: 590,  kd: 82,  cpc: 0, cd: 0, ft: 0, pa: 2,  cp: 3,  cisco: 7,  cs: 24 },
  { keyword: 'computer remote access',       intent: 'Informational',               volume: 480,  kd: 75,  cpc: 0, cd: 0, ft: 0, pa: 3,  cp: 43, cisco: 37, cs: 6  },
  { keyword: 'remote desktop on macbook',    intent: 'Informational',               volume: 390,  kd: 72,  cpc: 0, cd: 0, ft: 0, pa: 48, cp: 6,  cisco: 85, cs: 54 },
  { keyword: 'remote pc control',            intent: 'Informational',               volume: 320,  kd: 86,  cpc: 0, cd: 0, ft: 0, pa: 4,  cp: 5,  cisco: 75, cs: 8  },
  { keyword: 'remote into another computer', intent: 'Informational',               volume: 260,  kd: 72,  cpc: 0, cd: 0, ft: 0, pa: 3,  cp: 4,  cisco: 51, cs: 8  },
  { keyword: 'remote pc access free',        intent: 'Commercial',                  volume: 210,  kd: 71,  cpc: 0, cd: 0, ft: 0, pa: 1,  cp: 7,  cisco: 15, cs: 8  },
  { keyword: 'windows remote desktop',       intent: 'Informational',               volume: 170,  kd: 76,  cpc: 0, cd: 0, ft: 0, pa: 82, cp: 8,  cisco: 53, cs: 23 },
];

// Untapped Keywords Data (Image 2)
const untappedKeywordsData = [
  { keyword: 'remote work setup',   intent: 'Informational', volume: 1830000, kd: 34, cpc: 0, cd: 0, ft: 0, pa: 0,  cp: 0, cisco: 0, cs: 50 },
  { keyword: 'help desk solutions', intent: 'Commercial',    volume: 1500000, kd: 57, cpc: 0, cd: 0, ft: 0, pa: 80, cp: 0, cisco: 0, cs: 0  },
  { keyword: 'remote control',      intent: 'Commercial',    volume: 18100,   kd: 52, cpc: 0, cd: 0, ft: 0, pa: 74, cp: 0, cisco: 0, cs: 0  },
];

// Multi-Competitor Comparison Data / Weak Keywords (Image 3)
const multiCompetitorData = [
  { keyword: 'free remote access software', intent: 'Commercial, Informational', volume: 2900, kd: 74,  ft: 31, pa: 1,  cp: 7,  cisco: 16, cs: 17 },
  { keyword: 'free remote access tools',    intent: 'Commercial',                volume: 880,  kd: 48,  ft: 38, pa: 1,  cp: 5,  cisco: 24, cs: 16 },
  { keyword: 'remote access computer',      intent: 'Informational',             volume: 720,  kd: 100, ft: 58, pa: 5,  cp: 3,  cisco: 20, cs: 7  },
  { keyword: 'remote desktop setup',        intent: 'Informational',             volume: 590,  kd: 52,  ft: 96, pa: 75, cp: 3,  cisco: 70, cs: 29 },
  { keyword: 'remote control for pc',       intent: 'Commercial, Informational', volume: 390,  kd: 49,  ft: 62, pa: 5,  cp: 52, cisco: 30, cs: 23 },
  { keyword: 'remote connection tools',     intent: 'Commercial',                volume: 260,  kd: 86,  ft: 66, pa: 3,  cp: 5,  cisco: 12, cs: 10 },
  { keyword: 'free remote desktop access',  intent: 'Informational',             volume: 170,  kd: 76,  ft: 33, pa: 1,  cp: 7,  cisco: 14, cs: 11 },
];

export function SlideKeywordGap({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<'missing' | 'untapped' | 'multiCompetitor'>('missing');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'missing': return missingKeywordsData;
      case 'untapped': return untappedKeywordsData;
      case 'multiCompetitor': return multiCompetitorData;
    }
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case 'missing': return AlertTriangle;
      case 'untapped': return Target;
      case 'multiCompetitor': return Users;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'missing': return 'Missing Keywords';
      case 'untapped': return 'Untapped Keywords';
      case 'multiCompetitor': return 'Weak Keywords';
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'missing': return 'Critical gaps in Splashtop\'s content strategy';
      case 'untapped': return 'High-potential keywords with minimal competition';
      case 'multiCompetitor': return 'Competitive keyword comparison with ranking positions';
    }
  };

  const IconComponent = getTabIcon();

  return (
    <SlideContainer slideNumber={21} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="Keyword Gap"
      />
      
      <div className="flex-1 flex flex-col gap-4 pb-4">
        {/* Main Tab Navigation - Curved Folder Style */}
        <div className="flex items-start gap-1">
          <button
            onClick={() => setActiveTab('missing')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'missing'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'missing'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Missing Keywords
          </button>
          <button
            onClick={() => setActiveTab('untapped')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'untapped'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'untapped'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Untapped Keywords
          </button>
          <button
            onClick={() => setActiveTab('multiCompetitor')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'multiCompetitor'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'multiCompetitor'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Weak Keywords
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activeTab === 'untapped' ? 'bg-blue-50' : 'bg-red-50'
              }`}>
                <IconComponent className={`w-6 h-6 ${
                  activeTab === 'untapped' ? 'text-blue-500' : 'text-red-500'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{getTabTitle()}</h3>
                <p className="text-sm text-gray-600">{getTabDescription()}</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-gray-50 rounded-lg overflow-hidden flex-1">
              <div className="overflow-x-auto h-full max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200 sticky top-0 z-20">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Keyword</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">
                        {activeTab === 'multiCompetitor' ? 'Intent' : 'Intents'}
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">
                        {activeTab === 'multiCompetitor' ? 'Volume' : 'Volume'}
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">KD</th>
                      {(activeTab === 'missing' || activeTab === 'untapped') && (
                        <>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-red-50">ST</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-orange-50">TV</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-purple-50">AD</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-blue-50">LM</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-gray-100">GMPC</th>
                        </>
                      )}
                      {(activeTab === 'multiCompetitor') && (
                        <>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-red-50">ST</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-orange-50">TV</th>
                        </>
                      )}
                      {activeTab === 'multiCompetitor' && (
                        <>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-purple-50">AD</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-blue-50">LM</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-gray-100">GMPC</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {getCurrentData().map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{row.keyword}</td>
                        <td className="px-4 py-3 text-gray-600 text-sm">{row.intent}</td>
                        <td className="px-4 py-3 text-center text-gray-900 font-medium">{row.volume.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.kd}</td>
                        {(activeTab === 'missing' || activeTab === 'untapped') && 'ft' in row && (
                          <>
                            <td className="px-3 py-3 text-center font-semibold bg-red-50 text-red-700">{row.ft}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-orange-50 text-orange-700">{(row as any).pa}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-purple-50 text-purple-700">{(row as any).cp}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-blue-50 text-blue-700">{(row as any).cisco}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-gray-50 text-gray-700">{(row as any).cs}</td>
                          </>
                        )}
                        {(activeTab === 'multiCompetitor') && 'ft' in row && (
                          <>
                            <td className="px-3 py-3 text-center font-semibold bg-red-50 text-red-700">{row.ft}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-orange-50 text-orange-700">{row.pa}</td>
                          </>
                        )}
                        {activeTab === 'multiCompetitor' && 'cp' in row && (
                          <>
                            <td className="px-3 py-3 text-center font-semibold bg-purple-50 text-purple-700">{(row as any).cp}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-blue-50 text-blue-700">{(row as any).cisco}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-gray-50 text-gray-700">{(row as any).cs}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlideFooter source="Source: Semrush Keyword Gap Tool" />
    </SlideContainer>
  );
}
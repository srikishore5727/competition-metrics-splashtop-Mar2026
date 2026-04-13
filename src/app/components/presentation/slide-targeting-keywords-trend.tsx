import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SlideContainer, SlideHeader, SlideFooter, EditButton } from './design-system';

type Keyword = {
  keyword: string;
  msv: string;
  kd: number;
  dec: number | null;
  jan: number | null;
  feb: number | null;
  mar: number | null;
  trend: number; // positive = improved (rank # dropped = better), 0 = stable, negative = dropped
};

const KEYWORDS_INIT: Keyword[] = [
  { keyword: 'remote desktop',                  msv: '74K',   kd: 100, dec: 15,  jan: 20,  feb: 17, mar: 12, trend:  3  },
  { keyword: 'remote desktop software',         msv: '3.6K',  kd: 98,  dec: 20,  jan: 16,  feb: 10, mar: 5,  trend: 15  },
  { keyword: 'remote access',                   msv: '8.1K',  kd: 100, dec: 7,   jan: 8,   feb: 6,  mar: 7,  trend:  0  },
  { keyword: 'remote access software',          msv: '3.6K',  kd: 98,  dec: 13,  jan: 15,  feb: 12, mar: 8,  trend:  5  },
  { keyword: 'remote support',                  msv: '4.4K',  kd: 100, dec: 16,  jan: 18,  feb: 12, mar: 13, trend:  3  },
  { keyword: 'remote support software',         msv: '1.9K',  kd: 59,  dec: 12,  jan: 12,  feb: 4,  mar: 1,  trend: 11  },
  { keyword: 'teamviewer alternative',          msv: '1.9K',  kd: 45,  dec: 6,   jan: 8,   feb: 5,  mar: 5,  trend:  1  },
  { keyword: 'teamviewer pricing',              msv: '1K',    kd: 39,  dec: 24,  jan: 13,  feb: 9,  mar: 9,  trend: 15  },
  { keyword: 'logmein alternative',             msv: '210',   kd: 25,  dec: 20,  jan: 29,  feb: 17, mar: 7,  trend: 13  },
  { keyword: 'logmein pricing',                 msv: '320',   kd: 37,  dec: 12,  jan: 10,  feb: 12, mar: 13, trend: -1  },
  { keyword: 'anydesk alternative',             msv: '590',   kd: 28,  dec: 20,  jan: 21,  feb: 9,  mar: 6,  trend: 14  },
  { keyword: 'anydesk pricing',                 msv: '590',   kd: 32,  dec: 10,  jan: 8,   feb: 6,  mar: 7,  trend:  3  },
  { keyword: 'patch management',                msv: '2.9K',  kd: 37,  dec: 62,  jan: 51,  feb: 33, mar: 29, trend: 33  },
  { keyword: 'patch management software',       msv: '1.3K',  kd: 25,  dec: 62,  jan: 62,  feb: 50, mar: 34, trend: 28  },
  { keyword: 'autonomous endpoint management',  msv: '170',   kd: 18,  dec: 16,  jan: 6,   feb: 2,  mar: 5,  trend: 11  },
];

function getKdStyle(kd: number) {
  if (kd <= 25) return { bg: '#DCFCE7', text: '#15803D' };  // green – Easy win
  if (kd <= 45) return { bg: '#FEF9C3', text: '#B45309' };  // amber – Moderate
  return           { bg: '#FEE2E2', text: '#DC2626' };       // red   – Competitive
}

function TrendCell({ trend }: { trend: number }) {
  if (trend > 0) return (
    <span className="inline-flex items-center gap-0.5" style={{ color: '#16A34A' }}>
      <TrendingUp className="w-3.5 h-3.5" />
      <span className="text-xs font-bold">+{trend}</span>
    </span>
  );
  if (trend < 0) return (
    <span className="inline-flex items-center gap-0.5" style={{ color: '#DC2626' }}>
      <TrendingDown className="w-3.5 h-3.5" />
      <span className="text-xs font-bold">{trend}</span>
    </span>
  );
  return (
    <span className="inline-flex items-center gap-0.5" style={{ color: '#9CA3AF' }}>
      <Minus className="w-3.5 h-3.5" />
    </span>
  );
}

export function SlideTargetingKeywordsTrend({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [keywords, setKeywords] = useState<Keyword[]>(KEYWORDS_INIT.map(k => ({ ...k })));
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit   = () => setIsEditing(true);
  const handleSave   = () => setIsEditing(false);
  const handleCancel = () => { setKeywords(KEYWORDS_INIT.map(k => ({ ...k }))); setIsEditing(false); };

  const handleChange = (rowIdx: number, field: keyof Keyword, value: string) => {
    setKeywords(prev => prev.map((kw, i) => {
      if (i !== rowIdx) return kw;
      if (field === 'keyword' || field === 'msv') return { ...kw, [field]: value };
      const n = value === '' ? null : parseFloat(value);
      return { ...kw, [field]: isNaN(n as number) ? kw[field] : n };
    }));
  };

  // ── Insight computations ────────────────────────────────────────────────
  const improved = keywords.filter(k => k.trend > 0);
  const easyWin  = keywords.filter(k => k.kd <= 25);
  const highComp = keywords.filter(k => k.kd > 45);

  return (
    <SlideContainer slideNumber={7} onNavigateHome={onNavigateHome} source="GSC">
      <SlideHeader
        title="Targeting Keywords Trend"
        subtitle="Dec 2025 – Mar 2026 (Source: GSC· Country: US)"
      />

      {/* Edit button row */}
      <div className="flex justify-end mb-3">
        <EditButton isEditing={isEditing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
      </div>

      {/* Section label + legend */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-800">Ranking Trend: Dec → Jan → Feb → Mar</span>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Lower rank = better position</span>
          <span className="flex items-center gap-1 text-green-600 font-semibold"><TrendingUp className="w-3 h-3"/>Improved</span>
          <span className="flex items-center gap-1 text-red-500 font-semibold"><TrendingDown className="w-3 h-3"/>Dropped</span>
          <span className="flex items-center gap-1 text-gray-400 font-semibold"><Minus className="w-3 h-3"/>Stable</span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-0">
        {/* Table header */}
        <div className="grid bg-gray-50 border-b border-gray-200 px-4 py-2.5"
             style={{ gridTemplateColumns: '2fr 0.6fr 0.7fr 0.5fr 0.5fr 0.5fr 0.5fr 0.65fr' }}>
          {['KEYWORD','MSV','KD','DEC','JAN','FEB','MAR','TREND'].map(h => (
            <span key={h} className="text-xs font-bold text-gray-500 tracking-wide uppercase">{h}</span>
          ))}
        </div>

        {/* Table body – scrollable */}
        <div className="overflow-y-auto flex-1">
          {isEditing ? (
            // Edit mode rows
            keywords.map((kw, i) => (
              <div
                key={i}
                className={`grid items-center px-4 py-1.5 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                style={{ gridTemplateColumns: '2fr 0.6fr 0.7fr 0.5fr 0.5fr 0.5fr 0.5fr 0.65fr' }}
              >
                <input
                  value={kw.keyword}
                  onChange={e => handleChange(i, 'keyword', e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1 w-full mr-2"
                />
                <input
                  value={kw.msv}
                  onChange={e => handleChange(i, 'msv', e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1 w-16"
                />
                <input
                  type="number"
                  value={kw.kd}
                  onChange={e => handleChange(i, 'kd', e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1 w-14"
                />
                {(['dec','jan','feb','mar'] as const).map(f => (
                  <input
                    key={f}
                    type="number"
                    value={kw[f] ?? ''}
                    onChange={e => handleChange(i, f, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 w-14"
                  />
                ))}
                <input
                  type="number"
                  value={kw.trend}
                  onChange={e => handleChange(i, 'trend', e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1 w-14"
                />
              </div>
            ))
          ) : (
            // View mode rows
            keywords.map((kw, i) => {
              const kdStyle = getKdStyle(kw.kd);
              return (
                <div
                  key={i}
                  className={`grid items-center px-4 py-2 border-b border-gray-100 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                  style={{ gridTemplateColumns: '2fr 0.6fr 0.7fr 0.5fr 0.5fr 0.5fr 0.5fr 0.65fr' }}
                >
                  <span className="text-xs font-medium text-gray-800 capitalize">{kw.keyword}</span>
                  <span className="text-xs text-gray-600 font-semibold">{kw.msv}</span>
                  <span>
                    <span
                      className="inline-block text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: kdStyle.bg, color: kdStyle.text }}
                    >
                      {kw.kd}
                    </span>
                  </span>
                  <span className="text-xs text-gray-700 font-medium">{kw.dec ?? '—'}</span>
                  <span className="text-xs text-gray-700 font-medium">{kw.jan ?? '—'}</span>
                  <span className="text-xs text-gray-700 font-medium">{kw.feb ?? '—'}</span>
                  <span className="text-xs text-gray-700 font-medium">{kw.mar ?? '—'}</span>
                  <TrendCell trend={kw.trend} />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* KD Legend */}
      <div className="flex items-center gap-6 mt-2.5 mb-3 justify-end">
        {[
          { bg: '#DCFCE7', text: '#15803D', label: 'KD ≤ 25 — Easy win'    },
          { bg: '#FEF9C3', text: '#B45309', label: 'KD 26–45 — Moderate'   },
          { bg: '#FEE2E2', text: '#DC2626', label: 'KD > 45 — Competitive' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: l.text }} />
            <span className="text-xs text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>

      {/* KEY INSIGHTS */}
      <div className="mt-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Insights</p>
        <div className="grid grid-cols-3 gap-4">
          {/* Card 1 – Rankings Improved */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#16A34A' }} />
              <span className="text-xs font-bold text-green-800">Rankings Improved Dec → Mar</span>
            </div>
            <p className="text-xs text-green-700 leading-relaxed">
              <strong>{improved.length} keywords</strong> improved their ranking position from Dec → Mar, including{' '}
              <strong>patch management (+33)</strong> and{' '}
              <strong>patch management software (+28 positions)</strong>.
            </p>
          </div>

          {/* Card 2 – Easy Win */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: '#FEFCE8', borderColor: '#FDE68A' }}>
            <div className="flex items-center gap-2 mb-2">
              <Minus className="w-4 h-4 flex-shrink-0" style={{ color: '#B45309' }} />
              <span className="text-xs font-bold text-amber-800">Easy Win Opportunities</span>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>{easyWin.length} keywords</strong> have KD ≤ 25 (logmein alt, anydesk alt, patch mgmt sw, autonomous endpoint mgmt), offering low-competition gains with{' '}
              <strong>~2.3K combined MSV</strong>.
            </p>
          </div>

          {/* Card 3 – High Competition */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: '#FFF7ED', borderColor: '#FDBA74' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 flex-shrink-0" style={{ color: '#DC2626' }} />
              <span className="text-xs font-bold text-orange-800">High Competition Keywords</span>
            </div>
            <p className="text-xs text-orange-700 leading-relaxed">
              <strong>{highComp.length} of {keywords.length} tracked keywords</strong> have KD &gt; 45, including{' '}
              <strong>remote desktop (KD 100, 74K MSV)</strong>. These require sustained content authority to
              improve rankings.
            </p>
          </div>
        </div>
      </div>

      <SlideFooter source="Source: GSC" />
    </SlideContainer>
  );
}

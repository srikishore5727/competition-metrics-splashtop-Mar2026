import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  InsightCard,
  InsightsSection,
  EditButton,
  CompetitorFilter,
  CHART_CONFIG,
} from './design-system';

// Remote-access competitive set — matches slides 7–11
const VENDORS = [
  { id: 'splashtop',   name: 'Splashtop',   color: '#3B82F6' },
  { id: 'teamviewer',  name: 'TeamViewer',  color: '#FF7AB6' },
  { id: 'anydesk',     name: 'AnyDesk',     color: '#7ED957' },
  { id: 'beyondtrust', name: 'BeyondTrust', color: '#FFB14A' },
  { id: 'gotomypc',    name: 'GoTo (MyPC)', color: '#EF4444' },
];

// Oct 2025 → Mar 2026 (6 months)
const MONTHS_DISPLAY = ['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026'];
const MONTH_KEYS     = ['2025-10',  '2025-11',  '2025-12',  '2026-01',  '2026-02',  '2026-03'];

const formatMonth = (key: string) => {
  const map: Record<string,string> = {
    '2025-10':'Oct 2025','2025-11':'Nov 2025','2025-12':'Dec 2025',
    '2026-01':'Jan 2026','2026-02':'Feb 2026','2026-03':'Mar 2026',
  };
  return map[key] ?? key;
};

// ── AI Keywords (total AI keyword count) ─────────────────────────────────────
const AI_KEYWORDS_INIT = {
  splashtop:   [1117, 1193, 1483, 1764, 1972, 2403],
  teamviewer:  [1480, 1490, 1580, 1787, 1880, 2715],
  anydesk:     [ 422,  370,  403,  519,  559,  725],
  beyondtrust: [ 515,  516,  603,  744,  747,  901],
  gotomypc:    [  36,   38,   39,   36,   27,   35],
};

// ── Branded AI keywords ───────────────────────────────────────────────────────
const BRANDED_INIT = {
  splashtop:   [  85,  101,  109,  142,  149,  196],
  teamviewer:  [ 685,  678,  655,  701,  694,  730],
  anydesk:     [ 227,  208,  194,  231,  241,  244],
  beyondtrust: [ 108,   89,   89,  123,  114,  154],
  gotomypc:    [   8,    7,    6,   14,   10,    6],
};

// ── Non-Branded AI keywords ───────────────────────────────────────────────────
const NON_BRANDED_INIT = {
  splashtop:   [1032, 1092, 1374, 1622, 1823, 2207],
  teamviewer:  [ 795,  812,  965, 1054, 1186, 1985],
  anydesk:     [ 195,  162,  209,  288,  318,  481],
  beyondtrust: [ 407,  427,  514,  621,  633,  747],
  gotomypc:    [  28,   31,   33,   22,   17,   29],
};

type TabType = 'aiKeywords' | 'branded' | 'nonBranded';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const valid = payload.filter((e: any) => e.value !== null && e.value !== undefined);
  if (!valid.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-900 mb-2">{formatMonth(label)}</p>
      {valid.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export function SlideProfundMetrics({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('aiKeywords');
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(new Set(VENDORS.map(v => v.id)));
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    aiKeywords:  { ...AI_KEYWORDS_INIT  } as Record<string,number[]>,
    branded:     { ...BRANDED_INIT      } as Record<string,number[]>,
    nonBranded:  { ...NON_BRANDED_INIT  } as Record<string,number[]>,
  });

  const toggleVendor = (id: string) => setVisibleVendors(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s;
  });

  const handleEdit   = () => setIsEditing(true);
  const handleSave   = () => setIsEditing(false);
  const handleCancel = () => {
    setEditableData({
      aiKeywords: { ...AI_KEYWORDS_INIT  },
      branded:    { ...BRANDED_INIT      },
      nonBranded: { ...NON_BRANDED_INIT  },
    });
    setIsEditing(false);
  };

  const handleValueChange = (metric: 'aiKeywords'|'branded'|'nonBranded', vendorId: string, monthIdx: number, value: string) => {
    const n = parseFloat(value) || 0;
    setEditableData(prev => ({
      ...prev,
      [metric]: {
        ...prev[metric],
        [vendorId]: prev[metric][vendorId].map((v, i) => i === monthIdx ? n : v),
      },
    }));
  };

  const mkChartData = (ds: Record<string,number[]>) =>
    MONTH_KEYS.map((key, idx) => {
      const pt: any = { month: key };
      VENDORS.forEach(v => { if (visibleVendors.has(v.id)) pt[v.id] = ds[v.id][idx]; });
      return pt;
    });

  const getChartData = () => {
    switch (activeTab) {
      case 'aiKeywords':  return mkChartData(editableData.aiKeywords);
      case 'branded':     return mkChartData(editableData.branded);
      case 'nonBranded':  return mkChartData(editableData.nonBranded);
    }
  };

  const latestIdx = 5; // Mar 2026

  const getInsights = () => {
    if (activeTab === 'aiKeywords') return (
      <InsightsSection>
        <InsightCard icon={TrendingUp} type="success" title="Splashtop"    content={<>From Oct 2025 to Mar 2026, AI keywords grew <strong>1,117 → 2,403 (+115%)</strong>, strong expansion in AI visibility.</>} />
        <InsightCard icon={TrendingUp} type="success" title="Competitions" content={<>TeamViewer grew <strong>1,480 → 2,715 (+83.4%)</strong>, while AnyDesk increased <strong>422 → 725 (+71.8%)</strong>.</>} />
      </InsightsSection>
    );
    if (activeTab === 'branded') return (
      <InsightsSection>
        <InsightCard icon={TrendingUp} type="success" title="Splashtop"    content={<>From Oct 2025 to Mar 2026, branded AI keywords grew <strong>85 → 196 (+130.6%)</strong>, strongest branded growth in the set.</>} />
        <InsightCard icon={TrendingUp} type="info"    title="Competitions" content={<>TeamViewer leads branded at <strong>685 → 730 (+6.6%)</strong>, while AnyDesk held steady <strong>227 → 244 (+7.5%)</strong>.</>} />
      </InsightsSection>
    );
    return (
      <InsightsSection>
        <InsightCard icon={TrendingUp} type="success" title="Splashtop"    content={<>From Oct 2025 to Mar 2026, non-branded AI keywords grew <strong>1,032 → 2,207 (+114%)</strong>, discovery-led growth.</>} />
        <InsightCard icon={TrendingUp} type="success" title="Competitions" content={<>TeamViewer grew <strong>795 → 1,985 (+149.7%)</strong>, while BeyondTrust increased <strong>407 → 747 (+83.6%)</strong>.</>} />
      </InsightsSection>
    );
  };

  const tabs = [
    { id: 'aiKeywords' as TabType, label: 'AI Keywords' },
    { id: 'branded'    as TabType, label: 'Branded'     },
    { id: 'nonBranded' as TabType, label: 'Non Branded' },
  ];

  const editMonths = ['Oct','Nov','Dec','Jan','Feb','Mar'];

  return (
    <SlideContainer slideNumber={14} onNavigateHome={onNavigateHome} source="SEMrush">
      <SlideHeader title="AI Overview Keywords" subtitle="(Oct 2025 - Mar 2026)" />

      {!isEditing ? (
        <div className="flex-1 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? 'bg-white text-red-600 z-10'
                      : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
                  }`}
                  style={{
                    borderRadius: '12px 12px 0 0',
                    marginBottom: '-2px',
                    boxShadow: activeTab === tab.id
                      ? '0 -2px 8px rgba(0,0,0,0.08), 0 2px 0 0 white'
                      : '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <EditButton isEditing={isEditing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Content Area */}
          <div className="flex-1 grid grid-cols-12 gap-6">
            {/* Chart Section */}
            <div className="col-span-8 flex flex-col gap-4">
              <ChartContainer title="" height={420}>
                <div className="h-full flex flex-col">
                  <div className="pb-4 border-b border-gray-200 mb-4">
                    <CompetitorFilter competitors={VENDORS} visibleCompetitors={visibleVendors} onToggle={toggleVendor} />
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        key={`${activeTab}-${[...visibleVendors].sort().join('-')}`}
                        data={getChartData()}
                        margin={CHART_CONFIG.margin}
                      >
                        <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                        <XAxis dataKey="month" {...CHART_CONFIG.xAxis} tickFormatter={formatMonth} />
                        <YAxis {...CHART_CONFIG.yAxis} />
                        <Tooltip content={<CustomTooltip />} />
                        {VENDORS.filter(v => visibleVendors.has(v.id)).map(v => (
                          <Line
                            key={`${activeTab}-${v.id}`}
                            name={v.name}
                            type="monotone"
                            dataKey={v.id}
                            stroke={v.color}
                            {...CHART_CONFIG.line}
                            dot={{ fill: v.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 7, strokeWidth: 2 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ChartContainer>
            </div>

            {/* Insights Section */}
            <div className="col-span-4 flex flex-col gap-4">
              {getInsights()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit AI Overview Keywords Data (Oct 2025 – Mar 2026)</h3>
            <div className="space-y-6">
              {VENDORS.map(vendor => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {(['aiKeywords','branded','nonBranded'] as const).map(ds => (
                      <div key={ds}>
                        <div className="text-xs font-semibold text-gray-700 mb-2">
                          {ds==='aiKeywords'?'AI Keywords': ds==='branded'?'Branded':'Non Branded'}:
                        </div>
                        {editMonths.map((mo, idx) => (
                          <div key={mo} className="mb-2">
                            <label className="text-xs text-gray-600 block mb-1">{mo}:</label>
                            <input
                              type="number"
                              value={editableData[ds][vendor.id][idx]}
                              onChange={e => handleValueChange(ds, vendor.id, idx, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <SlideFooter source="Source: Profound" />
    </SlideContainer>
  );
}
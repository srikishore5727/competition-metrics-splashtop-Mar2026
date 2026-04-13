import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatChartAxisNumber } from '@/app/utils/format';
import {
  SlideContainer, SlideHeader, SlideFooter, ChartContainer,
  InsightCard, InsightsSection, EditButton, CompetitorFilter,
  CHART_CONFIG, TimeRangeFilter, TimeRange, getTimeRangeOffset,
} from './design-system';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Remote-access competitive set — matches slides 7–11 & 14
const REMOTE_VENDORS = [
  { id: 'splashtop',   name: 'Splashtop',   color: '#3B82F6' },
  { id: 'teamviewer',  name: 'TeamViewer',  color: '#FF7AB6' },
  { id: 'anydesk',     name: 'AnyDesk',     color: '#7ED957' },
  { id: 'beyondtrust', name: 'BeyondTrust', color: '#FFB14A' },
  { id: 'gotomypc',    name: 'GoTo (MyPC)', color: '#EF4444' },
];

// Oct 2025 → Mar 2026 (6 months)
const MONTHS = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];

const formatMonth = (m: string) => {
  const [y, mo] = m.split('-');
  return `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+mo-1]} ${y}`;
};

// ── AI Traffic (total AI-referred traffic) ─────────────────────────────────
const AI_TRAFFIC_INIT = {
  splashtop:   [ 4107,  6442,  9782, 10787, 12769, 15258],
  teamviewer:  [ 9332, 15600,  9363, 48299, 11044, 19248],
  anydesk:     [ 2058,  1872,  3719,  2899,  2580,  5943],
  beyondtrust: [ 5166,  2928,  5197,  2904,  4135,  5329],
  gotomypc:    [   96,   112,   221,    60,    41,   198],
};

// ── Branded AI Traffic ────────────────────────────────────────────────────
const BRANDED_INIT = {
  splashtop:   [  882, 1049,  819,  766, 3745, 6049],
  teamviewer:  [ 4153, 3469, 3093, 3787, 4777, 7931],
  anydesk:     [ 1274, 1163, 2663, 1860, 1448, 2574],
  beyondtrust: [ 3670, 1405, 2860, 1270, 2095, 2191],
  gotomypc:    [   26,   26,   11,    9,    3,   15],
};

// ── Non-Branded AI Traffic ────────────────────────────────────────────────
const NON_BRANDED_INIT = {
  splashtop:   [ 3225,  5393,  8963, 10021,  9024,  9209],
  teamviewer:  [ 5179, 12131,  6270, 44512,  6267, 11317],
  anydesk:     [  784,   709,  1056,  1039,  1132,  3369],
  beyondtrust: [ 1496,  1523,  2337,  1634,  2040,  3138],
  gotomypc:    [   70,    86,   210,    51,    38,   183],
};

type TabType = 'aiTraffic' | 'branded' | 'nonBranded';

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

export function SlideCategoryPerformance({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('aiTraffic');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [visible, setVisible] = useState<Set<string>>(new Set(REMOTE_VENDORS.map(v => v.id)));
  const [editableData, setEditableData] = useState(() => ({
    aiTraffic:   JSON.parse(JSON.stringify(AI_TRAFFIC_INIT))   as Record<string,number[]>,
    branded:     JSON.parse(JSON.stringify(BRANDED_INIT))      as Record<string,number[]>,
    nonBranded:  JSON.parse(JSON.stringify(NON_BRANDED_INIT))  as Record<string,number[]>,
  }));
  const [isEditing, setIsEditing] = useState(false);

  const toggle = (id: string) => setVisible(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const handleEdit   = () => setIsEditing(true);
  const handleSave   = () => setIsEditing(false);
  const handleCancel = () => {
    setEditableData({
      aiTraffic:  JSON.parse(JSON.stringify(AI_TRAFFIC_INIT)),
      branded:    JSON.parse(JSON.stringify(BRANDED_INIT)),
      nonBranded: JSON.parse(JSON.stringify(NON_BRANDED_INIT)),
    });
    setIsEditing(false);
  };
  const handleValueChange = (ds: 'aiTraffic'|'branded'|'nonBranded', id: string, idx: number, val: string) => {
    const n = parseFloat(val) || 0;
    setEditableData(prev => ({
      ...prev,
      [ds]: { ...prev[ds], [id]: prev[ds][id].map((v, i) => i === idx ? n : v) },
    }));
  };

  const tro = getTimeRangeOffset(timeRange);
  const mkData = (ds: Record<string,number[]>) =>
    MONTHS.slice(tro).map((month, i) => {
      const pt: any = { month };
      REMOTE_VENDORS.forEach(v => { if (visible.has(v.id)) pt[v.id] = ds[v.id][i + tro] ?? null; });
      return pt;
    });

  const getDataset = () =>
    activeTab === 'aiTraffic' ? editableData.aiTraffic
    : activeTab === 'branded' ? editableData.branded
    :                            editableData.nonBranded;

  const chartData = mkData(getDataset());

  const yMax = (() => {
    let max = 0;
    chartData.forEach(pt => REMOTE_VENDORS.forEach(v => { if (visible.has(v.id) && pt[v.id] != null) max = Math.max(max, pt[v.id]); }));
    return Math.ceil(max * 1.15);
  })();

  const latestIdx = 5; // Mar 2026

  const getInsights = () => {
    if (activeTab === 'aiTraffic') return (
      <InsightsSection>
        <InsightCard icon={TrendingUp} type="success" title="Splashtop"    content={<>From Oct 2025 to Mar 2026, AI traffic grew <strong>4,107 → 15,258 (+271.5%)</strong>, strong acceleration in AI-driven discovery.</>} />
        <InsightCard icon={TrendingUp} type="success" title="Competitions" content={<>TeamViewer grew <strong>9,332 → 19,248 (+106.3%)</strong>, while AnyDesk increased <strong>2,058 → 5,943 (+188.8%)</strong>.</>} />
      </InsightsSection>
    );
    if (activeTab === 'branded') return (
      <InsightsSection>
        <InsightCard icon={TrendingUp} type="success" title="Splashtop"    content={<>From Oct 2025 to Mar 2026, branded traffic grew <strong>882 → 6,049 (+585.8%)</strong>, rising brand visibility in AI results.</>} />
        <InsightCard icon={TrendingUp} type="success" title="Competitions" content={<>TeamViewer increased <strong>4,153 → 7,931 (+91.0%)</strong>, while AnyDesk grew <strong>1,274 → 2,574 (+102.0%)</strong>.</>} />
      </InsightsSection>
    );
    return (
      <InsightsSection>
        <InsightCard icon={TrendingUp} type="success" title="Splashtop"    content={<>From Oct 2025 to Mar 2026, non-branded traffic grew <strong>3,225 → 9,209 (+185.6%)</strong>, indicating discovery-led AI growth.</>} />
        <InsightCard icon={TrendingUp} type="success" title="Competitions" content={<>TeamViewer grew <strong>5,179 → 11,317 (+118.5%)</strong>, while AnyDesk increased <strong>784 → 3,369 (+329.7%)</strong>.</>} />
      </InsightsSection>
    );
  };

  const getPerformanceSummary = () => {
    const ds = getDataset();
    const fmt = (v: number) => v >= 1000 ? `${(v/1000).toFixed(1)}K` : v.toLocaleString();
    const ordinal = (n: number) => n===2?'2nd':n===3?'3rd':`${n}th`;
    const rankings = REMOTE_VENDORS.map(v => ({ id:v.id, name:v.name, value: ds[v.id]?.[latestIdx] ?? 0 })).sort((a,b) => b.value-a.value);
    const splash = rankings.find(r => r.id==='splashtop'); if (!splash) return null;
    const pos = rankings.findIndex(r => r.id==='splashtop') + 1;
    if (pos === 1) {
      const gap = splash.value - rankings[1].value;
      return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-sm text-green-900">Top Performer - <span className="font-bold">Splashtop</span></span><span className="text-sm text-green-900 font-semibold">{fmt(splash.value)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-green-800">2nd position - {rankings[1].name}</span><span className="text-sm text-green-800 font-semibold">{fmt(rankings[1].value)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-green-900 font-semibold">Lead:</span><span className="text-sm text-green-900 font-semibold">+{fmt(gap)} ({((gap/splash.value)*100).toFixed(1)}% ahead)</span></div>
          </div>
        </div>
      );
    }
    const first = rankings[0]; const gap = first.value - splash.value;
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 rounded-xl p-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex justify-between"><span className="text-sm text-orange-900">Top Performer - <span className="font-bold">{first.name}</span></span><span className="text-sm text-orange-900 font-semibold">{fmt(first.value)}</span></div>
          <div className="flex justify-between"><span className="text-sm text-orange-800">{ordinal(pos)} position - Splashtop</span><span className="text-sm text-orange-800 font-semibold">{fmt(splash.value)}</span></div>
          <div className="flex justify-between"><span className="text-sm text-orange-900 font-semibold">Gap to #1:</span><span className="text-sm text-orange-900 font-semibold">{fmt(gap)} ({((gap/first.value)*100).toFixed(1)}% behind)</span></div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'aiTraffic'  as TabType, label: 'AI Traffic'   },
    { id: 'branded'    as TabType, label: 'Branded'      },
    { id: 'nonBranded' as TabType, label: 'Non-Branded'  },
  ];

  const editMonths = ['Oct','Nov','Dec','Jan','Feb','Mar'];

  const vis = REMOTE_VENDORS.filter(v => visible.has(v.id));

  return (
    <SlideContainer slideNumber={15} onNavigateHome={onNavigateHome} source="SEMrush">
      <SlideHeader title="AI Overview Traffic" subtitle="(Oct 2025 - Mar 2026)" />

      {!isEditing ? (
        <div className="flex-1 flex flex-col gap-6">
          {/* Tabs + controls */}
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
            <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
          </div>

          {/* Content */}
          <div className="flex-1 grid grid-cols-12 gap-6">
            {/* Chart — 8 cols */}
            <div className="col-span-8 flex flex-col gap-4">
              <ChartContainer
                title=""
                actions={<EditButton isEditing={isEditing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />}
                height={420}
              >
                <div className="h-full flex flex-col">
                  <div className="pb-4 border-b border-gray-200 mb-4">
                    <CompetitorFilter competitors={REMOTE_VENDORS} visibleCompetitors={visible} onToggle={toggle} />
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer key={`${activeTab}-${tro}-${[...visible].sort().join('-')}`} width="100%" height="100%">
                      <LineChart data={chartData} margin={CHART_CONFIG.margin}>
                        <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                        <XAxis dataKey="month" {...CHART_CONFIG.xAxis} tickFormatter={formatMonth} />
                        <YAxis domain={[0, yMax]} {...CHART_CONFIG.yAxis} tickFormatter={formatChartAxisNumber} />
                        <Tooltip content={<CustomTooltip />} />
                        {vis.map(v => (
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

            {/* Insights — 4 cols */}
            <div className="col-span-4 flex flex-col gap-4">
              {getInsights()}
              {getPerformanceSummary()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit AI Overview Traffic Data (Oct 2025 – Mar 2026)</h3>
            <div className="space-y-6">
              {REMOTE_VENDORS.map(v => (
                <div key={v.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: v.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{v.name}</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {(['aiTraffic','branded','nonBranded'] as const).map(ds => (
                      <div key={ds}>
                        <div className="text-xs font-semibold text-gray-700 mb-2">
                          {ds==='aiTraffic'?'AI Traffic':ds==='branded'?'Branded':'Non-Branded'}:
                        </div>
                        {editMonths.map((mo, idx) => (
                          <div key={mo} className="mb-2">
                            <label className="text-xs text-gray-600 block mb-1">{mo}:</label>
                            <input
                              type="number"
                              value={editableData[ds][v.id][idx]}
                              onChange={e => handleValueChange(ds, v.id, idx, e.target.value)}
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
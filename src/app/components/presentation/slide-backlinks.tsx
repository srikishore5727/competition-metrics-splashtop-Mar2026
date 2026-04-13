import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber } from '@/app/utils/format';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  SlideContainer, SlideHeader, SlideFooter, ChartContainer,
  InsightCard, InsightsSection, CompetitorFilter, EditButton,
  CHART_CONFIG, TimeRangeFilter, TimeRange, getTimeRangeOffset,
} from './design-system';

// ── Remote-access competitive set (matches slides 7–11, 14, 15) ─────────────
const VENDORS = [
  { id: 'splashtop',   name: 'Splashtop',   color: '#3B82F6' },
  { id: 'teamviewer',  name: 'TeamViewer',  color: '#FF7AB6' },
  { id: 'anydesk',     name: 'AnyDesk',     color: '#7ED957' },
  { id: 'beyondtrust', name: 'BeyondTrust', color: '#FFB14A' },
  { id: 'gotomypc',    name: 'GoTo (MyPC)', color: '#EF4444' },
];

// Oct 2025 → Mar 2026
const MONTH_KEYS = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];

const formatMonth = (key: string) => {
  const map: Record<string, string> = {
    '2025-10': 'Oct 2025', '2025-11': 'Nov 2025', '2025-12': 'Dec 2025',
    '2026-01': 'Jan 2026', '2026-02': 'Feb 2026', '2026-03': 'Mar 2026',
  };
  return map[key] ?? key;
};

// ── Referring Domains ────────────────────────────────────────────────────────
const REFERRING_DOMAINS_INIT: Record<string, number[]> = {
  splashtop:   [ 15946,  16955,  17078,  17107,  17310,  17851],
  teamviewer:  [123670, 122588, 119354, 117016, 116775, 118221],
  anydesk:     [ 40731,  40316,  39093,  38476,  38556,  39014],
  beyondtrust: [ 15880,  16786,  16330,  15835,  15881,  16027],
  gotomypc:    [  4581,   4450,   4501,   4380,   4232,   4205],
};

// ── Backlinks ────────────────────────────────────────────────────────────────
const BACKLINKS_INIT: Record<string, number[]> = {
  splashtop:   [ 1843951,  1385376,  1173208,  1154055,  1123979,  1018559],
  teamviewer:  [18841453, 18312611, 17975354, 18053149, 17932864, 17781816],
  anydesk:     [ 8985522,  9999336, 10570441, 11060227, 10935451, 10403413],
  beyondtrust: [  792939,   804609,   788689,   786337,   788440,   792394],
  gotomypc:    [   89053,    88209,    85758,    84712,    79873,    76063],
};

type TabType = 'referringDomains' | 'backlinks';

const CustomTooltip = ({ active, payload, label, isBacklinks }: any) => {
  if (!active || !payload?.length) return null;
  const valid = payload.filter((e: any) => e.value !== null && e.value !== undefined);
  if (!valid.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-900 mb-2">{formatMonth(label)}</p>
      {valid.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">
            {isBacklinks ? formatNumber(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SlideBacklinks({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab,    setActiveTab]    = useState<TabType>('referringDomains');
  const [timeRange,    setTimeRange]    = useState<TimeRange>('all');
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(new Set(VENDORS.map(v => v.id)));
  const [isEditing,    setIsEditing]    = useState(false);

  const [editableData, setEditableData] = useState<{
    referringDomains: Record<string, number[]>;
    backlinks:        Record<string, number[]>;
  }>(() => ({
    referringDomains: JSON.parse(JSON.stringify(REFERRING_DOMAINS_INIT)),
    backlinks:        JSON.parse(JSON.stringify(BACKLINKS_INIT)),
  }));

  const handleEdit   = () => setIsEditing(true);
  const handleSave   = () => setIsEditing(false);
  const handleCancel = () => {
    setEditableData({
      referringDomains: JSON.parse(JSON.stringify(REFERRING_DOMAINS_INIT)),
      backlinks:        JSON.parse(JSON.stringify(BACKLINKS_INIT)),
    });
    setIsEditing(false);
  };

  const handleValueChange = (ds: TabType, vendorId: string, idx: number, value: string) => {
    const n = parseFloat(value); if (isNaN(n)) return;
    setEditableData(prev => ({
      ...prev,
      [ds]: { ...prev[ds], [vendorId]: prev[ds][vendorId].map((v, i) => i === idx ? n : v) },
    }));
  };

  const toggleVendor = (id: string) => setVisibleVendors(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s;
  });

  const tro = getTimeRangeOffset(timeRange);

  const mkData = (ds: Record<string, number[]>) =>
    MONTH_KEYS.slice(tro).map((key, i) => {
      const pt: any = { month: key };
      VENDORS.forEach(v => { if (visibleVendors.has(v.id)) pt[v.id] = ds[v.id]?.[i + tro] ?? null; });
      return pt;
    });

  const rdChartData = mkData(editableData.referringDomains);
  const blChartData = mkData(editableData.backlinks);

  const yMax = (data: any[]) => {
    let max = 0;
    data.forEach(pt => VENDORS.forEach(v => { if (visibleVendors.has(v.id) && pt[v.id] != null) max = Math.max(max, pt[v.id]); }));
    return Math.ceil(max * 1.15);
  };

  const getChartData = () => activeTab === 'referringDomains' ? rdChartData : blChartData;

  const tabs = [
    { id: 'referringDomains' as TabType, label: 'Referring Domains' },
    { id: 'backlinks'        as TabType, label: 'Total Backlinks'   },
  ];

  const getInsights = () => {
    if (activeTab === 'referringDomains') return (
      <InsightsSection>
        <InsightCard icon={TrendingUp}   type="success" title="Splashtop"    content={<>From Oct 2025 to Mar 2026, referring domains grew <strong>15.9K → 17.9K (+11.9%)</strong>, consistent authority growth.</>} />
        <InsightCard icon={TrendingDown} type="error"   title="Competitions" content={<>TeamViewer declined <strong>123.7K → 118.2K (−4.4%)</strong>, while AnyDesk slightly declined <strong>40.7K → 39.0K (−4.2%)</strong>.</>} />
      </InsightsSection>
    );
    return (
      <InsightsSection>
        <InsightCard icon={TrendingDown} type="error"   title="Splashtop"    content={<>From Oct 2025 to Mar 2026, backlinks declined <strong>1.84M → 1.02M (−44.8%)</strong>, indicating link profile consolidation.</>} />
        <InsightCard icon={TrendingUp}   type="success" title="Competitions" content={<>TeamViewer declined <strong>18.8M → 17.8M (−5.6%)</strong>, while AnyDesk increased <strong>8.9M → 10.4M (+16.0%)</strong>.</>} />
      </InsightsSection>
    );
  };

  const getPerformanceSummary = () => {
    const latestIdx = 5; // Mar 2026
    const ds = activeTab === 'referringDomains' ? editableData.referringDomains : editableData.backlinks;
    const fmt = (v: number) => formatNumber(v);
    const ordinal = (n: number) => n===2?'2nd':n===3?'3rd':`${n}th`;

    const rankings = VENDORS.map(v => ({ id: v.id, name: v.name, value: ds[v.id]?.[latestIdx] ?? 0 }))
      .sort((a, b) => b.value - a.value);

    const splash = rankings.find(r => r.id === 'splashtop'); if (!splash) return null;
    const pos = rankings.findIndex(r => r.id === 'splashtop') + 1;

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

  const editMonths = ['Oct','Nov','Dec','Jan','Feb','Mar'];

  return (
    <SlideContainer slideNumber={18} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="Backlink Performance"
        subtitle="(Oct 2025 - Mar 2026) • Location: WW"
      />

      {!isEditing ? (
        <div className="flex-1 flex flex-col gap-6">
          {/* Tabs + TimeRange */}
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
                    <CompetitorFilter
                      competitors={VENDORS}
                      visibleCompetitors={visibleVendors}
                      onToggle={toggleVendor}
                    />
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <LineChart key={`${activeTab}-${tro}-${Array.from(visibleVendors).sort().join('-')}`} data={getChartData()} margin={CHART_CONFIG.margin}>
                        <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                        <XAxis
                          dataKey="month"
                          {...CHART_CONFIG.xAxis}
                          tickFormatter={formatMonth}
                          interval={0}
                        />
                        <YAxis
                          {...CHART_CONFIG.yAxis}
                          domain={activeTab === 'backlinks' ? [0, yMax(blChartData)] : [0, yMax(rdChartData)]}
                          tickFormatter={v => formatNumber(v)}
                        />
                        <Tooltip content={(props: any) => <CustomTooltip {...props} isBacklinks={activeTab === 'backlinks'} />} />
                        {VENDORS.filter(v => visibleVendors.has(v.id)).map(vendor => (
                          <Line
                            key={`${activeTab}-${vendor.id}`}
                            name={vendor.name}
                            type="monotone"
                            dataKey={vendor.id}
                            stroke={vendor.color}
                            {...CHART_CONFIG.line}
                            dot={{ fill: vendor.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
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
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit Backlink Data (Oct 2025 – Mar 2026)</h3>
            <div className="space-y-6">
              {VENDORS.map(vendor => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {(['referringDomains', 'backlinks'] as TabType[]).map(ds => (
                      <div key={ds}>
                        <div className="text-xs font-semibold text-gray-700 mb-2">
                          {ds === 'referringDomains' ? 'Referring Domains' : 'Backlinks'}:
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

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
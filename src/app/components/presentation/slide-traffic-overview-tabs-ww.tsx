import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber } from '@/app/utils/format';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  InsightCard,
  InsightsSection,
  EditButton,
  CompetitorFilter,
  CustomChartTooltip,
  CHART_CONFIG,
  TimeRangeFilter,
  TimeRange,
} from './design-system';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ─────────────────────────────────────────────────────────────
// Competitors  (Splashtop-focused competitive set)
// ─────────────────────────────────────────────────────────────
const WW_COMPETITORS = [
  { id: 'splashtop',   name: 'Splashtop',         color: '#3B82F6' },
  { id: 'teamviewer',  name: 'TeamViewer',         color: '#FF7AB6' },
  { id: 'anydesk',     name: 'AnyDesk',            color: '#7ED957' },
  { id: 'beyondtrust', name: 'BeyondTrust',        color: '#FFB14A' },
  { id: 'gotomypc',    name: 'GoTo (MyPC)',        color: '#EF4444' },
];

// ─────────────────────────────────────────────────────────────
// Months  Oct 2025 → Mar 2026  (6 data points)
// ─────────────────────────────────────────────────────────────
const WW_MONTHS = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];

const formatMonth = (month: string) => {
  const [year, m] = month.split('-');
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${names[parseInt(m) - 1]} ${year}`;
};

// Time-range offset: '3m' → Jan–Mar 2026, otherwise full 6-month window
const getWWOffset = (range: TimeRange): number => (range === '3m' ? 3 : 0);

// ─────────────────────────────────────────────────────────────
// Data  (values in thousands, i.e. 142 = 142 000)
// ─────────────────────────────────────────────────────────────
const ORGANIC_TRAFFIC_WW: Record<string, number[]> = {
  splashtop:   [142000, 130000, 137000, 142000, 151000, 159000],
  teamviewer:  [500000, 478000, 522000, 551000, 504000, 523000],
  anydesk:     [416000, 407000, 418000, 427000, 426000, 441000],
  beyondtrust: [ 58000,  55000,  52000,  46000,  47000,  39000],
  gotomypc:    [ 48000,  47000,  65000,  64000,  64000,  65000],
};

const BRANDED_TRAFFIC_WW: Record<string, number[]> = {
  splashtop:   [103000,  82000,  93000,  93000,  94000,  90000],
  teamviewer:  [444000, 360000, 411000, 431000, 425000, 425000],
  anydesk:     [395000, 359000, 388000, 403000, 403000, 413000],
  beyondtrust: [ 17000,  19000,  16000,  14000,  16000,   8000],
  gotomypc:    [ 43000,  43000,  60000,  60000,  61000,  61000],
};

const NON_BRANDED_TRAFFIC_WW: Record<string, number[]> = {
  splashtop:   [ 39000,  48000,  45000,  49000,  57000,  69000],
  teamviewer:  [ 56000, 118000, 111000, 120000,  79000,  98000],
  anydesk:     [ 21000,  48000,  30000,  24000,  23000,  28000],
  beyondtrust: [ 41000,  36000,  35000,  31000,  31000,  31000],
  gotomypc:    [  5000,   4000,   4000,   4000,   3000,   4000],
};

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type TabType = 'overall' | 'branded' | 'non-branded';

interface EditableData {
  branded:    number[];
  nonBranded: number[];
}

interface SlideTrafficOverviewTabsWWProps {
  onNavigateHome?: () => void;
}

export function SlideTrafficOverviewTabsWW({ onNavigateHome }: SlideTrafficOverviewTabsWWProps) {
  const [activeTab,          setActiveTab]          = useState<TabType>('overall');
  const [timeRange,          setTimeRange]          = useState<TimeRange>('all');
  const [visibleCompetitors, setVisibleCompetitors] = useState<Set<string>>(
    new Set(WW_COMPETITORS.map((c) => c.id))
  );

  const [editableTraffic, setEditableTraffic] = useState<Record<string, number[]>>(() => {
    const init: Record<string, number[]> = {};
    WW_COMPETITORS.forEach((c) => { init[c.id] = [...ORGANIC_TRAFFIC_WW[c.id]]; });
    return init;
  });

  const [editableBrandedData, setEditableBrandedData] = useState<Record<string, EditableData>>(() => {
    const init: Record<string, EditableData> = {};
    WW_COMPETITORS.forEach((c) => {
      init[c.id] = {
        branded:    [...BRANDED_TRAFFIC_WW[c.id]],
        nonBranded: [...NON_BRANDED_TRAFFIC_WW[c.id]],
      };
    });
    return init;
  });

  const [isEditing, setIsEditing] = useState(false);

  const toggleCompetitor = (id: string) => {
    setVisibleCompetitors((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const handleEdit   = () => setIsEditing(true);
  const handleSave   = () => setIsEditing(false);
  const handleCancel = () => {
    const rt: Record<string, number[]> = {};
    WW_COMPETITORS.forEach((c) => { rt[c.id] = [...ORGANIC_TRAFFIC_WW[c.id]]; });
    setEditableTraffic(rt);

    const rb: Record<string, EditableData> = {};
    WW_COMPETITORS.forEach((c) => {
      rb[c.id] = {
        branded:    [...BRANDED_TRAFFIC_WW[c.id]],
        nonBranded: [...NON_BRANDED_TRAFFIC_WW[c.id]],
      };
    });
    setEditableBrandedData(rb);
    setIsEditing(false);
  };

  const handleValueChange = (id: string, idx: number, val: string) => {
    const n = parseFloat(val);
    if (isNaN(n)) return;
    setEditableTraffic((prev) => ({
      ...prev,
      [id]: prev[id].map((v, i) => (i === idx ? n : v)),
    }));
  };

  const handleBrandedValueChange = (
    id: string,
    type: 'branded' | 'nonBranded',
    idx: number,
    val: string
  ) => {
    const n = parseFloat(val);
    if (isNaN(n)) return;
    setEditableBrandedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: prev[id][type].map((v, i) => (i === idx ? n : v)),
      },
    }));
  };

  // ── Chart data ──
  const tro = getWWOffset(timeRange);
  const months = WW_MONTHS.slice(tro);

  const overallChartData = months.map((label, i) => {
    const pt: any = { month: label };
    WW_COMPETITORS.forEach((c) => {
      if (visibleCompetitors.has(c.id)) pt[c.id] = editableTraffic[c.id][i + tro];
    });
    return pt;
  });

  const brandedChartData = months.map((label, i) => {
    const pt: any = { month: label };
    WW_COMPETITORS.forEach((c) => {
      if (visibleCompetitors.has(c.id)) pt[c.id] = editableBrandedData[c.id].branded[i + tro];
    });
    return pt;
  });

  const nonBrandedChartData = months.map((label, i) => {
    const pt: any = { month: label };
    WW_COMPETITORS.forEach((c) => {
      if (visibleCompetitors.has(c.id)) pt[c.id] = editableBrandedData[c.id].nonBranded[i + tro];
    });
    return pt;
  });

  const getChartData = () => {
    if (activeTab === 'overall')     return overallChartData;
    if (activeTab === 'branded')     return brandedChartData;
    return nonBrandedChartData;
  };

  const getYAxisDomain = (): [number, number] => {
    let max = 0;
    const data = getChartData();
    data.forEach((pt) => {
      WW_COMPETITORS.forEach((c) => {
        if (visibleCompetitors.has(c.id) && pt[c.id] != null) {
          max = Math.max(max, pt[c.id]);
        }
      });
    });
    return [0, max > 0 ? Math.ceil(max * 1.1) : 100000];
  };

  // ── Tabs ──
  const tabs = [
    { id: 'overall'     as TabType, label: 'Overall Traffic'  },
    { id: 'branded'     as TabType, label: 'Branded'          },
    { id: 'non-branded' as TabType, label: 'Non-Branded'      },
  ];

  // ── Insights ──
  const getInsights = () => {
    if (activeTab === 'overall') {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Splashtop"
            content={<>From Oct 2025 to Mar 2026, organic traffic grew <strong>142K → 159K (+12.0%)</strong>, steady and sustained growth.</>}
          />
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Competitions"
            content={<>TeamViewer grew <strong>500K → 523K (+4.6%)</strong> and AnyDesk increased <strong>416K → 441K (+6.0%)</strong>, moderate gains.</>}
          />
        </InsightsSection>
      );
    } else if (activeTab === 'branded') {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingDown}
            type="error"
            title="Splashtop"
            content={<>From Oct 2025 to Mar 2026, branded traffic shifted <strong>103K → 90K (−12.6%)</strong>, while overall grew.</>}
          />
          <InsightCard
            icon={TrendingDown}
            type="error"
            title="Competitions"
            content={<>TeamViewer declined <strong>444K → 425K (−4.3%)</strong>; AnyDesk increased <strong>395K → 413K (+4.6%)</strong>.</>}
          />
        </InsightsSection>
      );
    } else {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Splashtop"
            content={<>From Oct 2025 to Mar 2026, non-branded traffic surged <strong>39K → 69K (+76.9%)</strong>, strongest discovery gain.</>}
          />
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Competitions"
            content={<>TeamViewer grew <strong>56K → 98K (+75%)</strong>; AnyDesk increased <strong>21K → 28K (+33.3%)</strong> in Mar 2026.</>}
          />
        </InsightsSection>
      );
    }
  };

  // ── Performance Summary ──
  const getPerformanceSummary = () => {
    const latestIdx = WW_MONTHS.length - 1; // Mar 2026
    let dataSource: Record<string, number[]>;

    if (activeTab === 'overall') {
      dataSource = editableTraffic;
    } else if (activeTab === 'branded') {
      dataSource = {};
      WW_COMPETITORS.forEach((c) => { dataSource[c.id] = editableBrandedData[c.id].branded; });
    } else {
      dataSource = {};
      WW_COMPETITORS.forEach((c) => { dataSource[c.id] = editableBrandedData[c.id].nonBranded; });
    }

    const rankings = WW_COMPETITORS.map((c) => ({
      id:    c.id,
      name:  c.name,
      value: dataSource[c.id]?.[latestIdx] ?? 0,
    })).sort((a, b) => b.value - a.value);

    const splashtopRank = rankings.find((r) => r.id === 'splashtop');
    if (!splashtopRank) return null;

    const splashtopPos = rankings.findIndex((r) => r.id === 'splashtop') + 1;
    const isLeader     = splashtopPos === 1;
    const secondPlace  = rankings[1];
    const firstPlace   = rankings[0];
    const fmt          = (v: number) => formatNumber(v);
    const ordinal      = (n: number) => n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;

    if (isLeader) {
      const gap        = splashtopRank.value - secondPlace.value;
      const gapPct     = ((gap / splashtopRank.value) * 100).toFixed(1);
      return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-green-900">Top Performer - <span className="font-bold">Splashtop</span></span>
              <span className="text-sm text-green-900 font-semibold">{fmt(splashtopRank.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-green-800">2nd position - {secondPlace.name}</span>
              <span className="text-sm text-green-800 font-semibold">{fmt(secondPlace.value)}</span>
            </div>
            <div>
              <span className="text-sm text-green-900"><span className="font-semibold">Lead:</span> +{fmt(gap)} ({gapPct}% ahead)</span>
            </div>
          </div>
        </div>
      );
    } else {
      const gap    = firstPlace.value - splashtopRank.value;
      const gapPct = ((gap / firstPlace.value) * 100).toFixed(1);
      return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 rounded-xl p-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-orange-900">Top Performer - <span className="font-bold">{firstPlace.name}</span></span>
              <span className="text-sm text-orange-900 font-semibold">{fmt(firstPlace.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-orange-800">{ordinal(splashtopPos)} position - Splashtop</span>
              <span className="text-sm text-orange-800 font-semibold">{fmt(splashtopRank.value)}</span>
            </div>
            <div>
              <span className="text-sm text-orange-900"><span className="font-semibold">Gap to #1:</span> {fmt(gap)} ({gapPct}% behind)</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const visibleList = WW_COMPETITORS.filter((c) => visibleCompetitors.has(c.id));
  const editMonths  = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <SlideContainer slideNumber={3} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="Organic Traffic Overview"
        subtitle="(Oct 2025 - Mar 2026) · Worldwide"
      />

      {/* Tabs + time filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-start gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-10 py-3.5 text-sm font-semibold transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'bg-white text-red-600 z-10'
                  : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
              }`}
              style={{
                borderRadius: '12px 12px 0 0',
                marginBottom: '-2px',
                boxShadow:
                  activeTab === tab.id
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

      <div className="flex-1 grid grid-cols-12 gap-6">
        {/* Chart – 8 cols */}
        <div className="col-span-8 flex flex-col gap-4">
          <ChartContainer
            title=""
            actions={
              <EditButton
                isEditing={isEditing}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            }
            height={400}
          >
            {!isEditing ? (
              <div className="h-full flex flex-col">
                <div className="pb-4 border-b border-gray-200 mb-4">
                  <CompetitorFilter
                    competitors={WW_COMPETITORS}
                    visibleCompetitors={visibleCompetitors}
                    onToggle={toggleCompetitor}
                  />
                </div>
                <div className="flex-1">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart
                      key={`ww-${activeTab}-${Array.from(visibleCompetitors).sort().join('-')}`}
                      id={`ww-linechart-${activeTab}`}
                      data={getChartData()}
                      margin={CHART_CONFIG.margin}
                    >
                      <CartesianGrid id={`ww-grid-${activeTab}`} {...CHART_CONFIG.cartesianGrid} />
                      <XAxis
                        id={`ww-xaxis-${activeTab}`}
                        dataKey="month"
                        {...CHART_CONFIG.xAxis}
                        interval={0}
                        tickFormatter={formatMonth}
                      />
                      <YAxis
                        id={`ww-yaxis-${activeTab}`}
                        {...CHART_CONFIG.yAxis}
                        tickFormatter={(v) => formatNumber(v)}
                        domain={getYAxisDomain()}
                      />
                      <Tooltip
                        id={`ww-tooltip-${activeTab}`}
                        content={(props) => (
                          <CustomChartTooltip
                            {...props}
                            formatter={formatNumber}
                            monthFormatter={formatMonth}
                          />
                        )}
                      />
                      {visibleList.map((c) => (
                        <Line
                          key={`ww-${c.id}-${activeTab}`}
                          type="monotone"
                          dataKey={c.id}
                          name={c.name}
                          stroke={c.color}
                          {...CHART_CONFIG.line}
                          dot={{ fill: c.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 7, strokeWidth: 2 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              /* Edit mode */
              <div className="h-full overflow-auto">
                <div className="space-y-4">
                  {WW_COMPETITORS.map((c) => (
                    <div key={c.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                        <h4 className="text-sm font-semibold text-gray-900">{c.name}</h4>
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        {editMonths.map((m, idx) => (
                          <div key={m}>
                            <label className="text-xs text-gray-600 font-medium mb-1 block">{m}:</label>
                            <input
                              type="number"
                              value={
                                activeTab === 'overall'
                                  ? editableTraffic[c.id][idx]
                                  : activeTab === 'branded'
                                  ? editableBrandedData[c.id].branded[idx]
                                  : editableBrandedData[c.id].nonBranded[idx]
                              }
                              onChange={(e) => {
                                if (activeTab === 'overall') {
                                  handleValueChange(c.id, idx, e.target.value);
                                } else {
                                  handleBrandedValueChange(
                                    c.id,
                                    activeTab === 'branded' ? 'branded' : 'nonBranded',
                                    idx,
                                    e.target.value
                                  );
                                }
                              }}
                              className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ChartContainer>
        </div>

        {/* Insights – 4 cols */}
        <div className="col-span-4 flex flex-col gap-4">
          {getInsights()}
          {getPerformanceSummary()}
        </div>
      </div>

      <SlideFooter source="Source: Semrush · Country: WW" />
    </SlideContainer>
  );
}
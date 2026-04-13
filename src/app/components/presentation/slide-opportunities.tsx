import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Target, Award, Trophy } from 'lucide-react';
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

// ─── Competitive set ────────────────────────────────────────────────────────
const OPPS_COMPETITORS = [
  { id: 'splashtop',   name: 'Splashtop',    color: '#3B82F6' },
  { id: 'teamviewer',  name: 'TeamViewer',   color: '#FF7AB6' },
  { id: 'anydesk',     name: 'AnyDesk',      color: '#7ED957' },
  { id: 'beyondtrust', name: 'BeyondTrust',  color: '#FFB14A' },
  { id: 'gotomypc',    name: 'GoTo (MyPC)',  color: '#EF4444' },
];

// ─── Months: Oct 2025 → Mar 2026 (6 data-points) ───────────────────────────
const OPPS_MONTHS = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];

const formatMonth = (month: string) => {
  const [year, m] = month.split('-');
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${names[parseInt(m) - 1]} ${year}`;
};

// Time-range offset: '3m' → Jan–Mar 2026 (skip first 3), otherwise full 6
const getOppsOffset = (range: TimeRange): number => (range === '3m' ? 3 : 0);

// ─── Organic Keywords (total, Oct 2025 – Mar 2026) ──────────────────────────
const ORGANIC_KEYWORDS_OPPS: Record<string, number[]> = {
  splashtop:   [58000, 58000, 59000, 64000, 68000, 59000],
  teamviewer:  [79000, 78000, 81000, 86000, 89000, 87000],
  anydesk:     [97000, 87000, 82000, 89000, 83000, 64000],
  beyondtrust: [42000, 39000, 29000, 29000, 31000, 28000],
  gotomypc:    [14000, 13000, 12000, 13000, 12000,  8000],
};

// ─── Page-1 Keywords (Oct 2025 – Mar 2026) ──────────────────────────────────
const PAGE_ONE_KEYWORDS_OPPS: Record<string, number[]> = {
  splashtop:   [6000, 6000, 7000, 8000, 8000, 9000],
  teamviewer:  [11000, 11000, 11000, 11000, 11000, 12000],
  anydesk:     [6000, 6000, 6000, 7000, 7000, 6000],
  beyondtrust: [3000, 3000, 3000, 3000, 3000, 3000],
  gotomypc:    [1000, 1000, 1000, 1000, 1000, 1000],
};

type TabType = 'organic' | 'page-one';

interface SlideOpportunitiesProps {
  onNavigateHome?: () => void;
}

export function SlideOpportunities({ onNavigateHome }: SlideOpportunitiesProps) {
  const [activeTab, setActiveTab] = useState<TabType>('organic');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [visibleCompetitors, setVisibleCompetitors] = useState<Set<string>>(
    new Set(OPPS_COMPETITORS.map((c) => c.id))
  );

  const [editableOrganic, setEditableOrganic] = useState<Record<string, number[]>>(() => {
    const init: Record<string, number[]> = {};
    OPPS_COMPETITORS.forEach((c) => { init[c.id] = [...ORGANIC_KEYWORDS_OPPS[c.id]]; });
    return init;
  });

  const [editablePageOne, setEditablePageOne] = useState<Record<string, number[]>>(() => {
    const init: Record<string, number[]> = {};
    OPPS_COMPETITORS.forEach((c) => { init[c.id] = [...PAGE_ONE_KEYWORDS_OPPS[c.id]]; });
    return init;
  });

  const [isEditingOrganic, setIsEditingOrganic] = useState(false);
  const [isEditingPageOne, setIsEditingPageOne] = useState(false);

  const toggleCompetitor = (id: string) => {
    setVisibleCompetitors((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const handleEditOrganic   = () => setIsEditingOrganic(true);
  const handleSaveOrganic   = () => setIsEditingOrganic(false);
  const handleCancelOrganic = () => {
    const r: Record<string, number[]> = {};
    OPPS_COMPETITORS.forEach((c) => { r[c.id] = [...ORGANIC_KEYWORDS_OPPS[c.id]]; });
    setEditableOrganic(r);
    setIsEditingOrganic(false);
  };

  const handleEditPageOne   = () => setIsEditingPageOne(true);
  const handleSavePageOne   = () => setIsEditingPageOne(false);
  const handleCancelPageOne = () => {
    const r: Record<string, number[]> = {};
    OPPS_COMPETITORS.forEach((c) => { r[c.id] = [...PAGE_ONE_KEYWORDS_OPPS[c.id]]; });
    setEditablePageOne(r);
    setIsEditingPageOne(false);
  };

  const handleOrganicValueChange = (id: string, idx: number, val: string) => {
    const n = parseFloat(val);
    if (isNaN(n)) return;
    setEditableOrganic((prev) => ({
      ...prev,
      [id]: prev[id].map((v, i) => (i === idx ? n : v)),
    }));
  };

  const handlePageOneValueChange = (id: string, idx: number, val: string) => {
    const n = parseFloat(val);
    if (isNaN(n)) return;
    setEditablePageOne((prev) => ({
      ...prev,
      [id]: prev[id].map((v, i) => (i === idx ? n : v)),
    }));
  };

  // ── Chart data ──────────────────────────────────────────────────────────────
  const tro = getOppsOffset(timeRange);
  const months = OPPS_MONTHS.slice(tro);

  const organicChartData = months.map((label, i) => {
    const pt: any = { month: label };
    OPPS_COMPETITORS.forEach((c) => {
      if (visibleCompetitors.has(c.id)) pt[c.id] = editableOrganic[c.id][i + tro];
    });
    return pt;
  });

  const pageOneChartData = months.map((label, i) => {
    const pt: any = { month: label };
    OPPS_COMPETITORS.forEach((c) => {
      if (visibleCompetitors.has(c.id)) pt[c.id] = editablePageOne[c.id][i + tro];
    });
    return pt;
  });

  const getChartData    = () => activeTab === 'organic' ? organicChartData : pageOneChartData;
  const getIsEditing    = () => activeTab === 'organic' ? isEditingOrganic : isEditingPageOne;
  const getEditableData = () => activeTab === 'organic' ? editableOrganic  : editablePageOne;
  const getHandleValueChange = () =>
    activeTab === 'organic' ? handleOrganicValueChange : handlePageOneValueChange;

  const getYAxisDomain = (): [number, number] => {
    const data = getEditableData();
    let max = 0;
    OPPS_COMPETITORS.forEach((c) => {
      if (visibleCompetitors.has(c.id)) {
        data[c.id].forEach((v) => { if (v > max) max = v; });
      }
    });
    return [0, max > 0 ? Math.ceil(max * 1.1) : 1000];
  };

  const getEditActions = () =>
    activeTab === 'organic'
      ? { isEditing: isEditingOrganic,  onEdit: handleEditOrganic,  onSave: handleSaveOrganic,  onCancel: handleCancelOrganic  }
      : { isEditing: isEditingPageOne,  onEdit: handleEditPageOne,  onSave: handleSavePageOne,  onCancel: handleCancelPageOne  };

  const tabs = [
    { id: 'organic'  as TabType, label: 'Total Organic Keywords' },
    { id: 'page-one' as TabType, label: 'Page 1 Keywords' },
  ];

  // ── Chart render ────────────────────────────────────────────────────────────
  const renderChart = () => {
    const isEditing = getIsEditing();
    const editableData = getEditableData();
    const handleValueChange = getHandleValueChange();

    if (isEditing) {
      const editMonths = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
      return (
        <div className="h-full overflow-auto p-2">
          <div className="space-y-3">
            {OPPS_COMPETITORS.map((c) => (
              <div key={c.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <h4 className="text-sm font-semibold text-gray-900">{c.name}</h4>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {editMonths.map((m, idx) => (
                    <div key={m}>
                      <label className="text-xs text-gray-600 font-medium mb-1 block">{m}:</label>
                      <input
                        type="number"
                        value={editableData[c.id][idx] ?? ''}
                        onChange={(e) => handleValueChange(c.id, idx, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart key={`${activeTab}-${tro}-${Array.from(visibleCompetitors).sort().join('-')}`} data={getChartData()} margin={CHART_CONFIG.margin}>
          <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
          <XAxis dataKey="month" {...CHART_CONFIG.xAxis} tickFormatter={formatMonth} interval={0} />
          <YAxis
            {...CHART_CONFIG.yAxis}
            tickFormatter={(v) => formatNumber(v)}
            domain={getYAxisDomain()}
          />
          <Tooltip
            content={(props) => (
              <CustomChartTooltip {...props} formatter={formatNumber} monthFormatter={formatMonth} />
            )}
          />
          {OPPS_COMPETITORS.filter((c) => visibleCompetitors.has(c.id)).map((c) => (
            <Line
              key={`${c.id}-${activeTab}`}
              name={c.name}
              type="monotone"
              dataKey={c.id}
              stroke={c.color}
              {...CHART_CONFIG.line}
              dot={{ fill: c.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // ── Insights ─────────────────────────────────────────────────────────────────
  const getInsights = () => {
    if (activeTab === 'organic') {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Splashtop"
            content={<>From Oct 2025 to Mar 2026, keywords grew <strong>~58K → ~59K (+1.7%)</strong>, peaking at <strong>68K</strong> in Feb.</>}
          />
          <InsightCard
            icon={TrendingDown}
            type="error"
            title="Competitions"
            content={<>TeamViewer grew <strong>79K → 87K (+10.1%)</strong>, while AnyDesk declined significantly <strong>97K → 64K (−34.0%)</strong>.</>}
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
            content={<>From Oct 2025 to Mar 2026, page-1 rankings grew <strong>~6K → ~9K (+50%)</strong>, strong improvement in top SERP visibility.</>}
          />
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Competitions"
            content={<>TeamViewer increased <strong>11K → 12K (+9.1%)</strong>, while AnyDesk remained relatively stable at <strong>6K (0%)</strong>.</>}
          />
        </InsightsSection>
      );
    }
  };

  // ── Performance Summary ───────────────────────────────────────────────────────
  const getPerformanceSummary = () => {
    const latestIdx = OPPS_MONTHS.length - 1; // Mar 2026
    const dataSource = activeTab === 'organic' ? editableOrganic : editablePageOne;
    const fmt = (v: number) => formatNumber(v);
    const ordinal = (n: number) => n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;

    const rankings = OPPS_COMPETITORS.map((c) => ({
      id: c.id,
      name: c.name,
      value: dataSource[c.id]?.[latestIdx] ?? 0,
    })).sort((a, b) => b.value - a.value);

    const splashtopRank = rankings.find((r) => r.id === 'splashtop');
    if (!splashtopRank) return null;

    const splashtopPos = rankings.findIndex((r) => r.id === 'splashtop') + 1;
    const isLeader    = splashtopPos === 1;
    const secondPlace = rankings[1];
    const firstPlace  = rankings[0];

    if (isLeader) {
      const gap     = splashtopRank.value - secondPlace.value;
      const gapPct  = ((gap / splashtopRank.value) * 100).toFixed(1);
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
            <div className="flex justify-between">
              <span className="text-sm text-green-900"><span className="font-semibold">Lead:</span></span>
              <span className="text-sm text-green-900 font-semibold">+{fmt(gap)} ({gapPct}% ahead)</span>
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
            <div className="flex justify-between">
              <span className="text-sm text-orange-900"><span className="font-semibold">Gap to #1:</span></span>
              <span className="text-sm text-orange-900 font-semibold">{fmt(gap)} ({gapPct}% behind)</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <SlideContainer slideNumber={5} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="Keyword Performance"
        subtitle="(Oct 2025 - Mar 2026)"
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

      <div className="flex-1 grid grid-cols-12 gap-6">
        {/* Chart – 8 cols */}
        <div className="col-span-8 flex flex-col gap-4">
          <ChartContainer
            title=""
            actions={<EditButton {...getEditActions()} />}
            height={400}
          >
            <div className="h-full flex flex-col">
              <div className="pb-4 border-b border-gray-200 mb-4">
                <CompetitorFilter
                  competitors={OPPS_COMPETITORS}
                  visibleCompetitors={visibleCompetitors}
                  onToggle={toggleCompetitor}
                />
              </div>
              <div className="flex-1">
                {renderChart()}
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Insights – 4 cols */}
        <div className="col-span-4 flex flex-col gap-4">
          {getInsights()}
          {getPerformanceSummary()}
        </div>
      </div>

      <SlideFooter source="Source: Semrush" />
    </SlideContainer>
  );
}
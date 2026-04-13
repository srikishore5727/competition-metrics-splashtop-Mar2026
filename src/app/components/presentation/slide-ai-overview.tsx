import { useState } from 'react';
import { Sparkles, BarChart3, TrendingUp, TrendingDown, AlertTriangle, Trophy, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatNumber } from '@/app/utils/format';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  InsightCard,
  InsightsSection,
  CompetitorFilter,
  CHART_CONFIG,
  TimeRangeFilter,
  TimeRange,
  getTimeRangeOffset,
} from './design-system';

const VENDORS = [
  { id: 'fortinet', name: 'Fortinet', color: '#EF4444' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'crowdstrike', name: 'Crowdstrike', color: '#1F2937' },
  { id: 'cato', name: 'Cato Networks', color: '#A78BFA' },
  { id: 'sentinelone', name: 'SentinelOne', color: '#06B6D4' },
];

// AIO Keywords — Jul 2025 → Feb 2026 (Source: SEMrush)
const AIO_KEYWORDS_DATA_INITIAL = {
  fortinet:    [10829, 12194, 12482, 12365, 11938, 13887, 16395, 16503],
  cisco:       [13691, 14468, 14574, 14365, 13811, 15752, 17923, 18245],
  hpe:         [2702,  2774,  2844,  2784,  3257,  5159,  6049,  5872],
  paloalto:    [4322,  4274,  4466,  4506,  4653,  6092,  7536,  7897],
  checkpoint:  [2409,  2213,  2161,  2132,  2013,  1878,  1762,  1573],
  crowdstrike: [4247,  4729,  5123,  5051,  4623,  4456,  4992,  5279],
  cato:        [231,   301,   277,   270,   231,   263,   296,   315],
  sentinelone: [3268,  3155,  3209,  3274,  3411,  4247,  4936,  5516],
};

// AIO Traffic — Jul 2025 → Feb 2026 (Source: SEMrush)
const AIO_TRAFFIC_DATA_INITIAL = {
  fortinet:    [31927,  97533,  83220,  89387,  111533, 269736, 190645, 207640],
  cisco:       [37628,  103811, 110409, 105848, 221685, 192321, 96999,  260919],
  hpe:         [4553,   20403,  17052,  15630,  29985,  62162,  34054,  42252],
  paloalto:    [6363,   20685,  59321,  114814, 40224,  66468,  49190,  50299],
  checkpoint:  [3645,   9501,   9504,   10203,  10252,  10514,  6144,   8835],
  crowdstrike: [70372,  42889,  33742,  44539,  169073, 54807,  33199,  177583],
  cato:        [140,    1154,   1198,   1157,   1406,   1342,   993,    1490],
  sentinelone: [5430,   10839,  15126,  13414,  16130,  22651,  19999,  91883],
};

const MONTHS = ['Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026'];

// Helper function to format month keys for display
const formatMonth = (monthKey: string) => {
  const monthMap: { [key: string]: string } = {
    '2025-07': 'Jul 2025',
    '2025-08': 'Aug 2025',
    '2025-09': 'Sep 2025',
    '2025-10': 'Oct 2025',
    '2025-11': 'Nov 2025',
    '2025-12': 'Dec 2025',
    '2026-01': 'Jan 2026',
    '2026-02': 'Feb 2026',
  };
  return monthMap[monthKey] || monthKey;
};

const MONTH_KEYS = ['2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02'];

type TabType = 'keywords' | 'traffic';

const CustomTooltip = ({ active, payload, label, isTraffic }: any) => {
  if (!active || !payload || !payload.length) return null;
  const validPayload = payload.filter((entry: any) => entry.value !== null && entry.value !== undefined);
  if (!validPayload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-900 mb-2">{formatMonth(label)}</p>
      {validPayload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">
            {isTraffic ? formatNumber(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SlideAIOverview({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('keywords');
  const [isEditing, setIsEditing] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [editedData, setEditedData] = useState({
    keywords: JSON.parse(JSON.stringify(AIO_KEYWORDS_DATA_INITIAL)),
    traffic: JSON.parse(JSON.stringify(AIO_TRAFFIC_DATA_INITIAL)),
  });

  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(VENDORS.map((v) => v.id))
  );

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      keywords: JSON.parse(JSON.stringify(AIO_KEYWORDS_DATA_INITIAL)),
      traffic: JSON.parse(JSON.stringify(AIO_TRAFFIC_DATA_INITIAL)),
    });
    setIsEditing(false);
  };

  const handleValueChange = (
    dataset: 'keywords' | 'traffic',
    vendorId: string,
    index: number,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    setEditedData((prev) => ({
      ...prev,
      [dataset]: {
        ...prev[dataset],
        [vendorId]: prev[dataset][vendorId].map((v, i) => (i === index ? numValue : v)),
      },
    }));
  };

  const toggleVendor = (vendorId: string) => {
    setVisibleVendors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(vendorId)) newSet.delete(vendorId);
      else newSet.add(vendorId);
      return newSet;
    });
  };

  const tro = getTimeRangeOffset(timeRange);
  const keywordsChartData = MONTH_KEYS.slice(tro).map((monthKey, i) => {
    const dataPoint: any = { month: monthKey };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.id] = editedData.keywords[vendor.id][i + tro];
      }
    });
    return dataPoint;
  });

  const trafficChartData = MONTH_KEYS.slice(tro).map((monthKey, i) => {
    const dataPoint: any = { month: monthKey };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.id] = editedData.traffic[vendor.id][i + tro];
      }
    });
    return dataPoint;
  });

  const getTrafficYMax = () => {
    let max = 0;
    trafficChartData.forEach((point) => {
      VENDORS.forEach((vendor) => {
        if (visibleVendors.has(vendor.id) && point[vendor.id] != null) {
          max = Math.max(max, point[vendor.id]);
        }
      });
    });
    return Math.ceil(max * 1.15);
  };

  const fortinetKeywords = editedData.keywords.fortinet;
  const fortinetKwGrowth = ((fortinetKeywords[3] - fortinetKeywords[0]) / fortinetKeywords[0] * 100).toFixed(0);

  const tabs = [
    { id: 'keywords' as TabType, label: 'AI Overview Keywords' },
    { id: 'traffic' as TabType, label: 'AI Overview Traffic' },
  ];

  const getInsights = () => {
    if (activeTab === 'keywords') {
      return (
        <InsightsSection>
          <InsightCard
            icon={Sparkles}
            type="success"
            title="Fortinet"
            content={<>From Jul 2025 to Feb 2026, AIO keywords grew <strong>10.8K → 16.5K</strong>, showing strong expansion in AI search coverage.</>}
          />
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Competitions"
            content={<>From Jul 2025 to Feb 2026, Cisco maintained leadership <strong>13.7K → 18.2K</strong>, while Palo Alto also grew <strong>4.3K → 7.9K</strong>.</>}
          />
        </InsightsSection>
      );
    } else {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Fortinet"
            content={<>From Jul 2025 to Feb 2026, AIO traffic surged <strong>31.9K → 207.6K</strong>, peaking at <strong>269K</strong> in Dec 2025.</>}
          />
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Competitions"
            content={<>From Jul 2025 to Feb 2026, Cisco traffic grew <strong>37.6K → 260.9K</strong>, while CrowdStrike also surged <strong>70K → 177.6K</strong>.</>}
          />
        </InsightsSection>
      );
    }
  };

  const getPerformanceSummary = () => {
    const latestIndex = 7; // Feb 2026
    const dataSource = activeTab === 'keywords' ? editedData.keywords : editedData.traffic;
    const formatValue = (val: number) => formatNumber(val);
    const ordinal = (n: number) => n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;

    const rankings = VENDORS.map((v) => ({
      id: v.id,
      name: v.name,
      value: dataSource[v.id]?.[latestIndex] ?? 0,
    })).sort((a, b) => b.value - a.value);

    const fortinetRanking = rankings.find((r) => r.id === 'fortinet');
    if (!fortinetRanking) return null;

    const fortinetPosition = rankings.findIndex((r) => r.id === 'fortinet') + 1;
    const isLeader = fortinetPosition === 1;
    const secondPlace = rankings[1];
    const firstPlace = rankings[0];

    if (isLeader) {
      const gap = fortinetRanking.value - secondPlace.value;
      const gapPercent = ((gap / fortinetRanking.value) * 100).toFixed(1);
      return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-green-900">Top Performer - <span className="font-bold">Fortinet</span></span>
              <span className="text-sm text-green-900 font-semibold">{formatValue(fortinetRanking.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-green-800">2nd position - {secondPlace.name}</span>
              <span className="text-sm text-green-800 font-semibold">{formatValue(secondPlace.value)}</span>
            </div>
            <div>
              <span className="text-sm text-green-900"><span className="font-semibold">Lead:</span> +{formatValue(gap)} ({gapPercent}% ahead)</span>
            </div>
          </div>
        </div>
      );
    } else {
      const gap = firstPlace.value - fortinetRanking.value;
      const gapPercent = ((gap / firstPlace.value) * 100).toFixed(1);
      return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 rounded-xl p-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-orange-900">Top Performer - <span className="font-bold">{firstPlace.name}</span></span>
              <span className="text-sm text-orange-900 font-semibold">{formatValue(firstPlace.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-orange-800">{ordinal(fortinetPosition)} position - Fortinet</span>
              <span className="text-sm text-orange-800 font-semibold">{formatValue(fortinetRanking.value)}</span>
            </div>
            <div>
              <span className="text-sm text-orange-900"><span className="font-semibold">Gap to #1:</span> {formatValue(gap)} ({gapPercent}% behind)</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderChart = () => {
    const vendorKey = Array.from(visibleVendors).sort().join('-');

    if (activeTab === 'traffic') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart key={`traffic-${vendorKey}`} data={trafficChartData} margin={CHART_CONFIG.margin}>
            <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
            <XAxis
              dataKey="month"
              {...CHART_CONFIG.xAxis}
              tickFormatter={formatMonth}
              interval={0}
            />
            <YAxis domain={[0, getTrafficYMax()]} {...CHART_CONFIG.yAxis} tickFormatter={(value) => formatNumber(value)} />
            <Tooltip content={(props) => <CustomTooltip {...props} isTraffic={true} />} />
            {VENDORS.filter(v => visibleVendors.has(v.id)).map((vendor) => (
              <Line
                key={`traffic-${vendor.id}`}
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
      );
    }

    // Bar chart for keywords
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart key={`keywords-${vendorKey}`} data={keywordsChartData} margin={CHART_CONFIG.margin}>
          <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
          <XAxis
            dataKey="month"
            {...CHART_CONFIG.xAxis}
            tickFormatter={formatMonth}
            interval={0}
          />
          <YAxis {...CHART_CONFIG.yAxis} tickFormatter={(value) => formatNumber(value)} />
          <Tooltip content={(props) => <CustomTooltip {...props} isTraffic={false} />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          {VENDORS.filter(v => visibleVendors.has(v.id)).map((vendor) => (
            <Bar
              key={`keywords-${vendor.id}`}
              name={vendor.name}
              dataKey={vendor.id}
              fill={vendor.color}
              radius={CHART_CONFIG.bar.radius}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <SlideContainer slideNumber={15} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="AI Overview Metrics"
        subtitle="(Jul 2025 - Feb 2026)"
      />

      {!isEditing ? (
        <div className="flex-1 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex items-start gap-1">
            {tabs.map((tab) => (
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
                    ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                    : '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} />

          {/* Content Area */}
          <div className="flex-1 grid grid-cols-12 gap-6">
            {/* Chart Section - 8 columns */}
            <div className="col-span-8 flex flex-col gap-4">
              <ChartContainer
                title=""
                height={420}
              >
                <div className="h-full flex flex-col">
                  <div className="pb-4 border-b border-gray-200 mb-4">
                    <CompetitorFilter competitors={VENDORS} visibleCompetitors={visibleVendors} onToggle={toggleVendor} />
                  </div>
                  <div className="flex-1">
                    {renderChart()}
                  </div>
                </div>
              </ChartContainer>
            </div>

            {/* Insights Section - 4 columns */}
            <div className="col-span-4 flex flex-col gap-4">
              {getInsights()}
              {getPerformanceSummary()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit AI Overview Data</h3>
            <div className="space-y-6">
              {VENDORS.map((vendor) => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Keywords:</div>
                      {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editedData.keywords[vendor.id][idx]}
                            onChange={(e) => handleValueChange('keywords', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Traffic:</div>
                      {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editedData.traffic[vendor.id][idx]}
                            onChange={(e) => handleValueChange('traffic', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
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
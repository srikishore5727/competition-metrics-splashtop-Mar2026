import { TrendingUp, Zap, Globe, Eye, Layers, Link } from 'lucide-react';
import { SlideContainer, SlideHeader, SlideFooter } from './design-system';

interface Takeaway {
  id: string;
  index: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  metricBadge: string;
  metricBg: string;
  metricText: string;
  title: string;
  body: string;
}

const takeaways: Takeaway[] = [
  {
    id: 'traffic-growth',
    index: '1',
    icon: TrendingUp,
    iconBg: 'bg-red-50',
    iconColor: '#EF4444',
    metricBadge: 'TRAFFIC GROWTH +12%',
    metricBg: 'bg-red-500',
    metricText: '159K',
    title: 'Strongest Organic Traffic Growth Continues',
    body: 'Reached its highest traffic at 159K in Mar, maintaining steady growth while competitors showed moderate fluctuations.',
  },
  {
    id: 'non-branded',
    index: '2',
    icon: Eye,
    iconBg: 'bg-blue-50',
    iconColor: '#3B82F6',
    metricBadge: 'NON-BRANDED TRAFFIC +77%',
    metricBg: 'bg-blue-500',
    metricText: '+77%',
    title: 'Accelerated Growth in Non-Branded Traffic',
    body: 'Recorded the strongest growth in non-branded traffic, reinforcing dominance in discovery-driven search.',
  },
  {
    id: 'keyword-coverage',
    index: '3',
    icon: Layers,
    iconBg: 'bg-purple-50',
    iconColor: '#8B5CF6',
    metricBadge: 'KEYWORD COVERAGE +1.7%',
    metricBg: 'bg-purple-500',
    metricText: '+1.7%',
    title: 'Keyword Coverage Stabilizing After Peak',
    body: 'After peaking in Feb, stabilized its keyword footprint (Oct–Mar), indicating a shift toward quality optimization.',
  },
  {
    id: 'ai-visibility',
    index: '4',
    icon: Zap,
    iconBg: 'bg-amber-50',
    iconColor: '#F59E0B',
    metricBadge: 'AI KEYWORDS +115% | AI TRAFFIC +271%',
    metricBg: 'bg-amber-500',
    metricText: '+271%',
    title: 'Breakout Growth in AI Visibility and Traffic',
    body: 'Significantly outpaced competitors in AI-driven visibility and traffic, emerging as a strong AI search performer.',
  },
  {
    id: 'remote-access',
    index: '5',
    icon: Globe,
    iconBg: 'bg-emerald-50',
    iconColor: '#10B981',
    metricBadge: 'TRAFFIC GROWTH +71% (Remote Access)',
    metricBg: 'bg-emerald-500',
    metricText: '+71%',
    title: 'Remote Access & Screen Share Driving Growth',
    body: 'Core categories continue to drive performance, with screen share and remote access showing the highest growth momentum.',
  },
  {
    id: 'referring-domains',
    index: '6',
    icon: Link,
    iconBg: 'bg-sky-50',
    iconColor: '#0EA5E9',
    metricBadge: 'REFERRING DOMAINS +11.9%',
    metricBg: 'bg-sky-500',
    metricText: '+11.9%',
    title: 'Strong Referring Domain Expansion',
    body: 'Continues to grow its domain authority, while competitors show flat or declining trends.',
  },
];

export function SlideKeyTakeaways({ onNavigateHome }: { onNavigateHome?: () => void }) {
  return (
    <SlideContainer slideNumber={23} onNavigateHome={onNavigateHome} source="">
      <SlideHeader
        title="Key Takeaways – Overall Performance"
        subtitle="Mar 2026"
      />

      <div className="text-xs text-gray-500 mb-4">
        Mar 2026 · Splashtop vs. Competitors
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 pb-4 min-h-0 overflow-y-auto">
        {takeaways.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: t.iconColor }}
              />

              <div className="p-5 flex flex-col gap-3 pt-6">
                {/* Number + Icon row */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: t.iconColor }}
                  >
                    {t.index}
                  </div>
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${t.iconColor}15` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: t.iconColor }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-900 leading-snug">{t.title}</h3>

                {/* Metric Badge */}
                <div className="flex-shrink-0">
                  <span
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ color: t.iconColor }}
                  >
                    {t.metricBadge}
                  </span>
                </div>

                {/* Body */}
                <p className="text-xs text-gray-600 leading-relaxed">{t.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <SlideFooter />
    </SlideContainer>
  );
}

import { ChevronRight, TrendingUp, Target, BarChart3, Sparkles, Link2, Lightbulb } from 'lucide-react';
import { SlideContainer, TEXT_STYLES, COLORS } from './design-system';

interface TOCProps {
  onNavigate: (slideIndex: number) => void;
  onNavigateHome?: () => void;
}

export function SlideTOC({ onNavigate, onNavigateHome }: TOCProps) {
  const sections = [
    {
      title: '1. Organic Traffic Overview',
      icon: TrendingUp,
      color: '#EF4444',
      slideIndex: 3, // Direct navigation
    },
    {
      title: '2. Keyword Performance',
      icon: Target,
      color: '#FF7AB6',
      items: [
        { label: 'Keyword Opportunities',        slideIndex: 5  },
        { label: 'Targeting Keywords Trend',     slideIndex: 6  },
      ],
    },
    {
      title: '3. Category-Wise Performance',
      icon: BarChart3,
      color: '#7ED957',
      items: [
        { label: 'Remote Access',        slideIndex: 8  },
        { label: 'Remote Desktop',       slideIndex: 9  },
        { label: 'Remote Support',       slideIndex: 10 },
        { label: 'Remote Connection',    slideIndex: 11 },
        { label: 'Secure Remote Access', slideIndex: 12 },
      ],
    },
    {
      title: '4. AI Overview Visibility Metrics',
      icon: Sparkles,
      color: '#FFB14A',
      items: [
        { label: 'AI Overview Keywords', slideIndex: 14 },
        { label: 'Focused Category',     slideIndex: 15 },
      ],
    },
    {
      title: '5. Backlink Competitive Analysis',
      icon: Link2,
      color: '#6C9AFF',
      slideIndex: 17,
    },
    {
      title: '6. Competitive Insights',
      icon: Lightbulb,
      color: '#FF8E5A',
      items: [
        { label: 'Content Gap',    slideIndex: 19 },
        { label: 'Keyword Gap',    slideIndex: 20 },
        { label: 'Web Experience', slideIndex: 21 },
        { label: 'Key Takeaways',  slideIndex: 22 },
      ],
    },
  ];

  return (
    <SlideContainer>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className={`${TEXT_STYLES.slideTitle} text-[42px] mb-3`}>Table of Contents</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-auto pb-12">
          <div className="max-w-6xl mx-auto px-12 grid grid-cols-2 gap-6">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              const hasItems = section.items && section.items.length > 0;
              const isDirectLink = section.slideIndex !== undefined;
              
              return (
                <div
                  key={idx}
                  className={`bg-white border border-gray-200 rounded-xl transition-all duration-200 ${
                    isDirectLink ? 'hover:shadow-lg hover:border-gray-300 cursor-pointer p-5' : 'hover:shadow-lg p-5'
                  } ${!hasItems && !isDirectLink ? 'p-5' : ''}`}
                  onClick={isDirectLink ? () => onNavigate(section.slideIndex!) : undefined}
                >
                  {/* Section Title */}
                  <div className={`flex items-center gap-3 border-b border-gray-200 ${hasItems ? 'mb-4 pb-3' : 'pb-3'}`}>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${section.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: section.color }} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 flex-1">{section.title}</h3>
                    {isDirectLink && (
                      <span className="text-xs text-gray-400 font-medium">
                        Slide {section.slideIndex! + 1}
                      </span>
                    )}
                  </div>

                  {/* Items */}
                  {hasItems && (
                   <div className="space-y-2">
                     {section.items!.map((item, itemIdx) => (
                       <button
                         key={itemIdx}
                         onClick={(e) => {
                           e.stopPropagation();
                           onNavigate(item.slideIndex);
                         }}
                         className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all group"
                       >
                         <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
                         <span className="flex-1 font-medium">{item.label}</span>
                         <span className="text-xs text-gray-400 font-medium">
                           Slide {item.slideIndex + 1}
                         </span>
                       </button>
                     ))}
                   </div>
                   )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <p className="text-sm text-gray-500">
            Click any item to navigate directly to that slide
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}
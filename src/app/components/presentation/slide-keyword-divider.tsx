import { Target, Search, TrendingUp } from 'lucide-react';
import { SlideContainer } from './design-system';

interface SlideKeywordDividerProps {
  onNavigateHome?: () => void;
}

export function SlideKeywordDivider({ onNavigateHome }: SlideKeywordDividerProps) {
  const sections = [
    { 
      name: 'Top Keyword Opportunities', 
      color: '#EF4444', 
      icon: Target,
    },
    { 
      name: 'Ranking Distribution', 
      color: '#FF7AB6', 
      icon: Search,
    },
    { 
      name: 'Competitive Gaps', 
      color: '#7ED957', 
      icon: TrendingUp,
    },
  ];

  return (
    <SlideContainer slideNumber={4} onNavigateHome={onNavigateHome} source="">
      <div className="flex-1 flex flex-col justify-center items-center px-12">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full opacity-5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full opacity-5 blur-3xl" />
        </div>

        {/* Icon Badge */}
        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl mb-8">
          <Target className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-[64px] font-bold text-gray-900 mb-4 text-center leading-tight">
          Keyword Performance
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-14 text-center max-w-3xl">
          Strategic keyword opportunities and competitive ranking insights
        </p>

        {/* Sections Grid */}
        <div className="grid grid-cols-3 gap-6 max-w-5xl">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Section Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md"
                  style={{ backgroundColor: section.color }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Section Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {section.name}
                </h3>

                {/* Color Indicator */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-1 rounded-full"
                    style={{ backgroundColor: section.color }}
                  />
                </div>

                {/* Hover Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                  style={{ backgroundColor: section.color }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Indicator */}
        <div className="mt-14 flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Strategic Insights
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300" />
        </div>
      </div>
    </SlideContainer>
  );
}
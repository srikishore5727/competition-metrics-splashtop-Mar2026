import { useState, useEffect } from 'react';
import splashtopLogo from 'figma:asset/2f757b0e357d4a9a99a716bc63cb73a52ca572cd.png';
import { SlideCover } from './slide-cover';
import { SlideTOC } from './slide-toc';
import { SlideTrafficOverviewDivider } from './slide-traffic-overview-divider';
import { SlideTrafficOverviewTabsWW } from './slide-traffic-overview-tabs-ww';
import { SlideKeywordDivider } from './slide-keyword-divider';
import { SlideOpportunities } from './slide-opportunities';
import { SlideCategoryDivider } from './slide-category-divider';
import { SlideTargetingKeywordsTrend } from './slide-targeting-keywords-trend';
import { SlideNGFW } from './slide-ngfw';
import { SlideDashboard } from './slide-dashboard';
import { SlideOTSecurity } from './slide-ot-security';
import { SlideSDWANMetrics } from './slide-sdwan-metrics';
import { SlideZeroTrust } from './slide-zero-trust';
import { SlideLLMDivider } from './slide-llm-divider';
import { SlideProfundMetrics } from './slide-profund-metrics';
import { SlideCategoryPerformance } from './slide-category-performance';
import { SlideBacklinkDivider } from './slide-backlink-divider';
import { SlideBacklinks } from './slide-backlinks';
import { SlideIntelDivider } from './slide-intel-divider';
import { SlideCompetitiveIntel } from './slide-competitive-intel';
import { SlideKeywordGap } from './slide-keyword-gap';
import { SlideCompetitiveFindings } from './slide-competitive-findings';
import { SlideThankYou } from './slide-thank-you';
import { SlideKeyTakeaways } from './slide-key-takeaways';
import { SlideNextSteps } from './slide-next-steps';

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
  setCurrentSlide((prev) => {
    if (prev < 24) return prev + 1;
    return prev;
  });
};

const goToPreviousSlide = () => {
  setCurrentSlide((prev) => {
    if (prev > 0) return prev - 1;
    return prev;
  });
};

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToHome = () => {
    setCurrentSlide(1); // Navigate to Table of Contents (slide 1)
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNextSlide();
      } else if (event.key === 'ArrowLeft') {
        goToPreviousSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard navigation from parent (Webflow iframe fix)
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    const allowedOrigins = [
      "https://competition-metrics-splashtop-mar20.vercel.app/",
      "https://lwstaging.webflow.io",
      "https://www.leadwalnut.com"
    ];

    if (!allowedOrigins.includes(event.origin)) return;

    if (event.data?.type === "KEY_NAV") {
      if (event.data.key === "ArrowRight") goToNextSlide();
      if (event.data.key === "ArrowLeft") goToPreviousSlide();
    }
  };

  window.addEventListener("message", handleMessage);

  return () => window.removeEventListener("message", handleMessage);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const slides = [
    <SlideCover key="0" onNavigateHome={goToHome} />,
    <SlideTOC key="1" onNavigate={(index) => setCurrentSlide(index)} onNavigateHome={goToHome} />,
    <SlideTrafficOverviewDivider key="2" onNavigateHome={goToHome} />,
    <SlideTrafficOverviewTabsWW key="3" onNavigateHome={goToHome} />,
    <SlideKeywordDivider key="4" onNavigateHome={goToHome} />,
    <SlideOpportunities key="5" onNavigateHome={goToHome} />,
    <SlideTargetingKeywordsTrend key="6" onNavigateHome={goToHome} />,
    <SlideCategoryDivider key="7" onNavigateHome={goToHome} onNavigate={(index) => setCurrentSlide(index)} />,
    <SlideNGFW key="8" onNavigateHome={goToHome} />,
    <SlideSDWANMetrics key="9" onNavigateHome={goToHome} />,
    <SlideOTSecurity key="10" onNavigateHome={goToHome} />,
    <SlideDashboard key="11" onNavigateHome={goToHome} />,
    <SlideZeroTrust key="12" onNavigateHome={goToHome} />,
    <SlideLLMDivider key="13" onNavigateHome={goToHome} />,
    <SlideProfundMetrics key="14" onNavigateHome={goToHome} />,
    <SlideCategoryPerformance key="15" onNavigateHome={goToHome} />,
    <SlideBacklinkDivider key="16" onNavigateHome={goToHome} />,
    <SlideBacklinks key="17" onNavigateHome={goToHome} />,
    <SlideIntelDivider key="18" onNavigateHome={goToHome} />,
    <SlideCompetitiveIntel key="19" onNavigateHome={goToHome} />,
    <SlideKeywordGap key="20" onNavigateHome={goToHome} />,
    <SlideCompetitiveFindings key="21" onNavigateHome={goToHome} />,
    <SlideKeyTakeaways key="22" onNavigateHome={goToHome} />,
    <SlideNextSteps key="23" onNavigateHome={goToHome} />,
    <SlideThankYou key="24" onNavigateHome={goToHome} />,
  ];

  const totalSlides = slides.length;

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-auto">
      {/* Slide Container */}
      <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="relative w-full h-full min-h-[600px] bg-white rounded-lg sm:rounded-xl shadow-xl overflow-auto flex items-center justify-center">

          {/* Splashtop logo — top-right corner, first slide only */}
          {currentSlide === 0 && (
          <div className="absolute top-4 right-5 z-30 pointer-events-none">
            <img src={splashtopLogo} alt="Splashtop" className="h-14 w-auto object-contain mx-[0px] mt-[30px] mb-[0px]" />
          </div>
          )}

          {/* Slide X of Y — top-left on all slides */}
          {currentSlide !== 0 && currentSlide !== slides.length - 1 && (
          <div className="absolute top-4 left-5 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm pointer-events-none">
            <span className="text-xs font-semibold text-gray-500 tracking-wide">
              Slide {currentSlide + 1} <span className="text-gray-400">of</span> {totalSlides}
            </span>
          </div>
          )}

          {slides[currentSlide]}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative"
          >
            <div
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-6 sm:w-8 bg-red-500'
                  : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
            <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {index + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Keyboard hint */}
      <div className="hidden md:block fixed bottom-4 md:bottom-8 right-4 md:right-8 text-xs text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
        Use ← → arrow keys to navigate
      </div>
    </div>
  );
}
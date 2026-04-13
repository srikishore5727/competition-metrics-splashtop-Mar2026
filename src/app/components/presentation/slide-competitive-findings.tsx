import { ExternalLink, Shield, Target, Award, Home } from 'lucide-react';
import { useState } from 'react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
} from './design-system';

// S1, S2, S3 screenshots
import imgS1 from 'figma:asset/86e08f74ee42805ecd53148c244e96318d5e1e34.png';
import imgS2 from 'figma:asset/6ce6e8aeebb470e2789721df8f6ed6b4d41c6982.png';
import imgS3 from 'figma:asset/68516c653772f9d711675c7c04c7967220eb8566.png';

interface Reference {
  label: string;
  url: string;
}

interface Finding {
  id: string;
  icon: any;
  color: string;
  bgColor: string;
  title: string;
  competitor: string;
  pageUrl: string;
  pageUrlDisplay: string;
  summary: string;
  bullets: string[];
  references: Reference[];
  screenshot: string;
}

const findings: Finding[] = [
  {
    id: 'trust-validation',
    icon: Shield,
    color: '#1D4ED8',
    bgColor: '#EFF6FF',
    title: 'Trust Validation',
    competitor: 'BeyondTrust',
    pageUrl: 'https://www.beyondtrust.com/',
    pageUrlDisplay: 'https://www.beyondtrust.com/',
    summary:
      'BeyondTrust has integrated third-party validations on the homepage and links to dedicated pages highlighting these recognitions and endorsements.',
    bullets: [
      'Named a Leader in the Forrester Wave\u2122: Privileged Identity Management.',
      'Named a Leader in the Gartner\u00ae Magic Quadrant\u2122 for Privileged Access Management (PAM).',
      'Named a Leader in the KuppingerCole Enterprise Secrets Management Leadership Compass.',
    ],
    references: [
      {
        label: 'Forrester Wave \u2013 Privileged Identity Management',
        url: 'https://www.beyondtrust.com/resources/research/forrester-wave-privileged-identity-management',
      },
      {
        label: 'Gartner Magic Quadrant for PAM',
        url: 'https://www.beyondtrust.com/resources/gartner-magic-quadrant-for-pam',
      },
      {
        label: 'KuppingerCole Enterprise Secrets Management Leadership Compass',
        url: 'https://www.beyondtrust.com/resources/research/kuppingercole-enterprise-secrets-management-leadership-compass',
      },
    ],
    screenshot: imgS1,
  },
  {
    id: 'competitive-targeting',
    icon: Target,
    color: '#DC2626',
    bgColor: '#FEF2F2',
    title: 'Competitive Targeting',
    competitor: 'Zoho Assist',
    pageUrl: 'https://www.zoho.com/assist/anydesk-alternative.html',
    pageUrlDisplay: 'https://www.zoho.com/assist/anydesk-alternative.html',
    summary:
      'Zoho Assist uses a \u201cGet My Custom Quote\u201d CTA on comparison pages, which is more compelling and tailored compared to standard CTAs like \u201cFree Trial\u201d or \u201cGet Started.\u201d',
    bullets: [
      'Dedicated comparison landing page targeting AnyDesk users with a personalised CTA.',
      '\u201cGet My Custom Quote\u201d drives higher intent than generic CTAs by signalling tailored value.',
      'Positions Zoho Assist as a cost-effective, feature-rich alternative to AnyDesk.',
    ],
    references: [],
    screenshot: imgS2,
  },
  {
    id: 'social-proof',
    icon: Award,
    color: '#059669',
    bgColor: '#ECFDF5',
    title: 'Social Proof & Awards',
    competitor: 'Zoho Assist',
    pageUrl: 'https://www.zoho.com/assist/',
    pageUrlDisplay: 'https://www.zoho.com/assist/',
    summary:
      'Zoho Assist has incorporated third-party validations along with trust markers to strengthen credibility and build user trust.',
    bullets: [
      'Displays analyst badges and peer-review awards prominently on the homepage.',
      'Trust markers such as customer ratings and recognitions are used to reduce buyer hesitation.',
      'Reinforces credibility across analyst, peer, and customer dimensions simultaneously.',
    ],
    references: [],
    screenshot: imgS3,
  },
];

export function SlideCompetitiveFindings({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [selectedFinding, setSelectedFinding] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const active = findings[selectedFinding];

  return (
    <SlideContainer slideNumber={22} onNavigateHome={onNavigateHome} source="">
      <SlideHeader
        title="Web Experience"
        subtitle="Strategic Observations from Competitor Websites"
      />

      <div className="flex-1 flex flex-col gap-3 pb-4 overflow-hidden">

        {/* ── Tab Row ── */}
        <div className="flex-shrink-0">
          {/* Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {findings.map((f, idx) => {
              const Icon = f.icon;
              const isSelected = selectedFinding === idx;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinding(idx)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 flex-shrink-0 ${
                    isSelected
                      ? 'border-red-500 bg-white shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: f.bgColor }}
                  >
                    <Icon className="w-4 h-4" style={{ color: f.color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 leading-tight">{f.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: f.color }}>{f.competitor}</p>
                  </div>
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 ml-1 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Content Panel ── */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-0">

          {/* Panel Header */}
          <div className="flex-shrink-0 flex items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
            {(() => {
              const Icon = active.icon;
              return (
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: active.bgColor }}
                  >
                    <Icon className="w-4 h-4" style={{ color: active.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{active.title}</h3>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: active.color }}
                    >
                      {active.competitor}
                    </span>
                  </div>
                </div>
              );
            })()}
            <a
              href={active.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0 max-w-[40%] truncate"
            >
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{active.pageUrlDisplay}</span>
            </a>
          </div>

          {/* Two-column body */}
          <div className="flex-1 flex overflow-hidden min-h-0">

            {/* Left — summary + bullets + references */}
            <div className="w-[40%] flex-shrink-0 flex flex-col px-5 py-4 border-r border-gray-100 overflow-y-auto gap-4">

              {/* Summary */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Overview</p>
                <p className="text-xs text-gray-600 leading-relaxed">{active.summary}</p>
              </div>

              {/* References */}
              {active.references.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">References</p>
                  <ul className="space-y-2">
                    {active.references.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: active.color }}
                        />
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors leading-relaxed"
                        >
                          {r.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right — Screenshot */}
            <div className="flex-1 bg-gray-50 overflow-y-auto p-4">
              <div
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-zoom-in hover:shadow-md transition-shadow border border-gray-100"
                onClick={() => setLightboxImage(active.screenshot)}
              >
                <img
                  src={active.screenshot}
                  alt={active.title}
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">Click to enlarge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <div className="max-w-7xl max-h-full overflow-auto">
            <img
              src={lightboxImage}
              alt="Enlarged view"
              className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <SlideFooter />
    </SlideContainer>
  );
}
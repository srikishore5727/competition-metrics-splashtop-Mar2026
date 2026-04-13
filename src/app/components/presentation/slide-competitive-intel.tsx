import { useState } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { SlideContainer, SlideHeader, SlideFooter } from './design-system';

type Tab = 'teamviewer' | 'beyondtrust';

interface Page {
  category: string;
  title: string;
  url: string;
  published: string;
  type?: 'blog' | 'podcast' | 'insight';
}

const teamviewerPages: Page[] = [
  {
    category: 'IT NEWS',
    title: 'IT News & Research Roundup – March',
    url: 'https://www.teamviewer.com/en-in/insights/it-news-research-roundup-march/',
    published: 'Published: Mar 2026',
    type: 'insight',
  },
  {
    category: 'EMPLOYEE EXPERIENCE',
    title: 'Proactive IT in Action: Delivering Seamless Digital Employee Experiences',
    url: 'https://www.teamviewer.com/en-in/insights/proactive-it-in-action-delivering-seamless-digital-employee-experiences/',
    published: 'Published: Mar 2026',
    type: 'insight',
  },
  {
    category: 'DIGITAL WORKPLACE',
    title: 'From Digital Workplace Ambition to Maturity',
    url: 'https://www.teamviewer.com/en-in/insights/from-digital-workplace-ambition-to-maturity/',
    published: 'Published: Mar 2026',
    type: 'insight',
  },
  {
    category: 'PRODUCT UPDATE',
    title: 'TeamViewer ONE UI Updates',
    url: 'https://www.teamviewer.com/en-in/insights/teamviewer-one-ui-updates/',
    published: 'Published: Mar 2026',
    type: 'insight',
  },
  {
    category: 'AI SECURITY',
    title: 'From Prompts to Privileges: Securing the Age of AI Agents',
    url: 'https://www.teamviewer.com/en-in/insights/from-prompts-to-privileges-securing-the-age-of-ai-agents/',
    published: 'Published: Mar 2026',
    type: 'insight',
  },
  {
    category: 'IT OPERATIONS',
    title: 'Minimize Disruption, Maximize Efficiency',
    url: 'https://www.teamviewer.com/en-in/insights/minimize-disruption-maximize-efficiency/',
    published: 'Published: Mar 2026',
    type: 'insight',
  },
];

const beyondtrustPages: Page[] = [
  {
    category: 'VULNERABILITY',
    title: 'OpenAI Codex Command Injection Vulnerability & GitHub Token',
    url: 'https://www.beyondtrust.com/blog/entry/openai-codex-command-injection-vulnerability-github-token',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'COMPLIANCE',
    title: 'Securing BES: NERC CIP-003-9 2026',
    url: 'https://www.beyondtrust.com/blog/entry/securing-bes-nerc-cip-003-9-2026',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'AI SECURITY',
    title: 'Securing Agentic AI Workloads',
    url: 'https://www.beyondtrust.com/blog/entry/securing-agentic-ai-workloads',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'IDENTITY SECURITY',
    title: 'AI Agent Identity Governance & Least Privilege',
    url: 'https://www.beyondtrust.com/blog/entry/ai-agent-identity-governance-least-privilege',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'IT SUPPORT',
    title: 'What is IT Support? Technical Support Tools & Service Desk Explained',
    url: 'https://www.beyondtrust.com/blog/entry/what-is-it-support-your-technical-support-tools-and-service-desk-explained',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'CLOUD SECURITY',
    title: 'Pwning AWS AgentCore Code Interpreter',
    url: 'https://www.beyondtrust.com/blog/entry/pwning-aws-agentcore-code-interpreter',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'ZERO TRUST',
    title: "An Analyst's Take: The Essential 8 Using Zero Trust to Avoid Compliance as a Strategy",
    url: 'https://www.beyondtrust.com/blog/entry/an-analysts-take-the-essential-8-using-zero-trust-to-avoid-compliance-as-a-strategy',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'CRITICAL INFRASTRUCTURE',
    title: 'Identity Security in Critical Infrastructure',
    url: 'https://www.beyondtrust.com/blog/entry/identity-security-in-critical-infrastructure',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'AI SECURITY',
    title: 'Preventing Shadow AI and NHI Risk',
    url: 'https://www.beyondtrust.com/blog/entry/preventing-shadow-ai-and-nhi-risk',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'THREAT ADVISORY',
    title: 'Iran Cyber Retaliation: Identity & Privilege Escalation',
    url: 'https://www.beyondtrust.com/blog/entry/iran-cyber-retaliation-identity-privilege-escalation',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'THREAT ADVISORY',
    title: 'Threat Advisory: Operation Epic Fury',
    url: 'https://www.beyondtrust.com/blog/entry/threat-advisory-operation-epic-fury',
    published: 'Published: 2026',
    type: 'blog',
  },
  {
    category: 'PODCAST',
    title: 'Ep. 98 – Dahvid Schloss',
    url: 'https://www.beyondtrust.com/podcast/ep-98-dahvid-schloss',
    published: 'Published: 2026',
    type: 'podcast',
  },
];

const tabConfig = {
  teamviewer: {
    label: 'TeamViewer',
    pages: teamviewerPages,
    badgeColor: 'bg-blue-600',
    iconBg: 'bg-blue-600',
    accentBorder: 'border-blue-200',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-700',
    dotColor: 'bg-blue-500',
    description: 'Recent content expansion focusing on IT operations, DEX compliance, employee experience, and AI security.',
    cardType: 'New Insights Pages',
  },
  beyondtrust: {
    label: 'BeyondTrust',
    pages: beyondtrustPages,
    badgeColor: 'bg-red-600',
    iconBg: 'bg-red-600',
    accentBorder: 'border-red-200',
    accentBg: 'bg-red-50',
    accentText: 'text-red-700',
    dotColor: 'bg-red-500',
    description: 'Recent content expansion covering AI security, identity governance, threat advisories, cloud security, and critical infrastructure protection.',
    cardType: 'New Blog & Podcast Posts',
  },
};

export function SlideCompetitiveIntel({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('teamviewer');
  const cfg = tabConfig[activeTab];

  return (
    <SlideContainer slideNumber={20} onNavigateHome={onNavigateHome} source="">
      <SlideHeader
        title="Content Gap"
        subtitle="Key Insights & Strategic Actions"
      />

      {/* ── Tab Row ── */}
      <div className="flex gap-2 mb-4 flex-shrink-0">
        {(['teamviewer', 'beyondtrust'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-[13px] font-bold border-2 transition-all duration-200 ${
              activeTab === tab
                ? tab === 'teamviewer'
                  ? 'border-blue-500 bg-white text-gray-900 shadow-sm'
                  : 'border-red-500 bg-white text-gray-900 shadow-sm'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            {tabConfig[tab].label}
          </button>
        ))}
      </div>

      {/* ── Content Card ── */}
      <div className={`flex-1 flex flex-col rounded-2xl border ${cfg.accentBorder} ${cfg.accentBg} p-5 overflow-hidden min-h-0`}>

        {/* Card Header */}
        <div className="flex items-start gap-4 mb-5 flex-shrink-0">
          <div className={`w-11 h-11 ${cfg.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-base font-bold text-gray-900">
                New Pages Added in {activeTab === 'teamviewer' ? 'Mar 2026' : '2026'}
              </h3>
              <span className={`${cfg.badgeColor} text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider`}>
                {cfg.pages.length} NEW PAGES
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{cfg.description}</p>
          </div>
        </div>

        {/* ── Page Grid ── */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="grid grid-cols-2 gap-3">
            {cfg.pages.map((page, idx) => (
              <a
                key={idx}
                href={page.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-xl border border-gray-200 px-4 py-3.5 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col gap-1"
              >
                {/* Category label */}
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">
                  {page.category}
                </span>

                {/* Title */}
                <p className="text-[13px] font-bold text-gray-900 group-hover:text-gray-700 leading-snug pr-5">
                  {page.title}
                </p>

                {/* Published */}
                <span className="text-[10px] text-gray-400 mt-0.5">{page.published}</span>

                {/* External link icon */}
                <ExternalLink className="absolute top-3.5 right-3.5 w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />

                {/* Type badge for podcast */}
                {page.type === 'podcast' && (
                  <span className="self-start mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                    Podcast
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <SlideFooter />
    </SlideContainer>
  );
}

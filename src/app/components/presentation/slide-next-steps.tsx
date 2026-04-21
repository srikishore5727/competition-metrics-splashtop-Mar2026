import { FileEdit, PenTool, ExternalLink } from 'lucide-react';
import { SlideContainer, SlideHeader, SlideFooter } from './design-system';
import image1 from '../../../imports/image-1.png';

export function SlideNextSteps({ onNavigateHome }: { onNavigateHome?: () => void }) {
  return (
    <SlideContainer slideNumber={24} onNavigateHome={onNavigateHome} source="">
      <SlideHeader
        title="Next Steps"
        subtitle="Recommended Actions"
      />
      
      <div className="flex-1 overflow-y-auto pb-4 space-y-5">
        {/* 1. On-Page Optimization Opportunities */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FileEdit className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">On-Page Optimization Opportunities</h3>
              <p className="text-xs text-red-50 mt-0.5">Optimize the following pages to target missing and underperforming keywords</p>
            </div>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-bold text-gray-700 uppercase tracking-wide">S. No</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-700 uppercase tracking-wide">Keyword</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-700 uppercase tracking-wide">Page URL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-gray-900"><strong>1</strong></td>
                    <td className="py-2.5 px-3 text-gray-700 leading-relaxed">
                      remote access to computer<br />
                      computer remote access<br />
                      remote into another computer<br />
                      remote access computer
                    </td>
                    <td className="py-2.5 px-3">
                      <a 
                        href="https://www.splashtop.com/blog/remote-access-computer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline break-all"
                      >
                        splashtop.com/blog/remote-access-computer
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-gray-900"><strong>2</strong></td>
                    <td className="py-2.5 px-3 text-gray-700">remote work setup</td>
                    <td className="py-2.5 px-3">
                      <a 
                        href="https://www.splashtop.com/blog/the-quickest-way-to-enable-remote-work" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline break-all"
                      >
                        splashtop.com/blog/the-quickest-way-to-enable-remote-work
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-gray-900"><strong>3</strong></td>
                    <td className="py-2.5 px-3 text-gray-700">help desk solutions</td>
                    <td className="py-2.5 px-3">
                      <a 
                        href="https://www.splashtop.com/solutions/it-help-desk-remote-access-software" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline break-all"
                      >
                        splashtop.com/solutions/it-help-desk-remote-access-software
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-gray-900"><strong>4</strong></td>
                    <td className="py-2.5 px-3 text-gray-700">remote desktop setup</td>
                    <td className="py-2.5 px-3">
                      <a 
                        href="https://www.splashtop.com/blog/how-to-set-up-remote-desktop" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline break-all"
                      >
                        splashtop.com/blog/how-to-set-up-remote-desktop
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 2. New Content Opportunities */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">New Content Opportunities</h3>
              <p className="text-xs text-blue-50 mt-0.5">Develop new content to target high-intent keywords</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {/* Content Recommendations Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-bold text-gray-700 uppercase tracking-wide">S. No</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-700 uppercase tracking-wide">Keyword</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-700 uppercase tracking-wide">Suggested Title</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-gray-900"><strong>1</strong></td>
                    <td className="py-2.5 px-3 text-gray-700 leading-relaxed">
                      remote pc control<br />
                      remote control<br />
                      remote control for pc
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">What Is Remote Control? How It Works & Use Cases</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-gray-900"><strong>2</strong></td>
                    <td className="py-2.5 px-3 text-gray-700">remote connection tools</td>
                    <td className="py-2.5 px-3 text-gray-700">Top 10 Remote Connection Tools for Secure Remote Access</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Performance Data Table */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Keyword Performance Analysis</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-2 font-bold text-gray-700 uppercase tracking-wide text-[10px]">Keyword</th>
                      <th className="text-center py-2 px-2 font-bold text-gray-700 uppercase tracking-wide text-[10px]">SV</th>
                      <th className="text-center py-2 px-2 font-bold text-gray-700 uppercase tracking-wide text-[10px]">KD</th>
                      <th className="text-left py-2 px-2 font-bold text-gray-700 uppercase tracking-wide text-[10px]">Intent</th>
                      <th className="text-center py-2 px-2 font-bold text-blue-600 uppercase tracking-wide text-[10px]">Splashtop Rank</th>
                      <th className="text-left py-2 px-2 font-bold text-blue-600 uppercase tracking-wide text-[10px]">Splashtop URL</th>
                      <th className="text-center py-2 px-2 font-bold text-purple-600 uppercase tracking-wide text-[10px]">TeamViewer Rank</th>
                      <th className="text-left py-2 px-2 font-bold text-purple-600 uppercase tracking-wide text-[10px]">TeamViewer URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                      <td className="py-2 px-2 text-gray-700">remote pc control</td>
                      <td className="py-2 px-2 text-center font-semibold text-gray-900"><strong>320</strong></td>
                      <td className="py-2 px-2 text-center font-semibold text-gray-900"><strong>60</strong></td>
                      <td className="py-2 px-2 text-gray-700">Informational</td>
                      <td className="py-2 px-2 text-center font-semibold text-blue-600"><strong>20</strong></td>
                      <td className="py-2 px-2">
                        <a href="https://www.splashtop.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline text-[10px] break-all">
                          splashtop.com
                        </a>
                      </td>
                      <td className="py-2 px-2 text-center font-semibold text-purple-600"><strong>1</strong></td>
                      <td className="py-2 px-2">
                        <a href="https://www.teamviewer.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline text-[10px] break-all">
                          teamviewer.com
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                      <td className="py-2 px-2 text-gray-700">remote control</td>
                      <td className="py-2 px-2 text-center font-semibold text-gray-900"><strong>18,100</strong></td>
                      <td className="py-2 px-2 text-center font-semibold text-gray-900"><strong>50</strong></td>
                      <td className="py-2 px-2 text-gray-700">Informational, Commercial</td>
                      <td className="py-2 px-2 text-center font-semibold text-blue-600"><strong>80</strong></td>
                      <td className="py-2 px-2">
                        <a href="https://sos.splashtop.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline text-[10px] break-all">
                          sos.splashtop.com
                        </a>
                      </td>
                      <td className="py-2 px-2 text-center font-semibold text-purple-600"><strong>32</strong></td>
                      <td className="py-2 px-2">
                        <a href="https://www.teamviewer.com/en-us/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline text-[10px] break-all">
                          teamviewer.com/en-us
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                      <td className="py-2 px-2 text-gray-700">remote control for pc</td>
                      <td className="py-2 px-2 text-center font-semibold text-gray-900"><strong>390</strong></td>
                      <td className="py-2 px-2 text-center font-semibold text-gray-900"><strong>39</strong></td>
                      <td className="py-2 px-2 text-gray-700">Commercial</td>
                      <td className="py-2 px-2 text-center font-semibold text-blue-600"><strong>48</strong></td>
                      <td className="py-2 px-2">
                        <a href="https://www.splashtop.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline text-[10px] break-all">
                          splashtop.com
                        </a>
                      </td>
                      <td className="py-2 px-2 text-center font-semibold text-purple-600"><strong>9</strong></td>
                      <td className="py-2 px-2">
                        <a href="https://www.teamviewer.com/en/solutions/use-cases/remote-control/pc/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline text-[10px] break-all">
                          teamviewer.com/.../pc
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-2 px-2 text-gray-700">remote connection tools</td>
                      <td className="py-2 px-2 text-center font-semibold text-gray-900"><strong>260</strong></td>
                      <td className="py-2 px-2 text-center font-semibold text-gray-900"><strong>68</strong></td>
                      <td className="py-2 px-2 text-gray-700">Commercial</td>
                      <td className="py-2 px-2 text-center font-semibold text-blue-600"><strong>57</strong></td>
                      <td className="py-2 px-2">
                        <a href="https://www.splashtop.com/solutions/remote-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline text-[10px] break-all">
                          splashtop.com/.../remote-desktop
                        </a>
                      </td>
                      <td className="py-2 px-2 text-center font-semibold text-purple-600"><strong>1</strong></td>
                      <td className="py-2 px-2">
                        <a href="https://www.teamviewer.com/en/solutions/use-cases/remote-desktop/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline text-[10px] break-all">
                          teamviewer.com/.../remote-desktop
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Homepage Optimization */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Homepage Optimization</h3>
              <p className="text-xs text-purple-50 mt-0.5">Strengthen the homepage by incorporating authoritative external links</p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-xs text-gray-700 mb-4 leading-relaxed">
              Add relevant third-party validations and trust signals to enhance credibility and trust on the homepage.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <img 
                src={image1} 
                alt="Homepage optimization recommendations" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <SlideFooter />
    </SlideContainer>
  );
}
import leadWalnutLogo from 'figma:asset/a333b5825a4a62c2c92f9a565cc6c2e7687f36c8.png';
import splashtopLogo from 'figma:asset/2f757b0e357d4a9a99a716bc63cb73a52ca572cd.png';
import fortinetLogo from 'figma:asset/291fe7dc7e80adc4e8b6918682e87e66ec6d5520.png';

interface SlideCoverProps {
  onNavigateHome?: () => void;
}

export function SlideCover({ onNavigateHome }: SlideCoverProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col relative">
      {/* Logo bar — absolutely positioned so it doesn't shift the centred content */}
      <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-10">
        <img src={leadWalnutLogo} alt="LeadWalnut" className="h-10 w-auto object-contain mx-[0px] mt-[-300px] mb-[0px]" />
        
      </div>

      {/* Main content — centred across the full slide height */}
      <div className="w-full h-full flex items-center justify-center px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6">
            <div className="inline-block px-8 py-3 bg-blue-600 text-white text-2xl font-bold rounded-xl mb-8">
              SEO &amp; AI VISIBILITY
            </div>
            <h1 className="text-[44px] font-bold text-black leading-tight tracking-tight mb-4 uppercase">
              Competitive Analysis - Mar 2026
            </h1>
          </div>

          {/* Competitors List */}
          

          {/* Remote Access competitor legend */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            
            {[
              { name: 'Splashtop',   color: '#3B82F6' },
              { name: 'TeamViewer',  color: '#FF7AB6' },
              { name: 'AnyDesk',     color: '#7ED957' },
              { name: 'BeyondTrust', color: '#FFB14A' },
              { name: 'GoTo (MyPC)', color: '#EF4444' },
            ].map((comp) => (
              <div
                key={comp.name}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: comp.color }}
                />
                <span className="text-xs font-medium text-gray-700">{comp.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
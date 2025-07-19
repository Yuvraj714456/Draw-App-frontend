

const HeroSectionImage = () => {
  return (
    <div className="relative">
            {/* Hero App Screenshot with sketchy border effect */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-slate-200 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Simulated browser chrome */}
              <div className="bg-slate-100 px-4 py-3 flex items-center space-x-2 border-b border-slate-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-sm text-slate-600">draw.app</div>
              </div>
              
              {/* App interface mockup */}
              <div className="p-6 bg-slate-50">
                {/* Toolbar */}
                <div className="flex items-center space-x-3 mb-6">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span className="text-sm font-medium">Draw</span>
                  </button>
                  <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    </svg>
                    <span className="text-sm">Rectangle</span>
                  </button>
                  <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-sm">Circle</span>
                  </button>
                  <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a1 1 0 011-1h4a1 1 0 110 2H6v2a1 1 0 01-2 0V4zm6 0a1 1 0 011-1h4a1 1 0 110 2h-3v2a1 1 0 11-2 0V4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Text</span>
                  </button>
                  
                  <div className="flex space-x-2 ml-4">
                    <div className="w-6 h-6 bg-slate-800 rounded border-2 border-slate-300"></div>
                    <div className="w-6 h-6 bg-red-500 rounded border-2 border-slate-300"></div>
                    <div className="w-6 h-6 bg-blue-500 rounded border-2 border-slate-300"></div>
                    <div className="w-6 h-6 bg-green-500 rounded border-2 border-slate-300"></div>
                  </div>
                </div>
                
                {/* Canvas with sketchy elements */}
                <div className="bg-white rounded-lg border-2 border-slate-200 h-64 relative overflow-hidden">
                  {/* Simulated hand-drawn elements */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                    {/* Rectangle */}
                    <rect x="50" y="50" width="80" height="50" fill="none" stroke="#3b82f6" strokeWidth="2" rx="4" transform="rotate(2 90 75)"/>
                    {/* Circle */}
                    <circle cx="300" cy="70" r="30" fill="none" stroke="#10b981" strokeWidth="2"/>
                    {/* Curved line */}
                    <path d="M 80 120 Q 150 100 220 130" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
                    {/* Arrow */}
                    <path d="M 60 150 L 120 140" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
                      </marker>
                    </defs>
                    {/* Text placeholder */}
                    <text x="250" y="150" fontFamily="Inter" fontSize="14" fill="#64748b">System Architecture</text>
                  </svg>
                  
                  {/* Collaboration cursors */}
                  <div className="absolute top-20 left-32 flex items-center space-x-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">Alex</span>
                  </div>
                  <div className="absolute top-32 left-48 flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Sarah</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating collaboration indicator */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border border-slate-200">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-slate-700">3 active</span>
              </div>
            </div>
    </div>
  )
}

export default HeroSectionImage
const CollaborationSection = () => {
  

  return (
    <section id="collaboration" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Real-time Collaboration That Just Works
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                See your teammates' cursors move in real-time. No more emailing diagrams back and forth or struggling with version control.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Instant Synchronization</h3>
                  <p className="text-slate-600">Every stroke appears immediately for all team members. No delays, no conflicts.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.414l.707-.707zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Live Cursors</h3>
                  <p className="text-slate-600">See exactly where your teammates are working with named cursor indicators.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Share & Embed</h3>
                  <p className="text-slate-600">Share drawings with a simple link or embed them in your documentation.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Collaboration showcase mockup */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl">
              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 text-sm">draw.app/team-session</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-xs">4 online</span>
                  </div>
                </div>
                
                {/* Simulated collaborative drawing */}
                <div className="bg-white rounded-lg h-48 relative overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
                    {/* System diagram elements */}
                    <rect x="20" y="30" width="60" height="30" fill="none" stroke="#6366f1" strokeWidth="2" rx="4"/>
                    <text x="50" y="48" fontFamily="Inter" fontSize="10" textAnchor="middle" fill="#64748b">Frontend</text>
                    
                    <rect x="120" y="30" width="60" height="30" fill="none" stroke="#10b981" strokeWidth="2" rx="4"/>
                    <text x="150" y="48" fontFamily="Inter" fontSize="10" textAnchor="middle" fill="#64748b">API</text>
                    
                    <rect x="220" y="30" width="60" height="30" fill="none" stroke="#f59e0b" strokeWidth="2" rx="4"/>
                    <text x="250" y="48" fontFamily="Inter" fontSize="10" textAnchor="middle" fill="#64748b">Database</text>
                    
                    {/* Arrows */}
                    <path d="M 80 45 L 120 45" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                    <path d="M 180 45 L 220 45" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                    
                    <defs>
                      <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#64748b"/>
                      </marker>
                    </defs>
                  </svg>
                  
                  {/* Live collaboration indicators */}
                  <div className="absolute top-8 left-16 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-xs bg-purple-500 text-white px-1 py-0.5 rounded">Alex</span>
                  </div>
                  <div className="absolute top-8 left-32 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs bg-green-500 text-white px-1 py-0.5 rounded">Sarah</span>
                  </div>
                  <div className="absolute top-8 left-48 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs bg-blue-500 text-white px-1 py-0.5 rounded">Mike</span>
                  </div>
                </div>
              </div>
              
              {/* Team members list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">A</span>
                    </div>
                    <span className="text-slate-300">Alex Chen</span>
                  </div>
                  <span className="text-green-400 text-xs">Drawing</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">S</span>
                    </div>
                    <span className="text-slate-300">Sarah Kim</span>
                  </div>
                  <span className="text-blue-400 text-xs">Adding shapes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">M</span>
                    </div>
                    <span className="text-slate-300">Mike Johnson</span>
                  </div>
                  <span className="text-yellow-400 text-xs">Adding text</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
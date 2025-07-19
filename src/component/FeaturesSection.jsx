const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Everything You Need for Team Collaboration
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Powerful drawing tools designed for developers, designers, and remote teams to create and share ideas instantly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Draw Tool */}
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 mb-4 border border-purple-100">
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Free Drawing</h3>
              <p className="text-slate-600">Express ideas naturally with smooth, responsive hand-drawing tools</p>
            </div>
          </div>

          {/* Shapes */}
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mb-4 border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Perfect Shapes</h3>
              <p className="text-slate-600">Create rectangles, circles, and arrows with precision and style</p>
            </div>
          </div>

          {/* Text */}
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-4 border border-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a1 1 0 011-1h4a1 1 0 110 2H6v2a1 1 0 01-2 0V4zm6 0a1 1 0 011-1h4a1 1 0 110 2h-3v2a1 1 0 11-2 0V4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Rich Text</h3>
              <p className="text-slate-600">Add labels, annotations, and documentation directly on your drawings</p>
            </div>
          </div>

          {/* Collaboration */}
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-4 border border-orange-100">
              <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Real-time Sync</h3>
              <p className="text-slate-600">See teammates' changes instantly with live cursors and updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
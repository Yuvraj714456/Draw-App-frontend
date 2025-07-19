const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-800">Draw</span>
            </div>
            <p className="text-slate-600">
              Collaborative drawing and diagramming for development teams.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Product</h3>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-slate-800">Features</a></li>
              <li><a href="#" className="hover:text-slate-800">Collaboration</a></li>
              <li><a href="#" className="hover:text-slate-800">Integrations</a></li>
              <li><a href="#" className="hover:text-slate-800">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Resources</h3>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-slate-800">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-800">Examples</a></li>
              <li><a href="#" className="hover:text-slate-800">Blog</a></li>
              <li><a href="#" className="hover:text-slate-800">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Company</h3>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-slate-800">About</a></li>
              <li><a href="#" className="hover:text-slate-800">Privacy</a></li>
              <li><a href="#" className="hover:text-slate-800">Terms</a></li>
              <li><a href="#" className="hover:text-slate-800">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-600">
          <p>&copy; 2024 Draw. Made with ❤️ for development teams.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
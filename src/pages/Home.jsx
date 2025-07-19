import { useEffect } from 'react';
import Navigation from '../component/Navbar';
import HeroSection from '../component/Herosection';
import FeaturesSection from '../component/FeaturesSection';
import UseCasesSection from '../component/UseCasesSection';
import CollaborationSection from '../component/Collaboration';
import Footer from '../component/Footer';

const DrawApp = () => {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleNavClick = (e) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

  
    // Add scroll effect to navigation
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 10) {
        nav?.classList.add('shadow-lg');
      } else {
        nav?.classList.remove('shadow-lg');
      }
    };

    document.addEventListener('click', handleNavClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleNavClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="font-sans antialiased bg-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <CollaborationSection />
      
      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Development Teams Choose Draw
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of teams who have improved their collaboration and productivity with Draw.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
              <div className="text-3xl font-bold text-indigo-600 mb-2">3x</div>
              <div className="text-slate-800 font-semibold mb-2">Faster Planning</div>
              <div className="text-slate-600 text-sm">Teams report 3x faster project planning sessions with visual collaboration</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
              <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
              <div className="text-slate-800 font-semibold mb-2">Fewer Meetings</div>
              <div className="text-slate-600 text-sm">Visual documentation reduces back-and-forth communication</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-slate-800 font-semibold mb-2">Remote Ready</div>
              <div className="text-slate-600 text-sm">Perfect for distributed teams and async collaboration</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Collaborating Today
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            No downloads, no setup, no credit card required. 
            Create your first collaborative drawing in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => console.log('Navigate to Draw app interface')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-xl"
            >
              <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              Launch Draw App
            </button>
            <button 
              onClick={() => console.log('Navigate to GitHub repository')}
              className="border border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </button>
          </div>
          
          <div className="mt-8 text-slate-400 text-sm">
            Free forever • Open source • Privacy focused
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DrawApp;
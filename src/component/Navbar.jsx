import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {createRoomDialog} = useSelector(state=>state.misc);

  const handleLogin=()=>{
    navigate('/auth');
  }

  const handleDashboard=()=>{
    navigate('/dashboard');
  }

  const {user}  = useSelector(state=>state.auth);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 z-50 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-800">Draw</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-slate-800 transition-colors">Features</a>
            <a href="#use-cases" className="text-slate-600 hover:text-slate-800 transition-colors">Use Cases</a>
            <a href="#collaboration" className="text-slate-600 hover:text-slate-800 transition-colors">Collaboration</a>
            {/* <div 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={()=>dispatch(setCreateRoomDialogOpen())}
            >
              Start Drawing
            </div> */}

            {user?<button 
              onClick={handleDashboard}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Dashboard
            </button>
            :
            <button 
              onClick={handleLogin}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign up / Sign in
            </button>}

          </div>
          
          <button 
            className="md:hidden text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>


          
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-slate-600">Features</a>
            <a href="#use-cases" className="block text-slate-600">Use Cases</a>
            <a href="#collaboration" className="block text-slate-600">Collaboration</a>
            {/* <div 
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg"
              onClick={()=>dispatch(setCreateRoomDialogOpen())}
            >
              Start Drawing
            </div> */}
            {user?
              <button onClick={handleLogin}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg">
                  Dashboard
              </button>:
              <button onClick={handleLogin}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg">
                  Sign up / Login
              </button>
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { useDispatch, useSelector } from "react-redux";
import { setCreateRoomDialogOpen } from "../redux/reducers/misc";
import  CreateRoomModel  from './CreateRoomModel';
import HeroSectionImage from "./HeroSectionImage";

const HeroSection = () => {
  const dispatch =  useDispatch();
  const {createRoomDialog} = useSelector(state=>state.misc);

  const handleCollabortaion =()=>{

  } 

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Collaborative 
                <span className="text-indigo-600"> Drawing</span> 
                for Development Teams
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Create system diagrams, wireframes, and flowcharts together. 
                Real-time collaboration that brings your ideas to life instantly.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div 
                onClick={()=>dispatch(setCreateRoomDialogOpen())}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Start Drawing Now
              </div>
              { createRoomDialog &&  <CreateRoomModel/>}
              <button 
                onClick={handleCollabortaion}
                className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
              >
                <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                See Collaboration
              </button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Real-time sync</span>
              </div>
            </div>
          </div>
          <HeroSectionImage/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
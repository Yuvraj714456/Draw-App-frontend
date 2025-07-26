import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateRoomModel from "../component/CreateRoomModel";
import { useAsyncMutation } from "../hooks/hooks";
import { useGetUserDetailsMutation, useLogoutMutation } from "../redux/api/api";
import { setCreateRoomDialogOpen } from "../redux/reducers/misc";
import { useNavigate } from "react-router-dom";
import { DashboardShimmer } from "../component/loader";
import { userNotExists } from "../redux/reducers/auth";

export default function Dashboard() {
  const [userDetails,setUserDetails] = useState(null);
  const [roomDetaills,setRoomDeatils] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const {createRoomDialog} = useSelector(state=>state.misc);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [getUserDetails,isLoading,data] = useAsyncMutation(useGetUserDetailsMutation);
  const [getLogout,isLoadingLogout] = useAsyncMutation(useLogoutMutation);
  let filteredRooms=[];
  let thisMonthRoom=0;

  useEffect(()=>{
      getUserDetails("Fetching user details");
  },[])

  useEffect(()=>{
      if(data && !isLoading){
        setUserDetails(data.userdetails);
        setRoomDeatils(data.userdetails.rooms);
      }
  },[data]);

  if(roomDetaills){
        filteredRooms = roomDetaills.filter(room =>(
          room.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.description?.toLowerCase().includes(searchQuery.toLowerCase())
          
        )
      );
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); 
      const currentYear = currentDate.getFullYear();

      thisMonthRoom = userDetails?.rooms?.filter(room => {
        const createdAt = new Date(room.createdAt);
        return (
          createdAt.getMonth() === currentMonth &&
          createdAt.getFullYear() === currentYear
        );
      }).length ||0;
  }

  const handleLogout =()=>{
        getLogout();
        dispatch(userNotExists());
  }

  console.log(roomDetaills);

  return !isLoading && userDetails? (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-80 bg-white border-r border-gray-200 p-6 fixed h-full">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {userDetails.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{userDetails.name}</h2>
              <p className="text-sm text-gray-500">@{userDetails.username}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{userDetails.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Joined {new Date(userDetails.createdAt).toLocaleDateString("en-IN")}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Rooms</span>
              <span className="font-semibold text-gray-800">{roomDetaills.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="font-semibold text-gray-800">{thisMonthRoom}</span>
            </div>
          </div>
        </div>

        <div onClick={handleLogout} className="rounded-md text-white bg-indigo-600 px-4 py-2 text-center text-2xl">
                    Logout
        </div>
      </div>

      <div className="flex-1 ml-80 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">All Rooms</h1>
              <p className="text-gray-600">{roomDetaills.length} rooms</p>
            </div>
            <button 
              onClick={() => dispatch(setCreateRoomDialogOpen())}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Room
            </button>
          </div>

          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div 
              key={room._id} 
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
              style={{ 
                minHeight: '180px',
                boxShadow: room._id % 2 === 0 ? '0 2px 4px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.08)'
              }}
              onClick = {()=>navigate(`/draw/${room._id}`)}
            >
              <div className="mb-4">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">{room.slug}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{room.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{room.members} members</span>
                </div>
                <span>{room.lastActive}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No rooms found matching your search.</p>
            <button 
              onClick={() => dispatch(setCreateRoomDialogOpen())}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Create Your First Room
            </button>
          </div>
        )}
      </div>
      
      {createRoomDialog && 
            <CreateRoomModel />
      }
    </div>
  ):<DashboardShimmer/>;
}
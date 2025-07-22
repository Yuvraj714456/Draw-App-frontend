import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../hooks/hooks';
import { useCreateRoomMutation } from '../redux/api/api';
import { setCreateRoomDialogClose, setDrawTabClose, setDrawTabOpen } from '../redux/reducers/misc';

const CreateRoomModel = ({setShowCreateModal}) => {

    const [newRoom, setNewRoom] = useState({ name: "", description: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createRoom,isLoading,data] = useAsyncMutation(useCreateRoomMutation);

    const handleCreateRoom = () => {
        createRoom("Creating Room",{slug:newRoom.name,description:newRoom.description});
    };


    useEffect(()=>{    
        if(!isLoading && data){
            localStorage.setItem("roomId",data.roomData.roomId);
            dispatch(setDrawTabOpen())
            navigate(`/draw/${data.roomData.roomId}`);
        }
            return () =>{
            dispatch(setDrawTabClose());
            }
    },[data])

  return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Create New Room</h2>
              <button
                onClick={() => dispatch(setCreateRoomDialogClose())}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                  placeholder="Enter room name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                  placeholder="Brief description of the room purpose"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none h-24 resize-none"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => dispatch(setCreateRoomDialogClose())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRoom}
                  disabled={!newRoom.name.trim()}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  Create Room
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default CreateRoomModel
import axios from 'axios';
import { server } from '../constant/config';

export const getShapesFromDB = async (roomId) => {
  const res = await axios.get(`${server}/api/v1/chat/${roomId}`,{
    withCredentials:true
  });
  console.log(res.data);

  const shapes = res.data?.chats
    ?.map((chat) => {
      try {
        return JSON.parse(chat.message);   
      } catch {
        return null;   
      }
    })
    .filter(Boolean) || [];

  return shapes; 

  return res.data;
};
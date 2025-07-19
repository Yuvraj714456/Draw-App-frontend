import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import { useGetChatDetailsQuery } from "../redux/api/api";



const useAsyncMutation = (mutationHook)=>{
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState(null);

    const [mutate] = mutationHook();

    const executeMutation = async (totalsMessages,...args)=>{
        setIsLoading(true);
        const toastId = toast.loading(totalsMessages|| "Updating data...");
        try {
            const res = await mutate(...args).unwrap();
            toast.success(res.message || "Updated data successfully",{
                id:toastId
            })  
            setData(res);     
        } catch (error) {
            toast.error(error?.data?.message||"Something went worng",{id:toastId});
        }finally{
            setIsLoading(false);
        }    
    }
    return [executeMutation,isLoading,data];
}

const useErrors = (errors=[])=>{
    useEffect(()=>{
        errors.forEach(({isError,error,fallback})=>{
            if(isError){
                if(fallback) fallback();
                else toast.error(error?.data?.message || "Something went wrong");
            }
        })
    },[errors])
}


const useExistingShapes = (roomId)=>{
    const {isLoading,data,isError,error}=useGetChatDetailsQuery(roomId);
    console.log(data);

    useErrors([{isError,error}]);

    const shapes = data?.chats?.map((x)=>{
        try {
            return JSON.parse(x.message);
        } catch (error) {
            return null;
        }
    }).filter(Boolean)|| [];

    return {shapes,isLoading};
}


const useSocketsEvents = (socket,handlers)=>{
    useEffect(()=>{
        Object.entries(handlers).forEach(([event,handler])=>{
            socket.on(event,handler);
        })

        return ()=>{
            Object.entries(handlers).forEach(([event,handler])=>{
                socket.off(event,handler);
            })
        }
    },socket,handlers);
}


export {useAsyncMutation,useErrors,useExistingShapes,useSocketsEvents}
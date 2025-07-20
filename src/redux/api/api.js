import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {server} from '../../constant/config'


const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/`}),
    tagTypes:["User","Draw","ROOM"],

    endpoints:(builder)=>({
        userLogin:builder.mutation({
            query:(data)=>({
                url:'login',
                method:"POST",
                credentials:"include",
                body:data
            }),
            providedTags:["User"]
        }),
        registerUser:builder.mutation({
            query:(data)=>({
                url:"newuser",
                method:"POST",
                credentials:"include",
                body:data
            }),
            providedTags:["User"]
        }),
        createRoom:builder.mutation({
            query:(data)=>({
                url:"room",
                method:"POST",
                credentials:'include',
                body:data
            }),
            invalidatesTags:["Room"]
        }),
    })
})

export default api;

export const {
    useUserLoginMutation,
    useRegisterUserMutation,
    useCreateRoomMutation,
} = api
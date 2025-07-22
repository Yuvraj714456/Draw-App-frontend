import React, { lazy, Suspense, useEffect } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './socket';
import PrivateRoute from './component/PrivateRoute';
import { useAsyncMutation } from './hooks/hooks';
import { useGetProfileMutation } from './redux/api/api';
import { userExists, userNotExists } from './redux/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';

const Home = lazy(()=>import('./pages/Home'));
const Login = lazy(()=>import('./pages/Login'));
const NotFound = lazy(()=>import('./pages/NotFound'));
const CanvasComponent = lazy(()=>import('./pages/Canvas'));
const Dashboard = lazy(()=>import('./pages/Dashboard'))

const App = () => {
  const {user,loader} = useSelector(state=>state.auth);
  const [getProfile] = useGetProfileMutation();
  const dispatch = useDispatch();

  useEffect(()=>{
    const getData= async ()=>{
      try {
        const res = await getProfile();
        if(res.data){
          console.log(res)
          dispatch(userExists(res.data.user));
        }else{
          dispatch(userNotExists());
        }
      } catch (error) {
        dispatch(userNotExists());
      }
    }
    getData();
  },[getProfile,dispatch]);

  console.log(user);

  return loader ? <div>Loading...</div> :  (
    <BrowserRouter >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Login/>}/>
          <Route  element={<PrivateRoute user={user}/>}>
              <Route path='/draw/:roomId' element={
                <SocketProvider>
                  <CanvasComponent/>
                </SocketProvider>
              }/>
              <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Suspense>
      <Toaster position='bottom-right'/>
    </BrowserRouter> 
  )
}

export default App
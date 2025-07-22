import React, { lazy, useEffect } from 'react'
import {BrowserRouter,Route,Routes, useSearchParams} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './socket';
import PrivateRoute from './component/PrivateRoute';
import { useAsyncMutation } from './hooks/hooks';
import { useGetProfileMutation } from './redux/api/api';
import { userExists } from './redux/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';

const Home = lazy(()=>import('./pages/Home'));
const Login = lazy(()=>import('./pages/Login'));
const NotFound = lazy(()=>import('./pages/NotFound'));
const CanvasComponent = lazy(()=>import('./pages/Canvas'));
const Dashbaord = lazy(()=>import('./pages/Dashboard'))

const App = () => {
  const {user,loader} = useSelector(state=>state.auth);

  const [getProfile,isLoading,data] = useAsyncMutation(useGetProfileMutation);
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(()=>{
    if(data && !isLoading){
      dispatch(userExists(data.user));
    }
  },[getProfile,data,isLoading])

  return !(isLoading || loader) ? (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Login/>}/>
        <Route  element={<PrivateRoute user={user}/>}>
            <Route path='/draw/:roomId' element={
              <SocketProvider>
                <CanvasComponent/>
              </SocketProvider>
            }/>
            <Route path='/dashboard' element={<Dashbaord/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster position='bottom-right'/>
    </BrowserRouter> 
  ):<div>Loading... </div>
}

export default App
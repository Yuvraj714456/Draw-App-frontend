import React, { lazy } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './socket';

const Home = lazy(()=>import('./pages/Home'));
const Login = lazy(()=>import('./pages/Login'));
const NotFound = lazy(()=>import('./pages/NotFound'));
const CanvasComponent = lazy(()=>import('./pages/Canvas'));
const Dashbaord = lazy(()=>import('./pages/Dashboard'))

const App = () => {

  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Login/>}/>
        <Route path='/draw/:roomId' element={
          <SocketProvider>
            <CanvasComponent/>
          </SocketProvider>
        }/>
        <Route path='/dashboard' element={<Dashbaord/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster position='bottom-right'/>
    </BrowserRouter> 
  )
}

export default App
import React, { useEffect, useState } from 'react'
import HeroSectionImage from '../component/HeroSectionImage';
import {useAsyncMutation} from '../hooks/hooks'
import { useRegisterUserMutation, useUserLoginMutation } from '../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [newUser,setNewUser] = useState(true);
  const [credentials,setCredentials] = useState("");
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [name,setName] = useState("");

  const [getSignIn,isSignInLoading,SignInData] = useAsyncMutation(useUserLoginMutation);
  const [getSignUp,isSignUpLoading,SignUpData] = useAsyncMutation(useRegisterUserMutation);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.auth);


  const handleAuth = (e)=>{
    e.preventDefault();

    const data = newUser
    ? { name, email, username, password, confirmPassword }
    : {
        password,
        ...(credentials.includes("@")
          ? { email: credentials }
          : { username: credentials }),
      };

    newUser
      ? getSignUp("Signing Up...", data)
      : getSignIn("Signing In...", data);  
  } 

  useEffect(()=>{
    if(SignInData){
      dispatch(userExists(SignInData.user));
    }
  },[SignInData,dispatch])

  useEffect(()=>{
    if(SignUpData){
      dispatch(userExists(SignUpData.user));
    }
  },[SignUpData,dispatch])

  useEffect(()=>{
    if(user){
      navigate('/');
    }
  },[user])

  return (
    <div className='flex justify-between items-center h-screen bg-gradient-to-r from-gray-100 to-white'>
      <div className='hidden md:flex justify-center items-center w-1/2 h-full'>
        <HeroSectionImage/>
      </div>
      <div className='w-full md:w-1/2 h-full flex justify-center items-center p-10'>
        <div className='w-full max-w-md  p-8 rounded-2xl shadow-2xl bg-gray-50'>
          <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
            {newUser ? "Sign Up" : "Sign In"}
          </h2>

          <div className='space-y-4'>

            {newUser &&<input
              type="text"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />}

            {newUser && <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            }

            {newUser && 
              <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            }

            {!newUser && <input
                type="text"
                placeholder='Email or Username'
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            }

            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            {newUser && (
              <input
                type="password"
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            )}

            <button
              className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
              onClick={handleAuth}
            >
              {newUser ? "Sign Up" : "Sign In"}
            </button>
          </div>

          <div className='mt-6 text-center'>
            <span className='text-gray-600'>
              {!newUser ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              className='ml-2 text-blue-600 hover:underline'
              onClick={() => setNewUser(!newUser)}
            >
              {!newUser ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
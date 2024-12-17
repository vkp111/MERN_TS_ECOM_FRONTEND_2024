import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
// import { GoogleAuthProvider } from 'firebase/auth/web-extension'
// import { signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLoginMutation } from '../redux/api/userAPI';
import {FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../types/api-types';


const Login = () => {

    const [gender, setGender] = useState("")
    const [date, setDate] = useState("")


    const [login] = useLoginMutation()

    


    const loginHandler = async () => {
        try 
        {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          // await signInWithRedirect(auth, provider);- in case to bypass browser conflicts

          const user = result.user

          // console.log("Google Provider Initialized:", provider);
          // console.log("User Info:", user);

          

          const res = await login({
            name:user.displayName!,
            email:user.email!,
            photo:user.photoURL!,
            gender,
            // By default is user, as admin is manully created in DB
            role: "user", 
            dob: date,
            _id:user.uid,

          })
        if (res.data?.message) 
        {
            toast.success(res.data.message);
        }
          else
          {
            const error = res.error  as FetchBaseQueryError
            const message = (error.data as MessageResponse).message
            toast.error(message)
          }

        } 
        
        catch (error: any) 
        {
          console.error("Sign In Error:", error);
          toast.error(`Sign In Failed: ${error.code}`);
        }
      };

  return (
    <div className='login'>
        <main>
            <h1 className='heading'> Login </h1>

            <div>
                <label> Gender </label>
                <select value = {gender} onChange = {(event)=> setGender(event.target.value)}>

                <option value=""> Select Gender </option>
                <option value="male"> Male </option>
                <option value="female"> Female </option>
                <option value="other"> Other </option>

                </select>
            </div>

            <div>
                <label> Date of Birth </label>
                <input 
                    type ="date"
                    value = {date} 
                    onChange = {(event)=> setDate(event.target.value)}
                />
            </div>

            <div>
                <p> Already Signed In Once</p>
                <button onClick={loginHandler}>
                    <FcGoogle/> <span> Sign In With Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login
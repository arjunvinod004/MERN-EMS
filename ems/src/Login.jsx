import axios from 'axios';
import React, { useState } from 'react'

function Login() {

  const [email,setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [error,setError]=useState(null);

  const handlesubmit=async(e)=>{
 try {
  e.preventDefault();
  const response =  await axios.post('http://localhost:8000/login',{email,password})
  if(response.data.success){
    alert('login successfull');
  }
  console.log(response);
  
 } catch (error) {
  if(error.response && !error.response.data.success){
setError(error.response.data.error)
  }else{
    setError("server errror")
  }
  console.log(error);
  
 }
  }

  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-stone-700 from-50% to-gray-100 to-50% space-y-6'>
        <h2 className='text-3xl text-white max-[425px]:text-center max-[425px]:text-sm font-staatliche'>Employee Management System</h2>
        <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form action="" onSubmit={handlesubmit}>
            <div className='mb-4'>
                
                <label htmlFor="" className='text-gray-700'>Email</label>
                <input type="text" placeholder='Enter Your Email' className='w-full px-3 py-2 border' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='mb-4'>
            <label htmlFor="" className='text-gray-700'>Password</label>
            <input type="text" placeholder='Enter Your Password' className='w-full px-3 py-2 border' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
                <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
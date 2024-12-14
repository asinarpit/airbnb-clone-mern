import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router'



export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (ev)=>{
        ev.preventDefault();

        try{

            await axios.post("/register",{
                name,
                email,
                password,
            });
    
            alert('Registration Successfull. Now you can log in');
        } catch(e){
            alert("Registration failed! Please try again later");
        }

    }
    return (
        <div className='mt-5 grow flex justify-center items-center'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form onSubmit={registerUser} className='max-w-md mx-auto'>
                    <input required type="text" placeholder='John Doe' value={name} onChange={e=>setName(e.target.value)} />
                    <input required type="email" placeholder='your@email.com' value={email} onChange={e=>setEmail(e.target.value)} />
                    <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' />
                    <button type='submit' className='primary mt-2'>Register</button>

                    <div className='text-center py-2 text-gray-500'>
                        Already a member? <Link className='underline text-black' to={"/login"}>Login</Link>
                    </div>
                </form>

            </div>

        </div>
    )
}

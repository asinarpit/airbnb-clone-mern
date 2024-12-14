import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router'
import { UserContext } from '../contexts/UserContext';

export default function LoginPage() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    const handleLoginSubmit = async(ev) =>{
        ev.preventDefault();
        try{
            const res = await axios.post('/login',{email,password},{withCredentials:true});
            const userInfo = res.data;
            setUser(userInfo);
            alert("Login successful");
            console.log("User: ", userInfo);
            setRedirect(true);

        } catch(e){
            alert("Login failed")

        }
    }

    if(redirect){
        return <Navigate to={"/"}/>
    }
    return (
        <div className='mt-5 grow flex justify-center items-center'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input required type="email" placeholder='your@email.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input required type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button type='submit' className='primary mt-2'>Login</button>

                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet? <Link className='underline text-black' to={"/register"}>Register now</Link>
                    </div>
                </form>

            </div>

        </div>
    )
}

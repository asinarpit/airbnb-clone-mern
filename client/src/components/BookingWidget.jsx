import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from "date-fns";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { UserContext } from '../contexts/UserContext';

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [mobile,setMobile] = useState(''); 
    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user){
            setName(user.name)
        }

    },[user])


    let numberOfNights = 0;

   if(checkIn && checkOut){
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date( checkIn));
   }


   const bookThisPlace = () =>{
    try{
        const {data} = axios.post("/bookings",{name,checkIn,checkOut,phone:mobile,numberOfGuests,price:numberOfNights*place.price,place:place._id});
        console.log("Booking done: ",data);
        navigate("/account/bookings")
    } catch(er){
        console.log(er);
    }
   }
    return (
        <div className='p-4 rounded-2xl shadow-md bg-white'>
            <p className='text-2xl text-center'>Price: ₹{place.price} / per night</p>

            <div className='border rounded-2xl mt-4'>
                <div className="flex">
                    <div className='px-4  py-2 '>
                        <label >Check in:</label>
                        <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="date" />
                    </div>

                    <div className='px-4  py-2 border-l '>
                        <label >Check out:</label>
                        <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="date" />

                    </div>
                </div>
                <div className='px-4  py-2 border-t '>
                    <label >Number of guests:</label>
                    <input value={numberOfGuests} onChange={(ev)=>setNumberOfGuests(ev.target.value)} type="number" />

                </div>


            </div>


{
    numberOfNights > 0 && (
        <div className=''>
            <label>Your full name</label>
            <input value={name} onChange={ev=>setName(ev.target.value)} type="text" placeholder='John Snow' />

            <label>Phone number</label>
            <input value={mobile} onChange={ev=>setMobile(ev.target.value)} type="tel" placeholder='+91-123xxxxxxx' />


            </div>
    )
}


            <button onClick={bookThisPlace} className='primary mt-4 flex gap-2 items-center justify-center'>Book this place
                {
                   numberOfNights > 0 && (
                        <span>₹{numberOfNights * place.price}</span>
                    )
                }
            </button>
        </div>
    )
}

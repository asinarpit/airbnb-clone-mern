import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';

export default function BookingPage() {
    const {id} = useParams();
    console.log(id);
    const [booking,setBooking] = useState(null);

    const fetchBooking = async() =>{

      const {data} = await axios.get("/bookings");
      const foundBooking = data.find(({_id}) => _id === id);

      if(foundBooking){
        setBooking(foundBooking);
      }


    }

    useEffect(()=>{
      fetchBooking();
    },[id]);


    if(!booking){
      return ''
    }

  return (
    <div className='mt-8'>
          <h1 className='text-3xl'>{booking.place.title}</h1>
            <a className='flex items-center gap-1 my-2 font-semibold underline' href={`https://maps.google.com/?q=${booking.place.address}`} target='_blank'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
                {booking.place.address}</a>

                <div className='bg-gray-200 rounded-2xl p-4 my-4 flex justify-between items-center'>

                  <div>

                  <h2 className='font-semibold'>Your booking info:</h2>
                  <BookingDates booking={booking}/>
                  </div>

                  <div className='bg-primary text-white p-2 rounded-xl'>
                    <h2 className='font-semibold'>Total Price:</h2>
                    <p className='text-3xl font-semibold'>₹{booking.price}</p>
                  </div>

                </div>
      
      <PlaceGallery place={booking?.place}/>
    </div>
  )
}

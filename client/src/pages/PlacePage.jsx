import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState({});
    
      

    const fetchPlaceById = async () => {
        if (!id) {
            return;
        }
        else {
            const { data } = await axios.get(`/places/${id}`);
            setPlace(data);

        }
    }

    useEffect(() => {
        fetchPlaceById();
    }, [id])



    if (!place) {
        return 'Sorry! Place not found';
    }

    return (
        <div className='mt-8 bg-gray-100 -mx-8 px-8 pt-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <a className='flex items-center gap-1 my-2 font-semibold underline' href={`https://maps.google.com/?q=${place.address}`} target='_blank'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
                {place.address}</a>


       <PlaceGallery place={place}/>



            <div className='grid gird-cols-1 grid-cols-[2fr_1fr] gap-4 my-6'>

                <div>
                    <h2 className='text-2xl font-semibold'>Description</h2>
                    <p>{place.description}</p>

                    <div className='my-4'>
                        Check-in: {place.checkIn}<br />
                        Check-out: {place.checkOut}<br />
                        Max number of guests: {place.maxGuests}


                    </div>
                </div>



                <div>
                    <BookingWidget place={place} />

                </div>


            </div>

            <div className='bg-white -mx-8 px-8 py-8'>
                <h2 className='text-2xl font-semibold'>Extra Info</h2>
                <div className='text-sm mt-2 text-gray-700 leading-6'>{place.extraInfo}</div>

            </div>








        </div>
    )
}

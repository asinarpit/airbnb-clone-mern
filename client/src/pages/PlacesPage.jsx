import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import AccountNav from '../components/AccountNav';
import axios from 'axios';


export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    console.log(places);

    const fetchPlaces = async () => {
        try {
            const { data } = await axios.get('/user-places');
            setPlaces(data);


        } catch (e) {
            console.log(e)
        }



    }
    useEffect(() => {
        fetchPlaces();

    }, [])

    return (
        <div>

            <AccountNav />
            <div className='text-center'>
                <Link className='inline-flex gap-1 items-center bg-primary text-white py-2 px-4 rounded-full' to="/account/places/new"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>Add new place
                </Link>
            </div>

            <div className='mt-5 flex flex-col gap-5'>
                {places.length > 0 && places.map((place, i) => (
                    <Link to={`/account/places/${place._id}`} className='cursor-pointer flex bg-gray-100 p-2 rounded-xl gap-4' key={i}>
                        <div className='w-32 h-32 bg-gray-200 rounded-xl grow shrink-0 overflow-hidden'>
                            {
                                place.photos.length > 0 && (
                                    <img className='w-full h-full object-cover' src={`http://localhost:8000/uploads/${place.photos[0]}`} alt="" />
                                )
                            }
                        </div>
                        <div className='grow-0 shrink'>
                            <h2 className='text-xl font-semibold'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>


                    </Link>
                ))}
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { Link } from 'react-router';

export default function IndexPage() {
    const [places, setPlaces] = useState([]);


    const fetchAllPlaces = async () => {
        try {
            const { data } = await axios.get("/places");
            console.log(data)
            setPlaces([...data,...data,...data,...data]);
        }
        catch (er) {
            console.log(er);
        }

    }

    useEffect(() => {
        fetchAllPlaces();
    }, [])
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8'>
            {places.length > 0 && places.map((place,i) => (
                <Link key={i} to={`/place/${place._id}`}>
                    <div className='bg-gray-500 rounded-2xl'>
                        {place.photos?.[0] && <img className='rounded-2xl aspect-square object-cover' src={`http://localhost:8000/uploads/${place.photos?.[0]}`} alt="" />}

                    </div>
                    <h2 className='text-sm font-semibold mt-2 truncate'>{place.title}</h2>
                    <h3 className='text-gray-500 text-sm'>{place.address}</h3>
                    <h4 className='text-sm mt-1'>
                        <span className='font-semibold'>₹{place.price}</span> per night</h4>
                </Link>
            ))}
        </div>
    )
}

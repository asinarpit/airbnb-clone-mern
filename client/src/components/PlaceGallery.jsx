import React, { useState } from 'react'

export default function PlaceGallery({place}) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);


    if (showAllPhotos) {
        return (
            <div className='fixed overflow-y-auto bg-black min-w-full min-h-screen inset-0 p-8'>

                <div >
                    <h2 className='text-3xl text-white'>Showing photos of {place.title}</h2>
                    <button onClick={() => setShowAllPhotos(false)} className='fixed right-12 top-8 flex gap-1 items-center px-4 py-2 rounded-3xl shadow-sm text-sm font-semibold bg-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        Close</button>
                </div>

                <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4 my-4 '>

                    {
                        place?.photos?.length > 0 && place.photos.map((photo, i) => (
                            <div className='rounded-xl overflow-hidden' key={i}>
                                <img src={`http://localhost:8000/uploads/${photo}`} alt="" />
                            </div>
                        ))
                    }

                </div>


            </div>
        )
    }

    return (
        <div className='relative'>
            <div className='grid grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden'>
                <div >
                    {
                        place.photos?.[0] && <img onClick={() => setShowAllPhotos(true)} className='object-cover aspect-square cursor-pointer' src={`http://localhost:8000/uploads/${place.photos[0]}`} alt="" />
                    }

                </div>
                <div className='grid box-border'>
                    <div>
                        {
                            place.photos?.[1] && <img onClick={() => setShowAllPhotos(true)} className='object-cover aspect-square cursor-pointer' src={`http://localhost:8000/uploads/${place.photos[1]}`} alt="" />
                        }

                    </div>

                    <div className='overflow-hidden'>
                        {
                            place.photos?.[2] && <img onClick={() => setShowAllPhotos(true)} className='relative top-2 object-cover aspect-square  cursor-pointer' src={`http://localhost:8000/uploads/${place.photos[2]}`} alt="" />
                        }

                    </div>

                </div>

            </div>
            <button onClick={() => setShowAllPhotos(true)} className='absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl text-sm font-semibold shadow-md shadow-gray-500 flex gap-1 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                </svg>
                Show more photos</button>
        </div>
    )
}

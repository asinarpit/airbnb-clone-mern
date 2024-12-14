import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import Perks from '../components/Perks';
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);


    const inputHeaderText = (text) => {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }
    const inputDescriptionText = (text) => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )

    }

    const preInput = (header, description) => {
        return (
            <>
                {inputHeaderText(header)}
                {inputDescriptionText(description)}
            </>
        )
    }


    const addPhotoByLink = async (ev) => {
        ev.preventDefault();
        try {
            const { data: filename } = await axios.post("/upload-by-link", { link: photoLink });
            setAddedPhotos(prev => [...prev, filename]);
            setPhotoLink('');
        } catch (error) {
            console.log(error);
        }

    }

    const uploadPhoto = async(ev) =>{
        ev.preventDefault();
        const files = ev.target.files;
        console.log(files);
        const data = new FormData();
        Array.from(files).forEach((file) => {
            data.append('photos', file);
        });
        try{
            const {data:filename} = await axios.post('/upload',data,{
                headers:{'Content-Type':"multipart/form-data"}
            });
            setAddedPhotos(prev=>[...prev,filename]);
            console.log(filename);

        } catch(error){
            console.log(error);
        }

    }


    return (
        <div>
            {
                action !== "new" && (
                    <div className='text-center'>
                        <Link className='inline-flex gap-1 items-center bg-primary text-white py-2 px-4 rounded-full' to="/account/places/new"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>Add new place
                        </Link>

                    </div>

                )
            }


            {
                action === "new" && (
                    <form>
                        {preInput('Title', 'Title for your place, should be short and catchy as in advertisement')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title, for example:My lovely apt' />

                        {preInput('Address', 'Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev => ev.target.value)} placeholder='address' />

                        {preInput('Photos', 'more = better')}
                        <div className='flex items-center gap-1'>
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder='Add using a link...jpeg' />
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 whitespace-nowrap py-2 rounded-full '>Add photo</button>
                        </div>

                        <div className='grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2'>
                            {
                                addedPhotos.length > 0 && addedPhotos.map((link,i) => (
                                    <div key={i}>
                                        <img className='rounded-2xl' src={`http://localhost:8000/uploads/${link}`} alt="" />
                                    </div>
                                ))
                            }

                            <label className='cursor-pointer border flex items-center justify-center gap-1 bg-transparent rounded-2xl p-8 text-2xl text-gray-600 '>
                                <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>
                                Upload </label>
                        </div>

                        {preInput('Description', 'Description of the place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                        {preInput('Perks', 'Select all the perks of your place')}
                        <Perks selected={perks} onChange={setPerks} />

                        {preInput('Extra Info', 'house rules, etc.')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                        {preInput('Check in&out times, max guests', 'add check in and checkout times')}

                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 mb-1'>Check in time</h3>
                                <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="text" placeholder='14:00' />

                            </div>
                            <div>
                                <h3 className='mt-2 mb-1'>Checkout time</h3>
                                <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text" placeholder='16:00' />

                            </div>
                            <div>
                                <h3 className='mt-2 mb-1'>Max number of guests</h3>
                                <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="text" />

                            </div>


                        </div>


                        <button className='primary my-4'>Save</button>




                    </form>
                )
            }

        </div>
    )
}

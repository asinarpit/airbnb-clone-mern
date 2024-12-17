import React, { useEffect, useState } from 'react'
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';
import Perks from "../components/Perks"
import { useNavigate, useParams } from 'react-router';
import AccountNav from '../components/AccountNav';


export default function PlacesFormPage() {
    const { id } = useParams();
    console.log({ id });
    const [title, setTitle] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState('');

    const navigate = useNavigate();


    const fetchPlaceById = async () => {
        try {

            const { data } = await axios.get(`/places/${id}`);
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setExtraInfo(data.extraInfo);
            setPerks(data.perks);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        } catch (er) {
            console.log(er);
        }

    }

    useEffect(() => {
        if (!id) {
            return;
        }
        else {
            fetchPlaceById();
        }

    }, [])


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


    const savePlace = async (ev) => {
        ev.preventDefault();
        const placeData = { title, address, perks, addedPhotos, description, extraInfo, checkIn, checkOut, maxGuests,price };
        try {
            if(id) {
                await axios.put("/places",{id, ...placeData});
                navigate(`/account/places`);
            }
            else {
                await axios.post("/places", placeData);
                navigate(`/account/places`);
            }

        } catch (er) {
            console.log(er);
        }

    }

    return (
        <div>
            <AccountNav />

            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place, should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title, for example:My lovely apt' />

                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address' />

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />



                {preInput('Description', 'Description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                

                {preInput('Perks', 'Select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks} />

                {preInput('Extra Info', 'house rules, etc.')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check in&out times, max guests', 'add check in and checkout times')}

                <div className='grid gap-2 sm:grid-cols-4'>
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
                    <div>
                        <h3 className='mt-2 mb-1'>Price per night</h3>
                        <input value={price} onChange={ev => setPrice(ev.target.value)} type="text" />

                    </div>


                </div>


                <button className='primary my-4'>Save</button>




            </form>
        </div>
    )
}

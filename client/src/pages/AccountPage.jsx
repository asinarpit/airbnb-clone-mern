import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link, useParams, useNavigate } from 'react-router';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  let { subpage } = useParams();
  console.log(subpage);

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const logout = async () => {
    await axios.post('/logout');
    setUser(null);
    navigate('/');
  };

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!ready || (!user && !navigate)) {
    navigate('/login');
    return null;
  }



  return (
        <div>
          <AccountNav />
          <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email})
            <button onClick={logout} className="primary mt-2 max-w-sm">
              Logout
            </button>
          </div>
        </div>
  );
}

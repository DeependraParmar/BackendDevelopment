import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from './Loader';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const {user, isAuthenticated,loading} = useContext(Context);

  if(!isAuthenticated){
    toast.error("Login to see your Profile Page");
    return <Navigate to='/login' />
  }
  return (
    loading ? <Loader /> : (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>

      </div>
    )
  )
}

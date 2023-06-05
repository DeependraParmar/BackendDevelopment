import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Context, server } from './main'

export default function App() {
  const { setUser, setIsAuthenticated,setLoading} = useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios.get(`${server}users/me`, {withCredentials: true}).then((res) => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })
  }, []);



  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster />
      </Router>

    </>
  )
}


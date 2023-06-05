import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { server } from '../main';
import { toast } from 'react-hot-toast';
import { Context } from '../main';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const { data } = await axios.post(`${server}users/register`, { name, email, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
    catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }
  const showPassword = () => {
    const password = document.getElementById('password');
    if (password.type === 'password') {
      password.type = 'text';
    }
    else {
      password.type = 'password';
    }
  }
  if (isAuthenticated) return <Navigate to={'/'} />
  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder='Name here' id="" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder='Email here' id="" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder='Password here' id="password" required />
          <input type="checkbox" name="" id="" onClick={showPassword}/>
          <label htmlFor="">Show Password</label>
          <button disabled={loading} type="submit">Sign Up</button>
          <h4>or</h4>
          <Link to={'/login'}>Login</Link>
        </form>
      </section>
    </div>
  )
}

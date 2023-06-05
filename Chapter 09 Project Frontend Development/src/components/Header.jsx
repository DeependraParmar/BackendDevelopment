import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { RiTodoFill } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogIn, BiLogOut, BiUser } from 'react-icons/bi';
import logo from '../assets/logo.png';

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}users/logout`, {

        withCredentials: true
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
    catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      setIsAuthenticated(true);
      setLoading(false);
    }
  }

  return (
    <nav className='header'>
      <div>
        <h2><img src={logo} alt="" /></h2>
      </div>
      <article>
        <Link to={'/'} title='Home'>Home<AiOutlineHome /></Link>
        <Link to={'/profile'} title='Profile'>Profile<BiUser /></Link>
        {
          isAuthenticated ? <button disabled={loading} title='Logout' onClick={logoutHandler} className='btn'>Logout<BiLogOut /></button> : <Link to={'/login'} title='Login'>Login<BiLogIn/></Link>
        }
      </article>
    </nav>
  )
}

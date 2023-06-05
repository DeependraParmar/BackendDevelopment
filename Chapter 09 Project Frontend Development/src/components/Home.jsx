import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TodoItem from './TodoItem';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { loading, setLoading } = useContext(Context);
  const [tasks, setTasks ] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {isAuthenticated} = useContext(Context);


  const updateHandler = async(id) => {
    try{
      setLoading(true);
      await axios.put(`https://todoapp-1qw2.onrender.com/api/v1/task/${id}`, {}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      }).then((res) => {
        toast.success(res.data.message);
        setLoading(false);
        setRefresh(refresh => !refresh);
      }).catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      })
    }
    catch(error){
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const deleteHandler = async(id) => {
    setLoading(true);
    try {
      await axios.delete(`https://todoapp-1qw2.onrender.com/api/v1/task/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      }).then((res) => {
        toast.success(res.data.message);
        setRefresh(refresh => !refresh);
        setLoading(false);
      }).catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      })
    }
    catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const submitHandler = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const { data } = await axios.post(`${server}task/new`, { title, description }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh(refresh => !refresh);
      setTitle('');
      setDescription('');
      setLoading(false);
    }
    catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    axios.get(`https://todoapp-1qw2.onrender.com/api/v1/task/all`, { withCredentials: true }).then((res) => {
      setTasks(res.data.tasks);
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  }, [refresh]);

  if(!isAuthenticated) return <Navigate to='/login' />
  return (
    <div className='container'>
      <div className='login'>
        <section>
          <form action="" onSubmit={submitHandler}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder='Title here' id="" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder='Description here' id="" />

            <button disabled={loading} type="submit">Add Task</button>
          </form>
        </section>
      </div>
      <section className='todosContainer'>
        {
          tasks.map((i) => (
              <TodoItem key={i._id} title={i.title} description={i.description} isCompleted = {i.isCompleted} updateHandler = {updateHandler} deleteHandler={deleteHandler} id={i._id} />
          ))
        }
      </section>
    </div>
  )
}

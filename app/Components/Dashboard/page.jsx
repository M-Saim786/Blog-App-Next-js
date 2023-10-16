"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { Box, InputLabel, OutlinedInput, TextField } from '@mui/material'
import Sidebar from '../Sidebar/page'
import { BiPencil } from 'react-icons/bi'
import { FiSearch } from 'react-icons/fi'
import Image from 'next/image';
import Loader from '../../Assests/loader.gif'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FaBloggerB } from 'react-icons/fa'
import { FaRegCommentDots } from 'react-icons/fa'


function Dashboard() {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('ID')) {
      router.push("/")
    }
    else {
      router.push("/Components/Dashboard")
    }

  }, [])

  const [Note, setNote] = useState('')

  const bgColors = ['#64CCC5', '#45FFCA', '279EFF', '#EEE0C9']
  const [Color, setColor] = useState('')
  const [AllBlogs, setAllBlogs] = useState([])
  const [Myblog, setMyblog] = useState([])
  const GetNote = () => {
    // const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/Api/Blog',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setAllBlogs(response.data.data)
        console.log(AllBlogs)
      })
      .catch((error) => {
        console.log(error);
      });


  }
  const MyBlogs = () => {
    // const axios = require('axios');
    // axios
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/Api/Blog',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        let myblog = []
        console.log(response.data);
        for (const i of response.data.data) {
          if (i.userId === localStorage.getItem('ID')) {
            myblog.push(i)
            setMyblog(myblog)
            console.log(Myblog)
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });


  }
  useEffect(() => {
    GetNote()
    MyBlogs()

  }, [])






  return (
    <>
      <div className='flex '>

        <Sidebar />
        <div className='block w-full'>
          <div>
            <h1 className='text-3xl' style={{ fontFamily: 'outfit', margin: '10px', fontWeight: 'bold' }}>
              Welcome to  Saffron<span>Sunsets </span>
            </h1>

            <Typography sx={{ m: 2, fontFamily: 'outfit', textAlign: 'left' }}>
              Where thoughts take flight, in SaffronSunsets&apos;s light
            </Typography>

            <Box className=' flex  justify-center' sx={{ flexWrap: 'wrap' ,mt:2}}>
              <Box className='border p-3 m-2 rounded-lg relative ' sx={{ height: '30vh', width: { lg: '30%', md: '40%', sm: '60%', xs: '80%', backgroundColor: Color, fontFamily: 'outfit' } }}>
                <h1 className='text-5xl'>
                  {AllBlogs.length}
                </h1>
                <h3 className='mt-2 mx-1 font-bold'>
                  {/* {note.desc} */}
                  All Blogs
                </h3>
                <FaBloggerB className='text-blue-400 text-4xl absolute right-4 top-3' />
              </Box>
              <Box className='border p-3 m-2 rounded-lg relative ' sx={{ height: '30vh', width: { lg: '30%', md: '40%', sm: '60%', xs: '80%', backgroundColor: Color, fontFamily: 'outfit' } }}>
                <h1 className='text-5xl'>
                  {Myblog.length}
                </h1>
                <h3 className='mt-2 mx-1 font-bold' >
                  {/* {note.desc} */}
                  My Blogs
                </h3>
                <FaBloggerB className='text-blue-400 text-4xl absolute right-4 top-3' />
              </Box>
              <Box className='border p-3 m-2 rounded-lg relative ' sx={{ height: '30vh', width: { lg: '30%', md: '40%', sm: '60%', xs: '80%', backgroundColor: Color, fontFamily: 'outfit' } }}>
                <h1 className='text-5xl'>
                  {40}
                </h1>
                <h3 className='mt-2 mx-1 font-bold'>
                  {/* {note.desc} */}
                  Comments
                </h3>
                <FaRegCommentDots className='text-blue-400 text-4xl absolute right-4 top-3' />
              </Box>


            </Box>
          </div>


        </div>




      </div>
    </>
  )
}

export default Dashboard

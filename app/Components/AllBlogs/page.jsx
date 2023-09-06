"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './style.css'
import { BiPencil } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import Image from 'next/image';
import Loader from '../../Assests/loader.gif'
import Sidebar from '../Sidebar/page';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Box } from '@mui/material';
import { TextField } from '@mui/material'
function page() {
    const router = useRouter()
    const [Active, setActive] = useState(false)
    // useRouter
    const [AllBlogs, setAllBlogs] = useState([])
    const GetNote = () => {
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
                console.log(response.data);
                setAllBlogs(response.data.data)
                console.log(AllBlogs)
            })
            .catch((error) => {
                console.log(error);
            });


    }
    useEffect(() => {
        GetNote()

    }, [])
    const EditNote = (id) => {
        console.log(id)
        router.push(`/Components/AllBlogs/${id}`)
    }
    const DeleteBlog = (id) => {
        // const axios = require('axios');

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/Api/Blog/${id}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                if (response.data.data.status === true) {
                    Swal.fire('Success', response.data.message, 'success')
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const toggleDarkMode = () => {
        setActive(true)
    }

    const [Search, setSearch] = useState('')

    // Search
    const SearchNote = (e) => {
        console.log('Search ')
        // const axios = require('axios');
        let data = JSON.stringify({
            "title": e.target.value
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/Api/SearchNote',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                setAllBlogs(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }


    return (
        <div className='flex'>
            <Sidebar />
            <div style={{ width: '100%',  }}>

                <Box className='w-full flex justify-between items-center' sx={{ borderBottom: '2px solid #E1E1E6' }}>
                    <Box className='' sx={{ ml: 3 }}>
                        <TextField
                            id="standard-search"
                            label="Search Blog"
                            type="search"
                            variant="standard"
                            onChange={(e) => SearchNote(e)}
                        />
                        {/* <button onClick={SearchNote}>
                <FiSearch />
              </button> */}
                    </Box>

                    <div className=' flex'>
                        <label id="theme-toggle-button" >
                            <input type="checkbox" id="toggle" style={{ border: '2px solid red' }} onClick={() => toggleDarkMode()} />
                            <svg viewBox="0 0 69.667 44" xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" style={{ display: 'flex', alignItems: 'center', height: '8vh' }}>
                                <g transform="translate(3.5 3.5)" data-name="Component 15 – 1" id="Component_15_1" >


                                    <g filter="url(#container)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
                                        <rect fill="#83cbd8" transform="translate(3.5 3.5)" rx="17.5" height="35" width="60.667" data-name="container" id="container"></rect>
                                    </g>

                                    <g transform="translate(2.333 2.333)" id="button">

                                        <g data-name="sun" id="sun">
                                            <g filter="url(#sun-outer)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                                                <circle fill="#f8e664" transform="translate(5.83 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="sun-outer" id="sun-outer-2"></circle>
                                            </g>
                                            <g filter="url(#sun)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                                                <path fill="rgba(246,254,247,0.29)" transform="translate(9.33 9.33)" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z" data-name="sun" id="sun-3"></path>
                                            </g>
                                            <circle fill="#fcf4b9" transform="translate(8.167 8.167)" r="7" cy="7" cx="7" id="sun-inner"></circle>
                                        </g>


                                        <g data-name="moon" id="moon">
                                            <g filter="url(#moon)" transform="matrix(1, 0, 0, 1, -31.5, -5.83)">
                                                <circle fill="#cce6ee" transform="translate(31.5 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="moon" id="moon-3"></circle>
                                            </g>
                                            <g fill="#a6cad0" transform="translate(-24.415 -1.009)" id="patches">
                                                <circle transform="translate(43.009 4.496)" r="2" cy="2" cx="2"></circle>
                                                <circle transform="translate(39.366 17.952)" r="2" cy="2" cx="2" data-name="patch"></circle>
                                                <circle transform="translate(33.016 8.044)" r="1" cy="1" cx="1" data-name="patch"></circle>
                                                <circle transform="translate(51.081 18.888)" r="1" cy="1" cx="1" data-name="patch"></circle>
                                                <circle transform="translate(33.016 22.503)" r="1" cy="1" cx="1" data-name="patch"></circle>
                                                <circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5" data-name="patch"></circle>
                                            </g>
                                        </g>
                                    </g>


                                    <g filter="url(#cloud)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
                                        <path fill="#fff" transform="translate(-3466.47 -160.94)" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z" data-name="cloud" id="cloud"></path>
                                    </g>


                                    <g fill="#def8ff" transform="translate(3.585 1.325)" id="stars">
                                        <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z"></path>
                                        <path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" data-name="star"></path>
                                        <path transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z" data-name="star"></path>
                                        <path transform="translate(12.677 0.388) rotate(104)" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z" data-name="star"></path>
                                        <path transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z" data-name="star"></path>
                                        <path transform="translate(8.326 28.061) rotate(11)" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z" data-name="star"></path>
                                        <path transform="translate(5.012 5.962) rotate(172)" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z" data-name="star"></path>
                                        <path transform="translate(2.218 14.616) rotate(169)" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z" data-name="star"></path>
                                    </g>
                                </g>
                            </svg>
                        </label>
                    </div>
                </Box>

                <div style={{  }}>
                    <div>
                        <h1 className='m-3 text-4xl'>
                            All Blogs
                        </h1>
                    </div>

                    <div className=' flex ' style={{ flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>

                        {
                            AllBlogs.length <= 0 ?
                                <>
                                    <Image src={Loader} width={100} height={100} style={{ width: '100%', height: '40vh' }} />
                                    <Image src={Loader} width={100} height={100} style={{ width: '100%', height: '40vh' }} /></> :
                                AllBlogs.map((note, index) => {
                                    return (
                                        <>
                                            {
                                                note.title === '' || note.desc === '' ?
                                                    '' : <Box className='border p-3 m-2 rounded-lg relative ' sx={{ height: 'auto', width: { lg: '80%', md: '40%', sm: '60%', xs: '80%' }, fontFamily: 'outfit' }}>
                                                        <Image src={note.blogImg} width={100} height={30} style={{ width: '40%', height: '30vh' }} />
                                                        <div>
                                                            <h1 className='text-xl'>
                                                                {note.title}
                                                            </h1>
                                                            <h3>
                                                                {note.desc}
                                                            </h3>
                                                        </div>

                                                        <div className='mt-10'>
                                                            <h5>
                                                                Dated
                                                            </h5>
                                                            <h2 className=''>
                                                                {note.createdAt}
                                                            </h2>
                                                        </div>
                                                    </Box>

                                            }

                                        </>
                                    )
                                })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

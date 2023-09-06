"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box, Input, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { BiPencil } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import Image from 'next/image';
import Loader from '../../Assests/loader.gif'
import Sidebar from '../Sidebar/page';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { AiOutlineClose } from 'react-icons/ai'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import '../AllBlogs/style.css'
// import { Textarea } from '@mui/base/Textarea';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function page() {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                let myblog = []
                console.log(response.data);
                for (const i of response.data.data) {
                    if (i.userId === localStorage.getItem('ID')) {
                        myblog.push(i)
                        setAllBlogs(myblog)
                        console.log(AllBlogs)
                    }
                }
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
        router.push(`/Components/MyBlogs/${id}`)
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
                if (response.data.status === true) {
                    Swal.fire('Success', response.data.message, 'success')
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const [Title, setTitle] = useState('')
    const [Desc, setDesc] = useState('')
    const [BlogImg, setBlogImg] = useState('')
    const [Img, setImg] = useState('')
    const handleBlogImg = () => {
        // setImg(e.target.files[0])
        console.log(Img)

        if (Img) {
            let reader = new FileReader()
            reader.readAsDataURL(Img)
            reader.onload = () => {
                setBlogImg(reader.result)
            }
        }
    }

    const [addBlog, setaddBlog] = useState(false)

    const AddBlog = () => {
        // alert(Note)
        let id = localStorage.getItem('ID')
        console.log(id)
        handleBlogImg()
        // const axios = require('axios');
        let data = JSON.stringify({
            "title": Title,
            "desc": Desc,
            "blogImg": BlogImg,
            "userId": id
        });
        console.log(data)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/Api/Blog',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };


        axios.request(config)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === true) {
                    Swal.fire("Success", response.data.message, 'success')
                    setaddBlog(false)
                }
                else {
                    Swal.fire("Error", response.data.message, 'error')
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", error.message, 'error')
            });

    }
    return (
        <div className='flex'>
            <Sidebar />
            <div style={{ width: '100%', fontFamily: 'Roboto' }}>



                <div className='w-full flex justify-between items-center' style={{ borderBottom: '2px solid #E1E1E6' }}>
                    <Box className='' sx={{ ml: 3 }}>
                        <TextField
                            id="standard-search"
                            label="Search Blog"
                            type="search"
                            variant="standard"
                            onChange={(e) => SearchNote(e)}
                        />
                    </Box>

                    <div className=' flex'>
                        <label id="theme-toggle-button" >
                            <input type="checkbox" id="toggle" style={{ border: '2px solid red' }} />
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
                </div>


                <div>

                    <div className='flex justify-between '>
                        <h1 className='m-3 text-4xl'>
                            My Blogs
                        </h1>

                        <Button onClick={() => setaddBlog(true)} className=' bg-blue-400 capitalize text-white hover:bg-sky-700' sx={{ height: '7vh', width:'8%',mt:2 ,mr:4 }}>Add Blog</Button>
                        {/* Tis is modl */}
                    </div>
                    <Box sx={{ width: '100%', height: `${addBlog === true ? 'auto' : '0px'}`, overflowY: 'hidden', transition: 'all 1s ease', padding: `${addBlog === true ? '10px' : '0px'}`, }}>
                        <Box className='flex justify-between'>

                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '30px', m: 2 }}>
                                Add Blog
                            </Typography>
                            <Typography className='mr-4 mt-5' sx={{ color: '#E75C62', cursor: 'pointer' }} onClick={() => setaddBlog(false)}>
                                <AiOutlineClose />
                            </Typography>
                        </Box>
                        <Box sx={{ width: '60%', margin: '10px auto' }}>
                            <Box>

                                <InputLabel sx={{ fontWeight: 'bold', my: 2 }}>
                                    Blog Title
                                </InputLabel>
                                <OutlinedInput onChange={(e) => setTitle(e.target.value)} sx={{ width: '75%', height: '7vh' }} />
                                <InputLabel sx={{ fontWeight: 'bold', my: 2 }}>
                                    Blog Desc
                                </InputLabel>

                                <TextareaAutosize className='border rounded-sm p-1 w-9/12'
                                    minRows={4}
                                    maxRows={8}
                                    placeholder='Enter blog desc'
                                    onChange={(e) => setDesc(e.target.value)}
                                // sx={{width:'70%'}}
                                />


                                <InputLabel sx={{ fontWeight: 'bold', my: 2 }}>
                                    Blog Img
                                </InputLabel>
                                {/* <input type='file' /> */}
                                <input type="file" name="" id=""
                                    onChange={(e) => setImg(e.target.files[0])}
                                    style={{ width: '75%', height: '7vh' }}
                                />
                            </Box>
                            <Box sx={{ position: 'relative', height: '8vh' }}>

                                <Button variant='contained' className='border-1 bg-blue-500 hover:bg-sky-700 capitalize absolute right-2'
                                    onClick={() => AddBlog()}
                                >
                                    Add Blog
                                </Button>
                            </Box>
                        </Box>
                    </Box>


                    <div className=' flex justify-center' style={{ flexWrap: 'wrap' }}>

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
                                                    '' : <Box className='border p-3 m-2 rounded-lg relative ' sx={{ height: 'auto', width: { lg: '80%', md: '40%', sm: '60%', xs: '80%' }, fontFamily: 'Roboto', margin: '5px auto' }}>
                                                        <Image src={note.blogImg} width={100} height={30} style={{ width: '90%', height: '40vh', margin: '5px auto', borderRadius: '5px' }} />
                                                        <Box sx={{ mb: 6, mt: 2, fontFamily: 'Roboto', width: '90%', margin: '5px auto' }}>
                                                            <h1 className='text-xl my-2' style={{ fontWeight: 'Bold' }}>
                                                                {note.title}
                                                            </h1>
                                                            <h3>
                                                                {note.desc}
                                                            </h3>
                                                        </Box>
                                                        <Box sx={{}}>

                                                            <div className='mt-10'>
                                                                <h5 style={{ color: '#9EA3AE' }}>
                                                                    Dated
                                                                </h5>
                                                                <h2 className=''>
                                                                    {note.createdAt.slice(0, 10)}
                                                                </h2>
                                                            </div>
                                                            <div className='absolute right-2 bottom-3 '>

                                                                <button onClick={() => EditNote(note._id)} className='bg-sky-900 rounded-full p-2  mr-2'>
                                                                    <BiPencil size={20} color='white' />
                                                                </button>


                                                                <button className='bg-red-500 rounded-full p-2 text-white' onClick={() => DeleteBlog(note._id)}>
                                                                    <MdDeleteOutline size={20} color='white' />
                                                                </button>
                                                            </div>
                                                        </Box>
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

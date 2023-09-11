"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
function page({ params }) {
    // console.log(params.blogId)
    const router = useRouter()
    const [Blog, setBlog] = useState('')
    const [Title, setTitle] = useState(Blog.title)
    const [Desc, setDesc] = useState(Blog.desc)
    const [BlogImg, setBlogImg] = useState('')
    const GetNote = () => {
        // const axios = require('axios');
        // axios
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/Api/Blog',
            headers: {}
        };
        // axios
        axios.request(config)
            .then((response) => {
                console.log(response.data);
                for (const i of response.data.data) {
                    if (i._id === params.blogId) {
                        console.log(i)
                        setBlog(i)
                    }
                }
                // setAllBlogs(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });


    }
    useEffect(() => {
        GetNote()

    }, [])
    const [Img, setImg] = useState("")
    const handleBlogImg = (e) => {
        if (Img) {
            console.log(Img)


            const reader = new FileReader()
            reader.readAsDataURL(Img)
            reader.onload = () => {
                let imgUrl = reader.result
                console.log(imgUrl)
                setBlogImg(imgUrl)
                console.log(BlogImg)
            }
        }
    }

    const SaveEdit = () => {
        handleBlogImg()
        if (BlogImg) {


            // const axios = require('axios');
            let data = JSON.stringify({
                "title": Title,
                "desc": Desc,
                "blogImg": BlogImg
            });
            console.log(data)

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/Api/Blog/${params.blogId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status === true) {
                        Swal.fire('Success', response.data.message, 'success')
                        setTimeout(() => {
                            router.push('/Components/MyBlogs')
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire("Error", error.message, 'error')
                });

        }
    }
    return (
        <div>
            <div className='flex justify-start'>
                <Link href={'/Components/MyBlogs'} className='m-8 text-sky-500' >
                    Go Back
                </Link>
                <h1 className='text-5xl mt-3'>
                    Edit Your Blog Here...!
                </h1>

            </div>
            <div style={{ width: '50%', margin: '10px auto', }}>
                <h1 className='text-2xl mb-2'>
                    Blog Title
                </h1>
                <input type="text" name="" id="" value={Title} onChange={(e) => setTitle(e.target.value)} className=' p-1' style={{
                    fontSize: '20px',
                    borderRadius: '5px',
                    border: '1px solid gray',
                    paddingLeft: '5px',
                    width: '70%'
                }} />

                <h1 className='text-2xl my-2'>
                    Blog Description
                </h1>
                <textarea type="text" name="" id="" value={Desc} onChange={(e) => setDesc(e.target.value)} className='' style={{
                    fontSize: '20px',
                    borderRadius: '5px',
                    border: '1px solid gray',
                    paddingLeft: '10px',
                    width: '70%',
                    height: '30vh'
                }} ></textarea>


                <input type="file" name="" id="" onChange={(e) => setImg(e.target.files[0])} />
                {/* <button onClick={handleBlogImg}>
                    uPLOAD IMG
                </button> */}

                <div className=' my-3'>
                    <Button className=' capitalize hover:bg-blue-500 my-6 bg-blue-300 text-white px-3 py-1 rounded-sm' style={{ width: '20%', border: '2px solid rgb(19 116 225)' }} onClick={SaveEdit}>
                        Save
                    </Button>
                    {/* <Button */}
                </div>
            </div>
        </div>
    )
}

export default page

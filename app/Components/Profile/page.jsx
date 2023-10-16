"use client"

import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/page'
import axios from 'axios'
import { Box, Button, Grid, Input, InputLabel, OutlinedInput } from '@mui/material'
import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash } from 'react-icons/bs';
import Swal from 'sweetalert2'
import Image from 'next/image'
import { AiOutlinePlus } from 'react-icons/ai'
function Profile() {
    const [User, setUser] = useState([])
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Name, setName] = useState('')
    const [ImgUrl, setImgUrl] = useState('')
    const [Img, setImg] = useState('')


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleProfile = () => {
        if (Img) {
            let reader = new FileReader()
            reader.readAsDataURL(Img)
            reader.onload = () => {
                console.log(reader.result)
                return setImgUrl(reader.result)
            }
        }
    }

    const UpdateProfile = () => {
        handleProfile()
        let data = JSON.stringify({
            "name": Name,
            "email": Email,
            "password": Password,
            "image": ImgUrl
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/Api/GetUserApi/${localStorage.getItem("ID")}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log((response.data));
                if (response.data.status === true) {
                    Swal.fire("Success", response.data.message, 'success')
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

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/Api/GetUserApi',
            headers: {}
        };
        // axios
        axios.request(config)
            .then((response) => {
                let id = localStorage.getItem("ID")
                console.log(id)
                console.log(response.data);
                for (const i of response.data.data) {
                    if (i._id === id) {
                        setUser(i)
                        setName(i.name)
                        setEmail(i.email)
                        setPassword(i.password)
                        setImgUrl(i.image)
                        console.log(i)
                        // console.log(User)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <Box className='flex w-full' >
            <Sidebar />
            <Box sx={{ width: '100%' }}>
                <h1 className='m-4 text-4xl'>
                    Profile Update
                </h1>
                <Box sx={{ width: '50%', margin: '10px auto', position: 'relative', }}>

                    <Box sx={{ display: 'flex', justifyContent: 'right', }}>
                        <Box sx={{ right: '10px' }}>
                            <Image src={ImgUrl} alt={'Avatar'} width={150} height={150} style={{ border: '1px solid gray', borderRadius: '50%', background: 'transparent' }} />
                            <InputLabel htmlFor='avatar' sx={{ border: '1px solid #9EA3AE', borderRadius: '50%', width: 'fit-content', p: 1, position: 'absolute', top: '7rem', right: '-4px' }}>
                                <AiOutlinePlus />
                            </InputLabel>
                            <Input type="file" name="" id="avatar" sx={{ display: 'none' }} onChange={(e) => setImg(e.target.files[0])} />
                        </Box>
                    </Box>
                    <Box>
                        <Box container item spacing={2} sx={{ margin: '10px auto' }} >
                            <Box item sx={{ width: { lg: '40%', md: '50%', sm: '70%', xs: '100%' }, mt: 4 }}>
                                <InputLabel sx={{ my: 1 }}>
                                    Name
                                </InputLabel>
                                <OutlinedInput placeholder='Name' value={Name}
                                    onChange={(e) => setName(e.target.value)} fullWidth />
                            </Box>
                            <Box item sx={{ width: { lg: '40%', md: '50%', sm: '70%', xs: '100%' }, mt: 4 }}>
                                <InputLabel sx={{ my: 1 }}>
                                    Email
                                </InputLabel>
                                <OutlinedInput placeholder='Email' value={Email}
                                    onChange={(e) => setEmail(e.target.value)} fullWidth />
                            </Box>
                            <Box item sx={{ width: { lg: '40%', md: '50%', sm: '70%', xs: '100%' }, mt: 4 }}>
                                <InputLabel htmlFor="outlined-adornment-password"> Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <BsEyeSlash /> : <AiOutlineEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={Password}
                                    label="Password"
                                    fullWidth
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                        <Button className='rounded w-36 bg-blue-500 p-2 text-white capitalize hover:bg-blue-600' onClick={UpdateProfile}>
                            Update Profile
                        </Button>
                    </Box>


                </Box>
            </Box>
        </Box >
    )
}

export default Profile

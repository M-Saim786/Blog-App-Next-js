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
function page() {
    const [User, setUser] = useState([])
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Name, setName] = useState('')
    const [ImgUrl, setImgUrl] = useState('')
    const [Img, setImg] = useState('')
    useEffect(() => {
        // const axios = require('axios');

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
                        console.log(i)
                        console.log(User)
                    }
                }

            })
            .catch((error) => {
                console.log(error);
            });

        setName(User.name)
        setEmail(User.email)
        setPassword(User.password)
        setImgUrl(User.image)
    }, [])

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
              return  setImgUrl(reader.result)
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
    return (
        <Box className='flex w-full' >
            <Sidebar />
            <Box sx={{ width: '100%' }}>
                <h1 className='m-4 text-4xl'>
                    Profile
                </h1>
                <Box sx={{ width: '70%', margin: '10px auto', border: '1px solid red' }}>

                    <Box sx={{ border: '1px solid red', position: 'relative', display: 'flex', justifyContent: 'right' }}>
                        <Box sx={{ right: '10px   ' }}>

                            <Image src={ImgUrl} width={100} height={100} style={{ border: '1px solid green', borderRadius: '50%' }} />


                            <InputLabel htmlFor='avatar' sx={{ border: '1px solid #9EA3AE', borderRadius: '50%', width: 'fit-content', p: 1, position: 'absolute', top: '3rem', right: '2rem' }}>
                                <AiOutlinePlus />
                            </InputLabel>
                            <Input type="file" name="" id="avatar" sx={{ display: 'none' }} onChange={(e) => setImg(e.target.files[0])} />
                        </Box>
                    </Box>
                    <Box sx={{ width: '70%' }}>
                        <Grid container item spacing={2} >
                            <Grid item lg={'60%'} md={'60%'} sm={'80%'} xs={'90%'} >

                                <InputLabel sx={{ my: 1 }}>
                                    Name
                                </InputLabel>
                                <OutlinedInput placeholder='Name' value={Name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </Grid>
                            <Grid item lg={'60%'} md={'60%'} sm={'80%'} xs={'90%'}>
                                <InputLabel sx={{ my: 1 }}>
                                    Email
                                </InputLabel>
                                <OutlinedInput placeholder='Email' value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>

                            <Grid item lg={'50%'} md={'60%'} sm={'80%'} xs={'90%'}>
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
                                    label="Password"
                                />
                            </Grid>
                            <Grid item lg={'50%'} md={'60%'} sm={'80%'} xs={'90%'}>
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
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
                                    label="Password"
                                />
                            </Grid>
                        </Grid>

                    </Box>

                    <h2>
                        {User.email}
                        {User.password}
                    </h2>


                    <Button sx={{}} onClick={UpdateProfile}>
                        Update Profile
                    </Button>
                </Box>
            </Box>
        </Box >
    )
}

export default page

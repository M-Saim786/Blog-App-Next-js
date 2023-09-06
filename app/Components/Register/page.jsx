
"use client"
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Link from 'next/link';
import { Box, Button, Typography, InputLabel, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useRouter } from 'next/navigation';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Image from 'next/image';
import logo from '../../Assests/logo.png';
import Swal from 'sweetalert2';
function page() {
  const router = useRouter()
  const [UserName, setUserName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const handleRegister = (e) => {
    // e.preventDefault()
    if (UserName === '' || Email === '' || Password === '') {
      // router.push('/Components/Dashboard')
      Swal.fire('Error', 'Enter Data Correctly', 'error')

    } else {

      let data = JSON.stringify({
        "email": Email,
        "password": Password,
        "name": UserName
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/Api/Register/SignUp',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === false) {
            Swal.fire('Error', response.data.message, 'error')
          }
          else {
            Swal.fire('Success', response.data.message, 'success')
            localStorage.setItem("ID",response.data.data._id)

          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire('Success', error.message, 'success')

        });



    }
  }
  return (
    <>


      <Box sx={{
        // textAlign: 'center',
        height: '100vh'
      }} className='loginDiv'>
        <Box className='topLogo'>
          {/* <Image */}
          <Image src={logo} width={50} height={50} />
          <Typography variant='h4'>

            Solstice <span>Memo </span>
          </Typography>
        </Box>
        <Typography sx={{ my: 2, fontFamily: 'outfit' }}>
          Where thoughts take flight, in SolsticeMemo's light
        </Typography>

        <Box sx={{
          width: { lg: "40%", md: "45%", sm: "96%", xs: "96%" },
          height: "auto",
          boxShadow: "5px 5px 15px #aaaaaa",
          borderRadius: "10px 50px",
          backgroundColor: "white",
          // border: '1px solid red',
          // marginTop: { lg: "0", md: "0", sm: "4rem", xs: "4rem" },
          padding: '20px',
          margin: '10px auto'
          // margin:'10px'
        }}>

          <Box>
            <Typography
              sx={{ color: "#3c4257", fontSize: "26px", fontWeight: 600 }}
            >
              Register your account
            </Typography>
          </Box>
          <Box
            sx={{
              mt: "20px",
            }}
          >
            <InputLabel sx={{ mb: "10px", fontWeight: "bold" }}>
              Enter Name
            </InputLabel>
            <OutlinedInput
              sx={{ height: "50px" }}
              fullWidth
              type='email'
              margin='normal'
              // placeholder='Enter Name'
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              mt: "20px",
            }}
          >
            <InputLabel sx={{ mb: "10px", fontWeight: "bold" }}>
              Enter Email
            </InputLabel>
            <OutlinedInput
              sx={{ height: "50px" }}
              fullWidth
              type='email'
              // label='Enter Email'
              margin='normal'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: "20px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "10px",
              }}
            >
              <Box>
                <InputLabel sx={{ fontWeight: "bold" }}>
                  Enter Password
                </InputLabel>
              </Box>

            </Box>
            <OutlinedInput
              sx={{ height: "50px" }}
              fullWidth
              // type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                  </IconButton>
                </InputAdornment>
              }
              margin='normal'
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>


          <Box sx={{
            width: "100%",
            mt: "20px",
            // border:'1px solid red',
            textAlign: 'center'
          }}>
            <button className="rounded w-full bg-blue-500 p-2 text-white " onClick={() => handleRegister()}>Continue</button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              mt: "30px",
            }}
          >

            <Box>
              <Typography variant='body2'>
                Already have an account?
              </Typography>
            </Box>
            <Box>
              <Button
                variant='text'
                sx={{ textTransform: "capitalize" }}
              // onClick={router.push("/Components/Register")}
              >
                <Link href={'/'}>
                  Sign In
                </Link>
              </Button>
            </Box>
          </Box>

        </Box>

      </Box>
    </>
  )
}

export default page

"use client"
import React, { useEffect } from 'react'
import './style.css'
// import DashboardSidebar_icon from '@mui/Sidebar_icons-material/Dashboard';
// import    from 'next/';
import Logo from '../../Assests/logo.png'
// import Transaction from '../Transaction/Transaction';
import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SlLogout } from 'react-icons/sl'
import Avatar from "@mui/material/Avatar";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { Typography } from '@mui/material';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { CiLocationOn } from 'react-icons/ci'
// import Profile from '../../Assests/profile.png'
import { BsChevronDown } from 'react-icons/bs'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function Sidebar() {
  const router = useRouter()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [date, setdate] = React.useState('')

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [showBar, setshowBar] = React.useState(true)
  const hideSideBar = () => {

    setshowBar(false)
    if (showBar === false) {
      setshowBar(true)
    }
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const logOut = () => {
    localStorage.removeItem("ID")
    Swal.fire("Success", 'Logout Successfully..!', 'success')
    router.push('/')
  }



  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, border: '1px solid green', height: '100vh' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    // className='SideBar'

    >
      {/* <div className="logo" style={{ textAlign: 'center', marginTop: '20px' }}>
      </div> */}
      <List sx={{ border: '1px solid red', height: '95vh' }} >
        <ListItem>
          <ListItemButton sx={{
            padding: '20px', height: '5vh',
            borderRadius: '10px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            // border: '1px solid red',
          }}>
            back
          </ListItemButton>

        </ListItem>
        <ListItem >
          <ListItemButton sx={{
            padding: '20px', height: '5vh',
            borderRadius: '10px',
          }}>
            <ListItemIcon>
              {/* <span className='material-symbols-outlined' >
                                dashboard
                            </span> */}
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText >
              <Link href={'/Components/Dashboard'}>
                <h4>
                  Dashboard
                </h4>
              </Link>

            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{
            padding: '20px', height: '5vh',
            borderRadius: '10px',

          }}>
            <ListItemIcon>

              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText >
              <>
                <Link href={'/Components/AllBlogs'}>
                  <h4>
                    All Blogs
                  </h4>
                </Link>
              </>

            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{
            padding: '20px', height: '5vh',
            borderRadius: '10px',

          }}>
            <ListItemIcon>

              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText >
              <>
                <Link href={'/Components/MyBlogs'}>
                  <h4>
                    My Blogs
                  </h4>
                </Link>

              </>

            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton sx={{
            padding: '20px', height: '5vh',
            borderRadius: '10px',

          }}>
            <ListItemIcon>

              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText >
              <Link href={'/Components/Profile'}>

                <h4>
                  Profile
                </h4>
              </Link>

            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem className='absolute bottom-4  text-red-400' onClick={() => logOut()}>
          <ListItemButton>
            <ListItemIcon className='text-red-400'>
              <SlLogout />
            </ListItemIcon>

            <ListItemText>
              Logout
            </ListItemText>
          </ListItemButton>
        </ListItem>

      </List>

    </Box >
  );
  useEffect(() => {
    let date = new Date
    date = date.toString()
    console.log(date)
    setdate(date.slice(3, 15))

  }, [])


  return (
    <>
      <div className='expandMenu'>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <List className='expandMenuUl' >
              <ListItem >
                <Image src={Logo} alt="" style={{ width: '100%', height: '8vh' }} />
              </ListItem>
              <ListItem>
                <ListItemButton onClick={toggleDrawer(anchor, true)}>
                  <Button onClick={toggleDrawer(anchor, true)} >
                    {/* <Button> */}
                    <RxHamburgerMenu />
                  </Button>

                </ListItemButton>
              </ListItem>

            </List>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
              
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default Sidebar

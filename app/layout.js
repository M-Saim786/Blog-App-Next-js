import './globals.css'
import { Box, Button, Typography, InputLabel, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { Inter } from 'next/font/google'
import Image from 'next/image';
import logo from './Assests/logo.png'
import Sidebar from './Components/Sidebar/page';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Saffron Sunsets',
  description: 'This is a bloging website created using Next.js & MongoDb Atlas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 
 */}
        {/* <Sidebar /> */}
        {children}
      </body>
    </html>
  )
}

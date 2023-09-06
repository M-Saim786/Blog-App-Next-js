"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page({ params }) {
    const [Data, setData] = useState([])
    const [Value, setValue] = useState('')
    let note = []
    useEffect(() => {
        // const axios = require('axios');
        // axios
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/Api/Note',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.data);
                // console.log(response.data.data[0]._id)
                for (const i of response.data.data) {
                    console.log(i)
                    if (i._id === params.NoteId) {
                        console.log(i)
                        note.push(i)
                        console.log(note)
                        setData(note)
                        console.log(Data)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });


    }, [])
    const Save = () => {
        // alert(Value)
        // const axios = require('axios');
        let data = JSON.stringify({
            "title": Value
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/Api/Note/${params.NoteId}`,
            // headers: {
            //     'Accept': 'application/json, text/plain, */*',
            //     'Accept-Language': 'en-US,en;q=0.9',
            //     'Connection': 'keep-alive',
            //     'Cookie': '__stripe_mid=6d3205e4-26a4-4702-818a-bae50872473e8e6291',
            //     'Referer': 'http://localhost:3000/Components/Dashboard/64eedb14a32f029aa48b2023',
            //     'Sec-Fetch-Dest': 'empty',
            //     'Sec-Fetch-Mode': 'cors',
            //     'Sec-Fetch-Site': 'same-origin',
            //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
            //     'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
            //     'sec-ch-ua-mobile': '?0',
            //     'sec-ch-ua-platform': '"Windows"',
            //     'Content-Type': 'application/json'
            // },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div>
            this is id
            <button onClick={() => (console.log(params.NoteId))}>
                Clicks
            </button>
            <br />
            <input type="text" name="" id="" value={note.title} className='border' onChange={(e) => setValue(e.target.value)} />
            <button onClick={Save}>
                edit save
            </button>
        </div>
    )
}

export default page

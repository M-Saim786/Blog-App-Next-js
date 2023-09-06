// import { RegisterModel } from "@/app/Lib/Models/RegisterModel"
// import { ConnectUrl } from "@/app/Lib/db"
// import mongoose from "mongoose"
// import { NextResponse } from "next/server"

// // const [Data, setData] = useState([])
// export async function POST(request, config) {
//     let dataforPost = await request.json()
//     await mongoose.connect(ConnectUrl).then(() => {
//         console.log('Connected')
//         // console.log(Data)
//     })


//     if (dataforPost.UserName || dataforPost.Email || dataforPost.Password !== '') {
//         console.log(dataforPost)
//         let data = RegisterModel(dataforPost)
//         const RegisterData = await data.save()
//         return NextResponse.json({
//             data: RegisterData,
//             status: true
//         })
//     }
//     else {
//         return NextResponse.json({
//             data: 'Invalid Data',
//             status: false
//         })
//     }
// }



// // export function GETKICALL() {

'use client'
import RemoveBroadcast from '@/components/broadcast-management/remove-broadcast'
import { ThemeContext } from '@/components/context/themeContext'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import { StatusToast } from '@/components/toast'
import { TypeHTTP, api } from '@/utils/api/api'
import { formatDuration, parseISO8601Duration } from '@/utils/broadcast/time'
import axios from 'axios'
import { color } from 'chart.js/helpers'
import { log } from 'console'
import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'


const BroadcastManagement = () => {



    const [vietnameseSelectedFile, setVietnameseSelectedFile] = useState()
    const [englishSelectedFile, setEnglishSelectedFile] = useState()
    const [url, setUrl] = useState('')
    const { datas, handles } = useContext(ThemeContext) || {}
    const handleSubmit = async () => {




        const urlVideo = `https://www.youtube.com/watch?v=${url}`

        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${url}&key=${'AIzaSyDBJ0uR3jcjnJDB3BOZYW8eJvIkGVFjdlw'}&part=snippet,contentDetails,statistics,status`)


        const title = res.data.items[0].snippet.title
        const thum = res.data.items[0].snippet.thumbnails.maxres.url
        const duration = formatDuration(parseISO8601Duration(res.data.items[0].contentDetails.duration)).replace('00:', '')
        const channelName = res.data.items[0].snippet.channelTitle

        const formData = new FormData()
        if (englishSelectedFile && vietnameseSelectedFile) {
            formData.append('srtFiles', englishSelectedFile[0]);
            formData.append('srtFiles', vietnameseSelectedFile[0]);
        }
        formData.append('urlVideo', urlVideo);
        formData.append('title', title)
        formData.append('thum', thum)
        formData.append('duration', duration)
        formData.append('channelName', channelName)

        api({ path: '/broadcasts', type: TypeHTTP.POST, body: formData })
            .then(res => {
                const result: any = res
                handles?.setBroadCasts(prev => [...prev, result])
                handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: 'insert broadcast Successfully' })
            })
            .catch(res => {
                const result: any = res
                alert(res.message)
            })
    }
    const [option, setOption] = useState(false)
    return (
        <motion.div
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <div >
                <PrivateNavbar />
                {/* <section className='py-[5rem]'>
                    <div>PracticeListen</div>
                    English<input type='file' accept='.srt' onChange={(e: any) => setEnglishSelectedFile(e.target.files)} />
                    Vietnamese<input type='file' accept='.srt' onChange={(e: any) => setVietnameseSelectedFile(e.target.files)} />
                    URLVideo<input type='text'
                        onChange={(e) => setUrl(e.target.value)}
                        className='border-[1px] border-[#999]' />
                    <button
                        onClick={() => handleSubmit()}
                    >Submit</button>
                </section> */}
                <div className='flex'>
                    <div className="pt-24 flex flex-col w-1/5 h-screen" style={{ boxShadow: '4px 0px 6px rgba(0, 0, 0, 0.1)' }}>
                        <button className="text-lg py-1 px-4 rounded-md  hover:text-green-500 transition ease-in-out duration-300" style={option === false ? { color: "green" } : { color: "black" }} onClick={() => setOption(false)}>
                            Insert Broadcast
                        </button>

                        <button className="text-lg py-1 px-4 rounded-md  hover:text-red-400 transition ease-in-out duration-300 mt-4" style={option === true ? { color: "red" } : { color: "black" }} onClick={() => setOption(true)}>
                            Remove Broadcast
                        </button>
                    </div>
                    {option === false ? <section className='py-20 bg-white-100 w-4/5 flex justify-center'  >
                        <div className='max-w-lg mx-auto bg-white rounded-lg p-8' >
                            <h2 className='text-2xl font-bold mb-6 text-center'>Insert Broadcast</h2>

                            <div className='mb-4'>
                                <label className='block text-gray-700 font-medium mb-2'>English Subtitle File</label>
                                <input
                                    type='file'
                                    accept='.srt'
                                    onChange={(e: any) => setEnglishSelectedFile(e.target.files)}
                                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 font-medium mb-2'>Vietnamese Subtitle File</label>
                                <input
                                    type='file'
                                    accept='.srt'
                                    onChange={(e: any) => setVietnameseSelectedFile(e.target.files)}
                                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 font-medium mb-2'>Video ids</label>
                                <input
                                    type='text'
                                    onChange={(e) => setUrl(e.target.value)}
                                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                />
                            </div>

                            <button
                                onClick={() => handleSubmit()}
                                className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                            >
                                Submit
                            </button>
                        </div>
                    </section> : <RemoveBroadcast />}
                </div>



                {/* <Footer /> */}
            </div>
        </motion.div>
    )
}

export default BroadcastManagement
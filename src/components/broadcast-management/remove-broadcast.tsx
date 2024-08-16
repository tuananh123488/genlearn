import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/themeContext'
import { BroadcastInterface } from '../context/interfaces'
import { shuffleArray } from '@/utils/vocabulary/vocabulary'
import { api, TypeHTTP } from '@/utils/api/api'
import { StatusToast } from '../toast'

const RemoveBroadcast = () => {
    const { datas, handles } = useContext(ThemeContext) || {}
    const [broadCasts, setBroadCasts] = useState<BroadcastInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setBroadCasts(shuffleArray(datas?.broadCasts || []))
    }, [datas?.broadCasts])

    useEffect(() => {
        if (broadCasts.length === datas?.broadCasts.length) {
            setLoading(false)
        }
    }, [broadCasts])
    const handleRemoveBroadcast = (id: any) => {

        api({ path: `/broadcasts/${id}`, type: TypeHTTP.DELETE })
            .then(res => {
                const result: any = res
                handles?.setBroadCasts(datas?.broadCasts.filter(item => item._id.toLowerCase() !== result._id.toLowerCase()) || [])
                handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: 'Remove broadcast Successfully' })

            })
    }

    return (
        <section className='pt-20 bg-white-100 w-4/5 flex justify-center'  >
            <div className='max-w-[800px] mx-auto bg-white rounded-lg ' >
                <h2 className='text-2xl font-bold  text-center'>Remove broadcast</h2>
                <div className='overflow-y-scroll h-[600px]'>{broadCasts.map((broadCast, index) => (
                    <div key={index} className='rounded-md cursor-pointer overflow-hidden flex  bg-white shadow-xl m-2' style={{ alignItems: 'center' }} >
                        <img src={broadCast.thum} width={'25%'} />
                        <div className='py-1 flex justify-between w-3/5'>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>{broadCast.title}
                            </span>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>
                                {broadCast.duration}
                            </span>
                        </div>

                        <div onClick={() => handleRemoveBroadcast(broadCast._id)} className=" hover:text-red-400 px-4 py-2 cursor-pointer rounded-lg ">
                            Delete
                        </div>

                    </div>
                ))}</div>



            </div>
        </section>
    )
}

export default RemoveBroadcast
import React, { useState } from 'react'
import { userData } from './data'
import BarChart from './barchart'
import { motion } from 'framer-motion'

const StudyTime = () => {
    const [user, setUser] = useState({
        labels: userData.map(data => data.year),
        datasets: [{
            label: 'User Gained',
            data: userData.map(data => data.value)
        },
        {
            label: 'User Gained',
            data: userData.map(data => data.value)
        }
        ]
    })
    return (
        <section className='mt-[4rem] flex items-center gap-4'>
            <motion.img
                initial={{ x: '-100px', opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}
                src='/studytime.png' className='w-[30%]' />
            <BarChart chartData={user} />
        </section>
    )
}

export default StudyTime
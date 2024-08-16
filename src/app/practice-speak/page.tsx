'use client'

import { BroadcastInterface, SubtitleInterface } from '@/components/context/interfaces'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import DefaultLayout from '@/components/practice-speak/default-layout'
import OverviewLayout from '@/components/practice-speak/overview-layout'
import PracticeLayout from '@/components/practice-speak/practice-layout'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const PracticeSpeak = () => {

    const [currentBroadcast, setCurrentBroadcast] = useState<BroadcastInterface | undefined>(undefined)
    const [testPayload, setTestPayload] = useState<{
        startTest: boolean,
        sessionsEnglish: SubtitleInterface[]
        sessionsVietnamese: SubtitleInterface[]
    }>({
        startTest: false,
        sessionsEnglish: [],
        sessionsVietnamese: []
    })

    useEffect(() => {
        console.log(testPayload)
    }, [testPayload])

    return (
        <motion.div
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <PrivateNavbar />
            {!currentBroadcast ?
                <DefaultLayout setCurrentBroadcast={setCurrentBroadcast} />
                :
                testPayload.startTest === false ?
                    <OverviewLayout currentBroadcast={currentBroadcast} setTestPayload={setTestPayload} />
                    :
                    <PracticeLayout setCurrentBroadcast={setCurrentBroadcast} currentBroadcast={currentBroadcast} testPayload={testPayload} setTestPayload={setTestPayload} />
            }
            <Footer />
        </motion.div>
    )
}

export default PracticeSpeak
'use client'
import { BroadcastInterface, SubtitleInterface } from '@/components/context/interfaces'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import DefaultLayout from '@/components/practice-listen/default-layout'
import PracticeLayout from '@/components/practice-listen/practice-layout'
import TestLayout from '@/components/practice-listen/test-layout'
import { TypeHTTP, api } from '@/utils/api/api'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

const PracticeListen = () => {

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
                    <PracticeLayout currentBroadcast={currentBroadcast} setTestPayload={setTestPayload} />
                    :
                    <TestLayout setCurrentBroadcast={setCurrentBroadcast} currentBroadcast={currentBroadcast} testPayload={testPayload} setTestPayload={setTestPayload} />
            }
            <Footer />
        </motion.div>
    )
}

export default PracticeListen
'use client'
import { GrammarInterface } from '@/components/context/interfaces'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import OptionManagement from '@/components/practice-grammar/option-management'
import PracticePage from '@/components/practice-grammar/practice-page'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

const PracticeGrammar = () => {

    const [grammarPractice, setGrammarPractice] = useState<GrammarInterface[]>([])
    const [languages, setLanguages] = useState<string>('')

    return (
        <motion.div
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <PrivateNavbar />
            {grammarPractice.length === 0 ?
                <OptionManagement setLanguages={setLanguages} setGrammarPractice={setGrammarPractice} />
                :
                <PracticePage setGrammarPractice={setGrammarPractice} languages={languages} grammarPractice={grammarPractice} />
            }
            <Footer />
        </motion.div>
    )
}

export default PracticeGrammar
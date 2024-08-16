'use client'
import { ThemeContext } from '@/components/context/themeContext'
import Footer from '@/components/footer/Footer'
import AnalyticalVocabulary from '@/components/home-page/analyticalVocabulary'
import Grammar from '@/components/home-page/grammar'
import NodeList from '@/components/home-page/nodeList'
import StudyTime from '@/components/home-page/studyTime'
import Todolist from '@/components/home-page/todolist'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react'

const HomePage = () => {
    const { datas, handles } = useContext(ThemeContext) || {}

    Cookies.remove('is-first')
    return (
        <motion.div
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <div className='px-[1rem] sm:px-[4rem] py-[60px]'>
                <PrivateNavbar />
                <section className='w-full h-auto mt-[2rem]'>
                    <h2
                        className='font-bold text-[27px] md:text-[1.5rem] font-poppins my-3 text-[#2c2c2c]'>Learn English</h2>
                    <div className='px-[1rem] grid-cols-1 md:grid-cols-4 md:px-[2rem] grid gap-x-5 gap-y-3 w-full'>
                        <NodeList url='/practice-vocabulary' urlImage='/practice-vocabulary.png' />
                        <NodeList url='/practice-listen' urlImage='/practice-listen.png' />
                        <NodeList url='/practice-grammar' urlImage='/practice-grammar.png' />
                        <NodeList url='/practice-speak' urlImage='/practice-speak.png' />
                        <NodeList url='/words-management' urlImage='/words-management.png' />
                        <NodeList url='/grammars-management' urlImage='/grammar-management.png' />
                    </div>
                </section>
                <section className='w-full h-auto mt-[2rem]'>
                    <h2
                        className='font-bold text-[27px] md:text-[1.5rem] font-poppins my-3 text-[#2c2c2c]'>Other</h2>
                    <div className='px-[1rem] grid-cols-1 md:grid-cols-4 md:px-[2rem] grid gap-x-5 gap-y-3 w-full'>
                        <NodeList url='/note-management' urlImage='/note-management.png' />
                        <NodeList url='' urlImage='/study-time-management.png' />
                        <NodeList url='' urlImage='/to-do-list.png' />
                    </div>
                </section>
                <AnalyticalVocabulary />
                <Grammar />
                <StudyTime />
                <Todolist />
            </div>
            <Footer />
        </motion.div>
    )
}

export default HomePage
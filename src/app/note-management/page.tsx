'use client'
import { NoteInterface, TypeText } from '@/components/context/interfaces'
import { ThemeContext } from '@/components/context/themeContext'
import Footer from '@/components/footer/Footer'
import PrivateNavbar from '@/components/navbar/privateNavbar'
import Categories from '@/components/note-management/categories'
import NoteLayout from '@/components/note-management/note-layout'
import { NoteContext, ProviderContext } from '@/components/note-management/note-management-context'
import React, { useContext, useEffect, useState } from 'react'

const NoteManagement = () => {

    const [typeText, setTypeText] = useState<TypeText>(TypeText.TEXT)
    const { listData } = useContext(NoteContext) || {}

    return (
        <>
            <PrivateNavbar />
            <ProviderContext>
                <section className='flex min-h-screen bg-[#fbfbfa]'>
                    <Categories setTypeText={setTypeText} typeText={typeText} />
                    <NoteLayout typeText={typeText} />
                </section>
            </ProviderContext>
            <Footer />
        </>
    )
}

export default NoteManagement
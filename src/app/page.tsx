'use client'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/navbar'
import FourthSection from '@/components/publicPage/FourthSection'
import HeadSection from '@/components/publicPage/HeadSection'
import SecondSection from '@/components/publicPage/SecondSection'
import ThirdSection from '@/components/publicPage/ThirdSection'
import { TypeHTTP, api } from '@/utils/api/api'
import { motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    api({ path: '/', type: TypeHTTP.GET })
      .then(res => {
        console.log(res)
      })
  }, [])

  return (
    <motion.div
      initial={{ x: 1920 * -1 }}
      animate={{ x: 0 }}
      exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}>
      <Navbar />
      <HeadSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </motion.div>
  )
}

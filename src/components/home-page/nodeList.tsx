import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const NodeList = ({ urlImage, url }: { url: string, urlImage: string }) => {
    return (
        <div
            className='bg-black rounded-xl overflow-hidden cursor-pointer'>
            <Link href={url}><img src={urlImage} width={'100%'} /></Link>
        </div>
    )
}

export default NodeList
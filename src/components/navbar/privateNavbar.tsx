import Cookies from 'js-cookie';
import React, { useContext, useRef, useState } from 'react'
import { ThemeContext } from '../context/themeContext'
import { TypeHTTP, api } from '@/utils/api/api';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const PrivateNavbar = () => {

    const { datas, handles } = useContext(ThemeContext) || {}
    const [show, setShow] = useState(false)
    const subMenuRef = useRef<HTMLImageElement>(null)
    const router = useRouter()
    const handleSignOut = () => {
        globalThis.window.localStorage.removeItem('accessToken')
        globalThis.window.localStorage.removeItem('refreshToken')
        handles?.setUser(undefined)
        signOut()
    }
    const path = usePathname()

    const handleShowOrHideSubMenu = () => {
        if (subMenuRef.current) {
            if (show) {
                subMenuRef.current.style.opacity = '0'
                setTimeout(() => {
                    if (subMenuRef.current)
                        subMenuRef.current.style.display = 'none'
                }, 100);
                setShow(false)
            } else {
                subMenuRef.current.style.display = 'block'
                setTimeout(() => {
                    if (subMenuRef.current)
                        subMenuRef.current.style.opacity = '1'
                }, 100);
                setShow(true)
            }
        }
    }

    return (
        <header className='
            flex justify-between 
            items-center h-[60px] 
            px-[1rem]
            shadow-md
            lg:px-[2rem]
            fixed
            top-0
            left-0
            bg-white
            w-screen
            border-b-[1px]
            z-10
            '>
            <Link href={'/home-page'}><img className='w-[9rem] md:w-[10rem]' src="/logo.png" alt="Qilearn - Learn English With Qizhy" /></Link>
            <ul className='
                items-center hidden 
                md:flex
                '>
                <Link href={'/home-page'}><li className={`font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] ${path === '/home-page' && 'navbar-active'}`}>Home</li></Link>
                <Link href={'/practice-vocabulary'}><li className={`font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] ${path === '/practice-vocabulary' && 'navbar-active'}`}>Vocabulary</li></Link>
                <Link href={'/practice-grammar'}><li className={`font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] ${path === '/practice-grammar' && 'navbar-active'}`}>Grammar</li></Link>
                <Link href={'/practice-listen'}><li className={`font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] ${path === '/practice-listen' && 'navbar-active'}`}>Listening</li></Link>
                <Link href={'/practice-speak'}><li className={`font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] ${path === '/practice-speak' && 'navbar-active'}`}>Speaking</li></Link>
                <Link href={'/note-management'}><li className={`font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] ${path === '/note-management' && 'navbar-active'}`}>Note</li></Link>
                <li className={`font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] ${path === '' && 'navbar-active'}`}>Time Study</li>
            </ul>
            <div className='flex items-center'>
                <svg className="mx-1.5 w-6 h-6 hidden md:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <img
                    onClick={() => handleShowOrHideSubMenu()}
                    className='h-[38px] w-[38px] rounded-full cursor-pointer'
                    src={datas?.user?.image} />
                <button
                    onClick={() => handleSignOut()}
                    className='
                    rounded-[20px] py-2 
                    px-3 font-semibold 
                    text-white mx-1.5 
                    bg-[#faa24c]
                    text-[12px]
                    md:text-[11px]
                    '>
                    Sign Out
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 block md:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <div ref={subMenuRef} style={{ transition: '0.5s', display: 'none', opacity: 0, height: 'auto' }} className='w-[220px] px-4 overflow-hidden bg-[white] border-[1px] shadow-md border-[#e4e4e4] absolute right-8 top-[65px] rounded-md'>
                <Link href='/broadcast-management'>
                    <div className='w-full py-3 cursor-pointer'>
                        Broadcast Management
                    </div>
                </Link>

            </div>

        </header>
    )
}

export default PrivateNavbar
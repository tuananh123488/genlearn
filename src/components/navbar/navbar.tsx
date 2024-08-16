import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const router = useRouter()
    return (
        <header className='
            flex justify-between 
            items-center h-20 
            px-[1rem]
            lg:px-[3rem]
            '>
            <img className='w-[9rem] md:w-[12rem]' src="/logo.png" alt="Qilearn - Learn English With Qizhy" />
            <ul className='
                items-center hidden 
                md:flex
                '>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545] navbar-active'>Home</li>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545]'>About</li>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545]'>Courses</li>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545]'>Instructor</li>
                <li className='font-semibold mx-3.5 cursor-pointer font-inter text-[14px] text-[#454545]'>Contact</li>
            </ul>
            <div className='flex items-center'>
                <svg className="mx-1.5 w-6 h-6 hidden md:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <svg className="mx-1.5 w-6 h-6 hidden md:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <button
                    onClick={() => { router.push('/sign-in'); console.log(1) }}
                    className='
                    rounded-[20px] py-2.5 
                    px-5 font-semibold 
                    text-white mx-1.5 
                    bg-[#faa24c]
                    text-[12px]
                    md:text-[12px]
                    '>
                    Sign In / Sign Up
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 block md:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

            </div>
        </header>
    )
}

export default Navbar
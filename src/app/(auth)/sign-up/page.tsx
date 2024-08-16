'use client'
import { TypeUser, UserSignUp } from '@/components/context/interfaces'
import { ThemeContext } from '@/components/context/themeContext'
import Provider from '@/components/provider'
import { StatusToast } from '@/components/toast'
import { TypeHTTP, api } from '@/utils/api/api'
import axios from 'axios'
import { motion } from 'framer-motion'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const AuthPage = () => {
    const defaultAvatar = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
    const { datas, handles } = useContext(ThemeContext) || {}
    const [loading, setLoading] = useState<{ normal: boolean, google: boolean, github: boolean }>({ normal: false, google: false, github: false })
    const [userSignUp, setUserSignUp] = useState<UserSignUp>({
        username: '',
        fullname: '',
        email: '',
        image: defaultAvatar,
        password: '',
        confirmpassword: ''
    })

    const handleChangeImage = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                if (reader.result) {
                    setUserSignUp({ ...userSignUp, image: reader.result.toString() });
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSignUp = () => {
        const { username, fullname, email, image, password } = userSignUp
        setLoading({ ...loading, normal: true })
        api({ path: '/auth/sign-up', type: TypeHTTP.POST, body: { username, fullname, email, image, password, type: TypeUser.NORMAL } })
            .then(res => {
                setLoading({ ...loading, normal: false })
                handles?.handleSetNotification({ message: 'Account successfully created', status: StatusToast.SUCCESS })
            })
            .catch(res => {
                setLoading({ ...loading, normal: false })
                handles?.handleSetNotification({ message: res.message, status: StatusToast.FAIL })
            })
    }

    const { data: session, status, update } = useSession()
    const [creating, setCreating] = useState<boolean>(false)
    useEffect(() => {
        if (session?.user && status === 'authenticated') {
            if (!creating) {
                const { name, email, image } = session.user
                setCreating(true)
                if (image?.includes('google'))
                    setLoading({ ...loading, google: true })
                else if (image?.includes('github'))
                    setLoading({ ...loading, github: true })
                api({ path: '/auth/sign-up-with-auth', type: TypeHTTP.POST, body: { fullname: name, email, image, type: TypeUser.GOOGLE } })
                    .then(res => {
                        setCreating(false)
                        handles?.handleSetNotification({ message: 'Account successfully created', status: StatusToast.SUCCESS })
                        if (image?.includes('google'))
                            setLoading({ ...loading, google: false })
                        else if (image?.includes('github'))
                            setLoading({ ...loading, github: false })
                    })
                    .catch(res => {
                        setCreating(false)
                        handles?.handleSetNotification({ message: res.message, status: StatusToast.FAIL })
                        if (image?.includes('google'))
                            setLoading({ ...loading, google: false })
                        else if (image?.includes('github'))
                            setLoading({ ...loading, github: false })
                    })
            }
        }
    }, [status, session])


    return (
        <motion.section
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
            className='w-full min-h-screen py-[3rem] flex items-center justify-center' style={{ backgroundImage: `url(/auth.png)` }}>
            <div className='shadow-2xl flex flex-col py-[1.0rem] px-[2rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br rounded-[1rem] '>
                <h1 className=' my-[4px] mb-[1rem] font-bold text-[28px] font-poppins' >Sign Up</h1>
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, username: e.target.value })} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' placeholder='Username' />
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, email: e.target.value })} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='email' placeholder='Email' />
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, fullname: e.target.value })} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='text' placeholder='Full Name' />
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, password: e.target.value })} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='password' placeholder='Password' />
                <input onChange={(e: any) => setUserSignUp({ ...userSignUp, confirmpassword: e.target.value })} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-[2px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='password' placeholder='Confirm Password' />
                <input onChange={(e: any) => handleChangeImage(e)} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-[13px] text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='file' accept='.png, .jpg, .jpeg' />
                <button
                    onClick={() => handleSignUp()}
                    className='hover:scale-[1.02] transition my-[0.5rem] font-semibold rounded-[10px] py-[12px] text-[white] bg-[#241d49]'>
                    {
                        !loading.normal ?
                            <>Sign Up</>
                            :
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                    }
                </button>
                <div className='my-1 flex items-center justify-center'>
                    <div className='h-[1px] w-[40%] bg-black rounded-[10px]' />
                    <span className='mx-4'>Or</span>
                    <div className='h-[1px] w-[40%] bg-black rounded-[10px]' />
                </div>

                <button
                    onClick={async () => {
                        await signIn('google')
                    }}
                    className='hover:scale-[1.02] transition text-[15px] my-[5px] justify-center py-[10px] rounded-[10px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br flex items-center text-black font-semibold'>
                    {
                        !loading.google ?
                            <>
                                <i className='bx bxl-google text-[2rem] mr-2'></i>
                                Continue With Google
                            </>
                            :
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                    }
                </button>
                <button
                    onClick={async () => {
                        await signIn('github')
                    }}
                    className='hover:scale-[1.02] transition text-[15px] my-[5px] justify-center py-[10px] rounded-[10px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br flex items-center text-black font-semibold'>
                    {
                        !loading.github ?
                            <>
                                <i className='bx bxl-github text-[2rem] mr-2'></i>
                                Continue With GitHub
                            </>
                            :
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                    }
                </button>
                <p className='w-full text-center mt-[0.5rem]'>
                    Have an account? <Link href={'sign-in'}><span className='font-bold underline cursor-pointer'>Sign In</span></Link></p>
            </div>
        </motion.section >

    )
}

export default AuthPage
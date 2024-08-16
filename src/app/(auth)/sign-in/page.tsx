'use client'
import { TypeHTTP, api } from '@/utils/api/api'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@/components/context/themeContext'
import { StatusToast } from '@/components/toast'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie';
export interface UserSignIn {
    username: string
    password: string
}

const AuthPage = () => {
    const { datas, handles } = useContext(ThemeContext) || {}
    const [loading, setLoading] = useState<{ normal: boolean, google: boolean, github: boolean }>({ normal: false, google: false, github: false })
    const [userSignIn, setUserSignIn] = useState<UserSignIn>({
        username: '',
        password: ''
    })
    const router = useRouter()

    const handleSignIn = () => {
        const { username, password } = userSignIn
        setLoading({ ...loading, normal: true })
        api({ path: '/auth/sign-in', body: { username, password }, type: TypeHTTP.POST })
            .then(res => {
                const result: any = res
                handles?.handleSetNotification({ message: 'Logged in successfully', status: StatusToast.SUCCESS })
                handles?.setUser(result.metadata.data.user)
                try {
                    // Cookies.set('accessToken', result.metadata.data.accessToken)
                    // Cookies.set('refreshToken', result.metadata.data.refreshToken)
                    globalThis.window.localStorage.setItem('accessToken', result.metadata.data.accessToken)
                    globalThis.window.localStorage.setItem('refreshToken', result.metadata.data.refreshToken)
                } catch (error) {
                    console.log(error)
                }
                setTimeout(() => {
                    setLoading({ ...loading, normal: false })
                    router.push('/home-page')
                }, 1500);
            })
            .catch(res => {
                handles?.handleSetNotification({ message: `UserName Or Password don't exists in the system`, status: StatusToast.FAIL })
                setLoading({ ...loading, normal: false })
            })
    }

    const { data: session, status } = useSession()
    const [isSignIn, setIsSignIn] = useState<boolean>(false)
    useEffect(() => {
        const isFirst: string | undefined = Cookies.get('is-first')
        if (!isFirst) {
            if (status === 'authenticated') {
                signOut()
            }
        } else {
            if (session?.user) {
                if (!isSignIn) {
                    const { name, email, image } = session.user
                    setIsSignIn(true)
                    if (image?.includes('google'))
                        setLoading({ ...loading, google: true })
                    else if (image?.includes('github'))
                        setLoading({ ...loading, github: true })
                    api({ path: '/auth/sign-in', body: { username: email, password: '' }, type: TypeHTTP.POST })
                        .then(res => {
                            const result: any = res
                            if (result.status === 200) {
                                handles?.handleSetNotification({ message: 'Logged in successfully', status: StatusToast.SUCCESS })
                                setIsSignIn(false)
                                handles?.setUser(result.metadata.data.user)
                                try {
                                    console.log(result)
                                    // Cookies.set('accessToken', result.metadata.data.accessToken)
                                    // Cookies.set('refreshToken', result.metadata.data.refreshToken)
                                    globalThis.window.localStorage.setItem('accessToken', result.metadata.data.accessToken)
                                    globalThis.window.localStorage.setItem('refreshToken', result.metadata.data.refreshToken)
                                } catch (error) {
                                    console.log(error)
                                }
                                setTimeout(() => {
                                    if (image?.includes('google'))
                                        setLoading({ ...loading, google: false })
                                    else if (image?.includes('github'))
                                        setLoading({ ...loading, github: false })
                                    router.push('/home-page')
                                }, 1500);
                            }
                        })
                        .catch(res => {
                            handles?.handleSetNotification({ message: "Google account does not exist in the system", status: StatusToast.FAIL })
                            setIsSignIn(false)
                            if (image?.includes('google'))
                                setLoading({ ...loading, google: false })
                            else if (image?.includes('github'))
                                setLoading({ ...loading, github: false })
                        })
                }
            }
        }
    }, [session])

    return (
        <motion.section
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
            className='w-full min-h-screen py-[3rem] flex items-center justify-center' style={{ backgroundImage: `url(/auth.png)` }}>
            <div className='shadow-2xl flex flex-col p-[2rem] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br rounded-[1rem] '>
                <h1 className=' my-[0.5rem] mb-[1rem] font-bold text-[28px] font-poppins' >Sign In</h1>
                <input onChange={(e: any) => setUserSignIn({ ...userSignIn, username: e.target.value })} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-1 text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' placeholder='Username or email' />
                <input onChange={(e: any) => setUserSignIn({ ...userSignIn, password: e.target.value })} className='w-[18rem] sm:w-[25rem] focus:scale-[1.03] transition pt-1 text-[15px] focus:outline-0 rounded-[0.5rem] px-[1rem] text-black my-[5px] h-[50px] from-[#ffffffac] to-[#ffffff45] bg-gradient-to-br bg-transparent' type='password' placeholder='Password' />
                <div className='flex items-center my-2 text-[#424242]'>
                    <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value="" className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    Remember me
                </div>
                <button
                    onClick={() => handleSignIn()}
                    className='hover:scale-[1.02] transition my-[0.5rem] font-semibold rounded-[10px] py-[12px] text-[white] bg-[#241d49]'>
                    {
                        !loading.normal ?
                            <>Sign In</>
                            :
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                    }
                </button>
                <a className='cursor-pointer w-full text-center text-[14px]'>Forgot Password?</a>
                <div className='my-2 flex items-center justify-center'>
                    <div className='h-[1px] w-[40%] bg-black rounded-[10px]' />
                    <span className='mx-4'>Or</span>
                    <div className='h-[1px] w-[40%] bg-black rounded-[10px]' />
                </div>

                <button
                    onClick={() => {
                        Cookies.set('is-first', 'vutienduc')
                        signIn('google')
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
                    onClick={() => {
                        Cookies.set('is-first', 'vutienduc')
                        signIn('github')
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
                <p className='w-full text-center mt-[2.0rem]'>
                    Don&#39;t have an account? <Link href={'sign-up'}><span className='font-bold underline cursor-pointer'>Sign Up</span></Link></p>
            </div>
        </motion.section>
    )
}

export default AuthPage
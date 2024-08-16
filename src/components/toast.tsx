'use client'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

export enum StatusToast {
    SUCCESS = 'success',
    FAIL = 'fail',
    WARNING = 'warning',
    NONE = 'none'
}
export interface ToastInterface {
    message: string
    status: StatusToast
}

const Toast = ({ message, status }: ToastInterface) => {
    const [toast, setToast] = useState<ToastInterface>({ message: '', status: StatusToast.NONE })
    const toastRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
    let timeout
    useEffect(() => {
        setToast({ message, status })
    }, [status])

    useEffect(() => {
        if (toast.status !== StatusToast.NONE) {
            setTimeout(() => {
                if (toastRef.current) {
                    toastRef.current.style.right = '32px'
                    timeout = setTimeout(() => {
                        if (toastRef.current) {
                            toastRef.current.style.right = '-500px'
                            setTimeout(() => {
                                setToast({ message: '', status: StatusToast.NONE })
                            }, 200);
                        }
                    }, 2500);
                }
            }, 200);
        }
    }, [toast])

    const status1 = {
        success: {
            name: 'Success',
            color: 'green'
        },
        fail: {
            name: 'Error',
            color: 'red'
        },
        warning: {
            name: 'Warning',
            color: 'yellow'
        },
        none: {
            name: 'None',
            color: 'black'
        },
    }

    const getStatus = (type: StatusToast) => {
        return status1[type].name
    }
    const getColor = (type: StatusToast) => {
        return status1[type].color
    }

    const handleClose = () => {
        clearTimeout(timeout!)
        if (toastRef.current) {
            toastRef.current.style.right = '-500px'
            setTimeout(() => {
                setToast({ message: '', status: StatusToast.NONE })
            }, 200);
        }
    }

    return (
        <div ref={toastRef} className='shadow-2xl transition-all px-[12px] py-[14px] flex rounded-xl fixed right-[-500px] top-5 z-50 w-[20rem] min-h-[90px] bg-[white]'>
            <div style={{ backgroundColor: `${getColor(toast.status)}` }} className={`min-h-[100%] w-[5px] rounded-[40px]`} />
            <div className='ml-4 w-full flex flex-col justify-center gap-1'>
                <div style={{ color: `${getColor(toast.status)}` }} className={`font-bold text-[18px] w-[100%]`}>
                    {getStatus(toast.status)}
                </div>
                <div className='font-semibold text-[#5c5c5c] text-[15px]'>
                    {toast.message}
                </div>
            </div>
            <i onClick={() => handleClose()} className='top-2 right-2 cursor-pointer bx bx-x text-[25px] text-[#5c5c5c] font-bold absolute'></i>
        </div>
    )
}

export default Toast
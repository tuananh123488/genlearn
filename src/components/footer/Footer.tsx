import React from 'react'

const Footer = () => {
    return (
        <footer id='about' className='gap-3 grid-cols-2 md:px-[10px] sm:grid-cols-5 lg:px-[15rem] justify-items-center w-full grid bg-[#4dac96] py-12 rounded-t-xl text-white justify-center items-center sm:gap-16'>
            <div className='hidden sm:flex flex-col gap-3'>
                <img src='/logo-mini.png' className='w-[150px]' />
                <p className='font-semibold text-[18px]'>© Genlearn, A VF Company</p>
            </div>
            <div className=''>
                <h3 className='font-bold text-[20px] leading-[40px]'>About Us</h3>
                <div>
                    <p className='text-[1rem] leading-[28px]'>History</p>
                    <p className='text-[1rem] leading-[28px]'>Education Method</p>
                    <p className='text-[1rem] leading-[28px]'>Schedule Study</p>
                </div>
            </div>
            <div className=''>
                <h3 className='font-bold text-[20px] leading-[40px]'>About Us</h3>
                <div>
                    <p className='text-[1rem] leading-[28px]'>History</p>
                    <p className='text-[1rem] leading-[28px]'>Education Method</p>
                    <p className='text-[1rem] leading-[28px]'>Schedule Study</p>
                </div>
            </div>
            <div className=''>
                <h3 className='font-bold text-[20px] leading-[40px]'>About Us</h3>
                <div>
                    <p className='text-[1rem] leading-[28px]'>History</p>
                    <p className='text-[1rem] leading-[28px]'>Education Method</p>
                    <p className='text-[1rem] leading-[28px]'>Schedule Study</p>
                </div>
            </div>
            <div className=''>
                <h3 className='font-bold text-[20px] leading-[40px]'>About Us</h3>
                <div>
                    <p className='text-[1rem] leading-[28px]'>History</p>
                    <p className='text-[1rem] leading-[28px]'>Education Method</p>
                    <p className='text-[1rem] leading-[28px]'>Schedule Study</p>
                </div>
            </div>
            <div className='ml-7 sm:m-0 flex sm:hidden flex-col gap-3'>
                <img src='/logo-mini.png' className='w-[150px]' />
                <p className='font-semibold text-[18px]'>© Qilearn, A VF Company</p>
            </div>
        </footer>
    )
}

export default Footer
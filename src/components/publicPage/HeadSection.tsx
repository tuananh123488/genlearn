import React from 'react'

const HeadSection = () => {
    return (
        <section className='lg:flex-row flex-col flex items-center justify-center py-4 px-[1rem] lg:px-[5rem]'>
            <div>
                <span className='bg-[#f1675e] text-white rounded-[2rem] font-bold px-3 py-2'>50% OFF</span>
                <span className='text-[#f1675e] font-semibold mx-4'>LEARN FROM TODAY</span>
                <h1 className='leading-[40px] text-[2rem] lg:leading-[70px] lg:my-6 my-4 font-poppins lg:text-[4rem] font-bold'>The Best Way For Your Learning</h1>
                <div className='max-w-[80%] pl-3 border-[#ff7d74] border-l-[2px] mb-5'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                </div>
                <div className='flex flex-col lg:flex-row items-start lg:items-center gap-3'>
                    <button className=' font-semibold items-center rounded-[23px] px-[1rem] py-[10px] lg:py-[14px] flex bg-[#4dac96] text-white'>
                        Explore Courses
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-[7px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                    <div className='flex items-center gap-2'>
                        <button className='rounded-full bg-[#faa24c] p-2 lg:p-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <a className='cursor-pointer underline font-semibold font-body text-[14px] decoration-slice'>Watch Demo</a>
                    </div>
                </div>
            </div>
            <img className='lg:h-[650px]' src='/couple.png' alt='Qiflix - Learn English' />
        </section>
    )
}

export default HeadSection
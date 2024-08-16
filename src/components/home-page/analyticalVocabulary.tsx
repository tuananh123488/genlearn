import React, { useState } from 'react'
import BarChart from './barchart'
import { userData } from './data'
import { motion } from 'framer-motion'

const AnalyticalVocabulary = () => {
    const [user, setUser] = useState({
        labels: userData.map(data => data.year),
        datasets: [{
            label: 'User Gained',
            data: userData.map(data => data.value)
        },
        {
            label: 'User Gained',
            data: userData.map(data => data.value)
        }
        ]
    })
    return (
        <section className='flex my-[40px] font-poppins gap-6'>
            <BarChart chartData={user} />
            <motion.div
                initial={{ x: '100px', opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}
                className='w-[30%] border-[#e0e0e0] border-[1px] rounded-xl '>
                <h2 className='text-[18px] font-semibold p-[1rem] '>
                    Total vocabulary learned in the past 7 days : <span className='text-[red]'>255</span>
                </h2>
                <div className='h-[300px] overflow-y-auto relative'>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    English
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Vietnamese
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                            </tr>
                        </thead>
                        <tbody className=' w-[full] bg-black'>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Book
                                </th>
                                <td className="px-6 py-4">
                                    Sách
                                </td>
                                <td className="px-6 py-4">
                                    N
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Book
                                </th>
                                <td className="px-6 py-4">
                                    Sách
                                </td>
                                <td className="px-6 py-4">
                                    N
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Book
                                </th>
                                <td className="px-6 py-4">
                                    Sách
                                </td>
                                <td className="px-6 py-4">
                                    N
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Book
                                </th>
                                <td className="px-6 py-4">
                                    Sách
                                </td>
                                <td className="px-6 py-4">
                                    N
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Book
                                </th>
                                <td className="px-6 py-4">
                                    Sách
                                </td>
                                <td className="px-6 py-4">
                                    N
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Book
                                </th>
                                <td className="px-6 py-4">
                                    Sách
                                </td>
                                <td className="px-6 py-4">
                                    N
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Book
                                </th>
                                <td className="px-6 py-4">
                                    Sách
                                </td>
                                <td className="px-6 py-4">
                                    N
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </section>
    )
}

export default AnalyticalVocabulary
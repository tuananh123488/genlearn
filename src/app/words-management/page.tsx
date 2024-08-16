'use client'
import { WordInterface } from '@/components/context/interfaces';
import { ThemeContext } from '@/components/context/themeContext';
import FormSearchVocabulary from '@/components/words-management/form-search-vocabulary';
import Footer from '@/components/footer/Footer';
import PrivateNavbar from '@/components/navbar/privateNavbar';
import { getTypes, vocabularies } from '@/utils/translate/translate';
import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EnglishManagement = () => {

    const { datas, handles } = useContext(ThemeContext) || {}

    return (
        <motion.div
            initial={{ x: 1920 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <PrivateNavbar />
            <section className='flex pb-[2rem] pt-[5rem] h-screen gap-6 px-[1rem]'>
                <FormSearchVocabulary />
                <div className='border-[#e2e2e2] rounded-lg p-1 border-[1px] h-[100%] w-[60%] overflow-y-auto relative'>
                    <h1 className='pl-3 text-[20px] font-poppins font-semibold my-[0.5rem]'>My Vocabularies</h1>
                    {(datas?.vocabularies && datas?.vocabularies.length > 0) ?
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
                                {datas?.vocabularies.map((item, index) => {
                                    return (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.english}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.vietnamese}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.types.join(', ')}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        :
                        <div className='text-[20px] font-poppins h-[80%] w-full flex justify-center items-center'>
                            No Vocabulary Yet !!!
                        </div>
                    }
                </div>
            </section>
            <Footer />
        </motion.div>
    );
};

export default EnglishManagement;

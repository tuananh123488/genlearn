import React, { useState } from 'react'
import Options from './option'
import { WordInterface } from '../context/interfaces'

const OptionManagement = ({ setVocabulariesPractice, setLanguages }: { setVocabulariesPractice: React.Dispatch<React.SetStateAction<WordInterface[]>>, setLanguages: React.Dispatch<React.SetStateAction<string>> }) => {

    const [results, setResults] = useState<WordInterface[]>([])

    return (
        <div className='w-full gap-8 pt-[5rem] pb-[2rem] bg-white flex justify-center'>
            <Options setLanguages={setLanguages} results={results} setResults={setResults} setVocabulariesPractice={setVocabulariesPractice} />
            <div className={`border-[#e2e2e2] rounded-lg p-1 border-[1px] h-[550px] w-[55%] overflow-y-auto relative`}>
                <h1 className='pl-3 text-[20px] font-poppins font-semibold my-[0.5rem]'>Vocabularies</h1>
                {(results && results.length > 0) ?
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Num
                                </th>
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
                            {results.map((item, index) => {
                                return (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
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
        </div>
    )
}

export default OptionManagement
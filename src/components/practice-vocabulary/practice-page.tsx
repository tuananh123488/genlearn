import React, { useContext, useEffect, useState } from 'react'
import { ResultPracticeVocabularyInterface, WordInterface } from '../context/interfaces'
import FormPractice from './form-practice'
import { ThemeContext } from '../context/themeContext'

export interface PracticePageProp {
    vocabulariesPractice: WordInterface[]
    languages: string
    setVocabulariesPractice: React.Dispatch<React.SetStateAction<WordInterface[]>>
}

const PracticePage = ({ vocabulariesPractice, languages, setVocabulariesPractice }: PracticePageProp) => {

    const [results, setResults] = useState<ResultPracticeVocabularyInterface[]>([])
    const [current, setCurrent] = useState<number>(0)
    const { datas, handles } = useContext(ThemeContext) || {}

    useEffect(() => {
        try {
            if (results.length > 0 && results.length <= vocabulariesPractice.length) {
                setCurrent(current + 1)
                let voices = globalThis.window.speechSynthesis.getVoices();
                if (typeof globalThis.window !== 'undefined' && globalThis.window.speechSynthesis) {
                    const utterance = new SpeechSynthesisUtterance(languages === 'en->vi' ? vocabulariesPractice[current + 1].english : vocabulariesPractice[current + 1].vietnamese);
                    utterance.rate = 1;
                    utterance.pitch = 1;
                    utterance.volume = 1;
                    voices = globalThis.window.speechSynthesis.getVoices();
                    const selectedVoice = voices.find(voice => voice.name === datas?.pronounces[0].voiceName);
                    if (selectedVoice) {
                        utterance.voice = selectedVoice;
                    }
                    globalThis.window.speechSynthesis.speak(utterance);
                }
            } else {
                let voices = globalThis.window.speechSynthesis.getVoices();
                if (typeof globalThis.window !== 'undefined' && globalThis.window.speechSynthesis) {
                    const utterance = new SpeechSynthesisUtterance(languages === 'en->vi' ? vocabulariesPractice[0].english : vocabulariesPractice[0].vietnamese);
                    utterance.rate = 1;
                    utterance.pitch = 1;
                    utterance.volume = 1;
                    voices = globalThis.window.speechSynthesis.getVoices();
                    const selectedVoice = voices.find(voice => voice.name === datas?.pronounces[0].voiceName);
                    if (selectedVoice) {
                        utterance.voice = selectedVoice;
                    }
                    globalThis.window.speechSynthesis.speak(utterance);
                }
            }
        } catch (error) {

        }
    }, [results])

    return (
        <div className='w-full gap-8 pt-[5rem] pb-[2rem] bg-white flex justify-center'>
            <FormPractice setVocabulariesPractice={setVocabulariesPractice} languages={languages} current={current} setResults={setResults} vocabulariesPractice={vocabulariesPractice} />
            <div className={`border-[#e2e2e2] rounded-lg p-1 border-[1px] h-[550px] w-[55%] overflow-y-auto relative`}>
                <h1 className='pl-3 text-[20px] font-poppins font-semibold my-[0.5rem]'>Vocabularies</h1>
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
                                Your Answer
                            </th>
                        </tr>
                    </thead>
                    <tbody className=' w-[full] bg-black'>
                        {results.map((item, index) => {
                            return (
                                <>
                                    {languages === 'en->vi' ?
                                        <tr key={index} className={`odd:bg-white odd:dark:bg-gray-900 text-green even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}>
                                            <td scope="row" style={{ color: item.vietnamese.toLowerCase().includes(item.result.toLowerCase()) ? 'green' : 'red' }} className={`px-6 py-4 font-semibold whitespace-nowrap dark:text-white`}>
                                                {item.english}
                                            </td>
                                            <td style={{ color: item.vietnamese.toLowerCase().includes(item.result.toLowerCase()) ? 'green' : 'red' }} className={`px-6 py-4 font-semibold`}>
                                                {item.vietnamese}
                                            </td>
                                            <td style={{ color: item.vietnamese.toLowerCase().includes(item.result.toLowerCase()) ? 'green' : 'red' }} className={`px-6 py-4 font-semibold`}>
                                                {item.result}
                                            </td>
                                        </tr>
                                        :
                                        <tr key={index} className={`odd:bg-white odd:dark:bg-gray-900 text-green even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}>
                                            <td style={{ color: item.english.toLowerCase() === item.result.toLowerCase() ? 'green' : 'red' }} scope="row" className={`px-6 py-4 font-semibold whitespace-nowrap dark:text-white`}>
                                                {item.english}
                                            </td>
                                            <td style={{ color: item.english.toLowerCase() === item.result.toLowerCase() ? 'green' : 'red' }} className={`px-6 py-4 font-semibold`}>
                                                {item.vietnamese}
                                            </td>
                                            <td style={{ color: item.english.toLowerCase() === item.result.toLowerCase() ? 'green' : 'red' }} className={`px-6 py-4 font-semibold`}>
                                                {item.result}
                                            </td>
                                        </tr>
                                    }
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PracticePage
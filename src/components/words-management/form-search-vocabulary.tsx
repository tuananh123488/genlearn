import React, { useContext, useEffect, useRef, useState } from 'react'
import InputText from './input-text'
import { InputTextInterface, WordInterface } from '../context/interfaces'
import axios from 'axios'
import { ThemeContext } from '../context/themeContext'
import { changeTypesToVietnamese, vocabularies } from '@/utils/translate/translate'
import { TypeHTTP, api } from '@/utils/api/api'
import { StatusToast } from '../toast'
axios.defaults.withCredentials = true

const FormSearchVocabulary = () => {
    const [currentWord, setCurrentWord] = useState<WordInterface>()
    const { datas, handles } = useContext(ThemeContext) || {}
    const englishInputRef = useRef<HTMLInputElement | null>(null)
    const vietnameseInputRef = useRef<HTMLInputElement | null>(null)
    const typesInputRef = useRef<HTMLInputElement | null>(null)
    let speakHandler = (voiceName: string, content: string) => { }
    useEffect(() => {
        let voices = globalThis.window.speechSynthesis.getVoices();
        speakHandler = (voiceName: string, content: string) => {
            if (typeof globalThis.window !== 'undefined' && globalThis.window.speechSynthesis) {
                const utterance = new SpeechSynthesisUtterance(content);
                utterance.rate = 1;
                utterance.pitch = 1;
                utterance.volume = 1;
                voices = globalThis.window.speechSynthesis.getVoices();
                const selectedVoice = voices.find(voice => voice.name === voiceName);
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }
                globalThis.window.speechSynthesis.speak(utterance);
            }
        };
    })

    useEffect(() => {
        if (englishInputRef.current && vietnameseInputRef.current && typesInputRef.current) {
            englishInputRef.current.value = currentWord?.english || ''
            vietnameseInputRef.current.value = currentWord?.vietnamese || ''
            typesInputRef.current.value = currentWord?.types.join(', ') || ''
        }
    }, [currentWord])

    const handleInsertWord = () => {
        if (englishInputRef.current && vietnameseInputRef.current && typesInputRef.current) {
            if (datas?.user) {
                const body = {
                    user_id: datas.user._id,
                    english: englishInputRef.current.value,
                    vietnamese: vietnameseInputRef.current.value,
                    types: typesInputRef.current.value.split(',').map(item => item.trim())
                }
                api({ path: '/vocabularies', body: body, type: TypeHTTP.POST })
                    .then(res => {
                        const result = (res as WordInterface)
                        handles?.setVocabularies([...datas?.vocabularies || [], result])
                        handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: 'Insert to My List Successfully' })
                        setCurrentWord(undefined)
                    })
                    .catch(res => {
                        handles?.handleSetNotification({ status: StatusToast.FAIL, message: res.message })
                    })
            }
        }
    }

    const handleRemoveVocabulary = () => {
        api({ path: `/vocabularies/${currentWord?._id}`, type: TypeHTTP.DELETE })
            .then(res => {
                const result: any = res
                handles?.setVocabularies(datas?.vocabularies.filter(item => item.english.toLowerCase() !== result.english.toLowerCase()) || [])
                handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: 'Remove from My List Successfully' })
                setCurrentWord(undefined)
            })
    }

    return (
        <>
            <section className='w-[40%] h-screen'>
                <InputText setCurrentWord={setCurrentWord} />
                {currentWord &&
                    <div className='p-[1.5rem]'>
                        <p className='font-poppins font-bold text-[2rem] text-[#4dac96]'>{currentWord.english}</p>
                        <p className='my-[1rem]'><b>Loại Từ:</b> {changeTypesToVietnamese(currentWord.types)}</p>
                        <p className='my-[1rem]'><b>Nghĩa Tiếng Việt:</b> {currentWord.vietnamese}</p>
                        <div className='my-[1rem] h-[30px] flex items-start'>
                            <b className='w-[20%]'>Phát Âm: </b>
                            <div className='flex w-[80%] flex-wrap font-poppins gap-1'>
                                {datas?.pronounces.map((pronounce, index) => (
                                    <button onClick={() => speakHandler(pronounce.voiceName, currentWord.english)} key={index} className='ml-4 flex h-[30px] text-[14px] items-center gap-1'>
                                        <span className='font-semibold'>{pronounce.name}</span>
                                        <img src={pronounce.image} className='h-[60%]' />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>}
                <div className='font-poppins w-full flex justify-end mt-[3rem]'>
                    {currentWord && <button
                        onClick={() => setCurrentWord(undefined)}
                        className='hover:scale-[1.03] transition-all bg-[#f04848] mr-[0.5rem] text-[white] px-[1rem] py-[0.5rem] rounded-md'
                    >Clear</button>}
                    {currentWord?._id && <button
                        onClick={() => handleRemoveVocabulary()}
                        className='hover:scale-[1.03] transition-all bg-[#f04848] mr-[0.5rem] text-[white] px-[1rem] py-[0.5rem] rounded-md'
                    >Remove From My List</button>}
                    <button
                        onClick={() => handles?.setShowForm(true)}
                        className='hover:scale-[1.03] transition-all bg-[#4dac96] text-[white] px-[1rem] py-[0.5rem] rounded-md'
                    >Insert To My List</button>
                </div>
            </section>
            <form className={` shadow-2xl transition-[0.8s] px-[2rem] py-[2rem] left-[50%] ${datas?.showForm ? 'top-[50%]' : 'top-[-50%]'} translate-y-[-50%] translate-x-[-50%] z-20 rounded-lg w-[400px] bg-white fixed`}>
                <section className='font-poppins text-[1.5rem] font-semibold text-[#4dac96]'>
                    Insert To My List
                </section>
                <section>
                    <input
                        ref={englishInputRef}
                        placeholder='English ( Example : Book )'
                        className='text-[14px] mt-3 h-[38px] px-2 text-[#282828] w-full border-[1px] rounded-md border-[#cccccc] focus:outline-0' />
                    <input
                        ref={vietnameseInputRef}
                        placeholder='Vietnamese ( Example : Sách, Cuốn Sách, Vở )'
                        className='text-[14px] mt-2 h-[38px] px-2 text-[#282828] w-full border-[1px] rounded-md border-[#cccccc] focus:outline-0' />
                    <input
                        ref={typesInputRef}
                        placeholder='Type ( Example : N, V, Adj, Adv, Prep, Phrase )'
                        className='text-[14px] mt-2 h-[38px] px-2 text-[#282828] w-full border-[1px] rounded-md border-[#cccccc] focus:outline-0' />
                </section>
                <section className='mt-3'>
                    <button
                        onClick={() => handleInsertWord()}
                        type='button'
                        className='hover:scale-[1.03] transition-all bg-[#4dac96] text-[white] px-[1rem] py-[0.5rem] rounded-md'
                    >Insert</button>
                </section>
                <i onClick={() => handles?.setShowForm(false)} className='bx bx-x text-[2rem] absolute right-2 top-2 text-[#999] cursor-pointer'></i>
            </form>
        </>
    )
}

export default FormSearchVocabulary
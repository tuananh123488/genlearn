import { TypeHTTP, api } from '@/utils/api/api'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StatusToast } from '../toast'
import { GrammarInterface, WordInterface } from '../context/interfaces'
import { ThemeContext } from '../context/themeContext'
import InputText from './input-text'

const FormSearchGrammar = () => {
    const [currentGrammar, setCurrentGrammar] = useState<GrammarInterface>()
    const { datas, handles } = useContext(ThemeContext) || {}
    const structureInputRef = useRef<HTMLInputElement | null>(null)
    const vietnameseInputRef = useRef<HTMLInputElement | null>(null)


    useEffect(() => {
        if (structureInputRef.current && vietnameseInputRef.current) {
            structureInputRef.current.value = currentGrammar?.structure || ''
            vietnameseInputRef.current.value = currentGrammar?.vietnamese || ''
        }
    }, [currentGrammar])

    const handleInsertWord = () => {
        if (structureInputRef.current && vietnameseInputRef.current) {
            if (datas?.user) {
                const body = {
                    user_id: datas.user._id,
                    structure: structureInputRef.current.value,
                    vietnamese: vietnameseInputRef.current.value,
                }
                api({ path: '/grammars', body: body, type: TypeHTTP.POST })
                    .then(res => {
                        const result = (res as GrammarInterface)
                        handles?.setGrammars([...datas?.grammars || [], result])
                        handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: 'Insert to My List Successfully' })
                        setCurrentGrammar(undefined)
                    })
                    .catch(res => {
                        handles?.handleSetNotification({ status: StatusToast.FAIL, message: res.message })
                    })
            }
        }
    }

    const handleRemoveGrammar = () => {
        api({ path: `/grammars/${currentGrammar?._id}`, type: TypeHTTP.DELETE })
            .then(res => {
                const result: any = res
                handles?.setGrammars(datas?.grammars.filter(item => item.structure.toLowerCase() !== result.structure.toLowerCase()) || [])
                handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: 'Remove from My List Successfully' })
                setCurrentGrammar(undefined)
            })
    }

    return (
        <>
            <section className='w-[40%] h-screen'>
                <InputText setCurrentGrammar={setCurrentGrammar || undefined} />
                {currentGrammar &&
                    <div className='px-[1.5rem] pt-[1.5rem]'>
                        <p className='font-poppins font-bold text-[2rem] text-[#4dac96]'>{currentGrammar?.structure}</p>
                        <p className='my-[1rem]'><b>Nghĩa Tiếng Việt:</b> {currentGrammar?.vietnamese}</p>
                    </div>}
                <div className='font-poppins w-full flex justify-end mt-[3rem]'>
                    {currentGrammar && <button
                        onClick={() => setCurrentGrammar(undefined)}
                        className='hover:scale-[1.03] transition-all bg-[#f04848] mr-[0.5rem] text-[white] px-[1rem] py-[0.5rem] rounded-md'
                    >Clear</button>}
                    {currentGrammar?._id && <button
                        onClick={() => handleRemoveGrammar()}
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
                        ref={structureInputRef}
                        placeholder='English ( Example : Book )'
                        className='text-[14px] mt-3 h-[38px] px-2 text-[#282828] w-full border-[1px] rounded-md border-[#cccccc] focus:outline-0' />
                    <input
                        ref={vietnameseInputRef}
                        placeholder='Vietnamese ( Example : Sách, Cuốn Sách, Vở )'
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

export default FormSearchGrammar
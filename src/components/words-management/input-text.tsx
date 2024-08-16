import React, { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import { InputTextInterface, WordInterface } from '../context/interfaces'
import { ThemeContext } from '../context/themeContext'

const InputText = ({ setCurrentWord }: InputTextInterface) => {

    const resultRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [words, setWords] = useState<WordInterface[]>([])
    const [language, setLanguage] = useState<string>('en')
    const [input, setInput] = useState<string>('')
    const { datas, handles } = useContext(ThemeContext) || {}

    useEffect(() => {
        if (inputRef.current && resultRef.current) {
            inputRef.current.value = ''
            resultRef.current.style.height = '0'
            setWords([])
        }
    }, [language])

    useEffect(() => {
        if (resultRef.current) {
            if (input !== '') {
                resultRef.current.style.height = 'auto'
                const results: WordInterface[] = []
                handles?.getTotalVocabularies().forEach(voca => {
                    if (language === 'en') {
                        if (voca.english.toLowerCase().includes(input.toLowerCase())) {
                            results.push(voca)
                        }
                    } else if (language === 'vi') {
                        if (voca.vietnamese.toLowerCase().includes(input.toLowerCase())) {
                            results.push(voca)
                        }
                    }
                })
                setWords(results)
            } else {
                resultRef.current.style.height = '0'
            }
        }
    }, [input])

    const handleChangeCurrentWord = (word: WordInterface) => {
        if (inputRef.current && resultRef.current) {
            inputRef.current.value = ''
            resultRef.current.style.height = '0'
            setCurrentWord(word)
            setWords([])
        }
    }

    return (
        <div className='relative'>
            <input
                ref={inputRef}
                onChange={(e: any) => setInput(e.target.value)}
                type='text'
                placeholder={language === 'en' ? 'Enter Vocabulary' : 'Vui lòng nhập từ vựng'}
                className='txt-input text-[13px] pl-10 pr-16 w-full h-[2.5rem] border-[#e3e3e3] border-[2px] focus:outline-0 rounded-lg'
            />
            <i className='top-[50%] translate-y-[-50%] left-[10px] text-[#999] text-[1.5rem] absolute bx bx-search' />
            <div ref={resultRef} className='h-0 transition-all absolute max-h-[300px] overflow-y-auto rounded-b-xl w-full bg-[#f4f4f4]'>
                {words.length > 0 ?
                    words.map((word, index) => (
                        <div onClick={() => handleChangeCurrentWord(word)} key={index} className='rounded-md hover:bg-[#4cac95] hover:text-[white] transition w-full cursor-pointer px-[1rem] py-[1rem] my-[5px] font-semibold flex justify-between'>
                            <span className='text-[14px] w-[420px] bg-green'><span className='uppercase'>
                                {word.english}
                            </span> : {word.vietnamese}
                            </span>
                            <span className='text-[14px] w-[150px] flex justify-end items-center'>
                                <span>{word.types.join(', ')}</span>
                                <span className='ml-2 text-[white] text-[12px] border-[2px] bg-[#fd5a5a] border-none p-[5px] rounded-[5px]'>EN</span>
                            </span>
                        </div>
                    ))
                    :
                    <div className='flex justify-center items-center h-[4rem] font-semibold'>
                        Not Found Vocabulary
                    </div>
                }
            </div>
            <select onChange={(e) => setLanguage(e.target.value)} className='focus:outline-none rounded-md absolute right-2 top-[50%] translate-y-[-50%] text-[13px] px-[5px] py-[2px] border-[1px] border-[#999]'>
                <option className='flex' value='en'>
                    EN
                </option>
                <option className='flex' value='vi'>
                    VI
                </option>
            </select>
        </div>
    )
}

export default InputText
import React, { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import { GrammarInterface, InputTextInterface, WordInterface } from '../context/interfaces'
import { ThemeContext } from '../context/themeContext'

const InputText = ({ setCurrentGrammar }: { setCurrentGrammar: React.Dispatch<React.SetStateAction<GrammarInterface | undefined>> }) => {

    const resultRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [grammars, setGrammars] = useState<GrammarInterface[]>([])
    const [language, setLanguage] = useState<string>('en')
    const [input, setInput] = useState<string>('')
    const { datas, handles } = useContext(ThemeContext) || {}

    useEffect(() => {
        if (inputRef.current && resultRef.current) {
            inputRef.current.value = ''
            resultRef.current.style.height = '0'
            setGrammars([])
        }
    }, [language])

    useEffect(() => {
        if (resultRef.current) {
            if (input !== '') {
                resultRef.current.style.height = 'auto'
                const results: GrammarInterface[] = []
                datas?.grammars.forEach(voca => {
                    if (language === 'en') {
                        if (voca.structure.toLowerCase().includes(input.toLowerCase())) {
                            results.push(voca)
                        }
                    } else if (language === 'vi') {
                        if (voca.vietnamese.toLowerCase().includes(input.toLowerCase())) {
                            results.push(voca)
                        }
                    }
                })
                setGrammars(results)
            } else {
                resultRef.current.style.height = '0'
            }
        }
    }, [input])

    const handleChangeCurrentGrammar = (word: GrammarInterface) => {
        if (inputRef.current && resultRef.current) {
            inputRef.current.value = ''
            resultRef.current.style.height = '0'
            setCurrentGrammar(word)
            setGrammars([])
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
                {grammars.length > 0 ?
                    grammars.map((word, index) => (
                        <div onClick={() => handleChangeCurrentGrammar(word)} key={index} className='rounded-md hover:bg-[#4cac95] hover:text-[white] transition w-full cursor-pointer px-[1rem] py-[1rem] my-[5px] font-semibold flex justify-between'>
                            <span className='text-[14px] w-[420px] bg-green'><span className='uppercase'>
                                {word.structure}
                            </span> : {word.vietnamese}
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
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ResultPracticeVocabularyInterface, WordInterface } from '../context/interfaces'
import { Input, Button } from '@material-tailwind/react'
import { Box } from './option'
import { ThemeContext } from '../context/themeContext'
import { StatusToast } from '../toast'
import { getFinalMessage, messageCorrect, messageFail, shuffleArray } from '@/utils/vocabulary/vocabulary'

export interface FormPractice {
    setResults: React.Dispatch<React.SetStateAction<ResultPracticeVocabularyInterface[]>>
    vocabulariesPractice: WordInterface[]
    current: number,
    languages: string
    setVocabulariesPractice: React.Dispatch<React.SetStateAction<WordInterface[]>>
}

const FormPractice = ({ setVocabulariesPractice, setResults, vocabulariesPractice, current, languages }: FormPractice) => {

    const currentVocabulary = vocabulariesPractice[current]
    const inputRef = useRef<any>(null)
    const [result, setResult] = useState<string>('')
    const { datas, handles } = useContext(ThemeContext) || {}
    const [percent, setPercent] = useState<{ true: number, false: number }>({ true: 0, false: 0 })

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            handleSubmitResult()
        }
    };

    const handleSubmitResult = () => {
        if (result === '') {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Please Enter Your Answer' })
        } else {
            const r: ResultPracticeVocabularyInterface = {
                english: currentVocabulary.english,
                vietnamese: currentVocabulary.vietnamese,
                result: result
            }
            if (languages === 'en->vi') {
                if (currentVocabulary.vietnamese.includes(result)) {
                    handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: shuffleArray(messageCorrect)[0] })
                    setPercent({ ...percent, true: percent.true + 1 })
                } else {
                    handles?.handleSetNotification({ status: StatusToast.FAIL, message: shuffleArray(messageFail)[0] })
                    setPercent({ ...percent, false: percent.false + 1 })
                }
            } else {
                if (currentVocabulary.english === result) {
                    handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: shuffleArray(messageCorrect)[0] })
                    setPercent({ ...percent, true: percent.true + 1 })
                } else {
                    handles?.handleSetNotification({ status: StatusToast.FAIL, message: shuffleArray(messageFail)[0] })
                    setPercent({ ...percent, false: percent.false + 1 })
                }
            }
            setResult('')
            setResults(prev => [...prev, r])
        }
    }

    useEffect(() => {
        if ((current + 1) > vocabulariesPractice.length) {
            handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: "You have completed the test, let's see the results" })
        }
    }, [current])

    return (
        <>
            {(current + 1) <= vocabulariesPractice.length ?
                <section className='w-[30%] flex flex-col items-center'>
                    <img src='/book.png' width={'35%'} />
                    <h2 className='text-[20px]'>{languages === 'en->vi' ? `" ${currentVocabulary?.english} " là gì trong Tiếng Việt?` : `What is " ${currentVocabulary?.vietnamese} " in English?`}</h2>
                    <Box />
                    <Input
                        onKeyDown={handleKeyDown}
                        onChange={(e: any) => setResult(e.target.value)}
                        ref={inputRef}
                        value={result}
                        className='w-full'
                        label='Your Answer'
                        crossOrigin="anonymous"
                    />
                    <Box />
                    <Button
                        onClick={() => handleSubmitResult()}
                        className='font-poppins'
                        placeholder="YourPlaceholderText"
                    >Confirm</Button>
                </section>
                :
                <section className='w-[30%] flex flex-col items-center justify-center'>
                    <img src='/book.png' width={'35%'} />
                    <h2 className='text-[20px]'>Your correct answer rate is {((percent.true / (percent.true + percent.false)) * 100).toFixed(1)}%</h2>
                    <p className='text-center my-3'>{getFinalMessage((percent.true / (percent.true + percent.false)) * 100)}</p>
                    <Button
                        onClick={() => setVocabulariesPractice([])}
                        className='font-poppins'
                        placeholder="YourPlaceholderText"
                    >Confirm</Button>
                </section>
            }
        </>
    )
}

export default FormPractice
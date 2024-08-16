import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { BroadcastInterface, ResultInterface, SubtitleInterface } from '../context/interfaces';
import { Input, Button } from '@material-tailwind/react';
import { HandleCompareStrings, handleCurrentScript, handleStringOnlyText } from '@/utils/broadcast/broadcast';
import { ThemeContext } from '../context/themeContext';
import { StatusToast } from '../toast';
import { getFinalMessage, messageCorrect, messageFail, shuffleArray } from '@/utils/vocabulary/vocabulary';

interface TestLayoutInterface {
    currentBroadcast: BroadcastInterface
    setTestPayload: React.Dispatch<React.SetStateAction<{
        startTest: boolean,
        sessionsEnglish: SubtitleInterface[]
        sessionsVietnamese: SubtitleInterface[]
    }>>
    testPayload: {
        startTest: boolean,
        sessionsEnglish: SubtitleInterface[]
        sessionsVietnamese: SubtitleInterface[]
    }
    setCurrentBroadcast: React.Dispatch<React.SetStateAction<BroadcastInterface | undefined>>
}

const TestLayout = ({ setCurrentBroadcast, currentBroadcast, testPayload, setTestPayload }: TestLayoutInterface) => {

    const { datas, handles } = useContext(ThemeContext) || {}
    const reactPlayerRef = useRef<ReactPlayer>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [currentSession, setCurrentSession] = useState<number>(0)
    const [playing, setPlaying] = useState<boolean>(false)
    const [results, setResults] = useState<ResultInterface[]>([])
    const [complete, setComplete] = useState<boolean>(false)
    const [percent, setPercent] = useState<{ true: number, false: number }>({ true: 0, false: 0 })
    const [currentScript, setCurrentScript] = useState('')

    const handleStart = () => {
        if (reactPlayerRef.current) {
            reactPlayerRef.current.seekTo(testPayload.sessionsEnglish[0].firstTime - 0.1)
            setPlaying(true)
        }
    }

    const handleOnProgress = () => {
        if (reactPlayerRef.current && inputRef.current && buttonRef.current) {
            const currentTime = reactPlayerRef.current.getCurrentTime()
            if (currentTime >= testPayload.sessionsEnglish[currentSession].lastTime + 0.1) {
                setPlaying(false)
                inputRef.current.disabled = false
                buttonRef.current.disabled = false
                inputRef.current.focus()
                setCurrentScript(handleCurrentScript(testPayload.sessionsEnglish[currentSession].content))
                if (testPayload.sessionsEnglish[currentSession + 1].firstTime - testPayload.sessionsEnglish[currentSession].lastTime < 0.5)
                    reactPlayerRef.current.seekTo(testPayload.sessionsEnglish[currentSession + 1].firstTime)
            }
        }
    }

    const handleSubmit = () => {
        if (inputRef.current && buttonRef.current) {
            if (inputRef.current.value !== '') {
                inputRef.current.blur()
                const result: ResultInterface = {
                    english: testPayload.sessionsEnglish[currentSession].content,
                    vietnamese: testPayload.sessionsVietnamese[currentSession].content,
                    result: currentScript.replace('_____', inputRef.current.value.toLowerCase().replaceAll(' ', ''))
                }
                if (handleStringOnlyText(result.english).toLowerCase().trim() === handleStringOnlyText(result.result).toLowerCase().trim()) {
                    handles?.handleSetNotification({ status: StatusToast.SUCCESS, message: shuffleArray(messageCorrect)[0] })
                    setPercent({ ...percent, true: percent.true + 1 })
                } else {
                    handles?.handleSetNotification({ status: StatusToast.FAIL, message: shuffleArray(messageFail)[0] })
                    setPercent({ ...percent, false: percent.false + 1 })
                }
                setCurrentScript('')
                setResults([result, ...results])
                inputRef.current.blur()
                inputRef.current.disabled = true
                buttonRef.current.disabled = true
                inputRef.current.value = ''
                if (currentSession < testPayload.sessionsEnglish.length - 1) {
                    setCurrentSession(prev => prev + 1)
                    setPlaying(true)
                } else {
                    setComplete(true)
                }
            }
        }
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        };
    }

    return (
        <section className='mt-[5rem] mb-[2rem] px-[2rem]'>
            <h1 className='mb-4 font-poppins text-[24px] font-bold'>Listen and Write English</h1>
            <div className='flex gap-[2rem] w-full'>
                <div className='w-[60%] h-[550px] border-r-[1px] border-[#cfcfcf] overflow-hidden pl-[2rem]'>
                    <div className='flex flex-col'>
                        <div className='text-[20px] text-[#6dbaa8]'>
                            {currentScript}
                        </div>
                        <div className='flex items-center gap-3 justify-start pr-[2rem] py-[10px]'>
                            <input
                                disabled
                                onKeyDown={(e: any) => handleKeyDown(e)}
                                ref={inputRef}
                                className='focus:border-[2px] transition-all border-[1px] text-[13px] px-[10px] w-full border-[#dedede] rounded-lg focus:outline-0 h-[40px] answer'
                                placeholder='Your Answer' />
                            <Button
                                ref={buttonRef}
                                disabled
                                onClick={() => handleSubmit()}
                                className='text-[13px] font-poppins w-[150px] h-[40px] flex items-center justify-center'
                                placeholder="YourPlaceholderText"
                            >Submit</Button>
                        </div>
                    </div>
                    <div className='w-full max-h-[400px] transition-all overflow-y-auto'>
                        <h2 className='mt-7 text-[#363636] font-poppins text-[22px] font-semibold'>Your Answer</h2>
                        {results.map((item, index) => (
                            <p
                                key={index}
                                className={`min-h-[50px] mt-5 justify-center flex flex-col transition-all`}
                            >
                                <span className='font-poppins text-[19px] result'>{HandleCompareStrings(item.result, item.english)}</span>
                                <span className='font-poppins text-[19px] english'>{item.english}</span>
                                <span className='vietnamese'>{item.vietnamese}</span>
                            </p>
                        ))}
                    </div>
                </div>
                {complete === false ?
                    <div className='w-[40%]'>
                        <div className='w-full rounded-lg overflow-hidden h-[395px]'>
                            <ReactPlayer
                                config={{
                                    youtube: {
                                        playerVars: {
                                            rel: 0, // Tắt gợi ý video liên quan 
                                            fs: 0,
                                        },
                                    },
                                    facebook: {
                                        appId: '12345'
                                    }
                                }}
                                playing={playing}
                                onStart={() => handleStart()}
                                onPlay={() => setPlaying(true)}
                                onPause={() => setPlaying(false)}
                                controls
                                url={currentBroadcast.urlVideo}
                                ref={reactPlayerRef}
                                width={'100%'}
                                height={'100%'}
                                progressInterval={1}
                                onProgress={() => handleOnProgress()}
                            />
                        </div>
                        <h2 className='font-poppins text-[21px] mt-4 font-semibold'>{currentBroadcast.title}</h2>
                        <h3 className='font-poppins mt-1 text-[18px]'><b>From </b>{currentBroadcast.channelName}</h3>
                        <div className='my-4 w-full flex justify-end'>

                        </div>
                    </div>
                    :
                    <div className='w-[40%] flex flex-col justify-center items-center'>
                        <img src='/book.png' width={'35%'} />
                        <h2 className='text-[20px]'>Your correct answer rate is {((percent.true / (percent.true + percent.false)) * 100).toFixed(1)}%</h2>
                        <p className='text-center my-3'>{getFinalMessage((percent.true / (percent.true + percent.false)) * 100)}</p>
                        <Button
                            onClick={() => {
                                setCurrentBroadcast(undefined)
                                setTestPayload({ sessionsEnglish: [], sessionsVietnamese: [], startTest: false })
                            }}
                            className='font-poppins'
                            placeholder="YourPlaceholderText"
                        >Confirm</Button>
                    </div>
                }
            </div>
        </section>
    )
}
export default TestLayout
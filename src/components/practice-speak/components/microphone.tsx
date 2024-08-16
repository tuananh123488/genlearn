import React, { useEffect, useRef, useState } from 'react'


declare global {
    interface Window {
        webkitSpeechRecognition: any
    }
}

interface MicroPhoneInterface {
    inputRef: React.RefObject<HTMLInputElement>
    isRecord: boolean
    setIsRecord: React.Dispatch<React.SetStateAction<boolean>>
}

const MicroPhone = ({ inputRef, isRecord, setIsRecord }: MicroPhoneInterface) => {

    const recognitionRef = useRef<any>(null)
    const [transcript, setTranscript] = useState('')

    const handleStart = () => {
        setTranscript('')
        recognitionRef.current = new window.webkitSpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.onresult = (e: any) => {
            const { transcript } = e.results[e.results.length - 1][0]
            setTranscript(transcript)
        }
        recognitionRef.current.start()
        setIsRecord(true)
    }

    const handleEnd = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
            setIsRecord(false)
        }
    }

    return (
        <div className='w-full font-poppins transition-all bg-[white] shadow-xl py-5 px-4 flex items-end justify-between rounded-md overflow-hidden gap-4'>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    <h3 className='font-bold mb-1'>{isRecord ? 'Recording' : 'Record'}</h3>
                    {isRecord && <div className='bg-[#e93c3c] h-[20px] w-[20px] animate-pulse rounded-full'></div>}
                </div>
                {isRecord && <h4 className='mb-1'>Start Speaking</h4>}
                <input ref={inputRef} value={transcript} readOnly className='focus:outline-0 border-[#d7d7d7] w-full border-[1px] h-[40px] px-2 rounded-md' placeholder={isRecord ? 'Speaking...' : 'Some Words'} />
            </div>
            {!isRecord ?
                <button onClick={() => handleStart()} className='transition-all text-[30px] text-[#4dac96] focus:outline-0 flex justify-center items-end translate-y-[-5px]'>
                    <i className='bx bx-microphone'></i>
                </button>
                :
                <button onClick={() => handleEnd()} className='transition-all text-[40px] text-[#4dac96] focus:outline-0 flex justify-center items-end'>
                    <i className='bx bx-pause-circle' ></i>
                </button>
            }
        </div>
    )
}

export default MicroPhone
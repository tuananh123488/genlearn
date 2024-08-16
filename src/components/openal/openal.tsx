'use client'
import { api, TypeHTTP } from '@/utils/api/api'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../context/themeContext';
import { log } from 'console';
export interface Message {
    sender: string;
    message: string;
    type?: string
};
const ChatBot = () => {


    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<any>([{ sender: 'chatbot', message: 'Chào bạn, tôi có thể giúp gì được cho bạn?' }])
    const [message, setMessage] = useState('')
    const [previous, setPrevious] = useState('')
    const messageRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        setTimeout(() => {
            if (messageRef.current) {
                messageRef.current.scrollTo({
                    top: messageRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }, 400);
    }, [messages]);
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleSendMessage()
        }
    };

    const handleSendMessage = () => {
        const content = message;
        setMessage('');
        setMessages((prevMessages: any) => [...prevMessages, { sender: 'me', message: content }]);
        api({ path: '/openai/ask', body: { content: content, previous }, type: TypeHTTP.POST })
            .then(res => {
                setMessages((prevMessages: any) => [...prevMessages, { sender: 'chatbot', message: res }]);
                setPrevious(prev => prev + content + ' : ' + res);
            });
    };



    return (
        <div style={open ? { backgroundColor: '#FFFDFD', width: '350', height: '400', transition: '0.5s', boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)' } : { width: 'auto', height: 'auto', transition: '0.5s' }} className='form rounded-md overflow-hidden fixed z-50 bottom-3 right-3'>
            {open ?
                <div className='flex flex-col'>
                    <button onClick={() => setOpen(false)}><i className='bx bx-x text-[27px] text-[#999] absolute top-1 right-1'></i></button>
                    <div className='w-full h-[60px] flex items-center gap-1 px-2 border-[#eeeeee] border-b-[1px]'>
                        <img src='/cskh.png' width={'50px'} />
                        <div className='flex flex-col'>
                            <span className='text-[16px] font-semibold'>Care customer</span>
                            <div className='flex items-center gap-2'>
                                <div className='bg-[green] rounded-full w-[10px] h-[10px]' />
                                <span className='text-[12px]'>Action 24/24</span>
                            </div>
                        </div>
                    </div>
                    <div ref={messageRef} className='w-full h-[385px] flex flex-col gap-4 px-2 py-2 overflow-y-auto'>
                        {messages.map((item: any, index: any) => (
                            <div style={{ justifyContent: item.sender === 'me' ? 'right' : 'left' }} className='w-full text-[14px] flex items-start' key={index}>
                                {item.sender !== 'me' && <img src='/cskh.png' width={'35px'} />}
                                {item.type ?
                                    <div className='text-[13px] translate-y-2'>
                                        {item.message}
                                    </div>
                                    :
                                    <div className='max-w-[70%] bg-[#eaeaea] rounded-md p-2 flex items-start'>
                                        {item.message}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className='w-full h-[60px] flex px-1 gap-1 items-center'>
                        <input onKeyDown={handleKeyDown} value={message} onChange={e => setMessage(e.target.value)} placeholder='Enter your question?' className='text-[13px] w-full border-[#ddd] border-[1px] rounded-md h-[35px] focus:outline-0 px-2' />
                        <button onClick={() => handleSendMessage()} className='text-[14px] bg-[#4b881f] text-[white] px-3 h-[35px] rounded-md'>Send</button>
                    </div>
                </div>
                :
                <>
                    <img onClick={() => setOpen(true)} src={'/iconmess.png'} className='w-[50px] cursor-pointer' />
                </>
            }
        </div >
    )
}


export default ChatBot
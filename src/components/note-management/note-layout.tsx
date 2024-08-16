import { FormatTextByType, debounce } from '@/utils/note/note'
import React, { use, useContext, useEffect, useRef, useState } from 'react'
import { ContentInterface, NoteInterface, TypeText } from '../context/interfaces'
import { NoteContext } from './note-management-context'
import { TypeHTTP, api } from '@/utils/api/api'
import { ThemeContext } from '../context/themeContext'

interface NoteLayoutInterface {
    typeText: TypeText
}

const NoteLayout = ({ typeText }: NoteLayoutInterface) => {
    const { listData, listHandler } = useContext(NoteContext) || {}
    const [folderName, setFolderName] = useState('')
    const [currentLine, setCurrentLine] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const { datas } = useContext(ThemeContext) || {}
    const [update, setUpdate] = useState(false)
    const [focusTitle, setFocusTitle] = useState(false)
    const [focus, setFocus] = useState(false)
    const [prevCurrentLine, setPrevCurrentLine] = useState(0)
    const [inputTitle, setInputTitle] = useState('')

    useEffect(() => {
        if (listData?.currentNote) {
            if (listData.currentNote.content[currentLine]?.type === TypeText.IMAGE) {
                if (currentLine < prevCurrentLine) {
                    setCurrentLine(prev => prev - 1)
                } else {
                    setCurrentLine(prev => prev + 1)
                }
            } else {
                if (currentLine < listData.currentNote.content.length) {
                    setFocus(true)
                } else {
                    setFocus(false)
                }
                const imagesLength = listData.currentNote.content.filter(item => item.type === TypeText.IMAGE).length
                if (listData.currentNote.content.length - imagesLength === 0) {
                    setFocus(false)
                }
                setInputValue(listData.currentNote.content[currentLine] ? listData.currentNote.content[currentLine]?.content + '' : '')
            }
        }
    }, [currentLine])

    useEffect(() => {
        if (listData?.currentNote && update === false) {
            setCurrentLine(listData.currentNote.content.length)
            setUpdate(true)
        }
        setFolderName(datas?.folders.filter(item => item._id === listData?.currentNote?.folder)[0]?.name || '')
    }, [listData?.currentNote])

    const handleKeyDownForTitle: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            let note = listData?.currentNote
            if (note) {
                if (inputTitle !== '') {
                    note.title = inputTitle
                    listHandler?.setCurrentNote(note)
                    handleSave()
                    setFocus(false)
                    setFocusTitle(false)
                }
            }
        }
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            handleUpdateNote()
            handleSave()
            setCurrentLine(prev => prev + 1)
        } else if (event.code === 'ArrowUp') {
            if (currentLine !== 0) {
                handleSave()
                setPrevCurrentLine(currentLine)
                setCurrentLine(prev => prev - 1)

            }
        } else if (event.code === 'ArrowDown') {
            if (currentLine !== listData?.currentNote?.content.length || 0) {
                handleSave()
                setPrevCurrentLine(currentLine)
                setCurrentLine(prev => prev + 1)
            }
        } else if (event.code === 'Backspace') {
            let note = listData?.currentNote
            if (inputValue === '' && note) {
                if (focus === false && currentLine > 0) {
                    setFocus(true)
                } else {
                    const arr: ContentInterface[] = note.content.filter((item, index) => index !== currentLine)
                    note.content = arr.filter((item, index) => item.content !== '')
                    listHandler?.setCurrentNote(note)
                    handleSave()
                }
                setPrevCurrentLine(currentLine)
                setCurrentLine(prev => prev - 1)
            }
        }
    }

    const handleUpdateNote = () => {
        let note = listData?.currentNote
        if (note?.content && listData?.currentNote?.content) {
            if (focus === false) {
                note.content = [...listData.currentNote.content, { type: typeText, content: inputValue }]
            } else {
                note.content[currentLine] = { type: typeText, content: inputValue }
            }
        }
        listHandler?.setCurrentNote(note)
    }

    const handleSave = () => {
        let body: NoteInterface
        let content = listData?.currentNote?.content || []
        body = { _id: listData?.currentNote?._id, title: listData?.currentNote?.title || '', user_id: listData?.currentNote?.user_id || '', folder: listData?.currentNote?.folder || '', content: content }
        api({ path: '/notes', type: TypeHTTP.PUT, body: body })
            .then(res => {
                if (typeText === TypeText.IMAGE) {
                    const result = res as NoteInterface
                    listHandler?.setCurrentNote(result)
                }
            })
        setInputValue('')
    }

    const handleChange = (e: any) => {
        if (typeText === TypeText.IMAGE) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e1) {
                    const base64String = e1?.target?.result;
                    let note = listData?.currentNote
                    if (note && listData?.currentNote) {
                        note.content = [...listData.currentNote.content, { type: typeText, content: base64String + '' }]
                        listHandler?.setCurrentNote(note)
                        handleSave()
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            setInputValue(e.target.value)
        }
    }

    const handleRemoveImage = (str: string) => {
        let note = listData?.currentNote
        if (note && listData?.currentNote) {
            note.content = listData.currentNote.content.filter(item => item.content !== str)
            listHandler?.setCurrentNote(note)
            handleSave()
        }
    }

    return (
        <>
            {listData?.currentNote !== undefined ?
                (<div className='flex-col text-[15px] w-[83%] flex items-start justify-start overflow-y-auto pt-[6rem] bg-[white] h-screen px-[4rem] pb-[4rem]'>
                    {(focusTitle) ?
                        (<input
                            onKeyDown={(e: any) => handleKeyDownForTitle(e)}
                            type="text"
                            autoFocus
                            value={inputTitle}
                            onChange={(e: any) => setInputTitle(e.target.value)}
                            className={`py-1 w-full border-b-[1px] border-[#c5c5c5] focus:outline-0 font-semibold text-[25px]`}
                            placeholder='Enter a title' />)
                        :
                        (<div
                            onClick={() => setFocusTitle(true)}
                            className='mb-4'>
                            <h1 className='text-[25px] font-semibold'>{listData?.currentNote?.title}</h1>
                            <span>Of {folderName}</span>
                        </div>)
                    }
                    {listData?.currentNote?.content.map((item, index) => {
                        if (index === currentLine && focus === true && focusTitle === false) {
                            return (
                                <input
                                    autoFocus
                                    key={index}
                                    onKeyDown={(e: any) => handleKeyDown(e)}
                                    type={typeText === TypeText.IMAGE ? 'file' : "text"}
                                    value={inputValue}
                                    onChange={(e: any) => handleChange(e)}
                                    className={`py-1 w-full border-b-[1px] border-[#c5c5c5] focus:outline-0
                                ${typeText === TypeText.H1 && 'text-[20px] font-semibold '}
                                ${typeText === TypeText.H2 && 'text-[18px] font-semibold '}
                                ${typeText === TypeText.H3 && 'text-[16px] font-semibold '}
                            `}
                                    placeholder={listData?.currentNote?.title === '' ? 'Enter a title' : 'Enter content'} />
                            )
                        } else {
                            if (item.type === TypeText.IMAGE) {
                                return (
                                    <div key={index} className='w-full relative'>
                                        <i onClick={() => handleRemoveImage(item.content)} className='bx bx-x absolute top-[5px] cursor-pointer right-[5px] text-[35px] text-[white]'></i>
                                        <img width={'100%'} src={item.content} />
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        onClick={() => {
                                            setCurrentLine(index)
                                        }}
                                        className={`my-1`}
                                        key={index}>
                                        {FormatTextByType(item)}
                                    </div>
                                )
                            }
                        }
                    })}
                    {focus === false &&
                        <input
                            onKeyDown={(e: any) => { typeText !== TypeText.IMAGE && handleKeyDown(e) }}
                            type={typeText === TypeText.IMAGE ? 'file' : "text"}
                            autoFocus
                            value={inputValue}
                            onChange={(e: any) => handleChange(e)}
                            className={`py-1 w-full border-b-[1px] border-[#c5c5c5] focus:outline-0
                        ${typeText === TypeText.H1 && 'text-[20px] font-semibold '}
                        ${typeText === TypeText.H2 && 'text-[18px] font-semibold '}
                        ${typeText === TypeText.H3 && 'text-[16px] font-semibold '}
                    `}
                            placeholder={'Enter a content'} />}
                </div>)
                :
                (<div className='flex flex-col items-center justify-center w-full'>
                    <img className='w-[200px]' src='/note.png' />
                    <h1 className='text-[26px] text-[#6b6b6b] mt-[1rem]'>Note Management</h1>
                    <img className='w-[150px] mt-[1rem] translate-x-[-5px]' src='/logo.png' />
                </div>)
            }
        </>
    )
}

export default NoteLayout
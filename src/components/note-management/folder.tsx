import React, { useContext, useState } from 'react'
import Note from './note'
import { FolderInterface, NoteInterface, TypeText } from '../context/interfaces'
import { TypeHTTP, api } from '@/utils/api/api'
import { ThemeContext } from '../context/themeContext'
import { NoteContext } from './note-management-context'

interface FolderPropsInterface {
    folder: FolderInterface
}

const Folder = ({ folder }: FolderPropsInterface) => {

    const [show, setShow] = useState(false)
    const { datas, handles } = useContext(ThemeContext) || {}
    const { listData, listHandler } = useContext(NoteContext) || {}

    const handleCreateNote = () => {
        api({ path: '/notes', type: TypeHTTP.POST, body: { title: 'Example Note', folder: folder._id, content: [], user_id: datas?.user?._id } })
            .then(res => {
                const result = (res as NoteInterface)
                handles?.setNotes(prev => [...prev, result])
            })
    }

    const handleRemoveFolder = (id: string) => {
        api({ path: `/folders/${id}`, type: TypeHTTP.DELETE })
            .then(res => {
                const result = res as FolderInterface
                handles?.setFolders(prev => {
                    return prev.filter(item => item._id !== result._id)
                })
                listHandler?.setCurrentNote(undefined)
            })
    }

    return (
        <div className='my-2 pl-2'>
            <span onClick={() => setShow(!show)} className='w-full font-semibold flex items-center relative text-[15px] cursor-pointer'>
                <span className=''>{folder.name}</span>
                <i className='bx bx-chevron-down text-[17px]' ></i>
                <i onClick={() => handleRemoveFolder(folder._id)} className='bx bx-x absolute right-2 text-[#999] top-[55%] translate-y-[-50%] text-[20px]'></i>
            </span>

            <div className={`pl-5 transition-all overflow-hidden ${show === true ? 'h-[auto]' : 'h-0'}`}>
                {datas?.notes.map((item, index) => {
                    if (item.folder === folder._id) {
                        return (
                            <Note note={item} key={index} />
                        )
                    }
                })}
                <div onClick={() => handleCreateNote()} className='text-[13px] text-[#6dbaa8] flex items-center my-1 cursor-pointer'>
                    <i className='bx bx-plus text-[18px] text-[#6dbaa8]' ></i>
                    <span className=' border-[#6dbaa8]'>Create a note</span>
                </div>
            </div>
        </div>
    )
}

export default Folder
import React, { useContext } from 'react'
import { NoteContext } from './note-management-context'
import { NoteInterface } from '../context/interfaces'

interface NotePropsInterface {
    note: NoteInterface
}

const Note = ({ note }: NotePropsInterface) => {

    const { listData, listHandler } = useContext(NoteContext) || {}

    return (
        <div onClick={() => listHandler?.setCurrentNote(note)} className='my-1 text-[13px] cursor-pointer'>{note.title}</div>
    )
}

export default Note
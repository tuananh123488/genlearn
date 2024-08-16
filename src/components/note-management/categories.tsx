import React, { useContext, useRef, useState } from 'react'
import Category from './category'
import Folder from './folder'
import { FolderInterface, NoteInterface, TypeText } from '../context/interfaces'
import { ThemeContext } from '../context/themeContext'
import { TypeHTTP, api } from '@/utils/api/api'
import { NoteContext } from './note-management-context'

interface CategoriesInterface {
    setTypeText: React.Dispatch<React.SetStateAction<TypeText>>
    typeText: TypeText
}

const Categories = ({ setTypeText, typeText }: CategoriesInterface) => {

    const { datas, handles } = useContext(ThemeContext) || {}
    const inputFolderNameRef = useRef<HTMLInputElement>(null)
    const { listHandler } = useContext(NoteContext) || {}

    const handleCreateFolder = () => {
        api({ path: '/folders', type: TypeHTTP.POST, body: { name: inputFolderNameRef.current?.value, user_id: datas?.user?._id } })
            .then(res => {
                const result = (res as FolderInterface)
                handles?.setFolders([...datas?.folders || [], result])
            })
    }


    return (
        <div className='h-screen overflow-y-auto overflow-x-hidden w-[17%] pt-[5rem] border-r-[1px] border-[#d8d8d8] pl-[1.5rem]'>
            <h2 className='font-poppins text-[19px]'>Elements</h2>
            {/* <div className='w-[100%] cursor-pointer flex items-center my-3 ml-[1rem] gap-2'>
                <i className='bx bx-align-left text-[21px]'></i>
                <i className='bx bx-align-middle text-[21px]' ></i>
                <i className='bx bx-align-right text-[21px]' ></i>
            </div> */}
            <Category setTypeText={setTypeText} currentType={typeText} type={TypeText.H1} name='Heading 1' icon='bx bx-heading' />
            <Category setTypeText={setTypeText} currentType={typeText} type={TypeText.H2} name='Heading 2' icon='bx bx-heading' />
            <Category setTypeText={setTypeText} currentType={typeText} type={TypeText.H3} name='Heading 3' icon='bx bx-heading' />
            <Category setTypeText={setTypeText} currentType={typeText} type={TypeText.TEXT} name='Text' icon='bx bx-text' />
            {/* <Category setTypeText={setTypeText} currentType={typeText} type={TypeText.TABLE} name='Table' icon='bx bx-table' /> */}
            <Category setTypeText={setTypeText} currentType={typeText} type={TypeText.IMAGE} name='Image' icon='bx bx-image-alt' />
            <h2 className='font-poppins text-[19px] flex items-center mt-4'>Notes</h2>
            <div onClick={() => handles?.setShowForm(true)} className='text-[14px] text-[#6dbaa8] flex items-center my-1 cursor-pointer'>
                <i className='bx bx-plus text-[22px] text-[#6dbaa8]' ></i>
                <span className='font-semibold border-[#6dbaa8]'>Create a folder</span>
            </div>
            {datas?.folders.map((item, index) => (
                <Folder folder={item} key={index} />
            ))}

            <form className={` shadow-2xl transition-[0.8s] px-[2rem] py-[2rem] left-[50%] ${datas?.showForm ? 'top-[50%]' : 'top-[-50%]'} translate-y-[-50%] translate-x-[-50%] z-20 rounded-lg w-[400px] bg-white fixed`}>
                <section className='font-poppins text-[1.5rem] font-semibold text-[#4dac96]'>
                    Create Folder
                </section>
                <section>
                    <input
                        ref={inputFolderNameRef}
                        placeholder='Ex: Design Pattern'
                        className='text-[14px] mt-3 h-[38px] px-2 text-[#282828] w-full border-[1px] rounded-md border-[#cccccc] focus:outline-0' />
                </section>
                <section className='mt-3'>
                    <button
                        onClick={() => handleCreateFolder()}
                        type='button'
                        className='hover:scale-[1.03] transition-all bg-[#4dac96] text-[white] px-[1rem] py-[0.5rem] rounded-md'
                    >Create</button>
                </section>
                <i onClick={() => handles?.setShowForm(false)} className='bx bx-x text-[2rem] absolute right-2 top-2 text-[#999] cursor-pointer'></i>
            </form>
        </div>
    )
}

export default Categories
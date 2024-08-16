import React from 'react'
import { TypeText } from '../context/interfaces'

interface CategoryInterface {
    name: string,
    icon: string,
    setTypeText: React.Dispatch<React.SetStateAction<TypeText>>
    type: TypeText,
    currentType: TypeText
}

const Category = ({ name, icon, setTypeText, type, currentType }: CategoryInterface) => {
    return (
        <div onClick={() => setTypeText(type)} className={`w-[100%] cursor-pointer flex items-center my-1 py-1 pl-1 rounded-md transition-all ml-[1rem] ${currentType === type && 'bg-[#e7e7e7]'}`}>
            <div className='flex items-center w-[38px]'>
                <i className={`${icon} text-[25px] text-[#5b5b5b]`} ></i>
            </div>
            <span className='font-poppins text-[13px]'>{name}</span>
        </div>
    )
}

export default Category

import React, { useContext, useState } from 'react'
import { Option, Select, Input, Button } from '@material-tailwind/react'
import { WordInterface } from '../context/interfaces'
import { ThemeContext } from '../context/themeContext'
import { StatusToast } from '../toast'
import { shuffleArray } from '@/utils/vocabulary/vocabulary'

export interface OptionsProp {
    results: WordInterface[]
    setResults: React.Dispatch<React.SetStateAction<WordInterface[]>>
    setVocabulariesPractice: React.Dispatch<React.SetStateAction<WordInterface[]>>
    setLanguages: React.Dispatch<React.SetStateAction<string>>
}

const Options = ({ results, setResults, setVocabulariesPractice, setLanguages }: OptionsProp) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { datas, handles } = useContext(ThemeContext) || {}
    const [options, setOptions] = useState<{
        list: string,
        type: string,
        numberOfVocabularies: number,
        from: number,
        to: number,
        languages: string
    }>({
        list: '',
        type: '',
        numberOfVocabularies: NaN,
        from: NaN,
        to: NaN,
        languages: ''
    })

    const handleChangeDataVocabularies = (e: any) => {
        setOptions({ ...options, list: e })
        if (e === 'my-list') {
            setResults(datas?.vocabularies || [])
        } else {
            setResults(handles?.getTotalQilearnVocabularies() || [])
        }
    }

    const handleStartTest = () => {
        const { list, type, numberOfVocabularies, from, to, languages } = options
        if (list === '') {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Please Choose List Vocabularies' })
            return
        }
        if (type === '') {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Please Choose Type' })
            return
        }
        if (Number.isNaN(numberOfVocabularies) && type === 'random') {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Please Enter Number Of Vocabulary' })
            return
        }
        if (Number.isNaN(from)) {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Please Enter From' })
            return
        }
        if (Number.isNaN(to)) {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Please Enter To' })
            return
        }
        if (languages === '') {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Please Choose Languages' })
            return
        }
        if (results.length < numberOfVocabularies && type === 'random') {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Invalid "Amount Of Test Vocabulary"' })
            return
        }
        if (results.length < (to - from + 1)) {
            handles?.handleSetNotification({
                status: StatusToast.WARNING, message: 'Invalid "To" and "From'
            })
            return
        }
        if (from >= to) {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: '"To" must be getter than "From' })
            return
        }
        if ((to - from + 1) < numberOfVocabularies && type === 'random') {
            handles?.handleSetNotification({ status: StatusToast.WARNING, message: 'Invalid "To" and "From' })
            return
        }
        setLoading(true)
        let vocas: WordInterface[] = []
        if (type === 'random') {
            const arr = shuffleArray(results.filter((item, index) => (index + 1) > from && (index + 1) <= to))
            vocas = arr.filter((item, index) => index < numberOfVocabularies)
        } else {
            vocas = results.filter((item, index) => (index + 1) >= from && (index + 1) <= to)
        }
        setVocabulariesPractice(vocas)
        setLanguages(languages)
        setLoading(false)
    }

    return (
        <section className='w-[30%] flex flex-col items-center'>
            <img src='/book.png' width={'35%'} />
            <h1 className='text-[1.5rem] font-poppins font-semibold mb-[2rem]'>Practice Vocabulary</h1>
            <Select
                onChange={(e: any) => handleChangeDataVocabularies(e)}
                label="Select an list"
                className='w-full'
                title="Dropdown"
                placeholder="Select an list"
            >
                <Option value='my-list'>My List</Option>
                <Option value='qilearn-list'>{"Qilearn's List"}</Option>
            </Select>
            <Box />
            <Select
                onChange={(e: any) => setOptions({ ...options, type: e })}
                label="Select Type"
                className='w-full'
                title="Dropdown"
                placeholder="Select Type"
            >
                <Option value='normal'>Normal</Option>
                <Option value='random'>Random</Option>
            </Select>
            <Box />
            <Input
                disabled={options.type !== 'random' && true}
                onChange={(e: any) => setOptions({ ...options, numberOfVocabularies: parseInt(e.target.value) })}
                className='w-full'
                pattern="[0-9]"
                label='Amount Of Test Vocabulary'
                crossOrigin="anonymous"
            />
            <Box />
            <Input
                onChange={(e: any) => setOptions({ ...options, from: parseInt(e.target.value) })}
                className='w-full'
                label='From'
                crossOrigin="anonymous"
            />
            <Box />
            <Input
                onChange={(e: any) => setOptions({ ...options, to: parseInt(e.target.value) })}
                className='w-full'
                label='To'
                crossOrigin="anonymous"
            />
            <Box />
            <Select
                onChange={(e: any) => setOptions({ ...options, languages: e })}
                label="Select an Languages"
                className='w-full'
                title="Dropdown"
                placeholder="Select an Languages"
            >
                <Option value='en->vi'>{'English to Vietnamese'}</Option>
                <Option value='vi->en'>{'Vietnamese to English'}</Option>
            </Select>
            <Box />
            <Button
                loading={loading}
                onClick={() => handleStartTest()}
                className='font-poppins'
                placeholder="YourPlaceholderText"
            >Start</Button>
        </section>
    )
}

export default Options
export const Box = () => {
    return <div className='my-2'></div>
}

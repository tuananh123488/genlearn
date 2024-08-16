import { list } from "postcss";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { NoteInterface } from "../context/interfaces";
import { TypeHTTP, api } from "@/utils/api/api";

export const NoteContext = createContext<{ listData: ListDataInterface, listHandler: ListHandlerInterface } | undefined>(undefined);

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

interface ListDataInterface {
    currentNote: NoteInterface | undefined
}

interface ListHandlerInterface {
    setCurrentNote: Dispatch<SetStateAction<NoteInterface | undefined>>
    handleUpdateNote: any
}

export const ProviderContext = ({ children }: ThemeContextProviderProps) => {

    const [currentNote, setCurrentNote] = useState<NoteInterface>()

    const handleUpdateNote = () => {
        api({ path: '/notes', type: TypeHTTP.PUT, body: currentNote })
            .then(res => {
                const result = res as NoteInterface
                setCurrentNote(result)
            })
    }

    const listData: ListDataInterface = {
        currentNote
    }

    const listHandler = {
        setCurrentNote,
        handleUpdateNote
    }

    return (
        <NoteContext.Provider value={{ listData, listHandler }}>
            {children}
        </NoteContext.Provider>
    )
}

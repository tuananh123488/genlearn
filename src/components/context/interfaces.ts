
export interface UserInterface {
    username?: string
    fullname: string
    image: string
    email: string
    type: TypeUser
    _id: string
}

export enum TypeText {
    TEXT = 'text',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    IMAGE = 'image',
    TABLE = 'table'
}

export interface UserSignUp {
    username: string
    fullname: string
    image: string
    email: string
    password: string
    confirmpassword: string
}
export enum TypeUser {
    NORMAL = 'normal',
    GOOGLE = 'google',
    GITHUB = 'github'
}

export interface WordInterface {
    _id?: any
    english: string
    vietnamese: string
    types: string[]
}

export interface InputTextInterface {
    setCurrentWord: React.Dispatch<React.SetStateAction<WordInterface | undefined>>
}

export interface PronouncesInterface {
    name: string,
    voiceName: string,
    image: string
}

export interface ResultPracticeVocabularyInterface {
    _id?: any
    english: string
    vietnamese: string
    result: string
}

export interface ResultPracticeGrammarInterface {
    _id?: any
    structure: string
    vietnamese: string
    result: string
}

export interface GrammarInterface {
    _id?: any
    structure: string
    vietnamese: string
    user_id?: string
}

export interface SubtitleInterface {
    id: number,
    firstTime: number,
    lastTime: number,
    content: string
}

export interface BroadcastInterface {
    _id?: any
    urlVideo: string
    englishSubtitle: SubtitleInterface[]
    vietnameseSubtitle: SubtitleInterface[]
    title: string
    channelName: string
    thum: string
    duration: string
}

export interface ResultInterface {
    english: string,
    vietnamese: string,
    result: string
}

export interface FolderInterface {
    name: string
    user_id: any
    _id?: any
}

export interface ContentInterface {
    type: TypeText,
    content: string
    // | {
    //     row: number,
    //     column: number,
    //     content: string[]
    // }
}

export interface NoteInterface {
    _id?: string
    title: string
    folder: string
    content: ContentInterface[]
    user_id: string
}
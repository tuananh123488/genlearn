import { ContentInterface, TypeText } from "@/components/context/interfaces"



export const FormatTextByType = (content: ContentInterface) => {
    try {
        if (content.type === TypeText.H1)
            return (
                <span className="text-[20px] font-semibold">{typeof content.content === 'string' && content.content}</span>
            )
        if (content.type === TypeText.H2)
            return (
                <span className="text-[18px] font-semibold">{typeof content.content === 'string' && content.content}</span>
            )
        if (content.type === TypeText.H3)
            return (
                <span className="text-[16px] font-semibold">{typeof content.content === 'string' && content.content}</span>
            )
        if (content.type === TypeText.TEXT)
            return (
                <span>{typeof content.content === 'string' && content.content}</span>
            )
    } catch (error) {

    }
}


export function debounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
    let timerId: NodeJS.Timeout;

    return function (this: any, ...args: Parameters<T>): void {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}
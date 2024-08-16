export const handleStringOnlyText: (str: string) => string = (str: string) => {
    let result = ''
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        if (char === ' ' || /[A-Za-z0-9']/.test(char))
            result += char
    }
    return result
}

export const HandleCompareStrings = (str1: string, str2: string) => {
    const arr1 = handleStringOnlyText(str1).toLowerCase().trim().split(' ')
    const arr2 = handleStringOnlyText(str2).toLowerCase().trim().split(' ')

    //arr2 is The origin english
    return arr1.map((item, index) => {
        if (item === arr2[index]) {
            return (
                <span key={index} style={{ color: 'green' }}>{item} </span>
            )
        } else {
            return (
                <span key={index} style={{ color: 'red' }}>{item} </span>
            )
        }
    })
}


export const handleCurrentScript = (str: string) => {
    const arr = handleStringOnlyText(str).trim().split(' ')
    const randomNumber = Math.floor(Math.random() * (arr.length - 1)) + 0;
    const result = str.replace(arr[randomNumber], '_____')
    return result
}
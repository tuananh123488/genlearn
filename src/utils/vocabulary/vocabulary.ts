import { WordInterface } from "@/components/context/interfaces";

export function shuffleArray(array: any[]) {
    const shuffledArray: any[] = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export const messageCorrect = [
    'Good', 'Good Job', 'Well answered', 'Great', "It's awesome"
]

export const messageFail = [
    "It's wrong", "Wrong, do it again", "Too bad", "It's okay, try up"
]

export const getFinalMessage = (percent: number) => {
    if (percent <= 50) {
        return "The results were pretty bad. You need to try harder"
    } else if (percent > 50 && percent <= 70) {
        return "The results are quite relative. Let's try it !!!"
    } else {
        return "The results are quite good, try harder !!!"
    }
}
import { useEffect, useState } from "react"

import { database } from '../services/firebase'




type FirebaseQuestions = Record<string, { // record é um objeto que não há certeza sobre o que há nele.
    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
}>

type QuestionType = {
    id: string;

    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;

}



export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {  // Aqui pode ser utilizado on e once, on para criar um eventListener nas questões do firebase e once para apenas fazer isso uma vez.
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}


            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    author: value.author,
                    content: value.content,
                    isHighlighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)



        });

    }, [roomId])

    return { questions, title }
}
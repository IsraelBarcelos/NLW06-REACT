import { useEffect } from 'react'
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'


import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'



import logo from '../images/logo.svg'
import { database } from '../services/firebase'
import "../styles/room.scss"


type RoomParams = {
  id: string;
}

type FirebaseQuestions = Record<string, { // record é um objeto que não há certeza sobre o que há nele.
  author: {
    name: string;
    avatar: string;
  }

  content: string;
  isHighLighted: boolean;
  isAnswered: boolean;
}>

type Question = {
  id: string;

  author: {
    name: string;
    avatar: string;
  }

  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;

}

export function Room() {

  const { user } = useAuth()
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
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


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in!')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>

          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> /*if sem else no react*/} 
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar ?"
            value={newQuestion}
            onChange={question => setNewQuestion(question.target.value)}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>

            ) : (<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>)}
            <Button disabled={!user} type="submit">Enviar pergunta</Button>
          </div>
        </form>
              {JSON.stringify(questions)}
      </main>

    </div>
  )
}
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'


import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import logo from '../images/logo.svg'

import "../styles/room.scss"


type RoomParams = {
  id: string;
}




export function Room() {

  const { user } = useAuth()
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('')
  const roomId = params.id;
  const { questions, title } = useRoom(roomId)

  


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
              <div className="question-list">
                {questions.map(question => {
                  return (
                    <Question
                      key={question.id}
                      content={question.content}
                      author={question.author} 
                    />
                  )
                })}
              </div>
      </main>

    </div>
  )
}
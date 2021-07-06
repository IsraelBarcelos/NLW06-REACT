import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import {Button} from "../components/Button"
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import "../styles/auth.scss"
import illustrationImg from '../images/illustration.svg'
import logo from "../images/logo.svg"

export function NewRoom() {
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState("")
  const history = useHistory();

  async function handleCreateRoom(event : FormEvent) {
    event.preventDefault() 

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)


  }

  return(

    <div id="page-auth">

      <aside>
        <img src={illustrationImg} alt="Imagem ao lado esquerdo, roxa" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logo} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              value={newRoom}
              onChange={event => {setNewRoom(event.target.value)}}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
          <p>Quer entrar em uma sala já existente? <Link  to="/">Clique aqui!</Link></p>
        </div>
      </main>
    </div>

  )
}
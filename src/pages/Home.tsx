import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'


import { Button } from "../components/Button"
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


import illustrationImg from '../images/illustration.svg'
import logo from "../images/logo.svg"
import googleIconImage from "../images/google-icon.svg"
import "../styles/auth.scss"

export function Home() {

  const history = useHistory();
  const {user, signInWithGoogle} = useAuth()
  const [room, setRoom] = useState("")

  async function handleCreateRoom() {

    if(!user){
      await signInWithGoogle()
    }
    
    history.push("/rooms/new")
  }

  async function handleEnterRoom(event : FormEvent) {
    event.preventDefault();
    
    if(room.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${room}`).get()

    if(!roomRef.exists()) {
      alert('Sala não existe!')
      return;
    }

    history.push(`/rooms/${room}`)

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
          <button onClick={handleCreateRoom}  className="create-room">
            <img src={googleIconImage} alt="Google logo" />
            Crie a sua sala com google
          </button>
        

        <div className="separator">ou entre em uma sala</div>

        <form onSubmit={handleEnterRoom}>
          <input 
            type="text"
            placeholder="Digite o código da sala"
            value={room}
            onChange={event => {setRoom(event.target.value)}}
           />

           <Button type="submit">
             Entrar na sala
           </Button>
        </form>


        </div>

      </main>

    </div>

  )
}
import { useHistory } from 'react-router-dom'
import { auth, firebase } from '../services/firebase';

import "../styles/auth.scss"

import illustrationImg from '../images/illustration.svg'
import logo from "../images/logo.svg"
import googleIconImage from "../images/google-icon.svg"

import {Button} from "../components/Button"
import {TestContext} from '../App'

export function Home() {

  //const history = useHistory();
  function handleCreateRoom() {

    

    // history.push("/rooms/new")
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

        <form action="">
          <input 
            type="text"
            placeholder="Digite o código da sala"
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
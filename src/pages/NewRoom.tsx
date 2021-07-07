import { Link } from 'react-router-dom'

import "../styles/auth.scss"

import illustrationImg from '../images/illustration.svg'
import logo from "../images/logo.svg"

import {Button} from "../components/Button"
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
  const {user} = useAuth()
  console.log(user?.name)
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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form action="">
            <input 
              type="text"
              placeholder="Digite o código da sala"
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
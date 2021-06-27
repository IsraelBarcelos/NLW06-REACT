import React from 'react';
import illustrationImg from '../images/illustration.svg'
import logo from "../images/logo.svg"
import googleIconImage from "../images/google-icon.svg"

export function Home() {
  return(

    <div>
      <aside>
        <img src={illustrationImg} alt="Imagem ao lado esquerdo, roxa" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div>
          <img src={logo} alt="LetMeAsk" />
          <button>
            <img src={googleIconImage} alt="Google logo" />
            Crie a sua sala com google
          </button>
        </div>

        <div>ou entre em uma sala</div>

        <form action="">
          <input 
            type="text"
            placeholder="Digite o código da sala"
           />

           <button type="submit">
             Entrar na sala
           </button>
        </form>

      </main>

    </div>

  )
}
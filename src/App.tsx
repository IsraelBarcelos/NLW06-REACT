import {createContext, useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import { auth, firebase } from './services/firebase'

import {Home} from './pages/Home'
import { NewRoom } from './pages/NewRoom';


type User = {
  name: string;
  avatar: string;
  id: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}


export const AuthContext = createContext({} as AuthContextType)
function App() {

  const [user, setUser] = useState<User>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider)
    if(result.user) {
      const { displayName, photoURL, uid } = result.user

      if(!displayName || !photoURL) {
        throw new Error("Google account not complete, please insert a image and a displayName")
      }


    }

  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, signInWithGoogle}}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;

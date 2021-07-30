import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebase } from '../services/firebase'

type User = {
  name: string;
  avatar: string;
  id: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children : ReactNode;
}


export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();

  useEffect(() => { // ess effect procura na firebase se a sessão de login já existe previamente
    const unsubscribe = auth.onAuthStateChanged( user => {
      if(user) {
        const { displayName, photoURL, uid } = user

        if(!displayName || !photoURL) {
          throw new Error("Google account not complete, please insert a image and a displayName")
        }

        setUser({
          name: displayName,
          avatar: photoURL,
          id: uid
        })
      }
    })

    return () => {
      unsubscribe()
    }
  },[])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider)

    if(result.user) {
      const { displayName, photoURL, uid } = result.user

      if(!displayName || !photoURL) {
        throw new Error("Google account not complete, please insert a image and a displayName")
      }

      setUser({
        name: displayName,
        avatar: photoURL,
        id: uid
      })
      return;
    }

    throw new Error("Could not connect to google servers or user is invalid!")

  }

  return(
    
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}
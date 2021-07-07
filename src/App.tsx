import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';

<<<<<<< HEAD

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

    setUser({
      name: displayName,
      avatar: photoURL,
      id: uid
    })

    }

  }

=======
function App() { 
>>>>>>> 1b7c22297bd44972c7c123977755762fd7b2bdc7
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" exact component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function App() {
  const url='http://localhost:8080';
  const [user,setUser]= useState(null);
  const isLogged = useSelector(state => state);

  const userHasLogged = (user) =>{
    setUser(user);
  }
  return (
    
    <div className="App">
       {(isLogged) ? <Home url={url} user={user}/>
                  :   <LoginPage url={url} loginStatusChange={userHasLogged}/>
      }
    </div>
  );
}

export default App;

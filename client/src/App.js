import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={HomePage} exact />
        <Route path='/chats' Component={ChatPage} />
      </Routes>

    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LogInAndRegisterScreen from './components/LogInAndRegisterScreen/LogInAndRegisterScreen';
import PersonalPage from './components/PersonalPage/PersonalPage';
import GameScreen from './components/GameScreen/GameScreen';
import GameScreen2 from './components/GameScreen/GameScreen2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />}></Route>
        <Route path='/LogIn' element={<LogInAndRegisterScreen />}></Route>
        <Route path='/Register' element={<LogInAndRegisterScreen />}></Route>
        <Route path='/PersonalPage' element={<PersonalPage />}></Route>
        <Route path='/GeneratePage' element={<GameScreen />}></Route>
        <Route path='/GameScreen' element={<GameScreen2 />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

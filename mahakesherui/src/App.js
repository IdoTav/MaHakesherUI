import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LogInAndRegisterScreen from './components/LogInAndRegisterScreen/LogInAndRegisterScreen';
import PersonalPage from './components/PersonalPage/PersonalPage';
import GameScreen from './components/GameScreen/GameScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />}></Route>
        <Route path='/LogIn' element={<LogInAndRegisterScreen />}></Route>
        <Route path='/Register' element={<LogInAndRegisterScreen />}></Route>
        <Route path='/PersonalPage' element={<PersonalPage />}></Route>
        <Route path='/GameScreen' element={<GameScreen />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

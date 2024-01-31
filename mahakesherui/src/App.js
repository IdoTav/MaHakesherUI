import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LogInScreen from './components/LogInScreen/LogInScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />}></Route>
        <Route path='/LogIn' element={<LogInScreen />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

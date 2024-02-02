import './LogInAndRegisterScreen.css';
import { useNavigate } from 'react-router-dom';
import LogInAndRegisterScreenConsts from './LogInAndRegisterScreenConsts';
import apiFunction from '../../api/api';
import apiConsts from '../../api/ApiConsts';
import {useState} from 'react';

function LogInAndRegisterScreen() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    function checkIfuserAndPassword(response) {
        return (response === apiConsts.responseOk) ? true : false;
    }

    const handleLogInButtonClick = async (e) => {
        e.preventDefault();
        const body = {UserName: userName, Password: password}
        const requestResponse = await apiFunction(apiConsts.Post, apiConsts.serverUrl + apiConsts.SignIn, body);
        //checkIfuserAndPassword(requestResponse) ? true : false;
    };

    const handleCreateAccountClick = (e) => {
        e.preventDefault();
        setUserName('');
        setPassword('');
        navigate('/');
    };

    return (
        <div id="background">
            <p id="title1">{LogInAndRegisterScreenConsts.LogIn}</p>
            <div id="input-container">
                <input value={userName} onChange={(e) => setUserName(e.target.value)} id="userNameInput" placeholder="Username" className="input"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="passwordInput" placeholder="Password" className="input" type='password'/>
            </div>
            <p id="createAccount" onClick={handleCreateAccountClick}>{LogInAndRegisterScreenConsts.pressHere}</p>
            <button id="startButton1" onClick={handleLogInButtonClick}>{LogInAndRegisterScreenConsts.LogIn}</button>
        </div>
    );
};

export default LogInAndRegisterScreen;
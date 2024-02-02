import './LogInAndRegisterScreen.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LogInAndRegisterScreenConsts from './LogInAndRegisterScreenConsts';
import apiFunction from '../../api/api';
import apiConsts from '../../api/ApiConsts';
import {useState} from 'react';

function LogInAndRegisterScreen() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const props = useLocation().state


    function checkIfuserAndPassword(response) {
        return (response === apiConsts.responseOk) ? true : false;
    }

    const handleLogInButtonClick = async (e) => {
        e.preventDefault();
        const body = {UserName: userName, Password: password}
        const serverUrl = props.title === LogInAndRegisterScreenConsts.LogIn ? apiConsts.serverUrl + apiConsts.SignIn :  apiConsts.serverUrl + apiConsts.register;
        let requestResponse = await apiFunction(apiConsts.Post, serverUrl, body);
    };


    const handleCreateAccountClick = (e) => {
        e.preventDefault();
        setUserName('');
        setPassword('');
        if(props.title === LogInAndRegisterScreenConsts.LogIn)
            navigate('/Register', { state: { title: 'Register', createOrAlreadyHaveAcc: 'Press here to if you already have an account' } });
        else
            navigate('/Login', { state: { title: 'Log In', createOrAlreadyHaveAcc: 'Press here to create account' } });
    };

    return (
        <div id="background">
            <p id="title1">{props.title}</p>
            <div id="input-container">
                <input value={userName} onChange={(e) => setUserName(e.target.value)} id="userNameInput" placeholder="Username" className="input"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="passwordInput" placeholder="Password" className="input" type='password'/>
            </div>
            <p id="createAccount" onClick={handleCreateAccountClick}>{props.createOrAlreadyHaveAcc}</p>
            <button id="startButton1" onClick={handleLogInButtonClick}>{props.title}</button>
        </div>
    );
};

export default LogInAndRegisterScreen;
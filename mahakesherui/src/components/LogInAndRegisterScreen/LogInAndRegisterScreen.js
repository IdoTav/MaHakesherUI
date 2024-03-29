import './LogInAndRegisterScreen.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LogInAndRegisterScreenConsts from './LogInAndRegisterScreenConsts';
import apiFunction from '../../api/api';
import apiConsts from '../../api/ApiConsts';
import { useState } from 'react';
import showPasswordIcon from '../../images/show_password_icon.png';
import hidePasswordIcon from "../../images/hide_password_icon.png";

function LogInAndRegisterScreen() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorToShow, setErrorToShow] = useState('');
    const [isShowError, setIsShowError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const props = useLocation().state

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    function checkIfUserAndPassword(response) {
        return (response !== apiConsts.responseNotFound && response !== undefined && response !== apiConsts.responseBadRequest) ? true : false;
    }

    const handleLogInButtonClick = async (e) => {
        e.preventDefault();
        const body = { UserName: userName, Password: password }
        const serverUrl = props.title === LogInAndRegisterScreenConsts.LogIn ? apiConsts.serverUrl + apiConsts.SignIn : apiConsts.serverUrl + apiConsts.register;
        let requestResponse = await apiFunction(apiConsts.Post, serverUrl, body);
        if (checkIfUserAndPassword(requestResponse))
            navigate('/PersonalPage', { state: { name: userName } });
        setIsShowError(true);
        setErrorToShow(props.title === LogInAndRegisterScreenConsts.LogIn ? "User name or password are incorrect" : "User already exists");
    };


    const handleCreateAccountClick = (e) => {
        e.preventDefault();
        setUserName('');
        setPassword('');
        setIsShowError(false);
        if (props.title === LogInAndRegisterScreenConsts.LogIn)
            navigate('/Register', { state: { title: 'Register', createOrAlreadyHaveAcc: 'Press here to if you already have an account' } });
        else
            navigate('/Login', { state: { title: 'Log In', createOrAlreadyHaveAcc: 'Press here to create account' } });
    };

    return (
        <div id="background">
            <p id="title1">{props.title}</p>
            <div id="input-container">
                <input value={userName} onChange={(e) => setUserName(e.target.value)} id="userNameInput" placeholder="Username" className="input" />
                <div className='password-container'>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} id="passwordInput" placeholder="Password" className="input" type={isPasswordVisible ? 'text' : 'password'} />
                    <span className="password-icon" onClick={handlePasswordVisibility}>
                        {isPasswordVisible ? <img className="hideorShowPasswordIcon" src={hidePasswordIcon} alt="" /> : <img className="hideorShowPasswordIcon" src={showPasswordIcon} alt="" />}
                    </span>
                </div>
            </div>
            {isShowError ?
            <div id="createAccountContainer2" style={{color: "red"}}>
                {errorToShow}
            </div> : ""}
            <div id="createAccountContainer">
                <p id="createAccount" onClick={handleCreateAccountClick}>
                    {props.createOrAlreadyHaveAcc}
                </p>
            </div>
            <button id="startButton1" onClick={handleLogInButtonClick}>{props.title}</button>
        </div>
    );
};

export default LogInAndRegisterScreen;
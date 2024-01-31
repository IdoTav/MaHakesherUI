import './LogInScreen.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogInScreen() {
    const navigate = useNavigate();

    const handleLogInButtonClick = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleCreateAccountClick = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div id="background">
            <p id="title1">LogIn</p>
            <div id="input-container">
                <input
                    id="userNameInput"
                    placeholder="Username"
                    className="input"
                />
                <input
                    id="passwordInput"
                    placeholder="Password"
                    className="input"
                    type='password'
                />
            </div>
            <p id="createAccount" onClick={handleCreateAccountClick}>Press here to create account</p>
            <button id="startButton1" onClick={handleLogInButtonClick}>Log In</button>
        </div>
    );
};

export default LogInScreen;
import React from 'react';
import './HomeScreen.css';
import Book from '../../images/book.png';
import { useNavigate } from 'react-router-dom';
import HomePageConsts from './HomeScreenConsts';

function HomeScreen() {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(HomePageConsts.navigateLogIn, { state: { title: 'Log In', createOrAlreadyHaveAcc: 'Press here to create account' } });
    };

    return (
        <div id="background">
            <img id="bookImg" src={Book} alt="book" />
            <div>
                <div id="title">{HomePageConsts.maHakesher}</div>
                <p id="subText">{HomePageConsts.description}</p>
            </div>
            <button id="startButton" onClick={handleClick}>{HomePageConsts.start}</button>
        </div>
    );
};

export default HomeScreen;
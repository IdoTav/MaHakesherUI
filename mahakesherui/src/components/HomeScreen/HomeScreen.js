import React from 'react';
import './HomeScreen.css';
import Book from '../../images/book.png';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/LogIn');
    };

    return (
        <div id="background">
            <img id="bookImg" src={Book} alt="book" />
            <div>
                <div id="title">MA HAKESHER?</div>
                <p id="subText">An experiential system for studying the Bible and linking familiar characters and stories</p>
            </div>
            <button id="startButton" onClick={handleClick}>Let's start</button>
        </div>
    );
};

export default HomeScreen;
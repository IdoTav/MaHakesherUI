import React from 'react';
import './HomeScreen.css';
import Book from '../../images/book.png';

function HomeScreen() {

    const handleClick = () => {
        console.log("click");
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
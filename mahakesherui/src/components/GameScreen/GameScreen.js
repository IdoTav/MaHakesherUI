import './GameScreen.css';
import GameScreenConsts from "./GameScreenConsts";
import backArrow from '../../images/back_arrow.png';
import light from '../../images/light.png'
import arrow from '../../images/arrow.png';
import man from '../../images/man_pic.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function GameScreen() {
    const navigate = useNavigate();
    const userName = useLocation().state.userName;
    const [isHiddenFigure1, setIsHiddenFigure1] = useState('none');
    const [isHiddenFigure2, setIsHiddenFigure2] = useState('none');
    const [isCircle1, setIsCircle1] = useState(true);
    const [isCircle2, setIsCircle2] = useState(true);

    function activateImage(e, figure, circle) {
        e.preventDefault();
        figure('block');
        circle(false);
    }



    return (
        <div id='background'>
            <img id="backArrow" src={backArrow} onClick={() => navigate(GameScreenConsts.personalPage, { state: { name: userName } })}></img>
            <div className='GenerateContainer'>
                <span className='GenerateColumn'>
                    <div className='figure'>Figure 1</div>
                    {isCircle1 ? <div className='circle'></div> : <img className='generateImage' src={man}></img>}
                    <div className='nameOfFigure' style={{display : isHiddenFigure1}}>Ido</div>
                    <button onClick={e => activateImage(e, setIsHiddenFigure1, setIsCircle1)} className='generateButton'>Generate</button>
                </span>
                <span className='GenerateCoulumn1'>
                    <img className='arrowGenerate' src={arrow}></img>
                </span>
                <span className='GenerateColumn2'>
                    <div className='figure'>Figure 2</div>
                    {isCircle2 ? <div className='circle'></div> : <img className='generateImage' src={man}></img>}
                    <div className='nameOfFigure' style={{display : isHiddenFigure2}}>Tal</div>
                    <button onClick={e => activateImage(e, setIsHiddenFigure2, setIsCircle2)} className='generateButton'>Generate</button>
                </span>
            </div>
            <button className='continueButton'>Continue</button>
        </div>
    );
};

export default GameScreen;
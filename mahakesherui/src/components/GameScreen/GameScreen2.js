import './GameScreen2.css';
import GameScreenConsts from './GameScreenConsts';
import backArrow from '../../images/back_arrow.png';
import { useLocation, useNavigate } from 'react-router-dom';
import man from '../../images/man_pic.png';
import { useState, useEffect } from 'react';

function GameScreen2() {
    const userName = useLocation().state.userName;
    const firstFigure = useLocation().state.firstFigure;
    const lastFigure = useLocation().state.lastFigure
    const navigate = useNavigate();
    const optionsList = ["Is connected to", "Appeard in a book", "Was in"];
    const connectionList = ["Sarah - Wife", "Issac - Son", "Ishmael - Son", "Daniel - Stupid", "Daniel - Ugly"];
    const [isShowConnectionBlock, setIsShowConnectionBlock] = useState(false);
    const [historyLists, setHistoryList] = useState([firstFigure, lastFigure]);
    const [dummy, setDummy] = useState(true);

    function handleBackButton(e) {
        e.preventDefault();
        navigate(GameScreenConsts.personalPage, { state: { name: userName } })
    }

    useEffect(() => {
        let x = 7;}
    ,[historyLists])

    function handleClickOnConnectionFigure(e, figure) {
        e.preventDefault();
        const newConnection = figure.split(" -", )[0];
        const copiedArray = [...historyLists];
        copiedArray.splice(historyLists.length - 1, 0, newConnection);
        setHistoryList(copiedArray);
    }

    function handleClickOnConnection(e) {
        e.preventDefault();
        setIsShowConnectionBlock(true);
    }

    return (
        <div>
            <div id='background'>
                <img id="backArrow" src={backArrow} onClick={e => handleBackButton(e)}></img>
            </div>
            <div className='GenerateContainerForGame'>
                <span className='GenerateColumn'>
                    <img className='generateImage1' src={man}></img>
                    <div className='nameOfFigure'>{firstFigure}</div>
                </span>
                <span className='optionsContainer' >
                    {optionsList.map((item, index) => (
                        <div className='options' key={index} onClick={e => handleClickOnConnection(e)}>
                            <button className='optionSelected'>{item}</button>
                        </div>))}
                </span>
            </div>
            { isShowConnectionBlock ?
            <div className='connectionBlock'>
                <div className='connectionContainer'>
                    {connectionList.map((item, index) => (
                        <button className='hoverOnConnection' onClick={e => handleClickOnConnectionFigure(e, item)}  key={index}>
                            <img className='connectionImage' src={man}></img>
                            <span className='connectionName'>{item}</span>
                        </button>))}
                </div>
            </div> : ""}
        </div>
    );
};

export default GameScreen2;
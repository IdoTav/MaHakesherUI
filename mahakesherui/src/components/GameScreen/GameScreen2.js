import './GameScreen2.css';
import GameScreenConsts from './GameScreenConsts';
import backArrow from '../../images/back_arrow.png';
import { useLocation, useNavigate } from 'react-router-dom';
import man from '../../images/man_pic.png';
import woman from '../../images/woman_pic.png'
import { useState, useEffect } from 'react';
import arrow from '../../images/arrow.png'

function GameScreen2() {
    const userName = useLocation().state.userName;
    const firstFigure = useLocation().state.firstFigure;
    const lastFigure = useLocation().state.lastFigure
    const navigate = useNavigate();
    const [figureToShow, setFigureToShow] = useState(firstFigure);
    const optionsList = ["Is connected to", "Appeard in a book", "Was in"];
    const connectionList = ["Sarah - Wife", "Issac - Son", "Ishmael - Son", "Daniel - Stupid", "Daniel - Ugly"];
    const [isShowConnectionBlock, setIsShowConnectionBlock] = useState(false);
    const [historyLists, setHistoryList] = useState([firstFigure, lastFigure]);

    function handleBackButton(e) {
        e.preventDefault();
        navigate(GameScreenConsts.personalPage, { state: { name: userName } })
    }

    function handleClickOnConnectionFigure(e, figure) {
        e.preventDefault();
        const newConnection = figure.split(" -", )[0];
        const copiedArray = [...historyLists];
        copiedArray.splice(historyLists.length - 1, 0, newConnection);
        setHistoryList(copiedArray);
        setFigureToShow(newConnection);
        //TO DO: set new connection buttons

    }

    function handleClickOnConnection(e) {
        e.preventDefault();
        setIsShowConnectionBlock(true);
        //TO DO: set new people connection list(sarah - wife etc....)
    }

    return (
        <div>
            <div id='background'>
                <img id="backArrow" src={backArrow} onClick={e => handleBackButton(e)}></img>
            </div>
            <div className='GenerateContainerForGame'>
                <span className='GenerateColumn'>
                    <img className='generateImage1' src={man}></img>
                    <div className='nameOfFigure'>{figureToShow}</div>
                </span>
                <span className='optionsContainer' >
                    {optionsList.map((item, index) => (
                        <div className='options' key={index} onClick={e => handleClickOnConnection(e)}>
                            <button className='optionSelected'>{item}</button>
                        </div>))}
                </span>
            </div>
            <div className='historyArrowContainer'>
                    <span className='historySectionContainer'>
                        <img className='ImageHistory' src={historyLists[0] === 'Daniel'  || historyLists[0] === 'Sarah' ? woman : man} alt='Man' />
                        <span className='nameHistory'>{historyLists[0]}</span>
                    </span>
                    {historyLists.map((item, index) => (
                        index !== 0 ?
                        <span key={index}>
                            <span className='historySectionContainer'>
                                <img className='ArrowHistory' src={arrow} alt={`Arrow ${index}`} />
                            </span>
                            <span className='historySectionContainer'>
                                <img className='ImageHistory' src={item === 'Daniel' || item === 'Sarah' ? woman : man} alt={`Man ${index}`} />
                                <span className='nameHistory'>{item}</span> 
                            </span>
                        </span> : ""))}
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
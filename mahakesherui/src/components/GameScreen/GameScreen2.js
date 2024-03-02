import './GameScreen2.css';
import GameScreenConsts from './GameScreenConsts';
import backArrow from '../../images/back_arrow.png';
import { useLocation, useNavigate } from 'react-router-dom';
import man from '../../images/man_pic.png';
import woman from '../../images/woman_pic.png'
import { useState, useEffect } from 'react';
import arrow from '../../images/arrow.png';
import apiFunction from '../../api/api';
import apiConsts from '../../api/ApiConsts';
import hint from '../../images/hint_icon.png';

function GameScreen2() {
    const userName = useLocation().state.userName;
    const firstFigure = useLocation().state.firstFigure;
    const lastFigure = useLocation().state.lastFigure
    const navigate = useNavigate();
    const [figureToShow, setFigureToShow] = useState(firstFigure);
    const optionsList = ["Mentioned in same life time", "Mentioned in same verse", "Relations"];
    const [connectionList, setConnectionList] = useState([])
    const [isShowConnectionBlock, setIsShowConnectionBlock] = useState(false);
    const [historyLists, setHistoryList] = useState([firstFigure, lastFigure]);
    const [relations, setRelations] = useState([]);
    const [mentionedInLifeTime, setMentionedInLifeTime] = useState([]);
    const [mentionedInSameVerse, setMentionedInSameVerse] = useState([]);
    const [clickedButton, setClickedButton] = useState('');
    const [startOver, setStartOver] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);


    function handleBackButton(e) {
        e.preventDefault();
        navigate(GameScreenConsts.personalPage, { state: { name: userName } })
    }

    function parseStartWithThe(relationList) {
        const parsedRelationList = relationList.map(elem => {
            const newValue = elem[1].split(' ')[1];
            const newNewValue = elem[3] + ' - ' + newValue[0].toUpperCase() + newValue.slice(1);
            elem[1] = newNewValue
            return elem;
        })
        return parsedRelationList;
    }


    function parseOptionsResponseIntoSections(options) {
        const option = Object.entries(options).reduce(
            (acc, [key, value]) => {
                const [name, number] = key.split('_');
                const [description, gender] = value.split('$$$');
                if (description.startsWith("The")) {
                    acc.startsWithTheList.push([key, description, gender, name]);
                } else if (description.startsWith("Mentioned together")) {
                    acc.mentionedTogetherList.push([key, description, gender, name]);
                } else if (description.startsWith("Mentioned")) {
                    acc.mentionedList.push([key, description, gender, name]);
                }
                return acc;
            }, {
            startsWithTheList: [],
            mentionedList: [],
            mentionedTogetherList: [],
        }
        );
        setRelations(parseStartWithThe(option.startsWithTheList));
        setMentionedInSameVerse(option.mentionedTogetherList);
        setMentionedInLifeTime(option.mentionedList);

    }

    const getOptions = async (personId = undefined) => {
        personId = personId ? personId : figureToShow[0];
        const optionsResponse = await apiFunction(apiConsts.Get, apiConsts.serverUrl + 'Connections/GetOptions?personid=' + personId);
        console.log(personId)
        console.log(optionsResponse)
        parseOptionsResponseIntoSections(JSON.parse(optionsResponse))
    }

    useEffect(() => {
        getOptions();
    }, [])

    function handleClickOnConnectionFigure(e, figure) {
        e.preventDefault();
        if (figure[0] === lastFigure[0]) {
            // win
        }

        const copiedArray = [...historyLists];
        if (copiedArray.length === 4 && copiedArray[copiedArray.length - 2][3] !== lastFigure[3]) {
            // start over
            copiedArray.splice(1, 2);
            figure = copiedArray[0];
            setStartOver(true)
        } else {
            copiedArray.splice(historyLists.length - 1, 0, figure);
        }

        console.log(copiedArray);
        setHistoryList(copiedArray);
        setFigureToShow(figure);
        setIsShowConnectionBlock(false);
        getOptions(figure[0]);
    }

    useEffect(() => {
        if (startOver) {
            setTimeout(() => {
                setStartOver(false);
            }, 5000);
        }
    }, [startOver]);

    useEffect(() => {
        if (gameEnd) {
            setTimeout(() => {
                setGameEnd(false);
                navigate(GameScreenConsts.personalPage, { state: { name: userName }, connection: {historyLists} })
            }, 5000);
        }
    }, [gameEnd]);

    function handleClickOnConnection(e) {
        e.preventDefault();
        setIsShowConnectionBlock(true);
        if (e.target.textContent === 'Relations') {
            setConnectionList(relations);
            setClickedButton('Relations');
        }
        else if (e.target.textContent === 'Mentioned in same life time') {
            setConnectionList(mentionedInLifeTime);
            setClickedButton('Mentioned in same life time');
        }
        else if (e.target.textContent === 'Mentioned in same verse') {
            setConnectionList(mentionedInSameVerse);
            setClickedButton('Mentioned in same verse');
        }
    }

    function handleClickOnHistoryConnection(e, figure) {
        e.preventDefault();
        const copiedArray = [...historyLists];
        const startToSplice = copiedArray.indexOf(figure) + 1
        const numsToSplice = copiedArray.length - 1 - startToSplice
        copiedArray.splice(startToSplice, numsToSplice);

        console.log(copiedArray);
        setHistoryList(copiedArray);
        setFigureToShow(figure);
        setIsShowConnectionBlock(false);
        getOptions(figure[0]);
    }

    return (
        <div>
            <div id='background'>
                <img id="backArrow" src={backArrow} onClick={e => handleBackButton(e)}></img>
            </div>
            <div className='GenerateContainerForGame'>
                <span className='GenerateColumn'>
                    <img className='generateImage1' src={man}></img>
                    <div className='nameOfFigure'>{figureToShow[3]}</div>
                </span>
                <span className='optionsContainer' >
                    {optionsList.map((item, index) => (
                        <div className='options' key={index} onClick={e => handleClickOnConnection(e)}>
                            <button className='optionSelected'>{item}</button>
                        </div>))}
                </span>
            </div>
            <div className='hintBlock'>
                <img className='hint' src={hint}></img>
            </div>
            <div className='historyArrowContainer'>
                <span className={`historySectionContainer${historyLists.length > 2 ? ' oldPath' : ''}`}>
                    <img className='ImageHistory' src={historyLists[0][2] === 'male' ? man : woman} alt='Man' />
                    <span className='nameHistory'>{historyLists[0][3]}</span>
                </span>
                {historyLists.map((item, index) => (
                    index !== 0 ?
                        <span key={index}>
                            <span className='historySectionContainer'>
                                <img className='ArrowHistory' src={arrow} alt={`Arrow ${index}`} />
                            </span>
                            <span className={`historySectionContainer${index < (historyLists.length - 2) ? ' oldPath' : ''}`} onClick={e => handleClickOnHistoryConnection(e, item)}>
                                <img className='ImageHistory' src={item[2] === 'male' ? man : woman} alt={`Man ${index}`} />
                                <span className='nameHistory'>{item[3]}</span>
                            </span>
                        </span> : ""))}
            </div>
            {isShowConnectionBlock ?
                <div className='connectionBlock'>
                    <div className='connectionContainer'>
                        {connectionList.map((item, index) => (
                            <div className='hoverOnConnection' onClick={e => handleClickOnConnectionFigure(e, item)} key={index}>
                                <img className='connectionImage' src={man}></img>
                                <span className='connectionName'>{clickedButton === 'Relations' ? item[1] : item[3]}</span>
                            </div>))}
                    </div>
                </div> : ""}
            {startOver ?
                <div className='popup'>
                    <div className='popupTitle'>START OVER</div>
                    <div className='popupText'>This connection can be done with 5 steps so let's try again</div>
                </div> : ""}
            {gameEnd ?
                <div className='popup'>
                    <div className='popupTitle'>YOU WIN!</div>
                </div> : ""}
        </div>
    );
};

export default GameScreen2;
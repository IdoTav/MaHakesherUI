import './GameScreen.css';
import GameScreenConsts from "./GameScreenConsts";
import backArrow from '../../images/back_arrow.png';
import light from '../../images/light.png'
import arrow from '../../images/arrow.png';
import man from '../../images/man_pic.png';
import female from '../../images/woman_pic.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiFunction from '../../api/api';
import apiConsts from '../../api/ApiConsts';

function GameScreen() {
    const navigate = useNavigate();
    const userName = useLocation().state.userName;
    const [isHiddenFigure1, setIsHiddenFigure1] = useState('none');
    const [isHiddenFigure2, setIsHiddenFigure2] = useState('none');
    const [isCircle1, setIsCircle1] = useState(true);
    const [isCircle2, setIsCircle2] = useState(true);
    const [firstFigure, setFirstFigure] = useState('');
    const [lastFigure, setLastFigure] = useState('');
    const [roadPersons, setRoadPersons] = useState([]);
    const [roadConnections, setRoadConnections] = useState([]);

    const getRoad = async () => {
        const roadResponse = await apiFunction(apiConsts.Get, apiConsts.serverUrl + "Connections/GetPlayRoad?difficultyLevel=10");
        parseRoad(JSON.parse(roadResponse));
    }

    function parseRoad(roadResponse) {
        const { namesAndGenders, connectionList } = Object.entries(roadResponse).reduce(
            ({ namesAndGenders, connectionList }, [key, value]) => {
              const [name, number] = key.split('_');
              const [description, gender] = value.split('$$$');
          
              return {
                namesAndGenders: { ...namesAndGenders, [name]: gender },
                connectionList: [...connectionList, description],
              };
            },
            { namesAndGenders: {}, connectionList: [] }
          );
          setRoadPersons(namesAndGenders);
          setRoadConnections(connectionList);
          setFirstFigure([Object.keys(namesAndGenders)[0], namesAndGenders[Object.keys(namesAndGenders)[0]]]);
          setLastFigure([Object.keys(namesAndGenders)[Object.keys(namesAndGenders).length - 1], namesAndGenders[Object.keys(namesAndGenders)[Object.keys(namesAndGenders).length - 1]]]);
    }

    useEffect(() => {
        getRoad();
    }, [])

    function activateImage(e, figure, circle) {
        e.preventDefault();
        figure('block');
        circle(false);
    }

    function handleContiuneButton(e) {
        e.preventDefault();
        navigate('/GameScreen', { state:
             { firstFigure: firstFigure,
                lastFigure: lastFigure,
                userName: userName,
                roadConnections: roadConnections,
                roadPersons: roadPersons 
            } 
        });
    }



    return (
        <div id='background'>
            <img id="backArrow" src={backArrow} onClick={() => navigate(GameScreenConsts.personalPage, { state: { name: userName } })}></img>
            <div className='GenerateContainer'>
                <span className='GenerateColumn'>
                    <div className='figure'>Figure 1</div>
                    {isCircle1 ? <div className='circle'></div> : <img className='generateImage' src={firstFigure[1] === 'male' ? man : female}></img>}
                    <div className='nameOfFigure' style={{display : isHiddenFigure1}}>{firstFigure[0]}</div>
                    <button onClick={e => activateImage(e, setIsHiddenFigure1, setIsCircle1)} className='generateButton'>Generate</button>
                </span>
                <span className='GenerateCoulumn1'>
                    <img className='arrowGenerate' src={arrow}></img>
                </span>
                <span className='GenerateColumn2'>
                    <div className='figure'>Figure 2</div>
                    {isCircle2 ? <div className='circle'></div> : <img className='generateImage' src={lastFigure[1] === 'male' ? man : female}></img>}
                    <div className='nameOfFigure' style={{display : isHiddenFigure2}}>{lastFigure[0]}</div>
                    <button onClick={e => activateImage(e, setIsHiddenFigure2, setIsCircle2)} className='generateButton'>Generate</button>
                </span>
            </div>
            <button onClick={e => handleContiuneButton(e)} className='continueButton'>Continue</button>
        </div>
    );
};

export default GameScreen;
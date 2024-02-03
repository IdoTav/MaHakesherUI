import './PersonalPage.css';
import backArrow from '../../images/back_arrow.png';
import arrow from '../../images/arrow.png';
import man from '../../images/man_pic.png'
import woman from '../../images/woman_pic.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PersonalPageConsts from './PerosnalPageConsts';


function PersonalPage() {
    const navigate = useNavigate();
    const userName = useLocation().state;
    console.log(userName);
    const staticList = ["Abraham/is Connected To.Sarah/Apears In Book.Genisis/is Connected To.Daniel/is Connected To.Ido", "Abraham/is Connected To.Sarah/Apears In Book.Genisis"
        , "Abraham/is Connected To.Sarah/Apears In Book.Genisis/is Connected To.Daniel/is Connected To.Issac", "Abraham/is Connected To.Sarah/is Connected To.Daniel", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac"];
    const [showHistory, setShowHistory] = useState(false);
    const [peopleHistory, setPeopleHistory] = useState([]);
    const [connectionHistory, setConnetionHistory] = useState([]);

    function extractStrings(inputString) {
        const parts = inputString.split(/[./]/).filter(part => part.trim() !== '');
        const stringsWithSlash = parts.filter((_, index) => index % 2 === 0);
        const stringsWithDot = parts.filter((_, index) => index % 2 !== 0);
        return [stringsWithSlash, stringsWithDot];
    }

    function parseData(staticList) {
        const parts = staticList.split('/');
        const firstName = parts[0].split('.')[0];
        const lastName = parts[parts.length - 1].split('.')[1];
        return { firstName, lastName };
    }

    const openHistory = (e, item) => {
        e.preventDefault();
        setPeopleHistory(extractStrings(item)[0]);
        setConnetionHistory(extractStrings(item)[1]);
        setShowHistory(true);
    }


    return (
        <div id="background">
            <img id="backArrow" src={backArrow} onClick={() => navigate('/')}></img>
            <div>
                <p id="title3">{PersonalPageConsts.hello}</p>
                <p id='title2'>{userName.name}</p>
            </div>
            <div className='historyBlock'>
                <div className='HistoryTitle'>{PersonalPageConsts.history}</div>
                <div className='historyContainer'>
                    {staticList.map((item, index) => (
                        <button className='element' onClick={(e) => openHistory(e, item)} key={index}>
                            <span className='historyFirstName'>{parseData(item).firstName}</span>
                            <img className='arrowHistory' src={arrow} alt={`Arrow ${index}`} />
                            <span className='historyLastName'>{parseData(item).lastName}</span>
                        </button>))}
                </div>
            </div>
            <button id="startButton2" onClick={() => navigate(PersonalPageConsts.gamePage, {state : {userName : userName.name}})}>{PersonalPageConsts.startPlay}</button>
            {showHistory ?
                <div className='historyArrowContainer'>
                    <span className='historySectionContainer'>
                        <img className='ImageHistory' src={peopleHistory[0] === 'Daniel'  || peopleHistory[0] === 'Sarah' ? woman : man} alt='Man' />
                        <span className='nameHistory'>{peopleHistory[0]}</span>
                    </span>
                    {connectionHistory.map((item, index) => (
                        <span key={index}>
                            <span className='historySectionContainer'>
                                <span className='connectionHistory'>{item}</span>
                                <img className='ArrowHistory' src={arrow} alt={`Arrow ${index}`} />
                            </span>
                            <span className='historySectionContainer'>
                                <img className='ImageHistory' src={peopleHistory[index + 1] === 'Daniel' || peopleHistory[index + 1] === 'Sarah' ? woman : man} alt={`Man ${index}`} />
                                <span className='nameHistory'>{peopleHistory[index + 1]}</span> 
                            </span>
                        </span>))}
                </div>
                : ""}
        </div>
    );
};


export default PersonalPage;
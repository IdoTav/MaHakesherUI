import './PersonalPage.css';
import backArrow from '../../images/back_arrow.png';
import arrow from '../../images/arrow.png';
import man from '../../images/man_pic.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';


function PersonalPage() {
    const userName = useLocation().state;
    const staticList = ["Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Daniel/isConnectedTo.Ido", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis"
        , "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac"];
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
            <img id="backArrow" src={backArrow}></img>
            <div>
                <p id="title3">Hello</p>
                <p id='title2'>{userName.name}</p>
            </div>
            <div className='historyBlock'>
                <div className='HistoryTitle'>History</div>
                <div className='historyContainer'>
                    {staticList.map((item, index) => (
                        <button className='element' onClick={(e) => openHistory(e, item)} key={index}>
                            <span className='historyFirstName'>{parseData(item).firstName}</span>
                            <img className='arrowHistory' src={arrow} alt={`Arrow ${index}`} />
                            <span className='historyLastName'>{parseData(item).lastName}</span>
                        </button>))}
                </div>
            </div>
            <button id="startButton2">Start Play</button>
            {showHistory ?
                <div className='historyArrowContainer'>
                        <img className='ImageHistory' src={man} alt='Man'/>
                        {connectionHistory.map((item, index) => (
                            <span className='historyItem' key={index}>
                                <img className='ArrowHistory' src={arrow} alt={`Arrow ${index}`} />
                                <img className='ImageHistory' src={man} alt={`Man ${index}`} />
                            </span>))}
                            {}
                </div>
                : ""}
        </div>
    );
};


export default PersonalPage;
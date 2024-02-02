import './PersonalPage.css';
import backArrow from '../../images/back_arrow.png';
import arrow from '../../images/arrow.png';
import { useNavigate, useLocation } from 'react-router-dom';


function PersonalPage() {
    const userName = useLocation().state;
    const staticList = ["Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Daniel", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac"
        , "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac", "Abraham/isConnectedTo.Sarah/ApearsInBook.Genisis/isConnectedTo.Issac"];


    function parseData(staticList) {
        const parts = staticList.split('/');
        const firstName = parts[0].split('.')[0];
        const lastName = parts[parts.length - 1].split('.')[1];
        return { firstName, lastName };
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
                    <div className='element'>
                        <span>{parseData(staticList[0]).firstName}</span>
                        <img src={arrow}></img>
                        <span>{parseData(staticList[0]).lastName}</span>
                    </div>
                </div>
            </div>
            <button id="startButton2">Start Play</button>
        </div>
    );
};


export default PersonalPage;
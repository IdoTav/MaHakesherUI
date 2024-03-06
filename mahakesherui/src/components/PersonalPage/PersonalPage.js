import './PersonalPage.css';
import backArrow from '../../images/back_arrow.png';
import arrow from '../../images/arrow.png';
import man from '../../images/man_pic.png'
import woman from '../../images/woman_pic.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PersonalPageConsts from './PerosnalPageConsts';
import apiFunction from '../../api/api';
import apiConsts from '../../api/ApiConsts';


function PersonalPage() {
    const navigate = useNavigate();
    const userName = useLocation().state;
    const [historyList, setHistoryList] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [peopleHistory, setPeopleHistory] = useState([]);


    function parseData(item) {
        const parsed = item.split('-');
        return [parsed[0], parsed[parsed.length - 1]];
    }

    const openHistory = (e, item) => {
        e.preventDefault();
        setPeopleHistory(item.split('-'));
        setShowHistory(true);
    }

    const getHistory = async () => {
        const historyResponse = await apiFunction(apiConsts.Get, apiConsts.serverUrl + 'Users/history?userName=' + userName.name);
        if (historyResponse != 404) {
            setHistoryList(historyResponse.split("$$"));
        }
    }

    useEffect(() => {
        getHistory();
    }, [])


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
                    {historyList.map((item, index) => (
                        <button className='element' onClick={(e) => openHistory(e, item)} key={index}>
                            <span className='historyFirstName'>{parseData(item)[0]}</span>
                            <img className='arrowHistory' src={arrow} alt={`Arrow ${index}`} />
                            <span className='historyLastName'>{parseData(item)[1]}</span>
                        </button>))}
                </div>
            </div>
            <button id="startButton2" onClick={() => navigate('/GeneratePage', { state: { userName: userName.name } })}>{PersonalPageConsts.startPlay}</button>
            {showHistory ?
                <div className='historyArrowContainer'>
                    <span className='historySectionContainer'>
                        <img className='ImageHistory' src={man} alt='Man' />
                        <span className='nameHistory'>{peopleHistory[0]}</span>
                    </span>
                    {peopleHistory.slice(1).map((item, index) => (
                        <span key={index}>
                            <span className='historySectionContainer'>
                                <img className='ArrowHistory' src={arrow} alt={`Arrow ${index}`} />
                            </span>
                            <span className='historySectionContainer'>
                                <img className='ImageHistory' src={man} alt={`Man ${index}`} />
                                <span className='nameHistory'>{peopleHistory[index + 1]}</span>
                            </span>
                        </span>))}
                </div>
                : ""}
        </div>
    );
};


export default PersonalPage;
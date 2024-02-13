import './GameScreen2.css';
import arrow from '../../images/arrow.png';
import GameScreenConsts from './GameScreenConsts';

function GameScreen2() {

    return (
        <div>
            <div id='background'>
                <img id="backArrow" src={backArrow} onClick={() => navigate(GameScreenConsts.personalPage, { state: { name: userName } })}></img>
            </div>
        </div>
    );
};

export default GameScreen2;
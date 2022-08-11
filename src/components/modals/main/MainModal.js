import { useContext } from 'react';
import GameFeatureContext from '../../../context/GameFeature';
import './MainModal.css';

function MainModal() {
    const { toggleGameType } = useContext(GameFeatureContext);

    const gameButtonClick = (e) => {
        toggleGameType(e.target.id);
    };

    return (
        <div className="modal-content">
            <div className="modal-title">
                <p>
                    <strong>Hoş geldin!</strong>
                </p>
                <hr></hr>
            </div>
            <div className="description">
                <p>
                    <strong>Circle Nedir?</strong>
                </p>
                <p> Circle, çember içiresindeki harf/harfler ile kelime bulduğun bir oyundur.</p>
                <hr></hr>
                <p>
                    <strong>Nasıl Oynanır?</strong>
                </p>
                <p>
                    <strong>Günlük Mod</strong>
                </p>
                <p style={{ marginLeft: '15px' }}>Her gün yenilenen seçili kelimenin tüm harflerini bulmaya çalış. Ne kadar az deneme o kadar iyi! </p>
                <p>
                    <strong>Serbest Mod</strong>
                </p>
                <p style={{ marginLeft: '15px' }}> <strong>Level 1:</strong> Seçili harf ile başlayan kelimeler bulmaya çalış!</p>
                <p style={{ marginLeft: '15px' }}><strong>Level 2:</strong> 15. skordan sonra seçilen 2 harfi içeren kelimer bulmaya çalış!</p>
                <hr></hr>
            </div>
            <div className="modal-footer">
                <p>
                    <strong>Aşağıdan oyun modunu seçebilirsin, başarılar!</strong>
                </p>
                <div className="game-buttons">
                    <div>
                        <button id="dailyMode" className="game-button" onClick={gameButtonClick}>GÜNLÜK</button>
                    </div>
                    <div>
                        <button id="freeMode" className="game-button" onClick={gameButtonClick}>SERBEST</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainModal;

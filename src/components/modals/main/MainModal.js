import { useNavigate } from "react-router-dom";
import './MainModal.css';

function MainModal() {
    const navigate = useNavigate();
    const pages = {
        dailyMode: 'gunluk-mod',
        freeMode: 'serbest-mod',
    };

    const gameButtonClick = (e) => {
        navigate(pages[e.target.id]);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-title">
                    <p>
                        <strong>Hoşgeldin!</strong>
                    </p>
                    <hr></hr>
                </div>
                <div className="description">
                    <p>
                        <strong>Circle Nedir?</strong>
                    </p>
                    <p> Circle, seçilen harfler ile kurduğunuz kelimeler ile oynan bir oyundur.</p>
                    <hr></hr>
                    <p>
                        <strong>Nasıl Oynanır?</strong>
                    </p>
                    <p>
                        <strong>Günlük Mod</strong> seçili kelimeleri bulun!
                    </p>
                    <p style={{ marginLeft: '15px' }}>Her gün yenilenen 2 kelimeyi rastgele seçilen harfler ile yazmaya çalışın. Ne kadar az deneme o kadar iyi! </p>
                    <p>
                        <strong>Serbest Mod</strong> sınırsız şekilde oynayın!
                    </p>
                    <p style={{ marginLeft: '15px' }}>Level 1: Seçili harf ile başlayan kelimeler yazın.</p>
                    <p style={{ marginLeft: '15px' }}>Level 2: 15. skordan sonra seçilen 2 harfi kelimenizde bulundurun.</p>
                    <hr></hr>
                </div>
                <div className="modal-footer">
                    <p>
                        <strong>Aşağıdan oyun modunu seçebilirsin.</strong>
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
        </div>
    );
}

export default MainModal;

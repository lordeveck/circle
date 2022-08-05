import { useNavigate } from "react-router-dom";
import './Modal.css';

function Modal(props) {
    const navigate = useNavigate();
    const pages = {
        dailyMode: 'gunluk-mod',
        freeMode: 'serbest-mod',
        onlineMode: 'online-mod',
    };

    const gameButtonClick = (e) => {
        navigate(pages[e.target.id]);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-title">
                        <p>
                            <strong>Hoşgeldin!</strong>
                        </p>
                        <hr></hr>
                    </div>
                    <p>
                        <strong>Harf Zamanı Nedir?</strong>
                    </p>
                    <p> Harf Zamanı, kelimeler ve onlardan seçilen rastgele harfler arasında bir bağlantı kurup, kelime haznenizi test eden ve geliştiren bir oyundur.</p>
                    <hr></hr>
                    <p>
                        <strong>Nasıl Oynanır?</strong>
                    </p>
                    <p>
                        <strong>Günlük Mod</strong> seçili kelimeleri bulun!
                    </p>
                    <p>Her gün yenilenen 2 kelimeyi harf zamanı kuralları içerisinde yazmanız gerekmektedir. </p>
                    <p>Kelimeler, girdiğiniz kelimelerden rastgele seçilen harf ile başlamak zorundadır. Ne kadar kısa denemede günlük iki kelimenin baş harflerini bularak yazarsanız o kadar iyi! </p>
                    <p>
                        <strong>Serbest Mod</strong> sınırsız şekilde oynayın!
                    </p>
                    <p>15. skora kadar girilen kelimelerden seçilen rastgele harfler ile yeni kelimeye başlamanız gerekmektedir. 15. skordan sonra ise kelimenizden 2 harf seçilecektir ve her iki harfi de kelimenin içinde kullanmanız gerekmektedir. </p>
                    <hr></hr>
                    <div className="modal-footer">
                        <p>
                            <strong>Aşağıdan oyun modunu seçebilirsin.</strong>
                        </p>
                        <div className="game-buttons">
                            <div>
                                <button id="dailyMode" className="game-button" onClick={gameButtonClick}>GÜNLÜK</button>
                            </div>
                            <div>
                                <button id="onlineMode" className="game-button" onClick={gameButtonClick} >ONLINE</button>
                                <span className="beta">beta</span>
                            </div>
                            <div>
                                <button id="freeMode" className="game-button" onClick={gameButtonClick}>SERBEST</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;

import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();

    const locationTo = {
        infoModal: 'mainModal',
        difficultyModal: 'settingsModal',
    };

    const openMainModal = (e) => {
        const targetId = e.target.id;

        navigate('/', {
            state: {
                to: locationTo[targetId],
            }
        });
    }

    return (
        <div className="header">
            <div id="header-logo">
                <a href='/'>
                    <img src="logo.png" alt="circle" width="300px" height="50px" />
                </a>
            </div>
            <div className="header-buttons">
                <i
                    id="infoModal"
                    className="fa fa-info-circle"
                    style={{ fontSize: "24px", marginRight: "4px" }}
                    onClick={openMainModal}
                ></i>
                <i
                    id="difficultyModal"
                    className="fa fa-clock-o"
                    aria-hidden="true"
                    style={{ fontSize: "24px", marginRight: "4px" }}
                    onClick={openMainModal}
                ></i>
            </div>
        </div >
    );
}

export default Header;
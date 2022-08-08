import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();

    const openMainModal = () => {
        navigate('/');
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
                    id="info-modal"
                    className="fa fa-info-circle"
                    style={{ fontSize: "24px", marginRight: "4px" }}
                    onClick={openMainModal}
                ></i>
                {/* <i
                    id="difficulty-modal"
                    className="fa fa-clock-o"
                    aria-hidden="true"
                    style={{ fontSize: "24px", marginRight: "4px" }}
                ></i> */}
            </div>
        </div>
    );
}

export default Header;
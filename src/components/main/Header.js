import './Header.css';

function Header() {
    return (
        <div className="header">
            <div id="header-logo">
                <img src="logo.png" alt="Harf Zamanı" width="170px" height="70px" />
            </div>
            <div className="header-buttons">
                <i
                    id="info-modal"
                    className="fa fa-info-circle"
                    style={{ fontSize: "24px", marginRight: "4px" }}
                ></i>
                <i
                    id="difficulty-modal"
                    className="fa fa-clock-o"
                    aria-hidden="true"
                    style={{ fontSize: "24px", marginRight: "4px" }}
                ></i>
            </div>
        </div>
    );
}

export default Header;
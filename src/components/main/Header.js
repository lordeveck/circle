import './Header.css';

function Header(props) {
    const openModal = (e) => {
        const targetId = e.target.id;
        props.onModalOpened(targetId);
    }

    return (
        <div className="header">
            <div id="header-logo">
                <a href='.'>
                    <img src="logo.png" alt="circle" width="140px" height="35px" style={{ marginTop: "4px" }} />
                </a>
            </div>
            <div className="header-buttons">
                <i
                    id="mainModal"
                    className="fa fa-info-circle"
                    style={{ fontSize: "24px", marginRight: "4px" }}
                    onClick={openModal}
                ></i>
                <i
                    id="settingsModal"
                    className="fa fa-clock-o"
                    aria-hidden="true"
                    style={{ fontSize: "24px", marginRight: "4px" }}
                    onClick={openModal}
                ></i>
            </div>
        </div >
    );
}

export default Header;
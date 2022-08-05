import { useEffect, useState } from 'react';
import { connectToSocket } from '../../../../services/socket';
import Games from '../../Games.js';
import './RandomOnlineMode.css';

function RandomOnlineMode() {
    const [closeModal, setCloseModal] = useState(false);

    useEffect(() => {
        const socket = connectToSocket();

        socket.emit("randomGame");

        socket.on('joinResponse', (response) => {
            if (response === 'created' || response === 'joined') {
                setCloseModal(true);
            }
        });
    }, []);




    return (
        <div style={{ height: "100%" }}
        >
            {
                closeModal ?
                    <Games /> :
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <div className="modal-title">
                                    <p>
                                        <strong>Oyun Bul</strong>
                                    </p >
                                    <hr></hr>
                                </div >
                                <p>
                                    <strong>Rakip aranıyor...</strong>
                                </p>
                            </div >
                        </div >
                    </div >
            }
        </div>
    );
}

export default RandomOnlineMode;

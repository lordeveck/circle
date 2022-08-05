<div id="main">
    <div id="header">
        <div id="header-logo">
            <img src="logo.png" alt="Harf Zamanı" width="170px" height="70px" />
        </div>
        <div id="header-buttons">
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

    <div id="game-area">
        <div id="game-stats">
            <div className="base-timer">
                <svg
                    className="base-timer__svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g className="base-timer__circle">
                        <circle
                            className="base-timer__path-elapsed"
                            cx="50"
                            cy="50"
                            r="45"
                        ></circle>
                        <path
                            id="base-timer-path-remaining"
                            strokeDasharray="283"
                            className="base-timer__path-remaining arc"
                            d="
                           M 50, 50
                           m -45, 0
                           a 45,45 0 1,0 90,0
                           a 45,45 0 1,0 -90,0
                           "
                        ></path>
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label"></span>
            </div>

            <div id="score" className="score">
                <p>Skor: 0</p>

                <div id="daily-letters">
                    <p></p>
                </div>

                <div id="selected-letter">
                    <p>Harf: ?</p>
                </div>
            </div>
        </div>

        <div id="correct-answers"></div>

        <div id="answer-area" className="answer-area">
            <input
                type="text"
                id="answer-input"
                className="answer-input"
            />
            <button id="answer-button" className="answer-button">GÖNDER</button>
        </div>
    </div>
</div>
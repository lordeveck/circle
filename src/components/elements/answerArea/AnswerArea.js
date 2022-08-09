import { useEffect, useRef, useState } from 'react';
import './AnswerArea.css';

function AnswerArea(props) {
    const answerInputRef = useRef(null);

    const [initialGameArea, setInitialGameArea] = useState();
    const [initialWindowHeight, setinitialWindowHeight] = useState();

    useEffect(() => {
        setInitialGameArea(props.gameAreaRef?.current?.offsetHeight);
        setinitialWindowHeight(window.innerHeight);

        document.body.addEventListener('touchmove', (e) => {
            e.preventDefault();
            setTimeout(() => {
                answerInputRef?.current.blur();
            }, 100);
        });
    }, [props.gameAreaRef]);

    const submitAnswer = (e, from) => {
        if (from === 'input' && e.key !== 'Enter') {
            return;
        }

        e.preventDefault();

        const answer = answerInputRef.current.value;
        answerInputRef.current.value = '';
        props.onSubmitAnswer(answer);
    };


    const keyboardFocus = (e) => {
        e.preventDefault();

        setTimeout(() => {
            const keyboardOpenHeight = initialWindowHeight - window.innerHeight;

            props.gameAreaRef.current.style.height = (`calc(${initialGameArea}px - ${keyboardOpenHeight}px)`);

            window.scrollTo({
                top: 0,
            });
        }, 200);
    };

    const keyboardBlur = (e) => {
        e.preventDefault();

        setTimeout(() => {
            props.gameAreaRef.current.style.height = ('100%');

            window.scrollTo({
                top: 0,
            });
        }, 200);
    };

    return (
        <div id="answer-area" className="answer-area">
            <input
                type="text"
                id="answer-input"
                className="answer-input"
                placeholder={`${props.selectedLetters?.join('-')} ile başlayan bir kelime yaz.`}
                onKeyDown={(e) => submitAnswer(e, 'input')}
                onFocus={keyboardFocus}
                onBlur={keyboardBlur}
                ref={answerInputRef}
            />
            <button
                id="answer-button"
                onTouchEnd={(e) => submitAnswer(e, 'button')}
                className="answer-button">
                GÖNDER
            </button>
        </div >
    );
}

export default AnswerArea;

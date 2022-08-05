import { useEffect, useRef } from 'react';
import './AnswerArea.css';

function AnswerArea(props) {
    const answerInputRef = useRef(null);

    useEffect(() => {
        document.body.addEventListener('touchmove', (e) => {
            e.preventDefault();
            setTimeout(() => {
                answerInputRef?.current.blur();
            }, 100);
        });
    }, []);

    const keyboardFocus = (e) => {
        e.preventDefault();
        props.onKeyboardFocus();
    };

    const keyboardBlur = (e) => {
        e.preventDefault();
        props.onKeyBoardBlur();
    };

    const submitAnswer = (e, from) => {
        if (from === 'input' && e.key !== 'Enter') {
            return;
        }

        e.preventDefault();

        if (from === 'button') {
            // setTimeout(() => {
            //     answerInputRef?.current.focus();
            // }, 100);
        }

        const answer = answerInputRef.current.value;
        answerInputRef.current.value = '';
        props.onSubmitAnswer(answer);
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
                className="answer-button"
                onClick={(e) => submitAnswer(e, 'button')}>
                GÖNDER
            </button>
        </div >
    );
}

export default AnswerArea;

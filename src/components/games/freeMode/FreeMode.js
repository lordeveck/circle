import { useNavigate } from "react-router-dom";
import Games from '../Games';
import './FreeMode.css';

function FreeMode() {
    const navigate = useNavigate();

    const answerChanged = () => {
        return;
    };

    const timeIsUp = () => {
        navigate('/');
    };

    return (
        <Games gameMode={'freeMode'} onAnswerChanged={answerChanged} onTimeIsUp={timeIsUp}></Games>
    );
}

export default FreeMode;

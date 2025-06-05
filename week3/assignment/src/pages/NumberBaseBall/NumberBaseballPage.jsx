/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import CommonInput from '../../components/CommonInput';
import { BodyWrapperStyle, ResultMessage } from '../CommonStyle';
import ResultList from './ResultList';
import getResult from './getResult';
import GenerateAnswer from './NumberGenerater';
import { 
    DIGIT_LENGTH, 
    MAX_ATTEMPT,
    RESET_DELAY_CORRECT,
    RESET_DELAY_FAIL
} from '../../constants/number';
import { MSG_CORRECT, MSG_FAIL, MSG_INVALID_INPUT } from '../../constants/message';

function isValidNumberInput(numberInput) {
    return /^\d{3}$/.test(numberInput) && new Set(numberInput).size === DIGIT_LENGTH;
}

function processGameRound(input, answer, attemptCount, setResultList, setAttemptCount, setMessage, resetGame) {
    const result = getResult(input, answer);
    setResultList(prev => [...prev, { value: input, result }]);
    setAttemptCount(prev => prev + 1);
    setMessage(result);

    if (result.includes(`${DIGIT_LENGTH}스트라이크`)) {
        setMessage(MSG_CORRECT);
        setTimeout(resetGame, RESET_DELAY_CORRECT);
    } else if (attemptCount + 1 > MAX_ATTEMPT) {
        setMessage(MSG_FAIL);
        setTimeout(resetGame, RESET_DELAY_FAIL);
    }    
}

function NumberBasePage() {
    const [numberInput, setnumberInput] = useState('');
    const [answer, setAnswer] = useState(GenerateAnswer);
    const [message, setMessage] = useState('');
    const [resultList, setResultList] = useState([]);
    const [attemptCount, setAttemptCount] = useState(0);

    const handleInputChange = (e) => {
        setnumberInput(e.target.value);
    };

    // 게임 초기화 
    const resetGame = () => {
        setAnswer(GenerateAnswer); 
        setResultList([]);              
        setMessage('');              
        setnumberInput(''); 
        setAttemptCount(0);          
    };


    const handleChange = (e) => {
        if (e.key !== 'Enter') return;

        if (!isValidNumberInput(numberInput)) {
            setMessage(MSG_INVALID_INPUT);
            return;
        }

        processGameRound(
            numberInput,
            answer,
            attemptCount,
            setResultList,
            setAttemptCount,
            setMessage,
            resetGame
        );

        setnumberInput('');
    };

    return(
        <div css={BodyWrapperStyle}>
            <h2>잠들면 안돼... 나랑 야구 게임 하자..</h2>
            <CommonInput
                value={numberInput}
                onChange={handleInputChange}
                onKeyDown={handleChange}
                placeholder="3자리 숫자를 입력해주세요."
            />
            <h3 css={ResultMessage}>{message}</h3>
            <ResultList resultList={resultList} />
        </div>
    )

}

export default NumberBasePage;
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import CommonInput from '../../components/CommonInput';
import { BodyWrapperStyle, ResultMessage } from '../CommonStyle';
import ResultList from './ResultList';

// 숫자 랜덤 생성 
function generateAnswer() {
    const digits = [];
    while (digits.length < 3) {
        const rand = Math.floor(Math.random() * 10); // 0~9
        if (!digits.includes(rand)) {
            digits.push(rand);
        }
    }
    return digits.map(String);
}

// 판정 
function getResult(input, answer) {
    let strike = 0;
    let ball = 0;

    input.split('').forEach((num, idx) => {
        if (num === answer[idx]) {
            strike++;
        } else if (answer.includes(num)) {
            ball++;
        }
    });

    if (strike === 0 && ball === 0) return 'OUT';
    return `${strike}스트라이크   ${ball}볼`;
}

function NumberBasePage() {
    const [numberInput, setnumberInput] = useState('');
    const [answer, setAnswer] = useState(generateAnswer());
    const [message, setMessage] = useState('');
    const [resultList, setResultList] = useState([]);
    const [attemptCount, setAttemptCount] = useState(0);

    // console.log(answer); // 정답 

    const handleChange = (e) => {
        setnumberInput(e.target.value);
    };

    // 게임 초기화 
    const resetGame = () => {
        setAnswer(generateAnswer()); 
        setResultList([]);              
        setMessage('');              
        setnumberInput(''); 
        setAttemptCount(0);          
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (/^\d{3}$/.test(numberInput) && new Set(numberInput).size === 3) {
                const result = getResult(numberInput, answer);

                // 리스트에 추가
                const newResult = { value: numberInput, result};
                setResultList((prev) => [...prev, newResult]);
                setAttemptCount((prev) => prev + 1);

                setMessage(`${result}`);
        
                if (result.includes('3스트라이크')) {
                    setMessage(`🎉정답입니다! 3초 뒤 게임이 초기화됩니다.`)
                    setTimeout(() => {
                        resetGame();
                    }, 3000);
                } else if (attemptCount + 1 > 10) {
                    setMessage(`시도 횟수를 초과했습니다. 5초 뒤 게임이 초기화됩니다.`);
                    setTimeout(() => resetGame(), 5000);
                }
        
                setnumberInput('');
            } else {
                setMessage('서로 다른 숫자 3자리를 입력해주세요.');
            }
        }
    };

    return(
        <div css={BodyWrapperStyle}>
            <h2>잠들면 안돼... 나랑 야구 게임 하자..</h2>
            <CommonInput
                value={numberInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="3자리 숫자를 입력해주세요."
            />
            <h3 css={ResultMessage}>{message}</h3>
            <ResultList resultList={resultList} />
        </div>
    )

}

export default NumberBasePage;
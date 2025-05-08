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

export default getResult;
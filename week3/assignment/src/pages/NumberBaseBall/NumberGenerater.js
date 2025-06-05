// 숫자 랜덤 생성 
function GenerateAnswer() {
    const digits = [];
    while (digits.length < 3) {
        const rand = Math.floor(Math.random() * 10); // 0~9
        if (!digits.includes(rand)) {
            digits.push(rand);
        }
    }
    return digits.map(String);
}

export default GenerateAnswer;
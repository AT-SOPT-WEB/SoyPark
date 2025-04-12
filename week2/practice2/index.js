// 요소 선택
const input = document.querySelector('.todo-input');
const button = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

// 로컬스토리지에서 가져오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 초기화 - 화면에 표시
todos.forEach((todo) => {
    li.textContent = todo; 
    todoList.appendChild(li); 
});

const buttonClick = () => {
    const value = input.value;

    if(!value) return;

    const text = document.querySelector('.todo-input').value; // input값을 text에 저장 
    // console.log(text);

    const li = document.createElement('li'); // li 생성
    todoList.appendChild(li); // ul의 자식으로 추가
    li.textContent = text; // li에 text(입력 값) 추가

    // 로컬스토리지 저장
    todos.push(text);
    localStorage.setItem('todos', JSON.stringify(todos));

};

button.addEventListener('click', buttonClick);




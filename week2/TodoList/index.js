import { todos as dataTodos } from './data.js';

// 요소 가져오기
const todoList = document.getElementById('todo-list');

const filterAllBtn = document.getElementById('filter-all');
const filterCompleteBtn = document.getElementById('filter-complete');
const filterIncompleteBtn = document.getElementById('filter-incomplete');


// 로컬스토리지에서 가져오기
let todos = JSON.parse(localStorage.getItem('todos'));

if (!todos) {
    localStorage.setItem("todos", JSON.stringify(dataTodos));
    todos = dataTodos;
}

// 화면에 표시
function renderTodos(todos) {
    todoList.innerHTML = ''; 
    todos.forEach(todo => {
        const tr = createTodos(todo);
        todoList.appendChild(tr);
    });
}

// todo 생성
function createTodos(todo) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="checkbox" data-id="${todo.id}"/></td>
        <td>${todo.priority}</td>
        <td>${todo.completed ? "✅" : "❌"}</td>
        <td>${todo.title}</td>
    `;

    return tr;
}

renderTodos(todos);

// 상단 필터링
function filterTodos(type) {
    let filtered = [];

    if (type === 'all') {
        filtered = todos;
    } else if (type === 'complete') {
        filtered = todos.filter(todo => todo.completed === true);
    } else if (type === 'incomplete') {
        filtered = todos.filter(todo => todo.completed === false);
    }

    renderTodos(filtered);
}

filterAllBtn.addEventListener('click', () => filterTodos('all'));
filterCompleteBtn.addEventListener('click', () => filterTodos('complete'));
filterIncompleteBtn.addEventListener('click', () => filterTodos('incomplete'));


// 드롭다운 
const toggleBtn = document.getElementById("dropdown");
const dropdownMenu = document.getElementById("dropdown-menu");

toggleBtn.addEventListener("click", () => {
    dropdownMenu.style.display = 
        dropdownMenu.style.display === "block" ? "none" : "block";
});

let dropdownItems = dropdownMenu.querySelectorAll(".priority-item");

dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
        let priority = item.textContent; // 선택된 중요도
        filterPriority(priority); 
        dropdownMenu.style.display = "none"; 
    });
});

// 중요도 필터링
function filterPriority(priority) {
    const filtered = todos.filter(todo => todo.priority.toString() === priority); 
    renderTodos(filtered);
}
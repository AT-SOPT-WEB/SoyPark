import { todos as dataTodos } from './data.js';

// 요소 가져오기
const todoList = document.getElementById('todo-list');

const filterAllBtn = document.getElementById('filter-all');
const filterCompleteBtn = document.getElementById('filter-complete');
const filterIncompleteBtn = document.getElementById('filter-incomplete');

const selectAllCheckbox = document.getElementById('check-all'); 

const todoInput = document.getElementById('todo-input');
const importanceSelect = document.querySelector('.importance-select'); 
const addBtn = document.getElementById('add-btn');

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
        <td><input type="checkbox" class="todo-checkbox" data-id="${todo.id}"/></td>
        <td>${todo.priority}</td>
        <td>${todo.completed ? "✅" : "❌"}</td>
        <td>${todo.title}</td>
    `;

    return tr;
}

function getNextId(todos) {
    if (todos.length === 0) {
        return 1;  
    }
    const maxId = Math.max(...todos.map(todo => todo.id));
    return maxId + 1;  
}

// input으로 할 일 추가 
addBtn.addEventListener('click', () => {
    const title = todoInput.value.trim();
    const priority = importanceSelect.value;

    if (!title || !priority) {
        alert("할 일과 중요도를 모두 입력해주세요!");
        return; 
    }

    const newTodo = {
        id: getNextId(todos), 
        title,
        priority,
        completed: false,
    };

    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos(todos);

    // 입력 후 초기화 
    todoInput.value = '';
    importanceSelect.value = ''; 
    todoInput.placeholder = '할 일을 입력하세요';
});


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

// 전체 체크박스
selectAllCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked; // 전체 체크박스 상태 
    
    const checkBox = todoList.querySelectorAll('.todo-checkbox');
    checkBox.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});

todoList.addEventListener('change', () => {
    const checkBox = document.querySelectorAll('.todo-checkbox');
    let allChecked = true;  

    checkBox.forEach(checkbox => {
        if (!checkbox.checked) {
            allChecked = false;
        }
    });

    selectAllCheckbox.checked = allChecked;
});
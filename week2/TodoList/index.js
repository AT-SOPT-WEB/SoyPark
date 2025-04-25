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

    tr.setAttribute("draggable", "true");
    tr.setAttribute("data-id", todo.id); // 드래그 요소 알기 위한 속성 

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

// drag&drop
let draggedRow = null; // 드래그 요소 저장 

todoList.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'TR') {
        draggedRow = e.target; 
    }
});

todoList.addEventListener('dragover', (e) => {
    e.preventDefault(); 

    const targetRow = e.target.closest('tr');
    if (targetRow && targetRow !== draggedRow) {
        const bounding = targetRow.getBoundingClientRect(); // 위치계산
        const offset = e.clientY - bounding.top;
        
        if (offset > bounding.height / 2) { // 아래 
            targetRow.after(draggedRow);
        } else {
            targetRow.before(draggedRow);
        }
    }
});

todoList.addEventListener('drop', () => {
    const newOrder = [];
    todoList.querySelectorAll('tr').forEach(tr => {
        const id = Number(tr.dataset.id);
        const todo = todos.find(t => t.id === id); // id로 todo 찾기 
        if (todo) newOrder.push(todo);
    });
    todos = newOrder;
    localStorage.setItem("todos", JSON.stringify(todos));
});

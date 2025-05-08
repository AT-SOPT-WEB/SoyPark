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

const completeBtn = document.querySelector('.com-btn');
const deleteBtn = document.querySelector('.del-btn');

const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

// 로컬스토리지에서 가져오기
const STORAGE_KEY = 'todos';

function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getItem(key) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
}

let todos = getItem(STORAGE_KEY);

if (!todos) {
    setItem(STORAGE_KEY, dataTodos);
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

    // 체크박스 
    const checkboxTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.dataset.id = todo.id;
    checkboxTd.appendChild(checkbox);

    // 중요도 
    const priorityTd = document.createElement("td");
    priorityTd.textContent = todo.priority;

    // 완료 여부 
    const completedTd = document.createElement("td");
    completedTd.textContent = todo.completed ? "✅" : "❌";

    // 할 일 제목 
    const titleTd = document.createElement("td");
    titleTd.textContent = todo.title;

    // tr에 모든 td 추가
    tr.appendChild(checkboxTd);
    tr.appendChild(priorityTd);
    tr.appendChild(completedTd);
    tr.appendChild(titleTd);

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
function handleAddTodo() {
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
    setItem(STORAGE_KEY, todos);

    renderTodos(todos);

    // 입력 후 초기화 
    todoInput.value = '';
    importanceSelect.value = ''; 
    todoInput.placeholder = '할 일을 입력하세요';
};

// tr 요소 찾기 
function findTR(checkbox){
    return checkbox.closest('tr');
}

// 완료
function handleCompleteTodo() {
    const selectedCheckboxes = document.querySelectorAll('.todo-checkbox:checked');

    // 선택된 체크박스들을 todo 객체로 한 번에 매핑
    const selectedTodos = Array.from(selectedCheckboxes).map(checkbox => {
        const tr = findTR(checkbox);
        const todoId = Number(tr.dataset.id);
        return todos.find(todo => todo.id === todoId);
    });

    // 이미 완료된 todo가 있는지 
    const hasCompletedTodo = selectedTodos.some(todo => todo.completed);

    if (hasCompletedTodo) {
        modal.showModal();
        return; 
    }

    // 완료 처리 
    selectedTodos.forEach(todo => {
        todo.completed = true;
    });

    setItem(STORAGE_KEY, todos);
    renderTodos(todos); 
};

// 삭제
function handleDeleteTodo() {
    const selectedCheckboxes = document.querySelectorAll('.todo-checkbox:checked');
    if (selectedCheckboxes.length === 0) return;

    const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => {
        const tr = findTR(checkbox);
        const todoId = Number(tr.dataset.id);
        return todoId;
    });
    
    // todos에서 삭제할 ID 제외하고 filter
    todos = todos.filter(todo => !idsToDelete.includes(todo.id));
    alert("삭제 완료!");

    setItem(STORAGE_KEY, todos);
    renderTodos(todos);
};


// 전체 체크박스
function handleSelectAllChange() {
    const isChecked = e.target.checked; // 전체 체크박스 상태 
    
    const checkBox = todoList.querySelectorAll('.todo-checkbox');
    checkBox.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
};

function handleCheckboxSync() {
    const checkBoxes = document.querySelectorAll('.todo-checkbox');
    let allChecked = true;  

    checkBoxes.forEach(checkBoxes => {
        if (!checkBoxes.checked) {
            allChecked = false;
        }
    });

    selectAllCheckbox.checked = allChecked;
};

addBtn.addEventListener('click', handleAddTodo);
completeBtn.addEventListener('click', handleCompleteTodo);
deleteBtn.addEventListener('click', handleDeleteTodo);
selectAllCheckbox.addEventListener('change', handleSelectAllChange);
todoList.addEventListener('change', handleCheckboxSync);

// 모달 닫기 버튼
modalCloseBtn.addEventListener('click', () => {
    modal.close(); 
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
    dropdownMenu.classList.toggle("hidden");
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
    setItem(STORAGE_KEY, todos);
});

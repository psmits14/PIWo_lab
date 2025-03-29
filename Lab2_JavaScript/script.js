"use strict";

const newTaskInput = document.getElementById('newTaskInput');
const listSelector = document.getElementById('listSelector');
const addTaskBtn = document.getElementById('addTaskBtn');
const undoBtn = document.getElementById('undoBtn');
const searchInput = document.getElementById('searchInput');
const caseInsensitiveCheckbox = document.getElementById('caseInsensitive');
const newListInput = document.getElementById('newListInput');
const addListBtn = document.getElementById('addListBtn');
const listsContainer = document.getElementById('listsContainer');
const confirmationModal = document.getElementById('confirmationModal');
const modalText = document.getElementById('modalText');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');

let tasks = {
    urgent: [],
    regular: [],
};
let lastDeletedTask = null;
let taskToDelete = null;

renderAllLists();
setupEventListeners();


function renderAllLists() {
    // Renderowanie podstawowych list
    renderList('urgent');
    renderList('regular');

    // Renderowanie dodawanych list
    Object.keys(tasks).forEach(listName => {
        if (!['urgent', 'regular'].includes(listName)) {
            if (!document.getElementById(`${listName}List`)) {
                createListInDOM(listName);
                addListToSelector(listName);    
            } else {
                renderList(listName);
            }
        }
    });
}

// Odświeżanie wyświetlania list
function renderList(listName) {
    const listElement = document.getElementById(`${listName}List`);
    if (!listElement) return;
    
    // Inicjalizacja tablicy zadań jeśli nie istnieje
    if (!tasks[listName]) {
        tasks[listName] = [];
    }
    
    // Wyczyszczenie listy, aby usunąć istniejące wcześniej elementy
    listElement.innerHTML = '';
    
    // Filtrowanie 
    const searchTerm = searchInput.value;
    const isCaseInsensitive = caseInsensitiveCheckbox.checked;
    
    const filteredTasks = tasks[listName].filter(task => {
        // Jeśli pole wyszukiwania jest puste → pokazujemy wszystkie zadania.
        if (!searchTerm) return true;   
        
        //Jeśli coś wpisano → pokazujemy tylko te zadania, których text zawiera wpisaną frazę (z uwzględnieniem lub bez wielkości liter)
        if (isCaseInsensitive) {
            return task.text.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return task.text.includes(searchTerm);
        }
    });
    
    // Dodanie elementów listy
    filteredTasks.forEach(task => {
        // Tworzymy nowy <li> dla każdego zadania
        const li = document.createElement('li');
        // Dodajemy klasę .completed, jeśli zadanie jest zakończone.
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;
        
        li.innerHTML = `
            <div class="task-content">
                <div class="task-text">${task.text}</div>
                <div class="task-date">${task.completedDate ? 'Wykonano: ' + new Date(task.completedDate).toLocaleString() : ''}</div>
            </div>
            <button class="delete-btn"><i class="fas fa-times"></i></button>
        `;
        
        listElement.appendChild(li);
    });
}

// Tworzenie nowej listy w dokumencie
function createListInDOM(listName) {
    const listHTML = `
        <div class="list-wrapper" data-list="${listName}">
            <div class="list-header">
                <h2>${listName} <i class="fas fa-chevron-down"></i></h2>
            </div>
            <ul class="task-list" id="${listName}List"></ul>
        </div>
    `;
    
    listsContainer.insertAdjacentHTML('beforeend', listHTML);       // dodanie naszego fragmentu html do listsContainter na koniec wnętrza (beforeend)
    
    // Inicjalizacja początkowej tablicy bez zadań
    if (!tasks[listName]) {
        tasks[listName] = [];
    }
}

// Dodanie listy do selektora
function addListToSelector(listName) {
    // Sprwadzenie czy lista jest już w selektorze
    if (Array.from(listSelector.options).some(option => option.value === listName)) {   // listSelector.options - wszystkie opcje w elemencie select, Array.from konwertuje na tablicę, some(element => warunek) zwraca true jesli element spełnia warunek
        return;
    }
    
    const option = document.createElement('option');    // Tworzy element ze znacznikiem <option>
    option.value = listName;
    option.textContent = listName;
    listSelector.appendChild(option);
}


// Dodawanie nowego zadania
function addTask() {
    const taskText = newTaskInput.value.trim();
    const selectedList = listSelector.value;
    
    if (taskText === '') {
        alert('Zadanie musi mieć nazwę!');
        return;
    }
    
    // Tworzenie nowego zadania
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        completedDate: null
    };
    
    if (!tasks[selectedList]) {
        tasks[selectedList] = [];
    }
    
    // Dodanie zadania do listy
    tasks[selectedList].push(newTask);  

    // Odświeżenie listy
    renderList(selectedList);
    
    // Czyszczenie inputu
    newTaskInput.value = '';
}

// Zmienianie stanu wykonania zadania
function toggleTaskCompletion(taskElement) {
    // Szukanie do której listy należy zadanie i pobranie jej nazwy
    const listName = taskElement.closest('.list-wrapper').dataset.list;
    // Szukanie id zadania, które kliknięto
    const taskId = parseInt(taskElement.dataset.id);
    
    // Wyszukanie zadania o danym ID w danej liście zadań.
    const task = tasks[listName].find(t => t.id === taskId);
    if (!task) return;
    
    task.completed = !task.completed;
    task.completedDate = task.completed ? new Date().toISOString() : null;
    
    // Odświeżenie listy
    renderList(listName);
}

// Wyswietlanie modalu usuwania
function showDeleteModal(taskElement) {
    const listName = taskElement.closest('.list-wrapper').dataset.list;
    const taskId = parseInt(taskElement.dataset.id);
    
    const task = tasks[listName].find(t => t.id === taskId);
    if (!task) return;
    
    // Przechowywanie zadania
    taskToDelete = { listName, taskId, task: { ...task } };
    
    // Aktualizacja modalu
    modalText.textContent = `Czy na pewno chcesz usunąć zadanie o treści: "${task.text}"?`;
    confirmationModal.classList.add('show');         
}

// Usuwanie zadania
function deleteTask() {
    if (!taskToDelete) return;
    
    // 'Rozpakowanie' zadania zapisanego wcześniej
    const { listName, taskId, task } = taskToDelete;
    
    // Przechowywanie kopii zadania do cofnięcia usuwania
    lastDeletedTask = { listName, task: { ...task } };
    undoBtn.disabled = false;
    
    // Usunięcie zadania, filter(...) tworzy nową tablicę z wszystkimi zadaniami oprócz tego, którego id równa się taskId.
    tasks[listName] = tasks[listName].filter(t => t.id !== taskId);
    
    // Odświeżenie
    renderList(listName);
    
    // Schowanie modalu
    confirmationModal.classList.remove('show');
    taskToDelete = null;
}

// Cofnięcie usuwania
function undoDelete() {
    if (!lastDeletedTask) return;
    
    const { listName, task } = lastDeletedTask;
    
    // Dodawanie zadania spowrotem
    if (!tasks[listName]) {
        tasks[listName] = [];
    }
    
    tasks[listName].push(task);
    
    renderList(listName);
    
    // Aktualizacja przycisku
    undoBtn.disabled = true;
    lastDeletedTask = null;
}

// Dodawanie nowej listy
function addNewList() {
    const listName = newListInput.value.trim();
    
    if (listName === '') {
        alert('Nazwa listy nie może być pusta!');
        return;
    }
    
    if (tasks[listName]) {
        alert('Lista o takiej nazwie już istnieje!');
        return;
    }
    
    tasks[listName] = [];
    createListInDOM(listName);
    addListToSelector(listName);
    
    newListInput.value = '';
}

// Przełączanie widoczności (zwijanie/rozwijanie) listy zadań
function toggleListCollapse(headerElement) {
    const listWrapper = headerElement.closest('.list-wrapper'); // Szukamy kontenera całej listy
    const taskList = listWrapper.querySelector('.task-list');   // Szukamy elementu <ul> z zadaniami
    const icon = headerElement.querySelector('i');              // Pobieramy ikonę strzałki

    // Dodajemy lub usuwamy klasę "collapsed" do/ze spisu zadań
    taskList.classList.toggle('collapsed');

    // Zmieniamy ikonę w zależności od tego, czy lista jest zwinięta
    icon.className = taskList.classList.contains('collapsed') ? 
        'fas fa-chevron-right' : 'fas fa-chevron-down';
}

// Ustawianie event listeners
function setupEventListeners() {
    // Dodawanie zadania po kliknięciu przycisku
    addTaskBtn.addEventListener('click', addTask);

    // Dodawanie zadania po naciśnięciu Enter w polu tekstowym
    newTaskInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addTask();
    });

    // Cofanie ostatniego usunięcia zadania
    undoBtn.addEventListener('click', undoDelete);

    // Wyszukiwanie zadań
    searchInput.addEventListener('input', renderAllLists);

    // Przełączanie opcji ignorowania wielkości liter w wyszukiwaniu
    caseInsensitiveCheckbox.addEventListener('change', renderAllLists);

    // Dodawanie nowej listy po kliknięciu przycisku
    addListBtn.addEventListener('click', addNewList);

    // Dodawanie nowej listy po naciśnięciu Enter w polu tekstowym
    newListInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addNewList();
    });

    // Obsługa kliknięć na zadania, przyciski usuwania i nagłówki list 
    listsContainer.addEventListener('click', e => {
        // Kliknięcie w treść zadania lub jego kontener – oznacza ukończenie zadania
        if (e.target.classList.contains('task-text') || 
            e.target.classList.contains('task-content')) {
            const taskItem = e.target.closest('.task-item');
            if (taskItem) toggleTaskCompletion(taskItem);
        }

        // Kliknięcie w przycisk usuwania – pokazuje modal potwierdzenia
        if (e.target.classList.contains('delete-btn') || 
            e.target.closest('.delete-btn')) {
            const taskItem = e.target.closest('.task-item');
            if (taskItem) showDeleteModal(taskItem);
        }

        // Kliknięcie w nagłówek listy – zwija/rozwija listę
        if (e.target.classList.contains('list-header') || 
            e.target.closest('.list-header')) {
            const header = e.target.closest('.list-header');
            if (header) toggleListCollapse(header);
        }
    });

    // Obsługa przycisku "Usuń" w modalu
    confirmDeleteBtn.addEventListener('click', deleteTask);

    // Obsługa przycisku "Anuluj" w modalu
    cancelDeleteBtn.addEventListener('click', () => {
        confirmationModal.classList.remove('show'); // Ukrycie okna modalnego
        taskToDelete = null; // Wyczyszczenie referencji do usuwanego zadania
    });
}

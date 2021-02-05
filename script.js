let $todoInput; // miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; // info o braku zadań / konieczności dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // nowo dodany LI, nowe zadanie
let $allTasks; // lista wszystkich dodanych LI
let $idNumber = 0; // ID dodawane do każdego nowego zadania
let $popup; //pobrany popup
let $popupInfo; // alert w popupie, jak się doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; //tekst wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk "zatwierdź" w popup'ie
let $closeTodoBtn //przycisk od zamykania popup'a

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todo-input');
    $alertInfo = document.querySelector('.alert-info');
    $addBtn = document.querySelector('.add');
    $ulList = document.querySelector('.list ul');
    $allTasks = document.getElementsByTagName('li');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popup-info');
    $popupInput = document.querySelector('.popup-input');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $todoInput.addEventListener('keyup', enterCheck);
    $ulList.addEventListener('click', checkClick);
    $addPopupBtn.addEventListener('click', changeToDo);
    $closeTodoBtn.addEventListener('click', closePopup);
}

const addNewTask = () => {
    if ($todoInput.value == '') {
        $alertInfo.innerText = 'Wpisz treść zadania!';
        $alertInfo.style.color = 'red';
    } else {
        $alertInfo.innerText = '';
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`)
        $ulList.appendChild($newTask);

        const newDiv = document.createElement('div');
        newDiv.classList.add('tools');
        $newTask.appendChild(newDiv);
        newDiv.innerHTML = `<button class="complete"><i class="fas fa-check"></i></button>
        <button class="edit">EDIT</i></button>
        <button class="delete"><i class="fas fa-times"></i></button>`;
        
        $todoInput.value = '';
    }
}

const enterCheck = (e) => {
    if (e.keyCode === 13) {
        addNewTask();
    }
}

const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').classList.contains('delete')) {
        e.target.closest('li').remove();
        
        if ($allTasks.length === 0) {
            $alertInfo.innerText = 'Brak zadań na liście.';
            $alertInfo.style.color = 'var(--dark-violet)'
        }
    } else if (e.target.closest('button').classList.contains('edit')) {
        editTask(e);
    }
}

const editTask = (e) => {
    const oldToDo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldToDo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex';
}

const changeToDo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Musisz podać jakąś treść!'
    }
}

const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
}

document.addEventListener('DOMContentLoaded', main);
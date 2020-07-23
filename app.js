const todoBtn = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list')// where we will append our data too 
const body = document.querySelector('body');
const themeBtn = document.querySelector('.theme-btn');
const title = document.querySelector('.title');

let theme = "white"

// event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', clearTodo)
themeBtn.addEventListener('click', darkTheme);


function addTodo (e){
    e.preventDefault();

    //create a div for li and buttons 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    
    //create an li and append it to the newTodo
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);

    // store the input value to the localstorage
    saveLocalStorage(todoInput.value)

    //create buttons 
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = `<i class='fa fa-check' ></i>`
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn)

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = `<i class='fa fa-trash' ></i>`
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn)

    // final append to the todoList UL
    todoList.appendChild(todoDiv)

    // theme display 
    if (!body.classList['dark']){
        todoLi.classList.add('dark-li')
    }
    //remove input value 

    todoInput.value = ''

    

}

function clearTodo (e){
    const btnTarget = e.target;

    if (btnTarget.classList[0] === 'complete-btn'){
        btnTarget.parentElement.classList.toggle('completed')
    }
    if (btnTarget.classList[0] === 'trash-btn'){
        const todo = btnTarget.parentElement
        removeLocalTodos(todo);
        todo.remove();
       
        
    }
}


function saveLocalStorage (todo) {
    let storage;

    if (localStorage.getItem('storage')=== null){
        storage = []
    }
    else {
        storage = JSON.parse(localStorage.getItem('storage'))
    }

    storage.push(todo)
    localStorage.setItem('storage', JSON.stringify(storage))
}

// makes the local storage items show on screen 

function getTodos (){
    let storage;

    if (localStorage.getItem('storage') === null) {
        storage = []
    }
    else {
        storage = JSON.parse(localStorage.getItem('storage'))
    }

    storage.forEach((todo) => {
        //create a div for li and buttons 
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')

        //create an li and append it to the newTodo
        const todoLi = document.createElement('li');
        todoLi.innerText = todo
        todoLi.classList.add('dark-li')
        todoLi.classList.add('todo-item');
        todoDiv.appendChild(todoLi);

        //create buttons 
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = `<i class='fa fa-check' ></i>`
        completeBtn.classList.add('complete-btn');
        todoDiv.appendChild(completeBtn)

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = `<i class='fa fa-trash' ></i>`
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn)

        // final append to the todoList UL
        todoList.appendChild(todoDiv)

        
    })

    
}

function removeLocalTodos (todo) {
    let storage;

    if (localStorage.getItem('storage') === null) {
        storage = []
    }
    else {
        storage = JSON.parse(localStorage.getItem('storage'))
    }

    //get the index of the todos in the local storage 
    const todoIndex = todo.children[0].innerText
    storage.splice(storage.indexOf(todoIndex), 1)
    localStorage.setItem('storage', JSON.stringify(storage))
}


function darkTheme() {
    body.classList.toggle('dark');
    if (body.classList[0] === 'dark' ){
        title.style.color = 'white'
        todoBtn.style.backgroundColor = '#1A2735';
        todoBtn.style.color = 'white'
    } else{
        title.style.color = 'black'
        todoBtn.style.backgroundColor = 'white';
        todoBtn.style.color = 'black'
    }
    
}

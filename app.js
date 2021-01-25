const title = document.querySelector(".title");
const showDate = document.querySelector(".date");
const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit-btn");
const todoList  = document.querySelector(".todo-list");
const doing = document.querySelector(".doing");
const completed = document.querySelector(".completed");

window.addEventListener("load", showTheDate);
window.addEventListener("load", onLoad);
todoList.addEventListener("click", moveItem);
doing.addEventListener("click", moveToCompleted);
completed.addEventListener("click", deleteItem);
submitBtn.addEventListener("click", addItem);

function showTheDate(){
    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let dateOfMonth = date.getDate();
    let year = date.getFullYear();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    showDate.textContent = days[day] + " " + dateOfMonth + " " + months[month] + " " + year;
}

function onLoad(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let doings;
    if(localStorage.getItem("doings") === null){
        doings = [];
    } else {
        doings = JSON.parse(localStorage.getItem("doings"));
    }

    let done;
    if(localStorage.getItem("done") === null){
        done = [];
    } else {
        done = JSON.parse(localStorage.getItem("done"));
    }

    todos.forEach((todo) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-div");
    
        const item = document.createElement("p");
        item.innerText = todo;
        item.classList.add("item");
    
        const doingBtn = document.createElement("button");
        doingBtn.innerHTML = `<i class="fas fa-arrow-circle-right"></i>`
        doingBtn.classList.add("doing-btn");
    
        itemDiv.appendChild(item);
        itemDiv.appendChild(doingBtn);
        todoList.appendChild(itemDiv);
    })

    doings.forEach((todo) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-div");
    
        const item = document.createElement("p");
        item.innerText = todo;
        item.classList.add("item");
    
        const doingBtn = document.createElement("button");
        doingBtn.innerHTML = `<i class="fas fa-check-square"></i>`
        doingBtn.classList.add("complete-btn");
    
        itemDiv.appendChild(item);
        itemDiv.appendChild(doingBtn);
        doing.appendChild(itemDiv);
    })

    done.forEach((todo) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-div");
    
        const item = document.createElement("p");
        item.innerText = todo;
        item.classList.add("item");
    
        const doingBtn = document.createElement("button");
        doingBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
        doingBtn.classList.add("remove-btn");
    
        itemDiv.appendChild(item);
        itemDiv.appendChild(doingBtn);
        completed.appendChild(itemDiv);
    })
}

function addItem(){
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-div");

    const item = document.createElement("p");
    item.innerText = input.value;
    item.classList.add("item");

    const doingBtn = document.createElement("button");
    doingBtn.innerHTML = `<i class="fas fa-arrow-circle-right"></i>`
    doingBtn.classList.add("doing-btn");

    itemDiv.appendChild(item);
    itemDiv.appendChild(doingBtn);

    todoList.appendChild(itemDiv);
    addTodoLocalStorage(input.value);
    input.value = "";
}

function addTodoLocalStorage(item){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let doings;
    if(localStorage.getItem("doings") === null){
        doings = [];
    } else {
        doings = JSON.parse(localStorage.getItem("doings"));
    }

    let done;
    if(localStorage.getItem("done") === null){
        done = [];
    } else {
        done = JSON.parse(localStorage.getItem("done"));
    }

    todos.push(item);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function moveItem(e){
    const item = e.target;
    if(item.classList[0] === "doing-btn"){
        const parent = item.parentElement;
        todoList.removeChild(parent);
        doing.appendChild(parent);
        const complete = document.createElement("button");
        complete.classList.add("complete-btn");
        complete.innerHTML = `<i class="fas fa-check-square"></i>`;
        parent.appendChild(complete);
        item.remove();
        addDoingLocalStorage(doing);
    }
}

function addDoingLocalStorage(item){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let doings;
    if(localStorage.getItem("doings") === null){
        doings = [];
    } else {
        doings = JSON.parse(localStorage.getItem("doings"));
    }

    let done;
    if(localStorage.getItem("done") === null){
        done = [];
    } else {
        done = JSON.parse(localStorage.getItem("done"));
    }

    const index = (item.children[1].innerText);
    todos.splice(todos.indexOf(index), 1);
    doings.push(index);
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("doings", JSON.stringify(doings));
}

function moveToCompleted(e){
    const element = e.target;
    if(element.classList[0] === "complete-btn"){
        const elementParent = element.parentElement;
        doing.removeChild(elementParent);
        completed.appendChild(elementParent);
        const remove = document.createElement("button");
        remove.classList.add("remove-btn");
        remove.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        elementParent.appendChild(remove);
        element.remove();
        addCompletedLocalStorage(completed)
    }
}

function addCompletedLocalStorage(item){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let doings;
    if(localStorage.getItem("doings") === null){
        doings = [];
    } else {
        doings = JSON.parse(localStorage.getItem("doings"));
    }

    let done;
    if(localStorage.getItem("done") === null){
        done = [];
    } else {
        done = JSON.parse(localStorage.getItem("done"));
    }

    const index = (item.children[1].innerText);
    doings.splice(doings.indexOf(index), 1);
    done.push(index);
    localStorage.setItem("doings", JSON.stringify(doings));
    localStorage.setItem("done", JSON.stringify(done));
}

function deleteItem(e, item){
    const removeBtn = e.target;
    if(removeBtn.classList[0] === "remove-btn"){
        const removeParent = removeBtn.parentElement;
        removeParent.remove();
        removeCompleteLocalStorage(removeParent);
    }
}

function removeCompleteLocalStorage(item){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let doings;
    if(localStorage.getItem("doings") === null){
        doings = [];
    } else {
        doings = JSON.parse(localStorage.getItem("doings"));
    }

    let done;
    if(localStorage.getItem("done") === null){
        done = [];
    } else {
        done = JSON.parse(localStorage.getItem("done"));
    }

    const index = item.innerText;
    done.splice(done.indexOf(index), 1);
    localStorage.setItem("done", JSON.stringify(done));
}
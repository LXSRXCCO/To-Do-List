const title = document.querySelector(".title");
const showDate = document.querySelector(".date");
const showTime = document.querySelector(".time");
const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit-btn");
const todoList  = document.querySelector(".todo-list");
const doing = document.querySelector(".doing");
const completed = document.querySelector(".completed");

setInterval(showTheTime, 1000);
window.addEventListener("load", showTheDate);
todoList.addEventListener("click", moveItem);
doing.addEventListener("click", moveToCompleted);
completed.addEventListener("click", deleteItem);
submitBtn.addEventListener("click", addItem);

function showTheTime(){
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if(hours < 10){
        hours = "0" + hours;
    } else if(minutes < 10){
        minutes = "0" + minutes;
    } else if(seconds < 10) {
        seconds = "0" + seconds;
    }

    showTime.innerText = hours + ":" + minutes + ":" + seconds;
}

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

    todos.push(item);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoLocalStorage(item){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
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
    }
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
    }
}

function deleteItem(e){
    const removeBtn = e.target;
    if(removeBtn.classList[0] === "remove-btn"){
        const removeParent = removeBtn.parentElement;
        removeParent.remove();
    }
}
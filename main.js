// Declare variables
let completedCount = 0;
let todoId = 1;

const todoArray = [];

// Declare HTML elements
const inputTodo = document.querySelector("#inputTodo");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("ul");
const infoText = document.querySelector("#infoText");
const countTodo = document.querySelector("#countTodo");

const completedBtn = document.getElementById("completed-Btn"); //knapp för att visa completed
const completedTaskList = document.getElementById("completed-tasks");

// Function to change the status of a todo item
function changeStatus(text, status) {
    let changeIndex = todoArray.map(t => t.name).indexOf(text);
    todoArray[changeIndex].completed = status;
    console.log(todoArray);
}

// Add event listener to the "Add" button
addBtn.addEventListener("click", function () {
    let text = inputTodo.value;

    // Check if input is empty
    if (text.length === 0) {
        infoText.innerText = "YOU NEED TO WRITE A TASK";
        return;
    } else {
        infoText.innerText = ""; // Clear the info text
    }

    // Create new todo item (li element)
    const todoItem = document.createElement("li");
    todoList.appendChild(todoItem);

    const itemLabel = document.createElement("span");
    itemLabel.innerText = text;
    todoItem.appendChild(itemLabel);

    // Add event listener to mark items as completed
    itemLabel.addEventListener("click", function () {
        //kolla om den är completed
        if (todoItem.getAttribute("class") === "completed") {
            completedCount--;
            todoItem.setAttribute("class", "");
            
            let todoText = todoItem.firstChild.textContent;
            changeStatus(todoText, false);
          
        } else {
            completedCount++;
            todoItem.setAttribute("class", "completed");
            completedTaskList.appendChild(todoItem); // flytta till completed list knapp
            let todoText = todoItem.firstChild.textContent;
            changeStatus(todoText, true);
        }
        countTodo.innerText = `Number of completed to-dos: ${completedCount}`;

        


    });

    // Create trash button for each item
    const trashcan = document.createElement("button");
    trashcan.innerHTML = '<i class="fas fa-trash"></i>';
    todoItem.appendChild(trashcan);



    // Add event listener to remove the item
    trashcan.addEventListener("click", function () {
        let todoText = todoItem.firstChild.textContent; //hittar text från todo
        let itemIndex = todoArray.findIndex(t => t.name === todoText); 

        if (itemIndex !== -1){
            todoArray.splice(itemIndex,1); // tar bort från array
        }

       
        if (todoItem.classList.contains("completed")) {
            completedCount--;
            countTodo.innerText = countTodo.innerText = `Number of completed to-dos: ${completedCount}`;
        }
        todoItem.remove(); // radera item från counter
    });



    


    // Create and add the todo object to the array
    const todoObject = {
        id: todoId,
        name: text,
        completed: false
    };
    todoArray.push(todoObject);

    // Increment todoId and clear input field
    todoId++;
    inputTodo.value = "";



});




// skapa en knapp var man trycker på så visas alla todos
completedBtn.addEventListener("click", function () {
    if (completedTaskList.style.display === 'none') {
        completedTaskList.style.display = 'block';
        completedBtn.textContent = 'Hide completed tasks';
    }
    else {
        completedTaskList.style.displey = 'none';
        completedBtn.textContent = 'show completed tasks';
    }
});


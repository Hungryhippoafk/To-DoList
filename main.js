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

const completedBtn = document.getElementById("completed-Btn"); // Button for showing completed tasks
const completedTaskList = document.getElementById("completed-task-list"); // List of completed tasks (make sure to have the correct ID)

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
        if (todoItem.getAttribute("class") === "completed") {
            completedCount--;
            todoItem.setAttribute("class", "");
            
            let todoText = todoItem.firstChild.textContent;
            changeStatus(todoText, false);
          
        } else {
            completedCount++;
            todoItem.setAttribute("class", "completed");
            completedTaskList.appendChild(todoItem); // Move to completed list
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
        let todoText = todoItem.firstChild.textContent; // Find text from todo
        let itemIndex = todoArray.findIndex(t => t.name === todoText); 

        if (itemIndex !== -1){
            todoArray.splice(itemIndex,1); // Remove from array
        }

        if (todoItem.classList.contains("completed")) {
            completedCount--;
            countTodo.innerText = `Number of completed to-dos: ${completedCount}`;
        }
        todoItem.remove(); // Remove item from counter
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

// Event listener to toggle visibility of completed tasks
completedBtn.addEventListener("click", function () {
    if (completedTaskList.style.display === 'none' || completedTaskList.style.display === "") {
        completedTaskList.style.display = 'block'; // Show the box
        this.textContent = 'Hide completed tasks'; // Change button text
    } else {
        completedTaskList.style.display = 'none'; // Hide the box
        this.textContent = 'Show completed tasks'; // Change button text
    }
});

document.addEventListener('DOMContentLoaded',function(){
    const themeButton = document.getElementById('themeButton');
    const body = document.body;
    themeButton.addEventListener('click',function(){
        if (body.classList.contains('dark-theme')){
            body.classList.remove('dark-theme');
            themeButton.textContent = 'Switch To Dark Theme';
        } else {
            body.classList.add('dark-theme');
            themeButton.textContent = 'Switch To Light Theme';
        }
    })
});

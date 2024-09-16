let input = document.querySelector('.input');
let add = document.querySelector(".add");
let taskdiv = document.querySelector('.tasks');
let diverror = document.querySelector('.form');
let err =document.createElement('span');
err.textContent = " Please Enter Your Task";
err.style.cssText="color : red ; margin-top: 2px;"
console.log(diverror); 
// window.localStorage.clear()
let arrayOftask = [];
//let taskId = 1;
if (window.localStorage.getItem("tasks")) {
    arrayOftask=JSON.parse(window.localStorage.getItem("tasks"))
}
gettaskfromlocalstordge()
add.onclick =()=>{
    if (input.value !== "") {
        addtask(input.value)
        
        input.value="";
        if (diverror.contains(err)) {
            diverror.removeChild(err);
        }
     }else{
        if (!diverror.contains(err)) {
            diverror.appendChild(err);
        }
    }
}

//remove item 
taskdiv.addEventListener("click",(e)=>{
    if (e.target.classList.contains('del')) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //remove elment from page
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done')
        donetask(e.target.getAttribute("data-id"))
    }
})


function addtask(taskText){
const task = {
id:arrayOftask.length + 1,
title: taskText,
completed : false,
}
arrayOftask.push(task);
// console.log(arrayOftask);
//taskId++
addelmenttopage(arrayOftask);
addtaskstolocalstordge(arrayOftask)
}

function addelmenttopage (arr){
    taskdiv.innerHTML = "";
    if (arrayOftask.length > 0) {

        let clearall =document.createElement('button')
        clearall.className="clearall"
        clearall.textContent="Clear All"
        taskdiv.appendChild(clearall)
        clearall.addEventListener("click",cleare )
    }
  

    
    arr.forEach(el => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (el.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", el.id);
    div.appendChild(document.createTextNode(el.title));
    // Create Delete Button
    let span = document.createElement("span");
    if (el.completed === true) {
        span.className = "check"; // Create a class for styling checkmark
        span.appendChild(document.createTextNode("✔️")); // Checkmark symbol
    } else {
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
    }
    div.appendChild(span);
    // Add Task Div To Tasks Container
    taskdiv.appendChild(div);
    });
}
//set tasks to localstoradge
function addtaskstolocalstordge(array) {
//method stringfi => convert javascript value to javascript object notation
window.localStorage.setItem("tasks" , JSON.stringify(array))
}
// get task  from local stordge
function gettaskfromlocalstordge(){
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let task = JSON.parse(data);
        console.log(data);
        addelmenttopage(task)
        
    }
}

function deleteTaskWith(taskid){
    arrayOftask =arrayOftask.filter((task)=>task.id != taskid)
    addtaskstolocalstordge(arrayOftask)//to refresh localstoradge
}
function donetask(taskid) {
    for (let i = 0; i < arrayOftask.length; i++) {
        if (arrayOftask[i].id == taskid) {
            arrayOftask[i].completed == false ? (arrayOftask[i].completed = true) : (arrayOftask[i].completed = false)

        }
    }
    addtaskstolocalstordge(arrayOftask)//to refresh localstoradge
    addelmenttopage(arrayOftask);
}
function cleare(){
    taskdiv.innerHTML = "";
    window.localStorage.clear()
}

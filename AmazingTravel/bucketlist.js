//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('#filter');
const taskInpt = document.querySelector('#task');

//Loadl all eventListeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    //add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear all tastks
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop through the stuff rtht is in LS
    tasks.forEach(function(task){
        //after getting an input as a text, a new li item needs to be created
        const li = document.createElement('li');
        li.className = 'collection-item'; // we assign it to a class immediately

        li.appendChild(document.createTextNode(task)); // this is how we give a new value to the li
        
        const link = document.createElement('a');
        link.className = "delete-item secondary-content"; // same stuff, but it gets 2 classnames
        

        link.innerHTML = '<i class="fa fa-remove"></i>';//it gets an icon as well

        li.appendChild(link);  

        // now li should be added to ul
        taskList.appendChild(li);
    });

}


function addTask(e){ //e = event object
    //taskInpt === undefined
    if(taskInpt.value.length == 0) {
        alert('Add a task');
        console.log("Mi tortenik? ");
    } else{
        //after getting an input as a text, a new li item needs to be created
        const li = document.createElement('li');
        li.className = 'collection-item'; // we assign it to a class immedeatly
        
        li.appendChild(document.createTextNode(taskInpt.value)); // this is how we give a new value to the li
        
        const link = document.createElement('a');
        link.className = "delete-item secondary-content"; // same stuff, but it gets 2 classnames
        

        link.innerHTML = '<i class="fa fa-remove"></i>';//it gets an icon as well

        li.appendChild(link);  

        // now li should be added to ul
        taskList.appendChild(li);

        //store in LS
        storeTaskInLocalStorage(taskInpt.value);

        //clearing the input afterwards! 
        taskInpt.value = '';
    }

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are u sure?')){
            e.target.parentElement.parentElement.remove();

            //remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){ // textcontent is the actual text in the il
            tasks.splice(index, 1);         //if it is matches with the task that is chhecked ... 
        }                                   //then gets deleted
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){
    //that's a method, but it is slower
    //taskList.innerHTML = '';
    if(confirm('Are u sure?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }

        clearTasksFromLocalStorage();
    }
}
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


function filterTasks(e){
    const text = e.target.value.toLowerCase(); // that gives us whatever is typed in 
    //(with lowercase methdod everything can be found)   
    document.querySelectorAll('.collection-item').forEach // It iterats through the list
    (function(task){                            //queryselectorall returns a nodelist // task = iterator
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){ // if there is a match it shows it
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
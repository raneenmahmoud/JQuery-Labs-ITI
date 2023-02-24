var input = $("#taskinput")
var addbtn = $("#buttoninput")
var DivTasks = $(".AllTasks")
var close = $(".btn-close")

let TasksArray = [];

//for stable when reload
if(localStorage.getItem('tasks')){
    TasksArray = JSON.parse(localStorage.getItem('tasks'))
}

//Trigger function of data
 GetDatafromlocalstorage()

//Check For Input
addbtn.on("click", function(){
    if(input.val() !== "")
    {
        AddTaskToArray(input.val());
        input.val('');
    }
    else
    {
        alert("No Task to be added")
    }
    // console.log(input.val())
})
//empty inputtext
close.on('click', function(e){input.val('');})

function AddTaskToArray(taskinput){
    const task ={
        id: Date.now(),
        Title: taskinput,
        completed: false
    };
    TasksArray.push(task);
    AddTasksToDiv(TasksArray);
    AddtoLocalStorage(TasksArray)
}

//Add All Tasks to HTML Page
function AddTasksToDiv(TasksArray){
    DivTasks.html(" ");
    TasksArray.forEach(task => {
        DivTasks.css('overflowY', "scroll");

        let div = `<div class="row" style="border:1px solid transparent">
                      <div class="container shadow rounded-4 d-flex justify-contenty-center p-2" style="background:rgb(210, 224, 248)" id="${task.id}">
                      <p class="fs-5 col-md-10 mb-1 mb-md-0">${task.Title}</p>
                      <i class="bi bi-check2-square col-md-1 offset-md-1'" id="Done" role="button" style="color:green;font-size:22px"></i>
                      <i class="bi bi-trash" id="Delete" role="button" style="color:red;font-size:22px"></i>
                      </div>
                    </div>`
        let br = `<div>
                    <br>
                    </div>`
        DivTasks.append(div,br)

        if(task.completed){
            // div.addClass('text-decoration-line-through')
            // div.addClass('opacity-50')
        }
    });
}
DivTasks.on('click','#Delete', function(e){
    var parent_task = $(this).closest('div');
        //remove from localstorage
        //id for this element
        deletefromlocalstorage(parent_task.attr("id"))
        // console.log(parent_task.attr("id"))
        //remove from html page
        parent_task.remove()
    })
DivTasks.on('click','#Done', function(e){
        var parent_task = $(this).closest('div');
        //update state in localstorage
        updateLocalStorage(parent_task.attr("id"));
        //update state in html page
        parent_task.toggleClass('opacity-50');
        parent_task.toggleClass('text-decoration-line-through')
    })

function AddtoLocalStorage(TasksArray){
    window.localStorage.setItem("tasks", JSON.stringify(TasksArray))
    console.log(TasksArray)
}

//Get Datat from LocalSotrage
function GetDatafromlocalstorage(){
    let data = localStorage.getItem("tasks");
    if(data){
        //convert data from string to objects
        tasks = JSON.parse(data)
        AddTasksToDiv(tasks)
    }
    console.log(TasksArray)
}
function deletefromlocalstorage(taskId){
    //filter array to get array without deleted task
    TasksArray = TasksArray.filter((task)=> task.id != taskId)
    AddtoLocalStorage(TasksArray)
}
function updateLocalStorage(taskId){
    for(var i=0; i<TasksArray.length; i++){
        if(TasksArray[i].id == taskId){
            TasksArray[i].completed == false 
            ? ( TasksArray[i].completed = true) 
            : (TasksArray[i].completed = false)
        }
    }
    AddtoLocalStorage(TasksArray);
}
function Clear(){
    DivTasks.html(" ");
    window.localStorage.removeItem("tasks");
    console.log(TasksArray)
    TasksArray=[];
    console.log(TasksArray)
    AddtoLocalStorage(TasksArray);
}
document.querySelector("#myBtn").addEventListener('click', function() {
    const inputName = document.querySelector("#inputName").value;
    const inputDescription = document.querySelector("#inputDescription").value;
    const inputAssignment = document.querySelector("#inputAssignment").value;
    const dateInput = document.querySelector("#dueDate").value;
    const inputStatus = document.querySelector("#inputStatus").value;
    
    validateTaskForm (inputName, inputDescription, inputAssignment, dateInput, inputStatus);
})


function validateTaskForm(inputName, inputDescription, inputAssignment, dateInput, inputStatus){
    let integerDate = Date.parse(dateInput);
    let todaysDate = new Date();
     let date = todaysDate.getDate();
     let month = todaysDate.getMonth() + 1;
     let year = todaysDate.getFullYear();
     let dateStr = year + "-" + month + "-" + date;
     let todaysIntegerDate = Date.parse(dateStr);
     let isValid1 = false;
     let isValid2 = false;
     let isValid3 = false;
     let isValid4 = false;
     

   if (inputName.length != "" && inputName.length > 5){
       isValid1 = true;
     } else {
      isValid1 = false;
       document.getElementById("demo").innerHTML = "Insert more than 5 characters";
    }

     if (inputDescription.length != "" && inputDescription.length > 10){
         isValid2 = true;
       } else {
         isValid2 = false;
         document.getElementById("demo1").innerHTML = "Insert more than 10 characters";
      }

       if (inputAssignment.length != "" && inputAssignment.length > 5){
        isValid3 = true;
       } else {
         isValid3 = false;
         document.getElementById("demo2").innerHTML = "Insert more than 5 characters";
       }

     if (integerDate >= todaysIntegerDate){
          isValid4 = true;   
         }else {
             isValid4 = false;
             document.getElementById("demo3").innerHTML = "Date not available";
         }

          if (isValid1 == true && isValid2 == true && isValid3 == true && isValid4 == true){
             createTaskOb(inputName, inputDescription, inputAssignment, dateInput, inputStatus, myTaskManager.allTasks);
             let taskIndex = myTaskManager.allTasks.length-1;
             myTaskManager.addTask(myTaskManager.allTasks[taskIndex]);   
          } 
 }

 function createTaskOb (inputName, inputDescription, inputAssignment, dateInput, inputStatus, myTaskArray){
        myTaskManager.allTasks.push({  
            "ID" : myTaskArray.length + 1,
            "Name": inputName,
            "Description": inputDescription,
            "AssignedTo": inputAssignment,
            "DueDate": dateInput,
            "Status": inputStatus,
        })

        localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
        console.log(myTaskManager.allTasks);
        return myTaskManager.allTasks;   
    }
 
class TaskManager {
    constructor(name){
        this.allTasks = [];
        this.name = name;
    }

        getAllTasks(){
            console.log(this.allTasks);
        }

        addTask(task){
            let cardHTML = `<div class="col-md-12" id="${task.ID}">
            <div class = "card"> 
                <div class="card-header">TASK</div>
                    <ul class="list-group list-group-flush"> 
                       <li class="list-group-item">Name:  ${task.Name}  </li>
                       <li class="list-group-item">Description:  ${task.Description} </li>
                        <li class="list-group-item">Assigned To:  ${task.AssignedTo} </li> 
                        <li class="list-group-item">Due Date:  ${task.DueDate} </li> 
                        <li class="list-group-item">Status:  ${task.Status} </li> 
                            <div class="btn-group open">
                                <button class="btn"><i class="fa fa-cog fa-fw"></i> Modify </button> 
                                <button class="btn dropdown-toggle" data-toggle="dropdown"> </button>
                                <ul class="dropdown-menu" id="dropdown">
                                    <li><button type="button" class="updateBtn" updateId="${task.ID}"><i class="fa fa-pencil fa-fw" job="update" updateId="${task.ID}"></i></button>Edit </li>
                                    <li><button type="button" class="deleteBtn" deleteId="${task.ID}"><i class="fa fa-trash fa-fw" job="delete" deleteId="${task.ID}"></i></button> Delete </li> 
                                </ul> 
                            </div> 
                    </ul> 
                </div> 
            </div> 
            </div>`

            const itemsContainer = document.getElementById("list-items");
            itemsContainer.innerHTML += cardHTML;
            
            const itemHTML = `<div taskId="${task.ID}" class="list-group-item list-group-item-action">\n 
                                <div class="d-flex w-100 justify-content-between">\n  
                                <h5 class="mb-1"> ${task.Name} </h5>\n 
                                <small class="text-muted">  ${task.DueDate}  </small>\n 
                                </div>\n
                                <p class="mb-1">  ${task.Description} </p>\n 
                                <p class="mb-1">  ${task.AssignedTo}  </p>\n 
                                <small class="text-muted"> ${task.Status} </small>\n   
                            </div>`

    
            const itemsContainer2 = document.getElementById("list-group");
            itemsContainer2.innerHTML += itemHTML;

            let buttons = document.querySelectorAll(".deleteBtn");
            //console.log(buttons); 
            buttons.forEach((button) =>{
                button.addEventListener("click", handleDelete)
            })  

            let buttons2= document.querySelectorAll(".updateBtn");
            //console.log(buttons); 
            buttons2.forEach((button) =>{
                button.addEventListener("click", handleUpdate)

            })     
        }

        deleteTask(event){
            let element1 = event.target;
            let thisTaskId = element1.attributes.deleteId.value;
                //console.log(thisTaskId);
                //console.log(thisTaskId);
                console.log(element1);
                //console.log(this.allTasks);
                //console.log("this task id", thisTaskId, this.allTasks[i].ID);
                for (let i=0; i < this.allTasks.length; i++){
                    if(this.allTasks[i].ID = thisTaskId){
                        this.allTasks.splice(i, 1);
                        localStorage.setItem("taskArray", JSON.stringify(this.allTasks));
                    }
                    console.log(this.allTasks);
                 }

            
            element1.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element1.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
            
            let buttons3= document.querySelectorAll(".list-group-item.list-group-item-action");
            //console.log(buttons3); 
            buttons3.forEach((button) =>{
                if (button.attributes.taskId.value == thisTaskId){
                    //console.log(button.attributes.taskId.value);
                    //console.log(thisTaskId);
                    button.parentNode.removeChild(button);
                }
            })
        }

        updateTask(event){
            let element1 = event.target;
            let currentTask = {};
            let currentTaskId = element1.attributes.updateid;
            
            for (let i=0; i < this.allTasks.length; i++){
                if(this.allTasks[i].ID = currentTaskId){
                    currentTask = this.allTasks[i];
                }
            }

            document.querySelector("#inputName").value = currentTask.Name;
            document.querySelector("#inputDescription").value = currentTask.Description;
            document.querySelector("#inputAssignment").value = currentTask.AssignedTo;
            
            document.querySelector("#myBtn").outerHTML = `<button id = "saveUpdate"  type="button" class="btn btn-primary">Save</button>`

            document.querySelector("#saveUpdate").addEventListener('click', function() {
                let inputName = document.querySelector("#inputName").value;
                let inputDescription = document.querySelector("#inputDescription").value;
                let inputAssignment = document.querySelector("#inputAssignment").value;
                let dateInput = document.querySelector("#dueDate").value;
                let inputStatus = document.querySelector("#inputStatus").value;
                let integerDate = Date.parse(dateInput);
                let todaysDate = new Date();
                let date = todaysDate.getDate();
                let month = todaysDate.getMonth() + 1;
                let year = todaysDate.getFullYear();
                let dateStr = year + "-" + month + "-" + date;
                let todaysIntegerDate = Date.parse(dateStr);
                let isValid1 = false;
                let isValid2 = false;
                let isValid3 = false;
                let isValid4 = false;
     

                if (inputName.length != "" && inputName.length > 2){
                    isValid1 = true;
                } else {
                    isValid1 = false;
                    document.getElementById("demo").innerHTML = "Insert more than 8 characters";
                }

                if (inputDescription.length != "" && inputDescription.length > 2){
                    isValid2 = true;
                } else {
                    isValid2 = false;
                    document.getElementById("demo1").innerHTML = "Insert more than 20 characters";
                }

                if (inputAssignment.length != "" && inputAssignment.length > 2){
                    isValid3 = true;
                } else {
                    isValid3 = false;
                    document.getElementById("demo2").innerHTML = "Insert more than 8 characters";
                }

                if (integerDate >= todaysIntegerDate){
                    isValid4 = true;   
                }else {
                    isValid4 = false;
                    document.getElementById("demo3").innerHTML = "Date not available";
                }
                if (isValid1 == true && isValid2 == true && isValid3 == true && isValid4 == true){
                    currentTask.Name = inputName;
                    currentTask.Description = inputDescription;
                    currentTask.AssignedTo = inputAssignment;
                    currentTask.DueDate = dateInput;
                    currentTask.Status = inputStatus;
                    localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
                    location.reload();
                 } 
                

            })

        }

}

let myTaskManager = new TaskManager("myTasks");


 
    function handleDelete(e) {
        myTaskManager.deleteTask(e)
    }
     
    function handleUpdate(e) {
        myTaskManager.updateTask(e)
    }



let dataReturned = localStorage.getItem("taskArray");
if (dataReturned){
    myTaskManager.allTasks = JSON.parse(dataReturned);
    populatePage(myTaskManager.allTasks);
}else{
    myTaskManager.allTasks = [];
}

function populatePage(array){
    for(let i=0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }

}











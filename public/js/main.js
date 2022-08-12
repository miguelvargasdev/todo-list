const deleteBtn = document.querySelectorAll('.close');
const incompleteTasks = document.querySelectorAll('.task');
const completedTasks = document.querySelectorAll('.task.completed');

for(element of deleteBtn){
    element.addEventListener('click', deleteItem);
}

for(element of incompleteTasks){
    element.addEventListener('click', markComplete);
}

for(element of completedTasks){
    element.addEventListener('click', markIncomplete);
}

async function deleteItem(){
    const task = this.parentNode.childNodes[1];
    try{
        const res = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'id': task.id
            })
          })
        const data = await res.json();
        console.log(data);
        location.reload()
    }catch(err){
        console.log(err);
    }
}

async function markComplete(){
    const task = this.parentNode.childNodes[1];
    try{
        const res = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'id': task.id
            })
        })
        const data = await res.json();
        console.log(data);
        location.reload();
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const task = this.parentNode.childNodes[1];
    console.log(this.parentNode.childNodes)
    try{
        const res = await fetch('markIncomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'id': task.id
            })
        })
        const data = await res.json();
        location.reload();
    }catch(err){
        console.log(err)
    }
}


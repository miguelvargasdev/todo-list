const deleteBtn = document.querySelectorAll('.close');
const tasks = document.querySelectorAll('.task');
// const completedTasks = document.querySelectorAll('.task.completed')

for (element of deleteBtn) {
    element.addEventListener('click', deleteItem);
}

for (element of tasks) {
    element.addEventListener('click', toggleComplete);
}


// async function previousDate(){
//     try{
//         const res = await fetch('day=', {
//             method: 'get',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 'day'
//             })
//         }
//     }catch{

//     }
// }


async function deleteItem() {
    const id =  this.parentNode.dataset.id;
    await console.log(id)
    try {
        const res = await fetch('deleteTask', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': id
            })
        })
        const data = await res.json();
        console.log(data);
        location.reload()
    } catch (err) {
        console.log(err);
    }
}

async function toggleComplete() {
    const classList = this.classList;
    const id = this.parentNode.dataset.id
    try {
        const res = await fetch('toggleComplete', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': id,
                'classList': classList
            })
        })
        location.reload();
    }catch(err) {
        console.log(err)
    }
}


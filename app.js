// all elements
const submitBtn = document.getElementById('submit_btn');
const inputTask = document.getElementById('input_task');
const taskContainer = document.getElementById('task_container');
const deleteBtn = document.getElementById('delete_btn');
const saveBtn = document.getElementById('save-edit');
const doneAll = document.getElementById('done_btn');

let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
// Add functionallity
submitBtn.addEventListener('click', () => {
    const task = inputTask.value.trim();
    const finder = todos.find(item => item.title === task);
    if (finder) {
        return alert('This task alredy avilable, please add new task');
    }
    if (task === '') {
        return alert('Please write your task frist')
    }
    const taskObj = {
        title: task,
        id: todos.length + 1,
        time: new Date().toLocaleString(),
        isDone: false,
    }
    todos.push(taskObj);
    inputTask.value = '';
    showTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
});
// show toods
const showTodos = (todos) => {
    taskContainer.innerHTML = '';
    todos.forEach(todo => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="${todo.isDone ? 'bg-green-500/10' : 'bg-red-500/10'} p-2  border border-gray-700 rounded-sm">
                <p class="text-gray-200">
                ${todo.title}
                </p>
                <hr class="text-gray-500 mb-2 mt-2">
                <div class="space-y-2">
                    <div class="flex gap-2 ">
                        <div class="flex gap-2">
                            <input id="${todo.id}" type="checkbox" class="checkbox bg-gray-100">
                            ${todo.isDone ? '<p class="text-green-500">Completed</p>' : '<p class="text-red-500">Pending</p>'}
                        </div>
                        <p class="text-gray-100 line-clamp-1"><i class="fa-regular fa-clock mr-1"></i> ${todo.time} </p>
                    </div>
                    <div class="flex gap-2">
                        ${todo.isDone ? '' : `<button onclick="markDone(${todo.id})"
                            class="text-gray-100 cursor-pointer bg-green-300/10 px-3 rounded-sm border border-green-500/20 py-1">Mark
                            as complete</button>`}
                        <button onclick="editItem(${todo.id})"
                            class="text-gray-100 cursor-pointer bg-green-300/10 px-3 rounded-sm border border-green-500/20 py-1">Edit</button>
                        <button onclick="removeItem(${todo.id})"
                            class="text-red-500 cursor-pointer bg-red-300/10 px-3 rounded-sm border border-red-500/20 py-1">Delete</button>
                    </div>
                </div>
            </div>
        `;
        taskContainer.appendChild(div);
    })
}
showTodos(todos);
// 
// markDone
const markDone = (id) => {
    const target = todos.find(item => item.id === id);
    target.isDone = true;
    console.log(target)
    showTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// remove item
const removeItem = (id) => {
    const target = todos.find(item => item.id === id);
    const itemIndex = todos.indexOf(target);
    todos.splice(itemIndex, 1);
    showTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// edit function
let editTargetID;
const editItem = (id) => {
    document.getElementById('my_modal_1').showModal();
    editTargetID = id;
}

saveBtn.addEventListener('click', () => {
    const editValue = document.getElementById('update-value');
    const target = todos.find(item => item.id === editTargetID);
    target.title = editValue.value;
    editValue.value = '';
    showTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
})

// delete all
deleteBtn.addEventListener('click', () => {
    const allChekbox = document.querySelectorAll('input[type="checkbox"]:checked');
    allChekbox.forEach(element => {
        const target = todos.find(item => item.id == element.id);
        const index = todos.indexOf(target)
        todos.splice(index, 1)
        showTodos(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    })
});
// complete all
doneAll.addEventListener('click',()=>{
    const allChekbox = document.querySelectorAll('input[type="checkbox"]:checked');
    allChekbox.forEach(element => {
        todos.map(item=>{
            if (item.id==element.id) {
                item.isDone=true;
            }
        })
        showTodos(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    })
})
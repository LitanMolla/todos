// all elements
const submitBtn = document.getElementById('submit_btn');
const inputTask = document.getElementById('input_task');
const taskContainer = document.getElementById('task_container');
const deleteBtn = document.getElementById('delete_btn');

let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
// Add functionallity
submitBtn.addEventListener('click', () => {
    const task = inputTask.value.trim();
    const finder = todos.find(item => item === task);
    if (finder) {
        return alert('This task alredy avilable, please add new task');
    }
    if (task === '') {
        return alert('Please write your task frist')
    }
    todos.push(task);
    inputTask.value = '';
    showTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
});
// show toods
const showTodos = (todos) => {
    taskContainer.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="flex justify-between bg-slate-800 px-4 py-2 border border-slate-700 rounded-sm text-slate-200">
                <span class="text-green-500">${todo}</span>
                <div class="flex gap-2">
                <button onclick="editItem('${todo}')" class="cursor-pointer text-gray-200">Edit</button>
                <button onclick="removeItem('${todo}')" class="cursor-pointer text-red-500">Delete</button>
                </div>
            </div>
        `;
        taskContainer.appendChild(li);
    })
}
showTodos(todos);
// remove item
const removeItem = (todo) => {
    const itemIndex = todos.indexOf(todo);
    todos.splice(itemIndex, 1);
    showTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}
const editItem = (todo) => {
    const editValue = prompt('Update task').trim();
    const finder = todos.find(item => item === editValue);
    if (editValue === '') {
        return alert('Empty value not allowed')
    }
    if (finder) {
        return alert('This task alredy avilable');
    }
    const itemIndex = todos.indexOf(todo);
    todos[itemIndex] = editValue;
    showTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// delete all
deleteBtn.addEventListener('click',()=>{
    todos=[];
    showTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
})
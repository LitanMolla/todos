// all elements
const submitBtn = document.getElementById('submit_btn');
const inputTask = document.getElementById('input_task');
const taskContainer = document.getElementById('task_container');

let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
// Add functionallity
submitBtn.addEventListener('click', () => {
    const task = inputTask.value;
    const finder = todos.find(item => item === task);
    if (finder) {
        return alert('This task alredy avilable, please add new task')
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
                <button onclick="removeItem('${todo}')" class="cursor-pointer text-red-500">Delete</button>
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
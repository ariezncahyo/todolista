const localTodo = [
    {text: 'todo start now', done: true},
    {text: 'todo next another', done: false}
]

const todolista = JSON.parse( localStorage.getItem('todolist')) || localTodo

const elements = {
    inputTodo: document.getElementById('textTodo'),
    addTodo: document.getElementById('addTodo'),
    listTodo: document.getElementById('todo'),
    resetTodo: document.getElementById('resetTodo'),
    error: document.getElementById('error')
}

let fetchTodolist = () => {
    elements.listTodo.innerHTML = null

    todolista.forEach((todo,index) => {
        const newTodo = document.createElement('li')
        newTodo.innerText = todo.text

        if (todo.done) {
            newTodo.classList.add('done')

            const deleteButton = document.createElement('button')
            deleteButton.innerText = 'Delete completed task'
            deleteButton.classList.add('btn')

            deleteButton.addEventListener('click', () => deleteTask(index))
            newTodo.append(' => ', deleteButton)
        }
        else {
            const completeButton = document.createElement('button')
            completeButton.innerText = 'Mark as completed'
            completeButton.classList.add('btn')

            completeButton.addEventListener('click', () => {doneTaskTodo(index)})
            newTodo.append(' => ', completeButton)
        }

        elements.listTodo.append(newTodo)
    });
}

let validatedText = () => {
    return elements.inputTodo.value.length > 0
}

let addTask = () => {
    if (validatedText()) {
        const todoText = elements.inputTodo.value
        todolista.push({text: todoText, done: false})

        storeAndFetch()
        elements.inputTodo.value = ''
        elements.inputTodo.focus()

        elements.error.innerText = ''
    } else {
        elements.error.innerText = 'Hello, Please input anything...'
    }
}

let doneTaskTodo = (index) => {
    todolista[index].done = true
    storeAndFetch()
}

let deleteTask = (index) => {
    todolista.splice(index, 1)
    storeAndFetch()
}

addTodo.addEventListener('click', () => addTask())

elements.resetTodo.addEventListener('click', () => {
    localStorage.clear()
    window.location.reload()
})

let storeAndFetch = () => {
    localStorage.setItem('todolist', JSON.stringify(todolista))

    fetchTodolist()
}

elements.inputTodo.addEventListener('keypress', e =>
  e.keyCode === 13 ? addTask() : {}
)

fetchTodolist()
elements.inputTodo.focus()
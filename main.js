const getDatabase = () => JSON.parse(localStorage.getItem('list') ?? []);
const setDatabase = (banco) => localStorage.setItem('list', JSON.stringify(banco));

const createItem = (task, status='', index) => {
    const item = document.createElement('label')
    item.classList.add('task')
    item.innerHTML = `
    <input type="checkbox" ${status} data-index=${index}>
    <p>${task}</p>
    <input type="button" value="X" data-index=${index}>
    `
    document.querySelector('.list').appendChild(item)
}

const clean = () => {
    let list = document.querySelector('.list')
    while (list.firstChild) {
        list.removeChild(list.lastChild)
    }
}

const readDatabase = () => {
    clean()
    const database = getDatabase();
    database.forEach( (item, index) => createItem(item.tarefa, item.status, index))
}

const insertItem = (event) => {
    let key = event.key
    if (key === 'Enter') {
        const database = getDatabase();
        database.push({'tarefa': event.target.value, 'status': ''})
        setDatabase(database)
        readDatabase()
        event.target.value = ''
    }
}

const clickItem = (event) => {
    if (event.target.type === 'button') {
        const index = event.target.dataset.index
        removeItem(index)
    } else if (event.target.type === 'checkbox') {
        const index = event.target.dataset.index
        updateStatus(index)
    }
}

const removeItem = (index) => {
    const database = getDatabase();
    database.splice(index, 1)
    setDatabase(database)
    readDatabase()
}

const updateStatus = (index) => {
    const database = getDatabase();
    database[index].status = database[index].status === '' ? 'checked' : '';  
    setDatabase(database)
    readDatabase()
}


document.getElementById('add').addEventListener('keypress', insertItem)
document.querySelector('.list').addEventListener('click', clickItem)

readDatabase()
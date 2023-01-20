const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

const LS_KEYS = {
    ITEMS: 'items'
}

function displayItems(){
    const html = items.map(item =>`
        <li>
            <input type="checkbox" id="${item.id}" ${item.isCompleted ? 'checked' : ''}>
            <span>${item.name}</span>
            <button id="${item.id}">&times</button>
        </li>
    `).join('');
    // map - трансформация , сделать из массива в htmlку , и ее добавить в дом
    // не мутирует наш state
    // console.log(html);
    list.innerHTML = html;
}


function setDataToLocalStorage() {
    localStorage.setItem(LS_KEYS.ITEMS, JSON.stringify(items));
}


function restoreDataFromLocalStorage(){
    const data = JSON.parse(localStorage.getItem(LS_KEYS.ITEMS));
    // parse обратно в JSON
    // console.log(data);
    if(data?.length){
        items.push(...data);
        // displayItems();
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    // console.log(items);
}

function handleSelector(event){
    event.preventDefault();
    const name = event.currentTarget.item.value;

    if(!name) return;

    const item = {
        name: name,
        isCompleted: false,
        id: crypto.randomUUID()
    }
    // console.log(item);
    items.push(item);
    // console.log(items);
    event.currentTarget.item.value = '';
    // либо
    // event.currentTarget.reset();

    // displayItems();
    // Вместо вызова этой функции, вызываем кастомный эвент, который мы ща создадим
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}


function deleteItem(id){
    items = items.filter(item => item.id !== id);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsCompleted(id){
    items = items.map(item => item.id === id ? {
        ...item,
        isCompleted: !item.isCompleted
    } : item)
    list.dispatchEvent(new CustomEvent('itemsUpdated'));

}

shoppingForm.addEventListener('submit', handleSelector);
window.addEventListener('load', restoreDataFromLocalStorage);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', setDataToLocalStorage);
window.addEventListener('storage', e => {
    items = JSON.parse(e.newValue);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
})
list.addEventListener('click', event=>{
    // console.log(event.target);
    // console.log(event.currentTarget);
    const id = event.target.id;
    if(event.target.matches('button')){
        deleteItem(id);
    }

    if(event.target.matches('input')){
        markAsCompleted(id);
    }
})
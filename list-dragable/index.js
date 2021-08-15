const list = Array(3).fill('not to do')
const listElm = document.getElementById('list')
let draggedElm = null
for (let [idx, item] of list.entries()) {
    initTodo({order: idx, item})
}

function initTodo({order, item}) {
    const itemElm = createElementFromHtml(
        `<label class="todo" style="--order: ${order}" draggable="true">
                    <input type="checkbox" class="check">
                    <div class="done"></div>
                    <div class="subject">${order} : ${item}</div>
              </label>`)

    addListenerMulti(itemElm, 'dragstart touchstart', function () {
        draggedElm = this
        draggedElm.classList.add('on')
    })

    addListenerMulti(itemElm, 'dragend touchend', function (e) {
        draggedElm.classList.remove('on')
        draggedElm = null
    })

    document.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    itemElm.addEventListener('dragenter', function (event) {
        if (this !== draggedElm) {
            swap(this)
        }
    })

    addListenerMulti(itemElm, 'touchmove', function (event) {
        const touch = event.touches[0]
        const {clientX: x, clientY: y} = touch
        const targetElm = Array.from(document.getElementsByClassName('todo')).find(function (todoElm) {
            return (x >= todoElm.offsetLeft && x <= todoElm.offsetLeft + todoElm.offsetWidth) &&
                (y >= todoElm.offsetTop && y <= todoElm.offsetTop + todoElm.offsetHeight)
        })
        swap(targetElm)
    })
    listElm.append(itemElm)
}

function addTodo(item) {
    initTodo({order: list.length, item})
    list.push(item)
}

function createElementFromHtml(html) {
    const div = document.createElement('div')
    div.innerHTML = html.trim()

    return div.firstChild
}

document.getElementById('adder')
    .addEventListener('keyup', ({key, target}) => {
        if (key === 'Enter') {
            const item = target.value.trim()
            if (item) {
                addTodo(item)
            }
            target.value = ''
        }
    })


function addListenerMulti(element, eventNames, listener) {
    const events = eventNames.split(' ');
    for (const event of events) {
        element.addEventListener(event, listener, false);
    }
}

function swap(targetElm) {
    if (draggedElm && targetElm) {
        if (!draggedElm.style.cssText || !targetElm.style.cssText) {
            debugger
        }
        const tmpCssText = draggedElm.style.cssText
        draggedElm.style.cssText = targetElm.style.cssText
        targetElm.style.cssText = tmpCssText
    }
}
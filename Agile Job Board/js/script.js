    let tasks = {

    }
    const modal = document.querySelector('.modal')
    const task_input = document.querySelector('.task-input')
    const create_btn = document.querySelector('.create-btn')
    const container = document.querySelector('.container')



    document.querySelector('.cancel-btn').addEventListener('click', function (e) {
        e.preventDefault()
        modal.classList.add('nodisplay')
    })
    create_btn.addEventListener('click', function (e) {
        e.preventDefault()
        type = e.target.dataset.type
        task = task_input.value
        task_input.value = ""
        tasks[type].push(task)
        console.log(tasks);
        renderLists()
        modal.classList.add('nodisplay')
    })




    // document.addEventListener('dragstart',function(e){
    //     e.preventDefault()
    //     if(e.target && e.target.id== 'task'){
    //           console.log(e.target.id);
    //           id=e.target.dataset.id

    //      }
    //  });




    // document.querySelector('.cancel-btn').addEventListener(function(){

    // })


    async function initializeLists() {
        let data = await getData()
        items = data["api.items"]
        lists = data["api.lists"]
        order = lists.order


        for (let i = 0; i < order.length; i++) {
            let listItem = lists.data[order[i]]
            tasks[listItem.title] = []
            //  for (const [key, value] of Object.entries(listItem.items)) {
            //     console.log(key, value);
            // }
            for (let j = 0; j < listItem.items.length; j++) {
                itemIndex = listItem.items[j]
                tasks[listItem.title].push(items.data[itemIndex].description)
            }
        }
        renderLists()

    }

    async function renderLists() {

        let html = ``
        for (const [listName, list] of Object.entries(tasks)) {
            console.log('llllllllllllll', listName, list)
            html += `<div class=" job-wrap" id="${listName}"  >
                        <div class="header">
                            <h2>${listName}</h2>
                            <div data-type="${listName}" class="add-icon" onclick="openModal(event)">
                                &plus;
                            </div>
                        </div>
                        <div class="tasks" ondrop="drop(event)" ondragover="allowDrop(event)">         
              `

            html += list.map((task, index) => {
                return `<div id="${listName}-${index}" class="task" draggable="true" ondragstart="drag(event)">${task} </div>`
            }).join('')
            html += ` </div></div>`
        }
        container.innerHTML = html

    }


    async function getData() {
        url = 'https://www.mocky.io/v2/5dfa4a40360000e899bd6bf9'
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    // renderLists()

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        console.log()
        ev.dataTransfer.setData("Text", ev.target.id);
    }

    function drop(ev) {
        if (ev.target.classList.contains("tasks")) {
            var data = ev.dataTransfer.getData("Text");
            let node = document.getElementById(data)
            text = node.innerText
            let parent=node.parentNode.parentNode.id
            let nextparent=ev.target.parentNode.id
            console.log(tasks);
            tasks[parent].splice( tasks[parent].indexOf('foo'), 1 );
            tasks[nextparent].push(text)
            console.log(tasks);
            ev.target.appendChild(document.getElementById(data));

        }
        ev.preventDefault();

    }

    function openModal(e) {
        type = e.target.dataset.type
        create_btn.dataset.type = type
        modal.classList.remove('nodisplay')
    }

    initializeLists()
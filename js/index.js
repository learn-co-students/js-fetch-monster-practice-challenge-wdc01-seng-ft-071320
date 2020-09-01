// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
// Above your list of monsters, you should have a form to create a new monster. 
// You should have fields for name, age, and description, and a 'Create Monster Button'. 
// When you click the button, the monster should be added to the list and saved in the API.


let monstersUrl = 'http://localhost:3000/monsters/'
let monsterContainer = document.querySelector('div#monster-container')
let createMonsterDiv = document.querySelector('div#create-monster')
let fwrdBtn = document.getElementById('forward')
let backBtn = document.getElementById('back')

const form = document.createElement('FORM')
createMonsterDiv.append(form)

    const nameInput = document.createElement('input')
    nameInput.placeholder = 'name'

    //const brk1 = document.createElement('br')

    const ageInput = document.createElement('input')
    ageInput.placeholder = 'age'

    // const brk2 = document.createElement('br')

    const descriptionInput = document.createElement('input')
    descriptionInput.placeholder = 'description'
    
    const createBtn = document.createElement('button')
    createBtn.innerText = 'Create'
    
    form.append(nameInput, ageInput, descriptionInput, createBtn)
    
    form.addEventListener('submit', () => {
        //debugger
        event.preventDefault()
        let nameInput = event.target[0].value
        let ageInput = event.target[1].value
        let descriptionInput = event.target[2].value

        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                 'Accept': "application/json"
            },
            body: JSON.stringify({
                nameInput,
                ageInput,
                descriptionInput
            })
        }
        fetch(monstersUrl, configObj)
        .then(res => res.json())
        .then(newMonster => {showMonster(newMonster)})

       form.reset()

    })


//fetch first fifty monsters
let current_page = 1

fetch(monstersUrl + '?_limit=50&_page=' + current_page)
.then(res => res.json())
.then(monsterArray => monsterArray.forEach(monster => showMonster(monster)))

function showMonster(monster){
    const nameTag = document.createElement('h2')
    nameTag.innerText = monster.name

    const ageTag = document.createElement('h2')
    ageTag.innerText = monster.age

    const descriptionTag = document.createElement('p')
    descriptionTag.innerText = monster.description

    monsterContainer.append(nameTag, ageTag, descriptionTag)

    
}

function allMonsters(monsters){
    monsterContainer.innerHTML = ""
    monsters.forEach(monster => showMonster(monster))
}
    fwrdBtn.addEventListener('click', () =>{
        //console.log(event.target)
        //debugger
        //current_page = parseInt(current_page)
        current_page += 1
        //current_page = current_page.toString()
        
        fetch(monstersUrl + '?_limit=50&_page=' + current_page)
        .then(res => res.json())
        .then(nextMonsters => allMonsters(nextMonsters))

    
})

backBtn.addEventListener('click', () =>{
    
    current_page -= 1

    fetch(monstersUrl + '?_limit=50&_page=' + current_page)
        .then(res => res.json())
        .then(nextMonsters => allMonsters(nextMonsters))
})


// At the end of the list of monsters, show a button. 
// When clicked, the button should load the next 50 monsters and show them.

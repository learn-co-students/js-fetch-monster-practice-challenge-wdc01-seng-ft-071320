const monsterContainer = document.querySelector('div#monster-container')
const url = 'http://localhost:3000/monsters/?_limit=50&_page='
let page = 1
getMonsters()

function getMonsters(){
    fetch(url + page)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => displayMonster(monster)))
    console.log(url + page)
} 

function displayMonster(monster){
    const monstDiv = document.createElement('div')

        const h2Tag = document.createElement('h2')
        h2Tag.innerText = monster.name
        monstDiv.append(h2Tag)
            const h4Tag = document.createElement('h4')
            h4Tag.innerText = `Age: ${monster.age}`
            monstDiv.append(h4Tag)
                const pTag = document.createElement('p')
                pTag.innerText = monster.description
                monstDiv.append(pTag)

    monsterContainer.append(monstDiv)
}

const form = document.querySelector('form')
form.addEventListener("submit", () => {
    event.preventDefault()
    let name = document.querySelector('input#name').value
    let age = document.querySelector('input#age').value
    let description = document.querySelector('input#description').value
    const monstSpec = {name: name, 
                        age: age, 
                        description: description}
   
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
        body: JSON.stringify(monstSpec)
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(newMonster => displayMonster(newMonster))
    form.reset()
    } )

// load next 50 monsters
    const nextBtn = document.querySelector('button#forward')
    const backBtn = document.querySelector('button#back')

    nextBtn.addEventListener('click', () => {
        if (page < 1){ 
            page = 2}
        else {
                page = page + 1
            }
        
        getMonsters()
    })

    backBtn.addEventListener('click', () => {
        page = page - 1
        getMonsters()
        // if (page = 1) {
        //     backBtn.disabled = true
        // }
    })
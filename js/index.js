document.addEventListener("DOMContentLoaded", () => {
    // Create form, inputs, and submit button
    const url = "http://localhost:3000/monsters/"
    const monsterContainer = document.querySelector("#monster-container")
    const forwardBtn = document.getElementById("forward")
    const backwardBtn = document.getElementById("back")

    const form = document.createElement("FORM")
    form.id = "create-form"

    const nameInput = document.createElement("INPUT")
    nameInput.placeholder = "name..."

    const ageInput = document.createElement("INPUT")
    ageInput.placeholder = "age..."

    const descriptionInput = document.createElement("INPUT")
    descriptionInput.placeholder = "description..."

    const submitBtn = document.createElement("BUTTON")
    submitBtn.innerText = "Create"

    form.append(nameInput, ageInput, descriptionInput, submitBtn)
    const formContainer = document.querySelector("#create-monster")
    formContainer.append(form)

    // fetch monsters
    let current_page = "1"
    
    fetch(url + "?_limit=50&_page=" + current_page)
    .then(res => res.json())
    .then(monsters => addAllMonsters(monsters))

    function addMonster(monster){
        let nameTag = document.createElement("H2")
        let ageTag = document.createElement("H4")
        let descriptionTag = document.createElement("P")

        nameTag.innerText = monster.name
        ageTag.innerText = monster.age 
        descriptionTag.innerText = monster.description 

        monsterContainer.append(nameTag, ageTag, descriptionTag)
    }

    function addAllMonsters(monsters){
        monsterContainer.innerHTML = ""
        monsters.forEach(monster => addMonster(monster))

    }


    forwardBtn.addEventListener("click", function(e){
        e.preventDefault

        current_page = parseInt(current_page)
        current_page += 1
        current_page = current_page.toString()

        fetch(url + "?_limit=50&_page=" + current_page)
        .then(res => res.json())
        .then(monsters => addAllMonsters(monsters))

    })
 

    backwardBtn.addEventListener("click", function(e){
        e.preventDefault

        current_page = parseInt(current_page)
        current_page -= 1
        current_page = current_page.toString()

        fetch(url + "?_limit=50&_page=" + current_page)
        .then(res => res.json())
        .then(monsters => addAllMonsters(monsters))

    })

    form.addEventListener("submit", function(e){
        let name = e.target[0].value
        let age = e.target[1].value
        let description = e.target[2].value

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                name, age, description
            })
        }

        fetch(url, configObj)
        .then(res => res.json())
        .then(newMonster => {
            addMonster(newMonster)
        })
    })

})
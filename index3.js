document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/monsters/?_limit=10&_page=";
    const monsContainer = document.querySelector('#monster-container')
    let page = 1;


    function fetchMonster() {
        fetch(url + page)
            .then(resp => resp.json())
            .then(data => renderMonster(data))
    }
    fetchMonster()

    function renderMonster(monsters) {
        for (const monster of monsters) {
            displayMonster(monster)
        }
    }

    function displayMonster(monster) {

        let h2 = document.createElement('h2')
        h2.innerText = monster.name

        let age = document.createElement('h3')
        age.innerText = "Age: " + monster.age

        let bio = document.createElement('p')
        bio.innerText = "Bio: " + monster.description

        monsContainer.append(h2, age, bio)
    }

    let backBtn = document.getElementById("back")
    backBtn.addEventListener('click', () => {
        if (page > 1) {
            page -= 1
            monsContainer.innerText = ''
        } else
            alert('No page to load')
        fetchMonster()
    })

    let forwardBtn = document.getElementById("forward")
    forwardBtn.addEventListener('click', () => {
        if (page >= 1) {
            page += 1
            monsContainer.innerText = ""
        }
        fetchMonster()
    })

    let frstPgBtn = document.getElementById("first-page")
    frstPgBtn.addEventListener('click', () => {
        page = 1
        monsContainer.innerText = ""
        fetchMonster()
    })

    let lastPgBtn = document.getElementById("last-page")

    // Add new monster - POST request
    const monsterForm = document.querySelector("#add-monster-form")
    monsterForm.addEventListener('submit', () => {
        let name = event.target[0].value
        let age = event.target[1].value
        let description = event.target[2].value

        configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name,
                age,
                description
            })
        }
        fetch(url, configObj)
            .then(resp => resp.json())
            .then(newMonster => console.log(newMonster))

        event.preventDefault
        // console.log("Hello")
    })

})
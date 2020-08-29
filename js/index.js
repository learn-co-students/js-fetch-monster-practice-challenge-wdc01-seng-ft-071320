// const url = "http://localhost:3000/monsters/?_limit=20&_page=3"

document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/monsters/?_limit=50&_page=";
    const monsterForm = document.getElementById('add-monster-form')
    let page = 1

    // const monsContainer = document.getElementById("monster-container");

    function fetchMonsters() {
        fetch(url + page)
            .then((res) => res.json())
            .then(monsters => getMonsters(monsters));

        // debugger
    }
    fetchMonsters();

    // iterate over the array
    function getMonsters(monsters) {
        for (const element of monsters) {
            addMons(element);
        }

    }
    // display each monster
    function addMons(monster) {
        let monsContainer = document.getElementById("monster-container");

        let monsDiv = document.createElement('div');
        monsContainer.append(monsDiv);

        let h2 = document.createElement('h2'); // name of monster
        h2.innerText = monster.name

        let h4 = document.createElement('h4'); // age of monster
        h4.innerText = 'Age:' + " " + monster.age

        let p = document.createElement('p'); // bio of monster
        p.innerText = 'Bio:' + " " + monster.description

        monsDiv.append(h2)
        monsDiv.append(h4)
        monsDiv.append(p)
    }

    // POST
    monsterForm.addEventListener('submit', () => {

        let name = event.target[0].value
        let age = event.target[1].value
        let description = event.target[2].value

        newObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age,
                description: description
            })
        }

        fetch(url, newObj)
            .then(resp => resp.json())
            .then(newObj => addMons(newObj))

        monsterForm.reset();
        event.preventDefault()
    })

    let firstPagebtn = document.querySelector("#first-page")
    firstPagebtn.addEventListener('click', () => {
        page = 1
        fetchMonsters()
    })

    let forwardBtn = document.getElementById("forward")
    forwardBtn.addEventListener('click', () => {
        if (page < 1) {
            page = 2
        } else
            page = page + 1
        fetchMonsters()

        console.log(url + page)

    })

    let backBtn = document.getElementById("back")
    backBtn.addEventListener('click', () => {
        if (page > 1) {
            page = page - 1
            fetchMonsters()
        } else if (page === 1) {
            alert("No page to load")
        }
        console.log(url + page)
    })

});
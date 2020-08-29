document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/monsters/?_limit=50&_page=";
    const monsterForm = document.getElementById("add-monster-form");
    const monsContainer = document.getElementById("monster-container");
    let page = 1;

    function fetchMonsters() {
        fetch(url + page)
            .then((res) => res.json())
            .then((monsters) => getMonsters(monsters));
    }
    fetchMonsters();

    // iterate over the array
    function getMonsters(monsters) {
        // for (const monster of monsters) {
        //   renderMonster(monster);

        monsters.forEach((monster) => {
            renderMonster(monster);
        });
    }
    //   }
    // display each monster
    function renderMonster(monster) {


        let monsDiv = document.createElement("div");
        monsContainer.append(monsDiv);

        let h2 = document.createElement("h2"); // name of monster
        h2.innerText = monster.name;

        let h4 = document.createElement("h4"); // age of monster
        h4.innerText = "Age: " + monster.age;

        let p = document.createElement("p"); // bio of monster
        p.innerText = "Bio: " + monster.description;

        monsDiv.append(h2);
        monsDiv.append(h4);
        monsDiv.append(p);
    }

    // POST
    monsterForm.addEventListener("submit", () => {
        let name = event.target[0].value;
        let age = event.target[1].value;
        let description = event.target[2].value;

        newObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: name,
                age: age,
                description: description,
            }),
        };

        fetch(url, newObj)
            .then((resp) => resp.json())
            .then((newMons) => renderMonster(newMons));

        monsterForm.reset();
        event.preventDefault();
    });

    let firstPagebtn = document.querySelector("#first-page");
    firstPagebtn.addEventListener("click", () => {
        page = 1;
        fetchMonsters();
    });

    let forwardBtn = document.getElementById("forward");
    forwardBtn.addEventListener("click", () => {
        if (page < 1) {
            page = 2;
        } else page = page + 1;
        monsContainer.innerText = ""
        fetchMonsters();
    });

    let backBtn = document.getElementById("back");
    backBtn.addEventListener("click", () => {
        if (page > 1) {
            monsContainer.innerText = ""
            page = page - 1;
        } else if (page === 1) {
            alert("No page to load");
        }
        fetchMonsters();
    });
});
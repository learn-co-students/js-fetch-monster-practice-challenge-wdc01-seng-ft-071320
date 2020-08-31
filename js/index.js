let pageNumber = 1
const url = 'http://localhost:3000/monsters/'

document.addEventListener("DOMContentLoaded", () => { 
    createForm()
    
    function createForm() {
        const div = document.querySelector('div#create-monster')
        const newForm = document.createElement('form')
            newForm.id = 'monster-form'
        newForm.innerHTML = `
            <input type="text" id="name" placeholder="Enter name ..."/>
            <input type="number" id="age" placeholder="Enter age ..."/>
            <input type="text" id="description" placeholder="Enter description ..."/>
            <button type="submit" class="monster-btn">Create Monster</button>`
        div.append(newForm)

        newForm.addEventListener("submit", (e) => {
            e.preventDefault()
  
            const name = e.target[0].value
            const age = e.target[1].value
            const desc = e.target[2].value
    
            fetch("http://localhost:3000/monsters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name, age, description 
                })
            })
            .then(res => res.json())
            .then(newMonster => eachMonster(newMonster))
            newForm.reset()
        })
    }


    fetch(`${url}/?_limit=50&_page=${pageNumber}`)
    .then(res => res.json())
    .then(allMonsters => showMonsters(allMonsters))
    
    function showMonsters(allMonsters) {
        allMonsters.forEach(monster => eachMonster(monster))
    }
        
    let divMonster = document.querySelector("div#monster-container")
        
    function eachMonster(monster) {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
            h2.innerText = "Name: " + monster.name
        const h4 = document.createElement('h4')
            h4.innerText = "Age: " + monster.age
        const p = document.createElement('p')
            p.innerText = "Bio: " + monster.description

        div.append(h2, h4, p)
        divMonster.append(div)
    }

   document.addEventListener("click", (e) => {
       let newPageMonsters = document.querySelector("div#monster-container") 
       if(e.target === document.getElementById('forward')) {
               pageNumber++
               newPageMonsters.innerHTML = ""  //clear out the page
               fetch(`${url}/?_limit=50&_page=${pageNumber}`)  //fetch all new ones
               .then(res => res.json())
               .then(allMonsters => showMonsters(allMonsters))
       } else {
            e.target === document.getElementById('back') 
            if(pageNumber > 1) {
                pageNumber--
                newPageMonsters.innerHTML = ""  //clear out the page
                fetch(`${url}/?_limit=50&_page=${pageNumber}`)  //fetch all new ones
                .then(res => res.json())
                .then(allMonsters => showMonsters(allMonsters))
            }
       }
   })


    
})


// function createForm() {
//     const div = document.querySelector('div#create-monster')
//     const newForm = document.createElement('form')
//         newForm.id = 'monster-form'
//     const input1 = document.createElement('input')
//         input1.type = "text"
//         input1.innerText = "Name: "
//         input1.innerHTML = 
//     const input2 = document.createElement('input')
//         input2.type = "number"
//         input2.innerText = "Age: "
//     const input3 = document.createElement('input')
//         input3.type = "text"
//         input3.innerText = "Description: "
//     const input4 = document.createElement('input')  
//     const btn = document.createElement('button')
//         btn.type = "button"
//         btn.innerText = "Create"
    
//     newForm.append(input1, input2, input3, btn)
//     div.append(newForm)
// }
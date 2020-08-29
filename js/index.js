// let first = 0
// let last = 50
document.addEventListener("DOMContentLoaded",()=>{
let page = 1
const url="http://localhost:3000/monsters/?_limit=50&_page="
function fetchMonsters(){
fetch(url+page)
    .then(res => res.json())
    .then(mon => monsterTags(mon))
}
fetchMonsters()


function monsterTags(monsterArray)
{

monsterArray.forEach(monster =>{

    const nameTag = document.createElement("h2")
    nameTag.innerText = monster.name
    const ageTag = document.createElement("h4")
    ageTag.innerText = "Age: "+ monster.age
    const descriptionTag = document.createElement("p")
    descriptionTag.innerText= "Bio: " +monster.description
    // const breakTag = document.createElement("<br>")
    let container=document.querySelector("div#monster-container")
    container.append(nameTag, ageTag, descriptionTag)
    
    
    }      
    )
}

document.getElementById("back").addEventListener("click", function(){
    // if (first > 0){
            let container=document.querySelector("div#monster-container")
            container.innerHTML= ""
        //     first-=50,
        //     last-=50,
        if (page>1){
            page -=1
            fetchMonsters()}
            // event.preventDefault()
    }
)
document.getElementById("forward").addEventListener("click", function(){
    let container=document.querySelector("div#monster-container")
        container.innerHTML= ""
    //     first+=50,
    //     last+=50,
    page +=1
    fetchMonsters()
    // event.preventDefault()
})
const monsterForm = document.createElement("form")

const nameInput = document.createElement("input")
nameInput.setAttribute("type","text")
nameInput.setAttribute("name","name")
nameInput.setAttribute("placeholder","name...")

const descriptionInput = document.createElement("input")
descriptionInput.setAttribute("type","text")
descriptionInput.setAttribute("name","description")
descriptionInput.setAttribute("placeholder","description...")

const ageInput = document.createElement("input")
ageInput.setAttribute("type","integer")
ageInput.setAttribute("name","age")
ageInput.setAttribute("placeholder","age...")

var s = document.createElement("input"); 
s.setAttribute("type", "submit"); 
s.setAttribute("value", "Submit"); 

monsterForm.append(nameInput, ageInput, descriptionInput, s)
document.querySelector("div#create-monster").append(monsterForm)


monsterForm.addEventListener("Submit", ()=>{
    let name = event.target[0].value
    let age = event.target[1].value
    let description = event.target[2].value
    event.preventDefault
fetch("http://localhost:3000/monsters",
{
    method: POST,
    headers:
    {
        "Content-Type":"application/json",
        accept:"application/json"
    },
    body: JSON.stringify({
        name, age, description
    })

})
.then(response => response.json())
.then(newMonster => {monsterTags(newMonster)
monsterForm.reset
})
})




})
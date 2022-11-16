
let myPeople = []
window.addEventListener('DOMContentLoaded', (event) => {
    sessionStorage.setItem("people",JSON.stringify([]))
    showRandomPerson()
    saveFavoritePerson()

});
const baseUrl = "https://fakeface.rest/face/json";

const getRandomPerson = (gender = "female", minAge = null, maxAge = null)=> {
    const url = (maxAge && minAge)? `${baseUrl}?gender=${gender}&minimum_age=${minAge}&maximum_age=${maxAge}` : `${baseUrl}?gender=${gender}`;
    return fetch(`${url}`)
    .then((response)=> response.json())
    .then((data)=> {
        document.querySelector("#randomPerson").src = data.image_url;
        return data;
    })
}

const showRandomPerson = async()=> {
    getRandomPerson();
    document.querySelector("#search-form").addEventListener("submit", async(event)=> {
        event.preventDefault();
        const gender = event.target.gender.value;
        const minAge = event.target.minAge.value;
        const maxAge = event.target.maxAge.value;
        if(parseInt(minAge) > parseInt(maxAge)){
            alert("The maximum age should be greater than the minimum age!")
            return false;
        }
        const person = await getRandomPerson(gender, minAge, maxAge);
        document.querySelector("#randomPerson").src = person.image_url
    
    })
}

const saveFavoritePerson = (newFavoritePerson= null)=> {
    document.querySelector("#btn-save").addEventListener("click", ()=> {
        const person_image = document.querySelector("#randomPerson").src;
        let people = JSON.parse(sessionStorage.getItem("people"));
        const person = {
            image_url: person_image
        }
        const newPeople = [...people, person]
        displayFavoritePeople(newPeople)
        
        sessionStorage.setItem("people", JSON.stringify(newPeople));
    })
}


const displayFavoritePeople = (newPerson)=> {
    
    const card = newPerson.map((person)=> {
        return `<div class="col">
            <div class="card">
                <img src="${person.image_url}" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div> `
    })
    document.querySelector("#favorite-people").innerHTML = card
    console.log(newPerson)
}






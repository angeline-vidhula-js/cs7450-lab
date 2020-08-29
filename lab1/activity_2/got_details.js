// **** Your JavaScript code goes here ****

// Implementation of the function

let halfSurvival = (character) => {
    character.probability_of_survival = character.probability_of_survival / 2;
	return character;// TODO: Return half of survival probability	
}

let  debugCharacters = (character) => {
    console.log("name: " + character.name + ", new survival probability: " + character.probability_of_survival);
}

let createDom = (characters) => {
    // DOM #main div element
    let main = document.getElementById('main');

    let html = `
        <h3>My Favorite GoT Characters</h3>
        <div>`;

    for(let i = 0; i < characters.length; i++) {
        html += `<div class = "character">
                <img src = "./images/${characters[i].picUrl}">
                <h5>${characters[i].name}</h5>
                <p>${characters[i].house}</p>
                <p>${characters[i].probability_of_survival}</p>
                <p>${characters[i].status}</p>
            </div>
        `
    }

    html += `</div>`;
    main.innerHTML = html;
}

let init = () => {
    let data = [{
        "name": "Bran Stark",
        "status": "Alive",
        "current_location": "Fleeing White Walkers",
        "power_ranking": 7,
        "house": "stark",
        "probability_of_survival": 98,
        "picUrl": "bran.jpg"
    },
    {
        "name": "Arya Stark",
        "status": "Alive",
        "current_location": "Back in Westeros",
        "power_ranking": 8,
        "house": "stark",
        "probability_of_survival": 99,
        "picUrl": "arya.jpg"
    },
    {
        "name": "Sansa Stark",
        "status": "Alive",
        "current_location": "Winterfell",
        "power_ranking": 10,
        "house": "stark",
        "probability_of_survival": 83,
        "picUrl": "sansa.jpg"
    },
    {
        "name": "Robb Stark",
        "status": "Dead - Red Wedding S3E9",
        "current_location": "-",
        "power_ranking": -1,
        "house": "stark",
        "probability_of_survival": 0,
        "picUrl": "robb.jpg"
    }];
    let length = data.length;
    for(let i = 0; i < length; i++) {
        data[i] = halfSurvival(data[i]);
    }
    for(let i = 0; i < length; i++) {
        debugCharacters(data[i]);
    }
    createDom(data);
}

init();

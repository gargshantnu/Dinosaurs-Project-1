// cant find any better name than "Animal", if can suggest some better name, that will be great.
function Animal(species, weight, height, facts) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.facts = facts;
    this.image = "images/" + species.toLowerCase() + ".png";
}

Animal.prototype.addFact = function (fact) {
    this.facts.push(fact);
};

Animal.prototype.compareNameAndAddFact = function (name) {
    let fact = "Our names are on equal position.";
    if (this.name > name) {
        fact = "My name comes first in dictionary.";
    } else if (this.name < name) {
        fact = "Your name comes first.";
    }
    this.addFact(fact);
};

Animal.prototype.compareWeightAndAddFact = function (weight) {
    let fact = "Our weights are same.";
    if (this.weight > weight) {
        fact = "Yay! i weight more :P.";
    } else if (this.weight < weight) {
        fact = "You are Fat :P.";
    }
    this.addFact(fact);
};

Animal.prototype.compareHeightAndAddFact = function (height) {
    let fact = "Our heights are equal.";
    if (this.height > height) {
        fact = "My hight is greater then yours.";
    } else if (this.height < height) {
        fact = "You are really tall bro.";
    }
    this.addFact(fact);
};

Animal.prototype.getRandomFact = function () {
    let index = Math.floor(Math.random() * 10) % this.facts.length;
    return this.facts[index];
};

function Dino(species, weight, height, facts) {
    Animal.call(this, species, weight, height, facts);
}
Dino.prototype = Object.create(Animal.prototype);
Dino.prototype.constructor = Dino;

function Human(name, weight, height) {
    // here "Human" is passes because it represents species. For name, human object have its own property
    Animal.call(this, "human", weight, height, []);
    this.name = name;
}
Human.prototype = Object.create(Animal.prototype);
Human.prototype.constructor = Human;


let dinos = [];

fetch("dino.json")
    .then(response => response.json())
    .then(json => dinos = json.Dinos.map(dino => new Dino(dino.species, dino.weight, dino.height, [dino.fact, `My species is ${dino.species}.`, `I belong to ${dino.where}.`, `My when value is ${dino.when}.`])));


// Use IIFE to get human data from form
function getHuman() {
    return (function () {
        let name = getInputValue("name");
        let heightFeet = parseFloat(getInputValue("feet"));
        let heightInches = parseFloat(getInputValue("inches"));
        let weight = parseFloat(getInputValue("weight"));
        // 12 inch = 1 feet
        return new Human(name, weight, heightFeet * 12 + heightInches);
    })();
}


// On button click, prepare and display infographic
document.getElementById("btn")
    .addEventListener("click", function () {
        const human = getHuman();
        dinos.forEach(dino => {
            dino.compareHeightAndAddFact(human.height);
            dino.compareNameAndAddFact(human.name);
            dino.compareWeightAndAddFact(human.weight);
        });
        // Hide Form from UI
        document.getElementById("dino-compare").style.display = "none";
        // Generate Grids and add back to DOM
        for (let dinoIndex in dinos) {
            let dino = dinos[dinoIndex];
            let fact = dino.getRandomFact();
            if (dino.weight < 1) {
                // weight is less, ie its a bird
                fact = "All birds are dinosaurs."
            }
            let gridItemDiv = getGridItem(dino.species, dino.image, fact);

            document.getElementById("grid")
                .appendChild(gridItemDiv);
            if (dinoIndex == 3) {
                // insert human tile at center
                let humanTileDiv = getGridItem(human.species, human.image);

                document.getElementById("grid")
                    .appendChild(humanTileDiv);
            }
        }
    });


// hoisting
function getInputValue(elementId) {
    return document.getElementById(elementId).value;
}

function getGridItem(species, imageUrl, fact) {
    let gridItemDiv = document.createElement("div");
    gridItemDiv.className = "grid-item";

    // add species
    let speciesDiv = document.createElement("h3");
    speciesDiv.innerText = species;
    gridItemDiv.appendChild(speciesDiv);

    // add image
    let imageDiv = document.createElement("img");
    imageDiv.src = imageUrl;
    gridItemDiv.appendChild(imageDiv);

    // add fact
    if (fact) {
        // for humans, facts are not necessary
        let factFiv = document.createElement("p");
        factFiv.innerText = fact;
        gridItemDiv.appendChild(factFiv);
    }

    return gridItemDiv;
}

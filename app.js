function BaseStructure(species, weight, height, facts) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.facts = facts;
    this.image = "images/" + species.toLowerCase() + ".png";
}

BaseStructure.prototype.compareNameAndAddFact = function (name) {
    let fact = "Our names are on equal position";
    if (this.name > name) {
        fact = "My name comes first in dictionary";
    } else if (this.name < name) {
        fact = "Your name comes first";
    }
    this.addFact(fact);
}

BaseStructure.prototype.compareWeightAndAddFact = function (weight) {
    let fact = "Our weights are same";
    if (this.weight > weight) {
        fact = "Yay! i weight more :P";
    } else if (this.weight < weight) {
        fact = "You are Fat :P";
    }
    this.addFact(fact);
}

BaseStructure.prototype.compareHeightAndAddFact = function (height) {
    let fact = "Our heights are equal";
    if (this.height > height) {
        fact = "My hight is greater then yours";
    } else if (this.height < height) {
        fact = "You are really tall bro";
    }
    this.addFact(fact);
}

BaseStructure.prototype.addFact = function (fact) {
    this.facts.push(fact);
}

BaseStructure.prototype.getRandomFact = function () {
    let index = Math.floor(Math.random() * 10) % this.facts.length;
    return this.facts[index];
}

function Dino(species, weight, height, facts) {
    BaseStructure.call(this, species, weight, height, facts);
}
Dino.prototype = Object.create(BaseStructure.prototype);
Dino.prototype.constructor = Dino;

function Human(name, weight, height, facts) {
    BaseStructure.call(this, "human", weight, height, facts);
    this.name = name;
}
Human.prototype = Object.create(BaseStructure.prototype);
Human.prototype.constructor = Human;


let dinos = [];

fetch("dino.json")
    .then(response => response.json())
    .then(json => dinos = json.Dinos.map(dino => new Dino(dino.species, dino.weight, dino.height, [dino.fact, `My species is ${dino.species}`, `I belong to ${dino.where}`, `My when value is ${dino.when}`])));


// Use IIFE to get human data from form
function getHuman() {
    return (function () {
        let name = getInputValue("name");
        let heightFeet = getInputValue("feet");
        let heightInches = getInputValue("inches");
        let weight = getInputValue("weight");
        // 12 inch = 1 feet
        return new Human(name, weight, heightFeet * 12 + heightInches, ["i am a cool human"]);
    })()
};

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
document.getElementById("btn")
    .addEventListener("click", function () {
        const human = getHuman();
        console.log("Dinos ", dinos);
        console.log("Human ", human);
    })

// hoisting
function getInputValue(elementId) {
    return document.getElementById(elementId).value;
}
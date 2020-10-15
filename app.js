function BaseStructure(species, weight, height, facts) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.facts = facts;
    this.image = "images/" + species.toLowerCase() + ".png";
}

    // Create Dino Constructor
BaseStructure.prototype.compareNameAndAddFact = function (name) {
    let fact = "Our names are on equal position";
    if (this.name > name) {
        fact = "My name comes first in dictionary";
    } else if (this.name < name) {
        fact = "Your name comes first";
    }
    this.addFact(fact);
}
BaseStructure.prototype.addFact = function (fact) {
    this.facts.push(fact);
}

function Dino(species, weight, height, facts) {
    BaseStructure.call(this, species, weight, height, facts);
}
Dino.prototype = Object.create(BaseStructure.prototype);
Dino.prototype.constructor = Dino;

function Human(species, weight, height, facts) {
    BaseStructure.call(this, species, weight, height, facts);
}
Human.prototype = Object.create(BaseStructure.prototype);
Human.prototype.constructor = Human;


let dinos = [];

fetch("dino.json")
    .then(response => response.json())
    .then(json => dinos = json.Dinos.map(dino => new Dino(dino.species, dino.weight, dino.height, [dino.fact])));

    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic

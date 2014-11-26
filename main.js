// Libs
var creepTypes = require("creepTypes");
var creepCosts = require("creepCosts");

// Creep Types
var harvester = require('harvester');
var builder   = require("builder");
var guard     = require("guard");

// Process our existing creeps
for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    
    switch(creep.memory.role) {
        case "harvester":
            harvester(creep);
            break;
        case "builder":
            builder(creep);
            break;
        case "guard":
            guard(creep);
            break;
    }
}

// Population control
require("population")();
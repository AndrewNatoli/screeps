var creepTypes  = require("creepTypes");
var creepCosts  = require("creepCosts");
var util        = require("util");

module.exports = function() {
    for(var creepType in creepTypes("list")) {
        
        var typeName = creepTypes("list")[creepType];
        
        // Do we have a free spawner?
        var spawn = util.spawn();
        if(spawn !== undefined) {
            // If we're under attack, prioritize guards
            if(spawn.room.find(Game.HOSTILE_CREEPS).length > 0) {
                // If our forces are outnumbered...
                if(spawn.room.find(Game.HOSTILE_CREEPS).length > util.count("guard")) {
                    // If we can afford a guard, spawn one. Otherwise spawn a harvester.
                    if(spawn.energy > creepCosts.getCost(creepTypes(typeName))) {
                        // Skip this unit if it's not a guard.
                        if(typeName != "guard") {
                            continue;
                        }
                    } 
                    // We can't afford a guard yet.
                    else {
                        // Do we need a harvester?
                        if(util.count("harvester") === 0) {
                            // Skip this unit if it's not a harvester
                            if(typeName != "harvester") {
                                continue;
                            }
                        }
                    }
                }
            }
            
            // Do we not have any of this type?
            if(util.count(typeName) === 0) {
                // Don't add builders if we don't have guards or harvesters OR if there aren't any construction sites...
                if(typeName == "builder" && ((util.count("harvester") === 0 || util.count("guard") === 0) || spawn.room.find(Game.CONSTRUCTION_SITES).length === 0)) {
                    continue;
                }
                // Can we afford this type?
                if(spawn.energy > creepCosts.getCost(creepTypes(typeName))) {
                    var newName = spawn.createCreep(creepTypes(typeName));
                    // Make sure we didn't get an error code then set the role
                    if(typeof(newName) == "string") {
                        Memory.creeps[newName].role = typeName;
                    }
                    return; // Make the creep and move on!
                }
            } 

            // If we already have creeps of this type... 
            else {
                // Let's make a harvester!
                if(typeName == "harvester") {
                    // Make a harvester if we're not under attack and have enough energy
                    if(spawn.room.find(Game.HOSTILE_CREEPS).length < util.count("guard")) {
                        // We need cost to build harvester + half cost of guard
                        if(spawn.energy > ((creepCosts.getCost(creepTypes("guard"))/2) + creepCosts.getCost(creepTypes("harvester")))) {
                            // We should have at least 1/2 the guards as we have harvesters if we have more than 4 harvesters
                            if(util.count("harvester") < 4 || (util.count("harvester") < (util.count("guard")/2))) {
                                var newName = spawn.createCreep(creepTypes("harvester"));
                                Memory.creeps[newName].role = "harvester";
                                return; // Make the creep and move on!
                            }
                        }
                    }
                }

                // Let's make a guard!
                if(typeName == "guard") {
                    // We need cost to build harvester + cost of guard + half guard
                    if(spawn.energy > ((creepCosts.getCost(creepTypes("guard"))*1.5) + creepCosts.getCost(creepTypes("harvester")))) {
                        // Do we have at least two harvesters?
                        if(util.count("harvester") >= 2) {
                            var newName = spawn.createCreep(creepTypes("guard"));
                            Memory.creeps[newName].role = "guard";
                            return; // Make the creep and move on!   
                        }
                    }                   
                }
            }
        }
    }
}
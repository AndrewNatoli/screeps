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
                if(spawn.room.find(Game.HOSTILE_CREEPS).length > spawn.room.find(Game.MY_CREEPS).length) {
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
                // Don't add builders if we don't have guards or harvesters.
                if(typeName == "builder" && (util.count("harvester") == 0 || util.count("guard") == 0)) {
                    continue;
                }
                // Can we afford this type?
                if(spawn.energy > creepCosts.getCost(creepTypes(typeName))) {
                    var newName = spawn.createCreep(creepTypes(typeName));
                    // Make sure we didn't get an error code then set the role
                    if(typeof(newName) == "string") {
                        Memory.creeps[newName].role = typeName;
                    }
                }
            }
        }
    }
}
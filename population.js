var creepTypes  = require("creepTypes");
var creepCosts  = require("creepCosts");
var util        = require("util");

module.exports = function() {
    for(var creepType in creepTypes("list")) {
        
        var typeName = creepTypes("list")[creepType];
        
        // Do we not have any of this type?
        if(util.count(typeName) === 0) {
            // Do we have a free spawner?
            var spawn = util.spawn();
            if(spawn !== undefined) {
                // Can we afford this type?
                if(spawn.energy > creepCosts.getCost(creepTypes(typeName))) {
                    var newName = spawn.createCreep(creepTypes(typeName));
                    // Make sure we didn't get an error code then set the role
                    if(typeof(newName) == "string") {
                        Memory.creeps[newName].role = typeName;
                    }
                }
            } else {
                
            }
        }
    }
}
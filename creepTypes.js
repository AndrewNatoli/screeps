var harvesterParts = [Game.WORK, Game.CARRY, Game.MOVE];
var guardParts 		= [Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE];
var builderParts	= [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE];

module.exports = function(creepType) {
	switch(creepType) {
	    case "list": //List creep types (not parts...)
	        return ["harvester", "guard", "builder"]; // Sloppy as it returns a different object but it'll do for now
	        break;
	        
		case "harvester":
			return harvesterParts;
			break;
		case "guard":
			return guardParts;
			break;
		case "builder":
			return builderParts;
			break;
	}
}
var harvesterParts = [Game.WORK, Game.CARRY, Game.MOVE];
var guardParts 		= [Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE];
var builderParts	= [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE];

module.exports = function(creepType) {
	switch(creepType) {
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
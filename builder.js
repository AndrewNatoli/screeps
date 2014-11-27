/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 
  module.exports = function (creep) {

  	// First, see if we're near an enemy. If we are, run away!
  	var hostiles = creep.pos.findInRange(Game.HOSTILE_CREEPS, 4);
  	if(hostiles.length > 0) {
  		creep.moveTo(Game.spawns.Spawn1);
  		return;
  	}

	if(creep.energy === 0) {
			creep.moveTo(Game.spawns.Spawn1);
			Game.spawns.Spawn1.transferEnergy(creep);
	}
	else {
		var target = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
		if(target !== undefined) {
			creep.moveTo(target);
			creep.build(target);
		}
	}
}
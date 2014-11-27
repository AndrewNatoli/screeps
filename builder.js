/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 
  module.exports = function (creep) {
	if(creep.energy === 0) {
			creep.moveTo(Game.spawns.Spawn1);
			Game.spawns.Spawn1.transferEnergy(creep);
		}
		else {
			var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
			if(target !== undefined) {
				creep.moveTo(target);
				creep.build(target);
			}
		}
}
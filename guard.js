/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */
 
 module.exports = function (creep) {
     var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
     if(target !== null) {
        // Move towards them 
    	creep.moveTo(target);
    	
    	// Ranged Attack
    	if(creep.getActiveBodyparts(Game.RANGED_ATTACK) > 0) {
    	    creep.rangedAttack(target);
    	} 
    	
    	// Attack
    	if(creep.getActiveBodyparts(Game.ATTACK) > 0) {
    	    creep.attack(target);
    	}
     }
}
/*
 * Calculate the energy cost of producing a creep
 *
 * MOVE = 50
 * WORK = 20
 * CARRY = 50
 * ATTACK = 100
 * TOUGH = 5
 */
var creepTypes = require('creepTypes');

exports.getCost = function(parts){
    var sum = 0;
    var costs = {};
    costs[Game.MOVE] = 50; 
    costs[Game.WORK] = 20; 
    costs[Game.CARRY] = 50;
    costs[Game.ATTACK] = 100;
    costs[Game.RANGED_ATTACK] = 150;
    costs[Game.HEAL] = 200;
    costs[Game.TOUGH] = 5;
    if(parts.length){
        for (var i in parts) {
            sum += costs[parts[i]];
        }
    }
    return sum;
}

exports.harvester = function(){
    return this.getCost(creepTypes("harvester"));
};
exports.guard = function(){
    return this.getCost(creepTypes("guard"));
};
exports.builder = function(){
    return this.getCost(creepTypes("builder"));
};
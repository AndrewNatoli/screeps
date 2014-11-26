/*
 * Original version by Dakror: https://github.com/Dakror/Screeps/blob/master/util.js
 */
var _ = require("lodash");

module.exports = {
    decide: function(creep, opt1, opt2) {
        if (opt1 && !opt2) return opt1;
        else if (!opt1 && opt2) return opt2;
        else if (opt1 && opt2) {

            var opt1Dst = this.distance(creep, opt1);
            var opt2Dst = this.distance(creep, opt2);

            return opt1Dst < opt2Dst ? opt1 : opt2;
        }
    },
    distance: function(creep, obj) {
        return creep.room.findPath(creep.pos, obj.pos).length;
    },
    creeps: function(role) {
        return _.filter(Game.creeps, function(creep) {
            return creep.memory.role == role;
        });
    },
    count: function(role) {
        return this.creeps(role).length;
    },
    spawn: function() {
        var spawns = _.filter(Game.spawns, function(spawn) {
            return !spawn.spawning;
        });

        if (!spawns) return null;
        else return spawns[0];
    },
    contains: function(haystack, needle) {
        return haystack.indexOf(needle) >= 0;
    }
};
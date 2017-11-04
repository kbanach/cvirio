// load Phaser to browserify, following: https://github.com/photonstorm/phaser#browserify--cjs
window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

console.log('Phaser version: ', Phaser.VERSION);

require('./game');
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// We use window.game because we want it to be accessible from everywhere
window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

game.globals = {
    // Add variables here that you want to access globally
    // score: 0 could be accessed as game.globals.score for example
};


game.state.add('play', require('./states/play.js'));
game.state.add('load', require('./states/load.js'));
game.state.add('menu', require('./states/menu.js'));
game.state.add('boot', require('./states/boot.js'));

game.state.start('boot');

},{"./states/boot.js":3,"./states/load.js":4,"./states/menu.js":5,"./states/play.js":6}],2:[function(require,module,exports){
require('./game');

},{"./game":1}],3:[function(require,module,exports){
module.exports = {
    init: function () {
        // Add here your scaling options
    },

    preload: function () {
        // Load just the essential files for the loading screen,
        // they will be used in the Load State
        game.load.image('loading', 'assets/loading.png');
        game.load.image('load_progress_bar', 'assets/progress_bar_bg.png');
        game.load.image('load_progress_bar_dark', 'assets/progress_bar_fg.png');
    },

    create: function () {
        game.state.start('load');
    },
};

},{}],4:[function(require,module,exports){
module.exports = {
    loadingLabel: function () {
        // Here we add a label to let the user know we are loading everything
        // This is the "Loading" phrase in pixel art
        // You can just as easily change it for your own art :)
        this.loading = game.add.sprite(game.world.centerX, game.world.centerY - 20, 'loading');
        this.loading.anchor.setTo(0.5, 0.5);

        // tutorial assets
        game.load.image('sky', 'assets/sky.png');
        game.load.image('sky_alt', 'assets/sky_alt.png');
        game.load.image('box', 'assets/box.png');
        game.load.image('paper', 'assets/old_paper.png');

        // This is the bright blue bar that is hidden by the dark bar
        this.barBg = game.add.sprite(game.world.centerX, game.world.centerY + 40, 'load_progress_bar');
        this.barBg.anchor.setTo(0.5, 0.5);

        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('dude_alt', 'assets/dude_alt.png', 32, 48);
        game.load.spritesheet('lightSwtich', 'assets/switch.png', 34, 52);

        // This bar will get cropped by the setPreloadSprite function as the game loads!
        this.bar = game.add.sprite(game.world.centerX - 192, game.world.centerY + 40, 'load_progress_bar_dark');
        this.bar.anchor.setTo(0, 0.5);
        game.load.setPreloadSprite(this.bar);
    },

    preload: function () {
        this.loadingLabel();
        // Add here all the assets that you need to game.load
    },

    create: function () {
        game.state.start('menu');
    },
};

},{}],5:[function(require,module,exports){
module.exports = {
    create: function () {
        // we don't create anything here
        game.state.start('play');
    },
};

},{}],6:[function(require,module,exports){
var sky;
var lightSwtich;
var player;
var box;
var paper;
var cursors;
var lastSwitchHitTime = 0;
var alternativeTextures = false;

var TEXTURES = {
    player: {
        basic: 'dude',
        alt: 'dude_alt',
        idleFrame: 4,
    },
    sky: {
        basic: 'sky',
        alt: 'sky_alt',
    },
};

module.exports = {
    create: function () {
        cursors = game.input.keyboard.createCursorKeys();

        // start physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // add static stuff
        sky = game.add.sprite(0, 0, TEXTURES.sky.basic);
        lightSwtich = game.add.sprite(667, 434, 'lightSwtich');
        game.physics.arcade.enable(lightSwtich);
        lightSwtich.body.immovable = true;

        // add the box that "hides" the CV, so by default it suppose to be visible
        box = game.add.sprite(190, 44, 'box');
        box.visible = true;

        // add CV paper, which by default should be invisible
        paper = game.add.sprite(263, 56, 'paper');
        paper.visible = !box.visible;

        // add and configure player
        player = game.add.sprite(32, game.world.height - 150, TEXTURES.player.basic);
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 900;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    },

    update: function () {
        var currentTime = game.time.totalElapsedSeconds();
        var hitSwitch = game.physics.arcade.collide(player, lightSwtich);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -300;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 300;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = TEXTURES.player.idleFrame;
        }

        if (cursors.up.isDown && player.body.blocked.down) {
            player.body.velocity.y = -550;
        }

        if (hitSwitch) {
            if (currentTime - lastSwitchHitTime > 1) {
                lastSwitchHitTime = currentTime;
                this.switchWorlds();
            }
        }
    },

    switchWorlds: function () {
        if (alternativeTextures) { // current world: BASIC, switching to ALT
            alternativeTextures = false;

            sky.loadTexture(TEXTURES.sky.alt);
            player.loadTexture(TEXTURES.player.alt, TEXTURES.player.idleFrame);
            lightSwtich.frame = 1;

            box.visible = false;
        } else { // current world: ALT, switching back to BASIC
            alternativeTextures = true;

            sky.loadTexture(TEXTURES.sky.basic);
            player.loadTexture(TEXTURES.player.basic, TEXTURES.player.idleFrame);
            lightSwtich.frame = 0;

            box.visible = true;
        }

        paper.visible = !box.visible;
    },
};

},{}]},{},[1,2,3,4,5,6]);

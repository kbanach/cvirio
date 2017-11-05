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

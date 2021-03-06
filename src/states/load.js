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

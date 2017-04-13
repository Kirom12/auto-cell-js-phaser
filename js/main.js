
var gameData = {
	width : 1200,
	height : 800
}

var game = new Phaser.Game(gameData.width, gameData.height, Phaser.AUTO, 'game');

game.state.add('play', PlayState);
game.state.start('play');
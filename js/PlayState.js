var PlayState = {
	cellsData : null,
	cellsSprites : null,
	player : null,
	cursor : null,

	playerData : {
		speed : 100
	},

	preload: function() {
		game.load.image('wall', 'assets/img/wall.png');
		game.load.spritesheet('character', 'assets/img/character-link-2.png', 32, 48);
	},

	create: function() {
		//Get random map array
		this.cellsData = MapGeneration.init(gameData.width, gameData.height);

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.cellsSprites = game.add.group();

	    this.cellsSprites.enableBody = true;
    	this.cellsSprites.physicsBodyType = Phaser.Physics.ARCADE;

		let wallSprite;

		for (let y in this.cellsData) {
			for (let x in this.cellsData[y]) {

				if (this.cellsData[y][x]) {
					wallSprite = this.cellsSprites.create(y*20, x*20, 'wall')
					wallSprite.scale.setTo(0.15);
					wallSprite.body.immovable = true;
				}
			}
		}

		this.player = game.add.sprite(10, 10, 'character');
		this.player.scale.setTo(0.6);


		
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		//Set hitbox
		this.player.body.setSize(28, 28, 2, 18);
		
		//Set animations
		this.player.animations.add('up', [12, 13, 14 ,15], 10, true);
		this.player.animations.add('down', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [8, 9 , 10, 11], 10, true);
		this.player.animations.add('left', [4, 5, 6, 7], 10, true);
		this.player.animations.add('idle', [0], 10, true);

		this.cursors = game.input.keyboard.createCursorKeys();
	},

	update: function() {
		//console.log("update");

		//Collisions
		game.physics.arcade.collide(this.player, this.cellsSprites, this.collideWall, null, this);

		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (this.cursors.up.isDown) {
			this.player.body.velocity.y = -this.playerData.speed;
			this.player.animations.play('up');
		} else if (this.cursors.down.isDown) {
			this.player.body.velocity.y = this.playerData.speed;
			this.player.animations.play('down');
		} else if (this.cursors.right.isDown) {
			this.player.body.velocity.x = this.playerData.speed;
			this.player.animations.play('right');
		} else if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -this.playerData.speed;
			this.player.animations.play('left');
		} else {
			this.player.animations.play('idle');
		}
	},

	render: function() {
		//game.debug.body(this.player);
	},

	collideWall: function() {
		
	}
}
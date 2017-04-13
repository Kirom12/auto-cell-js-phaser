var PlayState = {
	cellsData : null,
	player : null,
	cursor : null,

	cellsSprites : null,
	ennemies : null,

	ennemiesData : {
		number : 1
	},

	playerData : {
		speed : 100
	},

	ennemyData : {
		speed : 100,
		angleMod : 0.5
	},

	preload: function() {
		game.load.image('wall', 'assets/img/wall.png');
		game.load.spritesheet('character', 'assets/img/character-link-2.png', 32, 48);
		game.load.spritesheet('slime', 'assets/img/slime-sprite.png', 32, 32);
	},

	create: function() {
		let wallSprite, ennemy;

		//Get random map array
		this.cellsData = MapGeneration.init(gameData.width, gameData.height);

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.cellsSprites = game.add.group();
		this.ennemies = game.add.group();
		this.cellsSprites.enableBody = true;
		this.cellsSprites.physicsBodyType = Phaser.Physics.ARCADE;
		this.ennemies.enableBody = true;
		this.ennemies.physicsBodyType = Phaser.Physics.ARCADE;

		//Set spawn zone
		for (let i = Math.round(this.cellsData[1].length/2)-1; i <= Math.round(this.cellsData[1].length/2)+1; i++) {
			this.cellsData[1][i] = 0;
			this.cellsData[2][i] = 0;
			this.cellsData[3][i] = 0;
		}

		for (let y in this.cellsData) {
			for (let x in this.cellsData[y]) {
				if (this.cellsData[y][x]) {
					wallSprite = this.cellsSprites.create(y*20, x*20, 'wall')
					wallSprite.scale.setTo(0.15);
					wallSprite.body.immovable = true;
				}
			}
		}

		this.player = game.add.sprite(600, game.world.height/2, 'character');
		this.player.scale.setTo(0.6);
		
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		//Set hitbox
		this.player.body.setSize(28, 28, 2, 18);

		this.player.body.collideWorldBounds = true;
		
		//Set animations
		this.player.animations.add('up', [12, 13, 14 ,15], 10, true);
		this.player.animations.add('down', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [8, 9 , 10, 11], 10, true);
		this.player.animations.add('left', [4, 5, 6, 7], 10, true);
		this.player.animations.add('idle', [0], 10, true);

		//Set enemies
		for (let i = 0; i < this.ennemiesData.number; i++) {
			ennemy = this.ennemies.create(Math.round(Math.random() * Math.round(gameData.width/20))*20-6, Math.round(Math.random() * (gameData.height/20))*20-8, 'slime');
			ennemy.body.setSize(16, 14, 8, 12);
			ennemy.animations.add('up', [6, 7, 8, 9, 10, 11], 10, true);
			ennemy.animations.add('down', [0, 1, 2, 3, 4, 5], 10, true);
			ennemy.animations.add('right', [18, 19, 20, 21, 22, 23], 10, true);
			ennemy.animations.add('left', [12, 13, 14, 15, 16, 17], 10, true);
			ennemy.animations.add('idle', [0], 10, true);
		}

		this.cursors = game.input.keyboard.createCursorKeys();
	},

	update: function() {
		//console.log("update");

		//Collisions
		game.physics.arcade.collide(this.player, this.cellsSprites);
		game.physics.arcade.collide(this.enemies, this.cellsSprites);

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

		let angle = game.physics.arcade.angleBetween(this.ennemies.children[0], this.player);

		this.ennemies.children[0].body.velocity.x = 0;
		this.ennemies.children[0].body.velocity.y = 0;

		if (angle < (1.5-this.ennemyData.angleMod) && angle > -(1.5-this.ennemyData.angleMod)) {
			this.ennemies.children[0].body.velocity.x = 100;
		} else if (angle > 0 && angle < 3) {
			this.ennemies.children[0].body.velocity.y = 100;
		} else if (angle < 0 && angle > -3) {
			this.ennemies.children[0].body.velocity.y = -100;
		}

		console.log(angle);
	},

	render: function() {
		// game.debug.body(this.player);


		// for (let i in this.ennemies.children) {
		// 	game.debug.body(this.ennemies.children[i]);
		// }
	},

	collideWallEnnemies: function(ennemy, wall) {
		ennemy.kill();
	}
}
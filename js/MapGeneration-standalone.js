
var MapGeneration = {
	cellsData : [],
	cellsDataNew : [],
	cellsHeight : 20,
	cellsWidth : 20,
	canvas : {
		width : 1200,
		height : 800
	},
	cellsNbX : undefined,
	cellsNbY : undefined,
	wallRate : 0.54,
	iteration : 10,

	canvas : document.querySelector('canvas'),

	init: function() {
		this.cellsNbX = this.canvas.width/this.cellsWidth;
		this.cellsNbY = this.canvas.height/this.cellsHeight;

		this.generateCells();
		this.displayCells();

		this.iteration--;
		setTimeout(this.smoothCells.bind(this), 500);
	},

	generateCells: function() {
		for (let i = 0; i < this.cellsNbX; i++) {
			this.cellsData[i] = [];
			this.cellsDataNew[i] = [];
			for (let j = 0; j < this.cellsNbY; j++) {
				this.cellsData[i][j] = Math.random() < this.wallRate ? 1 : 0;
			}
		}
	},

	displayCells: function() {
		let context = this.canvas.getContext('2d');

		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let i = 0; i < this.cellsNbX; i++) {
			for (let j = 0; j < this.cellsNbY; j++) {
				//If 1 -> fill
				if (this.cellsData[i][j] == 1) {
					context.fillStyle = '#333';
					context.fillRect(i*this.cellsWidth, j*this.cellsHeight, this.cellsWidth, this.cellsHeight);
				}
			}
		}
	},

	smoothCells: function() {
		let contactCells = 0;

		for (let y = 1; y < this.cellsData.length-1; y++) {
			for (let x = 1; x < this.cellsData[y].length-1; x++) {
				for (let i = -1; i < 2; i++) {
					for (let j = -1; j < 2; j++) {
						if (this.cellsData[y+i][x+j]) {
							if (!(i == 0 && j == 0)) {
								contactCells++;	
							}
						}
					}
				}

				this.cellsDataNew[y][x] = this.cellsData[y][x];

				if (contactCells > 5) {
					//this.cellsData[y][x] = 1;
					this.cellsDataNew[y][x] = 1;
				} else if (contactCells < 3) {
					//this.cellsData[y][x] = 0;
					this.cellsDataNew[y][x] = 0;
				}

				contactCells = 0;
				
			}
		}

		this.cellsData = this.cloneArray(this.cellsDataNew);

		this.displayCells();

		//Recursive
		if (this.iteration > 0) {
			this.iteration--;
			setTimeout(this.smoothCells.bind(this), 500);
		}
	},

	cloneArray: function(array) {
		let newArray = [];

		for (let i in array) {
			newArray[i] = [];
			newArray[i] = array[i].slice();
		}

		return newArray;
	}
}
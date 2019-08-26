const memory_game = {
    game__board: null,
    game__score: null,
    images: ['car', 'landscape', 'react', 'banana', 'windows', 'apple'],
    count: 12,
    tiles: [],
    tilesChecked: [],
    canClick: true,
    pairs: 0,
    moves: 0,

    tileClick(event) {
        if (this.canClick) {
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== event.target.dataset.index)) {
                this.tilesChecked.push(event.target);
                event.target.classList.add(this.images[event.target.dataset.cardType]);
            }
            if (this.tilesChecked.length == 2) {
                this.canClick = false;
                this.moves += 1;
                this.game__score.innerText = 'Moves: ' + this.moves;

                if (this.tilesChecked[0].dataset.cardType == this.tilesChecked[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 800);
                } else {
                    this.tilesChecked.forEach(element => {
                        element.classList.add('red__border');
                    });
                    setTimeout(this.resetTiles.bind(this), 800);
                }
            }
        }
    },

    deleteTiles() {
        this.canClick = true;
        this.tilesChecked.forEach(element => {
            element.classList.add('green__border');
        });
        this.tilesChecked = [];
        this.pairs += 1;
        if (this.pairs == this.count / 2) {
            this.game__board.innerText = '';

            let congratulations__div = document.createElement('div');
            congratulations__div.className = 'congratulations__div';
            congratulations__div.innerText = 'Game Over, Congratulations! You did it in: ' + this.moves + ' moves'
            this.game__board.appendChild(congratulations__div);

            let reset__btn = document.createElement('div');
            reset__btn.className = 'reset__btn';
            reset__btn.innerText = 'Restart game'
            this.game__board.appendChild(reset__btn);
            document.querySelector('.reset__btn').addEventListener('click', a => {
                location.reload();
            })
        }
    },

    resetTiles() {
        this.tilesChecked[0].className = 'main__item';
        this.tilesChecked[1].className = 'main__item';

        this.tilesChecked = [];
        this.canClick = true;
    },

    start() {
        this.game__board = document.querySelector('.main');
        this.game__score = document.querySelector('.score');

        this.tiles = [];
        this.tilesChecked = [];
        this.canClick = true;
        this.pairs = 0;

        for (let i = 0; i < this.count; i++) {
            this.tiles.push(Math.floor(i / 2));
        }

        for (let i = this.count - 1; i > 0; i--) {
            let swap = Math.floor(Math.random() * i);
            let temp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = temp;
        }

        for (let i = 0; i < this.count; i++) {
            let tile = document.createElement('div');
            tile.className = 'main__item';
            this.game__board.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.addEventListener('click', this.tileClick.bind(this));
        }
    }
}
memory_game.start();
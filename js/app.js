// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = row*83;
    this.speed = Math.round((Math.random() + 1)*100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 704) {
        this.x += this.speed*dt;
    }
    else{
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// collision detection (when enemy and character occupy the same space, the character should die)
Enemy.prototype.checkCollisions = function() {
        if(this.y === player.y) {
            if(this.x > player.x && this.x - player.x < 202) {
                player.y = 415;
                player.life -= 1;
            }
        }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 415;
    this.mox = 0;
    this.moy = 0;
    this.life = 3;
    this.arrive = 0;
};

Player.prototype.update = function() {
     this.x += this.mox;
     this.y += this.moy;
     if(this.y === 0) {
        this.arrive += 1;
        this.y = 415;
     }
     this.mox = 0;
     this.moy = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0) {
        this.mox = -101;
    }
    else if(key === 'up' && this.y > 0) {
        this.moy = -83;
    }
    else if(key === 'right' && this.x < 404) {
        this.mox = 101;
    }
    else if(key === 'down' && this.y < 415) {
        this.moy = 83;
    }
    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var rowEnemy = [1, 2, 3];
rowEnemy.forEach(function(row) {
    var enemy = new Enemy(row);
    allEnemies.push(enemy);
})

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

$(document).ready(function(){

    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d")
    var gridNum = 20;
    var gridSize = canvas.width / gridNum;

    // Snake Body
    // 2D Array = Array of arrays
    var snakeBody = [[7,7]];

    // Food Object
    var food = {
        x: 0,
        y: 0,
        alive: false
    };

    // Player Object
    var player = {
        x: 7,
        y: 7,
        alive: true,
        // Directions
        // Right: 0, Left: 1, Down: 3, Up: 4, Stopped: 5
        direction: 5,
        tail: 1
    }

    // Key Setup
    var keyPressed = null;

    var upKey = 38;
    var downKey = 40; 
    var leftKey = 37;
    var rightKey = 39;
    
    var w = 87;
    var a = 65;
    var s = 83;
    var d = 68;

    // Array
    Array.prototype.insert = function (index, item){
        this.splice(index, 0, item);
    }

    function update(){
        // Snake Movement
        if (keyPressed){
            if ((keyPressed == rightKey || keyPressed == d) && player.direction != 1){
                player.direction = 0;
            }
            if ((keyPressed == leftKey || keyPressed == a) && player.direction != 0){
                player.direction = 1;
            }
            if ((keyPressed == downKey || keyPressed == s) && player.direction != 4){
                player.direction = 3;
            }
            if ((keyPressed == upKey || keyPressed == w) && player.direction != 3){
                player.direction = 4;
            }
        }

        // Spawn Food
        if (!food.alive){
            food.x = Math.floor(Math.random() * gridNum);
            food.y = Math.floor(Math.random() * gridNum);

            var collided;

            do {
                collided = false;

                for (var i = 0; i < player.tail; ++i){
                    if ((food.x == snakeBody[i][0]) && food.y == snakeBody[i][1]) {
                        collided = true;
                        
                        food.x = Math.floor(Math.random() * gridNum);
                        food.y = Math.floor(Math.random() * gridNum);

                        break;
                    }
                }
            }

            while (collided)

            food.alive = true;
        }

        // Increase Snake Length
        if (player.x == food.x && player.y == food.y){
            food.alive = false;
            player.tail++;
        }

        // Snake Touching Itself
        if (player.tail > 1){
            for (var i = 0; i < player.tail; ++i){
                if (player.x == snakeBody[i][0] && player.y == snakeBody[i][1]){
                    player.alive = false;
                    clearInterval(updates);
                }
            }
        }

        // Snake Touching Borders
        if (player.x >= gridNum || player.x < 0 || player.y >= gridNum || player.y < 0){
            player.alive = false;
            clearInterval(updates);
        }

        // Moving the Snake
        snakeBody.insert(0, [player.x, player.y])

        while (snakeBody.length > player.tail + 1){
            snakeBody.pop();
        }

        // Handle Player Directions
        switch (player.direction){
            case 0:
                player.x += 1;
                break;
            
            case 1:
                player.x -= 1;
                break;

            case 3:
                player.y += 1;
                break;

            case 4:
                player.y -= 1;
                break;
        }

        // Game Runs While the Player is Alive
        if (player.alive){
            draw();
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the Food
        context.fillStyle = "red";
        context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        // Draw the Snake
        for (var i = 0; i < player.tail; ++i){
            if (i == 0){
                context.fillStyle = "blue";
            }

            else{
                context.fillStyle = "green";
            }

            context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize);
        }
    }

    // Starting the Game
    update();

    var updates = setInterval(update, 100);
    $(window).on("keydown", function(event){
        keyPressed = event.which;
    });

});
$(document).ready(function () {
    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d");

    // Game Constants

    const HEIGHT = canvas.height;
    const WIDTH = canvas.width;
    const upKey = 38;
    const downKey = 40;
    const PI = Math.PI

    // Game Variables

    var gameOver;
    var keyPressed = null;
    var player = {
        x: null,
        y: null,
        width: 20,
        height: 100,
        update: function () {
            if (keyPressed == upKey) {
                this.y -= 4;
            }
            if (keyPressed == downKey) {
                this.y += 4;
            }
        },

        draw: function () {
            context.fillRect(this.x, this.y, this.width, this.height);
        },
    };

    var ai = {
        x: null,
        y: null,
        width: 20,
        height: 100,
        update: function () {
            let target = ball.y - (this.height - ball.size) / 2;
            this.y += (target - this.y) * 0.1;
        },
        draw: function () {
            context.fillRect(this.x, this.y, this.width, this.height);
        },
    };

    var ball = {
        x: null,
        y: null,
        size: 20,
        speedX: null,
        speedY: null,
        speed: 5, // Original = 10

        update: function(){
            this.x += this.speedX;
            this.y += this.speedY;
            
            // If the ball bounces of the vertical boundaries, deal with it
            if (this.y + this.size >=HEIGHT || this.y < 0){
                this.speedY *= -1;
            }
            function checkCollision(a, b){
                return(
                    a.x < b.x + b.width && a.y < b.y + b.height && b.x < a.x + a.size && b.y < a.y + a.size
                );
            }

            // Determinate the collision target of the ball using its direction of travel
            let other;

            if(ball.speedX < 0){
                other = player;
            }
            else{
                other = ai;
            }

            let collided = checkCollision(ball, other);
            
            // Modify the ball's moving direction
            if (collided) {
                let n = (this.y + this.size - other.y) / (other.height + this.size);
                let phi = 0.25 * PI * (2 * n - 1);

                this.speedX = this.speed * Math.cos(phi);
                this.speedY = this.speed * Math.sin(phi)

                if (other == ai){
                    this.speedX *= -1;
                }
            }

            if (this.x + this.size < 0 || this.x > WIDTH){
                gameOver = true;
                $("button").fadeIn();

                if (this.size + this.x < 0){
                    $("h1").html("You lose, YOU LOSE! Hahahaha you're so bad at this game, you shouldn't play it again.")
                }
                else{
                    $("h1").html("You win, YOU WIN! I truly praise you for winning this game against an AI, you are truly something.")
                }

            }
        },

        draw: function(){
            context.fillRect(this.x, this.y, this.size, this.size);
        }

    };

    function main(){
        init();

        var loop = function (){
            update();
            draw();
            window.requestAnimationFrame(loop, canvas);
        }

        window.requestAnimationFrame(loop, canvas);

    }

    function init(){
        gameOver = false;
        $("h1").html("Pong");

        player.x = 20;
        player.y = (HEIGHT - player.height) / 2

        ai.x = (WIDTH - ai.width - 20);
        ai.y = (HEIGHT - ai.height) / 2;

        ball.x = (WIDTH - ball.size) / 2;
        ball.y = (HEIGHT - ball.size) / 2;

        // Serve the ball
        ball.speedX = ball.speed;

        // Distribute ball in random direction
        if (Math.round(Math.random)) {
            ball.speedX *= -1
        }

        ball.speedY = 0;
    }

    function update(){
        if (!gameOver){
            ball.update();
            player.update();
            ai.update();
        }
    }

    function draw(){
        context.fillRect(0, 0, WIDTH, HEIGHT);
        context.save();
        context.fillStyle = "white";
        
        ball.draw();
        player.draw();
        ai.draw();

        let w = 4;
        let x = (WIDTH - w) / 2
        let y = 0;
        let step = HEIGHT / 15;

        while (y < HEIGHT){
            context.fillRect(x, y + step * 0.25, w, step * 0.5);
            y += step;
        }

        context.restore();
    }

    $(document).on("keyup", function(){
        keyPressed = null;
    });

    $(document).on("keydown", function(event){
        keyPressed = event.which;
    });
    
    $("button").on("click", function(){
        $(this).hide();
        init();
    });

    // Call the main function
    main();
});
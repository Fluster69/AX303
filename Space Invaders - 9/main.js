$(document).ready(function(){
  var screen, invaders_image, gameOver = false, win = false;
  var frames, levelFrame, motion;
  var alienSprite, tankSprite, citySprite;
  var aliens, tank, cities, bullets;
  var alien_direction, keyPressed = [];

  function main(){
    let loop = function(){
      update();
      draw();

      if(!gameOver){
        window.requestAnimationFrame(loop. screen.canvas);
      }
      else{
        gameOver(screen, win);
      }
    };
  }

  function init(){
    if(screen == null){
      screen = new Screen(504,600);
    }

    gameOver = false;
    win = false;
    frames = 0;
    motion = 0;
    levelFrame = 60;
    alien_direction = 1;
    invaders_image = new Image();
    invaders_image_src = "./assets/invaders.png";

    $(invaders_image).on("load", function(){
      alienSprite = [
        [new Sprite(this, 0, 0, 22, 16),new Sprite(this, 0, 16, 22, 16)],
        [new Sprite(this, 22, 0, 16, 16),new Sprite(this, 22, 16, 16, 16)],
        [new Sprite(this, 38, 0, 24, 16),new Sprite(38, 16, 24, 16)]
      ];
      tankSprite = new Sprite(this, 62, 0, 22, 16);
      citySprite = new Sprite(this, 84, 8, 36, 24);
    });
    tank = {
      sprite: tankSprite, 
      x: (screen.width - tankSprite.width) / 2,
      y: screen.height - (30 + tankSprite.height),
      width: tankSprite.width,
      height: tankSprite.height
    };
    cities = new City(tank, citySprite);
    cities.init();

    bullets = [];
    aliens = [];
    
    let rows = [1, 0, 0, 2, 2];

    for(let i = 0; i < rows.length; ++i){
      for(let j = 0; j < 10; ++j){
        let alienType = rows[i];

        aliens.push({
          sprite: alienSprite[alienType],
          x: 30 + j * 30 + [0, 4, 0][alienType],
          y: 30 + i * 30, 
          width: alienSprite[alienType][0].width,
          height: alienSprite[alienType][0].height
        });
      }
    }
    main();
  }

  function update(){
    if(keyPressed.indexOf(37) != -1){
      tank.x -= 4;
    }
    if(keyPressed.indexOf(39) != -1){
      tank.x += 4;
    }
  }

  function draw(){
    screen.clear();

    for (let i = 0; i < aliens.length; ++i){
      let alien = aliens[i]
      screen.drawSprite(alien.sprite[motion], alien.x, alien.y);
    }

    screen.ctx.save();
    for (let i = 0; i < bullets.length; ++i){
      screen.drawBullet(bullets[i]);
    }
    screen.ctx.restore();
    screen.ctx.drawImage(cities.canvas, 0, cities.y);
    screen.drawSprite(tank.sprite, tank.x, tank.y);
  }

  $(window).on("keydown", function(event){
    let key = event.which;
    if (keyPressed.indexOf(key) == -1){
      keyPressed.push(key);
      if (key == 32){
        bullets.push(new Bullet(tank.x + 10, tank.y, -8, 2, 6, "#ffffff"));
      }
    }
  });

  $(window).on("keyup", function(event){
    let key = event.which;
    let index = keyPressed.indexOf(key);
    if (index != -1){
      keyPressed.splice(index, 1);
    }
  });

  $("#retry").on("click", function(){
    init();
    $(this).hide();
  });
  init();
});
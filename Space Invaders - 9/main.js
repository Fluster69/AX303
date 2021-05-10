$(document).ready(function(){
  /*
  ***************
  *  Variables  *
  ***************
  Here are the global variables we'll use in our game.
  */

  // Variable for overall set up
  var screen, invaders_image, gameOver = false, win = false;

  // Variables for frames to control screen's updates
  var frames, levelFrame, motion;

  // Variables for the sprites
  var alienSprite, tankSprite, citySprite;

  // Variables for storing the game objects
  var aliens, tank, cities, bullets;

  // Variable for game control
  var alien_direction, keyPressed = [];

  /*
  ****************************
  *  Main Function - main()  *
  ****************************
  The main() function is the main entry point to run our game.
  */

  function main(){
    // Repeatedly loop and update the game & draw the result on the screen
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

  /*

  **************************************
  *  Initialization Function - init()  *
  **************************************
  init() function helps us initialize and start off our game 
  by preparing the sprites we need and put them in the right positions.
  Once the sprite is loaded, we can the main() function to start the main loop!
  */

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

    // On image load, split the spritesheet into different sprites we want
    $(invaders_image).on("load", function(){
      alienSprite = [
        [new Sprite(),new Sprite()],
        [new Sprite(),new Sprite()],
        [new Sprite(),new Sprite()]
      ];
    });
  }


  /*
  ********************************
  *  Update Function - update()  *
  ********************************
  update() function helps you update the positions and check for events (collisions, bullet shots).
  */

  function update(){

    // Moving the tank
    

    // Restricting the tank's position to within the screen
    

    // Loop through bullets array to move each bullet
    for(let i = 0; /* condition */; /* update */){
      let bullet = bullets[i];
      

      // Check if the bullet goes out of screen (either from top or bottom)
      

      
      // Check if the bullet hits the cities (bullets from aliens & player)
      let h2 = bullet.height / 2;
      
      

      // Check if the bullet hits the aliens (bullets from player)
      for(let j = 0; /* condition */; /* update */){
        let alien = aliens[j];
        
      }

      // Check if the bullet hits the tank
      
    }

    // Aliens randomly shoot bullets by chance
    

    // Update the frame
    

    // Check if the frames number reach the level's frame requirement for movement

    if(/* Replace this line with the correct condition */){
      // Switch "motion" variable between 0 & 1.


      // Move the aliens
      

      // If aliens reach the edge of screen, switch their direction and move forward for one row
      

      // If the aliens reaches the cities, game over!
      
    }
  }

  /*
  ****************************
  *  Draw Function - draw()  *
  ****************************
  draw() function helps you display the game onto the screen.
  */

  function draw(){
    // Clear the screen
    

    // Draw aliens
    

    // Draw bullets
    

    // Draw cities - cannot use drawSprite since city has its own canvas; use drawImage instead.
    

    // Draw tank - use drawSprite
    
  }

  /*
  *************************************
  *  Handling User's Inputs & Clicks  *
  *************************************
  This handles the user's inputs / clicks for controlling the game. 
  */

  // Adding key to the keyPressed array when a key is pressed
  

  // Removing key from the keyPressed array when a key is released
  

  // When retry button is click, restart the game.
  

  /*
  **************************************************
  *  Run the init function to kick start the game  *
  **************************************************
  This will run the init() function to load the resources, and eventually start the main loop.
  */

  init();
});
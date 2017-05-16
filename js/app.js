//silli games for funn moments
//spike powerupps
//air resistance vertical and horizontal

var game = new Phaser.Game(800, 450, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
/*



*/
function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.spritesheet('dude', 'assets/pink-bear.png', 32, 32);
  game.load.spritesheet('dude2', 'assets/green-bear.png', 32, 32);

  game.load.image('spikes', 'assets/spikes.png');
  game.load.image('acid', 'assets/acid.png');
  game.load.image('cushion', 'assets/cushion.png');
}
var player;
var player2;
var players;
var cursors;
var platforms;
var keyW;
var keyA;
var keyS;
var keyS;
var playerUp = 80;
var playerDown = 300;
var playerLeft = -300;
var playerRight = 300;
//var acid;
var acid_group;
var spike_group;
var deadly_group;
var death_count = 0;
var pink_bear_alive = true;
var green_bear_alive = true;

function create(){

  //scaling options 
  //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  //have the game centered horizontally 
  this.scale.pageAlignHorizontally = true; 
  this.scale.pageAlignVertically = true;
  //screen size will be set automatically 
  this.scale.setScreenSize(true);
  
  
  // physice
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // background image
  game.add.sprite(0, 0, 'sky');

  
  // the platforms group
  platforms = game.add.group();
  // give objects physics
  platforms.enableBody = true;


  //deadly group
  deadly_group = game.add.group();
  deadly_group.enableBody = true;
  
  
  //spikes
  //spike_group = game.add.group(); 
  //spike_group.enableBody = true;
  for (i = -100; i < 100; i++) {
    var spike = deadly_group.create(i*32, 0, 'spikes');
    
    
  }
  //acid
  //set up drops group
  //acid_group = game.add.group();
  //acid_group.enableBody = true;
  
  for (i = -100; i < 100; i++) {
    var acid = deadly_group.create(i*32, game.world.height*0.95, 'acid');
  }
  
  //cushion
  for (i = 0; i < 4; i++) {
    var cushion = platforms.create(((game.world.width*0.5)+i*32)-64, game.world.height*0.93, 'cushion');
    cushion.body.immovable = true;
    
  }
  
  
  players=game.add.group()

  player = game.add.sprite((game.world.width*0.55-16), 80, 'dude');
  player2 = game.add.sprite((game.world.width*0.45-16), 80, 'dude2');
  players.add(player2);
  players.add(player);
  
  game.physics.arcade.enable(players);
  player.body.bounce.y = player2.body.bounce.y = 1;
  player.body.bounce.x = player2.body.bounce.x = 0.5;
  player.body.gravity.y= player2.body.gravity.y = 350;

  
  //players.body.gravity.y = 350;
  
  
  //creating cursor instance
  cursors = game.input.keyboard.createCursorKeys();

  
  //our animations
  player.animations.add('left', [0,1], 10, true);
  player.animations.add('right', [2,3], 10, true);
  player.animations.add('down', [4,5], 10, true);
  player.animations.add('up', [6], 10, true);
  player.animations.add('dead', [8], 10, true);
  
  
  player2.animations.add('left', [0,1], 10, true);
  player2.animations.add('right', [2,3], 10, true);
  player2.animations.add('down', [4,5], 10, true);
  player2.animations.add('up', [6], 10, true);
  player2.animations.add('dead', [8], 10, true);
  
  //mouse button
  game.input.onDown.add(gofull, this);
  
  
}
function update() {


  
  controlsManagement(player, cursors.up, cursors.down, cursors.left, cursors.right);
  controlsManagement(player2, game.input.keyboard.addKey(Phaser.Keyboard.W), game.input.keyboard.addKey(Phaser.Keyboard.S), game.input.keyboard.addKey(Phaser.Keyboard.A), game.input.keyboard.addKey(Phaser.Keyboard.D));

    
  //collisions  
  game.physics.arcade.collide(players, platforms);
  game.physics.arcade.collide(players);
  //game.physics.arcade.overlap(players, spikes, deadlyCollision);
  game.physics.arcade.overlap(player, deadly_group, deadlyCollision_player1);
  game.physics.arcade.overlap(player2, deadly_group, deadlyCollision_player2);
  //umpire();
  
  //game.physics.arcade.overlap(players, platforms, collectStar, null, this);
  //game.paused=true;
}



function deadlyCollision_player1(){
  pink_bear_alive=false;
  //player.animations.play('dead');
  player.frame = 8;
  player2.frame = 9;
  game.add.text(200, 150, 'green bear wins', { fill: '#bafe62' });
  deadlyCollision();

}

function deadlyCollision_player2(){
  green_bear_alive=false;
  death_count++;
  //player2.animations.play('dead');
  player.frame = 9;
  player2.frame = 8;
  game.add.text(200, 150, 'pink bear wins', { fill: '#e080c2' });
  deadlyCollision();

}
function deadlyCollision(){
  game.paused=true;

}
//function umpire(){
  //if(death_count == 4)
//}
    

function collectStar(players,platforms){
  players.body.velocity.y = -300;
  //platforms.kill();
}


function controlsManagement(player, up, down, left, right){
   
  if(up.isDown)
  {
    if(player.body.velocity.y>playerUp)
      player.body.velocity.y = playerUp;
    player.animations.play('up');
    //player2.animations.play('left');
  }
  else if(left.isDown){
    player.body.velocity.x = playerLeft;
    player.animations.play('left');
  }
  else if(down.isDown){
    player.body.velocity.y = playerDown;
    player.animations.play('down');
  }
  else if(right.isDown){
    player.body.velocity.x = playerRight;
    player.animations.play('right');
  }
  else{
    //Stand still
    player.frame = 7;
    player.animations.stop();
  }
}
function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}
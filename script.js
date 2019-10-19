var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');

var video;
var speedMult = 0.7;
// this is the friction which will slow down the map. Must be less than 1
var friction = 0.99;

bootState = {
  preload: function() {
    game.load.image('six', 'assets/six.png');
    game.load.image('start', 'assets/start.png');
    game.load.image('map', 'assets/map.png');

    game.load.image('map-freesea', 'assets/map-freesea.png');
    game.load.image('scene-freesea', 'assets/scene-freesea.jpg');

    game.load.image('map-ship', 'assets/map-ship.png');
    game.load.image('scene-ship', 'assets/scene-ship.png');

    game.load.image('map-shop', 'assets/map-shop.png');
    game.load.image('scene-shop', 'assets/scene-shop.png');

    game.load.image('map-two', 'assets/map-two.png');
    game.load.image('scene-two', 'assets/scene-two.png');

    game.load.image('map-control', 'assets/map-control.png');
    game.load.image('scene-control', 'assets/scene-control.png');

    game.load.image('menu-bicycle', 'assets/menu-bicycle.png');

    //game.load.video('rover', 'assets/videos/rover.mp4');
  },
  create: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.state.start('menu')
  }
},

menuState = {
  create: function() {
    this.menu = game.add.image( 0,0, 'six');


    var start = game.add.button(400, 450, 'start', this.start);
    start.anchor.setTo(0.5, 0.5);
    start.alpha = 0;
    var tween = game.add.tween(start).to( { alpha: 1 }, 500, "Linear", true, 0, -1);
    tween.yoyo(true, 500);
  },
  start: function(){
    game.state.start('play');
  }
},

playState = {
  create: function(){
    // the big map to scroll
    // to be sure to be back to the righ place of the scrolling map we need to test if it's the first call
    if (this.scrollingMap == undefined){
      this.scrollingMap = game.add.image(-200, -200, 'map');
    } else {
      this.scrollingMap = game.add.image(this.scrollingMap.x, this.scrollingMap.y, 'map');
    }

    this.freesea = game.add.image(723, 355, 'map-freesea');
    this.freesea.tint = 0x00ff00;
    this.freesea.inputEnabled = true;
    this.freesea.input.useHandCursor = true;

    this.freesea.events.onInputDown.add(()=>{game.state.start('place')}, this);

    this.ship = game.add.image(654, 713, 'map-ship');
    this.ship.tint = 0x00ff00;
    this.ship.inputEnabled = true;
    this.ship.input.useHandCursor = true;

    this.ship.events.onInputDown.add(()=>{game.state.start('ship')}, this);

    this.shop = game.add.image(562, 298, 'map-shop');
    this.shop.tint = 0x00ff00;
    this.shop.inputEnabled = true;
    this.shop.input.useHandCursor = true;

    this.shop.events.onInputDown.add(()=>{game.state.start('shop')}, this);

    this.two = game.add.image(954, 444, 'map-two');
    this.two.tint = 0x00ff00;
    this.two.inputEnabled = true;
    this.two.input.useHandCursor = true;

    this.two.events.onInputDown.add(()=>{game.state.start('two')}, this);

    this.control = game.add.image(518, 432, 'map-control');
    this.control.tint = 0x00ff00;
    this.control.inputEnabled = true;
    this.control.input.useHandCursor = true;

    this.control.events.onInputDown.add(()=>{game.state.start('control')}, this);

    // map will accept inputs
    this.scrollingMap.inputEnabled = true;
    // map can be dragged
    this.scrollingMap.input.enableDrag(false);
    // custom property: we save map position
    this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
    // custom property: the map is not being dragged at the moment
    this.scrollingMap.isBeingDragged = false;
    // custom property: map is not moving (or is moving at no speed)
    this.scrollingMap.movingSpeed = 0;
    // map can be dragged only if it entirely remains into this rectangle
    this.scrollingMap.input.boundsRect = new Phaser.Rectangle(game.width - this.scrollingMap.width, game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - game.width, this.scrollingMap.height * 2 - game.height);
    // when the player starts dragging...
    this.scrollingMap.events.onDragStart.add(function(){
         // set isBeingDragged property to true
         this.scrollingMap.isBeingDragged = true;
         // set movingSpeed property to zero. This will stop moving the map
         // if the player wants to drag when it's already moving
         this.scrollingMap.movingSpeed = 0;
    }, this);
    // when the player stops dragging...
    this.scrollingMap.events.onDragStop.add(function(){
         // set isBeingDragged property to false
         this.scrollingMap.isBeingDragged = false;
    }, this);
  },

  update: function(){
    // if the map is being dragged...
    if(this.scrollingMap.isBeingDragged){
       // save current map position
       this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
    }
    // if the map is NOT being dragged...
    else{
     // if the moving speed is greater than 1...
     if(this.scrollingMap.movingSpeed > 1){
        // adjusting map x position according to moving speed and angle using trigonometry
        this.scrollingMap.x += this.scrollingMap.movingSpeed * Math.cos(this.scrollingMap.movingangle);
        // adjusting map y position according to moving speed and angle using trigonometry
        this.scrollingMap.y += this.scrollingMap.movingSpeed * Math.sin(this.scrollingMap.movingangle);

        // keep map within boundaries
        if(this.scrollingMap.x < game.width - this.scrollingMap.width){
             this.scrollingMap.x = game.width - this.scrollingMap.width;
        }
        // keep map within boundaries
        if(this.scrollingMap.x < 0){
             this.scrollingMap.x = 0;
        }
        // keep map within boundaries
        if(this.scrollingMap.y < game.height - this.scrollingMap.height){
             this.scrollingMap.y = game.height - this.scrollingMap.height;
        }
        // keep map within boundaries
        if(this.scrollingMap.y < 0){
             this.scrollingMap.y = 0;
        }
        // applying friction to moving speed
        this.scrollingMap.movingSpeed *= friction;
        // save current map position
        this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
      }
     // if the moving speed is less than 1...
       else{
          // checking distance between current map position and last saved position
          // which is the position in the previous frame
          var distance = this.scrollingMap.savedPosition.distance(this.scrollingMap.position);
          // same thing with the angle
          var angle = this.scrollingMap.savedPosition.angle(this.scrollingMap.position);
          // if the distance is at least 4 pixels (an arbitrary value to see I am swiping)
          if(distance > 4){
               // set moving speed value
               this.scrollingMap.movingSpeed = distance * speedMult;
               // set moving angle value
               this.scrollingMap.movingangle = angle;
          }
        }
    }

    if (this.freesea.input.pointerOver())
    {
        this.freesea.tint = 0x00ff00;
    }

    this.freesea.x = this.scrollingMap.savedPosition.x + 723;
    this.freesea.y = this.scrollingMap.savedPosition.y + 355;

    this.ship.x = this.scrollingMap.savedPosition.x + 654;
    this.ship.y = this.scrollingMap.savedPosition.y + 713;

    this.shop.x = this.scrollingMap.savedPosition.x + 562;
    this.shop.y = this.scrollingMap.savedPosition.y + 298;

    this.two.x = this.scrollingMap.savedPosition.x + 954;
    this.two.y = this.scrollingMap.savedPosition.y + 444;

    this.control.x = this.scrollingMap.savedPosition.x + 518;
    this.control.y = this.scrollingMap.savedPosition.y + 432;
  },

  showImage: function(){
    game.add.image('scene-freesea');
  },

  playSeaRover: function(){

    video = game.add.video('rover');

    video.play(true);

    //  x, y, anchor x, anchor y, scale x, scale y
    video.addToWorld();

  }
}

placeState = {
  create: function(){
    game.add.image(0,0,'scene-freesea');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;

    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

shipState = {
  create: function(){
    game.add.image(0,0,'scene-ship');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;

    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

shopState = {
  create: function(){
    game.add.image(0,0,'scene-shop');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

twoState = {
  create: function(){
    game.add.image(0,0,'scene-two');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

controlState = {
  create: function(){
    game.add.image(0,0,'scene-control');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

game.state.add('boot', bootState)
game.state.add('menu', menuState)
game.state.add('play', playState)
game.state.add('place', placeState)
game.state.add('ship', shipState)
game.state.add('shop', shopState)
game.state.add('two', twoState)
game.state.add('control', controlState)
game.state.start('boot');

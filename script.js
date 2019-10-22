var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');

var video;
var speedMult = 0.7;
// this is the friction which will slow down the map. Must be less than 1
var friction = 0.99;

bootState = {
  preload: function() {
    game.load.image('six', 'assets/menu/six.png');
    game.load.image('start', 'assets/menu/start.png');
    game.load.image('map', 'assets/map/map.png');

    game.load.image('eye', 'assets/menu/eye.png');

    game.load.image('map-pawn', 'assets/map/map-pawn.png');
    game.load.image('scene-chess', 'assets/scenes/scene-chess.png');

    game.load.image('map-helico', 'assets/map/map-helicopter.png');
    game.load.image('scene-helico', 'assets/scenes/scene-helicopter.png');

    game.load.image('map-freesea', 'assets/map/map-freesea.png');
    game.load.image('scene-freesea', 'assets/scenes/scene-freesea.png');

    game.load.image('map-ship', 'assets/map/map-ship.png');
    game.load.image('scene-ship', 'assets/scenes/scene-ship.png');

    game.load.image('map-shop', 'assets/map/map-shop.png');
    game.load.image('scene-shop', 'assets/scenes/scene-shop.png');

    game.load.image('map-two', 'assets/map/map-two.png');
    game.load.image('scene-two', 'assets/scenes/scene-dome.png');

    game.load.image('map-control', 'assets/map/map-control.png');
    game.load.image('scene-control', 'assets/scenes/scene-town-hall.png');

    game.load.image('map-labour-exchange', 'assets/map/map-labour-exchange.png');
    game.load.image('scene-labour-exchange', 'assets/scenes/scene-labour-exchange.png');

    game.load.image('map-sea', 'assets/map/map-sea.png');
    game.load.image('scene-sea', 'assets/scenes/scene-sea.png');

    game.load.image('map-beach', 'assets/map/map-beach.png');
    game.load.image('scene-beach', 'assets/scenes/scene-beach.png');

    game.load.image('map-hospital', 'assets/map/map-hospital.png');
    game.load.image('scene-hospital', 'assets/scenes/scene-hospital.png');

    game.load.image('map-cafe', 'assets/map/map-cafe.png');
    game.load.image('scene-cafe', 'assets/scenes/scene-cafe.png');

    game.load.image('map-private', 'assets/map/map-six-private.png');
    game.load.image('scene-private', 'assets/scenes/scene-six-private.png');

    game.load.image('map-phone', 'assets/map/map-phone.png');
    game.load.image('scene-phone', 'assets/scenes/scene-phone.png');

    game.load.image('menu-bicycle', 'assets/menu/menu-bicycle.png');

    game.load.video('rover', 'assets/videos/rover.mp4');
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
    if (video == undefined) {
      //
    } else if (video.playing){
      video.stop()
      video.destroy()
    }
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

    this.control = game.add.image(986, 251, 'map-control');
    this.control.tint = 0x00ff00;
    this.control.inputEnabled = true;
    this.control.input.useHandCursor = true;
    this.control.events.onInputDown.add(()=>{game.state.start('control')}, this);

    this.labour = game.add.image(518, 432, 'map-labour-exchange');
    this.labour.tint = 0x00ff00;
    this.labour.inputEnabled = true;
    this.labour.input.useHandCursor = true;
    this.labour.events.onInputDown.add(()=>{game.state.start('labour')}, this);

    this.pawn = game.add.image(750, 470, 'map-pawn');
    this.pawn.tint = 0x00ff00;
    this.pawn.inputEnabled = true;
    this.pawn.input.useHandCursor = true;
    this.pawn.events.onInputDown.add(()=>{game.state.start('chess')}, this);

    this.helico = game.add.image(670, 580, 'map-helico');
    this.helico.tint = 0xff0000;
    this.helico.inputEnabled = true;
    this.helico.input.useHandCursor = true;
    this.helico.events.onInputDown.add(()=>{game.state.start('helico')}, this);

    this.sea = game.add.image(782, 771, 'map-sea');
    this.sea.tint = 0xff0000;
    this.sea.inputEnabled = true;
    this.sea.input.useHandCursor = true;
    this.sea.events.onInputDown.add(()=>{game.state.start('sea')}, this);

    this.beach = game.add.image(505, 818, 'map-beach');
    this.beach.tint = 0xff0000;
    this.beach.inputEnabled = true;
    this.beach.input.useHandCursor = true;
    this.beach.events.onInputDown.add(()=>{game.state.start('beach')}, this);

    this.hospital = game.add.image(1325, 447, 'map-hospital');
    this.hospital.tint = 0x00ff00;
    this.hospital.inputEnabled = true;
    this.hospital.input.useHandCursor = true;
    this.hospital.events.onInputDown.add(()=>{game.state.start('hospital')}, this);

    this.cafe = game.add.image(813, 293, 'map-cafe');
    this.cafe.tint = 0x00ff00;
    this.cafe.inputEnabled = true;
    this.cafe.input.useHandCursor = true;
    this.cafe.events.onInputDown.add(()=>{game.state.start('cafe')}, this);

    this.private = game.add.image(730, 531, 'map-private');
    this.private.tint = 0x0000ff;
    this.private.inputEnabled = true;
    this.private.input.useHandCursor = true;
    this.private.events.onInputDown.add(()=>{game.state.start('private')}, this);

    this.phone = game.add.image(511, 272, 'map-phone');
    this.phone.tint = 0x00ff00;
    this.phone.inputEnabled = true;
    this.phone.input.useHandCursor = true;
    this.phone.events.onInputDown.add(()=>{game.state.start('phone')}, this);

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

    this.labour.x = this.scrollingMap.savedPosition.x + 986;
    this.labour.y = this.scrollingMap.savedPosition.y + 251;

    this.pawn.x = this.scrollingMap.savedPosition.x + 750;
    this.pawn.y = this.scrollingMap.savedPosition.y + 470;

    this.helico.x = this.scrollingMap.savedPosition.x + 670;
    this.helico.y = this.scrollingMap.savedPosition.y + 580;

    this.sea.x = this.scrollingMap.savedPosition.x + 782;
    this.sea.y = this.scrollingMap.savedPosition.y + 771;

    this.beach.x = this.scrollingMap.savedPosition.x + 505;
    this.beach.y = this.scrollingMap.savedPosition.y + 818;

    this.hospital.x = this.scrollingMap.savedPosition.x + 1325;
    this.hospital.y = this.scrollingMap.savedPosition.y + 447;

    this.cafe.x = this.scrollingMap.savedPosition.x + 813;
    this.cafe.y = this.scrollingMap.savedPosition.y + 293;

    this.private.x = this.scrollingMap.savedPosition.x + 730;
    this.private.y = this.scrollingMap.savedPosition.y + 531;

    this.phone.x = this.scrollingMap.savedPosition.x + 511;
    this.phone.y = this.scrollingMap.savedPosition.y + 272;
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

chessState = {
  create: function(){
    game.add.image(0, 0, 'scene-chess');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

helicoState = {
  create: function(){
    game.add.image(0, 0, 'scene-helico');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

labourState = {
  create: function(){
    game.add.image(0, 0, 'scene-labour-exchange');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

seaState = {
  create: function(){
    game.add.image(0, 0, 'scene-sea');

    this.eye = game.add.image(500,200, 'eye');
    this.eye.inputEnabled = true;
    this.eye.input.useHandCursor = true;
    this.eye.events.onInputDown.add(this.playVideo, this);

    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  },

  playVideo: function(){
    video = game.add.video('rover');
    video.addToWorld(780, 550, 1, 1, 0.5, 0.5);
    video.onComplete.add(()=>{game.state.start('sea')})
    video.play(false);
  }
}

beachState = {
  create: function(){
    game.add.image(0, 0, 'scene-beach');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

hospitalState = {
  create: function(){
    game.add.image(0, 0, 'scene-hospital');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

cafeState = {
  create: function(){
    game.add.image(0, 0, 'scene-cafe');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

privateState = {
  create: function(){
    game.add.image(0, 0, 'scene-private');
    this.bicycle = game.add.image(20, 20, 'menu-bicycle');
    this.bicycle.inputEnabled = true;
    this.bicycle.input.useHandCursor = true;
    this.bicycle.events.onInputDown.add(()=>{game.state.start('play')}, this);
  }
}

phoneState = {
  create: function(){
    game.add.image(0, 0, 'scene-phone');
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
game.state.add('labour', labourState)
game.state.add('sea', seaState)
game.state.add('beach', beachState)
game.state.add('hospital', hospitalState)
game.state.add('cafe', cafeState)
game.state.add('private', privateState)
game.state.add('chess', chessState)
game.state.add('helico', helicoState)
game.state.add('phone', phoneState)
game.state.start('boot');

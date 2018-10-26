var puntos;

let Main={
    init:function(){
        this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally=true;
        this.game.scale.pageAlignVertically=true; 
     },
     preload:function(){
         this.game.load.image("fondo","./recursos/sprites/background-day.png");
         this.game.load.image("base","./recursos/sprites/base.png");
         this.game.load.spritesheet("ave","./recursos/sprites/flappyazulsprite.png",34,24,3);
         this.game.load.image("tubo","./recursos/sprites/pipe-green.png");
     },
     create:function(){
        this.game.world.setBounds(0,0,this.game.width+50,this.game.height-115);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

         this.fondo=this.game.add.tileSprite(0,0,this.game.width,this.game.height,"fondo");
         this.base=this.game.add.tileSprite(0,this.game.height-115,this.game.width,145,"base");
         this.fondo.inputEnabled=true;
         this.fondo.events.onInputDown.add(this.saltar,this);

         this.flappy=this.game.add.sprite(150,20,"ave");
         this.flappy.anchor.setTo(0.5);
         this.flappy.animations.add("vuelo",[0,1,2],10,true);
         this.game.physics.arcade.enable(this.flappy);
         this.flappy.body.gravity.y=1200;
         this.flappy.body.collideWorldBounds=true;

         this.tuberias=this.game.add.group();
         this.repeticion=this.game.time.events.loop(3000,this.crearTubo,this);
         puntos=0;
         this.puntosTexto=this.game.add.text(20,20,puntos.toString(),{font:"30px Arial",fill:"#fff"});
        
     },
     update:function(){
        this.fondo.tilePosition.x-=1;
        this.base.tilePosition.x-=1;


        //ave;
        this.flappy.animations.play("vuelo");
        if(this.flappy.angle<20){this.flappy.angle+=1;}
        
        if(this.flappy.position.y>=this.fondo.height-115-this.flappy.height/2){
            this.game.state.start("GameOver");
        }
        this.game.physics.arcade.overlap(this.flappy,this.tuberias,this.tocoTubo,null,this);

        //tuberias
        this.tuberias.forEach(function(tubo){
            if(tubo.position.x<=-tubo.width){
                tubo.destroy();
                puntos+=0.5;
                this.puntosTexto.text=puntos;
            };
        },this);
        //console.log(this.tuberias.length);
        
     },

     saltar:function(){
         this.flappy.body.velocity.y=-350;
         this.game.add.tween(this.flappy).to({angle:-20},100,null,true);
     },
     crearTubo:function(){
        let separacionRandom=Math.floor(Math.random()*125);
        let orientacion=0;
        if(Math.random()*2<1){orientacion=-1}else{orientacion=1;}
        let total=275+(this.flappy.height)*1.5+Math.floor(Math.random()*30);
        this.tubo1=this.game.add.sprite(this.game.width+50,this.fondo.height+total+orientacion*separacionRandom,"tubo");
        this.tubo1.anchor.setTo(0.5,1);
        this.game.physics.arcade.enable(this.tubo1);
        this.tubo1.body.velocity.x=-60;
        this.tubo2=this.game.add.sprite(this.game.width+50,0-total+separacionRandom*orientacion,"tubo");
        this.tubo2.anchor.setTo(0.5,1);
        this.tubo2.scale.y*=-1;
        this.game.physics.arcade.enable(this.tubo2);
        this.tubo2.body.velocity.x=-60;

        this.tuberias.add(this.tubo1);
        this.tuberias.add(this.tubo2);
    },
    tocoTubo:function(){
        if(this.flappy.alive==false){
            return;
        }else{
            this.flappy.alive=false;
            this.tuberias.forEachAlive(function(tubo){
                tubo.body.velocity.x=0;
            });
            this.game.time.events.remove(this.repeticion);
            this.game.state.pause();
            this.game.state.start("GameOver");
        }
    }


}
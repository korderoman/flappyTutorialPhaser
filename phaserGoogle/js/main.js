//var puntos;
let Main={
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally=true;
        this.scale.pageAlignVertically=true;
    },
    preload:function(){
        this.load.image("fondo","./recursos/sprites/background-day.png");
        this.load.spritesheet("ave","./recursos/sprites/flappyazulsprite.png",34,24,3);
        this.load.image("tubo","./recursos/sprites/pipe-green.png");
        this.load.image("base","./recursos/sprites/base.png");
    },

    create:function(){
      
        https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#tileSprite
        this.game.world.setBounds(0,0,this.game.width+50,this.game.height-115)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.fondo=this.game.add.tileSprite(0,0,this.game.width,this.game.height,"fondo");
       this.base=this.game.add.tileSprite(0,this.game.height-115,this.game.width,145,"base");
       
        this.ave=this.game.add.sprite(150,20,"ave");
        this.ave.anchor.setTo(0.5);
        this.ave.animations.add("vuelo",[0,1,2],10,true);
        //habilitamos la fisica de nuestra ave
        this.game.physics.arcade.enable(this.ave);
        this.ave.body.gravity.y=1200;
        
        this.ave.body.collideWorldBounds=true;//ave se queda en el mundo

        this.fondo.inputEnabled=true;
        this.fondo.events.onInputDown.add(this.saltar,this);
      
        this.tubos=this.game.add.group();
       
        
       this.repeticion=this.game.time.events.loop(3000,this.crearTubo,this);
       //puntajes
       //puntos=0;
       this.txtPuntos=this.game.add.text(20,20,puntos.toString(),{font:"30px Arial",fill:"#FFF"});
                
   },
    update:function(){
        /****************TODO LO RELACIONADO AL FONDO******************** */
        if(this.ave.alive){
            this.fondo.tilePosition.x-=1;
            this.base.tilePosition.x-=1;
    
        }
      /********************************************************************* */
       // console.log(this.ave.alive)

       /****************TODO LO RELACIONADO AL AVE *************************** */
       this.ave.animations.play("vuelo");
        if(this.ave.angle<20){this.ave.angle+=1;}
        //Si el ave choca con el limite inferior se termina el juego y pasa al siguiente estado
        if(this.ave.position.y>=this.fondo.height-this.ave.height/2-115){
            //console.log("perdiste")
            this.ave.alive=false;
            
           // this.tubos.forEach(function(t){console.log(t.body.position.x)});
            this.game.state.start("GameOver");
        }
        
          
       /*********************************************************************** */
       /************************* TODO LO RELACIONADO A LOS TUBOS ************************** */
        
        
      this.tubos.forEach(function(tubo){
          if(tubo.position.x<=-tubo.width){
              tubo.destroy();
             /* this.puntos+=1;
              this.txtPuntos+=this.puntos;*/
              puntos+=0.5;
        this.txtPuntos.text=puntos;
            }
        },this)
       
      /***************************************************************************************** */
       /*************TODO LO RELACIONADO A LAS COLISIONES */
       this.game.physics.arcade.overlap(this.ave,this.tubos,this.tocoTubo,null,this);
        /***********************TODO LO RELACIONADO A LOS PUNTAJES */
       // console.log(puntos);
        
        
        

    },
    crearTubo:function(){
        let separacionRandom=Math.floor(Math.random()*125);
        let orientacion=0;
        if(Math.random()*2<1){orientacion=-1}else{orientacion=1;}
         const SEPARACIONBASICA=275 + Math.floor(Math.random()*20);
        
         const altoAve=(this.ave.height)*1.5; 
         const Total=SEPARACIONBASICA +altoAve;
        

         this.tubo1=this.game.add.sprite(this.game.width+50,this.fondo.height+Total+separacionRandom*orientacion,"tubo");
         this.tubo1.anchor.setTo(0.5,1);
         this.game.physics.arcade.enable(this.tubo1);
         this.tubo1.body.velocity.x=-60;
      
        this.tubo2=this.game.add.sprite(this.game.width+50,0-Total+separacionRandom*orientacion,"tubo");
         this.tubo2.anchor.setTo(0.5,1);
         this.tubo2.scale.y*=-1;
         this.game.physics.arcade.enable(this.tubo2);
         this.tubo2.body.velocity.x=-60; // recuerda que avanza a pixeles por segundo en cambio el fondo avanza a fps
         //agregamos al grupo
         this.tubos.add(this.tubo1);
         this.tubos.add(this.tubo2);


    },

   
    saltar:function(){
       
        this.ave.body.velocity.y=-350;
      // this.game.add.tween(this.ave).to({angle:-20},100).start();
        this.game.add.tween(this.ave).to({angle:-20},100,null,true);
    },
    tocoTubo:function () {
        if(this.ave.alive==false){
            return;
        }else{
            this.ave.alive=false;
            
           // console.log("tocaste un tubo");
            this.tubos.forEachAlive(function(t){
                t.body.velocity=0;
            });
            this.game.time.events.remove(this.repeticion);
            this.game.state.pause();
            this.game.state.start("GameOver");
            

        }
      }
}
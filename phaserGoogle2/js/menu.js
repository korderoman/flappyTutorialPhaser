let Menu={
    init:function(){
       this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
       this.game.scale.pageAlignHorizontally=true;
       this.game.scale.pageAlignVertically=true; 
    },
    preload:function(){
        this.game.load.image("boton","./recursos/sprites/boton1.png");
    },
    create:function(){
        this.game.stage.backgroundColor="#fff";
        this.botonInicio=this.game.add.button(this.game.width/2,this.game.height/2,"boton",this.iniciarJuego,this);
        this.botonInicio.anchor.setTo(0.5);
        this.botonInicio.scale.setTo(0.25);

        this.textoNombre=this.game.add.text(this.game.width/2,this.game.height/2-125,"Flappy Bird",{font:"bold 30px sans-serif",fill:"black",align:"center"});
        this.textoInicio=this.game.add.text(this.game.width/2,this.game.height/2-85,"Iniciar Juego",{font:"bold 24px sans-serif",fill:"black",align:"center"});
        this.textoNombre.anchor.setTo(0.5);
        this.textoInicio.anchor.setTo(0.5);
    },
    iniciarJuego:function () {
        juego.state.start("Juego");
      } 
}




let juego=new Phaser.Game(370,550,Phaser.Canvas);
juego.state.add("Menu",Menu);
juego.state.add("Juego",Main);
juego.state.add("GameOver",GameOver);

juego.state.start("Menu");
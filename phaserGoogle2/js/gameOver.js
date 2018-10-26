let GameOver={
    init:function(){
        this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally=true;
        this.game.scale.pageAlignVertically=true; 
     },
     preload:function(){
       
            this.game.stage.backgroundColor="#fff";
            this.game.load.image("boton","./recursos/sprites/boton1.png");
            this.game.load.image("salvar","./recursos/sprites/save.png");
            this.game.load.image("salir","./recursos/sprites/salir.png");
     
     },
     create:function(){      
        this.botonPrincipal=this.game.add.button(this.game.width/2-100,this.game.height/2,"boton",this.ReiniciarJuego,this);
        this.botonPrincipal.anchor.setTo(0.5);
        this.botonPrincipal.scale.setTo(0.18);
        this.botonGuardar=this.game.add.button(this.game.width/2,this.game.height/2,"salvar",this.Guardar,this);
        this.botonGuardar.anchor.setTo(0.5);
        this.botonGuardar.scale.setTo(0.4);
        this.botonSalir=this.game.add.button(this.game.width/2+100,this.game.height/2,"salir",this.Salir,this);
        this.botonSalir.anchor.setTo(0.5);
        this.botonSalir.scale.setTo(0.34);
        
        this.textoInicio1=this.game.add.text(this.game.width/2,this.game.height/2-125,"Juego Terminado",{font:"bold 24px sans-serif",fill:"black",align:"center"});
        this.textoInicio2=this.game.add.text(this.game.width/2,this.game.height/2-155,"Flappy Bird",{font:"bold 30px sans-serif",fill:"black",align:"center"});
        this.puntosTexto=this.game.add.text(this.game.width/2,this.game.height/2-95,"Puntos:"+puntos.toString(),{font:"bold 24px sans-serif",fill:"black",align:"center"});
        this.puntosTexto.anchor.setTo(0.5);
        this.textoInicio1.anchor.setTo(0.5);
        this.textoInicio2.anchor.setTo(0.5);
           },
        ReiniciarJuego:function(){
            this.game.state.start("Menu");
        },
        Guardar:function(){},
        Salir:function () { 
            location.reload();
         }

        

}
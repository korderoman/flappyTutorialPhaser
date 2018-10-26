let Menu={
    init:function(){
        this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally=true;
        this.game.scale.pageAlignVertically=true;
    },

    preload:function(){
        this.game.stage.backgroundColor="#fff";
        this.game.load.image("boton","./recursos/sprites/boton1.png"); 
    },
    create:function(){
        
        this.botonPrincipal=this.game.add.button(this.game.width/2,this.game.height/2,"boton",this.iniciarJuego,this);
        this.botonPrincipal.anchor.setTo(0.5);
        this.botonPrincipal.scale.setTo(0.25);
        
        this.textoInicio1=this.game.add.text(this.game.width/2,this.game.height/2-85,"Iniciar Juego",{font:"bold 24px sans-serif",fill:"black",align:"center"});
        this.textoInicio2=this.game.add.text(this.game.width/2,this.game.height/2-125,"Flappy Bird",{font:"bold 30px sans-serif",fill:"black",align:"center"});
        this.textoInicio1.anchor.setTo(0.5);
        this.textoInicio2.anchor.setTo(0.5);

    },

    //functiones auxiliares
    iniciarJuego:function(){
        console.log("Se da inicio al juego");
        this.state.start("Principal");
    }

}

/*
let juego=new Phaser.Game(370,550,Phaser.Canvas);

juego.state.add("Menu",Menu);
juego.state.add("Principal",Main);
juego.state.add("GameOver",GameOver);
juego.state.start("Menu");*/
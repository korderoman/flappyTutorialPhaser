var puntos;
var ideUsuario;
var database
$(document).ready( ()=> {
    inicio();
});

inicio=()=>{
    let juego=new Phaser.Game(370,550,Phaser.Canvas);
    database=firebase.database();
    juego.state.add("Menu",Menu);
    juego.state.add("Principal",Main);
    juego.state.add("GameOver",GameOver);

   let usuario, clave;

    $("#enviar").click(function (e) { 
        e.preventDefault();
        usuario=$("#usuario").val();
        clave=$("#clave").val();
        firebase.auth().signInWithEmailAndPassword(usuario,clave).then(()=>{
           // console.log("Bienvenido");
            //window.location.replace("./otra.html"); 
            ideUsuario=usuario.split("@");
            console.log(ideUsuario);  
            let observador=database.ref().child(ideUsuario[0]).child("puntos");
            console.log(observador);
            //observador.orderByChild()
           
            observador.on("value",snap=>console.log(puntos=snap.val()));
            $("#formulario").hide();
            juego.state.start("Menu");
       }
         ).catch((error)=>{
            //console.log("no pudiste entrar",error);
            alert("Usuario o clave incorrecta");
            usuario=$("#usuario").val("");
            clave=$("#clave").val("");

        });

        
    });

    $("#crear").click(function (e) { 
        e.preventDefault();
        usuario=$("#usuario").val();
        ideUsuario=usuario.split("@");
        clave=$("#clave").val();
        console.log(ideUsuario);
        firebase.auth().createUserWithEmailAndPassword(usuario,clave).then(()=>{
           alert("Te registraste correctamente");
           database.ref(""+ideUsuario[0]).set(
               {correo:usuario,
                puntos:0
                }
           );
           puntos=0;
           $("#formulario").hide();
           juego.state.start("Menu");

           //window.location.replace("./otra.html"); 
        }

        ).catch((error)=>{
            console.log("No te pudiste inscribir",error);
        });
    });


}
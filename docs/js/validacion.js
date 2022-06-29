//Haz tú validación en javascript acá



var botonEnviarconsulta = document.querySelector(".formcontato__boton");

botonEnviarconsulta.addEventListener("click", function (event) {
    event.preventDefault();
    var formulario = document.querySelector("form.formcontato__form");
    console.log(formulario);
    var consulta = capturarConsulta(formulario);
    console.log(consulta);

    var errores = validarConsulta(consulta);

    if (errores.length > 0) {
        exhibirMensajesErrores(errores);
        return;
    }
    formulario.reset();

    var mensajesErrores = document.querySelector("#mensajes-errores");
    mensajesErrores.innerHTML = "";
});


var formulario = document.querySelector("form.formcontato__form");
formulario.addEventListener('keyup', function(event){
    event.preventDefault();
    var consulta = capturarConsulta(formulario);
    var errores = validarConsulta(consulta);
    if (errores.length > 0) {
        exhibirMensajesErrores(errores);
        botonEnviarconsulta.disabled= true;
        return;
    }else{
        botonEnviarconsulta.disabled= false;
    }
    var mensajesErrores = document.querySelector("#mensajes-errores");
    mensajesErrores.innerHTML = "";
});

function capturarConsulta(formulario){
    var consulta = {
        nombre: formulario.nombre.value,
        email: formulario.email.value,
        asunto: formulario.asunto.value,
        mensaje: formulario.mensaje.value,
    }
    return consulta;
};
function validarConsulta(consulta){
    var errores = []
    var expresionmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;

    if(consulta.nombre.length == 0){
        errores.push("El campo nombre no puede estar vacío");
    }
    if(consulta.nombre.length >= 50){
        errores.push("El campo nombre supera los 50 caracteres");
    }
    if(consulta.email.length == 0){
        errores.push("El campo email no puede estar vacío");
    }
    if(!expresionmail.test(consulta.email)){
        errores.push("El campo email no respeta el formato: correo@ejemplo.com");
    }
    if(consulta.asunto.length == 0){
        errores.push("La campo asunto no puede estar vacío");
    }
    if(consulta.asunto.length >= 50){
        errores.push("El campo asunto supera los 50 caracteres");
    }
    if(consulta.mensaje.length == 0){
        errores.push("El campo mensaje no puede estar vacío");
    }
    if(consulta.mensaje.length >= 300){
        errores.push("El campo mensaje supera los 300 caracteres");
    }
    return errores; 
}

function exhibirMensajesErrores(errores){
    var ul = document.querySelector("#mensajes-errores");
    ul.innerHTML = ""
    errores.forEach(function(error){
        var li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    });
}


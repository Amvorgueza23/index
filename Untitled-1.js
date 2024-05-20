let arregloTareas= new Array();
let elementosGuardados = 0;

let done = new Audio(''); //Agregar archivo de audio
let undone = new Audio(''); //Segundo audio

function init(){
    if ('serviceWorker' in navigator){
        navigator.serviceWorker.registrer('sw.js').them(function(registration))

        //si es exitoso
        console.log('SW registrado correctamente');
    },function(err){
        //si es falla
        console.log('SW fallo',err);
    }
});

else{
    console.log("Error")
}


function int(){
    let fecha = new Date(); //  es como llamar a una clase
    let mesNumero = fecha.getMonth();
    let mes="";

    // Si ya existen tareas guardadas en el LS, las vamos a obtener en la interfaz
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'));
        for(i=0; i<tareas.length; i++){
            arregloTareas.push(tareas[1]);
            //llamar una funcion que cargue las tareas a la interface 
           
        }
    }else{
        //si no hay tareas, crear el espacio de memoria en LS
        //creamos el objeto vacio
        jsonTarea = {};
        localStorage.setItem('tareas',JSON.stringify(jsonTarea));
    }
    switch(mesNumero){
        case 0:
        mes= "Enero";
        break;
        case 1:
        mes= "Febrero";
        break;
        case 2:
        mes= "Marzo";
        break;
        case 3:
        mes= "Abril";
        break;
        case 4:
        mes= "Mayo";
        break;
        case 5:
        mes= "Junio";
        break;
        case 6:
        mes= "Julio";
        break;
        case 7:
        mes= "Agosto";
        break;
        case 8:
        mes= "Septiembre";
        break;
    }
    
    document.getElementById('fecha').innerHTML = fecha.getDate()+"de"+mes;
}
function loadTareas(){
    document.querySelector('.box2').innerHTML="";
    document.querySelector('.box3').innerHTML="";
    //cargar las tareas del localStorage
    for(i=0; i<tareas.length; i++){
        //crear elemento del html
        elemento = "<div class='tarea' id='"+i+"' onclick='cambiarEstado(this.id)'>"+
        "<div class='check'></div>"+
        "<p>"+tareas[i].valor+"</p>"+
    "</div>"

//vamos a dividir las tareas por su estado para poderlas plasmar en el espacio html correspondiente
    if(tareas[i].estatus =="pendiente"){
        document.querySelector('.box2').innerHTML += elemento;
    }else if(tareas[1].estatus =="terminado"){
        document.querySelector('.box3').innerHTML += elemento;
    }//for
    elementosGuardados =tareas.length;
    }
    
    function agregar(){
        //capturar el elemento de la entrada de texto
        tareaTexto = document.getElementById('Nueva Tarea');

        //Nuevo objeto JS
        jsonTarea ={
            'valor':tareaTexto.value,
            'estatus':'pendiente'
        };
        //crear nuevo elemento de la interfaz de usuario
        elemento = "<div class='tarea' id="+ elementosGuardados+"'onclick='cambiarEstado(this.id)'>"+"<div class ='check'></div>"+"<p>"+jsonTarea.valor+"</p>"+"</div>"
        //lo agrego a la interfaz
        document.querySelector('.box2').innerHTML+=elemento;

        //agregar arreglo de JSON la nueva tarea
        arregloTareas.push(jsonTarea)

        //agregar al LS el arreglo de Json en formato texto
        localStorage.setItem('tareas',JSON.stringify(arregloTareas));

        //limpiar cuadto de texto (input)
        tareaTexto.value ="";

        //incrementos Guargafos ++;
        elementosGuardados++;

    }

    function cambiarEstado(id){
        tareas = JSON.parse(localStorage.getItem('tareas'));
        if(tareas[id].estatus == 'terminado'){
            tareas[id].estatus = 'pendiente';
            undone.play();
            //ejecutar sonido
        }else{
            //ejecutar sonido
            done.play();
            tareas[id].estatus = 'terminado';
        }
        //guardado nuevamente en LS
        localStorage.setItem('tareas',JSON.stringify(tareas));
        //recargar
        loadTareas();
    }
}


// CAMPOS FORMULARIO
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const listaCitas = document.querySelector('#citas');





//ui
const formulario = document.querySelector('#nueva-cita');
let editando;


class Citas{
    constructor(){
        this.citas=[];

    }

    agregarCitas(cita){
      this.citas = [...this.citas, cita];
      


    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita => this.citas.id ==! id);
    }
    editarCita(citaActualizada){
      this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);


    }


}

class UI{
imprimirAlerta(mensaje,tipo){

    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')
    if(tipo === 'error'){
        divMensaje.classList.remove('alert-success');
        divMensaje.classList.add('alert-danger');
    }
    else{
        divMensaje.classList.remove('alert-danger');
        divMensaje.classList.add('alert-success');
    }
    divMensaje.textContent = mensaje;

   document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
   
    setTimeout(()=>{

        divMensaje.remove();
        
    }, 3000);




}

limpiarHTML(){
    while(listaCitas.firstChild){
        listaCitas.removeChild(listaCitas.firstChild);
    }
 }

imprimirCitas({citas}){
    this.limpiarHTML();
    citas.forEach(cita =>{
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
     console.log(cita);
    const divCita = document.createElement('div');
    divCita.classList.add('cita','p-3');
    divCita.dataset.id = id;
    //SCRIPTING

    const mascotaParrafo = document.createElement('h2');
    mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
    mascotaParrafo.textContent = mascota;

    const propietarioParrafo = document.createElement('p');
    propietarioParrafo.classList.add('card-title','font-weight-bolder');
    propietarioParrafo.innerHTML = `
           <span class ="font-weight-bolder">Propietario: </span> ${propietario}
    `;

   const telefonoParrafo = document.createElement('p');

     telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono: </span> ${telefono}`;

  const fechaParrafo = document.createElement('p');
       
   fechaParrafo.innerHTML = 
   ` <span class="font-weight-bolder">Fecha:</span> ${fecha} `;

    const horaParrafo = document.createElement('p');

    horaParrafo.innerHTML = 
    `<span class="font-weight-bolder">Hora: </span> ${hora}`;
    
     const sintomasParrafo = document.createElement('p');
     sintomasParrafo.innerHTML = `
     <span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;
     
     //boton eliminar

     const btnEliminar = document.createElement('button');
     btnEliminar.classList.add('btn','btn-danger','mr-2');
     btnEliminar.innerHTML = 'Eliminar ';
     btnEliminar.onclick = () => eliminarCita(id);

     //boton para editar cita

     const btnEditar = document.createElement('button');
     btnEditar.classList.add('btn','btn-info');
     btnEditar.innerHTML = 'Editar ';
     btnEditar.onclick = () => modificarCita(cita);
    
     //agregar parrafos

     divCita.appendChild(mascotaParrafo);
     divCita.appendChild(propietarioParrafo);
     divCita.appendChild(telefonoParrafo);
     divCita.appendChild(fechaParrafo);
     divCita.appendChild(horaParrafo);
     divCita.appendChild(sintomasParrafo);
     divCita.appendChild(btnEliminar);
     divCita.appendChild(btnEditar);



     //agregar citas al HTML

     listaCitas.appendChild(divCita);

    })
    
}

}


//instanciamos

const ui = new UI();
const administrarCitas = new Citas(); // creamos una nueva instancia...




//event listeners

eventListeners();
//EVENT LISTENERS
function eventListeners(){
 // document.addEventListener('DOMContentLoaded', )
   mascotaInput.addEventListener('change',datosCita);
   propietarioInput.addEventListener('change',datosCita);
   telefonoInput.addEventListener('change', datosCita);
   fechaInput.addEventListener('change', datosCita);
   horaInput.addEventListener('change',datosCita);
   sintomasInput.addEventListener('change',datosCita);
 formulario.addEventListener('submit', nuevaCita);

}
//OBJETO PRINCIPAL
const citaObj = {              // PROPIEDAD NAME = AL DEL OBJETO
    mascota: '',              // NAME = MASCOTA
    propietario: '',         // NAME = PROPIETARIO
    telefono: '',            // NAME = TELEFONO
    fecha: '',               // NAME = FECHA
    hora: '',                // NAME = HORA
    sintomas: ''             // NAME = SINTOMAS
}


//FUNCIONES

//AGREGAR DATOS AL OBJETO
function datosCita(e){
    e.preventDefault();
    citaObj[e.target.name] = e.target.value; //va completando el objeto, QUE HIJO DE PUTA ! NAME TIENE QUE TENER EL MISMO NOMBRE DE LA PROPIEDAD EN HTML
 
}

function nuevaCita(e){
    e.preventDefault();
    ui.limpiarHTML();
    // extraemos de objeto
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    //validamos
    if(mascota ==='' || propietario ==='' || telefono ==='' || fecha ==='' || hora ==='' || sintomas ===''){
        ui.imprimirAlerta('Todos los campos son obligatiors', 'error');
        return;
    }
    else if (isNaN(telefono)){
        ui.imprimirAlerta('Telefono no válido', 'error');
        return;
    }
    if(editando){
       //imprimir y volver al boton original
        ui.imprimirAlerta('Editado Correctamente','');
        
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        //quitar modo edicion
        editando = false;

        // pasar el objeto de la cita

        administrarCitas.editarCita({...citaObj});

    } else{

       
   
        //agregar id
        citaObj.id = Date.now();

        administrarCitas.agregarCitas({...citaObj});
        ui.imprimirAlerta('Agregando cita....', '');
    

    }


    ui.imprimirCitas(administrarCitas);
    reiniciarObjeto();
    formulario.reset();


}

function reiniciarObjeto(){

    citaObj.mascota = '';             // NAME = MASCOTA
    citaObj.propietario = '';        // NAME = PROPIETARIO
    citaObj.telefono = '';           // NAME = TELEFONO
    citaObj.fecha = '';              // NAME = FECHA
    citaObj.hora = '';                // NAME = HORA
    citaObj.sintomas = '' ;            // NAME = SINTOMAS

}

function eliminarCita(id){
    //eliminar la cita
    administrarCitas.eliminarCita(id);

    //imprimir alerta
    ui.imprimirAlerta('La cita se elimino correctamente', '');

    //refrescar citas
    ui.imprimirCitas(administrarCitas);
}
function modificarCita(cita){
const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

//llenar el objeto(memoria)
citaObj.mascota = mascota;
citaObj.propietario = propietario;
citaObj.telefono = telefono;
citaObj.fecha = fecha;
citaObj.hora = hora;
citaObj.sintomas = sintomas;
citaObj.id = id;






//lenar inPUTS

mascotaInput.value = mascota;
propietarioInput.value = propietario;
telefonoInput.value = telefono;
fechaInput.value = fecha;
horaInput.value = hora;
sintomasInput.value = sintomas;
//cambiar texto del boton
formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

editando = true;




}



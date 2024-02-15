const nombreInput = document.querySelector('#nombre');
const correoInput = document.querySelector('#correo');
const telefonoInput = document.querySelector('#telefono');
const destinoSelect = document.querySelector('#destino');
const adultosSelect = document.querySelector('#adultos');
const ninosSelect =document.querySelector('#ninos');
const fechaInput = document.querySelector('#fecha');
const fecha2Input = document.querySelector('#fecha2');
const horaInput = document.querySelector('#hora');
const observacionesInput = document.querySelector('#observaciones');

// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita')
formulario.addEventListener('submit', nuevaCita);

let editando = false;


// Eventos
eventListeners();
function eventListeners() {
    nombreInput.addEventListener('change', datosCita);
    correoInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    destinoSelect.addEventListener('change', datosCita);
    adultosSelect.addEventListener('change', datosCita);
    ninosSelect.addEventListener('change',datosCita);
    fechaInput.addEventListener('change', datosCita);
    fecha2Input.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    observacionesInput.addEventListener('change', datosCita);
}

const citaObj = {
    nombre: '',
    correo: '',
    telefono: '',
    destino: '',
    adultos: '',
    ninos:'',
    fecha: '',
    fecha2: '',
    hora: '',
    observaciones: ''
}


function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// CLasses
class Citas {
    constructor() {
        this.citas = []
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Si es de tipo error agrega una clase
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar el alert despues de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({ citas }) {

        this.limpiarHTML();

        citas.forEach(cita => {
            const { nombre, correo, telefono,adultos,ninos, destino, fecha, fecha2, hora, observaciones, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const nombreParrafo = document.createElement('h2');
            nombreParrafo.classList.add('card-title', 'font-weight-bolder');
            nombreParrafo.innerHTML = `${nombre}`;

            const correoParrafo = document.createElement('p');
            correoParrafo.innerHTML = `<span class="font-weight-bolder">Correo: </span> ${correo}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

            const destinoParrafo = document.createElement('p');
            destinoParrafo.innerHTML = `<span class="font-weight-bolder">Destino: </span> ${destino}`;

            const adultosParrafo = document.createElement('p');
            adultosParrafo.innerHTML = `<span class="font-weight-bolder">Adultos: </span> ${adultos}`;

            const ninosParrafo = document.createElement('p');
            ninosParrafo.innerHTML = `<span class="font-weight-bolder">Niños: </span> ${ninos}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha de Ida: </span> ${fecha}`;

            const fecha2Parrafo = document.createElement('p');
            fecha2Parrafo.innerHTML = `<span class="font-weight-bolder">Fecha de Regreso: </span> ${fecha2}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const observacionesParrafo = document.createElement('p');
            observacionesParrafo.innerHTML = `<span class="font-weight-bolder">Observaciones: </span> ${observaciones}`;

            // añadimos un boton de editar
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Añadimos un botón de editar...
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita);
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>' 
            
            
            

            // Agregar al HTML
            divCita.appendChild(nombreParrafo);
            divCita.appendChild(correoParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(destinoParrafo);
            divCita.appendChild(adultosParrafo);
            divCita.appendChild(ninosParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(fecha2Parrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(observacionesParrafo);
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

function nuevaCita(e) {
    e.preventDefault();

    const { nombre, correo, telefono, destino,adultos,ninos, fecha, fecha2, hora, observaciones } = citaObj;

    // Validar
    if (nombre === '' || correo === '' || telefono === '' || destino === '' || adultos === '' || ninos === ''|| fecha === '' || fecha2 === '' || hora === '' || observaciones === '') {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')
        return;
    }

    if (editando) {
        // Estamos editando
        administrarCitas.editarCita({ ...citaObj });

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();

        // Añade la nueva cita
        administrarCitas.agregarCita({ ...citaObj });

        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se agregó correctamente')
    }

    // Guardar en LocalStorage
    localStorage.setItem('citas', JSON.stringify(administrarCitas.citas));

    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);

    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

}

function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.nombre = '';
    citaObj.correo = '';
    citaObj.telefono = '';
    citaObj.destino='';
    citaObj.adultos='';
    citaObj.ninos='';
    citaObj.fecha = '';
    citaObj.fecha2 = '';
    citaObj.hora = '';
    citaObj.observaciones = '';
}


function eliminarCita(id) {
    administrarCitas.eliminarCita(id);
    localStorage.setItem('citas', JSON.stringify(administrarCitas.citas));
    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita) {

    const { nombre, correo, telefono,destino,adultos,ninos,fecha, fecha2, hora, observaciones, id } = cita;

    // Reiniciar el objeto
    citaObj.nombre = nombre;
    citaObj.correo = correo;
    citaObj.telefono = telefono;
    citaObj.destino =destino;
    citaObj.adultos=adultos;
    citaObj.ninos=ninos;
    citaObj.fecha = fecha;
    citaObj.fecha2 = fecha2;
    citaObj.hora = hora;
    citaObj.observaciones = observaciones;
    citaObj.id = id;

    // Llenar los Inputs
    nombreInput.value = nombre;
    correoInput.value = correo;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    fecha2Input.value = fecha2;
    horaInput.value = hora;
    observacionesInput.value = observaciones;

    //llenar los selects
    destinoSelect.value=destino;
    adultosSelect.value=adultos;
    ninosSelect.value=ninos;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}

// Obtener las citas del localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('citas')) {
        administrarCitas.citas = JSON.parse(localStorage.getItem('citas'));
        ui.imprimirCitas(administrarCitas);
    }
});
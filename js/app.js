//variables
const listaCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let carritoDeCompras = [];


//event listeners

listaCursos.addEventListener('click', agregarCurso);
carrito.addEventListener('click', eliminarCurso);
vaciarCarrito.addEventListener('click', vaciar);


//funciones

function vaciar() {
    carritoDeCompras = [];
    limpiarHTML();
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-carrito')) {
        const existe = carritoDeCompras.find(element => `borrar${element.id}` === e.target.id);
        if (existe.cantidad > 1) {
            existe.cantidad--;
            document.querySelector(`#und${existe.id}`).innerHTML = `<td id="und${existe.id}">${existe.cantidad}</td>`;
            return;
        } 
            carritoDeCompras = carritoDeCompras.filter(element => `borrar${element.id}` !== e.target.id);
            carritoHTML();
            console.log(carritoDeCompras)
        

    }

}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        obtenerDatosDelCurso(cursoSeleccionado);
    }
}

function obtenerDatosDelCurso(curso) {
    const infoDelCurso = {
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        imagen: curso.querySelector('.card img').src,
        cantidad: 1,
        id: curso.querySelector('a').getAttribute('data-id'),
    }


    const existe = carritoDeCompras.find(element => element.id === infoDelCurso.id);
    if (existe) {
        existe.cantidad++;
        document.querySelector(`#und${existe.id}`).innerHTML = `<td id="und${existe.id}">${existe.cantidad}</td>`;
    } else {
        carritoDeCompras = [...carritoDeCompras, infoDelCurso];
        carritoHTML();
    }
}


function carritoHTML() {
    limpiarHTML();
    carritoDeCompras.forEach(element => {
        const cursoEnCarrito = document.createElement('tr');
        cursoEnCarrito.innerHTML = `
        <td><img src="${element.imagen}" width="100"></td>
        <td>${element.nombre}</td>
        <td>${element.precio}</td>
        <td id="und${element.id}">${element.cantidad}</td>
        <td><a id="borrar${element.id}" class="borrar-carrito">X</a></td>
        `;

        listaCarrito.appendChild(cursoEnCarrito);
    })
}

function limpiarHTML() {
    listaCarrito.innerHTML = "";
}
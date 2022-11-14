const contenedorCarrito = document.querySelector('#carrito tbody');
const carrito = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let carritoDeCompras = [];

cargarEventos();
function cargarEventos() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', () => {
        carritoDeCompras = [];
        limpiarHTML();
    });
}




//Funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-carrito')) {
        const eliminar = e.target.getAttribute('id');
        carritoDeCompras = carritoDeCompras.filter(element => element.id !== eliminar);
        carritoHTML();
    }
}


function leerDatosCurso(curso) {
    const infoCurso = {
        titulo: curso.querySelector('h4').textContent,
        imagen: curso.querySelector('img').src,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = carritoDeCompras.find(element => element.id === infoCurso.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carritoDeCompras.push(infoCurso);

    }


    carritoHTML();

}

function carritoHTML() {
    limpiarHTML();
    carritoDeCompras.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${curso.imagen}" width="100"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><a id="${curso.id}" class="borrar-carrito">X</a></td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    contenedorCarrito.innerHTML = "";
}
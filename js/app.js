//variables
const listaCursos = document.querySelector('#lista-cursos');
const carritoContenedor = document.querySelector('#carrito tbody');
const vistaCarrito = document.querySelector('#carrito');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito = [];

//eventos
listaCursos.addEventListener('click', leerCurso);
vistaCarrito.addEventListener('click', eliminarProducto);
btnVaciarCarrito.addEventListener('click', () => {
    carrito = [];
    limpiarHTML();
});

//funciones

function eliminarProducto(e) {
    if(e.target.classList.contains('btn-eliminar')) {
       const eliminar = e.target.parentElement;
       const eliminarId = eliminar.querySelector('button').getAttribute('id');

       
     
            carrito = carrito.filter(element => element.id !== eliminarId);
            eliminar.remove();
     
        
        
    }
}   

function leerCurso(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')) {
        agregarAlCarrito(e.target.parentElement.parentElement);
    }
}

function agregarAlCarrito(curso) {
    //creamos el objeto curso
    const infoCurso = {
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        img: curso.querySelector('img').src,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    limpiarHTML();

    
    
    const existe = carrito.find(element => element.id === infoCurso.id);
    
    if(existe) {
        existe.cantidad++;
    }else {
        carrito = [...carrito, infoCurso];
        
    }
    
    mostrarCarrito();
}

function mostrarCarrito() {
    carrito.forEach(element => {
        const producto = document.createElement('tr');
        producto.innerHTML = `
        <td><img src="${element.img}" width="100"></td>
        <td>${element.nombre}</td>
        <td>${element.precio}</td>
        <td>${element.cantidad}</td>
        <button id="${element.id}" class="btn-eliminar">Eliminar</button>
        `;

        carritoContenedor.appendChild(producto);

        
    });
}



function limpiarHTML() {
    carritoContenedor.innerHTML = "";
}
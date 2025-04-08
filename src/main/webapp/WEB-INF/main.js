// Total del carrito
var total = 0;
// Productos iniciales a comprar del carrito
var carrito = [["Teléfono", 300], ["Ordenador", 700], ["Reloj", 75]];
var paraComprar = [];
// Estado del IVA
var ivaActivo = false;
// Inicializa la lista de productos
escribir();

// Función para añadir los productos en el carrito
function escribir() {
    const listaEscribir = document.getElementById("lista");
    const seleccionable = document.getElementById("desplegable");
    const valorAc = seleccionable.value;
    listaEscribir.innerHTML = "";
    seleccionable.innerHTML = "";

    carrito.forEach(function(producto) {
        let linea = document.createElement("option");
        linea.setAttribute("value", producto[0].toLowerCase());
        linea.innerHTML = producto[0];
        seleccionable.appendChild(linea);
    });

    paraComprar.forEach(function(producto) {
        let linea = document.createElement("li");
        linea.innerHTML = producto[0] + ": " + producto[1] + " uds";
        listaEscribir.appendChild(linea);
    });

    // Mantiene la selección actual
    seleccionable.value = valorAc;
    calcularTotal();
}

// Función para agregar un nuevo producto a nuestra lista de la compra
function agregarProducto() {
    let nombre = document.getElementById("nombre").value.trim();
    let precio = parseFloat(document.getElementById("coste").value);

    if (!nombre) {
        alert("Ponle un nombre al producto");
        return;
    }
    if (isNaN(precio) || precio <= 0) {
        alert("Ponle un precio al producto");
        return;
    }

    precio = parseFloat(precio.toFixed(2));
    // Agregar producto al carrito
    carrito.push([nombre, precio]);
    escribir();
}

// Función para comprar un producto
function comprar() {
    const productoComprar = document.getElementById("desplegable").value.toLowerCase();
    const cantidad = Math.round(Number(document.getElementById("cuantos").value)); 
    if (cantidad <= 0) {
        alert("Selecciona una cantidad mayor a 0");
        return;
    }

    let cambio = false;
    for (let i = 0; i < paraComprar.length; i++) {
        if (paraComprar[i][0].toLowerCase() === productoComprar) {
            paraComprar[i][1] += cantidad;
            cambio = true;
        }
    }
    if (!cambio) {
        paraComprar.push([productoComprar, cantidad]);
    }
    escribir();
}

// Función para calcular el total
function calcularTotal() {
    total = 0;
    paraComprar.forEach(producto => {
        carrito.forEach(valor => {
            if (valor[0].toLowerCase() === producto[0]) {
                total += producto[1] * valor[1];
            }
        });
    });

    // Mostrar total redondeado a 2 decimales
    document.getElementById("costeFinal").innerHTML = total.toFixed(2) + "€"; 

    // Si el IVA está activo, calcular el total con IVA
    if (ivaActivo) {
        const totalConIVA = total * 1.21; 
        document.getElementById("costeFinal").innerHTML = totalConIVA.toFixed(2) + "€ (con IVA)";
    }
}

// Función para quitar un producto del carrito
function quitarCompra() {
    const productoQuitar = document.getElementById("desplegable").value.toLowerCase();
    let cambio = false;
    paraComprar = paraComprar.filter(producto => {
        if (producto[0].toLowerCase() !== productoQuitar) {
            return producto;
        } else {
            cambio = true;
        }
    });

    if (!cambio) {
        alert("Ese producto no estaba en la lista");
    }
    escribir();
}

// Función para restar cantidad de un producto
function restarCompra() {
    const productoComprar = document.getElementById("desplegable").value.toLowerCase();
    const cantidad = Math.round(Number(document.getElementById("cuantos").value)); 

    if (cantidad <= 0) {
        alert("No es posible restar una cantidad menor o igual a cero.");
        return;
    }

    let cambio = false;

    for (let i = 0; i < paraComprar.length; i++) {
        if (paraComprar[i][0].toLowerCase() === productoComprar) {
            paraComprar[i][1] -= cantidad;
            cambio = true;

            if (paraComprar[i][1] <= 0) {
                paraComprar.splice(i, 1);
            }
            break;
        }
    }

    if (!cambio) {
        alert("No hay ese producto en el carro.");
    }

    escribir();
}

// Función para enviar el carrito
function envio() {
    if (paraComprar.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Solicitar confirmación al usuario
    let confirmacion = prompt("Escribe 'comprar' para confirmar la compra:");
    if (confirmacion !== "comprar") {
        alert("Compra cancelada.");
        return;
    }

    // Limpiar el carrito
    paraComprar = [];
    let dia = new Date();
    dia.setDate(dia.getDate() + 1);

    // Si el día siguiente es domingo, reprogramar para el lunes
    if (dia.getDay() === 0) { 
        dia.setDate(dia.getDate() + 1); 
    }

    alert("Fecha estimada de envío: " + dia.toLocaleString());
    escribir();
}

// Función para aplicar o quitar IVA
function iva() {
    if (paraComprar.length === 0) {
        alert("El carrito se encuentra vacío.");
        return;
    }

    ivaActivo = !ivaActivo; 
    calcularTotal(); 
    escribir();
}

// Función para validar el nombre del producto
function validarNombre() {
    const nombreInput = document.getElementById("nombre");
    const regex = /^[a-zA-Z\s]*$/; 
    if (!regex.test(nombreInput.value)) {
        nombreInput.value = nombreInput.value.replace(/[^a-zA-Z\s]/g, ''); 
    }
}

// Función para redondear la cantidad
function redondearCantidad() {
    const cantidadInput = document.getElementById("cuantos");
    cantidadInput.value = Math.round(cantidadInput.value);
}

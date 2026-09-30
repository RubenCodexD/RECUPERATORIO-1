let contactos = [];

const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btnAgregar");
const buscador = document.getElementById("buscador");
const listaContactos = document.getElementById("listaContactos");
const contador = document.getElementById("contador");

//funcion de renderizado 

function renderizarContactos(filtro = "") {
  listaContactos.innerHTML = "";

  const textoFiltro = filtro.toLowerCase().trim();

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(textoFiltro)
  );

  if (contactosFiltrados.length === 0) {
    const li = document.createElement("li");
    li.className = "mensaje-vacio";
    li.textContent =
      contactos.length === 0
        ? "Todavía no agregaste contactos."
        : "No se encontraron contactos con ese nombre.";
    listaContactos.appendChild(li);
    return;
  }

  // Crear dinámicamente cada elemento de la lista
  contactosFiltrados.forEach((contacto) => {
    const li = document.createElement("li");

    // Contenedor de información
    const infoDiv = document.createElement("div");
    infoDiv.className = "contacto-info";

    const nombreSpan = document.createElement("span");
    nombreSpan.className = "contacto-nombre";
    nombreSpan.textContent = contacto.nombre;

    const telefonoSpan = document.createElement("span");
    telefonoSpan.className = "contacto-telefono";
    telefonoSpan.textContent = contacto.telefono;

    infoDiv.appendChild(nombreSpan);
    infoDiv.appendChild(telefonoSpan);

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btnEliminar";
    btnEliminar.textContent = "Eliminar";

    // Event listener por cada botón de eliminar
    btnEliminar.addEventListener("click", () => {
      eliminarContacto(contacto.id);
    });

    li.appendChild(infoDiv);
    li.appendChild(btnEliminar);

    listaContactos.appendChild(li);
  });
}

function actualizarContador() {
  contador.textContent = contactos.length;
}
//funcion agregar contacto

function agregarContacto() {
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  if (nombre === "" || telefono === "") {
    alert("Debes completar ambos campos: nombre y teléfono.");
    return;
  }

  // Crear objeto contacto y agregarlo al arreglo
  const nuevoContacto = {
    id: Date.now(), // identificador único
    nombre: nombre,
    telefono: telefono,
  };

  contactos.push(nuevoContacto);

  // Limpiar inputs
  inputNombre.value = "";
  inputTelefono.value = "";
  inputNombre.focus();

  // Actualizar vista
  renderizarContactos(buscador.value);
  actualizarContador();
}


function eliminarContacto(id) {
  contactos = contactos.filter((contacto) => contacto.id !== id);

  renderizarContactos(buscador.value);
  actualizarContador();
}


// Botón agregar
btnAgregar.addEventListener("click", agregarContacto);


inputNombre.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarContacto();
});

inputTelefono.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarContacto();
});

//buscador
buscador.addEventListener("input", (e) => {
  renderizarContactos(e.target.value);
  
});
// llamada a las funciones
renderizarContactos();
actualizarContador();
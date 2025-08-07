// Verificar si hay sesión activa
if (localStorage.getItem("usuarioLogueado") !== "true") {
  window.location.href = "index.html";
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "index.html";
}

// API base
const API_URL = "http://localhost:3000/api/productos";

// Función para obtener productos desde la base de datos
async function obtenerProductos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
}

// Función para renderizar productos por categoría
async function renderizarInventario() {
  const productos = await obtenerProductos();

  renderizarPorCategoria(productos, "sabores", "tabla-sabores");
  renderizarPorCategoria(productos, "toppings", "tabla-toppings");
  renderizarPorCategoria(productos, "materias primas", "tabla-materias");
}

function renderizarPorCategoria(productos, categoria, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  const filtrados = productos.filter(p => p.categoria === categoria);

  const tabla = document.createElement("table");

  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      ${filtrados.map(p => `
        <tr>
          <td>${p.nombre}</td>
          <td>${p.stock}</td>
          <td>${p.precio} ${p.precio === 1 ? 'unidad' : 'unidades'}</td>
          <td>
            <button onclick="editar(${p.id}, '${p.nombre}', '${p.categoria}', ${p.precio}, ${p.stock})">Editar</button>
            <button onclick="eliminar(${p.id})">Eliminar</button>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `;

  contenedor.appendChild(tabla);
}

// Función para agregar insumo
document.getElementById("form-agregar").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const unidad = document.getElementById("unidad").value.trim();
  const categoria = document.getElementById("categoria").value;

  if (!nombre || !cantidad || !unidad || !categoria) {
    return alert("Todos los campos son obligatorios");
  }

  const nuevo = {
    nombre,
    categoria,
    precio: unidad, // usamos el campo 'precio' como unidad temporal
    stock: cantidad
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevo)
  });

  if (res.ok) {
    alert("✅ Insumo agregado correctamente");
    document.getElementById("form-agregar").reset();
    renderizarInventario();
  } else {
    alert("❌ Error al agregar insumo");
  }
});

// Eliminar producto
async function eliminar(id) {
  const confirmar = confirm("¿Estás seguro de eliminar este insumo?");
  if (!confirmar) return;

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    alert("🗑️ Insumo eliminado correctamente");
    renderizarInventario();
  } else {
    alert("❌ Error al eliminar");
  }
}

// Guardar índice del producto que se va a editar
let idProductoEditar = null;

// Función para mostrar el modal de edición
function editar(id, nombre, categoria, precio, stock) {
  idProductoEditar = id;
  document.getElementById("editar-nombre").value = nombre;
  document.getElementById("editar-cantidad").value = stock;
  document.getElementById("editar-unidad").value = precio;
  document.getElementById("editar-categoria").value = categoria;

  document.getElementById("modal-editar").style.display = "flex";
}

// Cerrar modal
function cerrarModal() {
  document.getElementById("modal-editar").style.display = "none";
}

// Guardar edición
document.getElementById("form-editar").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("editar-nombre").value.trim();
  const cantidad = parseInt(document.getElementById("editar-cantidad").value);
  const unidad = document.getElementById("editar-unidad").value.trim();
  const categoria = document.getElementById("editar-categoria").value;

  const actualizado = {
    nombre,
    categoria,
    precio: unidad,
    stock: cantidad
  };

  const res = await fetch(`${API_URL}/${idProductoEditar}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actualizado)
  });

  if (res.ok) {
    alert("✏️ Insumo actualizado correctamente");
    cerrarModal();
    renderizarInventario();
  } else {
    alert("❌ Error al actualizar");
  }
});

// Renderizar inventario al cargar
renderizarInventario();

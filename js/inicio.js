function guardarNombre() {
  const nombre = document.getElementById("nombreCliente").value.trim();
  if (nombre === "") {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  localStorage.setItem("nombreCliente", nombre);
  window.location.href = "tamaño.html"; // Redirige al siguiente paso
}

function cancelarPedido() {
  window.location.href = "dashboard.html";
}

function irAtras() {
  window.history.back();
}

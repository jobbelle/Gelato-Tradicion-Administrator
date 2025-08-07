// Verificamos si el usuario está logueado
if (localStorage.getItem("usuarioLogueado") !== "true") {
    window.location.href = "index.html";
  }
  
  // Función para cerrar sesión
  function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "index.html";
  }
  
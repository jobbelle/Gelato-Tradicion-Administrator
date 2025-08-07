function login() {
    const userField = document.getElementById("usuario");
    const passField = document.getElementById("password");
  
    if (!userField || !passField) {
      alert("Error: los campos no existen.");
      return;
    }
  
    const usuario = userField.value;
    const password = passField.value;
  
    if (usuario && password) {
      localStorage.setItem("usuarioLogueado", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Por favor, completa todos los campos.");
    }
  }
  
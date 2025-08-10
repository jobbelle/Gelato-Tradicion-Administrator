document.addEventListener('DOMContentLoaded', () => {
  const btnComenzar = document.getElementById('btnComenzar');
  const nombreClienteInput = document.getElementById('nombreCliente');

  btnComenzar.addEventListener('click', async () => {
    const nombre = nombreClienteInput.value.trim();

    if (!nombre) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }

    try {
      // Guardar nombre en la base de datos y obtener el ID del pedido
      const response = await fetch('/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
      });

      const data = await response.json();

      if (data.id_pedido) {
        // Guardar el ID del pedido en localStorage para usarlo después
        localStorage.setItem('id_pedido', data.id_pedido);
        // Redirigir a la pantalla de tamaño
        window.location.href = 'tamano.html';
      } else {
        alert('No se pudo iniciar el pedido.');
      }
    } catch (error) {
      console.error('Error al iniciar pedido:', error);
      alert('Hubo un problema al conectar con el servidor.');
    }
  });

  // Botones inferiores
  document.getElementById('btnCancelar').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  document.getElementById('btnAtras').addEventListener('click', () => {
    window.history.back();
  });
});

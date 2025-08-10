function seleccionarTamano(tamano) {
  const id_pedido = localStorage.getItem('id_pedido');

  if (!id_pedido) {
    alert('No se encontró el pedido. Vuelve al inicio.');
    window.location.href = '/inicio.html';
    return;
  }

  let bolas = 0;
  let toppings = 0;

  if (tamano === 'pequeno') { bolas = 1; toppings = 1; }
  else if (tamano === 'mediano') { bolas = 2; toppings = 2; }
  else if (tamano === 'grande') { bolas = 3; toppings = 3; }

  // Guardar límites para siguientes pantallas
  localStorage.setItem('bolasPermitidas', bolas);
  localStorage.setItem('toppingsPermitidos', toppings);

  fetch('/api/pedido/tamano', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_pedido, tamano, bolas, toppings })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.message);
    window.location.href = '/sabores.html';
  })
  .catch(err => console.error('Error:', err));
}

function irAtras() { window.history.back(); }
function irCancelar() { window.location.href = '/index.html'; }

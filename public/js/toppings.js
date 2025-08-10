const id_pedido = localStorage.getItem('id_pedido');
const toppingsPermitidos = parseInt(localStorage.getItem('toppingsPermitidos')) || 0;
let toppingsSeleccionados = [];

function toggleSeleccionVisual(el) {
  if (!el) return;
  el.classList.toggle('seleccionado');
}

function seleccionarTopping(nombre) {
  if (!id_pedido) {
    alert('No se encontró el pedido. Vuelve al inicio.');
    window.location.href = '/inicio.html';
    return;
  }

  if (toppingsPermitidos === 0) {
    window.location.href = '/resumen.html';
    return;
  }

  const ev = window.event;
  const card = ev?.currentTarget || ev?.target;

  if (toppingsSeleccionados.includes(nombre)) {
    toppingsSeleccionados = toppingsSeleccionados.filter(t => t !== nombre);
    toggleSeleccionVisual(card);
  } else {
    if (toppingsSeleccionados.length >= toppingsPermitidos) {
      alert(`Solo puedes seleccionar ${toppingsPermitidos} topping(s).`);
      return;
    }
    toppingsSeleccionados.push(nombre);
    toggleSeleccionVisual(card);
  }

  if (toppingsSeleccionados.length === toppingsPermitidos) {
    guardarToppings();
  }
}

function guardarToppings() {
  fetch('/api/pedido/toppings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_pedido, toppings: toppingsSeleccionados })
  })
  .then(async (res) => {
    const data = await res.json();
    console.log('↩︎ /api/pedido/toppings =>', res.status, data);

    if (!res.ok) throw new Error(data.error || 'Error al guardar toppings');

    localStorage.setItem('toppingsSeleccionados', JSON.stringify(toppingsSeleccionados));
    window.location.href = '/resumen.html';
  })
  .catch(err => {
    console.error('Error guardando toppings:', err);
    alert('Hubo un problema guardando los toppings. Revisa la consola.');
  });
}

function irAtras() { window.history.back(); }
function irCancelar() { localStorage.clear(); window.location.href = '/index.html'; }

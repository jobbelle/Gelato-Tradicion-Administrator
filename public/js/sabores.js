console.log('✅ Cargó sabores.js');

let bolasPermitidas = parseInt(localStorage.getItem('bolasPermitidas')) || 0;
let saboresSeleccionados = [];
let id_pedido = localStorage.getItem('id_pedido');

function seleccionarSabor(sabor) {
  if (saboresSeleccionados.includes(sabor)) {
    saboresSeleccionados = saboresSeleccionados.filter(s => s !== sabor);
  } else {
    if (saboresSeleccionados.length >= bolasPermitidas) {
      alert(`Solo puedes seleccionar ${bolasPermitidas} sabor(es).`);
      return;
    }
    saboresSeleccionados.push(sabor);
  }

  console.log('Sabores seleccionados:', saboresSeleccionados);

  if (saboresSeleccionados.length === bolasPermitidas) {
    guardarSabores();
  }
}

function guardarSabores() {
  fetch('/api/pedido/sabores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_pedido, sabores: saboresSeleccionados })
  })
  .then(async res => {
    const data = await res.json();
    console.log('↩︎ /api/pedido/sabores =>', res.status, data);

    if (!res.ok) throw new Error(data.error || 'Error al guardar sabores');

    localStorage.setItem('saboresSeleccionados', JSON.stringify(saboresSeleccionados));
    window.location.href = '/toppings.html';
  })
  .catch(err => {
    console.error('❌ Error en guardarSabores():', err);
    alert('Hubo un problema guardando los sabores. Revisa la consola.');
  });
}

function irAtras() { window.history.back(); }
function irCancelar() { localStorage.clear(); window.location.href = '/index.html'; }

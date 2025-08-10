// === Config rápida ===
// Si tu dashboard se llama distinto, cámbialo aquí:
const DASHBOARD_URL = '/inicio.html'; // por ejemplo: '/venta.html' o '/dashboard.html'

document.addEventListener('DOMContentLoaded', async () => {
  const id_pedido = localStorage.getItem('id_pedido');
  if (!id_pedido) {
    alert('No se encontró un pedido activo. Volviendo al inicio.');
    window.location.href = DASHBOARD_URL;
    return;
  }

  try {
    const res = await fetch(`/api/pedido/${id_pedido}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error obteniendo el pedido');

    // Rellenar cabecera
    document.getElementById('r-nombre').textContent = data.nombre_cliente ?? '—';
    document.getElementById('r-tamano').textContent = data.tamano_vaso ?? '—';

    // Sabores y toppings
    pintarChips('r-sabores', normalizarLista(data.sabores));
    pintarChips('r-toppings', normalizarLista(data.toppings_detalle));
  } catch (err) {
    console.error('Error cargando resumen:', err);
    alert('No se pudo cargar el resumen. Volviendo al inicio.');
    window.location.href = DASHBOARD_URL;
  }

  // Botones
  document.getElementById('btnVolver').addEventListener('click', () => {
    // Si prefieres, puedes enviar también al dashboard:
    window.history.back();
    // window.location.href = DASHBOARD_URL;
  });

  document.getElementById('btnConfirmar').addEventListener('click', () => {
    // Aquí podrías llamar a /api/pedido/confirmar si más adelante agregas estado.
    localStorage.clear();
    alert('¡Pedido confirmado! ✅');
    window.location.href = DASHBOARD_URL; // ← ahora va al dashboard de inicio de pedidos
  });
});

/** Utils */
function normalizarLista(cadena) {
  if (!cadena) return [];
  return String(cadena).split(',').map(x => x.trim()).filter(Boolean);
}

function pintarChips(idContenedor, items) {
  const cont = document.getElementById(idContenedor);
  cont.innerHTML = '';
  if (!items.length) {
    cont.textContent = '—';
    return;
  }
  items.forEach(txt => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = txt;
    cont.appendChild(span);
  });
}

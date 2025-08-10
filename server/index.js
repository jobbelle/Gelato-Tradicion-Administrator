const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

/* ======================= MIDDLEWARE ======================= */
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

/* ======================= CONEXIÓN BD ======================= */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',        // Cambia si tu MySQL tiene contraseña
  database: 'gelato_db',
  port: 3307           // Ajusta si tu MySQL usa otro puerto
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos MySQL');
});

/* ======================= RUTA PRINCIPAL ======================= */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/* ======================= PRODUCTOS ======================= */
// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

// Agregar producto
app.post('/api/productos', (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;
  const sql = 'INSERT INTO productos (nombre, categoria, precio, stock) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, categoria, precio, stock], (err, result) => {
    if (err) {
      console.error('Error al agregar producto:', err);
      return res.status(500).json({ error: 'Error al agregar producto' });
    }
    res.json({ message: 'Producto agregado exitosamente', id: result.insertId });
  });
});

// Actualizar producto
app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, precio, stock } = req.body;
  const sql = 'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, stock = ? WHERE id = ?';
  db.query(sql, [nombre, categoria, precio, stock, id], (err) => {
    if (err) {
      console.error('Error al actualizar producto:', err);
      return res.status(500).json({ error: 'Error al actualizar producto' });
    }
    res.json({ message: 'Producto actualizado exitosamente' });
  });
});

// Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM productos WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  });
});

// Obtener producto por ID
app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM productos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener producto:', err);
      return res.status(500).json({ error: 'Error al obtener producto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
});

/* ======================= PEDIDOS ======================= */
// Crear pedido con nombre del cliente
app.post('/api/pedido', (req, res) => {
  const { nombre } = req.body;
  const sql = 'INSERT INTO pedido1 (nombre_cliente) VALUES (?)';
  db.query(sql, [nombre], (err, result) => {
    if (err) {
      console.error('Error al crear pedido:', err);
      return res.status(500).json({ error: 'Error al crear pedido' });
    }
    res.json({ id_pedido: result.insertId });
  });
});

// Actualizar tamaño, bolas y toppings permitidos en un pedido
app.post('/api/pedido/tamano', (req, res) => {
  const { id_pedido, tamano, bolas, toppings } = req.body;
  const sql = 'UPDATE pedido1 SET tamano_vaso = ?, bolas = ?, toppings = ? WHERE id = ?';
  db.query(sql, [tamano, bolas, toppings, id_pedido], (err) => {
    if (err) {
      console.error('Error al actualizar tamaño:', err);
      return res.status(500).json({ error: 'Error al actualizar tamaño' });
    }
    res.json({ message: 'Tamaño actualizado correctamente' });
  });
});

// Guardar sabores y actualizar pedido + tabla bolas (con fallback y logs)
app.post('/api/pedido/sabores', (req, res) => {
  const { id_pedido, sabores } = req.body;
  console.log('POST /api/pedido/sabores body =>', req.body);

  if (!id_pedido || !Array.isArray(sabores) || sabores.length === 0) {
    return res.status(400).json({ error: 'Datos inválidos: id_pedido o sabores' });
  }

  const sqlUpdatePedido = 'UPDATE pedido1 SET sabores = ? WHERE id = ?';
  db.query(sqlUpdatePedido, [sabores.join(', '), id_pedido], (err) => {
    if (err) {
      console.error('Error al actualizar pedido (sabores):', err);
      return res.status(500).json({ error: 'Error al actualizar pedido' });
    }

    const values = sabores.map(s => [id_pedido, s]);

    // Intento A: (pedido_id, sabor)
    let insertSql = 'INSERT INTO bolas (pedido_id, sabor) VALUES ?';
    db.query(insertSql, [values], (errA) => {
      if (!errA) {
        console.log('✅ Sabores insertados en bolas (pedido_id, sabor)');
        return res.json({ message: 'Sabores guardados correctamente' });
      }

      // Fallback B: (id_pedido, nombre_sabor)
      if (errA.code === 'ER_BAD_FIELD_ERROR') {
        insertSql = 'INSERT INTO bolas (id_pedido, nombre_sabor) VALUES ?';
        db.query(insertSql, [values], (errB) => {
          if (errB) {
            console.error('Error al insertar bolas (fallback):', errB);
            return res.status(500).json({ error: 'Error al insertar bolas' });
          }
          console.log('✅ Sabores insertados en bolas (id_pedido, nombre_sabor) [fallback]');
          return res.json({ message: 'Sabores guardados correctamente' });
        });
      } else {
        console.error('Error al insertar bolas:', errA);
        return res.status(500).json({ error: 'Error al insertar bolas' });
      }
    });
  });
});

// Guardar toppings y actualizar pedido + tabla toppings (con fallback y logs)
app.post('/api/pedido/toppings', (req, res) => {
  const { id_pedido, toppings } = req.body;
  console.log('POST /api/pedido/toppings body =>', req.body);

  if (!id_pedido || !Array.isArray(toppings) || toppings.length === 0) {
    return res.status(400).json({ error: 'Datos inválidos: id_pedido o toppings' });
  }

  const sqlUpdate = 'UPDATE pedido1 SET toppings_detalle = ? WHERE id = ?';
  db.query(sqlUpdate, [toppings.join(', '), id_pedido], (err) => {
    if (err) {
      console.error('Error al actualizar pedido (toppings):', err);
      return res.status(500).json({ error: 'Error al actualizar pedido' });
    }

    const values = toppings.map(t => [id_pedido, t]);

    // Intento A: (pedido_id, nombre_topping)
    let insertSql = 'INSERT INTO toppings (pedido_id, nombre_topping) VALUES ?';
    db.query(insertSql, [values], (errA) => {
      if (!errA) {
        console.log('✅ Toppings insertados (pedido_id, nombre_topping)');
        return res.json({ message: 'Toppings guardados correctamente' });
      }

      // Fallback B: (id_pedido, topping)
      if (errA.code === 'ER_BAD_FIELD_ERROR') {
        insertSql = 'INSERT INTO toppings (id_pedido, topping) VALUES ?';
        db.query(insertSql, [values], (errB) => {
          if (errB) {
            console.error('Error al insertar toppings (fallback):', errB);
            return res.status(500).json({ error: 'Error al insertar toppings' });
          }
          console.log('✅ Toppings insertados (id_pedido, topping) [fallback]');
          return res.json({ message: 'Toppings guardados correctamente' });
        });
      } else {
        console.error('Error al insertar toppings:', errA);
        return res.status(500).json({ error: 'Error al insertar toppings' });
      }
    });
  });
});

// Resumen del pedido (para resumen.html)
app.get('/api/pedido/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT id, nombre_cliente, tamano_vaso, bolas, toppings, sabores, toppings_detalle
    FROM pedido1
    WHERE id = ?
  `;
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener pedido' });
    if (!rows.length) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(rows[0]);
  });
});

/* ======================= INICIAR SERVIDOR ======================= */
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});

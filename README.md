
# 🍨 Gelato & Tradición - Sistema de Pedidos

Este es un sistema web desarrollado para gestionar pedidos de helados en la aplicación **Gelato & Tradición**, permitiendo registrar clientes, seleccionar tamaños, sabores, toppings y confirmar pedidos.

## 🚀 Tecnologías Utilizadas
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js con Express
- **Base de Datos**: MySQL
- **Control de Versiones**: Git y GitHub

## 📌 Funcionalidades
1. **Registro de pedido** con nombre del cliente.
2. **Selección de tamaño** con control de número de bolas y toppings.
3. **Selección de sabores** según el tamaño elegido.
4. **Selección de toppings** con validación de cantidad.
5. **Pantalla de resumen** para confirmar el pedido.
6. **Registro en base de datos** para control y estadísticas.

## 📂 Estructura del Proyecto
```
/public
   ├── index.html
   ├── inicio.html
   ├── tamano.html
   ├── sabores.html
   ├── toppings.html
   ├── resumen.html
   ├── css/
   ├── js/
/server
   ├── index.js
package.json
README.md
```

## ⚙️ Instalación y Configuración
1. **Clonar repositorio**
```bash
git clone https://github.com/jobbelle/Gelato-Tradicion-Administrator.git
cd gelato-tradicion
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar base de datos MySQL**
- Crear la base de datos `gelato_db`
- Importar el archivo SQL incluido (`gelato_db.sql`)
- Ajustar credenciales en `server/index.js`:
```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gelato_db',
  port: 3307
});
```

4. **Iniciar servidor**
```bash
node server/index.js
```
o con nodemon:
```bash
npx nodemon server/index.js
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🗄 Tablas de la Base de Datos
- **pedido1**: Información general del pedido.
- **bolas**: Sabores seleccionados.
- **toppings_detalle**: Toppings seleccionados.
- **productos**: Lista de productos disponibles.

## 👨‍💻 Autor
Desarrollado como parte de un proyecto del SENA.

---
📅 **Versión:** 1.0  
📌 **Licencia:** Libre para uso educativo.

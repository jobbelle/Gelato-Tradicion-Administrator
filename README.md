# 🍨 SENA - Gelato & Tradición

Aplicación web desarrollada como proyecto formativo para el SENA, enfocada en la gestión de inventario de productos de heladería y administración básica de insumos.  
El sistema está construido con **Node.js**, **Express**, **MySQL**, **HTML**, **CSS** y **JavaScript**.

---

## 📌 Características principales

- **Módulo de Inventario:** Permite agregar, editar y eliminar productos.
- **Base de datos MySQL:** Gestión de datos persistentes.
- **Interfaz web amigable:** Diseñada en HTML y CSS.
- **Servidor en Node.js:** API para conexión con la base de datos.
- **Estructura modular:** Separación entre frontend y backend.

---

## 📂 Estructura del proyecto

```
SENA-GELATO&TRADICION/
│
├── public/                # Archivos públicos (HTML, CSS, JS, imágenes)
│   ├── assets/             # Recursos gráficos
│   ├── Css/                # Hojas de estilo
│   ├── js/                 # Scripts de frontend
│   ├── admin.html
│   ├── index.html
│   ├── ...
│
├── server/                 # Backend con Node.js y Express
│   └── index.js
│
├── BaseDeDatos/            # Scripts SQL de creación de tablas
├── package.json
├── README.md
└── .gitignore
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/nombre-repo.git
```

### 2️⃣ Instalar dependencias
Desde la carpeta raíz del proyecto:
```bash
npm install
```

### 3️⃣ Configurar la base de datos
- Abrir **XAMPP** y asegurarse de que **MySQL** esté en el puerto `3307`.
- Crear la base de datos ejecutando en **phpMyAdmin**:
```sql
CREATE DATABASE gelato_db;

USE gelato_db;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    categoria VARCHAR(50),
    precio DECIMAL(10,2),
    stock INT
);
```

### 4️⃣ Iniciar el servidor
```bash
cd server
node index.js
```
Si todo está correcto, deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
✅ Conexión exitosa a la base de datos MySQL
```

---

## 🚀 Uso de la aplicación
1. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)  
2. Navegar por los módulos:
   - **Inventario:** gestión de productos.
   - **Administración:** control de insumos.
3. Guardar cambios y recargar la página para ver actualizaciones.

---

## 🛠 Tecnologías utilizadas
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Base de datos:** MySQL
- **Herramientas:** XAMPP, Git, VS Code

---

  
Proyecto formativo SENA - 2025  

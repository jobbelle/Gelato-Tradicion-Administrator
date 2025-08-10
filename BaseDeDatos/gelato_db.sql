-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307:3307
-- Tiempo de generación: 10-08-2025 a las 22:49:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gelato_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bolas`
--

CREATE TABLE `bolas` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `sabor` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bolas`
--

INSERT INTO `bolas` (`id`, `pedido_id`, `sabor`, `created_at`) VALUES
(1, 9, 'Sabor 4', '2025-08-10 19:19:27'),
(2, 10, 'Sabor 4', '2025-08-10 19:29:40'),
(3, 10, 'Sabor 10', '2025-08-10 19:29:40'),
(4, 11, 'Sabor 3', '2025-08-10 19:34:02'),
(5, 11, 'Sabor 11', '2025-08-10 19:34:02'),
(6, 12, 'Sabor 4', '2025-08-10 19:57:26'),
(7, 12, 'Sabor 10', '2025-08-10 19:57:26'),
(8, 13, 'Sabor 12', '2025-08-10 19:59:37'),
(9, 13, 'Sabor 4', '2025-08-10 19:59:37'),
(10, 15, 'Sabor 4', '2025-08-10 20:05:30'),
(11, 15, 'Sabor 10', '2025-08-10 20:05:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido1`
--

CREATE TABLE `pedido1` (
  `id` int(11) NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `tamano_vaso` enum('pequeno','mediano','grande') DEFAULT NULL,
  `bolas` int(11) DEFAULT NULL,
  `toppings` int(11) DEFAULT NULL,
  `sabores` text DEFAULT NULL,
  `toppings_detalle` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido1`
--

INSERT INTO `pedido1` (`id`, `nombre_cliente`, `tamano_vaso`, `bolas`, `toppings`, `sabores`, `toppings_detalle`, `fecha`) VALUES
(1, 'Camilo', NULL, NULL, NULL, NULL, NULL, '2025-08-10 03:12:28'),
(4, 'Tatiana', 'pequeno', 1, 1, NULL, NULL, '2025-08-10 04:20:04'),
(5, 'Andres', 'pequeno', 1, 1, NULL, NULL, '2025-08-10 04:58:21'),
(6, 'Maria', 'pequeno', 1, 1, NULL, NULL, '2025-08-10 05:08:05'),
(7, 'Mario', 'pequeno', 1, 1, NULL, NULL, '2025-08-10 05:14:13'),
(8, 'Rosario', 'pequeno', 1, 1, NULL, NULL, '2025-08-10 18:25:35'),
(9, 'Gilberto', 'pequeno', 1, 1, 'Sabor 4', 'Topping 3', '2025-08-10 19:14:51'),
(10, 'Brayan', 'mediano', 2, 2, 'Sabor 4, Sabor 10', NULL, '2025-08-10 19:29:34'),
(11, 'Natalia', 'mediano', 2, 2, 'Sabor 3, Sabor 11', 'Topping 5, Topping 10', '2025-08-10 19:33:55'),
(12, 'Maria', 'mediano', 2, 2, 'Sabor 4, Sabor 10', 'Topping 4, Topping 5', '2025-08-10 19:57:23'),
(13, 'Sneyder', 'mediano', 2, 2, 'Sabor 12, Sabor 4', 'Topping 12, Topping 5', '2025-08-10 19:59:34'),
(15, 'Andres', 'mediano', 2, 2, 'Sabor 4, Sabor 10', 'Topping 5, Topping 4', '2025-08-10 20:05:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `categoria`, `precio`, `stock`) VALUES
(1, 'Helado de Vainilla', 'sabores', 5.00, 5),
(2, 'Fresas', 'toppings', 3.00, 3),
(3, 'Azucar', 'materias primas', 5.00, 5),
(4, 'Helado Chicle', 'sabores', 5.00, 5),
(5, 'Leche', 'materias primas', 4.00, 4),
(6, 'Helado de Chocolate', 'Sabor', 6000.00, 12),
(8, 'Helado de frambuesa', 'Sabor', 6000.00, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `toppings`
--

CREATE TABLE `toppings` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `nombre_topping` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `toppings`
--

INSERT INTO `toppings` (`id`, `pedido_id`, `nombre_topping`, `created_at`) VALUES
(1, 9, 'Topping 3', '2025-08-10 19:19:30'),
(2, 11, 'Topping 5', '2025-08-10 19:34:06'),
(3, 11, 'Topping 10', '2025-08-10 19:34:06'),
(4, 12, 'Topping 4', '2025-08-10 19:57:27'),
(5, 12, 'Topping 5', '2025-08-10 19:57:27'),
(6, 13, 'Topping 12', '2025-08-10 19:59:39'),
(7, 13, 'Topping 5', '2025-08-10 19:59:39'),
(8, 15, 'Topping 5', '2025-08-10 20:05:31'),
(9, 15, 'Topping 4', '2025-08-10 20:05:31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bolas`
--
ALTER TABLE `bolas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`);

--
-- Indices de la tabla `pedido1`
--
ALTER TABLE `pedido1`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `toppings`
--
ALTER TABLE `toppings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bolas`
--
ALTER TABLE `bolas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pedido1`
--
ALTER TABLE `pedido1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bolas`
--
ALTER TABLE `bolas`
  ADD CONSTRAINT `bolas_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedido1` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `toppings`
--
ALTER TABLE `toppings`
  ADD CONSTRAINT `toppings_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedido1` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.0.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for f8_orders
CREATE DATABASE IF NOT EXISTS `f8_orders` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `f8_orders`;

-- Dumping structure for table f8_orders.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `province_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `province_id` (`province_id`),
  CONSTRAINT `customers_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.customers: ~16 rows (approximately)
REPLACE INTO `customers` (`id`, `name`, `email`, `password`, `status`, `province_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
	(1, 'hoang anaaaaa', 'hoangan@gmail.com', '123456', 0, 1, NULL, '2023-08-28 04:27:44', '2023-08-28 04:27:46'),
	(2, 'asdasdaasdad', 'asdasdaaaca@gmail.com', '123', 0, NULL, NULL, '2023-08-28 04:28:30', '2023-08-28 04:28:30'),
	(3, 'aaaaaaaaa', 'asca@gmail.com', '124124', 1, 3, NULL, '2023-08-28 04:31:20', '2023-08-28 04:31:21'),
	(4, 'c121caca', 'saca@gmai.com', '1234', 1, NULL, NULL, '2023-08-28 04:31:37', '2023-08-28 04:31:38'),
	(5, 'hoan ansadasdas', 'hoanan@gmail.com', '156', 1, 2, NULL, '2023-08-31 02:13:44', '2023-08-31 02:13:45'),
	(6, 'adascqw casas', 'hoang@gmail.com', '123', 0, NULL, NULL, '2023-08-31 02:16:00', '2023-08-31 02:16:01'),
	(8, 'hahaha', 'caa@gmail.com', '112', 1, 3, NULL, '2023-08-31 02:33:11', '2023-08-31 02:33:11'),
	(9, 'hieu222222', 'hieu@gmail.com', '111', 1, NULL, NULL, '2023-10-01 16:28:12', '2023-10-01 16:28:13'),
	(10, 'Hieu Nguyen', 'heuasadn@gmail.com', 'TTTasdas123@', 1, NULL, NULL, '2023-10-04 09:58:27', '2023-10-04 09:58:29'),
	(11, 'asdsadasdada asdasda', 'asdasonasdaosk@gmail.com', 'ASDasdojasnddas12321@#', 1, NULL, NULL, '2023-10-04 11:15:03', '2023-10-04 11:15:03'),
	(12, 'Hieu Nguyenhaaa', 'hiusnguyen201@gmail.com', '521020a42138ff23f1c62ebd07221cd4', 1, NULL, NULL, '2023-10-05 13:43:26', '2023-10-05 13:43:26'),
	(13, 'adascqwasdsa', 'admin@gmail.com', '5596d5f23739670317fe40e0d04f4400', 0, NULL, NULL, '2023-10-05 21:29:22', '2023-10-05 21:29:22'),
	(14, '111111111', 'nguyenvanaaaaa@gmail.com', 'ec3b29b23a27403d05c62cc145d7cbe2', 1, NULL, NULL, '2023-10-05 21:29:53', '2023-10-05 21:29:53'),
	(15, '2222222222222', '222222222222@gmail.com', '1fe485b6b21deae9cbc520abb01680ce', 1, NULL, NULL, '2023-10-05 21:30:16', '2023-10-05 21:30:16'),
	(16, 'hieusssssss', 'Hiusnguyen201ssssss@gmail.com', 'fabf0eeddd2c11f14b88c51e2a94a529', 1, NULL, NULL, '2023-10-05 21:30:51', '2023-10-05 21:30:51'),
	(17, 'asdasadaaa', 'hieu2222222222333@gmail.com', '6eb226aa60301d5e6d9cc242a7311d59', 0, NULL, '2023-10-05 21:38:29', '2023-10-05 21:32:43', '2023-10-05 21:32:43');

-- Dumping structure for table f8_orders.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` float NOT NULL,
  `status_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FOREIGN KEY` (`customer_id`,`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.orders: ~6 rows (approximately)
REPLACE INTO `orders` (`id`, `customer_id`, `quantity`, `total`, `status_id`, `created_at`, `updated_at`) VALUES
	(1, 1, 4, 300000, 3, '2023-08-31 02:39:02', '2023-08-31 02:39:03'),
	(2, 1, 30, 100000, 2, '2023-08-31 02:39:20', '2023-08-31 02:39:20'),
	(3, 1, 1, 50000, 3, '2023-08-31 02:39:35', '2023-08-31 02:39:36'),
	(4, 5, 23, 20000, 3, '2023-08-31 02:51:51', '2023-08-31 02:51:52'),
	(5, 6, 11, 30000, 1, '2023-08-31 02:52:08', '2023-08-31 02:52:09'),
	(18, 3, 23, 10000, 3, '2023-08-31 02:51:26', '2023-08-31 02:51:26');

-- Dumping structure for table f8_orders.order_details
CREATE TABLE IF NOT EXISTS `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FOREIGN KEY` (`product_id`,`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.order_details: ~2 rows (approximately)
REPLACE INTO `order_details` (`id`, `order_id`, `product_id`, `price`, `quantity`, `amount`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 150, 4, 123, '2023-08-31 03:37:55', '2023-08-31 03:37:56'),
	(2, 1, 2, 156, 2, 1111, '2023-08-31 03:41:50', '2023-08-31 03:41:51');

-- Dumping structure for table f8_orders.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `price` float DEFAULT 0,
  `thumbnail` varchar(150) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.products: ~3 rows (approximately)
REPLACE INTO `products` (`id`, `sku`, `name`, `description`, `price`, `thumbnail`, `category_id`, `created_at`, `updated_at`) VALUES
	(1, '1', 'product1', 'desc 1', 10, 'pic 1', 1, '2023-08-31 03:36:26', '2023-08-31 03:36:27'),
	(2, '2', 'product2', 'desc 2', 2, 'pic 2', 2, '2023-08-31 03:36:48', '2023-08-31 03:36:49'),
	(3, '3', 'product3', 'desc 3', 15, 'pic 3', 3, '2023-08-31 03:37:12', '2023-08-31 03:37:12');

-- Dumping structure for table f8_orders.product_categories
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.product_categories: ~3 rows (approximately)
REPLACE INTO `product_categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'Pants', '2023-08-31 03:35:28', '2023-08-31 03:35:28'),
	(2, 'Trousers', '2023-08-31 03:35:49', '2023-08-31 03:35:49'),
	(3, 'Athletic Wear', '2023-08-31 03:36:01', '2023-08-31 03:36:01');

-- Dumping structure for table f8_orders.province
CREATE TABLE IF NOT EXISTS `province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.province: ~3 rows (approximately)
REPLACE INTO `province` (`id`, `name`) VALUES
	(1, 'Hà Nội'),
	(2, 'Đà Nẵng'),
	(3, 'Hồ Chí Minh');

-- Dumping structure for table f8_orders.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.status: ~3 rows (approximately)
REPLACE INTO `status` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'Cho Xu Ly', '2023-08-31 02:34:49', '2023-08-31 02:34:50'),
	(2, 'Dang Xu Ly', '2023-08-31 02:35:01', '2023-08-31 02:35:02'),
	(3, 'Da Thanh Toan', '2023-08-31 02:35:15', '2023-08-31 02:35:15');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

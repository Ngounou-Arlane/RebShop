
-- Listage de la structure de table rebshop. cart
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table rebshop.cart : ~62 rows (environ)
INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`) VALUES
	(2, 2, 7, 1),
	(3, 1, 10, 66),
	(4, 3, 15, 1),
	(5, 4, 30, 69),
	(7, 2, 7, 1),
	(8, 1, 10, 4),
	(9, 3, 15, 1),
	(10, 4, 30, 66),
	(45, 0, 1, 1),
	(47, 0, 2, 1),
	(48, 0, 2, 1),
	(49, 0, 1, 1),
	(50, 0, 1, 1),
	(51, 0, 2, 1),
	(53, 0, 1, 1),
	(54, 0, 2, 1),
	(56, 42, 1, 1),
	(57, 42, 2, 1),
	(58, 42, 2, 1),
	(60, 42, 1, 1),
	(61, 42, 1, 1),
	(65, 107, 8, 0),
	(66, 107, 10, 3),
	(67, 107, 11, 4),
	(70, 107, 16, 1);

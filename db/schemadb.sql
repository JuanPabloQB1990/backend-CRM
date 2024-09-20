CREATE DATABASE  IF NOT EXISTS `store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `store`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: store
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_client` int NOT NULL,
  `id_product` int NOT NULL,
  `quantity` int NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_client` (`id_client`),
  KEY `cart_ibfk_2` (`id_product`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `users` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (21,20,48,4,10000000),(22,20,49,1,180000);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Tecnologia'),(2,'Deporte y Fitness'),(3,'Electrodomesticos'),(4,'Juegos y Juguetes');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `images` json DEFAULT NULL,
  `id_category` int NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`id_category`),
  CONSTRAINT `id` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (47,'Televisor','4k smartv 42 pulgadas','[{\"products/gc6wxgcygjtsvvvhozgh\": \"v1708712773/products/gc6wxgcygjtsvvvhozgh.jpg\"}]',3,2000000,20,0),(48,'Play Station 5','500 gb + dos controles','[{\"products/o44ftkpmomfw7uvgzcqi\": \"v1709057913/products/o44ftkpmomfw7uvgzcqi.jpg\"}]',4,2500000,20,0),(49,'Balon','balon de futbol no 5 FPC','[{\"products/cj3murm9qh5b6pylzxyk\": \"v1709058654/products/cj3murm9qh5b6pylzxyk.jpg\"}, {\"products/m7cqk4uqgchfapqz6jqk\": \"v1709058655/products/m7cqk4uqgchfapqz6jqk.jpg\"}]',2,180000,30,0),(50,'balon micro','balon de micro no 4','[{\"products/rziqmyhzaypkuzcpmucy\": \"v1709058931/products/rziqmyhzaypkuzcpmucy.jpg\"}]',2,150000,50,0),(51,'guayos ','guayos nike','[{\"products/dfjo64ophi5fuxfcckpl\": \"v1709062465/products/dfjo64ophi5fuxfcckpl.jpg\"}]',2,400000,50,0),(52,'Guayos de futbol','guayos Puma','[{\"products/gli3o8nfutflaafvoszn\": \"v1709062529/products/gli3o8nfutflaafvoszn.jpg\"}]',2,270000,40,0),(53,'Guayos futbol ','guayos adidas futbol','[{\"products/w1byeg09rp9zdv1xltt9\": \"v1709062569/products/w1byeg09rp9zdv1xltt9.jpg\"}]',2,170000,30,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `rol` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Juan Pablo Quintero','juan@gmail.com','[{\"users/jchwdinudewti9cqk7ct\":\"v1708801699/users/jchwdinudewti9cqk7ct.jpg\"}]','Colombia','Medellin','admin','$2b$10$vScPiGLWbV9gyC.aS1xCPeHYaw5cxCzgvOOYzN3nE8ftEBuUjbJBC'),(20,'Faber Quintero','faber@gmail.com','[{\"users/hjfsontd2i0yy9cs0wfk\":\"v1708962960/users/hjfsontd2i0yy9cs0wfk.jpg\"}]','Colombia','Medellin','client','$2b$10$9byewiJWsmAdS65XTKzFV.2XbAqCFZfl5kGG5Psr6.9sfpYRiqc7y'),(21,'Marta','marta@gmail.com','','','','client','$2b$10$opq4qU4VkZZ/v6p8YSlrvuYiwlSHEwGttYU3HNQAkrzNdRK7fSKve'),(27,'admin','admin@admin.com','','','','client','$2b$10$jEsx8YH7YOdlwzqrXoPzIOIKUojUOT7KFk5qOZM1mKd9ZYJmBwUiC');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27 17:24:06

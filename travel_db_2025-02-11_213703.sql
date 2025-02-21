-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: travel_db
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `travel_tb`
--

DROP TABLE IF EXISTS `travel_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travel_tb` (
  `travelId` int(11) NOT NULL AUTO_INCREMENT,
  `travellerId` int(11) NOT NULL,
  `travelPlace` varchar(200) NOT NULL,
  `travelStartDate` varchar(30) NOT NULL,
  `travelEndDate` varchar(30) NOT NULL,
  `travelCostTotal` double NOT NULL,
  `travelImage` varchar(150) NOT NULL,
  PRIMARY KEY (`travelId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_tb`
--

/*!40000 ALTER TABLE `travel_tb` DISABLE KEYS */;
INSERT INTO `travel_tb` VALUES (1,1,'b','bb','bbb',11111,'travel_1686865619379.jpg'),(2,43,'b','bb','bbb',11111,''),(3,1,'aaa','aa','aa',0,''),(4,1,'b','bb','bbb',11111,'travel_1047463210487.jpg'),(5,1,'zzzzz','a','aa',2000,'travel_1611644336620.png'),(7,43,'asdf','asdf','asdf',43434,'travel_1093251920134.png'),(10,45,'cccc','asdf','asdf',234234,'');
/*!40000 ALTER TABLE `travel_tb` ENABLE KEYS */;

--
-- Table structure for table `traveller_tb`
--

DROP TABLE IF EXISTS `traveller_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `traveller_tb` (
  `travellerId` int(11) NOT NULL AUTO_INCREMENT,
  `travellerFullname` varchar(100) NOT NULL,
  `travellerEmail` varchar(50) NOT NULL,
  `travellerPassword` varchar(50) NOT NULL,
  `travellerImage` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`travellerId`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traveller_tb`
--

/*!40000 ALTER TABLE `traveller_tb` DISABLE KEYS */;
INSERT INTO `traveller_tb` VALUES (34,'a','aa','aaa','traveller_1072897445993.png'),(35,'oooxx','asdfvvv','asdf','traveller_939888502460.png'),(36,'c11','cc11','ccc11','traveller_878985456663.png'),(37,'y11','yy11','yyy11','traveller_1164585874291.png'),(38,'d','dd','ddd','traveller_569371722681.png'),(43,'aaaaabb','aaa','aaa','traveller_1070585640258.png'),(44,'aaaa','aaaa','aaaaa','traveller_431438460537.png'),(45,'bbb','bbb','bbb','');
/*!40000 ALTER TABLE `traveller_tb` ENABLE KEYS */;

--
-- Dumping routines for database 'travel_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-11 21:37:28

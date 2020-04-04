CREATE DATABASE  IF NOT EXISTS `storyart_db` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `storyart_db`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: storyart_db
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `action`
--

DROP TABLE IF EXISTS `action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `action` (
  `id` varchar(255) NOT NULL,
  `content` varchar(10000) DEFAULT NULL,
  `next_screen_id` varchar(255) DEFAULT NULL,
  `screen_id` varchar(1000) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `_idx` (`screen_id`),
  KEY `screen_action_FK_idx` (`screen_id`),
  CONSTRAINT `my_action_screen_FK` FOREIGN KEY (`screen_id`) REFERENCES `screen` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action`
--

LOCK TABLES `action` WRITE;
/*!40000 ALTER TABLE `action` DISABLE KEYS */;
INSERT INTO `action` VALUES ('06171360-2f1e-4b82-b390-7fed2cb8d81c','Nhân viên phát tờ rơi.',NULL,'efd473c8-5001-4dad-b551-ca4245393ed6','NEXT_SCREEN','3a236810-2ac5-407c-8c48-2f2fd36ef789'),('0cc522e8-aaec-4cad-892b-0954d8b2a337','Đóng','95b5605a-ac47-4b15-aea3-2bfb7790c250','11f95f05-c0eb-4038-9a9b-952c40f64fbd','UPDATE_INFORMATION','1250000'),('0cf23e9e-f4c7-41ad-8353-e8deb85afe44','Nhân viên bán hàng siêu thị.',NULL,'0366e25f-0bfa-4a94-af13-c3ec25941f90','NEXT_SCREEN','469146fe-5c8e-42e4-bbb2-9b4c237b7217'),('143b8868-ab02-4acd-b8a3-921c54a82a33','Đến bệnh viện khám (chi phí 400,000 VNĐ)','b010adaf-5976-4528-9368-fe6171552664','28c21c6b-04c1-4385-a63a-8b77845ef8b0','UPDATE_INFORMATION','400000'),('1b3bf959-e05a-4dc4-8bce-8c08356892ac','Tiếp tục',NULL,'fe59d665-223b-49dd-a1d6-e95b9d512d40','NEXT_SCREEN','d5b819aa-eeaf-4d91-bb82-4b95eda8d61e'),('1deb54e0-40c8-45e4-8008-62ccae44d87a','Đóng viện phí','a16a9063-c4ca-4e83-870a-1194b0f5896c','35103692-e415-4cf5-95b4-f0b25344cb6a','UPDATE_INFORMATION','3000000'),('1e1f233b-7178-4238-a100-b0cb363b8e63','Ủng hộ',NULL,'00cac2e3-1839-497b-adee-15db3afaa23a','REDIRECT','https://playerduo.com/page5e85f6c965ed6614422d01f7'),('2220d9dc-fbf2-4031-a8a0-5edd0c662f86','Mua nước đóng thùng (120,000 VNĐ), dùng nước máy(300,000 VNĐ)','ca17788d-e0a4-4e6d-ae23-537d17f6fb35','9228703b-94ae-429a-a3ec-530061e10d78','UPDATE_INFORMATION','420000'),('239434e8-be06-4b94-88ab-8e1de79eaf64','Tiêm (1.500.000 VNĐ)','d5529276-3af2-4fd2-9028-9b4594856371','ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','UPDATE_INFORMATION','1500000'),('23ae1e79-6595-4353-9b23-c917358d3dc1','di toi trang cua toi',NULL,'40afd157-94a3-47b6-a712-54d80e610e7c','REDIRECT','http://youtube.com'),('2d195ce1-a9cb-4cfe-a1d2-bf6805a54356','di toi man ke tiep',NULL,'8d9ab713-b503-4867-9bca-b161ca7a920b','NEXT_SCREEN','8d9ab713-b503-4867-9bca-b161ca7a920b'),('2e88472f-998c-489a-b076-547d0d629dc3','Tiếp tục',NULL,'ad39482b-5069-4a29-9b2e-c1014a40dbb8','NEXT_SCREEN','41ceb398-a851-4a05-bc66-8e4f605e60d5'),('32d41dd2-6909-4d15-b7fb-7843884eb580','Không nghe theo lời 2 con quạ, và thực hiện một quyết định từ lâu',NULL,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','NEXT_SCREEN','18fffede-bcb7-4fbf-929d-e445591ce234'),('3601bd39-a129-47d7-940b-ea94ffb2286b','Nghe theo bản tâm, và thực hiện quyết định của mình',NULL,'18fffede-bcb7-4fbf-929d-e445591ce234','NEXT_SCREEN','5ce17fe1-22ff-4616-ac7c-a3c58fdedb23'),('3e1eb041-73fd-4b8c-b025-45396ba344d8','Tiếp tục',NULL,'ce30fd87-16fe-484e-9039-bf8165e6263a','NEXT_SCREEN','7c90ec46-fb77-40b5-994e-cc9f2ae7b957'),('45c16b2f-1a6a-4d1f-95fb-a1aa1e4a19de','Thanh toán','ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','469146fe-5c8e-42e4-bbb2-9b4c237b7217','UPDATE_INFORMATION','3000000'),('46a59448-fcb2-4da0-8505-af2f7acaecf1','Tiếp tục','0521754b-1f15-4418-885c-519ac72b16b5','7c90ec46-fb77-40b5-994e-cc9f2ae7b957','UPDATE_INFORMATION','2000000'),('4965e8da-ab4b-4af3-9885-8a375da3c9c5','Mặc kệ',NULL,'4351e418-c0d8-460c-94eb-b9e4b53e9d0a','NEXT_SCREEN','ad39482b-5069-4a29-9b2e-c1014a40dbb8'),('5028e3da-5763-4f0c-ace4-93c6757cf467','Tiếp tục dùng nước giếng.',NULL,'d5a8b29d-a28b-48e5-840b-15423087265f','NEXT_SCREEN','5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a'),('54855190-c4af-4b04-9ead-fb479a448572','Cho con thôi học',NULL,'11f95f05-c0eb-4038-9a9b-952c40f64fbd','NEXT_SCREEN','95b5605a-ac47-4b15-aea3-2bfb7790c250'),('6686c626-11c4-410f-97d5-a69858d38577','Đến bệnh viện khám (chi phí 400,000 VNĐ)','b9c6534a-2960-4d1a-bf58-3397b1218522','4351e418-c0d8-460c-94eb-b9e4b53e9d0a','UPDATE_INFORMATION','400000'),('69b4aad2-0330-419b-b047-36866b883656','Đóng','20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','0521754b-1f15-4418-885c-519ac72b16b5','UPDATE_INFORMATION','1250000'),('6b4d2761-98bb-411e-9be0-1d9c67e5d30e','2 hộp khẩu trang + 20kg gạo, 30 quả trứng (700k)','4351e418-c0d8-460c-94eb-b9e4b53e9d0a','b1f30f75-14d7-45ae-ba29-9e3596047003','UPDATE_INFORMATION','700000'),('6d77e5dc-d114-42ae-9cec-0746fd64da46','Tiếp tục',NULL,'b3e6750d-664a-4d84-b4cd-541ceff5192e','NEXT_SCREEN','b1f30f75-14d7-45ae-ba29-9e3596047003'),('6de5694c-966d-435f-9329-ee3c9ac5d045','2 hộp khẩu trang + 2 thùng mì gói (500k)','4351e418-c0d8-460c-94eb-b9e4b53e9d0a','b1f30f75-14d7-45ae-ba29-9e3596047003','UPDATE_INFORMATION','500000'),('72bbf0a2-6639-4898-ac64-19ca3bee7a09','Ủng hộ',NULL,'a16a9063-c4ca-4e83-870a-1194b0f5896c','REDIRECT','https://playerduo.com/page5e85f6c965ed6614422d01f7'),('736ee7f6-849f-4b1f-99ae-b422b97569fb','Không tiêm',NULL,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','NEXT_SCREEN','fe59d665-223b-49dd-a1d6-e95b9d512d40'),('7fc75575-885d-46b3-a126-2df058d92cd5','Tiếp tục',NULL,'ca17788d-e0a4-4e6d-ae23-537d17f6fb35','NEXT_SCREEN','ae457ec3-b8ad-4a2a-bdeb-f25218e6173f'),('803d022c-6a63-41c4-8054-872315226461','Ủng hộ',NULL,'0db6db97-4fbe-49ae-af0a-9fc57a9e1d03','REDIRECT','https://playerduo.com/page5e85f6c965ed6614422d01f7'),('807455a0-2bf4-4285-b763-7faf9240b406','Mua nước đóng thùng (120,000 VNĐ), dùng nước máy(300,000 VNĐ)','5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','d5a8b29d-a28b-48e5-840b-15423087265f','UPDATE_INFORMATION','420000'),('8177efba-3a74-4c26-9088-65324081017b','Không nghe theo lời 2 con quạ, và thực hiện một quyết định từ lâu',NULL,'661b1283-4cb0-4887-a531-15b17521b02d','NEXT_SCREEN','18fffede-bcb7-4fbf-929d-e445591ce234'),('854fdab1-64a2-4fc8-9816-e617ef548c35','Tiếp tục','11f95f05-c0eb-4038-9a9b-952c40f64fbd','41ceb398-a851-4a05-bc66-8e4f605e60d5','UPDATE_INFORMATION','2000000'),('859ab01e-64ca-4d22-9234-6211d90b4d19','Tiếp tục',NULL,'95b5605a-ac47-4b15-aea3-2bfb7790c250','NEXT_SCREEN','9228703b-94ae-429a-a3ec-530061e10d78'),('868454bb-3198-4b4f-ad42-864324ff0c06','2 hộp khẩu trang + 20kg gạo, 30 quả trứng (700k)','28c21c6b-04c1-4385-a63a-8b77845ef8b0','d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','UPDATE_INFORMATION','700000'),('86c009e7-0c23-4f92-874a-ba3c8fb68419','Ủng hộ',NULL,'27740b24-f9f1-4db7-b852-8d4ce40ba4c6','REDIRECT','https://playerduo.com/page5e85f6c965ed6614422d01f7'),('87374236-92ba-4d5f-9ebc-c00fb6a8fff8','Nhân viên bán hàng siêu thị.',NULL,'efd473c8-5001-4dad-b551-ca4245393ed6','NEXT_SCREEN','3a236810-2ac5-407c-8c48-2f2fd36ef789'),('900b4109-9d18-4d68-b136-17993d760cba','Nhân viên quán café.',NULL,'0366e25f-0bfa-4a94-af13-c3ec25941f90','NEXT_SCREEN','469146fe-5c8e-42e4-bbb2-9b4c237b7217'),('a4c425cc-e5e6-459d-8c5f-c52dff57c006','Đóng viện phí','27740b24-f9f1-4db7-b852-8d4ce40ba4c6','ae457ec3-b8ad-4a2a-bdeb-f25218e6173f','UPDATE_INFORMATION','3000000'),('a9d9ffbd-223f-4818-803e-439afdd67fe3','Tiếp tục',NULL,'3e7cc913-cc84-4a2d-b387-206df453bd6e','NEXT_SCREEN','b1f30f75-14d7-45ae-ba29-9e3596047003'),('b239d590-1215-44db-8f72-15c3c65b6091','Tiếp tục dùng nước giếng.',NULL,'9228703b-94ae-429a-a3ec-530061e10d78','NEXT_SCREEN','ca17788d-e0a4-4e6d-ae23-537d17f6fb35'),('baae10db-a416-449b-8c35-e65b6d32db15','Nghe theo quạ 1, tốn sức gỡ đá từ giếng và bỏ vào chai','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','661b1283-4cb0-4887-a531-15b17521b02d','UPDATE_INFORMATION','1'),('be5b3597-da4c-4970-a3ef-e7eb5b9d9f93','Tiếp tục',NULL,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','NEXT_SCREEN','d5a8b29d-a28b-48e5-840b-15423087265f'),('c24e2df7-6bb9-4f53-ba6c-0462c588b086','Tiếp tục',NULL,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','NEXT_SCREEN','35103692-e415-4cf5-95b4-f0b25344cb6a'),('c3cfaef1-61d9-4d9f-948b-b7878b5d3542','Không tiêm',NULL,'dece0104-2532-4db3-ae7b-f383702d4f7b','NEXT_SCREEN','b3e6750d-664a-4d84-b4cd-541ceff5192e'),('cb8ca975-ab51-44cc-a70a-371dba20d9b0','Không nghe theo bản tâm và tiếp tục suy nghĩ về phương án.',NULL,'18fffede-bcb7-4fbf-929d-e445591ce234','NEXT_SCREEN','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8'),('cc231b2e-79ea-43e8-881a-fec62b5f7c04','Nghe theo con quạ 2, dẫn dắt bầy đàn tiếp tục bay tiếp',NULL,'661b1283-4cb0-4887-a531-15b17521b02d','NEXT_SCREEN','40afd157-94a3-47b6-a712-54d80e610e7c'),('cc90024d-feff-473b-ba9e-070485600d58','Tiêm (1.500.000 VNĐ)','3e7cc913-cc84-4a2d-b387-206df453bd6e','dece0104-2532-4db3-ae7b-f383702d4f7b','UPDATE_INFORMATION','1500000'),('ce0b4ca7-f6a5-4281-9688-3bc3297a0e00','Cho con thôi học',NULL,'0521754b-1f15-4418-885c-519ac72b16b5','NEXT_SCREEN','20bd730c-daa5-4c54-a6e9-dba3b5fedbc0'),('d0d3b6c3-5f81-4970-8210-d559a450d26e','Mặc kệ',NULL,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','NEXT_SCREEN','ce30fd87-16fe-484e-9039-bf8165e6263a'),('d715fba4-1a79-4ee1-bbb1-226c30e77161','Tiếp tục',NULL,'b010adaf-5976-4528-9368-fe6171552664','NEXT_SCREEN','7c90ec46-fb77-40b5-994e-cc9f2ae7b957'),('d9b000a9-8430-4930-8014-e6e17e479d68','Nghe theo con quạ 2, dẫn dắt bầy đàn tiếp tục bay tiếp',NULL,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','NEXT_SCREEN','40afd157-94a3-47b6-a712-54d80e610e7c'),('da8b1b10-a984-478e-a56a-5f667be02ca3','Nhân viên phát tờ rơi.',NULL,'0366e25f-0bfa-4a94-af13-c3ec25941f90','NEXT_SCREEN','469146fe-5c8e-42e4-bbb2-9b4c237b7217'),('dc3aaecd-4329-4c29-a037-4549be4c4ee8','Thanh toán','dece0104-2532-4db3-ae7b-f383702d4f7b','3a236810-2ac5-407c-8c48-2f2fd36ef789','UPDATE_INFORMATION','3000000'),('df21f926-bd23-4f42-aa95-8aa72d43eab3','Tiếp tục',NULL,'d5529276-3af2-4fd2-9028-9b4594856371','NEXT_SCREEN','d5b819aa-eeaf-4d91-bb82-4b95eda8d61e'),('f19d6ce9-55e7-4932-974d-2ce2c06c394f','Tiếp tục',NULL,'b9c6534a-2960-4d1a-bf58-3397b1218522','NEXT_SCREEN','41ceb398-a851-4a05-bc66-8e4f605e60d5'),('f3e7db2f-5683-4128-890b-13e9d688a3c8','2 hộp khẩu trang + 2 thùng mì gói (500k)','28c21c6b-04c1-4385-a63a-8b77845ef8b0','d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','UPDATE_INFORMATION','500000'),('faa29295-4b24-49a1-ab04-300e0f731895','Nhân viên quán café.',NULL,'efd473c8-5001-4dad-b551-ca4245393ed6','NEXT_SCREEN','3a236810-2ac5-407c-8c48-2f2fd36ef789'),('fae5adb9-496b-4b6d-8b33-c9fa8319aa20','Tiếp tục nghe theo quạ 1, tốn sức gỡ đá từ giếng và bỏ vào chai','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','UPDATE_INFORMATION','1');
/*!40000 ALTER TABLE `action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `click_link`
--

DROP TABLE IF EXISTS `click_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `click_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(1000) DEFAULT NULL,
  `story_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `my_click_link_story_FK_idx` (`story_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4306 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `click_link`
--

LOCK TABLES `click_link` WRITE;
/*!40000 ALTER TABLE `click_link` DISABLE KEYS */;
INSERT INTO `click_link` VALUES (4116,'http://youtube.com',314,'2020-03-30 13:03:32'),(4118,'http://youtube.com',314,'2020-03-30 13:34:25'),(4165,'http://youtube.com',314,'2020-03-31 03:17:42'),(4201,'https://playerduo.com/page5e85f6c965ed6614422d01f7',321,'2020-04-02 17:03:36'),(4257,'https://playerduo.com/page5e85f6c965ed6614422d01f7',321,'2020-04-03 02:43:18'),(4291,'https://playerduo.com/page5e85f6c965ed6614422d01f7',321,'2020-04-03 06:42:22'),(4305,'https://playerduo.com/page5e85f6c965ed6614422d01f7',321,'2020-04-03 09:09:16');
/*!40000 ALTER TABLE `click_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `content` varchar(10000) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `disable_by_admin` tinyint(1) DEFAULT '0',
  `story_id` int(11) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `my_comment_story_FK_idx` (`story_id`),
  KEY `my_comment_user_FK_idx` (`user_id`),
  CONSTRAINT `my_comment_story_FK` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_comment_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (4161,1,'cau truyen rat hay va y nghia','2020-03-31 08:56:18.987000',0,314,'2020-03-31 08:56:18.987000',11),(4162,1,'cau truyen hay qua','2020-03-31 10:15:29.550000',0,314,'2020-03-31 10:19:14.514000',6),(4163,0,'cau truyen thu vi','2020-03-31 10:16:00.999000',0,314,'2020-03-31 10:16:27.037000',6);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (4429);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_condition`
--

DROP TABLE IF EXISTS `info_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `info_condition` (
  `id` varchar(255) NOT NULL,
  `information_id` varchar(255) NOT NULL,
  `next_screen_id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_info_condition_info_FK_idx` (`information_id`),
  KEY `my_info_condition_next_screen_FK_idx` (`next_screen_id`),
  CONSTRAINT `my_info_condition_info_FK` FOREIGN KEY (`information_id`) REFERENCES `information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_info_condition_next_screen_FK` FOREIGN KEY (`next_screen_id`) REFERENCES `screen` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_condition`
--

LOCK TABLES `info_condition` WRITE;
/*!40000 ALTER TABLE `info_condition` DISABLE KEYS */;
INSERT INTO `info_condition` VALUES ('972e1216-7760-42ea-a403-d336de5e8c6b','c39f8990-7e90-4dbd-91d3-54c10aee440c','00cac2e3-1839-497b-adee-15db3afaa23a','<=','0'),('be467276-45ee-4973-b7c7-89743d5178c4','880b50f3-aa83-420d-a7da-23de0ee19b68','252088e2-1941-4b80-9e63-6a2114d8295e','>=','7'),('bf4760cc-ea2a-4c98-b413-3e38a8629082','2c0111d1-ad97-468a-8bda-6b084ddb1600','0db6db97-4fbe-49ae-af0a-9fc57a9e1d03','<=','0');
/*!40000 ALTER TABLE `info_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `information`
--

DROP TABLE IF EXISTS `information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information` (
  `id` varchar(100) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `story_id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_information_story_FK_idx` (`story_id`),
  CONSTRAINT `my_information_story_FK` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information`
--

LOCK TABLES `information` WRITE;
/*!40000 ALTER TABLE `information` DISABLE KEYS */;
INSERT INTO `information` VALUES ('2c0111d1-ad97-468a-8bda-6b084ddb1600','VNĐ',321,'NUMBER',NULL,'6000000'),('880b50f3-aa83-420d-a7da-23de0ee19b68','Đá',314,'NUMBER',NULL,'0'),('c39f8990-7e90-4dbd-91d3-54c10aee440c','VNĐ',320,'NUMBER',NULL,'6000000');
/*!40000 ALTER TABLE `information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `information_action`
--

DROP TABLE IF EXISTS `information_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information_action` (
  `action_id` varchar(255) NOT NULL,
  `information_id` varchar(255) NOT NULL,
  `operation` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  KEY `information_FK_idx` (`information_id`),
  KEY `action_FK_idx` (`action_id`),
  CONSTRAINT `my_info_action_FK1` FOREIGN KEY (`information_id`) REFERENCES `information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_info_action_FK2` FOREIGN KEY (`action_id`) REFERENCES `action` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information_action`
--

LOCK TABLES `information_action` WRITE;
/*!40000 ALTER TABLE `information_action` DISABLE KEYS */;
INSERT INTO `information_action` VALUES ('fae5adb9-496b-4b6d-8b33-c9fa8319aa20','880b50f3-aa83-420d-a7da-23de0ee19b68','+','1'),('baae10db-a416-449b-8c35-e65b6d32db15','880b50f3-aa83-420d-a7da-23de0ee19b68','+','1'),('dc3aaecd-4329-4c29-a037-4549be4c4ee8','c39f8990-7e90-4dbd-91d3-54c10aee440c','-','3000000'),('cc90024d-feff-473b-ba9e-070485600d58','c39f8990-7e90-4dbd-91d3-54c10aee440c','-','1500000'),('6de5694c-966d-435f-9329-ee3c9ac5d045','c39f8990-7e90-4dbd-91d3-54c10aee440c','-','500000'),('6b4d2761-98bb-411e-9be0-1d9c67e5d30e','c39f8990-7e90-4dbd-91d3-54c10aee440c','-','700000'),('6686c626-11c4-410f-97d5-a69858d38577','c39f8990-7e90-4dbd-91d3-54c10aee440c','-','400000'),('854fdab1-64a2-4fc8-9816-e617ef548c35','c39f8990-7e90-4dbd-91d3-54c10aee440c','+','2000000'),('0cc522e8-aaec-4cad-892b-0954d8b2a337','c39f8990-7e90-4dbd-91d3-54c10aee440c','-','1250000'),('2220d9dc-fbf2-4031-a8a0-5edd0c662f86','c39f8990-7e90-4dbd-91d3-54c10aee440c','-','420000'),('a4c425cc-e5e6-459d-8c5f-c52dff57c006','c39f8990-7e90-4dbd-91d3-54c10aee440c','-','3000000'),('69b4aad2-0330-419b-b047-36866b883656','2c0111d1-ad97-468a-8bda-6b084ddb1600','-','1250000'),('143b8868-ab02-4acd-b8a3-921c54a82a33','2c0111d1-ad97-468a-8bda-6b084ddb1600','-','400000'),('1deb54e0-40c8-45e4-8008-62ccae44d87a','2c0111d1-ad97-468a-8bda-6b084ddb1600','-','3000000'),('45c16b2f-1a6a-4d1f-95fb-a1aa1e4a19de','2c0111d1-ad97-468a-8bda-6b084ddb1600','-','3000000'),('46a59448-fcb2-4da0-8505-af2f7acaecf1','2c0111d1-ad97-468a-8bda-6b084ddb1600','+','2000000'),('239434e8-be06-4b94-88ab-8e1de79eaf64','2c0111d1-ad97-468a-8bda-6b084ddb1600','-','1500000'),('807455a0-2bf4-4285-b763-7faf9240b406','2c0111d1-ad97-468a-8bda-6b084ddb1600','-','420000'),('f3e7db2f-5683-4128-890b-13e9d688a3c8','2c0111d1-ad97-468a-8bda-6b084ddb1600','-','500000'),('868454bb-3198-4b4f-ad42-864324ff0c06','2c0111d1-ad97-468a-8bda-6b084ddb1600','-','700000');
/*!40000 ALTER TABLE `information_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `user_id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `stars` double DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`story_id`),
  KEY `my_rating_story_FK_idx` (`story_id`),
  CONSTRAINT `my_rating_story_FK` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_rating_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (2,314,'2020-04-02 20:47:00.056000',3.5,'2020-04-02 20:47:00.025000'),(6,314,'2020-03-31 09:18:01.742000',4,'2020-03-31 10:18:52.694000'),(11,314,'2020-03-31 08:56:14.599000',3.5,'2020-03-31 08:56:35.468000');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction`
--

DROP TABLE IF EXISTS `reaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `type` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`comment_id`,`user_id`),
  KEY `my_reaction_user_FK_idx` (`user_id`),
  CONSTRAINT `my_reaction_comment_FK` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_reaction_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction`
--

LOCK TABLES `reaction` WRITE;
/*!40000 ALTER TABLE `reaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `reaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reading_history`
--

DROP TABLE IF EXISTS `reading_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reading_history` (
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `list_screen_id` text,
  `updated_at` datetime(6) DEFAULT NULL,
  `is_reaching_end` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_history_user_FK_idx` (`user_id`),
  KEY `my_history_story_FK_idx` (`story_id`),
  CONSTRAINT `my_history_story_FK` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_history_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=660 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reading_history`
--

LOCK TABLES `reading_history` WRITE;
/*!40000 ALTER TABLE `reading_history` DISABLE KEYS */;
INSERT INTO `reading_history` VALUES (314,5,608,'2020-03-30 21:10:24.463000','a8e1a512-c217-4993-822b-b5d093c00948',NULL,1),(314,5,609,'2020-03-30 21:17:57.423000','05d1084b-7bbd-4cf3-883b-7be945581ede,5c1391f6-d5ba-4efc-81d3-f0a3532f5757',NULL,0),(314,6,614,'2020-03-31 10:17:28.703000','661b1283-4cb0-4887-a531-15b17521b02d,40afd157-94a3-47b6-a712-54d80e610e7c',NULL,1),(314,6,615,'2020-03-31 10:18:06.639000','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,40afd157-94a3-47b6-a712-54d80e610e7c',NULL,1),(314,6,616,'2020-03-31 10:18:28.740000','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,252088e2-1941-4b80-9e63-6a2114d8295e',NULL,1),(314,2,617,'2020-04-02 22:36:06.085000','661b1283-4cb0-4887-a531-15b17521b02d,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,18fffede-bcb7-4fbf-929d-e445591ce234,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,18fffede-bcb7-4fbf-929d-e445591ce234,5ce17fe1-22ff-4616-ac7c-a3c58fdedb23',NULL,1),(314,2,618,'2020-04-02 22:36:28.138000','661b1283-4cb0-4887-a531-15b17521b02d,40afd157-94a3-47b6-a712-54d80e610e7c',NULL,1),(314,2,619,'2020-04-02 22:40:15.535000','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8',NULL,0),(314,2,620,'2020-04-02 22:40:15.578000','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8',NULL,0),(314,2,621,'2020-04-02 22:43:55.769000','661b1283-4cb0-4887-a531-15b17521b02d,40afd157-94a3-47b6-a712-54d80e610e7c',NULL,1),(314,2,622,'2020-04-02 22:44:08.170000','661b1283-4cb0-4887-a531-15b17521b02d,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,18fffede-bcb7-4fbf-929d-e445591ce234,5ce17fe1-22ff-4616-ac7c-a3c58fdedb23',NULL,1),(314,2,623,'2020-04-02 22:47:14.132000','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8',NULL,0),(314,2,624,'2020-04-02 22:47:14.137000','6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8,6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8',NULL,0),(314,2,625,'2020-04-02 23:21:56.549000','661b1283-4cb0-4887-a531-15b17521b02d',NULL,0),(321,2,626,'2020-04-03 00:03:30.782000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,fe59d665-223b-49dd-a1d6-e95b9d512d40,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,627,'2020-04-03 00:05:12.298000','469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,628,'2020-04-03 00:05:40.033000','469146fe-5c8e-42e4-bbb2-9b4c237b7217,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,629,'2020-04-03 00:11:27.294000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,630,'2020-04-03 00:14:44.577000','469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,fe59d665-223b-49dd-a1d6-e95b9d512d40,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,a16a9063-c4ca-4e83-870a-1194b0f5896c',NULL,1),(321,2,631,'2020-04-03 09:42:22.524000','469146fe-5c8e-42e4-bbb2-9b4c237b7217',NULL,0),(321,2,632,'2020-04-03 09:43:02.565000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,fe59d665-223b-49dd-a1d6-e95b9d512d40,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,a16a9063-c4ca-4e83-870a-1194b0f5896c',NULL,1),(321,2,633,'2020-04-03 11:11:56.915000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,634,'2020-04-03 13:18:49.508000','0366e25f-0bfa-4a94-af13-c3ec25941f90',NULL,0),(321,2,635,'2020-04-03 13:19:29.337000','0366e25f-0bfa-4a94-af13-c3ec25941f90',NULL,0),(321,2,636,'2020-04-03 13:22:56.316000','0366e25f-0bfa-4a94-af13-c3ec25941f90',NULL,0),(321,2,637,'2020-04-03 13:23:34.887000','0366e25f-0bfa-4a94-af13-c3ec25941f90',NULL,0),(321,2,638,'2020-04-03 13:23:54.740000','0366e25f-0bfa-4a94-af13-c3ec25941f90',NULL,0),(321,2,639,'2020-04-03 13:28:47.730000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7',NULL,0),(321,2,640,'2020-04-03 13:39:06.117000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7',NULL,0),(321,2,641,'2020-04-03 13:40:55.240000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7',NULL,0),(321,2,642,'2020-04-03 13:41:33.160000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217',NULL,0),(321,2,643,'2020-04-03 13:42:10.634000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,644,'2020-04-03 14:04:12.807000','469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,fe59d665-223b-49dd-a1d6-e95b9d512d40,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5',NULL,0),(321,2,645,'2020-04-03 16:00:26.592000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7',NULL,0),(321,2,646,'2020-04-03 16:00:46.641000','0366e25f-0bfa-4a94-af13-c3ec25941f90',NULL,0),(321,2,647,'2020-04-03 16:05:51.062000','0366e25f-0bfa-4a94-af13-c3ec25941f90',NULL,0),(321,2,648,'2020-04-03 16:09:10.931000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,649,'2020-04-03 16:11:13.283000','469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,fe59d665-223b-49dd-a1d6-e95b9d512d40,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,a16a9063-c4ca-4e83-870a-1194b0f5896c',NULL,1),(321,2,650,'2020-04-03 16:14:26.351000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664',NULL,0),(321,2,651,'2020-04-03 16:22:18.203000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,652,'2020-04-03 16:30:17.622000','469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,fe59d665-223b-49dd-a1d6-e95b9d512d40,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5',NULL,0),(321,2,653,'2020-04-03 16:30:57.955000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,654,'2020-04-03 16:32:12.795000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,655,'2020-04-03 19:14:09.394000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,656,'2020-04-03 19:20:23.437000','469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0',NULL,0),(321,2,657,'2020-04-03 19:21:57.084000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,658,'2020-04-03 21:14:08.213000','469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,ce30fd87-16fe-484e-9039-bf8165e6263a,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1),(321,2,659,'2020-04-03 21:15:29.483000','0366e25f-0bfa-4a94-af13-c3ec25941f90,469146fe-5c8e-42e4-bbb2-9b4c237b7217,ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7,d5529276-3af2-4fd2-9028-9b4594856371,d5b819aa-eeaf-4d91-bb82-4b95eda8d61e,28c21c6b-04c1-4385-a63a-8b77845ef8b0,b010adaf-5976-4528-9368-fe6171552664,7c90ec46-fb77-40b5-994e-cc9f2ae7b957,0521754b-1f15-4418-885c-519ac72b16b5,20bd730c-daa5-4c54-a6e9-dba3b5fedbc0,d5a8b29d-a28b-48e5-840b-15423087265f,5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a,35103692-e415-4cf5-95b4-f0b25344cb6a,0db6db97-4fbe-49ae-af0a-9fc57a9e1d03',NULL,1);
/*!40000 ALTER TABLE `reading_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_handled` bit(1) NOT NULL,
  `story_id` int(11) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_report_comment_FK_idx` (`comment_id`),
  KEY `my_story_report_FK_idx` (`story_id`),
  KEY `my_user_report_FK_idx` (`user_id`),
  CONSTRAINT `my_comment_report_FK` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_story_report_FK` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_user_report_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_epk9im9l9q67xmwi4hbed25do` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (2,'ROLE_ADMIN'),(3,'ROLE_SYSTEM_ADMIN'),(1,'ROLE_USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen`
--

DROP TABLE IF EXISTS `screen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screen` (
  `id` varchar(255) NOT NULL,
  `content` longtext,
  `next_screen_id` varchar(255) DEFAULT NULL,
  `story_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_screen_story_FK_idx` (`story_id`),
  KEY `my_story_screen_FK_idx` (`story_id`),
  CONSTRAINT `my_story_screen_FK` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen`
--

LOCK TABLES `screen` WRITE;
/*!40000 ALTER TABLE `screen` DISABLE KEYS */;
INSERT INTO `screen` VALUES ('00cac2e3-1839-497b-adee-15db3afaa23a','<p>Bạn đã hoàn thành trãi nghiệm thất nghiệp trong 2 tháng. Có quá nhiều thứ để chi tiêu với đồng lương bèo bọt của bạn. Bạn đã chi tiêu hết số tiền mình có cho gia đình, bản thân.</p><p>&nbsp;</p><p>Bạn có cảm thấy thật khó khăn? Đó cũng chính là những khó khăn của người nghèo và người thất nghiệp trên cả nước. Hãy ủng hộ quỹ “<strong>Thất nghiệp và người nghèo</strong>” tại link bên dưới.</p><p>&nbsp;</p><p>Tất cả số liệu trong truyện được trích dẫn từ: <a href=\"http://www.gso.gov.vn/\" rel=\"noopener noreferrer\" target=\"_blank\">www.gso.gov.vn</a> (Tổng cục thống kê Việt Nam)</p>',NULL,320,'Thua cuộc.'),('0366e25f-0bfa-4a94-af13-c3ec25941f90','<p class=\"ql-align-center\"><strong>Nền công nghiệp suy thoái. Công ty của bạn vừa cắt giảm biên chế vì thua lỗ, thật không may bạn là một trong số các nhân viên bị cắt giảm biên chế. Nghề của bạn cũng là một nghề khó xin việc. Vợ bạn vừa đẻ, bạn có 1 vợ, và 2 con nhỏ. Nguồn thu chính của gia đình chính là bạn. Thật may bạn vẫn còn khoản tiền tiết kiệm được là 6tr. Bạn quyết định phải chọn một nghề tạm thời trước khi có một công việc mới tốt hơn(các công viêc dưới đây đều có mức lương bằng nhau là 5tr đồng/ tháng):</strong></p>',NULL,321,'Thất nghiệp'),('0521754b-1f15-4418-885c-519ac72b16b5','<p>Đứa con lớn của bạn cần đóng học phí mẫu giáo.</p><p>&nbsp;</p><p>Học phí: 1,250,000 VNĐ</p>',NULL,321,'Tuần 6');
INSERT INTO `screen` VALUES ('11f95f05-c0eb-4038-9a9b-952c40f64fbd','<p>Đứa con lớn của bạn cần đóng học phí mẫu giáo.</p><p>&nbsp;</p><p>Học phí: 1,250,000 VNĐ</p>',NULL,320,'Tuần 6'),('18fffede-bcb7-4fbf-929d-e445591ce234','<p>Quạ Thủ lĩnh đã đắn đo rất lâu về phương án thoát ra khỏi sa mạc, thấy cả 2 ý kiến của các quạ kia đều không đáng tin cậy, Tuy rằng Thủ lĩnh vẫn do dự về quyết định của mình :&nbsp;</p>',NULL,314,'Do Dự  '),('20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','<p>Theo điều tra MICS, tỉ lệ trẻ em từ 36-59 tháng tuổi đang tham gia các hoạt động đi học mẫu giáo và giáo dục trẻ thơ trên toàn quốc là 71,3%. 28,7% còn lại thì không. Quá trình này rất quan trọng đối với sự phát triển của trẻ nhỏ.</p>',NULL,321,'Phát triển trẻ em'),('252088e2-1941-4b80-9e63-6a2114d8295e','<p>Sau một hồi khó khăn, nước đã trào ra khỏi cái bình. 3 con quạ uống no nên sau đó bay ra khỏi sa mạc.</p>',NULL,314,'Good Ending'),('27740b24-f9f1-4db7-b852-8d4ce40ba4c6','<p>Bạn đã hoàn thành trãi nghiệm thất nghiệp trong 2 tháng. Bạn đã chi tiêu 1 cách thông minh. Nhưng ngẫm lại, bạn đã đánh đổi quá nhiều thứ như sức khỏe, con cái,… để có thể chi tiêu một các hợp lí. </p><p>&nbsp;</p><p>Bạn có cảm thấy thật khó khăn? Đó cũng chính là những khó khăn của người nghèo và người thất nghiệp trên cả nước. Hãy ủng hộ quỹ “<strong>Thất nghiệp và người nghèo</strong>” tại link bên dưới.</p><p>&nbsp;</p><p>Tất cả số liệu trong truyện được trích dẫn từ: <a href=\"http://www.gso.gov.vn/\" rel=\"noopener noreferrer\" target=\"_blank\">www.gso.gov.vn</a> (Tổng cục thống kê Việt Nam)</p>',NULL,320,'Chức mừng !'),('28c21c6b-04c1-4385-a63a-8b77845ef8b0','<p>Bạn bị đau ngực cả tuần nay. Gia đình bạn có truyền thống bệnh tim. Bạn sẽ:</p>',NULL,321,'Tuần 4'),('35103692-e415-4cf5-95b4-f0b25344cb6a','<p>Vợ của bạn bất ngờ sốt nặng, bạn đưa vợ vào viện. Bác sĩ đưa ra kết quả vợ bạn bị sốt xuất huyết.</p><p>&nbsp;</p><p>Viện phí: 3,000,000 VNĐ</p>',NULL,321,'Tuần 8'),('3a236810-2ac5-407c-8c48-2f2fd36ef789','<p>Trả tiền thuê nhà</p><p><br></p><p>Bạn cần thanh toán tiền thuê nhà tháng này là 3,000,000 VNĐ.</p>',NULL,320,'Tuần 1'),('3b7aa330-3c71-45f8-8c2a-c15658c5eb3f','<p>noi dung man hinh 1 ne</p>','3b7aa330-3c71-45f8-8c2a-c15658c5eb3f',316,'man hinh 1'),('3e7cc913-cc84-4a2d-b387-206df453bd6e','<p>75,6% trẻ em từ 12-23 tháng tuổi được tiêm chủng vắc xin đầy đủ như lao, bại liệt (3 mũi), bạch hầu - ho gà - uốn ván (3 mũi), sởi, viêm gan B (3 mũi), viêm não (3 mũi).</p><p><br></p><p>Thật may, con của bạn nằm trong số đó.</p>',NULL,320,'Tiêm ngừa cho trẻ nhỏ'),('40afd157-94a3-47b6-a712-54d80e610e7c','<p>Sau khi quyết định, Quạ thủ lĩnh dẫn 2 con quạ tiếp tục đi về phía sa mạc với hi vọng sẽ rời khỏi sa mạc. Số phận của chúng vẫn còn là bí ẩn.</p>',NULL,314,'BAD ENDING '),('41ceb398-a851-4a05-bc66-8e4f605e60d5','<p>Lương: +5,000,000 VNĐ</p><p>Tiền thuê nhà: -3,000,000 VNĐ</p><p>Số dư: 2,000,000 VNĐ</p>',NULL,320,'Tuần 5'),('4351e418-c0d8-460c-94eb-b9e4b53e9d0a','<p>Bạn bị đau ngực cả tuần nay. Gia đình bạn có truyền thống bệnh tim. Bạn sẽ:</p>',NULL,320,'Tuần 4'),('469146fe-5c8e-42e4-bbb2-9b4c237b7217','<p>Trả tiền thuê nhà</p><p><br></p><p>Bạn cần thanh toán tiền thuê nhà tháng này là 3,000,000 VNĐ.</p>',NULL,321,'Tuần 1'),('5ce17fe1-22ff-4616-ac7c-a3c58fdedb23','<p>Quạ Thủ lĩnh với thân thể hoàn toàn khỏe mạnh đã thành công bay ra khỏi sa mạc.</p>',NULL,314,'True Ending'),('5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','<p>Sử dụng nước sạch và nhà tiêu hợp vệ sinh là những yếu tố thiết yếu đảm bảo cho sức khỏe của con người. Nước không sạch và nhà tiêu không hợp vệ sinh có thể là yếu tố mang mầm mống các bệnh tật như bệnh tả và thương hàn. So với điều tra MICS4, 8% dân số Việt Nam không sử dụng nguồn nước đảm bảo sức khỏe.</p>',NULL,321,'Nước sạch và vệ sinh'),('6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','<p>Sau một bỏ đá vào, nhưng vẫn không có nước chảy ra. Quạ Thủ lĩnh quyết định :&nbsp;</p>',NULL,314,'Đắn đo'),('661b1283-4cb0-4887-a531-15b17521b02d','<p>Sau một hồi đắn đo trước tình thế và ý kiến của 2 con quạ, Quạ thủ lĩnh quyết :</p>',NULL,314,'Quyết định'),('7c90ec46-fb77-40b5-994e-cc9f2ae7b957','<p>Lương: +5,000,000 VNĐ</p><p>Tiền thuê nhà: -3,000,000 VNĐ</p><p>Số dư: 2,000,000 VNĐ</p>',NULL,321,'Tuần 5'),('862d33ed-074f-49b4-afc4-b23c18f0ba07','<p>noi dung man hinh 1ne</p>','862d33ed-074f-49b4-afc4-b23c18f0ba07',317,'tieu de 1'),('8d9ab713-b503-4867-9bca-b161ca7a920b','<p>covid 19 dang la 1 tham hoa toan cau, moi nguoi khong nen ra ngoai, ma chu dong cach ly trong nha.</p>',NULL,319,'chapter 1'),('9228703b-94ae-429a-a3ec-530061e10d78','<p>Đồng nghiệp của bạn bàn tán với nhau về vụ việc nguồn nước của nhà máy nước Sông Đà bị nhiễm dầu. Bạn sực nhớ trc đến giờ gia định bạn chỉ toàn dùng nước giếng đun sôi chứ không dùng nước máy và nước đóng thùng. Bạn sẽ:</p>',NULL,320,'Tuần 7'),('95b5605a-ac47-4b15-aea3-2bfb7790c250','<p>Theo điều tra MICS, tỉ lệ trẻ em từ 36-59 tháng tuổi đang tham gia các hoạt động đi học mẫu giáo và giáo dục trẻ thơ trên toàn quốc là 71,3%. 28,7% còn lại thì không. Quá trình này rất quan trọng đối với sự phát triển của trẻ nhỏ.</p>',NULL,320,'Phát triển trẻ em'),('a16a9063-c4ca-4e83-870a-1194b0f5896c','<p>Bạn đã hoàn thành trãi nghiệm thất nghiệp trong 2 tháng. Bạn đã chi tiêu 1 cách thông minh. Nhưng ngẫm lại, bạn đã đánh đổi quá nhiều thứ như sức khỏe, con cái,… để có thể chi tiêu một các hợp lí.</p><p>&nbsp;</p><p>Bạn có cảm thấy thật khó khăn? Đó cũng chính là những khó khăn của người nghèo và người thất nghiệp trên cả nước. Hãy ủng hộ quỹ “<strong>Thất nghiệp và người nghèo</strong>” tại link bên dưới.</p><p>&nbsp;</p><p>Tất cả số liệu trong truyện được trích dẫn từ: <a href=\"http://www.gso.gov.vn/\" rel=\"noopener noreferrer\" target=\"_blank\">www.gso.gov.vn</a> (Tổng cục thống kê Việt Nam)</p>',NULL,321,'Chúc mừng !'),('ad39482b-5069-4a29-9b2e-c1014a40dbb8','<p>Vẫn là suy nghĩ cũ, bạn vẫn còn nhiều thứ phải chi, bạn quyết định ngó lơ, không đi khám.</p>',NULL,320,'Ngó lơ'),('ae457ec3-b8ad-4a2a-bdeb-f25218e6173f','<p>Vợ của bạn bất ngờ sốt nặng, bạn đưa vợ vào viện. Bác sĩ đưa ra kết quả vợ bạn bị sốt xuất huyết.</p><p>&nbsp;</p><p>Viện phí: 3,000,000 VNĐ</p>',NULL,320,'Tuần 8'),('b010adaf-5976-4528-9368-fe6171552664','<p>Sau khi đến bệnh viện, bác sĩ khám và cho kết quả là bạn vẫn bình thường, có thể do bạn làm việc nặng hoặc nằm sai tư thế mới dẫn đến tình trạng đau ngực</p>',NULL,321,'Khám bệnh'),('b1f30f75-14d7-45ae-ba29-9e3596047003','<p>Vì ảnh hưởng của dịch Covid-19, bạn cần phải mua khẩu trang và lương thực dự trữ.</p>',NULL,320,'Tuần 3'),('b3e6750d-664a-4d84-b4cd-541ceff5192e','<p>24,4% trẻ em từ 12-23 tháng tuổi KHÔNG được tiêm chủng vắc xin đầy đủ như lao, bại liệt (3 mũi), bạch hầu - ho gà - uốn ván (3 mũi), sởi, viêm gan B (3 mũi), viêm não (3 mũi).</p><p><br></p><p>Nhưng không sao, bạn còn nhiều thứ cần phải chi, con bạn sẽ được tiêm khi bạn có công việc tốt hơn.</p>',NULL,320,'Tiêm ngừa cho trẻ nhỏ'),('b9c6534a-2960-4d1a-bf58-3397b1218522','<p>Sau khi đến bệnh viện, bác sĩ khám và cho kết quả là bạn vẫn bình thường, có thể do bạn làm việc nặng hoặc nằm sai tư thế mới dẫn đến tình trạng đau ngực</p>',NULL,320,'Khám bệnh'),('ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','<p>Con của bạn cần được tiêm ngừa.</p>',NULL,321,'Tuần 2'),('ca17788d-e0a4-4e6d-ae23-537d17f6fb35','<p>Sử dụng nước sạch và nhà tiêu hợp vệ sinh là những yếu tố thiết yếu đảm bảo cho sức khỏe của con người. Nước không sạch và nhà tiêu không hợp vệ sinh có thể là yếu tố mang mầm mống các bệnh tật như bệnh tả và thương hàn. So với điều tra MICS4, 8% dân số Việt Nam không sử dụng nguồn nước đảm bảo sức khỏe.</p>',NULL,320,'Nước sạch và vệ sinh'),('ce30fd87-16fe-484e-9039-bf8165e6263a','<p>Vẫn là suy nghĩ cũ, bạn vẫn còn nhiều thứ phải chi, bạn quyết định ngó lơ, không đi khám.</p>',NULL,321,'Ngó lơ'),('d5529276-3af2-4fd2-9028-9b4594856371','<p>75,6% trẻ em từ 12-23 tháng tuổi được tiêm chủng vắc xin đầy đủ như lao, bại liệt (3 mũi), bạch hầu - ho gà - uốn ván (3 mũi), sởi, viêm gan B (3 mũi), viêm não (3 mũi).</p><p><br></p><p>Thật may, con của bạn nằm trong số đó.</p>',NULL,321,'Tiêm ngừa cho trẻ nhỏ'),('d5a8b29d-a28b-48e5-840b-15423087265f','<p>Đồng nghiệp của bạn bàn tán với nhau về vụ việc nguồn nước của nhà máy nước Sông Đà bị nhiễm dầu. Bạn sực nhớ trc đến giờ gia định bạn chỉ toàn dùng nước giếng đun sôi chứ không dùng nước máy và nước đóng thùng. Bạn sẽ:</p>',NULL,321,'Tuần 7'),('d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','<p>Vì ảnh hưởng của dịch Covid-19, bạn cần phải mua khẩu trang và lương thực dự trữ.</p>',NULL,321,'Tuần 3'),('dece0104-2532-4db3-ae7b-f383702d4f7b','<p>Con của bạn cần được tiêm ngừa.</p>',NULL,320,'Tuần 2'),('efd473c8-5001-4dad-b551-ca4245393ed6','<p>Nền công nghiệp suy thoái. Công ty của bạn vừa cắt giảm biên chế vì thua lỗ, thật không may bạn là một trong số các nhân viên bị cắt giảm biên chế. Nghề của bạn cũng là một nghề khó xin việc. Vợ bạn vừa đẻ, bạn có 1 vợ, và 2 con nhỏ. Nguồn thu chính của gia đình chính là bạn. Thật may bạn vẫn còn khoản tiền tiết kiệm được là 6tr. Bạn quyết định phải chọn một nghề tạm thời trước khi có một công việc mới tốt hơn(các công viêc dưới đây đều có mức lương bằng nhau là 5tr đồng/ tháng):</p>',NULL,320,'Thất nghiệp'),('fe59d665-223b-49dd-a1d6-e95b9d512d40','<p>24,4% trẻ em từ 12-23 tháng tuổi KHÔNG được tiêm chủng vắc xin đầy đủ như lao, bại liệt (3 mũi), bạch hầu - ho gà - uốn ván (3 mũi), sởi, viêm gan B (3 mũi), viêm não (3 mũi).</p><p><br></p><p>Nhưng không sao, bạn còn nhiều thứ cần phải chi, con bạn sẽ được tiêm khi bạn có công việc tốt hơn.</p>',NULL,321,'Tiêm ngừa cho trẻ nhỏ');
/*!40000 ALTER TABLE `screen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen_reading_time`
--

DROP TABLE IF EXISTS `screen_reading_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screen_reading_time` (
  `id` int(11) NOT NULL,
  `duration` bigint(20) DEFAULT NULL,
  `screen_id` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `screenFK_idx` (`screen_id`),
  KEY `screen_screen_reading_time_FK_idx` (`screen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen_reading_time`
--

LOCK TABLES `screen_reading_time` WRITE;
/*!40000 ALTER TABLE `screen_reading_time` DISABLE KEYS */;
INSERT INTO `screen_reading_time` VALUES (4112,152,'dc83b74e-f090-4f7c-aa84-4f83ea335d65',NULL),(4113,0,NULL,NULL),(4114,9,'05d1084b-7bbd-4cf3-883b-7be945581ede',NULL),(4117,6,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:33:26'),(4119,5,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:36:24'),(4120,4,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 13:36:30'),(4121,3,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:36:42'),(4122,9,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:44:15'),(4123,6,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 13:44:23'),(4124,4,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:45:11'),(4125,5,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:55:30'),(4126,3,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 13:55:34'),(4127,3,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:56:44'),(4128,4,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:57:52'),(4129,2,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 13:58:22'),(4130,5,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:06:07'),(4131,3,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:06:21'),(4132,2,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:06:38'),(4133,1,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 14:06:41'),(4134,0,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 14:06:43'),(4135,1,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 14:06:46'),(4136,0,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 14:06:48'),(4137,0,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 14:06:50'),(4138,1,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 14:06:52'),(4139,145,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:10:24'),(4140,6,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:10:57'),(4141,1,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:12:31'),(4142,1,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:13:10'),(4143,1,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:15:05'),(4144,1,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:17:55'),(4145,1,'05d1084b-7bbd-4cf3-883b-7be945581ede','2020-03-30 14:22:06'),(4146,3,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 14:22:11'),(4147,4,'5c1391f6-d5ba-4efc-81d3-f0a3532f5757','2020-03-30 14:22:16'),(4151,6,'661b1283-4cb0-4887-a531-15b17521b02d','2020-03-31 01:53:56'),(4152,2,'661b1283-4cb0-4887-a531-15b17521b02d','2020-03-31 01:54:06'),(4153,3,'18fffede-bcb7-4fbf-929d-e445591ce234','2020-03-31 01:54:11'),(4154,2,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 01:54:15'),(4155,0,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 01:54:17'),(4156,1,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 01:54:19'),(4157,0,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 01:54:21'),(4158,0,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 01:54:23'),(4159,0,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 01:54:25'),(4160,2,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 01:54:28'),(4164,10,'661b1283-4cb0-4887-a531-15b17521b02d','2020-03-31 03:17:29'),(4166,4,'661b1283-4cb0-4887-a531-15b17521b02d','2020-03-31 03:18:04'),(4167,2,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 03:18:07'),(4168,2,'661b1283-4cb0-4887-a531-15b17521b02d','2020-03-31 03:18:14'),(4169,2,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 03:18:17'),(4170,3,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 03:18:22'),(4171,1,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 03:18:24'),(4172,1,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 03:18:26'),(4173,1,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-03-31 03:18:29'),(4174,3,'661b1283-4cb0-4887-a531-15b17521b02d','2020-04-02 15:35:55'),(4175,0,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-04-02 15:35:57'),(4176,1,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-04-02 15:35:59'),(4177,1,'18fffede-bcb7-4fbf-929d-e445591ce234','2020-04-02 15:36:02'),(4178,1,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-04-02 15:36:04'),(4179,0,'18fffede-bcb7-4fbf-929d-e445591ce234','2020-04-02 15:36:06'),(4180,22,'661b1283-4cb0-4887-a531-15b17521b02d','2020-04-02 15:36:28'),(4181,3,'661b1283-4cb0-4887-a531-15b17521b02d','2020-04-02 15:36:33'),(4182,1,'661b1283-4cb0-4887-a531-15b17521b02d','2020-04-02 15:43:56'),(4183,3,'661b1283-4cb0-4887-a531-15b17521b02d','2020-04-02 15:44:04'),(4184,1,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-04-02 15:44:06'),(4185,2,'18fffede-bcb7-4fbf-929d-e445591ce234','2020-04-02 15:44:08'),(4186,2,'661b1283-4cb0-4887-a531-15b17521b02d','2020-04-02 15:44:12'),(4187,15,'6533e5aa-c76b-4bc3-8fa8-229ca8aa56d8','2020-04-02 15:44:21'),(4188,12,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-02 17:02:23'),(4189,2,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-02 17:02:27'),(4190,4,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-02 17:02:33'),(4191,2,'fe59d665-223b-49dd-a1d6-e95b9d512d40','2020-04-02 17:02:36'),(4192,6,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-02 17:02:43'),(4193,6,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-02 17:02:51'),(4194,6,'b010adaf-5976-4528-9368-fe6171552664','2020-04-02 17:02:58'),(4195,3,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-02 17:03:03'),(4196,8,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-02 17:03:12'),(4197,4,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-02 17:03:18'),(4198,6,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-02 17:03:25'),(4199,1,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-02 17:03:28'),(4200,1,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-02 17:03:31'),(4202,2,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-02 17:03:51'),(4203,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-02 17:03:53'),(4204,3,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-02 17:03:58'),(4205,3,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-02 17:04:03'),(4206,6,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-02 17:04:10'),(4207,7,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-02 17:04:18'),(4208,7,'b010adaf-5976-4528-9368-fe6171552664','2020-04-02 17:04:27'),(4209,5,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-02 17:04:34'),(4210,14,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-02 17:04:50'),(4211,4,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-02 17:04:56'),(4212,6,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-02 17:05:03'),(4213,1,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-02 17:05:05'),(4214,6,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-02 17:05:12'),(4215,13,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-02 17:05:38'),(4216,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-02 17:05:40'),(4217,2,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-02 17:10:03'),(4218,2,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-02 17:10:06'),(4219,24,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-02 17:10:31'),(4220,1,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-02 17:10:34'),(4221,2,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-02 17:10:38'),(4222,2,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-02 17:10:42'),(4223,2,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-02 17:10:45'),(4224,4,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-02 17:10:51'),(4225,2,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-02 17:10:55'),(4226,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-02 17:10:58'),(4227,19,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-02 17:11:18'),(4228,2,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-02 17:11:21'),(4229,5,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-02 17:11:27'),(4230,152,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-02 17:14:08'),(4231,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-02 17:14:11'),(4232,2,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-02 17:14:14'),(4233,1,'fe59d665-223b-49dd-a1d6-e95b9d512d40','2020-04-02 17:14:17'),(4234,2,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-02 17:14:21'),(4235,2,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-02 17:14:24'),(4236,1,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-02 17:14:27'),(4237,1,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-02 17:14:30'),(4238,2,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-02 17:14:33'),(4239,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-02 17:14:35'),(4240,2,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-02 17:14:39'),(4241,1,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-02 17:14:42'),(4242,1,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-02 17:14:45'),(4243,419,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 02:42:19'),(4244,1,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 02:42:30'),(4245,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 02:42:32'),(4246,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 02:42:34'),(4247,1,'fe59d665-223b-49dd-a1d6-e95b9d512d40','2020-04-03 02:42:36'),(4248,1,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 02:42:39'),(4249,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 02:42:42'),(4250,1,'b010adaf-5976-4528-9368-fe6171552664','2020-04-03 02:42:44'),(4251,1,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 02:42:46'),(4252,2,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 02:42:50'),(4253,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 02:42:52'),(4254,3,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 02:42:57'),(4255,1,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 02:43:00'),(4256,1,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 02:43:03'),(4258,21,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 04:10:40'),(4259,2,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 04:10:44'),(4260,12,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 04:10:57'),(4261,26,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 04:11:24'),(4262,2,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 04:11:28'),(4263,4,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 04:11:33'),(4264,1,'b010adaf-5976-4528-9368-fe6171552664','2020-04-03 04:11:36'),(4265,1,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 04:11:38'),(4266,3,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 04:11:43'),(4267,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 04:11:45'),(4268,3,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 04:11:49'),(4269,2,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 04:11:53'),(4270,2,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 04:11:57'),(4271,155,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 06:26:36'),(4272,78,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 06:27:56'),(4273,4,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 06:37:32'),(4274,3,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 06:37:37'),(4275,1,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 06:39:41'),(4276,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 06:39:43'),(4277,1,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 06:41:03'),(4278,1,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 06:41:42'),(4279,0,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 06:41:44'),(4280,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 06:41:46'),(4281,1,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 06:41:48'),(4282,1,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 06:41:51'),(4283,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 06:41:53'),(4284,3,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-03 06:41:57'),(4285,0,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 06:41:59'),(4286,0,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 06:42:01'),(4287,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 06:42:04'),(4288,0,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 06:42:06'),(4289,0,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 06:42:08'),(4290,1,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 06:42:11'),(4292,98,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 06:44:06'),(4293,3,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 06:44:10'),(4294,3,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 06:44:15'),(4295,1,'fe59d665-223b-49dd-a1d6-e95b9d512d40','2020-04-03 06:44:18'),(4296,5,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 06:44:24'),(4297,0,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 06:44:26'),(4298,1,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-03 06:44:29'),(4299,3,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 06:44:33'),(4300,4,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 08:59:07'),(4301,25,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 08:59:34'),(4302,3,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 09:09:08'),(4303,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 09:09:11'),(4304,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 09:09:11'),(4306,5,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 09:09:24'),(4307,9,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 09:09:30'),(4308,2,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 09:09:33'),(4309,3,'fe59d665-223b-49dd-a1d6-e95b9d512d40','2020-04-03 09:09:35'),(4310,85,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 09:10:19'),(4311,59,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 09:10:50'),(4312,2,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-03 09:10:52'),(4313,4,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 09:10:55'),(4314,11,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 09:11:02'),(4315,2,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 09:11:04'),(4316,4,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 09:11:07'),(4317,3,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 09:11:10'),(4318,3,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 09:11:13'),(4319,2,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 09:13:32'),(4320,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 09:13:34'),(4321,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 09:13:37'),(4322,1,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 09:13:39'),(4323,1,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 09:13:42'),(4324,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 09:13:44'),(4325,198,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 09:17:53'),(4326,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 09:17:55'),(4327,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 09:17:58'),(4328,220,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 09:21:39'),(4329,2,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 09:21:43'),(4330,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 09:21:45'),(4331,1,'b010adaf-5976-4528-9368-fe6171552664','2020-04-03 09:21:47'),(4332,3,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 09:21:51'),(4333,12,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 09:22:05'),(4334,3,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 09:22:09'),(4335,3,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 09:22:14'),(4336,1,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 09:22:16'),(4337,1,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 09:22:18'),(4338,1,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 09:22:52'),(4339,2,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 09:22:55'),(4340,2,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 09:22:58'),(4341,7,'fe59d665-223b-49dd-a1d6-e95b9d512d40','2020-04-03 09:23:07'),(4342,3,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 09:23:11'),(4343,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 09:23:14'),(4344,7,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-03 09:23:23'),(4345,3,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 09:23:27'),(4346,4,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 09:30:28'),(4347,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 09:30:30'),(4348,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 09:30:32'),(4349,1,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 09:30:35'),(4350,1,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 09:30:37'),(4351,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 09:30:39'),(4352,1,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-03 09:30:41'),(4353,2,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 09:30:45'),(4354,2,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 09:30:49'),(4355,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 09:30:51'),(4356,1,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 09:30:54'),(4357,0,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 09:30:56'),(4358,1,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 09:30:58'),(4359,1,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 09:31:44'),(4360,0,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 09:31:46'),(4361,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 09:31:48'),(4362,0,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 09:31:50'),(4363,1,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 09:31:53'),(4364,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 09:31:55'),(4365,1,'b010adaf-5976-4528-9368-fe6171552664','2020-04-03 09:31:57'),(4366,1,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 09:32:00'),(4367,2,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 09:32:03'),(4368,0,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 09:32:05'),(4369,2,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 09:32:09'),(4370,0,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 09:32:11'),(4371,1,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 09:32:13'),(4372,1,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 12:13:43'),(4373,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 12:13:45'),(4374,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 12:13:47'),(4375,1,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 12:13:49'),(4376,1,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 12:13:52'),(4377,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 12:13:55'),(4378,0,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-03 12:13:57'),(4379,1,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 12:13:59'),(4380,1,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 12:14:01'),(4381,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 12:14:03'),(4382,1,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 12:14:05'),(4383,0,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 12:14:07'),(4384,0,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 12:14:09'),(4385,11,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 12:19:47'),(4386,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 12:19:49'),(4387,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 12:19:51'),(4388,1,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 12:19:53'),(4389,1,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 12:19:55'),(4390,2,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 12:21:29'),(4391,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 12:21:31'),(4392,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 12:21:33'),(4393,1,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 12:21:35'),(4394,1,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 12:21:38'),(4395,1,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 12:21:40'),(4396,0,'b010adaf-5976-4528-9368-fe6171552664','2020-04-03 12:21:42'),(4397,0,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 12:21:44'),(4398,2,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 12:21:48'),(4399,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 12:21:50'),(4400,1,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 12:21:53'),(4401,1,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 12:21:55'),(4402,1,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 12:21:57'),(4403,3601,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 14:10:31'),(4404,1,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 14:10:33'),(4405,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 14:10:35'),(4406,0,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 14:10:37'),(4407,98,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 14:12:17'),(4408,3,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 14:12:21'),(4409,0,'ce30fd87-16fe-484e-9039-bf8165e6263a','2020-04-03 14:12:23'),(4410,1,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 14:12:25'),(4411,1,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 14:12:28'),(4412,3,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 14:12:32'),(4413,0,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 14:12:34'),(4414,2,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 14:12:38'),(4415,89,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 14:14:08'),(4416,1,'0366e25f-0bfa-4a94-af13-c3ec25941f90','2020-04-03 14:15:02'),(4417,0,'469146fe-5c8e-42e4-bbb2-9b4c237b7217','2020-04-03 14:15:04'),(4418,1,'ba9305d2-46fd-4f9d-a79e-6ac43fd7e6a7','2020-04-03 14:15:06'),(4419,0,'d5529276-3af2-4fd2-9028-9b4594856371','2020-04-03 14:15:08'),(4420,2,'d5b819aa-eeaf-4d91-bb82-4b95eda8d61e','2020-04-03 14:15:11'),(4421,0,'28c21c6b-04c1-4385-a63a-8b77845ef8b0','2020-04-03 14:15:13'),(4422,0,'b010adaf-5976-4528-9368-fe6171552664','2020-04-03 14:15:15'),(4423,0,'7c90ec46-fb77-40b5-994e-cc9f2ae7b957','2020-04-03 14:15:17'),(4424,1,'0521754b-1f15-4418-885c-519ac72b16b5','2020-04-03 14:15:20'),(4425,1,'20bd730c-daa5-4c54-a6e9-dba3b5fedbc0','2020-04-03 14:15:22'),(4426,2,'d5a8b29d-a28b-48e5-840b-15423087265f','2020-04-03 14:15:25'),(4427,0,'5f3c4a50-9d2b-430f-b5f2-5db8c71d7d0a','2020-04-03 14:15:27'),(4428,0,'35103692-e415-4cf5-95b4-f0b25344cb6a','2020-04-03 14:15:29');
/*!40000 ALTER TABLE `screen_reading_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) DEFAULT '0',
  `animation` varchar(100) DEFAULT NULL,
  `avg_rate` float DEFAULT '0',
  `created_at` datetime(6) DEFAULT NULL,
  `deactive_by_admin` tinyint(1) DEFAULT '0',
  `first_screen_id` varchar(255) DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `intro` longtext,
  `num_of_read` int(11) DEFAULT '0',
  `published` tinyint(1) DEFAULT '0',
  `title` varchar(250) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `story_user_FK_idx` (`user_id`),
  KEY `first_screen_story_FK_idx` (`first_screen_id`),
  CONSTRAINT `my_story_first_screen_FK` FOREIGN KEY (`first_screen_id`) REFERENCES `screen` (`id`),
  CONSTRAINT `my_story_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
INSERT INTO `story` VALUES (314,1,'FADE',3.7,'2020-03-25 23:32:16.374000',0,'661b1283-4cb0-4887-a531-15b17521b02d',NULL,'<p>Có 3 con quạ bay qua mảnh sa mạc sahara, chúng nó đã bay nhiều ngày mà không có một giọt nước nào, chúng đã rất mệt và hi vọng của chúng nằm ở cuối cùng của sa mạc mà chúng tin rằng chỉ ở ngay phía trước.</p><p>Buổi trưa nắng gắt, khi 3 con quạ đang bay thì chúng để ý một vệt ánh sáng phản chiếu. Chúng bay xuống thì thấy đó là một cái giếng khô cằn, bên cạnh cái giếng có một cái chai nhỏ đen kín mít chỉ từ cửa miệng nhìn thấy có nước ở bên trong.</p><p>Con quạ thứ nhất nói : “ ở đây có một cái bình, chúng ta nên để đá vào đó để nước dâng lên, như thế chúng ta sẽ có nước uống”</p><p>Con quạ thứ hai nói : “không được, cái bình kín mít thế này, chúng ta k biết sẽ còn bao nhiêu nước. Theo t thấy, chúng ta nên tiếp tục bay đi, cuối sa mạc ở ngay phía trước.”</p><p>2 con quạ quay đầu nhìn lại quạ thủ lĩnh, quạ to con hơn hẳn 2 con kia. Nó suy nghĩ một hồi rồi quyết định:&nbsp;</p>',13,1,'Qua cung cai binh','2020-04-02 23:21:56.586000',5),(316,1,'FADE',3.5,'2020-03-28 20:39:19.450000',0,'3b7aa330-3c71-45f8-8c2a-c15658c5eb3f',NULL,'<p>day la noi dung cau truyen 1 cua devtai</p>',0,0,'truyen 1','2020-03-28 21:14:34.578000',5),(317,1,'FADE',0,'2020-03-28 20:40:28.866000',0,'862d33ed-074f-49b4-afc4-b23c18f0ba07',NULL,'<p>day la noi dung cua cau truyen do devtai nghi ra</p>',0,1,'truyen 2','2020-03-28 20:43:06.725000',5),(319,1,'FADE',0,'2020-03-29 15:13:34.673000',0,'8d9ab713-b503-4867-9bca-b161ca7a920b',NULL,'<p><span style=\"background-color: rgb(230, 0, 0); color: rgb(0, 138, 0);\">day la cau truyen dau tien cua toi ve 1 can benh mang ten covid 19, dang hoanh hanh tren the gioi﻿</span></p>',0,1,'truyen 1','2020-03-29 15:13:34.671000',2),(320,1,'GROW',0,'2020-04-03 00:01:10.188000',0,'efd473c8-5001-4dad-b551-ca4245393ed6',NULL,'<p>Bạn đang là học sinh, sinh viên hoặc đang đi làm với mức lương khá ổn định. Nhưng hãy thử tưởng tượng một ngày nào đó bạn thất nghiệp. Thật khó để hình dung bạn phải đối mặt với những gì đúng không? Hãy cũng tôi trải nghiệm nhé.</p>',0,1,'Nếu bạn thất nghiệp ','2020-04-03 00:01:10.164000',2),(321,1,'GROW',0,'2020-04-03 00:01:27.594000',0,'0366e25f-0bfa-4a94-af13-c3ec25941f90',NULL,'<p>Bạn đang là học sinh, sinh viên hoặc đang đi làm với mức lương khá ổn định. Nhưng hãy thử tưởng tượng một ngày nào đó bạn thất nghiệp. Thật khó để hình dung bạn phải đối mặt với những gì đúng không? Hãy cũng tôi trải nghiệm nhé.</p>',8,1,'Nếu bạn thất nghiệp ','2020-04-03 21:15:29.492000',2);
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story_tag`
--

DROP TABLE IF EXISTS `story_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story_tag` (
  `story_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`story_id`,`tag_id`),
  KEY `my_story_tag_FK2_idx` (`tag_id`),
  CONSTRAINT `my_story_tag_FK1` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_story_tag_FK2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story_tag`
--

LOCK TABLES `story_tag` WRITE;
/*!40000 ALTER TABLE `story_tag` DISABLE KEYS */;
INSERT INTO `story_tag` VALUES (319,1),(314,2),(316,2),(317,2),(317,3),(319,3),(316,4),(314,6),(314,7),(320,14),(321,14),(317,15),(320,15),(321,15),(319,22),(320,73),(321,73);
/*!40000 ALTER TABLE `story_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `title` varchar(100) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'2020-03-23 19:39:26.563000',1,'kinh di',NULL),(2,'2020-03-23 19:39:26.610000',1,'bi kich',NULL),(3,'2020-03-23 19:39:26.612000',1,'hai kich',NULL),(4,'2020-03-23 19:39:26.614000',1,'thieu nhi',NULL),(6,'2020-03-23 19:39:26.620000',1,'the gioi',NULL),(7,'2020-03-23 19:39:26.622000',1,'dong vat',NULL),(14,'2020-03-23 19:39:26.637000',1,'quang cao',NULL),(15,'2020-03-23 19:39:26.639000',1,'marketing',NULL),(22,'2020-03-23 19:39:26.654000',1,'chinh tri',NULL),(73,'2020-03-23 20:38:21.807000',1,'giao duc',NULL);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(1000) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `intro_content` varchar(300) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `is_deactive_by_admin` bit(1) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `profile_image` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  KEY `my_role_user_FK_idx` (`role_id`),
  CONSTRAINT `my_role_user_FK` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'2020-03-24 00:40:48.619000','systemadmin@gmail.com','toi la system admin cua he thong',_binary '',_binary '\0','systemadmin','$2a$10$JfRYg0V26q6IW8KYZ00sdubA1Zdn0TZYpLB0vs4e03X6dnxpR7L/y',3,NULL,'systemadmin',NULL),(2,'https://i.imgur.com/WnyfTWk.png','2020-03-24 09:29:48.211000','ductai1@gmail.com','toi la nguoi chuyen viet ve nhung cau truyen trinh tham vaf hanh dong, hay follow toi nhe.',_binary '',_binary '\0','ductai1','$2a$10$rkagX.GLW6/O1BogD0bl3uSgUKqUMjtzkjedXMMF2NHtuJW0DDKlC',2,'2020-03-31 09:00:20.987000','ductai1',NULL),(3,'https://avatars.dicebear.com/v2/avataaars/user1.svg?options[mood][]=happy&options[mouth][]=smile&options[accessories][]=sunglasses','2020-03-24 09:34:48.338000','user1@gmail.com',NULL,_binary '',_binary '\0','user1','$2a$10$VbpYXubIunISdTUtLEI/F.6THRZUDZS/mF3iuk5V8GwgiCa6h78.W',1,'2020-03-31 10:22:38.636000','user1',NULL),(5,'https://i.imgur.com/sr6MSP5.png','2020-03-25 20:51:24.573000','devtai@gmail.com',NULL,_binary '',_binary '\0','devtai','$2a$10$5MMBOb79TQRtpBjpmfog2OZXWYnlvJbFn7QHQQSUF7tVOUVeUUcpu',1,'2020-03-30 23:38:19.840000','devtai',NULL),(6,'https://avatars.dicebear.com/v2/avataaars/devtai1.svg?options[mood][]=happy&options[mouth][]=smile&options[accessories][]=sunglasses','2020-03-28 21:08:32.657000','devtai1@gmail.com',NULL,_binary '',_binary '\0','devtai1','$2a$10$Hn.TvuLQFgr7RkzlA90H2uCs/xyjD1jmWu9JveaAABpbmnCGn.3MS',1,NULL,'devtai1',NULL),(7,'https://avatars.dicebear.com/v2/avataaars/devdat.svg?options[mood][]=happy&options[mouth][]=smile&options[accessories][]=sunglasses','2020-03-30 23:33:53.464000','devdat@gmail.com',NULL,_binary '',_binary '\0','devdat','$2a$10$4IV/5Pe8/iMG9aAIVl2Iu.jcvr76/P3LM6baOkDRfeYbPeLurLpr2',1,NULL,'devdat',NULL),(8,'https://i.imgur.com/iYlCftR.png','2020-03-31 00:50:22.628000','anh@gmail.comm','nhin de',_binary '',_binary '\0','asdasd','$2a$10$f8xvTJbjUbfIRSU71qepteO8QbvjNFk2J9Q9OrlhQUhKy0i/NCT/u',3,'2020-03-31 00:54:43.302000','tramanh','https://i.imgur.com/vLpRU0G.png'),(9,NULL,'2020-03-31 00:57:44.090000','dsf@fma.c','',_binary '',_binary '\0','sdsdsd','$2a$10$va38QOrdEOmZAJK2sAnws.84O2zCNdOL1zNp/gBZruV7WL9kesR06',1,NULL,'áđâsd',NULL),(10,NULL,'2020-03-31 01:06:04.085000','buiductai232@gmail.coma',NULL,_binary '',_binary '\0','vxcvx','$2a$10$fFd1rtom9qfHMRBc6yvadehUXxaPvdE7v6lufShEnLA/nZq.rzO4u',2,NULL,'devtai12',NULL),(11,'https://avatars.dicebear.com/v2/avataaars/devtai3.svg?options[mood][]=happy&options[mouth][]=smile&options[accessories][]=sunglasses','2020-03-31 08:55:36.048000','devtai3@gmail.com',NULL,_binary '',_binary '\0','devtai3','$2a$10$6S2umSmq/eyTI1xIgDpHf.4Ld.b1f1hE5sIPjODl/a4uaXns3.IE.',1,NULL,'devtai3',NULL),(12,NULL,'2020-03-31 09:01:41.750000','ductai2@gmail.com',NULL,_binary '',_binary '\0','ductai2','$2a$10$JeS3TfL3rRc.0a0LIgFjT.gnf0KNUL6xnLyC18Pr368WdLHqKPzby',2,NULL,'ductai2',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-04 11:56:09
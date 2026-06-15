-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 14, 2024 at 08:06 AM
-- Server version: 8.0.36
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apiitax
_node_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `About`
--

CREATE TABLE IF NOT EXISTS `About` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `Account`
--

CREATE TABLE IF NOT EXISTS `Account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalDebit` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `totalCredit` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `debitBalance` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `creditBalance` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Agent`
--

CREATE TABLE IF NOT EXISTS `Agent` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `ApiService`
--
CREATE TABLE IF NOT EXISTS `ApiService` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `upcoming` tinyint(1) NOT NULL,
  `endpoint` json DEFAULT NULL,
  `bodyParams` json DEFAULT NULL,
  `response` json DEFAULT NULL,
  `responseJSON` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ApiService`
--

INSERT INTO `ApiService` (`id`, `title`, `category`, `overview`, `price`, `upcoming`, `endpoint`, `bodyParams`, `response`, `responseJSON`, `createdAt`, `updatedAt`) VALUES
('0a224919-3d13-4ed7-8195-a71aadf81fa2', 'Login', 'authentication', 'API allows users to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/users/login\"}', '[{\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"password\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '[{\"name\": \"id\", \"type\": \"number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"userType\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"phone\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"isverified\", \"type\": \"Boolean\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": true,\\n    \\\"results\\\": {\\n        \\\"status\\\": 200,\\n        \\\"message\\\": \\\"login successfull\\\",\\n        \\\"data\\\": {\\n            \\\"id\\\": 54,\\n            \\\"email\\\": \\\"vxxxxxxxxxxu@gmail.com\\\",\\n            \\\"first_name\\\": \\\"Vineet\\\",\\n            \\\"last_name\\\": \\\"Sharma\\\",\\n            \\\"userType\\\": \\\"normal\\\",\\n            \\\"phone\\\": \\\"8xxxxxxxx5\\\",\\n            \\\"pincode\\\": \\\"241122\\\",\\n            \\\"isverified\\\": true\\n        },\\n}\"', '2024-04-25 05:20:27.563', '2024-04-25 05:20:27.563'),
('0c21273b-1bb3-48e8-910d-c589f66eef7f', 'PDF Merge', 'image_pdf', 'PDF Merge APIs provide solutions for combining multiple PDF files into a single document.', 500, 1, '{\"method\": \"post\", \"endpoint\": \"https://mom.itaxeasy.com/api/merge\"}', NULL, '[]', '\"\"', '2024-04-25 05:20:27.804', '2024-04-25 05:20:27.804'),
('0cdc09af-e2e5-4124-b540-0f0605b410c8', 'Form-16', 'extraction_e_kyc', 'The API uses OCR technology to convert the image data into machine-readable text and retrieve the required information, such as the employees name, PAN number, and salary details.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/form-16\"}', '[{\"name\": \"bsr_code\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"challan_date\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"challan_serial_no\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"provisional_receipt_number\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"challan_amount\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"unique_pan_amount_combination_for_challan\", \"type\": \"Array\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '[{\"name\": \"bsr_code\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"challan_date\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"challlan_serial_no\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"job_id\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"tan\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"financial_year\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"quarter\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"status\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"bsr_code\\\": \\\"1234567\\\",\\n    \\\"challan_date\\\": 1670783400000,\\n    \\\"challlan_serial_no\\\": \\\"01234\\\",\\n    \\\"job: {\\n        job_id: \\\"12345\\\",\\n        tan: \\\"AAAA12345A\\\",\\n        financial_year: \\\"2020-21\\\",\\n        quarter: \\\"q1\\\",\\n        status: \\\"ok\\\"\\n    }\\n}\"', '2024-04-25 05:20:27.520', '2024-04-25 05:20:27.520'),
('3cf0c11c-388f-4f57-adc9-1b9f9b8abdec', 'Invoice', 'extraction_e_kyc', 'API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/admin/sign-up\"}', '[{\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"phone\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"password\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '[{\"name\": \"id\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"phone\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"isAdmin\", \"type\": \"boolean\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": true,\\n    \\\"results\\\": {\\n        \\\"status\\\": 200,\\n        \\\"message\\\": \\\"Registration Successfull\\\",\\n        \\\"data\\\": {\\n            \\\"id\\\": 134,\\n            \\\"email\\\": \\\"Vineetka@gmail.com\\\",\\n            \\\"first_name\\\": \\\"Vineet\\\",\\n            \\\"last_name\\\": \\\"Sharma\\\",\\n            \\\"phone\\\": \\\"9146732156\\\",\\n            \\\"pincode\\\": \\\"2411122\\\",\\n            \\\"isAdmin\\\": true\\n        },\\n    }\\n}\"', '2024-04-25 05:20:27.670', '2024-04-25 05:20:27.670'),
('47f2a836-abbd-477c-8a6f-5024cc2aeec0', 'PIN Code Info', 'post_office', 'API provides access to information about postal codes, including location, state, district, and geographical coordinates.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/pincode/pincodeinfo\"}', NULL, '[{\"name\": \"officeName\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"taluk\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"districtName\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"stateName\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"success\\\": true,\\n    \\\"info\\\": [\\n        {\\n            \\\"officeName\\\": \\\"Defence Colony S.O (Meerut)\\\",\\n            \\\"pincode\\\": 250001,\\n            \\\"taluk\\\": \\\"Meerut\\\",\\n            \\\"districtName\\\": \\\"Meerut\\\",\\n            \\\"stateName\\\": \\\"UTTAR PRADESH\\\"\\n        },\\n    ]\\n}\"', '2024-04-25 05:20:27.785', '2024-04-25 05:20:27.785'),
('4831de51-4fc4-4f79-8cac-7077a1017e1b', 'Aadhar', 'extraction_e_kyc', 'The unique identification number assigned to Indian citizens, for various purposes such as e-KYC (electronic Know Your Customer) verification, demographic data retrieval, and digital signature', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/pan/verify_aadhar\"}', NULL, '[{\"name\": \"@entity\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pan\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"full_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"aadhaar_seeding_status\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"status\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"category\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_updated\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"D.O.B\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"driver_license\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"voter_id\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": \\\"success\\\",\\n    \\\"company\\\": {\\n        \\\"@entity\\\": \\\"pan\\\",\\n        \\\"pan\\\": \\\"A********F\\\",\\n        \\\"first_name\\\": \\\"Rishab\\\",\\n        \\\"last_name\\\": \\\"Rawat\\\",\\n        \\\"full_name\\\": \\\"Shri Rishab Rawat\\\",\\n        \\\"aadhaar_seeding_status\\\": \\\"Y\\\",\\n        \\\"status\\\": \\\"VALID\\\",\\n        \\\"category\\\": \\\"Individual\\\",\\n        \\\"last_updated\\\": \\\"06/10/2020\\\",\\n        \\\"D.O.B\\\": \\\"02/10/1985\\\",\\n        \\\"driver_license\\\": \\\"DL-12345678901234\\\",\\n        \\\"voter_id\\\": \\\"ABC1234567\\\"\\n    }\\n}\"', '2024-04-25 05:20:27.652', '2024-04-25 05:20:27.652'),
('48fb0030-c4e3-44be-97d7-996cdc5335e6', 'Aadhaar', 'extraction_e_kyc', 'API allows user to send a file i.e. the image for aadhaar card and sends the response as a JSON object.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/admin/login\"}', '[{\"name\": \"file\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The File i.e. image for Aadhaar card is required to extract and get any proper response.\"}]', '[{\"name\": \"yearOfBirth\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The birthdate field extracted from the image..\"}, {\"name\": \"gender\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The gender field extracted from the image..\"}, {\"name\": \"aadhaarNumber\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The Aadhaar card number field extracted from the image..\"}, {\"name\": \"name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The name field extracted from the image..\"}]', '\"{\\n      \\\"status\\\": \\\"success\\\",\\n      \\\"data\\\": {\\n          \\\"yearOfBirth\\\": \\\"05/01/1989\\\",\\n          \\\"gender\\\": \\\"male\\\",\\n          \\\"aadhaarNumber\\\": \\\"400978972174\\\",\\n          \\\"name\\\": \\\"Pramod Kumar Yadav\\\"\\n      }\\n  }\"', '2024-04-25 05:20:27.538', '2024-04-25 05:20:27.538'),
('67b54c82-1269-4c92-84fe-b549cd806877', 'Compress', 'image_pdf', 'API offers a simple UI for compressing JPEG, PNG, GIF, and SVG images with bulk compression option.', 500, 1, '{\"method\": \"post\", \"endpoint\": \"https://mom.itaxeasy.com/api/compress\"}', NULL, '[]', '\"\"', '2024-04-25 05:20:27.830', '2024-04-25 05:20:27.830'),
('686ee1e0-0dc9-449c-a713-a7cb272683fd', 'Pan', 'extraction_e_kyc', 'API allows user to send picture for PAN Card and sends the information of the pan card in json format.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://ocr.itaxeasy.com/pan\"}', '[{\"name\": \"file\", \"type\": \"Form-data\", \"required\": \"Yes\", \"description\": \"The File which user wants to extract information from i.e. PAN Card Picture.\"}]', '[{\"name\": \"name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The extracted name from the file\"}, {\"name\": \"fatherName\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The extracted fathers name from the file\"}, {\"name\": \"dob\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The extracted dob from the file\"}, {\"name\": \"pan\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The extracted PAN from the file\"}]', '\"{\\n      \\\"status\\\": \\\"success\\\",\\n      \\\"data\\\": {\\n          \\\"name\\\": \\\"\\\",\\n          \\\"fatherName\\\": \\\"\\\",\\n          \\\"dob\\\": \\\"\\\",\\n          \\\"pan\\\": \\\"\\\"\\n      }\\n  }\"', '2024-04-25 05:20:27.551', '2024-04-25 05:20:27.551'),
('6980f05c-a7f2-40b7-baec-e5787b1597c6', 'Login with Google', 'authentication', 'API allows users to log in to a system using their Google credentials, enabling a secure and streamlined authentication process.', 500, 1, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/login/google\"}', NULL, '[]', '\"\"', '2024-04-25 05:20:27.838', '2024-04-25 05:20:27.838'),
('6ed5885a-5a4f-4ff0-b24e-1d0759fb93b8', 'Pan', 'extraction_e_kyc', 'API is used to retrieve information about an individual or entitys PAN card, including the cardholders name, date of birth, and PAN number, using the PAN number as the key identifier', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/pan/get-pan-details\"}', NULL, '[{\"name\": \"@entity\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pan\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"full_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"aadhaar_seeding_status\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"status\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"category\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_updated\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": \\\"success\\\",\\n    \\\"company\\\": {\\n        \\\"@entity\\\": \\\"pan\\\",\\n        \\\"pan\\\": \\\"A********F\\\",\\n        \\\"first_name\\\": \\\"Rachit\\\",\\n        \\\"last_name\\\": \\\"Kumar\\\",\\n        \\\"full_name\\\": \\\"Shri Rachit Kumar\\\",\\n        \\\"aadhaar_seeding_status\\\": \\\"Y\\\",\\n        \\\"status\\\": \\\"VALID\\\",\\n        \\\"category\\\": \\\"Individual\\\",\\n        \\\"last_updated\\\": \\\"06/10/2020\\\",\\n\\n    }\\n}\"', '2024-04-25 05:20:27.624', '2024-04-25 05:20:27.624'),
('79e71ed6-22fa-4d04-8115-6499f95415cb', 'Logout', 'authentication', 'API allows users to log out of a system by sending a request to invalidate their current session and terminate authentication.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/\"}', NULL, '[{\"name\": \"x-apideck-consumer-id\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"curl --request POST\\n--url https://api.sandbox.co.in/\\n--header Accept: application/json\\n--header Content-Type: application/json\\n--header x-api-version: 1.0  --data\"', '2024-04-25 05:20:27.614', '2024-04-25 05:20:27.614'),
('8536ee55-6236-43e4-a199-e7c8e5d71b64', 'E-KYC', 'extraction_e_kyc', 'E-KYC APIs provide electronic verification of individuals from goverment database', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/pan/verify_aadhar\"}', NULL, '[{\"name\": \"@entity\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pan\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"full_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"aadhaar_seeding_status\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"status\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"category\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_updated\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": \\\"success\\\",\\n    \\\"company\\\": {\\n        \\\"@entity\\\": \\\"pan\\\",\\n        \\\"pan\\\": \\\"A********F\\\",\\n        \\\"first_name\\\": \\\"Rishab\\\",\\n        \\\"last_name\\\": \\\"Singh\\\",\\n        \\\"full_name\\\": \\\"Shri Rishab Singh\\\",\\n        \\\"aadhaar_seeding_status\\\": \\\"Y\\\",\\n        \\\"status\\\": \\\"VALID\\\",\\n        \\\"category\\\": \\\"Individual\\\",\\n        \\\"last_updated\\\": \\\"06/10/2020\\\"\\n    }\\n}\"', '2024-04-25 05:20:27.705', '2024-04-25 05:20:27.705'),
('b14b046c-be4d-4307-89cf-beaf1e9bca69', 'Admin SignUp', 'authentication', 'API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/admin/sign-up\"}', '[{\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"phone\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"password\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '[{\"name\": \"id\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"phone\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"isAdmin\", \"type\": \"boolean\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": true,\\n    \\\"results\\\": {\\n        \\\"status\\\": 200,\\n        \\\"message\\\": \\\"Registration Successfull\\\",\\n        \\\"data\\\": {\\n            \\\"id\\\": 134,\\n            \\\"email\\\": \\\"Vineetka@gmail.com\\\",\\n            \\\"first_name\\\": \\\"Vineet\\\",\\n            \\\"last_name\\\": \\\"Sharma\\\",\\n            \\\"phone\\\": \\\"9146732156\\\",\\n            \\\"pincode\\\": \\\"2411122\\\",\\n            \\\"isAdmin\\\": true\\n        },\\n    }\\n}\"', '2024-04-25 05:20:27.503', '2024-04-25 05:20:27.503'),
('b79014e3-5c38-4b7b-8730-fccbf079986c', 'PIN Code by City', 'post_office', 'Pin code API provides a solution for retrieving postal codes (known as PIN codes) based on a given city name.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/pincode/pincodebycity\"}', NULL, '[{\"name\": \"officeName\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"taluk\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"districtName\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"stateName\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"success\\\": true,\\n    \\\"info\\\": [\\n        {\\n            \\\"officeName\\\": \\\"Defence Colony S.O (Meerut)\\\",\\n            \\\"pincode\\\": 250001,\\n            \\\"taluk\\\": \\\"Meerut\\\",\\n            \\\"districtName\\\": \\\"Meerut\\\",\\n            \\\"stateName\\\": \\\"UTTAR PRADESH\\\"\\n        },\\n        {\\n            \\\"officeName\\\": \\\"Saket S.O (Meerut)\\\",\\n            \\\"pincode\\\": 250003,\\n            \\\"taluk\\\": \\\"Meerut\\\",\\n            \\\"districtName\\\": \\\"Meerut\\\",\\n            \\\"stateName\\\": \\\"UTTAR PRADESH\\\"\\n        },\\n    ]\\n  }\"', '2024-04-25 05:20:27.795', '2024-04-25 05:20:27.795'),
('c90b31ff-9ffe-4e74-8884-e0a5653f0d1c', 'Signup', 'authentication', 'API enables users to register for a service by sending a request with their information and receiving a response with status and authentication credentials', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/users/sign-up\"}', '[{\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"phone\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"password\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '[{\"name\": \"id\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"phone\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": true,\\n    \\\"results\\\": {\\n        \\\"status\\\": 200,\\n        \\\"message\\\": \\\"Registration Successfull\\\",\\n        \\\"data\\\": {\\n            \\\"id\\\": 134,\\n            \\\"email\\\": \\\"Vineetka@gmail.com\\\",\\n            \\\"first_name\\\": \\\"Vineet\\\",\\n            \\\"last_name\\\": \\\"Sharma\\\",\\n            \\\"phone\\\": \\\"9146732156\\\",\\n            \\\"pincode\\\": \\\"2411122\\\"\\n        },\\n    }\\n}\"', '2024-04-25 05:20:27.485', '2024-04-25 05:20:27.485'),
('cab810b8-14bd-4982-bc05-38add0dc7c06', 'IFSC Details', 'bank', 'The IFSC (Indian Financial System Code) Details API is used to retrieve information about a particular bank branch in India, including the banks name, address, contact details, and IFSC code, using the IFSC code as the key identifier.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://laravel.itaxeasy.com/api/bank/get-details?ifsc\"}', NULL, '[{\"name\": \"MICR\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"BRANCH\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"ADDRESS\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"STATE\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"CONTACT\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"UPI\", \"type\": \"Boolean\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"RTGS\", \"type\": \"Boolean\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"CITY\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"CENTRE\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"DISTRICT\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"NEFT\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"IMPS\", \"type\": \"Boolean\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"SWIFT\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"ISO3166\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"BANK\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"BANKCODE\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"IFSC\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n        \\\"data\\\": {\\n        \\\"MICR\\\": null,\\n        \\\"BRANCH\\\": \\\"Noida Branch\\\",\\n        \\\"ADDRESS\\\": \\\"B-121, Sector-5,Noida-201301\\\",\\n        \\\"STATE\\\": \\\"UTTAR PRADESH\\\",\\n        \\\"CONTACT\\\": \\\"+911133996699\\\",\\n        \\\"UPI\\\": true,\\n        \\\"RTGS\\\": true,\\n        \\\"CITY\\\": \\\"NOIDA\\\",\\n        \\\"CENTRE\\\": \\\"Gautam Buddh Nagar\\\",\\n        \\\"DISTRICT\\\": \\\"Gautam Buddh Nagar\\\",\\n        \\\"NEFT\\\": true,\\n        \\\"IMPS\\\": true,\\n        \\\"SWIFT\\\": null,\\n        \\\"ISO3166\\\": \\\"IN-UP\\\",\\n        \\\"BANK\\\": \\\"Paytm Payments Bank\\\",\\n        \\\"BANKCODE\\\": \\\"PYTM\\\",\\n        \\\"IFSC\\\": \\\"PYTM0123456\\\"\\n    }\\n        }\"', '2024-04-25 05:20:27.722', '2024-04-25 05:20:27.722'),
('cc44fc71-ce0a-427b-90d7-d2afd4d4266a', 'Admin Login', 'authentication', 'API allows administrators to create a new account by sending a request with their information and receiving a response with status and authentication credentials.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/admin/login\"}', '[{\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"password\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '[{\"name\": \"id\", \"type\": \"number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"email\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"first_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"last_name\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"userType\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"phone\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"pincode\", \"type\": \"number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"isverified\", \"type\": \"Boolean\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"isAdmin\", \"type\": \"Boolean\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": true,\\n    \\\"results\\\": {\\n        \\\"status\\\": 200,\\n        \\\"message\\\": \\\"login successfull\\\",\\n        \\\"data\\\": {\\n            \\\"id\\\": 54,\\n            \\\"email\\\": \\\"vxxxxxxxxxxu@gmail.com\\\",\\n            \\\"first_name\\\": \\\"Vineet\\\",\\n            \\\"last_name\\\": \\\"Sharma\\\",\\n            \\\"userType\\\": \\\"normal\\\",\\n            \\\"phone\\\": \\\"8xxxxxxxx5\\\",\\n            \\\"pincode\\\": \\\"241122\\\",\\n            \\\"isverified\\\": true,\\n            \\\"isAdmin\\\": true\\n        },\\n}\"', '2024-04-25 05:20:27.596', '2024-04-25 05:20:27.596');
INSERT INTO `ApiService` (`id`, `title`, `category`, `overview`, `price`, `upcoming`, `endpoint`, `bodyParams`, `response`, `responseJSON`, `createdAt`, `updatedAt`) VALUES
('d003ca30-90de-4fc8-a59f-e03f24a3cfbe', 'SAC Code API', 'gst', 'API allows user to fetch all SAC Codes via a GET request and sends as a JSON object in response to the request', 500, 0, '{\"method\": \"get\", \"endpoint\": \"https://backend.itaxeasy.com/hsn/getsacall\"}', NULL, '[{\"name\": \"id\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"code\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"SAC Code for the respective ID\"}, {\"name\": \"description\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"Description for the respective SAC Code and ID\"}, {\"name\": \"createdAt\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The Date and time of SAC Code created at respective to the ID\"}, {\"name\": \"updatedAt\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The Date and time of SAC Code updated at respective to the ID\"}]', '\"{\\n      \\\"status\\\": true,\\n      \\\"message\\\": \\\"Sac code\\\",\\n      \\\"data\\\": [\\n          {\\n              \\\"id\\\": 2,\\n              \\\"code\\\": 99,\\n              \\\"description\\\": \\\"All Services\\\",\\n              \\\"createdAt\\\": \\\"2022-11-18T19:06:09.000Z\\\",\\n              \\\"updatedAt\\\": \\\"2022-11-18T19:06:09.000Z\\\"\\n          },\\n          {\\n              \\\"id\\\": 3,\\n              \\\"code\\\": 9954,\\n              \\\"description\\\": \\\"Construction services\\\",\\n              \\\"createdAt\\\": \\\"2022-11-18T19:06:09.000Z\\\",\\n              \\\"updatedAt\\\": \\\"2022-11-18T19:06:09.000Z\\\"\\n          },\\n          {\\n            \\\"id\\\": 4,\\n            \\\"code\\\": 995411,\\n            \\\"description\\\": \\\"Construction services of single dwelling or multi dwelling or multi-storied residential buildings\\\",\\n            \\\"createdAt\\\": \\\"2022-11-18T19:06:09.000Z\\\",\\n            \\\"updatedAt\\\": \\\"2022-11-18T19:06:09.000Z\\\"\\n        },\\n          ....rest of the response\"', '2024-04-25 05:20:27.865', '2024-04-25 05:20:27.865'),
('dcfe8a40-6dd5-42a1-96e5-16666379398d', 'HSN Code API', 'gst', 'API allows user to fetch all HSN Codes via a GET request and sends as a JSON object in response to the request', 500, 0, '{\"method\": \"get\", \"endpoint\": \"https://backend.itaxeasy.com/hsn/gethsnall\"}', NULL, '[{\"name\": \"id\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"hsn_code\", \"type\": \"Number\", \"required\": \"Yes\", \"description\": \"HSN Code for the respective ID\"}, {\"name\": \"description\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"Description for the respective HSN Code and ID\"}, {\"name\": \"createdAt\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The Date and time of HSN Code created at respective to the ID\"}, {\"name\": \"updatedAt\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The Date and time of HSN Code updated at respective to the ID\"}]', '\"{\\n      \\\"status\\\": true,\\n      \\\"message\\\": \\\"hsn code\\\",\\n      \\\"data\\\": [\\n          {\\n              \\\"id\\\": 2,\\n              \\\"hsn_code\\\": 1,\\n              \\\"description\\\": \\\"Live Animals; Animal Products\\\",\\n              \\\"createdAt\\\": \\\"2022-11-18T18:55:39.000Z\\\",\\n              \\\"updatedAt\\\": \\\"2022-11-18T18:57:46.000Z\\\"\\n          },\\n          {\\n              \\\"id\\\": 3,\\n              \\\"hsn_code\\\": 101,\\n              \\\"description\\\": \\\"LIVE HORSES, ASSES, MULES AND HINNIES - Horses:\\\",\\n              \\\"createdAt\\\": \\\"2022-11-18T18:55:39.000Z\\\",\\n              \\\"updatedAt\\\": \\\"2022-11-18T18:57:46.000Z\\\"\\n          },\\n          {\\n              \\\"id\\\": 4,\\n              \\\"hsn_code\\\": 1011010,\\n              \\\"description\\\": \\\"LIVE HORSES, ASSES, MULES AND HINNIES PURE-BRED BREEDING ANIMALS HORSES\\\",\\n              \\\"createdAt\\\": \\\"2022-11-18T18:55:39.000Z\\\",\\n              \\\"updatedAt\\\": \\\"2022-11-18T18:57:46.000Z\\\"\\n          },\\n          {\\n              \\\"id\\\": 5,\\n              \\\"hsn_code\\\": 1011020,\\n              \\\"description\\\": \\\"LIVE HORSES, ASSES, MULESANDHINNIES PURE-BRED BREEDING ANIMALS ASSES\\\",\\n              \\\"createdAt\\\": \\\"2022-11-18T18:55:39.000Z\\\",\\n              \\\"updatedAt\\\": \\\"2022-11-18T18:57:46.000Z\\\"\\n          },\\n\\n          ....rest of the response\"', '2024-04-25 05:20:27.849', '2024-04-25 05:20:27.849'),
('e4e4d61d-3ade-43a7-a166-2d69dc4241f2', 'Verify Accounts', 'bank', 'API provides a simple way to verify the authenticity of a users account information, typically by sending a confirmation code to their email or phone number.', 500, 0, '{\"method\": \"post\", \"endpoint\": \"https://backend.itaxeasy.com/email/verify\"}', NULL, '[{\"name\": \"status\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}, {\"name\": \"message\", \"type\": \"String\", \"required\": \"Yes\", \"description\": \"The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app\"}]', '\"{\\n    \\\"status\\\": \\\"success\\\",\\n    \\\"message\\\": \\\"user verified successfully\\\"\\n}\"', '2024-04-25 05:20:27.754', '2024-04-25 05:20:27.754'),
('fb3edbe4-4399-4620-8dc3-441aa0f5d08d', 'IMG to PDF', 'image_pdf', 'Image to PDF APIs convert images to PDF format, supporting various image formats with customization options for the resulting PDF.', 500, 1, '{\"method\": \"post\", \"endpoint\": \"https://mom.itaxeasy.com/api/imagetopdf\"}', NULL, '[]', '\"\"', '2024-04-25 05:20:27.819', '2024-04-25 05:20:27.819');

-- --------------------------------------------------------

--
-- Table structure for table `BankDetails`
--

CREATE TABLE IF NOT EXISTS `BankDetails` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountHolderName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankAccountNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankIfsc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankBranch` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankAccountType` enum('savings','current','nri','fcnr','rd','fd','salary') COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Billpayable`
--

CREATE TABLE IF NOT EXISTS `Billpayable` (
  `id` int NOT NULL,
  `supplierName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplierAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dueDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billAmount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billDiscription` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentMethod` enum('cash','creditcard','upi','netbanking','cheque') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cash',
  `transactionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentAmount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Billrecieve`
--

CREATE TABLE IF NOT EXISTS `Billrecieve` (
  `id` int NOT NULL,
  `billNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemQuantity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemPrice` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemDescription` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentStatus` enum('paid','unpaid','overdue') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `paymentMethod` enum('cash','creditcard','upi','netbanking','cheque') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cash',
  `dueDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `BusinessProfile`
--

CREATE TABLE IF NOT EXISTS `BusinessProfile` (
  `id` int NOT NULL,
  `businessName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gstin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankAccountNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankIfsc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankBranch` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `isAddressVerified` tinyint(1) DEFAULT NULL,
  `isBusinessNameVerified` tinyint(1) DEFAULT NULL,
  `isGstinVerified` tinyint(1) DEFAULT NULL,
  `isPanVerified` tinyint(1) DEFAULT NULL,
  `isStateVerified` tinyint(1) DEFAULT NULL,
  `ctb` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msme_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxpayer_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dst` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landmark` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statecode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stcd` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Dumping data for table `User`
--
INSERT INTO `User` (`id`, `createdAt`, `email`, `password`, `firstName`, `lastName`, `fatherName`, `phone`, `gender`, `address`, `pin`, `aadhaar`, `pan`, `dob`, `adminId`, `superadminId`, `verified`, `userType`, `avatar`, `middleName`) VALUES
(1, '2024-03-04 22:48:52.674', 'sudhirnandane47@gmail.com', '$2b$10$NlgR1Ma6ZnCFWixhA.9kTetSVIHDaO0hwHRUfEW3WXEpK2NiT9LAe', 'sudhir1223', 'nandane1222qqq12333', NULL, '1234567821', 'male', NULL, NULL, '809297062965', NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(2, '2024-03-05 03:49:13.841', 'vishwasgupta841779@gmail.com', '$2b$10$JgSlEXIVFDuc46egLZ3TPeGPoi8CS3gAarYnLxHiw5JZWxngCCwTG', 'Jishan', 'Ali', NULL, '9654742699', 'male', '286, Arthala, Mohan Nagar, Ghaziabad', '201007', '343007123961', 'DSYPA0162G', NULL, 2, NULL, 0, 'agent', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715247554/dashboard/users/jishankhannew%40outlook.com/update/profile_1715247551793.jpg', 'Ahemad'),
(3, '2024-03-09 15:24:46.569', 'mohitchack21@gmail.com', '$2b$10$prsLylmowvPSEcDzi/j9i.bACUay8.L6R4UayRfYxY0CZ7hGPqHF.', 'mohit', 'chack', NULL, '8962334644', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(4, '2024-03-10 09:31:12.898', 'mukulbedi@yahoo.com', '$2b$10$Sck8GgshbuLJ29FknadNy.6LTQiP7n5xFlqYxYk/9AzpUyIxArjGe', 'MUKUL', 'BEDI', '', '9425113371', 'male', 'Gwalior', '474002', '917777785061', 'AAZPB7895F', NULL, NULL, NULL, 1, 'superadmin', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715230829/dashboard/users/mukulbedi%40yahoo.com/update/Screenshot%20%282008%29_1715230827706.png', ''),
(5, '2024-03-10 09:33:39.231', 'mukulbedi@hotmail.com', '$2b$10$Liz98H1j0oSLKw7o73qO2utzfisKNaLmBU0SqfVNu/8/FZL9IOLcG', 'sonali', 'raikwar', NULL, '8770877270', 'female', NULL, '474002', NULL, NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(6, '2024-03-10 10:58:46.809', 'rajeevkushwah429@gmail.com', '$2b$10$GH0lhf9n2K1LoLBdxtiT5.xZOOf4koa3x86I.A6SWyBaUXyd4JeL2', 'raj', '	kush', NULL, '8817121440', 'male', '', '', '', '', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(7, '2024-03-11 05:05:23.611', 'indianvkhind@gmail.com', '$2b$10$QFC9SDbIbKAmE5B2qC5bmOzwNSVxJKiZfPYXuP049Kzft27VnyCw6', 'Demo', 'User', '', '9425113371', 'male', 'delhi', '474001', '600355915044', 'HATPS4271K', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(8, '2024-03-11 05:55:18.821', 'nandanesudhir1@gmail.com', '$2b$10$K/cLvi3l8DdD3yG6Du6WA.Sb5q9YWuHdc8L/RiIyDNmjnXJqRYrLS', 'sudhir', 'nandane', NULL, '9657267157', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(9, '2024-03-11 07:44:15.203', 'sonali.mdm@gmail.com', '$2b$10$cwPJuId.6WuYT4AMVabfK.PujxBKauKuv/0xBCcYfGMsbstSO9Iqa', 'sonali', 'raiwar', '', '9650771730', 'female', 'Gwalior', '474002', '600355915022', 'hatps4271k', NULL, NULL, NULL, 1, 'normal', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715794304/dashboard/users/sonali.mdm%40gmail.com/update/WhatsApp%20Image%202024-04-01%20at%2010_1715794302931.jpg', 'kumari'),
(10, '2024-03-11 09:47:00.407', 'mowapes209@irnini.com', '$2b$10$91J/ZeVhnqtf1VBxASwK1uBjiA7ueBH2ycipyQf/Jp9S/GRUgbE8K', 'mowapes209@irnini.co', 'mowapes209@irnini.com', NULL, '1234567890', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(11, '2024-03-11 15:11:24.901', 'koyar65523@irnini.com', '$2b$10$SNxbI/Chvf/Y2RQ6HyR/zuz9OANBu82bTvVdBowfqFrUtYAK6LFFi', 'koyar65523@irnini.co', 'koyar65523@irnini.com', NULL, '9765543231', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(12, '2024-03-11 16:25:30.028', 'hgaur491@gmail.com', '$2b$10$cThLBGvsu12XgK3nQGaWMOtlQ7DBTc0z3eLHl1fWGeCWp1sxBTJR6', 'natsu', 'dragneel', NULL, '9876543212', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(13, '2024-03-12 06:48:27.030', 'harshsingh.js@gmail.com', '$2b$10$VTK5ClLZCYgH2X2iJTe5rusOWYxCQiCNiEOxl3UpzMcgsTEIi0Od6', 'Harsh', 'Singh', NULL, '7652035152', 'male', NULL, '276011', '123456789011', 'ABCD1234', NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(14, '2024-03-12 06:50:41.651', 'sonaliraikwar248@gmail.com', '$2b$10$0TkAZgejnBgYkRp3nh0rVeRFBQvYzxxouKTJwyGEJciwmpL9F/bvi', 'sonali', 'Singh', NULL, '9650771760', 'male', NULL, '110055', '123456789011', 'ABCD1234', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(15, '2024-03-18 05:16:14.908', 'nishadpriyanka993@gmail.com', '$2b$10$HUBh6WQNc4OpZPNPime6Jun5kBk2WpvaZtmMwAWsEBk08lRyEvj3i', 'priyanka', 'nishad', '', '8303780487', 'male', 'Gwalior, Madhya Pradesh, 474005', '', '639414350589', '', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(16, '2024-03-19 08:51:11.974', 'yinaji1940@dovesilo.com', '$2b$10$cF1rq6A7rmac31sg7KwMZ.VNz6Xk.EkDxmnjfc6XfArDaCiIcWbSi', 'gjgh', 'gfuyjgjhq', NULL, '1234568574', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(17, '2024-03-19 09:26:03.597', 'jasep80702@cmheia.com', '$2b$10$nsyM9Fs2sJ6k/7kBvT3/hOZA1zmqJLio9k9Wes5TfZtOZsQ1cYA0S', 'gjgh', 'gfuyjgjhq', NULL, '9956865441', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(18, '2024-03-19 09:28:15.310', 'itaxeazy@gmail.com', '$2b$10$rzHV3eM1q9Jkca90dzWCQOS.B0hc5cQ9XjIondBB2AF4GhjaSEANm', 'gjgh', 'gfuyjgjhq', NULL, '9956874541', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(19, '2024-03-19 09:54:33.895', 'jacix47058@hisotyr.com', '$2b$10$I9yOu09Gei08Qj12akA0WeXH45NGll7b9wqgeXKyC4Sojlx5Z5MIa', 'MANINDAR11hgjrerew', 'eewrweSETHI', '', '9425113371', 'male', 'erwergwalior', '474001', '600355915044', '', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(20, '2024-03-21 07:36:25.166', 'loroba3961@hdrlog.com', '$2b$10$Yex7m.vIF2F.OS5yS3RiYeRlSYRIcKc5BCRzeWoevUpkL4ejBHFoO', 'loroba', 'hdrlog', NULL, '5432129876', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(21, '2024-03-21 07:42:06.632', 'xacike1342@hisotyr.com', '$2b$10$5f8cg5sxas9yH2fKcXSoI.kkk0O8Wb6JZrekBhk8WuGE3alAmN2VW', 'xacike', 'xacike', NULL, '7766778899', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(22, '2024-03-21 07:45:26.655', 'nat.su775d@gmail.com', '$2b$10$O90dK8YtPQlNnSv3lNwNWuDhUxU8r4L.XU6ehX/w.KXwOWWcJwnye', 'nat.su775d@gmail.com', 'nat.su775d@gmail.com', NULL, '8877665577', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(23, '2024-03-21 09:27:46.691', 'ronas85812@fryshare.com', '$2b$10$WWXwOzHo3/Bs4XzbaW6yAewf85BEZ7QPko4Bd.JCgq0HdY8Sn6MNu', 'ronas', 'ronas', NULL, '0090098800', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(24, '2024-03-22 05:14:39.416', 'joceca5327@otemdi.com', '$2b$10$cPcDE6VkPtPF4kLN5IwpsOxFyJdntpH8.80KzVJfdgqxZf3WA2cNa', 'joceca', 'joceca', NULL, '0000000000', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(25, '2024-03-22 09:10:51.299', 'sarthakapoor2152@gmail.com', '$2b$10$QIvZ2fiAEz2rdPmoDzLlKeBKhziaeY7FNj1lzGMZ3B4yJEeTFWsAG', 'Sarthak', 'Kapoor', NULL, '9896568422', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(26, '2024-03-22 09:41:05.859', 'pagad92245@shaflyn.com', '$2b$10$2jkBtXXvM6aY7JpqzEKzt.MbiMo7dD5.ivXVszJ3Or3PnEp51dWLu', 'pagad', 'pagad', NULL, '9999999999', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(27, '2024-03-22 09:48:29.214', 'vonimi1545@storesr.com', '$2b$10$.bbX5pZl6ivfWKkFf7Y88eRPCo0za5cZi1AccWfYyjiI6osgN75PW', 'vonimi', 'vonimi', NULL, '7777770000', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(28, '2024-03-22 10:21:10.074', 'bagetix552@otemdi.com', '$2b$10$tPoKYqmWQAPiCFpz2O/27OzeEEERX6mxjMjYB0UQYJusnpOalAMOO', 'bagetix', 'bagetix', NULL, '4449999999', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(29, '2024-03-22 23:21:14.083', 'harshsinghjs@gmail.com', '$2b$10$Ql3E31.LYUswqIENl98xtulobl76AOjYIcKxfINOOA6/PavTbSnw6', 'Harsh', 'Singh', NULL, '7652034152', 'male', NULL, '276011', '123456789011', 'ABCD1234', NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(30, '2024-03-22 23:31:38.463', 'avinashkumar2rock@gmail.com', '$2b$10$2vZL5XqR0HlKmVouwYQQMeDXOrwA28VvNCVZTiewD2TslPLjjmQ3G', 'Avinash', 'Kumar', '', '7071955977', 'male', '5 by 87 Ambedkarpuram', '208017', '', '', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(31, '2024-03-23 00:13:07.217', 'hesaki4326@shaflyn.com', '$2b$10$ypkBLsQrx1/KHgGyMJMPMOV6c2J.2md8DUsc73OuQQcLipF3pi8H.', 'bagetix', 'bagetix', NULL, '1111882266', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(32, '2024-03-23 07:27:16.673', 'avinashkumar20rock@gmail.com', '$2b$10$kdq9IVyuC/t.uMT3eII00ObQ3agSha5KWoLGahvzirECZ88gF7JY6', 'Avinash', 'Kumar', NULL, '7985209314', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(33, '2024-03-23 09:52:37.988', 'wegosa3122@storesr.com', '$2b$10$NALKQ0dg68IVSLkaWOfxquZh.H59BehXus9cthbOrhN44Zg3IFeC2', 'hesaki', 'hesaki', NULL, '6666665544', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(34, '2024-03-23 12:18:09.674', 'rodiva8528@ikumaru.com', '$2b$10$HA6SupX2iGMBrD9s/o71d.AbKYMd3018mtQEm8vuFVFFp7tFsvDYO', 'CHAKSHU', 'ANAND', NULL, '9956865147', 'male', NULL, NULL, NULL, 'AZHPA4329A', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(35, '2024-03-24 10:56:19.323', 'mayank250004@gmail.com', '$2b$10$dS4NQpZab9WvDOTpNiA73.mHoqGMKwimRDnY0kw.7nQjca4djq4X6', 'Mayank', 'Sharma', NULL, '7017493561', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(36, '2024-03-25 06:38:46.108', 'dejoj42959@nimadir.com', '$2b$10$C//dsukWncQ6sEksLhrMoubWoZPqc.01sT1QDHvsNY2k/hSTWKkU.', 'CHAKSHU', 'ANAND', NULL, '8726358972', 'male', NULL, NULL, NULL, 'AZHPA4329A', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(37, '2024-03-26 05:09:45.025', 'jigosa6961@shaflyn.com', '$2b$10$.3Re2vUCRSnJuK.wwo7K1u7ThBFOFg9mZIxfdQ2zrQEVAt5YbhVW.', 'jigosa', 'jigosa', '', '1234567809', 'male', '', '', '', '', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(38, '2024-03-26 14:19:43.436', 'lavopev984@otemdi.com', '$2b$10$dP37Z9eS5IAZGFypZLgipuAi1cptLYF.3OmqxUvQf/OYP.f0FtDae', 'lavopev984', 'lavopev984', NULL, '1111111111', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(39, '2024-03-26 18:31:17.339', 'sanjayku2455@gmail.com', '$2b$10$u4omlIEWRfdEoPnF7OUIIO6HH1X3GF0wNf/tFnE7Z4XUL8j.tuE36', 'Sanjay', 'Kumar', NULL, '8874369688', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(40, '2024-03-27 08:00:56.797', 'ceo.techies@gmail.com', '$2b$10$2Z7uFYzMLmSJGlc6/I/3HOTG87MSRibwM.xpuWtGr1E6BcbATZZWm', 'sandeep', 'gupta', NULL, '8305233223', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(41, '2024-03-28 04:59:21.185', 'jishankhannew@gmail.com', '$2b$10$1L5GR8aaN0DOP.9HHhI7euqcLTXbxnVxu7IuJlpW2OmmFLZbtfaNi', 'JISHAN', 'ALI', '', '9654742699', 'male', '286, Arthala, Mohan Nagar, Ghaziabad', '201007', '343007123961', 'DSYPA0162G', NULL, NULL, NULL, 1, 'normal', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715231064/dashboard/users/jishankhannew%40gmail.com/update/profile_1715231062049.jpg', 'Ahemad'),
(42, '2024-04-01 15:29:57.343', 'ashish.vishwakarma1267@gmail.com', '$2b$10$AiG2a0V8VEeo3H/AtxgWeehJtCKK57ZVlk0eiqrQyhCIeLhk5gNDS', 'Ashish', 'Vishwakarma', NULL, '9335215209', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(43, '2024-04-02 09:51:45.717', 'shagunkesarwani8@gmail.com', '$2b$10$.DWgHkNwHo2NLKxI/lAZl.MC.4Xn/rmSsOS4.IaHbdJBwYA7UkL0a', 'Shagun', 'Kesarwani', NULL, '8957794988', 'female', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(44, '2024-04-03 09:18:08.391', 'suman931980@gmail.com', '$2b$10$CzYtqHtex7EugBqe3cXnPOtZq.bkIDJVrXN0BdMVZ8l01WVxwkJF.', 'Suman', 'Kumar', NULL, '9319802534', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(45, '2024-04-03 13:05:28.461', 'manojkushwah78@gmail.com', '$2b$10$UC42gLCnZPcsQDTDFbUrI.UdFZhY9BaY/p/AWxTpn0sYBXVufeGjW', 'Manoj', 'kushwah', NULL, '8770634655', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(46, '2024-04-07 12:55:19.837', 'testing@yopmail.com', '$2b$10$RekV6Cb3IA6rjNzjOCCx/eLyFQ.aUYhRRCeT6OD4QLufdd8ZFXJ0m', 'testing', NULL, NULL, '9999999999', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(47, '2024-04-07 13:38:00.669', 'neerajpanchal004@gmail.com', '$2b$10$bVEVHg.1g7bIdxnt8ZXCb.jtjNOBfTSL5wK95qC3smkzcMMrNIUB6', 'neerajpanchal004', 'null', NULL, '7668428177', 'male', '', NULL, '', '', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(48, '2024-04-24 07:30:15.484', 'toajeetrathore@gmail.com', '$2b$10$MS65r9K/6gjrVRbnPMs2weZ929DnwDgxUtmE7yvLagkq1h0weTz4C', 'toajeetrathore', NULL, NULL, '7988474191', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(49, '2024-05-03 10:13:39.102', 'uchithopper847@gmail.com', '$2b$10$XybabBTCAR1vxF5l1ZWKjeTlxtuS39ElSx17cuwr9BX0TdLPKi9p2', 'uchithopper847', NULL, NULL, '7973774453', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(50, '2024-05-08 16:53:31.448', 'aaruhinavi@gmail.com', '$2b$10$SNtvG/9cMjkAwgqsioWK.OH4Z/URqGgsaUE43FWo/fXwkyKuQKJPW', 'aaruhinavi', NULL, NULL, '8303780487', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(51, '2024-05-08 17:11:08.630', 'jishankhannew@outlook.com', '$2b$10$p7raFwFg3hM5jXgSduhS5ue36v9bP5pvCpVghtQJRAcArDVQ/zIeq', 'jishankhannew', NULL, NULL, '9654742699', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(52, '2024-05-09 08:24:43.683', 'jishakhannew@gmail.com', '$2b$10$g1IpY4.ETQfsNNQaIbS8XeOammoYDqZ.06XS7BcHvGHCIX0A9uzwa', 'jishakhannew', NULL, NULL, '9654742699', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(53, '2024-05-10 04:56:44.547', 'itaxeasy@hotmail.com', '$2b$10$GaZtPXXgbv2doV6m11Wx0e9fbqnvs/PTDnimWi4OPb5iLNN4nOLZ.', 'itaxeasy', NULL, NULL, '8770877270', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(54, '2024-05-11 06:50:06.050', 'mukesh@123gmail.com', '$2b$10$Per7P4k0eWe/lj61NZNHWuzMxSouH8oZ1BCLYI2U12I9h3xT6yfda', 'Mukesh', '', NULL, '6396642943', 'male', NULL, '', '', '', NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(55, '2024-05-11 07:50:58.918', 'omkar123@gmail.com', '$2b$10$sna8rv7PiKleW4Bc3P2uX.T/WhJygvC.Gj6GNGaWpJZI.HtXPhZq6', 'Omkar', '', NULL, '8987569888', 'male', NULL, '', '', '', NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(56, '2024-05-11 07:57:09.634', 'kumar123@gmail.com', '$2b$10$N0I3QEmA9vpp2jGc7V5B7OnItgH/NIsUHI0iBeL8z2wFEdx3HLHCa', 'Kumaar', '', NULL, '8057855552', 'male', NULL, '', '', '', NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(57, '2024-05-11 08:12:48.326', 'mukeshsaini4548@gmail.com', '$2b$10$pmqXEmvzGyV2fxMd/OUXz.CDvZT0s1lzJklDDxhS1Y2AKfEvpKCPe', 'Mukesh', '', NULL, '8052476395', 'male', NULL, '', '', '', NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(58, '2024-05-17 07:05:11.427', 'manishkpandey.work@gmail.com', '$2b$10$ijLtH/DVnMpBdqgw6uGGqOhqC56OMDGcAiYv6YP2GDG0ciQcBFybW', 'manishkpandey.work', NULL, NULL, '9910221519', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(59, '2024-05-21 15:39:49.579', 'mansijaiswal1235@gmail.com', '$2b$10$/6.z1d35pmq8UiRPJmxgLuO2Pdy.Q5T98Rj/aWmY2SzYaUae/FuLC', 'mansijaiswal1235', NULL, NULL, '8006222897', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(60, '2024-05-23 07:45:51.762', 'habiga8288@lucvu.com', '$2b$10$fGZ7O9F9FtE3GRvtLFwOUuZZZid9kyo7TiWVxyW0ifGiz/n1i4i1e', 'habiga8288', NULL, NULL, '9818583421', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(61, '2024-05-31 21:54:55.886', 'tanushree34143@gmail.com', '$2b$10$fwfS15AhdmgcY9LwwxmKSObslEGmqYP6WQsO9Vk.ydMjbItBS8wye', 'tanushree34143', NULL, NULL, '8279577676', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(62, '2024-06-04 14:15:01.338', 'himanshusonkar84@gmail.com', '$2b$10$1Lr8iVoK1/nl8.DebiZfIe1nQDHxC8M7d8BWhFux5i3ysKWfL7LiS', 'himanshusonkar84', NULL, NULL, '7417875404', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(63, '2024-06-12 04:44:08.696', 'renuvedi@gmail.com', '$2b$10$krgzCwhVVmJ84nQpjujIhOjWrw6Vgg/wJgjl9wYMpNLUTtbS05SEa', 'renuvedi', NULL, NULL, '8770877270', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(64, '2024-06-12 15:48:28.047', 'talibffdc@gmail.com', '$2b$10$2qzWu3O1fydlVJJOjFUeoe.8t2IzN4SgQ4WQLV2aVLHpa1SvxwzpO', 'talibffdc', NULL, NULL, '9598295267', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(65, '2024-06-13 03:59:04.579', 'brandbuilder97@gmail.com', '$2b$10$cuOIzOtQ3qgxcBMPFkOCV.rSQ6WEksp1/Hz0oUJTIAmaZx2KrZELC', 'brandbuilder97', NULL, NULL, '9834244293', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(66, '2024-06-28 09:14:56.934', 'harshsinh.js@gmail.com', '$2b$10$I2TSN9yu3Myf01RGpNHC6uiBbbuSsj4g8y99Og85gUtNtmJXAh5tO', 'Harsh', 'Singh', NULL, '7652065152', 'male', NULL, '276011', '123456789011', 'ABCD1234', NULL, NULL, NULL, 0, 'normal', NULL, NULL),
(67, '2024-06-29 07:58:11.391', 'findjob.saurabh@gmail.com', '$2b$10$hoIymg/NRBkyQ6Ql72HVLu9M11CHJ5mIuxr8Cqo3D8pCTjGoWCjv2', 'findjob.saurabh', NULL, NULL, '9450142393', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(68, '2024-07-01 06:09:13.347', 'oravi001@gmail.com', '$2b$10$cf0zlPebk49CS1p7uqXgK.eVw0jvXcW.JPhb2gEKhHgUXwtmS4.S2', 'oravi001', NULL, NULL, '8287749165', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(69, '2024-07-01 12:15:46.229', 'priyanka08030@gmail.com', '$2b$10$kFnTQSeyDsa8Zgn3TAbT/OzxpRaIk3yva46RLS5vummM0Shj5mbIO', 'priyanka08030', NULL, NULL, '7887266321', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL),
(70, '2024-07-09 06:39:13.545', 'amanverma4816@gmail.com', '$2b$10$cRbQMlfUUjLRkT47IxKG6uaqJKS1IY.PTLj4stHJm0.zjW2qaRbzi', 'amanverma4816', NULL, NULL, '6264613866', 'male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'normal', NULL, NULL);






--







-- Dumping data for table `BusinessProfile`




--


INSERT INTO `BusinessProfile` (`id`, `businessName`, `pan`, `tan`, `gstin`, `bankName`, `bankAccountNo`, `bankIfsc`, `bankBranch`, `userId`, `createdAt`, `updatedAt`, `isAddressVerified`, `isBusinessNameVerified`, `isGstinVerified`, `isPanVerified`, `isStateVerified`, `ctb`, `msme_number`, `status`, `taxpayer_type`, `city`, `dst`, `landmark`, `statecode`, `stcd`, `street`) VALUES
(1, 'Dhruv Agarwal', 'ABOPA3630R', '', '23ABOPA3630R2ZH', 'Active', '456465', '5464', '454', 4, '2024-03-11 07:52:44.252', '2024-03-11 07:52:44.252', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Regular', 'Gwalior', 'Gwalior', '', '23', 'Madhya Pradesh', 'Sarafa Bazar, Lashker'),
(2, 'Harsh Singhs Business', 'ABCD1234', 'ABCD1234', 'HNVHVH', '212', '253235', '12123', '5465HJH', 3, '2024-03-11 08:01:37.035', '2024-03-11 08:01:37.035', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Harsh Singhs Business', 'ABCD1234', 'ABCD1234', '', '', '', '', '', 1, '2024-03-12 08:23:33.064', '2024-03-12 08:23:33.064', NULL, NULL, NULL, NULL, NULL, 'sdfsdf', 'msme_number2', 'active', 'Regular', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Harsh Singhs Business', 'ABCD1234', 'ABCD1234', '', '', '', '', '', 6, '2024-03-12 10:46:41.523', '2024-03-12 10:46:41.523', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'AVI ANAND AGENCIES', 'AZHPA4329A', '', '23AZHPA4329A1Z5', '', '01234567891211', 'PYTM01213466', 'NOIDA', 7, '2024-03-19 06:44:41.910', '2024-03-19 06:44:41.910', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Composition', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Harsh Singhs Business', 'ABCD1234', 'ABCD1234', '', '', '', '', '', 22, '2024-03-22 05:13:07.577', '2024-03-22 05:13:07.577', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'ITAX EASY PRIVATE LIMITED', 'AAFCI5163E', '', '23AAFCI5163E1ZV', NULL, '99', '99', '99', 28, '2024-03-22 10:28:47.275', '2024-03-22 10:28:47.275', NULL, NULL, NULL, NULL, NULL, 'Private Limited Company', 'msme_number1', 'Active', 'Regular', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'NEW SETHI ELCTRICAL', 'BNJPS3408M', '', '23BNJPS3408M1ZP', NULL, '33445556777', 'gc78768', 'abcd', 30, '2024-03-23 10:18:49.070', '2024-03-23 10:18:49.070', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Regular', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'AVI ANAND AGENCIES', 'AZHPA4329A', '', '23AZHPA4329A1Z5', NULL, '01234567891211', 'PYTM01213466', 'NOIDA', 34, '2024-03-23 12:21:13.012', '2024-03-23 12:21:13.012', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Composition', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'BHAGWATI TRADERS', 'EVPPP7795K', '', '23EVPPP7795K1ZH', NULL, '30238731266', 'SBIN0004088', '4088', 15, '2024-03-25 06:00:57.823', '2024-03-25 06:00:57.823', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Regular', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'AVI ANAND AGENCIES', 'AZHPA4329A', '', '23AZHPA4329A1Z5', NULL, '01234567891211', 'PYTM01213466', 'NOIDA', 36, '2024-03-25 06:39:39.844', '2024-03-25 06:39:39.844', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Composition', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'BHAGWATI TRADERS', 'EVPPP7795K', '', '23EVPPP7795K1ZH', NULL, '30238731266', 'SBIN4088000', '8000', 9, '2024-03-25 11:17:48.625', '2024-03-25 11:17:48.625', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Regular', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'AJNAR INDANE GRAMIN VITRAK', 'KAAPS9806L', '', '23KAAPS9806L1Z4', NULL, '11111111111', 'SBIN0004088', 'New Delhi', 44, '2024-04-04 08:38:38.994', '2024-04-04 08:38:38.994', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Regular', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'NEW SETHI ELCTRICAL', 'BNJPS3408M', '', '23BNJPS3408M1ZP', NULL, '', '', '', 2, '2024-04-04 08:43:01.649', '2024-04-04 08:43:01.649', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Regular', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'NEW SETHI ELCTRICAL', 'BNJPS3408M', '', '23BNJPS3408M1ZP', NULL, '', '', '', 5, '2024-04-05 04:02:44.808', '2024-04-05 04:02:44.808', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Regular', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'AVI ANAND AGENCIES', 'AZHPA4329A', '', '23AZHPA4329A1Z5', NULL, '', '', '', 41, '2024-04-09 05:46:09.779', '2024-04-09 05:46:09.779', NULL, NULL, NULL, NULL, NULL, 'Proprietorship', 'msme_number1', 'Active', 'Composition', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Career`
--

CREATE TABLE IF NOT EXISTS `Career` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skills` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cv` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Career`
--

INSERT INTO `Career` (`id`, `name`, `address`, `pin`, `email`, `mobile`, `skills`, `gender`, `cv`, `createdAt`, `updatedAt`) VALUES
(1, 'Ibrahim Bin Aboobacker CH', 'Kerala, India', '676504', 'ibnu.ibaf2@gmail.com', '9995144332', 'see resume', 'male', 'cv-1710139723760-468474070.pdf', '2024-03-11 06:48:43.766', '2024-03-11 06:48:43.766'),
(2, 'Ibrahim Bin Aboobacker CH', 'Kerala, India', '676504', 'ibnu.ibaf2@gmail.com', '9995144332', 'see resume', 'male', 'cv-1710139729823-909471122.pdf', '2024-03-11 06:48:49.832', '2024-03-11 06:48:49.832'),
(3, 'Ibrahim Bin Aboobacker CH', 'Kerala, India', '676504', 'ibnu.ibaf2@gmail.com', '9995144332', 'see resume', 'male', 'cv-1710139730654-817185244.pdf', '2024-03-11 06:48:50.664', '2024-03-11 06:48:50.664'),
(4, 'Ibrahim Bin Aboobacker CH', 'Kerala, India', '676504', 'ibnu.ibaf2@gmail.com', '9995144332', 'see resume', 'male', 'cv-1710139731242-34546547.pdf', '2024-03-11 06:48:51.251', '2024-03-11 06:48:51.251'),
(5, 'vishwas', 'gwalior', '210201', 'shyam@gmail.com', '753574246', 'painting', 'male', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1714737780/dashboard/careers/shyam%40gmail.com/profile_1714737778516.jpg', '2024-05-03 12:03:01.082', '2024-05-03 12:03:01.082'),
(6, 'pratiksha', 'lajpat delhi', '477001', 'ppsy@gmail.com', '09074007309', 'html', 'female', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1714757931/dashboard/careers/ppsy%40gmail.com/WhatsApp%20Image%202024-04-25%20at%2012_1714757929564.jpg', '2024-05-03 17:38:51.375', '2024-05-03 17:38:51.375'),
(7, 'Arti Yadav', 'lajpat nagar', '110024', 'arti48589@gmail.com', '09074007309', 'css', 'female', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1714757987/dashboard/careers/arti48589%40gmail.com/WhatsApp%20Image%202024-04-25%20at%2012_1714757986614.jpg', '2024-05-03 17:39:48.050', '2024-05-03 17:39:48.050'),
(8, 'Arti Yadav', 'lajpat nagar', '110025', 'arti48589@gmail.com', '09074007308', 'html,css,react,java', 'male', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1714758139/dashboard/careers/arti48589%40gmail.com/WhatsApp%20Image%202024-04-25%20at%2012_1714758138461.jpg', '2024-05-03 17:42:19.914', '2024-05-03 17:42:19.914'),
(9, 'Arti Yadav', 'lajpat nagar', '110024', 'arti48589@gmail.com', '9074007309', 'JavaScript', 'female', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1714826076/dashboard/careers/arti48589%40gmail.com/WhatsApp%20Image%202024-04-25%20at%2012_1714826074430.jpg', '2024-05-04 12:34:36.122', '2024-05-04 12:34:36.122'),
(10, 'Arti Yadav', 'lajpat nagar', '110024', 'arti48589@gmail.com', '09074007309', 'Next.Js, HTML', 'male', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715063229/dashboard/careers/arti48589%40gmail.com/WhatsApp%20Image%202024-04-25%20at%2012_1715063226641.jpg', '2024-05-07 06:27:08.558', '2024-05-07 06:27:08.558'),
(11, 'Arti Yadav', 'joshi nagar etawah road bhind m.p', '477001', 'arti48589@gmail.com', '09074007309', 'React.Js', 'male', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715065183/dashboard/careers/arti48589%40gmail.com/WhatsApp%20Image%202024-04-25%20at%2012_1715065181379.jpg', '2024-05-07 06:59:43.072', '2024-05-07 06:59:43.072'),
(12, 'Arti Yadav', 'lajpat nagar', '110024', 'arti48589@gmail.com', '09074007309', 'React.Js', 'female', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715084895/dashboard/careers/arti48589%40gmail.com/WhatsApp%20Image%202024-04-25%20at%2012_1715084893420.jpg', '2024-05-07 12:28:15.484', '2024-05-07 12:28:15.484'),
(13, 'Arti Yadav', 'lajpat nagar', '110024', 'arti48589@gmail.com', '09074007309', 'Next.Js', 'male', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715085734/dashboard/careers/arti48589%40gmail.com/WhatsApp%20Image%202024-04-25%20at%2012_1715085732088.jpg', '2024-05-07 12:42:13.692', '2024-05-07 12:42:13.692'),
(14, 'Sarthak', 'delhi', '474001', 'sarthakapoor2152@gmail.com', '9425113371', 'see resume', 'male', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715264642/dashboard/careers/sarthakapoor2152%40gmail.com/architecture_1715264640898.png', '2024-05-09 14:24:02.943', '2024-05-09 14:24:02.943'),
(15, 'Vaibhavi Upreti', 'Siddheshwar Nagar, Morar, Gwalior', '474006', 'vaibhaviu.ind@gmail.com', '8989682154', 'Available in CV', 'female', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1717991923/dashboard/careers/vaibhaviu.ind%40gmail.com/Vaibh_1717991921041.pdf', '2024-06-10 03:58:42.992', '2024-06-10 03:58:42.992'),
(16, 'mumkul bemdi', 'mumul Mentions Bemdi Tower Delhi', '11110', 'mukulbemdi@gmail.com', '1234567890', 'Available in CV', 'female', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1718529679/dashboard/careers/mukulbemdi%40gmail.com/Free%20_1718529677198.pdf', '2024-06-16 09:21:19.512', '2024-06-16 09:21:19.512'),
(17, 'Ravi Rajput', 'Sande Baba Ki Bagiya, Gwalior, Madhya pardesh', '241', 's.ravirajput99@gmail.com', '+917415589664', 'Available in CV', 'male', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1719397415/dashboard/careers/s.ravirajput99%40gmail.com/Resum_1719397413968.pdf', '2024-06-26 10:23:36.158', '2024-06-26 10:23:36.158'),
(18, 'abhay singh', 'd-2 kundan nagar awadhpuri bhopal', '462022', 'abhaysinghsh01@gmail.com', '9770706197', 'Available in CV', 'male', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1720184517/dashboard/careers/abhaysinghsh01%40gmail.com/abhay_1720184515005.pdf', '2024-07-05 13:01:57.298', '2024-07-05 13:01:57.298');

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE IF NOT EXISTS `Cart` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`id`, `userId`, `createdAt`, `updatedAt`) VALUES
('38ee4c51-67a6-4761-ab47-dd35c3e9f446', 8, '2024-06-21 19:12:20.689', '2024-06-21 19:12:20.689'),
('49017725-1fbd-4346-a224-e64d26beddb1', 9, '2024-05-08 13:29:54.138', '2024-05-08 13:29:54.138'),
('5d685df7-862e-417a-a5e2-84a0a3355fc1', 4, '2024-05-01 07:00:08.445', '2024-05-01 07:00:08.445'),
('64a281ae-d940-471a-9742-f2b00ac1baa9', 70, '2024-07-10 06:18:11.564', '2024-07-10 06:18:11.564'),
('d59df81e-b649-4c6d-80b7-6434483debb9', 15, '2024-05-05 03:56:12.395', '2024-05-05 03:56:12.395'),
('dcad5f00-5446-4053-976b-0c457808d5e1', 7, '2024-05-08 10:01:20.898', '2024-05-08 10:01:20.898'),
('f73047a7-5b05-42be-a8b0-1d6755dcd281', 41, '2024-04-26 11:58:36.781', '2024-04-26 11:58:36.781'),
('fc7f0b1a-dd3e-4b01-a655-97b03d215a56', 68, '2024-07-04 10:29:49.165', '2024-07-04 10:29:49.165'),
('fedcf1b2-1677-4aba-9856-87414a9242f3', 44, '2024-04-30 06:20:14.125', '2024-04-30 06:20:14.125');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE IF NOT EXISTS `Category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Client`
--

CREATE TABLE IF NOT EXISTS `Client` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `agentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ContactUs`
--

CREATE TABLE IF NOT EXISTS `ContactUs` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ContactUs`
--

INSERT INTO `ContactUs` (`id`, `name`, `email`, `message`) VALUES
(1, 'abcd', 'abc@gmail.com', 'helo'),
(2, 'abcd', 'abc@gmail.com', 'helo'),
(3, 'Sarthak', 'sarthakapoor2152@gmail.com', 'this is demo'),
(4, 'Sarthak', 'sarthakapoor2152@gmail.com', 'This is demo'),
(5, 'Sarthak', 'sarthakapoor2152@gmail.com', 'message'),
(6, 'Sarthak', 'sarthakapoor2152@gmail.com', 'This demo '),
(7, 'Sarthak', 'sarthakapoor2152@gmail.com', 'testing revalidation'),
(8, 'Sarthak', 'sarthakapoor2152@gmail.com', 'hhkhhkhk');

-- --------------------------------------------------------

--
-- Table structure for table `CostInflationIndex`
--

CREATE TABLE IF NOT EXISTS `CostInflationIndex` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financialYear` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `costInflationIndex` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CostInflationIndex`
--

INSERT INTO `CostInflationIndex` (`id`, `financialYear`, `costInflationIndex`) VALUES
('0167d91a-88e3-4fcc-a661-5aa7f8c48500', '2020-2021', 301),
('060322d0-0116-4fea-90a8-e764678c0710', '2013-2014', 220),
('0c7c979e-9b1c-4dbc-bd30-11288beb42d4', '2021-2022', 317),
('10c05143-3570-41b8-bd94-898dfc07d7fc', '2013-2014', 220),
('13f9da31-2466-485a-bcda-04a0a9f56054', '2001-2002', 100),
('1da0d047-abc8-4067-8ea2-e8704930b385', '2006-2007', 122),
('203e5541-b3f8-47a5-a3e3-ee7688300657', '2014-2015', 240),
('21604b91-0d86-492f-9282-19b0655b1065', '2004-2005', 113),
('22ea2a0f-054a-4e72-a663-85b7dd899bbc', '2021-2022', 317),
('250a083c-a3e3-4abf-b9c8-0b2d9e2dacb5', '2002-2003', 105),
('2dc39cae-abe4-42d2-b1bc-341b6280921d', '2010-2011', 167),
('38a36340-c795-47f6-adc5-6a70e5103625', '2018-2019', 280),
('3ace19a6-ef85-4f14-8706-a69a30fcd472', '2012-2013', 200),
('465cb00d-5cb0-42c9-a879-06de5eea39e3', '2003-2004', 109),
('4f216d57-4835-4dd1-9b06-81bff0f636ec', '2001-2002', 100),
('58d8b05c-74b3-4b3d-ae4c-8c54bef10ddd', '2007-2008', 129),
('668565ff-f5d2-41ff-b8b3-3744b22ae5d4', '2012-2013', 200),
('67356061-6d08-40c9-a166-0eb849c7e250', '2002-2003', 105),
('68cc7425-825e-4e96-8b30-3e7842e6aac9', '2015-2016', 254),
('71b57c9b-2956-449b-87c2-e0f0d5a48094', '2017-2018', 272),
('728ff220-1e3b-4936-8d86-43cb86db89f8', '2018-2019', 280),
('799cd469-0b19-4165-be45-d19d00e7a82a', '2019-2020', 289),
('8cdac848-8615-46c3-8fb0-11591df470ec', '2020-2021', 301),
('8eb76440-24a5-4b42-a8b9-27bc5bfe6243', '2011-2012', 184),
('8f63b9b1-6ef9-427a-b497-c0b823a50c73', '2017-2018', 272),
('913807e8-2402-4a82-a769-800f1a3fc589', '2016-2017', 264),
('a0704520-4597-43ff-86c6-bb4d29867583', '2019-2020', 289),
('a410427b-457d-496d-bed3-ff4f6646fcab', '2009-2010', 148),
('b009c134-9680-441b-90dc-84d93d522567', '2004-2005', 113),
('bc850c29-3e0d-4f8b-82f4-2c74782e1091', '2008-2009', 137),
('c43947f0-fc42-47ba-b8db-13e2e459bffd', '2022-2023', 331),
('c5d18b7b-bee8-45cd-bac1-d44c72301355', '2003-2004', 109),
('c6210a55-75c0-47d8-a678-7ef4a60fddc5', '2008-2009', 137),
('c75d89fb-624f-470e-8d91-90581b88a8e8', '2005-2006', 117),
('c9aec1b9-7bde-4a97-a5f8-13cbfa0e5c74', '2005-2006', 113),
('d1539814-cd0f-47ad-a444-72beb7bb7a25', '2010-2011', 167),
('d50c8c78-f532-4a76-aa12-c4fbebd6f50b', '2015-2016', 254),
('eca6cd91-b77f-4e31-b1a5-b5b64777107c', '2009-2010', 148),
('f1ee6a02-ece9-4d72-977f-77064b44510c', '2006-2007', 122),
('f4093b49-66b5-4d3d-8273-fa4f082518dc', '2014-2015', 240),
('f459b360-b5af-4cfc-a38c-0eadf50b275b', '2007-2008', 129),
('f8ba70b1-ad4e-480a-8331-0171e81df433', '2011-2012', 184),
('ffea469a-b363-455e-89b1-78cd17da4edb', '2016-2017', 264);

-- --------------------------------------------------------

--
-- Table structure for table `CostInflationList`
--

CREATE TABLE IF NOT EXISTS `CostInflationList` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financeAct` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `listName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CostInflationList`
--

INSERT INTO `CostInflationList` (`id`, `financeAct`, `listName`) VALUES
('a03bd783-8482-41f2-8751-ec0150a8c8ec', '2022', 'cost-inflation-index-list'),
('f7c72362-5ea2-46e1-a66d-c369742375f5', '2022', 'cost-inflation-index-list-2');

-- --------------------------------------------------------

--
-- Table structure for table `CountryCode`
--

CREATE TABLE IF NOT EXISTS `CountryCode` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CountryCode`
--

INSERT INTO `CountryCode` (`id`, `countryCode`, `countryName`) VALUES
('02cb3e87-23fd-4d0f-b718-1077112713e3', '82', 'SOUTH KOREA'),
('038a8e22-7403-407c-ad21-734f2b481828', '227', 'NIGER'),
('0453a55c-75d2-4996-8ba3-58229367a08f', '92', 'PAKISTAN'),
('0461c10e-fad1-4154-a94e-a00888cac86c', '975', 'BHUTAN'),
('055fa788-5c5a-4d6a-bd3e-7ce823781d01', '43', 'AUSTRIA'),
('08481cb6-e2c1-4223-ab43-a58e4f07bfbd', '976', 'MANGOLIA'),
('08538a5e-b048-4c61-ae09-1e424941025a', '32', 'BELGIUM'),
('0a6fa782-5cd5-4efb-8311-bd0ea0d9c5b9', '35', 'SPAIN'),
('0a7b70a2-ce6a-4934-810a-26f07625ad96', '387', 'BOSNIA And HERZEGOVINA'),
('0a9224a3-a3ef-47a3-80b2-2b14bf5ecb41', '968', 'OMAN'),
('0d5baf6c-9589-4471-8eea-df87139130ab', '65', 'SINGAPORE'),
('0e9f6549-b7bb-4117-bbc7-75eb1aa88619', '1242', 'BAHAMAS'),
('12855bd8-8393-450f-bd60-0f55f95e175d', '248', 'SEYCHELLES'),
('12ff945e-7fb4-41bd-a89d-69ce6900209d', '30', 'GREECE'),
('1623c3ef-b9cd-47ab-9a34-1583bc22ed83', '63', 'PHILIPPINES'),
('1a5b20b9-dcb7-4be3-a80a-806cfce68469', '375', 'BELARUS'),
('1bbb757b-ed9e-41cb-8e26-36f1c2d175b5', '66', 'THAILAND'),
('1c768331-36fc-4d2c-ab78-685abafb8783', '965', 'KUWAIT'),
('20b9a4a8-3da9-4cbf-a0db-344b1acd5ada', '241', 'GABONESE REPUBLIC'),
('2512432f-0a35-4a26-91ce-8c8056157bdf', '231', 'LIBERIA'),
('2524ce58-fdee-481d-a06c-f8e7fb85f0aa', '351', 'PORTUGAL'),
('2628bc15-6d20-4e4e-8b6b-ca188fea401c', '263', 'ZIMBABWE'),
('26796950-7e40-4713-9fe2-835ade494455', '8', 'RUSSIAN FEDERATION'),
('26aa0f92-278f-4fd2-8e77-2ff5e4f4c385', '33', 'FRANCE'),
('27f267ec-aead-4ce8-9c4d-5ea920aa75f6', '28', 'SOUTH AFRICA'),
('28276bcd-26e4-4e98-9bcc-112e99ecc859', '27', 'SOUTH AFRICA'),
('28b114ee-72a7-44d5-b0f2-cc46497e16ca', '234', 'NIGERIA'),
('2e2f52a4-05d7-44ad-a34a-5ec388e597ee', '1', 'CANADA'),
('2e9d380d-a8cc-4b81-baed-2ea0a54dd772', '31', 'NETHERLANDS'),
('2fed6483-b80d-4c52-a3ad-d6917a6c2c1a', '82', 'REPUBLIC OF KOREA (SOUTH KOREA)'),
('32b325ca-3cae-4810-8569-5726a4d61896', '371', 'LATVIA'),
('333528b0-0b7e-4766-a2c2-50d4996f9ed7', '386', 'SLOVENIA'),
('35c4cdd6-b052-4f57-b180-961ed69a70ab', '260', 'ZAMBIA'),
('35d85ec9-610f-42d1-b011-a725492daf69', '228', 'TOGOLESE REPUBLIC'),
('36606d07-53d4-488a-88ff-b48a0502adbf', '971', 'UAE'),
('37fc4d73-7002-4d31-b562-321912fd1e46', '91', 'INDIA'),
('382ba4b8-6e8f-4783-97b7-1944a897ed62', '993', 'TURKMENISTAN'),
('383c5499-4827-4259-9cce-d91962ca75b4', '423', 'LIECHTENSTEIN'),
('387a7357-407a-4346-b5f2-c6bd92304b30', '595', 'PARAGUAY'),
('3b12121d-76db-44df-83ed-07e56105e394', '51', 'PERU'),
('3b41e890-c5db-4b80-9212-97fa450f3e91', '84', 'VIETNAM'),
('3ef3e6a7-fb7e-4198-a3ba-9b80aae52946', '265', 'MALAWI'),
('3f0ffcdd-0270-4e23-967d-a80b874d17fc', '47', 'NORWAY'),
('403f02a2-6665-41cf-b4a9-06a6db283c4f', '998', 'UZBEKISTAN'),
('4615ae7e-5e18-4e44-8df7-74a113cea32d', '63', 'PHILIPPINES'),
('46f2aa3a-0a71-43ea-8aa5-26d123a00d31', '95', 'MYANMAR'),
('4734a5e5-9495-42e5-8ce8-86b7ee590f03', '880', 'BANGLADESH'),
('479b3bb7-9628-4855-a926-527b22d08952', '251', 'ETHIOPIA'),
('4a3f41e1-ac85-4247-bc0d-4f754c739a1a', '1246', 'BARBADOS'),
('4e189b20-9890-4850-9da9-f793b91d85fb', '373', 'MOLDOVA'),
('4ea76972-11d0-43f4-8a0a-8b72b3c958db', '93', 'AFGHANISTAN'),
('4fda1daf-644c-4017-985c-7072aa869251', '49', 'GERMANY'),
('551ffc7d-1413-405c-9a16-ff0599b76a6e', '229', 'BENIN'),
('576de0e3-edac-4a05-b2ab-63ec36cb7ee1', '34', 'SPAIN'),
('586920cf-f603-4e36-b10b-21c0e29e435b', '58', 'VENEZUELA, BOLIVARIAN REPUBLIC OF...'),
('5b98633f-e7cd-4a73-98ce-b985e40b9ba5', '7', 'KAZAKHSTAN'),
('5c4aa290-2d25-4cc3-b406-e4a8b1fbb82d', '81', 'JAPAN'),
('5cd81859-0590-407e-bc0d-159ef787092c', '60', 'MALAYSIA'),
('63fc388c-ec3d-4d7c-83cd-2180d301135d', '591', 'BOLIVIA'),
('65aeefdb-b361-44ef-94be-60356eaf0041', '505', 'NICARAGUA'),
('66603a2a-e7ec-446f-be70-312ca3a294cc', '970', 'PALESTINE'),
('68fc0013-a825-4f09-9ac1-1324041a70d5', '48', 'POLAND'),
('6a0338d0-ae4b-4b4c-96c3-b937a49aa6fd', '94', 'SRILANKA'),
('6c46e3f7-ece1-4964-b677-cb33d22ade55', '66', 'THAILAND'),
('6d1def20-6a38-4b88-8bab-c3cc78ed022b', '268', 'SWAZILAND'),
('72a82da6-5321-48e3-9a0c-89c31734f2cf', '44', 'UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND'),
('74008bfe-19ed-4f6d-b8e7-bc989939a334', '503', 'EL SALVADOR'),
('772f8b57-681b-4049-ad2f-5a698e0eae62', '961', 'LEBANON'),
('7831357d-ec21-431e-8ac7-86ef795560f9', '962', 'JORDAN'),
('78ddfd07-d7a9-47c3-a108-5240404c1ed1', '216', 'TUNISIA'),
('79c92ef7-a209-47da-ab9a-3b0d70d9f2f8', '220', 'GAMBIA'),
('7b772833-c2ca-4d51-8a35-505e4329b61d', '2', 'UNITED STATES OF AMERICA'),
('7b99c32b-491e-498a-b812-73e5765f7d1f', '856', 'LAOS'),
('7d290878-2eb3-423c-b9dd-15ecf81fe35f', '31', 'NETHERLANDS'),
('8148473b-02dc-4fb6-aaf3-c30044fd9d70', '36', 'HUNGARY'),
('823f6b4f-3fc3-4833-91d3-59661f1b2db7', '81', 'JAPAN'),
('8371d0be-b3ed-49d2-bc94-50e6dfec42c7', '1', 'USA'),
('84535a16-0a57-4c99-a4f6-f0e2a0a5fb5e', '886', 'TAIWAN'),
('87114f74-9008-4623-88ef-c60cabeabfbc', '232', 'SIERRALEONE'),
('87b4e81f-9bf6-48e7-b44d-26d6ec8d2764', '7', 'RUSSIA'),
('88bfa545-dfb9-4c3c-9dae-ce958634587b', '421', 'SLOVAK REPUBLIC'),
('891fd611-2633-4e3f-bf61-e76e3eb785cc', '686', 'KIRIBATI'),
('895fec7e-ad4d-4912-a10f-9bcc9dc42cba', '84', 'VIETNAM'),
('8a1d6b09-b8a4-4844-959e-4c3664e17cd0', '64', 'NEW ZEALAND'),
('8a85ce7a-7378-48e9-a70b-789f7035d067', '5', 'ITALY'),
('8ab6de17-bec8-4f35-a6fb-b39918fb4c64', '250', 'RWANDESE REPUBLIC'),
('8c8e0c71-08d3-43c6-9db6-52071248e73c', '963', 'SYRIA'),
('8fee0caf-67e3-4a05-aefd-472d9d6bf377', '32', 'BELGIUM'),
('91375557-1e87-4db3-be3c-65be128c5e12', '48', 'POLAND'),
('9207776b-5d0a-4c74-a7ab-fdd16a3176ec', '226', 'BURKINA FASSO'),
('9277259b-26fa-4d3e-9e4c-02e9f34c5b82', '1649', 'TURKS & CAICOS ISLANDS'),
('9424c249-827c-4532-b631-34fae8a96d9a', '230', 'MAURITIUS'),
('94b9c7b1-ea39-41e2-87c7-6546eea29754', '58', 'VENEZUELA'),
('9b2dfd80-192a-45bc-baab-c9f378b05139', '41', 'SWITZERLAND'),
('9f09b8d3-eb94-4eec-84e7-c38c2c328a4a', '56', 'CHILE'),
('9fb0cccc-5e69-41a9-92a8-d2e0c66ed3b4', '1868', 'TRINIDAD & TOBAGO'),
('9fdfbfd9-36ce-41a5-90d3-fc4aaaac2e3b', '45', 'DENMARK'),
('a19da766-f1ca-409d-b855-00b8499f4975', '266', 'LESOTHO'),
('a45415b3-54c0-47e2-b4c5-f2e5fd483251', '90', 'TURKEY'),
('a60dc649-77dc-4edf-a025-4a6221b88da3', '995', 'GEORGIA'),
('a8c16521-c3e7-4e12-a94f-e2715596c8c3', '252', 'SOMALIA DEMOCRATIC REPUBLIC'),
('ab0233da-5c1d-405b-a55b-f0f8a2f89e75', '61', 'AUSTRALIA'),
('afb9f398-7f50-405e-b72c-80178104caaa', '677', 'SOLOMAN ISLAND'),
('b07a0c6c-ef32-4ac8-a695-e52535ec25a9', '598', 'URUGUAY'),
('b1a10db2-ad9f-4a08-b42f-bd5c5fe5146e', '994', 'AZERBAIJAN REPUBLIC'),
('b7dcb303-6629-47d8-aac1-006b9965a5c4', '254', 'KENYA'),
('b883c8f0-8fb6-4c65-ba67-2facdd45f013', '257', 'BURUNDI'),
('bbb789a0-b83b-4d1c-92b1-cff47464a6f6', '49', 'GERMANY'),
('bbd6f270-bc72-4273-bee7-1df2aa20fb8a', '40', 'ROMANIA'),
('bd7ebf44-16c7-4b8e-bb04-2d3e96dbe2a0', '974', 'QATAR'),
('bec92330-a287-4aa6-8883-c41aa6517dec', '51', 'PERU'),
('c0669779-5867-4251-8d0e-5267f0764c77', '53', 'CUBA'),
('c13e0639-e79c-483a-83fd-e92f3a026925', '20', 'EGYPT'),
('c21e3bef-8a8f-4127-a0b1-7c3d59852208', '267', 'BOTSWANA, REPUBLIC OF'),
('c2df740d-2608-49d6-b02b-9c73e95c1820', '20', 'EGYPT'),
('c2ee07ac-42e9-4b01-830f-c8d7b81e0c37', '86', 'CHINA'),
('c3bf88a1-576c-4b62-a3f1-65bbf0af4edb', '33', 'FRANCE'),
('c7227ab0-7e8d-44bd-a5f1-6ef3f98760c2', '44', 'UK'),
('c95ecd4f-1b6f-4cce-8f8f-d65e8e3b9827', '47', 'NORWAY'),
('c96e3059-cb48-4756-a135-cbfe65a2d71e', '40', 'ROMANIA'),
('ca4f9708-03c4-4ef2-83f9-cb006d238f10', '52', 'MEXICO'),
('cc5031b1-2146-4f5d-88ef-d84d4b15fb48', '359', 'BULGARIA'),
('cff3a1c9-c613-4597-9752-ae39622f2882', '46', 'SWEDEN'),
('d5d679e6-c8fa-482d-a59f-931fc542b577', '60', 'MALAYSIA'),
('d76d4f66-c360-431b-bd92-9d02a14c4fe0', '377', 'MONACO'),
('d841b4da-f63e-4a0b-b057-456282c975ca', '389', 'MACEDONIA'),
('d91dbdc9-07bc-413c-9fdd-a9e53abbdb9c', '678', 'VANAUTU'),
('d9fc8d12-de74-4411-99bc-7780bee792a9', '380', 'UKRAINE'),
('dabad4f8-c53a-4c69-b8cb-9db0d6a19089', '507', 'PANAMA'),
('db1676af-e1e5-4e5e-a458-74361dc9f7e7', '52', 'MEXICO'),
('dc398783-ce6a-4e5c-9dd2-ac22864df47d', '673', 'BRUNEI'),
('ddefd5c5-6c38-435e-8b8c-cb2551100caa', '212', 'MOROCCO'),
('e0161ff6-2691-406e-ab76-f41c2e7e5dd6', '92', 'PAKISTAN'),
('e045527d-6735-4421-94af-419fc4a0dc19', '372', 'ESTONIA'),
('e0f0dbe7-5f6c-44d8-89e1-2fb27028fc35', '992', 'TAZAKISTAN'),
('e215e4d5-e6de-4dbf-ad6c-f5b054ccca6b', '358', 'FINLAND'),
('e24ade08-ee1f-4448-b891-b776a90d4344', '46', 'SWEDEN'),
('e30db4c2-426a-4cc2-8d9d-da06acd665d0', '55', 'BRAZIL'),
('e31a9373-f9aa-4b82-98e4-23bb425c946c', '1', 'CANADA'),
('e35ff989-9f1a-4de2-ad07-a7c21201e92e', '61', 'AUSTRALIA'),
('e4405ba3-6bbb-4c35-bff4-5f3c1c17e54b', '688', 'TUVALU'),
('e79d9aa4-c214-47cc-9c55-fca906f99bab', '14', 'PORTUGAL'),
('e8d09529-e1de-4ee9-8b50-844ed8b7a1c3', '64', 'NEW ZEALAND'),
('e93ae52d-f5de-4d88-98ff-7d6c88e9fe46', '43', 'AUSTRIA'),
('eb7933ef-b8b4-479a-a3e0-1214a01d418b', '93', 'AFGHANISTAN'),
('eb8da0b6-46ec-42ff-92c8-22c936facc22', '221', 'SENEGAL'),
('ee1ef63f-5dfd-4fb4-b10b-8aa131c31a83', '57', 'COLOMBIA'),
('eee81ffe-ba7c-4f82-85b9-cf156654f88e', '41', 'SWITZERLAND'),
('f1046608-4544-450b-b5ee-4dfbdbdf6787', '30', 'GREECE'),
('f1953581-c261-450c-bd5b-1a4c13dd50dc', '676', 'TONGA'),
('f1f81781-494c-486e-bf13-74abf4a00a62', '996', 'KIRGHISTAN'),
('f2f1a40f-35fb-4091-8eeb-bb8adcc2675f', '90', 'TURKEY'),
('f329075a-31af-49ad-b7c9-e1ecdaf0f38d', '501', 'BELIZE'),
('f3dd8a80-12c2-4eae-90e7-a18cd37a8510', '264', 'NAMIBIA'),
('f4bd4a90-0332-466b-9719-91057445366d', '966', 'SAUDI ARABIA'),
('f4cbe735-7419-4d95-9fd9-a56ee1febbd4', '55', 'BRAZIL'),
('f7a9d38b-7987-4447-b4d7-18ad22b9c0fd', '54', 'ARGENTINA'),
('f92c848c-690e-4113-9c4f-a0184cc6cf9b', '675', 'PAPUA NEW GUINEA'),
('fc3a05a2-207b-48e4-92af-2425161effe4', '62', 'INDONESIA'),
('fd2bab9f-d247-4b67-92bf-f62002ec8ab4', '218', 'LIBYA');

-- --------------------------------------------------------

--
-- Table structure for table `CountryCodeList`
--

CREATE TABLE IF NOT EXISTS `CountryCodeList` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assessYear` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CountryCodeList`
--

INSERT INTO `CountryCodeList` (`id`, `assessYear`, `createdAt`, `updatedAt`) VALUES
('039ef7f6-8737-454b-a253-53c7b918f873', '2013-2014', '2024-05-01 08:53:10.948', '2024-05-01 08:53:10.948'),
('f0e308d2-e133-4e92-b1e0-0429a27edbd2', '2012-2013', '2024-05-01 08:53:20.670', '2024-05-01 08:53:20.670');

-- --------------------------------------------------------

--
-- Table structure for table `GoldAndSilver`
--

CREATE TABLE IF NOT EXISTS `GoldAndSilver` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assessmentYear` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stGoldRate24CPer10Grams` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stSilverRateFor1Kg` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `GoldAndSilver`
--

INSERT INTO `GoldAndSilver` (`id`, `assessmentYear`, `stGoldRate24CPer10Grams`, `stSilverRateFor1Kg`) VALUES
('12bf1c63-de98-45fc-a0ea-39b04bd9800f', '31/03/2017', '28950', '42000'),
('1e7e427c-4e01-4b0d-924e-ce373c8d0881', '31/03/1997', '4725', '7345'),
('205389b1-fd31-4db9-a81b-a93ec6c5682f', '31/03/2014', '28470', '43070'),
('26cf77cb-af64-419b-b817-d5ebba9958e8', '31/03/2016', '28340', '36990'),
('26cfda3b-7fc4-4f4f-ba29-df4ee02e1fdd', '31/03/1987', '2570', '4794'),
('28ecdf33-cac6-4b3d-883e-1a7d8bcee7d7', '31/03/2013', '29610', '54030'),
('2d232977-097d-4d70-abce-7125bce6d9cd', '31/03/1993', '4140', '5489'),
('3bcf954a-54be-44e2-96ed-5db57e08a19e', '31/03/1982', '1645', '1645'),
('415b68fa-b7dd-40cd-8c48-cd84708d9274', '31/03/2006', '8490', '17405'),
('42393236-9199-47cb-8966-9398cb6ae042', '31/03/1989', '3140', '6755'),
('6198d0ab-1bee-4d6a-b5c7-ca66a42b4d22', '31/03/2000', '4380', '7900'),
('68e2a6c6-e69c-40d9-9bf3-530a74f3554e', '31/03/1984', '1975', '3570'),
('6ac6776c-bb96-465b-bf2c-212bfc26e65e', '31/03/1992', '4334', '8040'),
('6edeb62b-d946-43a6-99fe-cfed7cac993b', '31/03/2007', '9395', '19520'),
('799dcf4f-281d-4a33-87d1-2c80afe2a8c0', '31/03/2019', '35220', '40600'),
('7cfbb6b1-8c53-42f9-b5cc-72d0816e9222', '31/03/2003', '5310', '7695'),
('87757070-1a63-43b9-bcc2-2c50488ae251', '31/03/1996', '5160', '7346'),
('91681fd6-60ec-429b-b70c-33abb64db9b9', '31/03/2021', '48720', '65400'),
('91a1c561-d53a-4b11-b44d-4c5d09bfd4f8', '01/04/1981', '1670', '2715'),
('93d31d56-5c87-44f9-9050-7f1776c7e2e3', '31/03/1990', '3200', '6463'),
('99e4c180-c0dd-4223-b4cb-a4019d0576d6', '31/03/2018', '30680', '38355'),
('a1cc5fc5-f263-4a8c-8a89-16f5a304a12a', '31/03/1999', '4235', '7615'),
('a6cbcf0a-9ab9-424c-9e01-89cf720fee9c', '31/03/1991', '3466', '6646'),
('a8ed7fea-fb87-4b63-b93c-f4820dca7f4a', '31/03/2002', '5010', '7875'),
('b67b64f0-d1f5-41f2-a2b3-45e2299fa370', '31/03/1983', '1800', '3105'),
('b9925eb0-15ed-4789-92bf-40ffe3ce8039', '31/03/2004', '6065', '11770'),
('ba39083a-4efb-4ab4-b072-98bf72cc2c35', '31/03/2010', '16320', '27255'),
('be276612-a618-47f4-a3ac-8d739270bd72', '31/03/1995', '4680', '4680'),
('c9c74c98-76a7-4195-ba1c-ddce8470a375', '31/03/2015', '26245', '26245'),
('cb211108-d85a-4d8f-9639-391cae8297cb', '31/03/1986', '2140', '4015'),
('cb886cc2-d924-48d4-b668-e8f6eae535c6', '31/03/1988', '3130', '6066'),
('d259473b-e1e3-4e17-ac2f-3a273125c1ee', '31/03/2008', '12125', '23625'),
('d3ba6933-0f38-4ba4-bfe8-73c71c9722ff', '31/03/1998', '4045', '8560'),
('d6174b5f-6709-4b62-854a-7de0804c2c16', '31/03/2001', '4190', '7215'),
('d73cff82-a550-4f91-be56-3728330f24a3', '31/03/2020', '48651', '40500'),
('e6f124b5-2992-4e71-91b0-c5eacdbe679c', '31/03/2022', '51484', '66990'),
('e785c446-9ddd-4aa3-8bd3-1092ddc7ec45', '31/03/2009', '15105', '22165'),
('f0ccef71-abbd-421d-8b94-e565475490dc', '31/03/1994', '4598', '7142'),
('f30d1ef7-f899-4fe1-bbf9-d03edff26440', '31/03/2012', '28040', '56290'),
('f5177a35-f14e-40d5-9978-8dc56cbef569', '31/03/1985', '2130', '3955'),
('fd04d194-bc50-46db-ba6d-624ba48409f3', '31/03/2011', '20775', '56900'),
('fd518321-42c0-4e23-a90c-d1ac9162249e', '31/03/2005', '6180', '10675');

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_4A`
--

CREATE TABLE IF NOT EXISTS `Gstr1_4A` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `LegalName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `GSTN` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_No` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nature` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cgst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `igst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sgst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fy` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `processed_records` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxpayer_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trade_Name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Gstr1_4A`
--

INSERT INTO `Gstr1_4A` (`id`, `userId`, `LegalName`, `GSTN`, `pos`, `invoice_No`, `invoice_date`, `invoice_value`, `rate`, `nature`, `source`, `cgst`, `igst`, `sgst`, `supply_type`, `fy`, `period`, `createdAt`, `updatedAt`, `processed_records`, `status`, `taxpayer_type`, `trade_Name`) VALUES
(1, 4, 'MANINDAR SINGH SETHI', '23BNJPS3408M1ZP', ' 12 Anranchal Pradesh', '4', 'sdf', '', '1200', 'dsdfds', 'fsdfd', 'fsdfds', 'fgh', 'ghfg', 'hgfhg', 'gdg', 'dfsd', '2024-03-18 08:05:00.406', '2024-03-18 08:05:00.406', '', '', 'Regular', NULL),
(2, 4, 'MANINDAR SINGH SETHI', '23BNJPS3408M1ZP', ' 12 Anranchal Pradesh', '4', 'sdf', '', '1200', 'dsdfds', 'fsdfd', 'fsdfds', 'fgh', 'ghfg', 'hgfhg', 'gdg', 'dfsd', '2024-03-18 08:05:01.495', '2024-03-18 08:05:01.495', '', '', 'Regular', NULL),
(3, 4, 'MANINDAR SINGH SETHI', '23BNJPS3408M1ZP', ' 12 Anranchal Pradesh', '4', 'sdf', '', '1200', 'dsdfds', 'fsdfd', 'fsdfds', 'fgh', 'ghfg', 'hgfhg', 'gdg', 'dfsd', '2024-03-18 08:05:01.851', '2024-03-18 08:05:01.851', '', '', 'Regular', NULL),
(4, 4, 'MANINDAR SINGH SETHI', '23BNJPS3408M1ZP', ' 12 Anranchal Pradesh', '4', 'sdf', '', '1200', 'dsdfds', 'fsdfd', 'fsdfds', 'fgh', 'ghfg', 'hgfhg', 'gdg', 'dfsd', '2024-03-18 08:05:02.053', '2024-03-18 08:05:02.053', '', '', 'Regular', NULL),
(7, 5, 'MANINDAR SINGH SETHI', '23BNJPS3408M1ZP', '23', 'sdafadsf', '2024-02-28', 'dsaf', 'asdfad', 'adsf', 'fasdf', 'adsfadsf', '0', 'sfa', 'asd', '2024', 'dfsd', '2024-03-22 12:37:53.208', '2024-03-22 12:37:53.208', '', '', 'Regular', NULL),
(8, 7, 'MANINDAR SINGH SETHI', '23BNJPS3408M1ZP', '23', '10', '2024-03-05', '10', '10', '10', 'POSDATA', '10', '0', '10', 'POSDATA', '2024', 'dfsd', '2024-03-24 03:24:45.509', '2024-03-24 03:24:45.509', '', '', 'Regular', NULL),
(10, 9, 'MANINDAR SINGH SETHI', '23BNJPS3408M1ZP', '23', '123', '2024-03-24', '100000', '18', 'Goods', '', '9000', '0', '9000', '', '2024', 'dfsd', '2024-03-25 10:51:50.047', '2024-03-25 10:51:50.047', '', '', 'Regular', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_5A`
--

CREATE TABLE IF NOT EXISTS `Gstr1_5A` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `pos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_No` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_invoice_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `integrated_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sr_no` int NOT NULL,
  `total_taxable_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Gstr1_5A`
--

INSERT INTO `Gstr1_5A` (`id`, `userId`, `pos`, `invoice_No`, `supply_type`, `invoice_date`, `invoice_value`, `total_invoice_value`, `cess`, `integrated_tax`, `sr_no`, `total_taxable_value`) VALUES
(1, 26, '12 Anranchal Pradesh', '123', 'new', '123', 'invoice_value', '12', 'cess', 'integrated_tax', 1, '123'),
(2, 26, '12 Anranchal Pradesh', '123', 'new', '123', 'invoice_value', '12', 'cess', 'integrated_tax', 2, '123'),
(3, 26, '12 Anranchal Pradesh', '123', 'new', '123', 'invoice_value', '12', 'cess', 'integrated_tax', 3, '123'),
(4, 5, '12 Anranchal Pradesh', '123', 'new', '123', 'invoice_value', '12', 'cess', 'integrated_tax', 4, '123'),
(5, 5, '12 Anranchal Pradesh', '123', 'new', '123', 'invoice_value', '12', 'cess', 'integrated_tax', 5, '123'),
(6, 5, '12 Anranchal Pradesh', '123', 'new', '123', 'invoice_value', '12', 'cess', 'integrated_tax', 6, '123'),
(7, 5, '12 Anranchal Pradesh', '123', 'new', '123', 'invoice_value', '12', 'cess', 'integrated_tax', 7, '123'),
(8, 5, '37 Andhra Pradesh', '123', 'new', '123', 'invoice_value', '12', 'cess', 'integrated_tax', 8, '123'),
(9, 7, '37 Andhra Pradesh', '123', 'sdgfg', '213112', '3121', '123121', 'cess', 'integrated_tax', 9, '123');

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_5A_item`
--

CREATE TABLE IF NOT EXISTS `Gstr1_5A_item` (
  `id` int NOT NULL,
  `gstr1_5A_id` int NOT NULL,
  `Ammmout_of_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Igst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax_rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0%'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Gstr1_5A_item`
--

INSERT INTO `Gstr1_5A_item` (`id`, `gstr1_5A_id`, `Ammmout_of_tax`, `Igst`, `cess`, `tax_rate`) VALUES
(1, 1, '1200', '123', '122', '0%'),
(2, 1, '1200', '123', '122', '11%'),
(3, 1, '1200', '123', '122', '10%'),
(4, 1, '1200', '123', '122', '01%'),
(5, 2, '1200', '123', '122', '0%'),
(6, 2, '1200', '123', '122', '11%'),
(7, 2, '1200', '123', '122', '10%'),
(8, 2, '1200', '123', '122', '01%'),
(9, 3, '1200', '123', '122', '0%'),
(10, 3, '1200', '123', '122', '11%'),
(11, 3, '1200', '123', '122', '10%'),
(12, 3, '1200', '123', '122', '01%'),
(13, 4, '1200', '123', '122', '0%'),
(14, 4, '1200', '123', '122', '11%'),
(15, 4, '1200', '123', '122', '10%'),
(16, 4, '1200', '123', '122', '01%'),
(17, 5, '1200', '123', '122', '0%'),
(18, 5, '1200', '123', '122', '11%'),
(19, 5, '1200', '123', '122', '10%'),
(20, 5, '1200', '123', '122', '01%'),
(21, 6, '1200', '123', '122', '0%'),
(22, 6, '1200', '123', '122', '11%'),
(23, 6, '1200', '123', '122', '10%'),
(24, 6, '1200', '123', '122', '01%'),
(25, 7, '1200', '123', '122', '0%'),
(26, 7, '1200', '123', '122', '11%'),
(27, 7, '1200', '123', '122', '10%'),
(28, 7, '1200', '123', '122', '01%'),
(29, 8, '1200', '123', '122', '0%'),
(30, 8, '1200', '123', '122', '11%'),
(31, 8, '1200', '123', '122', '10%'),
(32, 8, '1200', '123', '122', '01%'),
(33, 9, '1200', '123', '122', '0%'),
(34, 9, '1200', '1200', '1200', '11%'),
(35, 9, '1200', '1200', '1200', '10%'),
(36, 9, '1200', '1200', '1200', '01%'),
(37, 9, '1200', '123', '122', '0%'),
(38, 9, '1200', '123', '122', '11%'),
(39, 9, '1200', '123', '122', '10%'),
(40, 9, '1200', '123', '122', '01%'),
(41, 9, '1200', '1200', '1200', '0%'),
(42, 9, '1200', '1200', '1200', '11%'),
(43, 9, '1200', '1200', '1200', '10%'),
(44, 9, '1200', '1200', '1200', '01%');

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_6A`
--

CREATE TABLE IF NOT EXISTS `Gstr1_6A` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `sr_no` int NOT NULL,
  `pos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_data` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gst_payement` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_taxable_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `integarted_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Gstr1_6A`
--

INSERT INTO `Gstr1_6A` (`id`, `userId`, `sr_no`, `pos`, `invoice_no`, `supply_type`, `invoice_data`, `invoice_value`, `total_value`, `gst_payement`, `total_taxable_value`, `integarted_tax`, `cess`) VALUES
(1, 26, 1, '123', '123', 'new', '123', 'invoice_value', '12', 'gst_payement', '123', 'integrated_tax', 'cess'),
(2, 7, 2, '37 Andhra Pradesh', '121', 'fgh', '123', '121', '12', 'gst_payement', '123', 'integrated_tax', 'cess');

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_6A_item`
--

CREATE TABLE IF NOT EXISTS `Gstr1_6A_item` (
  `id` int NOT NULL,
  `pecentage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `integrated_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cgst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sgst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gstr1_6A_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Gstr1_6A_item`
--

INSERT INTO `Gstr1_6A_item` (`id`, `pecentage`, `integrated_value`, `cgst`, `sgst`, `gstr1_6A_id`) VALUES
(1, '0%', '1200', '123', '122', 1),
(2, '0%', '1200', '123', '122', 1),
(3, '0%', '1200', '123', '122', 1),
(4, '0%', '1200', '123', '122', 1),
(5, '0%', '12', '12', '21', 2),
(6, '0%', '231', '412', '12', 2),
(7, '0%', '313', '2132', '12', 2),
(8, '0%', '12', '12', '12', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_7B`
--

CREATE TABLE IF NOT EXISTS `Gstr1_7B` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `gstn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sr_no` int NOT NULL,
  `pos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxable_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `central_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `place_of_supply` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_taxable` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `integrated` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_8ABCD`
--

CREATE TABLE IF NOT EXISTS `Gstr1_8ABCD` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `gstn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sr_no` int NOT NULL,
  `pos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxable_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `central_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_9B`
--

CREATE TABLE IF NOT EXISTS `Gstr1_9B` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `gstn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sr_no` int NOT NULL,
  `recipient_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_as_master` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `debit_credit_note_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `debit_credit_note_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `items_details` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `select_rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note_values` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_tax_rs` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `central_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_9B_un`
--

CREATE TABLE IF NOT EXISTS `Gstr1_9B_un` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `sr_no` int NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `debit_credit_note_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `debit_credit_note_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_tax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_details` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `select_rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_tax_rs` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `central_tax_rs` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_11A2A2`
--

CREATE TABLE IF NOT EXISTS `Gstr1_11A2A2` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `sr_no` int NOT NULL,
  `pos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Gstr1_11B1B2`
--

CREATE TABLE IF NOT EXISTS `Gstr1_11B1B2` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `sr_no` int NOT NULL,
  `pos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxable_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `igst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cgst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sgst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gstr1_12HSN`
--

CREATE TABLE IF NOT EXISTS `gstr1_12HSN` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `sr_no` int NOT NULL,
  `pos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxable_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cess` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `igst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cgst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sgst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Insurance`
--

CREATE TABLE IF NOT EXISTS `Insurance` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` datetime(3) NOT NULL,
  `maritalStatus` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Insurance`
--

INSERT INTO `Insurance` (`id`, `type`, `name`, `mobile`, `email`, `address`, `dob`, `maritalStatus`, `gender`, `userId`, `createdAt`, `updatedAt`) VALUES
('8160bdcf-3772-4c24-a4aa-e9e670801303', 'Car', 'bagetix bagetix ', '4449999999', 'bagetix552@otemdi.com', 'qwqwqw', '2005-11-22 00:00:00.000', '', 'male', 28, '2024-03-22 11:13:48.507', '2024-03-22 11:13:48.507');

-- --------------------------------------------------------

--
-- Table structure for table `InterestAccruedonNational`
--

CREATE TABLE IF NOT EXISTS `InterestAccruedonNational` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchaseDuration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `InterestAccruedonNational`
--

INSERT INTO `InterestAccruedonNational` (`id`, `purchaseDuration`) VALUES
('032b7d85-236c-4483-9fd3-b8c2cd411d07', '15-02-2000 to 28-02-2001'),
('085db67f-d82e-4586-a7b2-04f93530a7ce', '01-03-1999 to 28-02-2002'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', '2.9.1993 to 31.12.1998'),
('0f2fa7e5-4330-4aa7-ad97-908c96d45684', '01-03-2003 to 30-11-2011'),
('0f81b946-e7f7-4ea6-8dd4-1d0f64e2885a', '01-12-2003 to 30-03-2011'),
('236a5d9e-755b-4733-ac9f-a78f57818a2d', '7 years and 6 Months'),
('40af90f5-bb4e-4842-8361-33b6b8501956', '1.3.2003'),
('44fdaf0b-8384-476d-a15c-441c2b0ff799', '01-03-2002 to 28-02-2003'),
('46f109fd-8f08-4e56-a65f-5c56ff0f848c', '01-04-2020 to 31-03-2021'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', '1.3.2001 to 28.2.2002'),
('48bcbbca-0beb-4301-a6f3-ef5ad981d728', '8 years and 6 Months'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', '01.10.2016'),
('53f5aad6-75ed-4841-9788-e27b28622191', '7 years and 8 Months'),
('59aebd05-4b61-426c-bcab-65c884e5c5ae', '9 years'),
('5abcac49-36a2-4d1e-a2ce-13785f238f19', '01-01-1999 to 14-01-2000'),
('608598a7-b665-40e0-b050-84e13d28044c', '01-04-2016 to 30-09-2016'),
('695f8e8c-fc4d-45d1-b956-543b99e5cf10', '01-12-2011 to 31-03-2012'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', '1.3.2002 to 28.2.2003'),
('7814a29a-e10e-48d7-916c-399da4940470', '01-04-2012 to 31-03-2013'),
('784b80e2-31c6-43aa-88b4-69dbec1887a6', '8 years'),
('7b027902-2fa0-4871-a774-8dfd156772f2', '01-04-2013 to 31-03-2012'),
('7f8d704e-889d-4a7b-9c35-2fc54a8df043', 'Purchased before 01-01-1999'),
('82fb0629-a475-4995-a433-565d377b56a1', 'Certificate purchased on or after 02-09-1993 but before 01-01-1999'),
('842d09ab-614f-434d-a4ae-6d311c8cc00e', '01-04-2017 to 31-06-2017'),
('85368e06-28b2-4fc0-a6ff-681721cb56e2', '01-07-2017 to 31-06-2017'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'w.e.f. 01-12-2011 to 31-03-2012'),
('8e0786d3-2181-4fb6-96b1-e64c144e3fdb', '01-10-2016 to 31-03-2017'),
('934d87e9-c30d-47e5-8cdd-f9990c37302c', '7 years and 8 Months'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', '01.04.2016'),
('baeb0f94-f9ac-4c1c-8494-1325480e42d2', '01-10-2018 to 30-09-2019'),
('c9723f2f-49a0-4e13-b801-ddbb0af5602f', '8 years'),
('d856d3c0-4c71-459e-8ed9-0d05264c576f', '01-07-2018 to 31-03-2020'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', '15.1.2000 to 28.2.2001'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '18.11.2014'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', '1.1.1999 to 14.1.2000'),
('ebddb62d-2a73-4284-b7eb-820314d16311', 'Certificate purchased on or after 01-01-1999'),
('f51b8f94-455e-460f-89ee-b09c05a5aeed', '01-01-2018 to 30-09-2018'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', 'on or after 01-04-2013*');

-- --------------------------------------------------------

--
-- Table structure for table `InterestAccruedonNationalList`
--

CREATE TABLE IF NOT EXISTS `InterestAccruedonNationalList` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `listNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financeAct` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `InterestAccruedonNationalList`
--

INSERT INTO `InterestAccruedonNationalList` (`id`, `listNumber`, `financeAct`) VALUES
('475d0260-ab8b-4d5f-8175-33b31e059da7', 'viiith', '2022'),
('976f34b2-1d83-4e58-99f3-b292680e7990', 'ivp', '2022'),
('aba77428-6841-4f60-984e-615c326a1c5b', 'ixth', '2022'),
('e97befbe-99d5-4e87-b24b-ff74cca3bfbb', 'ikvp-1', '2022');

-- --------------------------------------------------------

--
-- Table structure for table `InterestRatesAccrued`
--

CREATE TABLE IF NOT EXISTS `InterestRatesAccrued` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `InterestRatesAccrued`
--

INSERT INTO `InterestRatesAccrued` (`id`, `duration`, `rate`) VALUES
('019247bb-4786-4dbb-b298-0d49073f684b', 'Fifth Year', 11.92),
('0457d6da-9171-464a-ab9c-a8f20b809c00', '2 years and 6 Months', 1170.51),
('04d788ca-ed36-4904-bff9-3524e3294216', 'Fifth Year', 18.51),
('055d4b14-6f02-4f45-8f45-bac09275a679', '1 year', 11),
('098a0702-5291-492d-a4eb-2e5caddf9ad4', '4 years and 6 Months', 1407),
('099dc627-8e5f-4295-be35-f0c85aeeceee', '8 years and 6 Months', 1779),
('0a106c47-8ef9-45c0-91f7-ccc7fa976373', '2 years and 6 Months', 1195),
('0ce76c75-9adc-4222-aac8-8fe08e7ce59f', '8 years and 6 Months', 1649.13),
('0df41116-044e-4bab-aec9-251a5d3a09de', '2 years and 6 Months', 1158),
('0e75c78c-5278-4180-90d3-6f7b95718383', '3 years and 6 Months', 1256),
('0f027e7e-feba-4201-ae2f-e87d19b155d2', 'Third Year', 8.8),
('0ffbafae-6e6a-41c8-9454-3cae53c8ba91', 'Second Year', 9.43),
('1187712c-4835-42f1-8cd8-f42a6c6b15f7', '5 ½ duration', 0),
('14d97795-801f-49b8-a7bc-4bfeb1f67ae0', '9 years', 1713.82),
('15cb87c9-5e88-4505-bf60-9a805e47d1fb', 'First Year', 6.8),
('16e16f7f-1f9b-4dd6-909e-5eae11d5ba55', 'Second Year', 8.41),
('17dcf8b1-f199-4f37-b6eb-33f6e4e8f810', '9 years', 1672),
('18655821-dc47-42f9-9b94-2962c20ceb42', 'Sixth Year', 0),
('1b912d48-6158-419a-b75f-ce46edc08aa4', 'Fifth Year', 13.09),
('1c29145f-6437-4e12-b206-16bf47a7ee03', 'Third Year', 10.54),
('1c2d5529-1b1c-477d-94a9-5fc2c5070166', 'Fourth Year', 12.58),
('1cf6b1ef-42e6-4020-b4fc-f30ff7371498', 'Third Year', 10.97),
('1e2867d6-76ab-4dcc-9943-832d44605d91', 'Fifth Year', 11.17),
('1e96d016-7cb1-4f2e-9653-c8a840d1a6cd', 'Second Year', 8.83),
('1ec80093-dba9-4306-93e0-2a4893153cea', '2nd Year', 137.51),
('1f6dd062-b539-4057-8cbf-0eed54b20163', '7 years and 3 Months', 1409),
('214c2589-680b-46bc-80e6-2fceb1882298', '5th Year', 222.32),
('2342271a-4e71-4aad-bbbb-062a4970a316', 'Third Year', 10.25),
('2612992f-fb04-41cd-90d4-ae713021eb34', '7 years and 3 Months', 1355.9),
('263cddcf-65e2-4d1e-83bf-b879b0dfeba7', '2nd Year', 152.33),
('27e6cb64-34cd-4e53-884f-a7f190474e3f', 'Sixth Year', 12.08),
('28776aae-207f-4fb5-8963-bc47a7fdf1b0', 'Second Year', 8.52),
('2a63b45b-0806-4c7f-9a54-7d59d5a9486b', 'N.A', 1067),
('2af0079e-0efd-462b-9249-224af63381f3', 'Sixth Year', 0),
('2d61d19f-11a0-45fb-a4d6-4265ce5f2d76', '8 years and 4 Months', 1488.49),
('2ea6d8f2-cfa8-41ff-9be2-3bb75b2ce45c', 'Third Year', 9.55),
('2f8b013e-6dbd-4e8c-be65-b673d91b96b0', 'Second Year', 8.83),
('311e9663-95c0-4be4-bcbb-1d709202e387', 'Third Year', 9.55),
('322e4f6f-5742-4a25-b753-a188cb3f0209', '8 years and 7 Months', 1850.93),
('32c0e120-3c64-45b4-94a2-c378c0e90a28', 'Second Year', 9.31),
('33dfb14d-79be-44f6-84ae-ce41409a5819', 'Sixth Year', 0),
('34a28ecf-dff7-43a5-a769-622fd33faa40', '4 years and 6 Months', 1450),
('34d1beb5-8963-451b-883d-671d10c8d4fa', 'First Year', 8),
('362130f1-c87b-4f7d-82f7-4faaffa8c065', '9 years', 1793),
('3765db28-3da3-4758-bdbb-5c9f6f73d01c', '3 years and 6 Months', 1180),
('379cf181-75cc-42cf-92fb-b13ad279aaaf', 'Second Year', 8.18),
('3890297d-578b-483d-990c-9a9396a66dc6', '5 years and 6 Months', 1478),
('3890734c-5879-4448-88ac-3ccf1f75cb12', '7 years and 3 Months', 1650),
('399903c3-3edf-40e9-b26c-685aace670f0', 'Third Year', 11.71),
('3a1c4788-58c8-44e9-8e11-0de56f4dc930', 'Fourth Year', 9.92),
('3c09c32a-20fd-4bbd-9b26-25ace35ad7a3', 'Ninth Year', 18.26),
('3cb42d1b-004c-437b-b4a9-ee77b13e9634', '8 years and 6 Months', 1537),
('3ec3fe55-0d71-41f5-a414-a878aa1c6255', '7 years', 1620),
('3fc58146-379d-45ca-9101-c4e75e2dbd6b', '4th Year', 173.26),
('40781eb4-924f-4e93-a8d9-cf03545f2f21', '2 years', 1110),
('408c8528-5f7b-400d-99d8-32dd6f6d48c0', 'Fourth Year', 9.77),
('40a9a5a7-95c3-427e-84ef-cb9db5397afb', '4th Year', 196),
('40decc60-a949-4e37-afaa-da923866b123', 'Compounded rate of interest', 12.25),
('420b8452-be82-4810-96a6-46be516a417f', '5 years and 6 Months', 1560),
('42eeb9eb-e3e1-4c2e-85db-88b37be1d86f', 'First Year', 8.58),
('430bfe26-dbc5-429d-a346-a9d24591d9ac', 'Fourth Year', 17.5),
('4847e83b-0d44-4250-9da4-7bc67a1e3218', '3rd Year', 154.35),
('4bb128e8-e72f-4531-b26d-e2defa839514', '3 years and 6 Months', 1380),
('4bcff15d-d2fb-48a8-a690-62a99cdb93b5', '9 years', 1524),
('4c172d3f-c065-42e7-bd50-eb12b425cb94', 'Sixth Year', 22.4),
('4d8e0417-8550-4daf-853e-39981ffc7ed5', '5 years', 1500),
('4f7ecb82-b626-42e5-b3d9-02917d5b9db5', 'Fourth Year', 10.08),
('4f9349b3-5bca-4ec4-a585-3900dfa730f1', 'Fifth Year', 10.71),
('4fa27ffb-8b49-4871-b07a-e05d2aa46e12', 'First Year', 11.83),
('51719c89-c0a4-4ead-ba0e-9db595a34c1b', '4 years and 6 Months', 1201),
('52f89ad0-22f2-4392-9c15-7d320653766a', '8 years and 6 Months', 1487),
('532396f4-8579-46a5-b26e-437ce399928e', 'Fifth Year', 10.19),
('53eb7612-4e0b-48ed-96b3-a73ed54ab9ae', 'Seventh Year', 15.08),
('53f9f881-67fe-4ecb-aadb-f4005fffd025', 'Tenth Year', 19.92),
('5420f028-f4fe-4ac0-8640-0ff260896576', 'First Year', 12.4),
('564bb41b-f2f9-4175-bdaa-d5f66335c524', '8 years and 6 Months', 1735),
('56721dd7-a8b4-4c7f-a133-dfcea86eaaaa', 'Sixth Year', 0),
('579643cb-f4ac-421b-a1a0-da192a5be8be', '6 years and 6 Months', 1407),
('57fdf89e-fc75-4809-8a83-984bb38e73d0', 'Third Year', 14.8),
('59b5ba38-16eb-4e8f-954e-6e75d1f73987', 'N.A', 0),
('5a521fd8-27ed-454e-8269-01ba36bac101', '6 years and 6 Months', 1305),
('5c094e64-c70c-4d8b-a5f1-7aafe3960bc7', 'Third Year', 10.68),
('5cf65635-7c03-4207-b2ab-fbffaae2118f', 'Fifth Year', 11.17),
('5d18c79e-ca89-46bd-bb1a-8f79a4f032d5', '7 years and 3 Months', 1382),
('5dbaad09-dc15-49ae-a240-25fdaa5b2458', 'First Year', 8.16),
('5de132ab-795e-4ea3-9fc9-eca5ae3214af', '7 years and 3 Months', 1478),
('61f58153-e2a6-42c8-acb2-d6d63376bf7b', 'Fourth Year', 11.48),
('6224499b-bb76-4256-8174-590637a8fe26', 'First Year', 8.99),
('62297443-ded1-4f49-8b2a-c0596459f379', '8 years and 6 Months', 1644),
('64060c14-8c30-4276-96cc-05703b927b51', 'Second Year', 12.58),
('640c4296-2406-4c7f-9e52-03ac417d8a4f', '8 years and 4 Months', 1668),
('65b606af-a15c-4ac5-b26f-f516ac7db440', 'Second Year', 9.68),
('65e48eb1-5123-4ee7-8e4d-80863de612d3', 'Fourth Year', 10.33),
('6663a74b-0a35-43a7-ba8a-d3374cccb1f4', '3 years', 1310),
('66e1651e-012c-4e0d-8a31-f7991993d802', '5 years and 6 Months', 1310.8),
('67472add-1b38-4680-9787-18f4868d2129', 'First Year', 11.3),
('67b55fc0-3c2a-4536-9959-2f0f3f098b27', '8 years and 6 Months', 1857),
('67be7fcf-db11-4324-9ddf-04077debe8d7', 'Tenth Year', 19.52),
('67e1fa3a-4c3f-4724-816b-dfa66de0aeaa', 'Third Year', 10.83),
('68403b0a-2c4a-4ddd-baee-24169a067a20', 'First Year', 8.1),
('697a9b81-e4cb-4130-b041-d90359f06a31', '9 years', 1487),
('69b5203a-c90c-4751-b3d3-cfbb8cb1045d', 'Third Year', 9.06),
('6bbf8c1a-32c7-4602-a295-66f132760c53', 'Sixth Year', 13.83),
('6cdb231a-8d9d-4746-8074-84c921c0a8db', '5 years and 6 Months', 1261),
('6f51fbd7-48d8-4ae0-85bc-e57e2b99ee89', '8 years and 6 Months', 2000),
('6f888433-3bf2-4480-81c6-7145f1708afc', '7 years and 3 Months', 1261),
('719d56be-39fe-4bbc-8733-d79cbee082ec', 'Sixth Year', 14.06),
('735b94c9-2575-4069-9e02-2c157899162c', '2 years and 6 Months', 1209),
('73e0963e-7b91-40ad-81e7-9a1d1125bed8', '8 years and 7 Months', 1833),
('74e4b55f-073d-45c9-b812-d506a8f96b41', 'Fifth Year', 17.35),
('79865998-811d-426b-8399-5bd74cfe4f23', '8 years and 6 Months', 1497),
('7aac7a52-15c5-4c88-b88c-4a260b2852ef', 'Compounded rate of interest', 13.43),
('7c3200a3-ad9f-4f8e-9397-1d8d9ebf26c8', '4 years and 6 Months', 1327),
('7c9a3c8e-c10d-49b8-a697-674d53a5670e', 'Fifth Year', 12.69),
('7e5872d4-a9ba-44f3-80fe-b9ef316eb3bb', '7 years and 3 Months', 1293),
('7f8b00a5-016c-4bd0-b170-b8e1f7d4d4c7', '5 years and 6 Months', 1409),
('805e5a16-051e-44d0-a9a0-fcfa0638e6b0', 'Third Year', 10.11),
('81309e0d-a7ff-46f1-8b52-ef89e52c1c07', 'Sixth Year', 0),
('8177516e-8f66-43c9-8202-cb8d877144cc', 'Second Year', 10.67),
('81b75a72-4f11-46ff-a020-3cb1ed8099c2', 'Sixth Year', 0),
('83e7e791-0acf-4032-8579-76fb77eb47ff', '8 years and 6 Months', 2000),
('8581ca6e-7424-4c54-8614-e41d3800de85', 'Second Year', 7.26),
('85b5c8d8-abb3-440d-8f4e-d2ec8c05537d', '8 years and 6 Months', 1602),
('85fcb46e-80cd-44c9-bb8d-b6a26132163c', 'Fourth Year', 9.92),
('86e04af8-f03c-44a1-8316-0a92436d656a', 'Fourth Year', 11.64),
('8835eea1-751e-4f3e-8043-900856c28263', 'N.A', 1068),
('888f2f7d-4ee0-4e73-b93f-848a09cc6309', 'Sixth Year', 0),
('8c96afa1-aad6-42db-b576-ac4a6cdc3a19', '8 years and 7 Months', 1589),
('8cb9e544-09ab-468f-abab-db35ebf62a85', 'Second Year', 8.76),
('8cf9d3f5-2259-42c2-8c30-0d36d2266289', 'First Year', 9.1),
('8d434861-4dad-472d-91c9-88571ba7cf64', '5 ½ duration', 122.24),
('8d7ad7f2-038a-4489-b62f-92f790b0acea', 'Second Year', 8.64),
('8e7fe3de-2e98-4eda-8841-1ee631b7248c', 'First Year', 9.72),
('8e83e7f7-ede8-492d-a33c-25b540ddef5c', 'First Year', 8.16),
('8f0edfe7-85f0-4275-8dc9-73f4be535b5e', 'First Year', 8.68),
('8fd3e2fa-9f40-4575-8821-ceb7dc743777', '6 years and 6 Months', 1327),
('9033a9da-224d-41b4-9f0c-4d9deeaeb19a', 'Sixth Year', 0),
('911dc898-589e-4be4-9fda-7b8765db80b2', 'Third Year', 9.33),
('91d2f1ae-e8fd-4cec-82bf-711201f04146', 'Eighth Year', 16.74),
('928e0341-6fca-445f-aeb8-726af2495e29', 'Second Year', 13.9),
('93011997-9f85-4286-8d3b-c9171f14978f', '2 years and 6 Months', 1280),
('94873062-80ea-4db5-836b-4493a428f13b', 'Sixth Year', 19.31),
('951ce452-49e7-47c3-b73b-d652e9715b77', '8 years', 1798),
('958e25a5-dd1d-410e-b276-84356515e007', 'Fifth Year', 10.88),
('962c36e2-0a08-4955-8547-51c5ca992f33', 'Fourth Year', 10.33),
('967651f7-fdbe-47c2-82df-d186db7d18ed', 'Sixth Year', 14.29),
('9766ffa8-bf0e-4903-9dd9-b0bd89ab1b07', 'Fifth Year', 14.1),
('98ca6ee0-33bd-4e3b-8560-a76f972b1257', '6 years and 6 Months', 1470),
('9a138fbf-03e2-4be7-bb9a-13f0986adff5', '2 years and 6 Months', 1246),
('9bce098e-d715-45e6-b9ed-a25062459f26', '8 years and 6 Months', 2000),
('9c2d3182-4771-4c6d-a61e-dfc335c31c77', 'Sixth Year', 0),
('9ca336be-1b80-4776-a9d1-ac6fb2f5ea9f', 'Second Year', 9.93),
('9d953a00-4867-460c-87a1-5a718ca19dbf', '6th Year', 217.9),
('9edf1e0f-e002-4a44-8be6-c56233b2eb6c', 'Third Year', 9.2),
('a0347f20-dc17-4a5c-be60-a26becd0f070', 'Second Year', 13.23),
('a1358f72-9f33-475f-9b7b-4f7b2f0cb9e3', 'Fifth Year', 11.06),
('a23c3b82-bfff-4cce-88a1-2538391f2c4d', '1st Year', 122.5),
('a4284a50-dd51-4b9c-8f9b-d4714d1cc36a', '4 years and 6 Months', 1327),
('a4440204-5686-4ee9-9d21-43867c294aa5', 'Fifth Year', 8.85),
('a6e16225-e508-4193-89a3-3ce990670b83', 'First Year', 7.8),
('a78f43fb-942b-4c64-9616-53ea1f70aeb1', '3 years and 6 Months', 1207.95),
('a9c44552-1b1e-43c6-b297-b6ed0e51817e', 'Seventh Year', 15.34),
('a9d4150a-f95b-4ba9-a4a5-6bab125e52c7', 'Sixth Year', 0),
('aa7322b4-af3d-4661-84f0-b09979ddad03', 'Ninth Year', 17.91),
('ab0ee267-9920-4d70-b982-fbb7a2f8cffe', 'Third Year', 9.33),
('ab48df87-c0ce-4aab-8f0e-b8db28257bc2', 'Fourth Year', 16.54),
('ac803e57-8105-4c0c-bd68-e1e355a7c1a8', 'Sixth Year', 13.61),
('acac30ba-5f90-4a93-87d7-8dd4e54dcc9e', 'Fourth Year', 10.08),
('ae98d148-acd9-4a84-8af5-300d49460632', '3 years and 6 Months', 1274),
('af33f126-8a50-4da8-a7da-0e6615049c7e', 'First Year', 7.6),
('b112ffc5-1765-4f20-97a5-7f73055e11ca', '5 years and 6 Months', 1293),
('b1d40bd2-008b-458c-921c-af0f45d5fb92', 'Fifth Year', 10.71),
('b3ffee76-68e9-41a7-8091-e916a44629b9', '8 years and 6 Months', 1076),
('b42fc1c8-c2cf-4d6b-b4d7-f343b1d85986', '9 years', 1770),
('b4c28ecc-ed0f-4314-acae-71505b56622c', 'First Year', 7.9),
('b4fae322-eb11-4264-bff4-1d199f62d1ef', 'Eighth Year', 16.13),
('b4fbc59a-4707-4c3d-8669-0d89a238e10f', 'First Year', 7.9),
('b582da1d-db1e-45fd-9f70-ed7131eb4778', 'Fourth Year', 9.47),
('b643dd7a-f50f-433f-83eb-564aa23b3819', '8 years and 4 Months', 1303),
('b7e4172e-b4c6-421d-8ba6-b3ff77d5a64f', '8 years and 4 Months', 1698),
('b8451466-be2c-43bb-86b6-bec343c4a08e', 'Fourth Year', 11.98),
('b8f024a3-8017-42d2-9436-aab1af50861c', 'Fifth Year', 12.89),
('b9221c37-de5a-4f9c-b63e-5094d49926a9', 'Third Year', 14),
('b948b214-fe62-4b08-9379-2c94d2481aba', '8 years and 7 Months', 1611),
('ba63dac6-ad91-4160-afe5-7dc2fe924887', 'N.A', 0),
('bb7a931f-c2e6-4b06-ace8-0d46ee9c7496', 'Fifth Year', 19.7),
('bbccc79c-cf04-4f63-8ed5-b6d675c7a9ea', '3 years and 6 Months', 1302),
('bd399d74-5a9c-4535-a7f3-a706c61d1afa', 'Fourth Year', 15.58),
('be105b09-7a4f-434d-b4b5-9ee9f9ab05ec', 'Fifth Year', 10.88),
('c0313160-d968-4b21-a79e-97381cf602d7', '8 years and 6 Months', 2000),
('c0e7200d-5cac-4210-af7a-16ba5a686744', 'Fourth Year', 10.98),
('c4aa337a-23ae-4568-a9dc-445dac67115f', 'Eighth Year', 16.43),
('c58e7081-bfc2-4aa8-803d-c708ca71f553', '4 years and 6 Months', 1305),
('c5f3ed72-e699-43f4-9c70-f8bd3cd28eca', '8 years and 4 Months', 1680),
('c66ce11c-efe5-491a-b772-77fcd0584b4a', '8 years and 4 Months', 1391),
('c687e666-2130-4a0c-939d-7f3e1ae37d97', 'Ninth Year', 17.57),
('c7713173-ad10-49f2-9802-1b0d03f3e3e1', 'Fifth Year', 12.5),
('c7c5d7b7-557a-43dd-8647-0e805449cd98', '8 years and 6 Months', 1611),
('c86d0b9a-3efc-4a51-9bc3-80f02f22770b', 'Third Year', 15.6),
('c9462ce8-9607-4e40-9e46-4789933d141b', 'Seventh Year', 14.82),
('cc253f63-5d1f-4ead-b70a-118c87c4dd5e', '2 years', 1240),
('cc8934df-9188-456f-9d5b-cea19b8d41e5', 'Fifth Year', 10.53),
('cd96beb2-d006-4470-b97c-676397930483', '8 years and 6 Months', 1755),
('cd9d8e0b-da0b-4b19-96af-24a19ac64632', '8 years and 6 Months', 1800),
('ce5fb742-7908-4c6c-8760-16588c0d3547', '8 years and 7 Months', 2000),
('cf3e1929-aa75-41f8-8a32-035d48bac5b1', 'Second Year', 9.8),
('d048de38-d315-45b0-8e7f-cf2e4ef49a58', 'N.A', 1076),
('d06e1689-153a-48be-b33a-41e475332029', 'Fourth Year', 8.28),
('d0b0d7fe-fcd7-413d-ab4a-04ba7b876241', '3 years and 6 Months', 1201),
('d34e9af5-91b6-44a5-a7b0-b4b7f5ff879f', '6 years and 6 Months', 1220),
('d76dd968-9888-4564-a23f-5949ae48b4af', 'Third Year', 7.76),
('d7c5a04d-032a-4b3a-984e-62e46da0c00a', '2 years and 6 Months', 1142),
('d9c62a5c-3061-435c-b4c3-fdb8d0eeb7ce', 'First Year', 9.2),
('da6fa70d-f9b7-457d-88a1-5f4447505c8c', 'Fourth Year', 11.81),
('db0c9da2-309f-4400-9373-f4387293167b', 'Fifth Year', 12.11),
('ddb99aac-a6c2-47ef-895c-fd5509ba3921', '1st Year', 134.3),
('e0f96823-b3cf-46d1-86b3-3c482a056cd4', '6 years and 6 Months', 1650),
('e194fbc9-4f88-4721-8987-866cea8811cc', 'Second Year', 10.05),
('e23721ef-7ae0-4620-97e5-b82c155bd4c3', '9 years', 1874),
('e3a85db8-c9be-4ca0-a20f-1264e23cfcfd', 'Sixth Year', 15.47),
('e3b0d453-8a07-4fa9-aa3a-e926f6dc47b4', '8 years and 4 Months', 1870),
('e677962d-ec17-4ec4-9d6b-efdd4cd7cb00', '8 years and 4 Months', 1572),
('e69f2233-9f7c-4943-9763-d4a25f6c493a', 'Fourth Year', 11.14),
('e71d36d4-6b7f-443f-b891-7ff000dd53b8', 'Fourth Year', 10.23),
('e8b5bc5b-bd85-40d2-b75d-d2fa7350a34a', '5 years and 6 Months', 1382),
('e9e955d2-6fac-43f1-ba91-f2e7fec71288', 'N.A', 0),
('ea170fb7-e9aa-4206-8911-2d97b6d11649', 'Third Year', 9.2),
('ef08565e-6999-482d-8463-fe06722acf1c', '4 years and 6 Months', 1267.19),
('ef39e76b-64b3-4863-bed7-7e03b3488453', '6th Year', 0),
('f0aaf4ac-6038-4f8f-bd9a-19b77cf05352', 'Second Year', 8.64),
('f0c17439-3931-4d1e-ae24-3c44920cf1d4', '8 years and 7 Months', 2000),
('f1fe21a0-d91a-42a0-9541-0128546dbd46', 'Tenth Year', 19.13),
('f373d502-8bd7-4025-b0c2-1810c0b1cd7e', 'First Year', 8.89),
('f3d66525-8579-482d-bbc1-e10388d253d0', '6 years', 1620),
('f5dcb798-665f-4e1d-8b29-f555a6562d5b', '5th Year', 194.48),
('f65fb204-8913-4b0d-88a9-ede395555c7c', '6 years and 6 Months', 1310.8),
('f6eba783-56db-4665-9d8c-6a87f09d7ab4', 'Sixth Year', 20.69),
('f70676fb-becb-4b7c-aea9-9df00e7392cc', '8 years', 1860),
('f9da52b4-df89-4c19-8a35-3fbf0054dc46', '4 years', 1420),
('fab6664c-432f-4099-9311-7db24ffbac5e', 'Third Year', 9.46),
('fafadbdb-856d-4002-aa8d-32edc6fb7a26', '8 years and 4 Months', 1534),
('fbae511c-0da6-4a41-a487-44b6ec47594a', '3rd Year', 172.8),
('fbf884a9-03fe-420b-86ba-c63891b6e9aa', 'Sixth Year', 0),
('fe197585-4713-442f-abcc-9163af24b9d9', 'Second Year', 8.52),
('fe218d7b-86cb-4417-a6d4-ccebd0efd537', 'First Year', 8),
('ffb81804-4696-470d-b03e-53dd37ee7b31', '9 years', 1814);

-- --------------------------------------------------------

--
-- Table structure for table `Invoice`
--

CREATE TABLE IF NOT EXISTS `Invoice` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('sales','purchase','sales_return','purchase_return') COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalAmount` double NOT NULL,
  `totalGst` double DEFAULT NULL,
  `stateOfSupply` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cgst` double DEFAULT NULL,
  `sgst` double DEFAULT NULL,
  `igst` double DEFAULT NULL,
  `utgst` double DEFAULT NULL,
  `details` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extraDetails` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modeOfPayment` enum('cash','bank','upi','credit') COLLATE utf8mb4_unicode_ci NOT NULL,
  `credit` tinyint(1) NOT NULL,
  `userId` int NOT NULL,
  `partyId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gstNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `status` enum('unpaid','paid','overdue') COLLATE utf8mb4_unicode_ci NOT NULL,
  `dueDate` datetime(3) DEFAULT NULL,
  `invoiceDate` datetime(3) DEFAULT NULL,
  `isInventory` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Dumping data for table `Party`


INSERT INTO `Party` (`id`, `partyName`, `type`, `gstin`, `pan`, `tan`, `upi`, `email`, `phone`, `address`, `bankName`, `bankAccountNumber`, `bankIfsc`, `bankBranch`, `userId`, `createdAt`, `updatedAt`) VALUES
('0f845bc2-72c0-4946-a466-48e744b577ff', 'abc Eterprise', 'supplier', '23BNJPS3408M1ZP', 'AAACJ3770E', NULL, 'abc@ybl', 'vivekjhhg@gmail.com', '08723685453', 'jkhbkjh', 'boi', '454578547851', NULL, NULL, 4, '2024-03-12 11:51:21.211', '2024-03-12 11:51:21.211'),
('1cd3fd56-899c-4e7c-bc1a-50e68d817889', 'Demo party', 'supplier', '09AAACH7409R1ZZ', '12345678', NULL, 'abc@upi', 'sarthakapoor2152@gmail.com', '12345566', '123, Street address', 'Demo', '123213', NULL, NULL, 7, '2024-03-21 00:56:51.080', '2024-03-21 00:56:51.080'),
('37e415ed-e8f9-42d7-8363-b9df85f8e301', 'ABC Supplier', 'supplier', 'GSTIN123', 'PAN123', NULL, 'abc@upi', 'abc@example.com', '1234567890', '123 Street, City, Country', 'ABC Bank', '1234567890', 'ABCD1234', 'XYZ Branch', 1, '2024-03-12 11:59:25.367', '2024-03-12 11:59:25.367'),
('52eeaee8-be8b-47a3-ba99-18a87c7e8b1e', 'ABC Supplier', 'supplier', '', 'AAFCI5163E', NULL, 'upi', 'gggggg@gmail.com', '9999999', '19/394 trilockpuri', 'State Bank of India', '567576', NULL, NULL, 28, '2024-03-22 11:20:17.720', '2024-03-22 11:20:17.720'),
('620ed078-6624-49b9-80b1-48ebb970f0a7', 'Party one', 'supplier', '23BNJPS3408M1ZP', 'DSYPA0162G', NULL, 'partyOne@paytm', 'jishankhannew@gmail.com', '9654742699', 'Test address', 'Test bank', '34332259489', NULL, NULL, 5, '2024-04-18 06:52:11.969', '2024-04-18 06:52:11.969'),
('876616a6-a6d5-4227-8b47-ca738c21b316', 'ABC Supplier 3', 'supplier', 'GSTIN123', 'PAN123', NULL, 'abc@upi', 'abc@example.com', '1234567890', '123 Street, City, Country', 'ABC Bank', '1234567890', 'ABCD1234', 'XYZ Branch', 1, '2024-03-12 12:05:25.418', '2024-03-12 12:05:25.418'),
('d4e61ecc-65c3-4c47-b9f6-9f1890719a90', 'Demo party', 'supplier', '09AAACH7409R1ZZ', '12345678', NULL, 'nfjasjf@upi', 'sarthakapoor2152@gmail.com', '12345566', 'demo data', 'Demo', '123213', NULL, NULL, 7, '2024-03-21 06:40:40.002', '2024-03-21 06:40:40.002');

-- --------------------------------------------------------


--
-- Dumping data for table `Invoice`
--

INSERT INTO `Invoice` (`id`, `invoiceNumber`, `type`, `totalAmount`, `totalGst`, `stateOfSupply`, `cgst`, `sgst`, `igst`, `utgst`, `details`, `extraDetails`, `modeOfPayment`, `credit`, `userId`, `partyId`, `gstNumber`, `createdAt`, `updatedAt`, `status`, `dueDate`, `invoiceDate`, `isInventory`) VALUES
('19941439-57ff-4ad5-b069-77377a5f642d', 'INV123', 'sales', 1000, 200, '35', 100, 100, 0, 0, 'Jishan', '', 'bank', 0, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', '35BNJPS3408M1ZP', '2024-04-19 10:38:27.295', '2024-04-19 10:38:27.295', 'paid', NULL, NULL, NULL),
('3071d84b-ff18-420a-8ac0-6476759b8f71', 'INV123', 'purchase', 1000, 200, '35', 100, 100, 0, 0, 'All details', '', 'bank', 0, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', '35BNJPS3408M1ZP', '2024-04-18 16:42:16.874', '2024-04-18 16:42:16.874', 'unpaid', NULL, NULL, NULL),
('3ff365ec-8d89-41c4-89c9-7da616a87605', 'INV-1710247721675', 'sales', 0, 180, 'MADHYA PRADESH', 245, 455, NULL, NULL, 'gfhgfh', 'fghfg', 'cash', 0, 4, '0f845bc2-72c0-4946-a466-48e744b577ff', '23BNJPS3408M1ZP', '2024-03-12 12:50:38.858', '2024-03-12 12:50:38.858', 'unpaid', NULL, NULL, NULL),
('54ff0465-5700-4eab-af30-993d382b6595', 'INV123', 'sales', 1000, 200, '35', 100, 100, 0, 0, 'Description.', '', 'cash', 0, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', '35BNJPS3408M1ZP', '2024-04-18 14:15:23.424', '2024-04-18 14:15:23.424', 'paid', NULL, NULL, NULL),
('65402989-eb6c-4890-bf8d-73417520e06c', 'INV123', 'purchase', 1000, 200, '23', 100, 100, 0, 0, 'Description.', '', 'cash', 0, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', '23BNJPS3408M1ZP', '2024-04-18 15:56:45.456', '2024-04-18 15:56:45.456', 'paid', NULL, NULL, NULL),
('6b50a437-ff02-4d9d-8392-25cb63229d9e', 'INV-1711003423896', 'sales', 100, 180, 'HARYANA', NULL, NULL, 12, NULL, '12', '12', 'bank', 0, 7, 'd4e61ecc-65c3-4c47-b9f6-9f1890719a90', '09AAACH7409R1ZZ', '2024-03-21 06:44:22.163', '2024-03-21 06:44:22.163', 'unpaid', NULL, NULL, NULL),
('70432d9f-9709-4953-9715-f653e62a3fbb', 'INV123', 'sales', 1000, 180, 'Some State', 9, 9, 0, 0, 'Some extra details', 'Some extra details', 'cash', 0, 6, '1cd3fd56-899c-4e7c-bc1a-50e68d817889', '12ABCDE1234F1Z9', '2024-04-04 10:00:41.453', '2024-04-04 10:00:41.453', 'paid', NULL, NULL, NULL),
('7789e89a-34b8-4420-bc71-ff4611b5b5dc', 'INV123', 'sales', 1000, 200, '35', 100, 100, 0, 0, 'Some details', '', 'bank', 0, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', '35BNJPS3408M1ZP', '2024-04-18 16:50:05.570', '2024-04-18 16:50:05.570', 'paid', NULL, NULL, NULL),
('7eb2d0f1-ebda-4593-bd4f-afe1292a61ca', 'INV-1708768710233', 'sales', 1000, 100, '13', 10, 10, 10, 10, 'testing', 'testing create invoice', 'cash', 0, 7, '1cd3fd56-899c-4e7c-bc1a-50e68d817889', '11AAACH7409R1ZZ', '2024-04-01 06:14:49.045', '2024-04-01 06:14:49.045', 'unpaid', NULL, NULL, NULL),
('8b563267-ab7d-464d-9894-bde12928c5df', 'INV-1708768710233', 'sales', 100, 100, '09', 100, 100, 1, NULL, 'temp', NULL, 'cash', 0, 7, '1cd3fd56-899c-4e7c-bc1a-50e68d817889', '09AAACH7409R1ZZ', '2024-04-02 10:36:06.063', '2024-04-02 10:36:06.063', 'unpaid', NULL, NULL, NULL),
('9cb6b59e-d8ba-4595-9445-8eeee4468114', 'INV123', 'sales', 1000, 200, '23', 100, 100, 0, 0, 'Description.', '', 'cash', 0, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', '23BNJPS3408M1ZP', '2024-04-18 14:17:50.188', '2024-04-18 14:17:50.188', 'paid', NULL, NULL, NULL),
('a04fd819-285b-4528-8ef3-ebe71171c665', 'INV123', 'sales', 1000, 180, '23', 90, 90, 0, NULL, 'Testing', NULL, 'cash', 0, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', '23BNJPS3408M1ZP', '2024-04-18 06:53:19.537', '2024-04-18 06:53:19.537', 'paid', NULL, NULL, NULL),
('befb61f1-a896-4dfd-91c5-b6c9d85da77e', 'INV-1708768710233', 'purchase', 100, 10, '17', 100, 100, 100, 100, 'demo details', NULL, 'bank', 0, 7, '1cd3fd56-899c-4e7c-bc1a-50e68d817889', '01AAACH7409R1ZZ', '2024-04-02 08:17:46.794', '2024-04-02 08:17:46.794', 'unpaid', NULL, NULL, NULL),
('c6fe6ee6-2f73-4431-92c1-a24e575ade17', 'JKFEJK19321', 'sales', 12, 12, '23', 12, 12, 12, NULL, '121231', NULL, 'cash', 0, 1, '37e415ed-e8f9-42d7-8363-b9df85f8e301', '23BNJPS3408M1ZP', '2024-04-15 08:11:42.858', '2024-04-15 08:11:42.858', 'paid', NULL, NULL, NULL),
('fc8826cd-4973-4368-a5bd-d2dfed5e6cb9', 'INV123', 'purchase', 1000, 200, '23', 100, 100, 0, 0, 'No details', '', 'bank', 0, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', '23BNJPS3408M1ZP', '2024-04-18 16:40:36.120', '2024-04-18 16:40:36.120', 'unpaid', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `InvoiceItem`
--

CREATE TABLE IF NOT EXISTS `InvoiceItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `discount` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `invoiceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxPercent` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



--
-- Dumping data for table `Item`
--

INSERT INTO `Item` (`id`, `itemName`, `unit`, `price`, `openingStock`, `closingStock`, `purchasePrice`, `taxExempted`, `description`, `hsnCode`, `categoryId`, `supplierId`, `userId`, `createdAt`, `updatedAt`, `cgst`, `igst`, `sgst`, `utgst`) VALUES
('14e170f9-f2f9-4034-b6fc-61cf6475c2a4', 'Smartphone', 'pieces', 500.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 400.000000000000000000000000000000, 0, 'Description of the item', 'HSN123', NULL, NULL, 1, '2024-03-12 11:59:57.073', '2024-03-12 11:59:57.073', NULL, NULL, NULL, NULL),
('230b9806-018e-4b3f-8ede-903b54ddb12b', 'Plastic Bag', 'pieces', 1000.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 500.000000000000000000000000000000, 0, 'This is an item, used to keep stuff.', 'HSN123', NULL, NULL, 5, '2024-04-17 14:56:56.233', '2024-04-17 14:56:56.233', NULL, NULL, NULL, NULL),
('32ef487f-8a1b-44a3-a17c-b97c3705b6e4', 'moto phone', 'pieces', 500.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 400.000000000000000000000000000000, 0, 'Description of the item', 'HSN123', NULL, NULL, 1, '2024-03-12 12:07:04.253', '2024-03-12 12:07:04.253', NULL, NULL, NULL, NULL),
('336531a9-937b-4052-9cbd-966d0300a5da', 'Test2', 'pieces', 1200.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 200.000000000000000000000000000000, 1, 'Some text', 'HSN123', NULL, NULL, 2, '2024-04-04 11:19:24.103', '2024-04-04 11:19:24.103', NULL, NULL, NULL, NULL),
('6ba26b50-5d67-4ce6-8af9-1b2b7150269f', 'Test2', 'pieces', 1200.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 200.000000000000000000000000000000, 1, 'Some text', 'HSN123', NULL, NULL, 2, '2024-04-04 11:17:40.273', '2024-04-04 11:17:40.273', NULL, NULL, NULL, NULL),
('6c98dd9f-dfcb-4352-8fe3-8dfdfd825c49', 'Test', 'pieces', 100.000000000000000000000000000000, 100.000000000000000000000000000000, 10.000000000000000000000000000000, 120.000000000000000000000000000000, 1, 'Some text', 'HSN123', NULL, NULL, 2, '2024-04-04 11:24:05.947', '2024-04-04 11:24:05.947', NULL, NULL, NULL, NULL),
('6df0cfe6-6624-4dd1-9cd9-be31783352ca', 'Test2', 'pieces', 1200.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 200.000000000000000000000000000000, 1, 'Some text', 'HSN123', NULL, NULL, 2, '2024-04-04 11:18:07.055', '2024-04-04 11:18:07.055', NULL, NULL, NULL, NULL),
('78d89d8c-80ab-4666-b9b2-ebe477fcf38f', 'Smar', 'pieces', 500.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 400.000000000000000000000000000000, 0, 'Description of the item', 'HSN123', NULL, NULL, 6, '2024-03-13 08:42:06.084', '2024-03-13 08:42:06.084', NULL, NULL, NULL, NULL),
('821e5a0d-fa08-4c69-b78b-59cd810dfa6d', 'Item 1', 'pieces', 100.000000000000000000000000000000, 10.000000000000000000000000000000, 115.000000000000000000000000000000, 100.000000000000000000000000000000, 1, 'This is demo', '123241', NULL, NULL, 7, '2024-03-21 00:59:41.909', '2024-03-21 00:59:41.909', NULL, NULL, NULL, NULL),
('82289148-9cfe-4ad1-acd7-3d1371c5a603', 'Item', 'pieces', 100.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 200.000000000000000000000000000000, 1, 'Text description', 'HSN123', NULL, NULL, 5, '2024-04-04 13:05:14.959', '2024-04-04 13:05:14.959', NULL, NULL, NULL, NULL),
('b0f35ead-e30d-40e1-b9e8-426ea747027f', 'Raw material', 'pieces', 100.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 100.000000000000000000000000000000, 0, 'Some item', 'HSN123', NULL, NULL, 41, '2024-05-18 05:39:03.052', '2024-05-18 05:39:03.052', NULL, NULL, NULL, NULL),
('bfde4914-6273-428d-a1ba-e8017174c3be', 'item', 'pieces', 1000.000000000000000000000000000000, 1000.000000000000000000000000000000, 500.000000000000000000000000000000, 100.000000000000000000000000000000, 1, 'Some text', 'HSN123', NULL, NULL, 2, '2024-04-04 11:11:31.964', '2024-04-04 11:11:31.964', NULL, NULL, NULL, NULL),
('ce5db1ba-7144-4889-a537-30e7716a045d', 'Test2', 'pieces', 1200.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 200.000000000000000000000000000000, 1, 'Some text', 'HSN123', NULL, NULL, 2, '2024-04-04 11:17:48.766', '2024-04-04 11:17:48.766', NULL, NULL, NULL, NULL),
('d8a552a7-24dc-482f-99c1-017e6af60ec6', 'Test2', 'pieces', 1200.000000000000000000000000000000, 100.000000000000000000000000000000, 50.000000000000000000000000000000, 200.000000000000000000000000000000, 1, 'Some text', 'HSN123', NULL, NULL, 2, '2024-04-04 11:15:53.241', '2024-04-04 11:15:53.241', NULL, NULL, NULL, NULL);




-- --
-- -- Dumping data for table `InvoiceItem`
-- --

INSERT INTO `InvoiceItem` (`id`, `itemId`, `quantity`, `discount`, `invoiceId`, `taxPercent`) VALUES
('0af33b40-c014-465c-a19a-5b903b619113', '230b9806-018e-4b3f-8ede-903b54ddb12b', 19, 19.000000000000000000000000000000, 'fc8826cd-4973-4368-a5bd-d2dfed5e6cb9', 0.000000000000000000000000000000),
('0d56d52f-0ea8-49b7-9caf-cd601f9379f8', '230b9806-018e-4b3f-8ede-903b54ddb12b', 12, 10.000000000000000000000000000000, '3071d84b-ff18-420a-8ac0-6476759b8f71', 0.000000000000000000000000000000),
('1aaf635b-4e35-46be-82f7-c1b3084495e4', '82289148-9cfe-4ad1-acd7-3d1371c5a603', 10, 10.000000000000000000000000000000, '7789e89a-34b8-4420-bc71-ff4611b5b5dc', 0.000000000000000000000000000000),
('38a1f807-880d-4888-8924-b1d451ee06b1', '821e5a0d-fa08-4c69-b78b-59cd810dfa6d', 1000, 10.000000000000000000000000000000, 'befb61f1-a896-4dfd-91c5-b6c9d85da77e', 0.000000000000000000000000000000),
('4298b116-bfec-4cf7-a1dd-e593f937c447', '230b9806-018e-4b3f-8ede-903b54ddb12b', 10, 10.000000000000000000000000000000, '65402989-eb6c-4890-bf8d-73417520e06c', 0.000000000000000000000000000000),
('70bcd46f-0b8f-47d9-80f2-7c268b5f83af', '82289148-9cfe-4ad1-acd7-3d1371c5a603', 100, 10.000000000000000000000000000000, '9cb6b59e-d8ba-4595-9445-8eeee4468114', 0.000000000000000000000000000000),
('7effc616-b959-4067-897f-c22bf35409d4', '230b9806-018e-4b3f-8ede-903b54ddb12b', 10, 10.000000000000000000000000000000, '54ff0465-5700-4eab-af30-993d382b6595', 0.000000000000000000000000000000),
('a76f46ef-150f-4409-b9e2-15a2b74ed97d', '32ef487f-8a1b-44a3-a17c-b97c3705b6e4', 1112, 12.000000000000000000000000000000, 'c6fe6ee6-2f73-4431-92c1-a24e575ade17', 0.000000000000000000000000000000),
('cf8f36e9-1315-4c52-a4cc-38868044f000', '82289148-9cfe-4ad1-acd7-3d1371c5a603', 1, 10.000000000000000000000000000000, '19941439-57ff-4ad5-b069-77377a5f642d', 0.000000000000000000000000000000),
('dca5a16f-f233-413f-b104-18d41569d33d', '230b9806-018e-4b3f-8ede-903b54ddb12b', 1, 10.000000000000000000000000000000, 'a04fd819-285b-4528-8ef3-ebe71171c665', 0.000000000000000000000000000000),
('dcd8598b-ce70-45ee-90fe-9d9134051e03', '230b9806-018e-4b3f-8ede-903b54ddb12b', 2, 10.000000000000000000000000000000, '19941439-57ff-4ad5-b069-77377a5f642d', 0.000000000000000000000000000000),
('ed992df3-1f8c-4003-b318-bac0fc998ec2', '821e5a0d-fa08-4c69-b78b-59cd810dfa6d', 1000, 10.000000000000000000000000000000, '8b563267-ab7d-464d-9894-bde12928c5df', 0.000000000000000000000000000000),
('f6cbfde1-5258-40b5-94de-faa2db0fceea', '821e5a0d-fa08-4c69-b78b-59cd810dfa6d', 100, 0.000000000000000000000000000000, '6b50a437-ff02-4d9d-8392-25cb63229d9e', 0.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Table structure for table `Item`
--

CREATE TABLE IF NOT EXISTS `Item` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` enum('pieces','grams','kilograms','liters','milliliters','meters','centimeters','inches','feet','squareMeters','squareFeet','cubicMeters','cubicFeet','dozen','pack','carton','box','roll','bundle','pair','set') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pieces',
  `price` decimal(65,30) NOT NULL,
  `openingStock` decimal(65,30) DEFAULT NULL,
  `closingStock` decimal(65,30) DEFAULT NULL,
  `purchasePrice` decimal(65,30) DEFAULT NULL,
  `taxExempted` tinyint(1) NOT NULL DEFAULT '0',
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hsnCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `cgst` decimal(65,30) DEFAULT NULL,
  `igst` decimal(65,30) DEFAULT NULL,
  `sgst` decimal(65,30) DEFAULT NULL,
  `utgst` decimal(65,30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `JournalEntry`
--

CREATE TABLE IF NOT EXISTS `JournalEntry` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entryDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Ledger`
--

CREATE TABLE IF NOT EXISTS `Ledger` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ledgerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `openingBalance` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `balance` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `userId` int NOT NULL,
  `partyId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` int NOT NULL DEFAULT '2023',
  `month` int NOT NULL DEFAULT '0',
  `ledgerType` enum('bank','cash','purchase','sales','directExpense','indirectExpense','directIncome','indirectIncome','fixedAssets','currentAssets','loansAndLiabilities','accountsReceivable','accountsPayable') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Ledger`
--

INSERT INTO `Ledger` (`id`, `ledgerName`, `openingBalance`, `balance`, `userId`, `partyId`, `year`, `month`, `ledgerType`, `createdAt`, `updatedAt`) VALUES
('1beaf5e3-7024-413c-95ea-ec07beb45a9b', 'Demo party', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 7, 'd4e61ecc-65c3-4c47-b9f6-9f1890719a90', 2024, 2, 'accountsPayable', '2024-03-21 06:40:40.002', '2024-03-21 06:40:40.002'),
('1f053138-e1e7-49e3-8c1c-c02fa89eedfb', 'ABC Supplier', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 1, '37e415ed-e8f9-42d7-8363-b9df85f8e301', 2024, 2, 'accountsPayable', '2024-03-12 11:59:25.367', '2024-03-12 11:59:25.367'),
('3ca2dada-80e5-47da-9827-ebc4ace7f40f', 'abc Eterprise', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 4, NULL, 2024, 2, 'accountsPayable', '2024-03-12 11:53:14.124', '2024-03-12 11:53:14.124'),
('51fda2dc-4fa9-4497-8c1b-40b51bd33233', 'Demo party', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 7, NULL, 2024, 2, 'accountsPayable', '2024-03-21 01:04:37.151', '2024-03-21 01:04:37.151'),
('54b280d1-1dbd-4567-890a-7d612318ba11', 'ABC Supplier 3', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 1, '876616a6-a6d5-4227-8b47-ca738c21b316', 2024, 2, 'accountsPayable', '2024-03-12 12:05:25.418', '2024-03-12 12:05:25.418'),
('788a79c9-9e5d-4130-8825-ffe03479f919', 'Party one', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 5, '620ed078-6624-49b9-80b1-48ebb970f0a7', 2024, 3, 'accountsPayable', '2024-04-18 06:52:11.969', '2024-04-18 06:52:11.969'),
('8a9cb2a5-ba7c-414a-9a7e-a59c93a9e877', 'ABC Supplier', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 28, '52eeaee8-be8b-47a3-ba99-18a87c7e8b1e', 2024, 2, 'accountsPayable', '2024-03-22 11:20:17.720', '2024-03-22 11:20:17.720'),
('b19104cb-124f-4dbb-a327-c653d44b96a7', 'Demo party', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 7, '1cd3fd56-899c-4e7c-bc1a-50e68d817889', 2024, 2, 'accountsPayable', '2024-03-21 00:56:51.080', '2024-03-21 00:56:51.080'),
('cf35b8aa-4dd5-43b0-ba04-db3e6d8d584e', 'demo party 2', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 7, NULL, 2024, 2, 'accountsPayable', '2024-03-21 01:01:44.940', '2024-03-21 01:01:44.940'),
('d3bfb5ed-1469-4449-9322-04e53e0abe4a', 'abc Eterprise', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 4, '0f845bc2-72c0-4946-a466-48e744b577ff', 2024, 2, 'accountsPayable', '2024-03-12 11:51:21.211', '2024-03-12 11:51:21.211');

-- --------------------------------------------------------

--
-- Table structure for table `Library`
--

CREATE TABLE IF NOT EXISTS `Library` (
  `id` int NOT NULL,
  `pan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_section` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ao_order` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itat_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rsa_no` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bench` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `appeal_no` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `appellant` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `respondent` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `appeal_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `appeal_filed_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_result` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tribunal_order_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assessment_year` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `judgment` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `conclusion` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `download` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `upload` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Library`
--

INSERT INTO `Library` (`id`, `pan`, `section`, `sub_section`, `subject`, `ao_order`, `itat_no`, `rsa_no`, `bench`, `appeal_no`, `appellant`, `respondent`, `appeal_type`, `appeal_filed_by`, `order_result`, `tribunal_order_date`, `assessment_year`, `judgment`, `conclusion`, `download`, `upload`, `createdAt`, `updatedAt`) VALUES
(1, '8953', 'a1', 'hb1', 'english', '4', '855', NULL, 'xyz', '3565', 'no', 'no', 'tax', 'admin', '5226', '08/07/23', '2002', 'pqr', 'none', 'yes', 'none', '2024-03-11 08:53:54.684', '2024-03-11 08:53:54.684'),
(2, '8953', 'a1', 'hb1', 'english', '4', '855', NULL, 'xyz', '3565', 'no', 'no', 'tax', 'admin', '5226', '08/07/23', '2002', 'pqr', 'none', 'yes', 'none', '2024-03-11 16:57:45.694', '2024-03-11 16:57:45.694'),
(3, '8953', 'a1', 'hb1', 'english', '4', '855', NULL, 'xyz', '3565', 'no', 'no', 'tax', 'admin', '5226', '08/07/23', '2002', 'pqr', 'none', 'yes', 'none', '2024-03-11 16:58:31.802', '2024-03-11 16:58:31.802'),
(4, '8953', 'a1', 'hb1', 'english', '4', '855', NULL, 'xyz', '3565', 'no', 'no', 'tax', 'admin', '5226', '08/07/23', '2002', 'pqr', 'none', 'yes', 'none', '2024-03-18 08:22:16.417', '2024-03-18 08:22:16.417');

-- --------------------------------------------------------

--
-- Table structure for table `Loan`
--

CREATE TABLE IF NOT EXISTS `Loan` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('personal','education','home','business','car','property') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maxAmount` decimal(65,30) DEFAULT NULL,
  `minAmount` decimal(65,30) DEFAULT NULL,
  `interest` decimal(65,30) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `LoanApplication`
--

CREATE TABLE IF NOT EXISTS `LoanApplication` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loanId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loanAmount` decimal(65,30) NOT NULL,
  `loanStatus` enum('pending','processing','review','accepted','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `applicantName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantAge` int NOT NULL,
  `loanType` enum('personal','education','home','business','car','property') COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantGender` enum('male','female','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `nationality` enum('resident','nri','foreign') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salaried` tinyint(1) NOT NULL,
  `bankAccountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permanentAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `agentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `LoanDocument`
--

CREATE TABLE IF NOT EXISTS `LoanDocument` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mandatory` tinyint(1) NOT NULL DEFAULT '0',
  `type` enum('pdf','image','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Order`
--

CREATE TABLE IF NOT EXISTS `Order` (
  `id` int NOT NULL,
  `services` json NOT NULL,
  `status` enum('initiated','pending','success','failure','usercancelled','dropped','bounced') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `price` decimal(65,30) NOT NULL,
  `gst` decimal(65,30) NOT NULL,
  `orderTotal` decimal(65,30) NOT NULL,
  `stateOfSupply` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Order`
--

INSERT INTO `Order` (`id`, `services`, `status`, `price`, `gst`, `orderTotal`, `stateOfSupply`, `userId`) VALUES
(1, '[\"378538a1-d4c2-41ec-9e4f-2b9a5b90a8bc\"]', 'initiated', 0.000000000000000000000000000000, 0.000000000000000000000000000000, 0.000000000000000000000000000000, 'Uttar Pradesh', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Otp`
--

CREATE TABLE IF NOT EXISTS `Otp` (
  `id` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `otp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Otp`
--

INSERT INTO `Otp` (`id`, `createdAt`, `otp`, `userId`, `used`) VALUES
(1, '2024-03-04 22:48:52.686', '328269', 1, 0),
(2, '2024-03-05 03:49:13.852', '576376', 2, 0),
(3, '2024-03-09 15:24:46.581', '838350', 3, 1),
(4, '2024-03-10 09:31:12.914', '925168', 4, 0),
(5, '2024-03-10 09:33:39.241', '737531', 5, 0),
(6, '2024-03-10 10:48:29.103', '678385', 4, 1),
(7, '2024-03-10 10:58:46.820', '673799', 6, 1),
(8, '2024-03-11 05:05:23.621', '874020', 7, 0),
(9, '2024-03-11 05:06:10.920', '977213', 7, 0),
(10, '2024-03-11 05:06:42.497', '421417', 7, 0),
(11, '2024-03-11 05:55:18.832', '651694', 8, 0),
(12, '2024-03-11 06:16:06.538', '984341', 8, 0),
(13, '2024-03-11 07:44:15.214', '724214', 9, 0),
(14, '2024-03-11 07:45:21.540', '269515', 9, 0),
(15, '2024-03-11 09:41:22.363', '125860', 8, 0),
(29, '2024-03-11 09:47:00.418', '884218', 10, 0),
(30, '2024-03-11 09:56:49.018', '317666', 10, 0),
(31, '2024-03-11 09:57:53.343', '964112', 10, 0),
(32, '2024-03-11 15:11:24.921', '827361', 11, 0),
(33, '2024-03-11 15:11:47.680', '662341', 11, 0),
(34, '2024-03-11 15:13:03.810', '525991', 11, 0),
(35, '2024-03-11 15:13:15.492', '661318', 11, 0),
(36, '2024-03-11 15:14:26.264', '677715', 8, 0),
(37, '2024-03-11 15:18:01.920', '118080', 11, 0),
(38, '2024-03-11 16:25:30.038', '810181', 12, 0),
(39, '2024-03-11 16:25:44.565', '455542', 12, 0),
(40, '2024-03-11 17:21:44.056', '367991', 3, 0),
(41, '2024-03-11 19:44:01.856', '736676', 3, 0),
(42, '2024-03-11 19:57:44.553', '711822', 3, 0),
(43, '2024-03-11 20:13:40.543', '819252', 3, 0),
(44, '2024-03-12 06:48:27.042', '425527', 13, 0),
(45, '2024-03-12 06:50:41.661', '464764', 14, 0),
(46, '2024-03-12 11:15:06.668', '926899', 8, 0),
(51, '2024-03-17 18:36:33.669', '410667', 3, 1),
(52, '2024-03-18 05:16:14.917', '601579', 15, 0),
(53, '2024-03-18 05:18:31.031', '247631', 15, 1),
(54, '2024-03-19 06:20:11.215', '654456', 14, 1),
(55, '2024-03-19 06:31:12.179', '405662', 7, 1),
(56, '2024-03-19 08:51:11.983', '996873', 16, 1),
(57, '2024-03-19 09:26:03.613', '281237', 17, 1),
(58, '2024-03-19 09:28:15.321', '225204', 18, 0),
(59, '2024-03-19 09:54:33.905', '325656', 19, 1),
(60, '2024-03-20 08:37:13.697', '997912', 8, 1),
(61, '2024-03-21 07:36:25.175', '382421', 20, 0),
(62, '2024-03-21 07:36:57.878', '664415', 20, 0),
(63, '2024-03-21 07:37:36.550', '802419', 20, 1),
(64, '2024-03-21 07:42:06.641', '535228', 21, 0),
(65, '2024-03-21 07:42:50.402', '578351', 21, 0),
(66, '2024-03-21 07:43:12.219', '125662', 21, 0),
(67, '2024-03-21 07:45:26.665', '307396', 22, 1),
(68, '2024-03-21 09:27:46.712', '455137', 23, 1),
(69, '2024-03-22 05:14:39.427', '489051', 24, 1),
(70, '2024-03-22 09:10:51.308', '672808', 25, 1),
(71, '2024-03-22 09:41:05.874', '987907', 26, 0),
(72, '2024-03-22 09:41:44.776', '870300', 26, 1),
(73, '2024-03-22 09:48:29.235', '630954', 27, 0),
(74, '2024-03-22 09:51:57.364', '381947', 27, 1),
(75, '2024-03-22 10:21:10.084', '345969', 28, 0),
(76, '2024-03-22 10:21:39.657', '594776', 28, 0),
(77, '2024-03-22 10:21:56.468', '104393', 28, 1),
(78, '2024-03-22 23:21:14.094', '202207', 29, 0),
(79, '2024-03-22 23:31:38.482', '963866', 30, 1),
(80, '2024-03-23 00:13:07.236', '976421', 31, 1),
(81, '2024-03-23 07:27:16.683', '152488', 32, 1),
(82, '2024-03-23 09:52:38.004', '151786', 33, 1),
(83, '2024-03-23 09:53:29.985', '869932', 33, 1),
(84, '2024-03-23 12:18:09.684', '202005', 34, 1),
(85, '2024-03-24 10:46:35.532', '563012', 9, 1),
(86, '2024-03-24 10:56:19.332', '677510', 35, 1),
(87, '2024-03-25 06:17:51.815', '483029', 5, 0),
(88, '2024-03-25 06:19:04.768', '374889', 5, 0),
(89, '2024-03-25 06:38:46.118', '762510', 36, 1),
(90, '2024-03-25 10:27:14.309', '389792', 5, 0),
(91, '2024-03-25 10:31:42.681', '104515', 5, 0),
(92, '2024-03-26 05:09:45.034', '322958', 37, 1),
(93, '2024-03-26 05:19:27.949', '528947', 8, 0),
(94, '2024-03-26 14:19:43.452', '469028', 38, 1),
(95, '2024-03-26 18:31:17.349', '442797', 39, 1),
(96, '2024-03-27 08:00:56.807', '306122', 40, 1),
(97, '2024-03-28 04:59:21.199', '583419', 41, 1),
(98, '2024-03-29 10:54:17.389', '116727', 41, 0),
(99, '2024-03-29 10:54:32.516', '693899', 41, 0),
(100, '2024-03-29 10:54:37.168', '437327', 41, 0),
(101, '2024-03-30 04:28:24.058', '301095', 41, 0),
(102, '2024-03-30 04:37:47.210', '953660', 41, 0),
(103, '2024-04-01 15:29:57.360', '539708', 42, 1),
(104, '2024-04-02 09:51:45.735', '117715', 43, 1),
(105, '2024-04-03 09:18:08.405', '342313', 44, 1),
(106, '2024-04-03 13:05:28.472', '165685', 45, 1),
(107, '2024-04-06 08:38:59.012', '743543', 3, 0),
(108, '2024-04-06 08:39:24.330', '464078', 4, 0),
(109, '2024-04-06 08:41:21.529', '944773', 41, 0),
(110, '2024-04-07 12:55:19.846', '657767', 46, 1),
(111, '2024-04-07 13:38:00.678', '922114', 47, 1),
(112, '2024-04-24 07:30:15.497', '925609', 48, 0),
(113, '2024-05-03 10:13:39.112', '264001', 49, 1),
(114, '2024-05-08 16:53:31.459', '873372', 50, 1),
(115, '2024-05-08 17:11:08.640', '835809', 51, 1),
(116, '2024-05-09 08:24:43.700', '291789', 52, 0),
(117, '2024-05-10 04:50:31.278', '958480', 14, 0),
(118, '2024-05-10 04:56:44.574', '544237', 53, 1),
(119, '2024-05-11 06:50:06.062', '193143', 54, 0),
(120, '2024-05-11 07:50:58.929', '272576', 55, 0),
(121, '2024-05-11 07:57:09.643', '544719', 56, 0),
(122, '2024-05-11 08:12:48.335', '284912', 57, 1),
(123, '2024-05-17 07:05:11.445', '864390', 58, 1),
(124, '2024-05-21 15:39:49.595', '972482', 59, 0),
(125, '2024-05-21 15:45:33.758', '699369', 59, 1),
(126, '2024-05-23 07:45:51.772', '736316', 60, 1),
(127, '2024-05-31 21:54:55.898', '347601', 61, 1),
(128, '2024-06-04 14:15:01.348', '824358', 62, 1),
(129, '2024-06-12 04:44:08.705', '614058', 63, 1),
(130, '2024-06-12 15:48:28.058', '180661', 64, 1),
(131, '2024-06-13 03:59:04.588', '752665', 65, 1),
(132, '2024-06-28 09:14:56.966', '675989', 66, 0),
(133, '2024-06-28 09:33:58.791', '381598', 1, 0),
(134, '2024-06-29 07:58:11.401', '362474', 67, 1),
(135, '2024-07-01 06:09:13.357', '637107', 68, 1),
(136, '2024-07-01 12:15:46.241', '946027', 69, 1),
(137, '2024-07-09 06:39:13.562', '546508', 70, 1);

-- --------------------------------------------------------

--
-- Table structure for table `PanAndITCodeByStatus`
--

CREATE TABLE IF NOT EXISTS `PanAndITCodeByStatus` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `incomeTaxCode` int NOT NULL,
  `panCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `PanAndITCodeByStatus`
--

INSERT INTO `PanAndITCodeByStatus` (`id`, `status`, `incomeTaxCode`, `panCode`) VALUES
('078f12dd-e7be-4a1f-bc28-8cdeef05b9af', 'HUF', 3, 'H'),
('24eb2f8e-7f6d-412f-a735-9e1c395245ef', 'Cooperative Society', 11, 'A'),
('2ea39a54-a0fc-47ba-ac2b-d4ddf68b718f', 'Company (Public )', 12, 'C'),
('2f8c4436-7930-4110-bc49-e475dd7bb9e4', 'A.O.P.', 7, 'A'),
('33feae33-c645-4fa5-aabb-0604da13cf1e', 'Artificial Juridical', 10, 'J'),
('3b8287d2-c86e-47d2-8427-543a4f6b8615', 'Body of Individuals', 9, 'B'),
('4bf02b08-95b1-46fa-b7cd-64156bc64155', 'A.O.P. Trust', 8, 'T'),
('6f436501-b22b-4f83-9d5d-ac29cfb678cb', 'Firm', 5, 'F'),
('98c575f4-fda7-4531-9607-9025ed0d954c', 'Local Authority', 16, 'L'),
('a585453b-2545-4cd2-b922-c6c0f5a0465a', 'Company ( Govt. )', 12, 'C'),
('aec88c89-a31c-4462-abae-1fc11853832d', 'Individual', 1, 'P'),
('e3f64e4c-cad8-4cc0-85a1-d57fc7be7bde', 'Company (Private )', 13, 'C');

-- --------------------------------------------------------

--
-- Table structure for table `PanAndITCodeByStatusList`
--

CREATE TABLE IF NOT EXISTS `PanAndITCodeByStatusList` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financialYear` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `PanAndITCodeByStatusList`
--

INSERT INTO `PanAndITCodeByStatusList` (`id`, `financialYear`) VALUES
('b87f420a-c4a7-4323-8e94-1422a0fe17bc', '2022');

-- --------------------------------------------------------

--
-- Table structure for table `Party`
--

CREATE TABLE IF NOT EXISTS `Party` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `partyName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('customer','supplier') COLLATE utf8mb4_unicode_ci NOT NULL,
  `gstin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `upi` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankAccountNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankIfsc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankBranch` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Table structure for table `Payment`
--

CREATE TABLE IF NOT EXISTS `Payment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `razorpay_order_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `razorpay_payment_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('created','success','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'created',
  `userId` int NOT NULL,
  `orderId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Post`
--

CREATE TABLE IF NOT EXISTS `Post` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `contentDescription` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentHeading` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Post`
--

INSERT INTO `Post` (`id`, `userId`, `title`, `category`, `imageUrl`, `createdAt`, `updatedAt`, `contentDescription`, `contentHeading`) VALUES
('0f9f357e-02ae-432a-9abf-1f85dfd1e90a', 1, 'hello', 'companylaw', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715322824/dashboard/users/sarthakapoor2152%40gmail.com/posts/architecture_1715322821413.png', '2024-05-10 06:33:43.504', '2024-05-10 06:33:43.504', 'Dummy blog', 'dummy'),
('1c1ae85c-94d4-4640-87e1-1d434f04a7b6', 1, 'Blog 4', 'account&audit', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715334527/dashboard/users/sarthakapoor2152%40gmail.com/posts/jim-fang-LyTgU_Vh-Po-unsplash_1715334523452.jpg', '2024-05-10 09:48:47.008', '2024-05-10 09:48:47.008', 'FILE YOUR ITR', 'This is fourth blog '),
('66cc4db1-9a3a-4206-bed0-1b88eb6c74cb', 1, 'demo 3', 'companylaw', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715330857/dashboard/users/sarthakapoor2152%40gmail.com/posts/kilarov-zaneit-Hxs6EAdI2Q8-unsplash_1715330853650.jpg', '2024-05-10 08:47:36.878', '2024-05-10 08:47:36.878', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, consequuntur molestiae illum corrupti quasi cupiditate sequi corporis impedit amet voluptatum earum dicta tempore culpa adipisci porro, enim officia quibusdam ut.\r\nLorem ipsum dolor sit amet consectetur adipisicing elit. Esse, consequuntur molestiae illum corrupti quasi cupiditate sequi corporis impedit amet voluptatum earum dicta tempore culpa adipisci porro, enim officia quibusdam ut.\r\nLorem ipsum dolor sit amet consectetur adipisicing elit. Esse, consequuntur molestiae illum corrupti quasi cupiditate sequi corporis impedit amet voluptatum earum dicta tempore culpa adipisci porro, enim officia quibusdam ut.\r\nLorem ipsum dolor sit amet consectetur adipisicing elit. Esse, consequuntur molestiae illum corrupti quasi cupiditate sequi corporis impedit amet voluptatum earum dicta tempore culpa adipisci porro, enim officia quibusdam ut.\r\nLorem ipsum dolor sit amet consectetur adipisicing elit. Esse, consequuntur molestiae illum corrupti quasi cupiditate sequi corporis impedit amet voluptatum earum dicta tempore culpa adipisci porro, enim officia quibusdam ut.\r\nLorem ipsum dolor sit amet consectetur adipisicing elit. Esse, consequuntur molestiae illum corrupti quasi cupiditate sequi corporis impedit amet voluptatum earum dicta tempore culpa adipisci porro, enim officia quibusdam ut.\r\nLorem ipsum dolor sit amet consectetur adipisicing elit. Esse, consequuntur molestiae illum corrupti quasi cupiditate sequi corporis impedit amet voluptatum earum dicta tempore culpa adipisci porro, enim officia quibusdam ut.', 'Third Blog'),
('e232e295-e370-4e7b-a127-39c07437c3af', 1, 'Lorem Ipsum', 'companylaw', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715323966/dashboard/users/sarthakapoor2152%40gmail.com/posts/architecture_1715323963784.png', '2024-05-10 06:52:45.373', '2024-05-10 06:52:45.373', ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo veniam dolor blanditiis assumenda impedit odio quaerat architecto doloribus amet nesciunt dolorem dolorum aspernatur consequatur ratione eligendi cum placeat, ex fuga error exercitationem ipsum dolores culpa et. Quae repellat beatae, ratione ea adipisci porro, architecto qui fuga, asperiores officiis perspiciatis mollitia!\r\n\r\n Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo veniam dolor blanditiis assumenda impedit odio quaerat architecto doloribus amet nesciunt dolorem dolorum aspernatur consequatur ratione eligendi cum placeat, ex fuga error exercitationem ipsum dolores culpa et. Quae repellat beatae, ratione ea adipisci porro, architecto qui fuga, asperiores officiis perspiciatis mollitia!\r\n\r\n Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo veniam dolor blanditiis assumenda impedit odio quaerat architecto doloribus amet nesciunt dolorem dolorum aspernatur consequatur ratione eligendi cum placeat, ex fuga error exercitationem ipsum dolores culpa et. Quae repellat beatae, ratione ea adipisci porro, architecto qui fuga, asperiores officiis perspiciatis mollitia!', ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?');

-- --------------------------------------------------------

--
-- Table structure for table `RegisterServices`
--

CREATE TABLE IF NOT EXISTS `RegisterServices` (
  `id` int NOT NULL,
  `serviceId` int NOT NULL,
  `userId` int NOT NULL,
  `aadhaarCard` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `panCard` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gstCertificate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RegisterStartup`
--

CREATE TABLE IF NOT EXISTS `RegisterStartup` (
  `id` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `categories` enum('registration','companyRegistration','returns','audits') COLLATE utf8mb4_unicode_ci NOT NULL,
  `aboutService` longtext COLLATE utf8mb4_unicode_ci,
  `priceWithGst` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `RegisterStartup`
--

INSERT INTO `RegisterStartup` (`id`, `title`, `image`, `userId`, `categories`, `aboutService`, `priceWithGst`) VALUES
(1, 'Title', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715231378/dashboard/users/mukulbedi%40yahoo.com/register/1/Screenshot%20%282009%29_1715231376834.png', 4, 'companyRegistration', NULL, NULL),
(2, 'PF Registration', '/images/PF-Registration.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(3, 'FSSAI (Food License)', '/images/fssai.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(4, 'DSC (Digital Signature Certification)', '/images/dsc.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(5, 'Station8/NGO Registration', '/images/MSME.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(6, 'Nidhi Company', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(7, 'ESI Registration', '/images/ESIRegistration.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(8, 'Partnership Registration', '/images/partners.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(9, 'MSME Registration', '/images/MSME.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(10, 'License Registration', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(11, 'ISO Registration', '/images/iso.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(12, 'Professional Tax Registration', '/images/professionalTax.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(13, 'Ration Card', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(14, 'Trust Registration', '/images/MSME.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(15, 'Trademark Reply', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(16, 'Fire License Registration', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(17, 'IE License Partnership', '/images/MSME.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(18, 'Trade Mark Renewal', '/images/tradeMarkRenewal.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(19, 'Shop Act Registration', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(20, 'News Paper Registration', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(21, 'PF Monthly Return', '/logo.svg', 4, 'returns', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(22, 'Registered Office Change', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(23, 'Corporation License', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(24, 'Company Registration', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(25, 'Copy Right Registration', '/images/copyrightRegistration.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(26, 'OPC Registration', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(27, 'Association Formation', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(28, 'Copyright Reply', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(29, 'TDS Return Filing', '/logo.svg', 4, 'returns', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(30, 'GST Registration', '/images/gst.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(31, 'TAN Registration', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(32, 'Advertisement Agency', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(33, 'Audit 44AD', '/logo.svg', 4, 'audits', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(34, 'LLP Registration', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(35, 'Share Allotment', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(36, 'ESI Monthly Return', '/logo.svg', 4, 'returns', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(37, 'GST Return', '/logo.svg', 4, 'returns', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(38, 'Audit 44AE', '/logo.svg', 4, 'audits', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(39, 'Accounting', '/images/accounting.webp', 4, 'audits', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(40, 'Audit 44ADA', '/logo.svg', 4, 'audits', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999);

-- --------------------------------------------------------

--
-- Table structure for table `Service`
--

CREATE TABLE IF NOT EXISTS `Service` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serviceName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serviceType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imgUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(65,30) NOT NULL,
  `gst` decimal(65,30) NOT NULL,
  `documents` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Service`
--

INSERT INTO `Service` (`id`, `serviceName`, `serviceType`, `imgUrl`, `description`, `price`, `gst`, `documents`, `createdAt`, `updatedAt`) VALUES
('b846b774-57ff-4bfe-a29f-d052dcf48df5', 'Service 1', 'Type 1', 'https://example.com/image.jpg', 'Service description', 100.000000000000000000000000000000, 18.000000000000000000000000000000, '[\"document1.pdf\", \"document2.pdf\"]', '2024-04-09 04:57:12.878', '2024-04-09 04:57:12.878');

-- --------------------------------------------------------

--
-- Table structure for table `Subscriptions`
--

CREATE TABLE IF NOT EXISTS `Subscriptions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `amountForServices` double NOT NULL,
  `txnid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subscriptionDuration` enum('monthly','quarterly','halfYealy','yearly') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'monthly',
  `status` enum('initiated','pending','success','failure','usercancelled','dropped','bounced') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Transaction`
--

CREATE TABLE IF NOT EXISTS `Transaction` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ledgerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `journalEntryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(65,30) NOT NULL,
  `transactionType` enum('credit','debit') COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UploadedDocument`
--

CREATE TABLE IF NOT EXISTS `UploadedDocument` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `fileName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicationId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `id` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fatherName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aadhaar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` datetime(3) DEFAULT NULL,
  `adminId` int DEFAULT NULL,
  `superadminId` int DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `userType` enum('admin','normal','agent','superadmin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middleName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- --------------------------------------------------------

--
-- Table structure for table `Visitor`
--

CREATE TABLE IF NOT EXISTS `Visitor` (
  `id` int NOT NULL,
  `count` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Visitor`
--

INSERT INTO `Visitor` (`id`, `count`, `createdAt`) VALUES
(1, 7114, '2024-03-09 15:27:21.486');

-- --------------------------------------------------------

--
-- Table structure for table `_AccountToInvoice`
--

CREATE TABLE IF NOT EXISTS `_AccountToInvoice` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_ApiServiceToCart`
--

CREATE TABLE IF NOT EXISTS `_ApiServiceToCart` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_ApiServiceToCart`
--

INSERT INTO `_ApiServiceToCart` (`A`, `B`) VALUES
('686ee1e0-0dc9-449c-a713-a7cb272683fd', '5d685df7-862e-417a-a5e2-84a0a3355fc1'),
('fb3edbe4-4399-4620-8dc3-441aa0f5d08d', '5d685df7-862e-417a-a5e2-84a0a3355fc1'),
('3cf0c11c-388f-4f57-adc9-1b9f9b8abdec', '64a281ae-d940-471a-9742-f2b00ac1baa9'),
('48fb0030-c4e3-44be-97d7-996cdc5335e6', '64a281ae-d940-471a-9742-f2b00ac1baa9'),
('0a224919-3d13-4ed7-8195-a71aadf81fa2', 'd59df81e-b649-4c6d-80b7-6434483debb9'),
('0a224919-3d13-4ed7-8195-a71aadf81fa2', 'dcad5f00-5446-4053-976b-0c457808d5e1'),
('0cdc09af-e2e5-4124-b540-0f0605b410c8', 'dcad5f00-5446-4053-976b-0c457808d5e1'),
('cab810b8-14bd-4982-bc05-38add0dc7c06', 'fc7f0b1a-dd3e-4b01-a655-97b03d215a56'),
('0c21273b-1bb3-48e8-910d-c589f66eef7f', 'fedcf1b2-1677-4aba-9856-87414a9242f3');

-- --------------------------------------------------------

--
-- Table structure for table `_ApiServiceToSubscriptions`
--

CREATE TABLE IF NOT EXISTS `_ApiServiceToSubscriptions` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_CartToRegisterServices`
--

CREATE TABLE IF NOT EXISTS `_CartToRegisterServices` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_CostInflationIndexToCostInflationList`
--

CREATE TABLE IF NOT EXISTS `_CostInflationIndexToCostInflationList` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_CostInflationIndexToCostInflationList`
--

INSERT INTO `_CostInflationIndexToCostInflationList` (`A`, `B`) VALUES
('0167d91a-88e3-4fcc-a661-5aa7f8c48500', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('060322d0-0116-4fea-90a8-e764678c0710', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('0c7c979e-9b1c-4dbc-bd30-11288beb42d4', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('13f9da31-2466-485a-bcda-04a0a9f56054', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('1da0d047-abc8-4067-8ea2-e8704930b385', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('21604b91-0d86-492f-9282-19b0655b1065', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('3ace19a6-ef85-4f14-8706-a69a30fcd472', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('465cb00d-5cb0-42c9-a879-06de5eea39e3', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('67356061-6d08-40c9-a166-0eb849c7e250', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('728ff220-1e3b-4936-8d86-43cb86db89f8', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('8f63b9b1-6ef9-427a-b497-c0b823a50c73', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('a0704520-4597-43ff-86c6-bb4d29867583', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('c43947f0-fc42-47ba-b8db-13e2e459bffd', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('c6210a55-75c0-47d8-a678-7ef4a60fddc5', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('c75d89fb-624f-470e-8d91-90581b88a8e8', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('d1539814-cd0f-47ad-a444-72beb7bb7a25', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('d50c8c78-f532-4a76-aa12-c4fbebd6f50b', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('eca6cd91-b77f-4e31-b1a5-b5b64777107c', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('f4093b49-66b5-4d3d-8273-fa4f082518dc', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('f459b360-b5af-4cfc-a38c-0eadf50b275b', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('f8ba70b1-ad4e-480a-8331-0171e81df433', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('ffea469a-b363-455e-89b1-78cd17da4edb', 'a03bd783-8482-41f2-8751-ec0150a8c8ec'),
('10c05143-3570-41b8-bd94-898dfc07d7fc', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('203e5541-b3f8-47a5-a3e3-ee7688300657', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('22ea2a0f-054a-4e72-a663-85b7dd899bbc', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('250a083c-a3e3-4abf-b9c8-0b2d9e2dacb5', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('2dc39cae-abe4-42d2-b1bc-341b6280921d', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('38a36340-c795-47f6-adc5-6a70e5103625', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('4f216d57-4835-4dd1-9b06-81bff0f636ec', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('58d8b05c-74b3-4b3d-ae4c-8c54bef10ddd', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('668565ff-f5d2-41ff-b8b3-3744b22ae5d4', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('68cc7425-825e-4e96-8b30-3e7842e6aac9', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('71b57c9b-2956-449b-87c2-e0f0d5a48094', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('799cd469-0b19-4165-be45-d19d00e7a82a', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('8cdac848-8615-46c3-8fb0-11591df470ec', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('8eb76440-24a5-4b42-a8b9-27bc5bfe6243', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('913807e8-2402-4a82-a769-800f1a3fc589', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('a410427b-457d-496d-bed3-ff4f6646fcab', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('b009c134-9680-441b-90dc-84d93d522567', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('bc850c29-3e0d-4f8b-82f4-2c74782e1091', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('c5d18b7b-bee8-45cd-bac1-d44c72301355', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('c9aec1b9-7bde-4a97-a5f8-13cbfa0e5c74', 'f7c72362-5ea2-46e1-a66d-c369742375f5'),
('f1ee6a02-ece9-4d72-977f-77064b44510c', 'f7c72362-5ea2-46e1-a66d-c369742375f5');

-- --------------------------------------------------------

--
-- Table structure for table `_CountryCodeToCountryCodeList`
--

CREATE TABLE IF NOT EXISTS `_CountryCodeToCountryCodeList` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_CountryCodeToCountryCodeList`
--

INSERT INTO `_CountryCodeToCountryCodeList` (`A`, `B`) VALUES
('0453a55c-75d2-4996-8ba3-58229367a08f', '039ef7f6-8737-454b-a253-53c7b918f873'),
('055fa788-5c5a-4d6a-bd3e-7ce823781d01', '039ef7f6-8737-454b-a253-53c7b918f873'),
('08538a5e-b048-4c61-ae09-1e424941025a', '039ef7f6-8737-454b-a253-53c7b918f873'),
('0a6fa782-5cd5-4efb-8311-bd0ea0d9c5b9', '039ef7f6-8737-454b-a253-53c7b918f873'),
('0d5baf6c-9589-4471-8eea-df87139130ab', '039ef7f6-8737-454b-a253-53c7b918f873'),
('1623c3ef-b9cd-47ab-9a34-1583bc22ed83', '039ef7f6-8737-454b-a253-53c7b918f873'),
('26796950-7e40-4713-9fe2-835ade494455', '039ef7f6-8737-454b-a253-53c7b918f873'),
('26aa0f92-278f-4fd2-8e77-2ff5e4f4c385', '039ef7f6-8737-454b-a253-53c7b918f873'),
('27f267ec-aead-4ce8-9c4d-5ea920aa75f6', '039ef7f6-8737-454b-a253-53c7b918f873'),
('2e2f52a4-05d7-44ad-a34a-5ec388e597ee', '039ef7f6-8737-454b-a253-53c7b918f873'),
('2fed6483-b80d-4c52-a3ad-d6917a6c2c1a', '039ef7f6-8737-454b-a253-53c7b918f873'),
('37fc4d73-7002-4d31-b562-321912fd1e46', '039ef7f6-8737-454b-a253-53c7b918f873'),
('586920cf-f603-4e36-b10b-21c0e29e435b', '039ef7f6-8737-454b-a253-53c7b918f873'),
('5b98633f-e7cd-4a73-98ce-b985e40b9ba5', '039ef7f6-8737-454b-a253-53c7b918f873'),
('5c4aa290-2d25-4cc3-b406-e4a8b1fbb82d', '039ef7f6-8737-454b-a253-53c7b918f873'),
('5cd81859-0590-407e-bc0d-159ef787092c', '039ef7f6-8737-454b-a253-53c7b918f873'),
('68fc0013-a825-4f09-9ac1-1324041a70d5', '039ef7f6-8737-454b-a253-53c7b918f873'),
('6c46e3f7-ece1-4964-b677-cb33d22ade55', '039ef7f6-8737-454b-a253-53c7b918f873'),
('72a82da6-5321-48e3-9a0c-89c31734f2cf', '039ef7f6-8737-454b-a253-53c7b918f873'),
('7b772833-c2ca-4d51-8a35-505e4329b61d', '039ef7f6-8737-454b-a253-53c7b918f873'),
('7d290878-2eb3-423c-b9dd-15ecf81fe35f', '039ef7f6-8737-454b-a253-53c7b918f873'),
('8148473b-02dc-4fb6-aaf3-c30044fd9d70', '039ef7f6-8737-454b-a253-53c7b918f873'),
('895fec7e-ad4d-4912-a10f-9bcc9dc42cba', '039ef7f6-8737-454b-a253-53c7b918f873'),
('8a85ce7a-7378-48e9-a70b-789f7035d067', '039ef7f6-8737-454b-a253-53c7b918f873'),
('9f09b8d3-eb94-4eec-84e7-c38c2c328a4a', '039ef7f6-8737-454b-a253-53c7b918f873'),
('9fdfbfd9-36ce-41a5-90d3-fc4aaaac2e3b', '039ef7f6-8737-454b-a253-53c7b918f873'),
('a45415b3-54c0-47e2-b4c5-f2e5fd483251', '039ef7f6-8737-454b-a253-53c7b918f873'),
('bbb789a0-b83b-4d1c-92b1-cff47464a6f6', '039ef7f6-8737-454b-a253-53c7b918f873'),
('bec92330-a287-4aa6-8883-c41aa6517dec', '039ef7f6-8737-454b-a253-53c7b918f873'),
('c0669779-5867-4251-8d0e-5267f0764c77', '039ef7f6-8737-454b-a253-53c7b918f873'),
('c13e0639-e79c-483a-83fd-e92f3a026925', '039ef7f6-8737-454b-a253-53c7b918f873'),
('c2ee07ac-42e9-4b01-830f-c8d7b81e0c37', '039ef7f6-8737-454b-a253-53c7b918f873'),
('c95ecd4f-1b6f-4cce-8f8f-d65e8e3b9827', '039ef7f6-8737-454b-a253-53c7b918f873'),
('c96e3059-cb48-4756-a135-cbfe65a2d71e', '039ef7f6-8737-454b-a253-53c7b918f873'),
('db1676af-e1e5-4e5e-a458-74361dc9f7e7', '039ef7f6-8737-454b-a253-53c7b918f873'),
('e24ade08-ee1f-4448-b891-b776a90d4344', '039ef7f6-8737-454b-a253-53c7b918f873'),
('e30db4c2-426a-4cc2-8d9d-da06acd665d0', '039ef7f6-8737-454b-a253-53c7b918f873'),
('e35ff989-9f1a-4de2-ad07-a7c21201e92e', '039ef7f6-8737-454b-a253-53c7b918f873'),
('e79d9aa4-c214-47cc-9c55-fca906f99bab', '039ef7f6-8737-454b-a253-53c7b918f873'),
('e8d09529-e1de-4ee9-8b50-844ed8b7a1c3', '039ef7f6-8737-454b-a253-53c7b918f873'),
('eb7933ef-b8b4-479a-a3e0-1214a01d418b', '039ef7f6-8737-454b-a253-53c7b918f873'),
('ee1ef63f-5dfd-4fb4-b10b-8aa131c31a83', '039ef7f6-8737-454b-a253-53c7b918f873'),
('eee81ffe-ba7c-4f82-85b9-cf156654f88e', '039ef7f6-8737-454b-a253-53c7b918f873'),
('f1046608-4544-450b-b5ee-4dfbdbdf6787', '039ef7f6-8737-454b-a253-53c7b918f873'),
('f7a9d38b-7987-4447-b4d7-18ad22b9c0fd', '039ef7f6-8737-454b-a253-53c7b918f873'),
('fc3a05a2-207b-48e4-92af-2425161effe4', '039ef7f6-8737-454b-a253-53c7b918f873'),
('02cb3e87-23fd-4d0f-b718-1077112713e3', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('038a8e22-7403-407c-ad21-734f2b481828', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('0461c10e-fad1-4154-a94e-a00888cac86c', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('08481cb6-e2c1-4223-ab43-a58e4f07bfbd', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('0a7b70a2-ce6a-4934-810a-26f07625ad96', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('0a9224a3-a3ef-47a3-80b2-2b14bf5ecb41', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('0e9f6549-b7bb-4117-bbc7-75eb1aa88619', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('12855bd8-8393-450f-bd60-0f55f95e175d', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('12ff945e-7fb4-41bd-a89d-69ce6900209d', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('1a5b20b9-dcb7-4be3-a80a-806cfce68469', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('1bbb757b-ed9e-41cb-8e26-36f1c2d175b5', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('1c768331-36fc-4d2c-ab78-685abafb8783', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('20b9a4a8-3da9-4cbf-a0db-344b1acd5ada', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('2512432f-0a35-4a26-91ce-8c8056157bdf', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('2524ce58-fdee-481d-a06c-f8e7fb85f0aa', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('2628bc15-6d20-4e4e-8b6b-ca188fea401c', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('28276bcd-26e4-4e98-9bcc-112e99ecc859', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('28b114ee-72a7-44d5-b0f2-cc46497e16ca', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('2e9d380d-a8cc-4b81-baed-2ea0a54dd772', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('32b325ca-3cae-4810-8569-5726a4d61896', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('333528b0-0b7e-4766-a2c2-50d4996f9ed7', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('35c4cdd6-b052-4f57-b180-961ed69a70ab', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('35d85ec9-610f-42d1-b011-a725492daf69', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('36606d07-53d4-488a-88ff-b48a0502adbf', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('382ba4b8-6e8f-4783-97b7-1944a897ed62', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('383c5499-4827-4259-9cce-d91962ca75b4', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('387a7357-407a-4346-b5f2-c6bd92304b30', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('3b12121d-76db-44df-83ed-07e56105e394', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('3b41e890-c5db-4b80-9212-97fa450f3e91', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('3ef3e6a7-fb7e-4198-a3ba-9b80aae52946', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('3f0ffcdd-0270-4e23-967d-a80b874d17fc', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('403f02a2-6665-41cf-b4a9-06a6db283c4f', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('4615ae7e-5e18-4e44-8df7-74a113cea32d', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('46f2aa3a-0a71-43ea-8aa5-26d123a00d31', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('4734a5e5-9495-42e5-8ce8-86b7ee590f03', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('479b3bb7-9628-4855-a926-527b22d08952', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('4a3f41e1-ac85-4247-bc0d-4f754c739a1a', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('4e189b20-9890-4850-9da9-f793b91d85fb', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('4ea76972-11d0-43f4-8a0a-8b72b3c958db', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('4fda1daf-644c-4017-985c-7072aa869251', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('551ffc7d-1413-405c-9a16-ff0599b76a6e', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('576de0e3-edac-4a05-b2ab-63ec36cb7ee1', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('63fc388c-ec3d-4d7c-83cd-2180d301135d', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('65aeefdb-b361-44ef-94be-60356eaf0041', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('66603a2a-e7ec-446f-be70-312ca3a294cc', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('6a0338d0-ae4b-4b4c-96c3-b937a49aa6fd', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('6d1def20-6a38-4b88-8bab-c3cc78ed022b', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('74008bfe-19ed-4f6d-b8e7-bc989939a334', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('772f8b57-681b-4049-ad2f-5a698e0eae62', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('7831357d-ec21-431e-8ac7-86ef795560f9', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('78ddfd07-d7a9-47c3-a108-5240404c1ed1', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('79c92ef7-a209-47da-ab9a-3b0d70d9f2f8', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('7b99c32b-491e-498a-b812-73e5765f7d1f', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('823f6b4f-3fc3-4833-91d3-59661f1b2db7', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('8371d0be-b3ed-49d2-bc94-50e6dfec42c7', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('84535a16-0a57-4c99-a4f6-f0e2a0a5fb5e', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('87114f74-9008-4623-88ef-c60cabeabfbc', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('87b4e81f-9bf6-48e7-b44d-26d6ec8d2764', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('88bfa545-dfb9-4c3c-9dae-ce958634587b', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('891fd611-2633-4e3f-bf61-e76e3eb785cc', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('8a1d6b09-b8a4-4844-959e-4c3664e17cd0', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('8ab6de17-bec8-4f35-a6fb-b39918fb4c64', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('8c8e0c71-08d3-43c6-9db6-52071248e73c', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('8fee0caf-67e3-4a05-aefd-472d9d6bf377', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('91375557-1e87-4db3-be3c-65be128c5e12', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('9207776b-5d0a-4c74-a7ab-fdd16a3176ec', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('9277259b-26fa-4d3e-9e4c-02e9f34c5b82', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('9424c249-827c-4532-b631-34fae8a96d9a', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('94b9c7b1-ea39-41e2-87c7-6546eea29754', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('9b2dfd80-192a-45bc-baab-c9f378b05139', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('9fb0cccc-5e69-41a9-92a8-d2e0c66ed3b4', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('a19da766-f1ca-409d-b855-00b8499f4975', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('a60dc649-77dc-4edf-a025-4a6221b88da3', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('a8c16521-c3e7-4e12-a94f-e2715596c8c3', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('ab0233da-5c1d-405b-a55b-f0f8a2f89e75', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('afb9f398-7f50-405e-b72c-80178104caaa', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('b07a0c6c-ef32-4ac8-a695-e52535ec25a9', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('b1a10db2-ad9f-4a08-b42f-bd5c5fe5146e', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('b7dcb303-6629-47d8-aac1-006b9965a5c4', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('b883c8f0-8fb6-4c65-ba67-2facdd45f013', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('bbd6f270-bc72-4273-bee7-1df2aa20fb8a', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('bd7ebf44-16c7-4b8e-bb04-2d3e96dbe2a0', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('c21e3bef-8a8f-4127-a0b1-7c3d59852208', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('c2df740d-2608-49d6-b02b-9c73e95c1820', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('c3bf88a1-576c-4b62-a3f1-65bbf0af4edb', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('c7227ab0-7e8d-44bd-a5f1-6ef3f98760c2', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('ca4f9708-03c4-4ef2-83f9-cb006d238f10', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('cc5031b1-2146-4f5d-88ef-d84d4b15fb48', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('cff3a1c9-c613-4597-9752-ae39622f2882', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('d5d679e6-c8fa-482d-a59f-931fc542b577', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('d76d4f66-c360-431b-bd92-9d02a14c4fe0', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('d841b4da-f63e-4a0b-b057-456282c975ca', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('d91dbdc9-07bc-413c-9fdd-a9e53abbdb9c', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('d9fc8d12-de74-4411-99bc-7780bee792a9', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('dabad4f8-c53a-4c69-b8cb-9db0d6a19089', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('dc398783-ce6a-4e5c-9dd2-ac22864df47d', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('ddefd5c5-6c38-435e-8b8c-cb2551100caa', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('e0161ff6-2691-406e-ab76-f41c2e7e5dd6', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('e045527d-6735-4421-94af-419fc4a0dc19', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('e0f0dbe7-5f6c-44d8-89e1-2fb27028fc35', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('e215e4d5-e6de-4dbf-ad6c-f5b054ccca6b', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('e31a9373-f9aa-4b82-98e4-23bb425c946c', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('e4405ba3-6bbb-4c35-bff4-5f3c1c17e54b', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('e93ae52d-f5de-4d88-98ff-7d6c88e9fe46', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('eb8da0b6-46ec-42ff-92c8-22c936facc22', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('f1953581-c261-450c-bd5b-1a4c13dd50dc', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('f1f81781-494c-486e-bf13-74abf4a00a62', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('f2f1a40f-35fb-4091-8eeb-bb8adcc2675f', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('f329075a-31af-49ad-b7c9-e1ecdaf0f38d', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('f3dd8a80-12c2-4eae-90e7-a18cd37a8510', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('f4bd4a90-0332-466b-9719-91057445366d', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('f4cbe735-7419-4d95-9fd9-a56ee1febbd4', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('f92c848c-690e-4113-9c4f-a0184cc6cf9b', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2'),
('fd2bab9f-d247-4b67-92bf-f62002ec8ab4', 'f0e308d2-e133-4e92-b1e0-0429a27edbd2');

-- --------------------------------------------------------

--
-- Table structure for table `_InterestAccruedonNationalToInterestAccruedonNationalList`
--

CREATE TABLE IF NOT EXISTS `_InterestAccruedonNationalToInterestAccruedonNationalList` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_InterestAccruedonNationalToInterestAccruedonNationalList`
--

INSERT INTO `_InterestAccruedonNationalToInterestAccruedonNationalList` (`A`, `B`) VALUES
('032b7d85-236c-4483-9fd3-b8c2cd411d07', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('085db67f-d82e-4586-a7b2-04f93530a7ce', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('0f2fa7e5-4330-4aa7-ad97-908c96d45684', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('0f81b946-e7f7-4ea6-8dd4-1d0f64e2885a', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('44fdaf0b-8384-476d-a15c-441c2b0ff799', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('46f109fd-8f08-4e56-a65f-5c56ff0f848c', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('5abcac49-36a2-4d1e-a2ce-13785f238f19', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('608598a7-b665-40e0-b050-84e13d28044c', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('695f8e8c-fc4d-45d1-b956-543b99e5cf10', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('7b027902-2fa0-4871-a774-8dfd156772f2', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('7f8d704e-889d-4a7b-9c35-2fc54a8df043', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('842d09ab-614f-434d-a4ae-6d311c8cc00e', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('85368e06-28b2-4fc0-a6ff-681721cb56e2', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('8e0786d3-2181-4fb6-96b1-e64c144e3fdb', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('baeb0f94-f9ac-4c1c-8494-1325480e42d2', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('d856d3c0-4c71-459e-8ed9-0d05264c576f', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('f51b8f94-455e-460f-89ee-b09c05a5aeed', '475d0260-ab8b-4d5f-8175-33b31e059da7'),
('82fb0629-a475-4995-a433-565d377b56a1', '976f34b2-1d83-4e58-99f3-b292680e7990'),
('ebddb62d-2a73-4284-b7eb-820314d16311', '976f34b2-1d83-4e58-99f3-b292680e7990'),
('7814a29a-e10e-48d7-916c-399da4940470', 'aba77428-6841-4f60-984e-615c326a1c5b'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'aba77428-6841-4f60-984e-615c326a1c5b'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', 'aba77428-6841-4f60-984e-615c326a1c5b'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('236a5d9e-755b-4733-ac9f-a78f57818a2d', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('40af90f5-bb4e-4842-8361-33b6b8501956', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('48bcbbca-0beb-4301-a6f3-ef5ad981d728', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('53f5aad6-75ed-4841-9788-e27b28622191', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('59aebd05-4b61-426c-bcab-65c884e5c5ae', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('784b80e2-31c6-43aa-88b4-69dbec1887a6', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('934d87e9-c30d-47e5-8cdd-f9990c37302c', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('c9723f2f-49a0-4e13-b801-ddbb0af5602f', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', 'e97befbe-99d5-4e87-b24b-ff74cca3bfbb');

-- --------------------------------------------------------

--
-- Table structure for table `_InterestAccruedonNationalToInterestRatesAccrued`
--

CREATE TABLE IF NOT EXISTS `_InterestAccruedonNationalToInterestRatesAccrued` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_InterestAccruedonNationalToInterestRatesAccrued`
--

INSERT INTO `_InterestAccruedonNationalToInterestRatesAccrued` (`A`, `B`) VALUES
('695f8e8c-fc4d-45d1-b956-543b99e5cf10', '019247bb-4786-4dbb-b298-0d49073f684b'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', '0457d6da-9171-464a-ab9c-a8f20b809c00'),
('5abcac49-36a2-4d1e-a2ce-13785f238f19', '04d788ca-ed36-4904-bff9-3524e3294216'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', '055d4b14-6f02-4f45-8f45-bac09275a679'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', '098a0702-5291-492d-a4eb-2e5caddf9ad4'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', '099dc627-8e5f-4295-be35-f0c85aeeceee'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', '0a106c47-8ef9-45c0-91f7-ccc7fa976373'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', '0ce76c75-9adc-4222-aac8-8fe08e7ce59f'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', '0df41116-044e-4bab-aec9-251a5d3a09de'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', '0e75c78c-5278-4180-90d3-6f7b95718383'),
('f51b8f94-455e-460f-89ee-b09c05a5aeed', '0f027e7e-feba-4201-ae2f-e87d19b155d2'),
('7b027902-2fa0-4871-a774-8dfd156772f2', '0ffbafae-6e6a-41c8-9454-3cae53c8ba91'),
('ebddb62d-2a73-4284-b7eb-820314d16311', '1187712c-4835-42f1-8cd8-f42a6c6b15f7'),
('934d87e9-c30d-47e5-8cdd-f9990c37302c', '14d97795-801f-49b8-a7bc-4bfeb1f67ae0'),
('46f109fd-8f08-4e56-a65f-5c56ff0f848c', '15cb87c9-5e88-4505-bf60-9a805e47d1fb'),
('85368e06-28b2-4fc0-a6ff-681721cb56e2', '16e16f7f-1f9b-4dd6-909e-5eae11d5ba55'),
('934d87e9-c30d-47e5-8cdd-f9990c37302c', '17dcf8b1-f199-4f37-b6eb-33f6e4e8f810'),
('7b027902-2fa0-4871-a774-8dfd156772f2', '18655821-dc47-42f9-9b94-2962c20ceb42'),
('44fdaf0b-8384-476d-a15c-441c2b0ff799', '1b912d48-6158-419a-b75f-ce46edc08aa4'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', '1c29145f-6437-4e12-b206-16bf47a7ee03'),
('085db67f-d82e-4586-a7b2-04f93530a7ce', '1c2d5529-1b1c-477d-94a9-5fc2c5070166'),
('44fdaf0b-8384-476d-a15c-441c2b0ff799', '1cf6b1ef-42e6-4020-b4fc-f30ff7371498'),
('0f81b946-e7f7-4ea6-8dd4-1d0f64e2885a', '1e2867d6-76ab-4dcc-9943-832d44605d91'),
('0f81b946-e7f7-4ea6-8dd4-1d0f64e2885a', '1e96d016-7cb1-4f2e-9653-c8a840d1a6cd'),
('ebddb62d-2a73-4284-b7eb-820314d16311', '1ec80093-dba9-4306-93e0-2a4893153cea'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '1f6dd062-b539-4057-8cbf-0eed54b20163'),
('82fb0629-a475-4995-a433-565d377b56a1', '214c2589-680b-46bc-80e6-2fceb1882298'),
('7b027902-2fa0-4871-a774-8dfd156772f2', '2342271a-4e71-4aad-bbbb-062a4970a316'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '2612992f-fb04-41cd-90d4-ae713021eb34'),
('82fb0629-a475-4995-a433-565d377b56a1', '263cddcf-65e2-4d1e-83bf-b879b0dfeba7'),
('0f81b946-e7f7-4ea6-8dd4-1d0f64e2885a', '27e6cb64-34cd-4e53-884f-a7f190474e3f'),
('842d09ab-614f-434d-a4ae-6d311c8cc00e', '28776aae-207f-4fb5-8963-bc47a7fdf1b0'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', '2a63b45b-0806-4c7f-9a54-7d59d5a9486b'),
('695f8e8c-fc4d-45d1-b956-543b99e5cf10', '2af0079e-0efd-462b-9249-224af63381f3'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', '2d61d19f-11a0-45fb-a4d6-4265ce5f2d76'),
('0f81b946-e7f7-4ea6-8dd4-1d0f64e2885a', '2ea6d8f2-cfa8-41ff-9be2-3bb75b2ce45c'),
('0f2fa7e5-4330-4aa7-ad97-908c96d45684', '2f8b013e-6dbd-4e8c-be65-b673d91b96b0'),
('0f2fa7e5-4330-4aa7-ad97-908c96d45684', '311e9663-95c0-4be4-bcbb-1d709202e387'),
('53f5aad6-75ed-4841-9788-e27b28622191', '322e4f6f-5742-4a25-b753-a188cb3f0209'),
('695f8e8c-fc4d-45d1-b956-543b99e5cf10', '32c0e120-3c64-45b4-94a2-c378c0e90a28'),
('608598a7-b665-40e0-b050-84e13d28044c', '33dfb14d-79be-44f6-84ae-ce41409a5819'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', '34a28ecf-dff7-43a5-a769-622fd33faa40'),
('8e0786d3-2181-4fb6-96b1-e64c144e3fdb', '34d1beb5-8963-451b-883d-671d10c8d4fa'),
('59aebd05-4b61-426c-bcab-65c884e5c5ae', '362130f1-c87b-4f7d-82f7-4faaffa8c065'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', '3765db28-3da3-4758-bdbb-5c9f6f73d01c'),
('f51b8f94-455e-460f-89ee-b09c05a5aeed', '379cf181-75cc-42cf-92fb-b13ad279aaaf'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', '3890297d-578b-483d-990c-9a9396a66dc6'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '3890734c-5879-4448-88ac-3ccf1f75cb12'),
('085db67f-d82e-4586-a7b2-04f93530a7ce', '399903c3-3edf-40e9-b26c-685aace670f0'),
('842d09ab-614f-434d-a4ae-6d311c8cc00e', '3a1c4788-58c8-44e9-8e11-0de56f4dc930'),
('7814a29a-e10e-48d7-916c-399da4940470', '3c09c32a-20fd-4bbd-9b26-25ace35ad7a3'),
('236a5d9e-755b-4733-ac9f-a78f57818a2d', '3cb42d1b-004c-437b-b4a9-ee77b13e9634'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '3ec3fe55-0d71-41f5-a414-a878aa1c6255'),
('ebddb62d-2a73-4284-b7eb-820314d16311', '3fc58146-379d-45ca-9101-c4e75e2dbd6b'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', '40781eb4-924f-4e93-a8d9-cf03545f2f21'),
('85368e06-28b2-4fc0-a6ff-681721cb56e2', '408c8528-5f7b-400d-99d8-32dd6f6d48c0'),
('82fb0629-a475-4995-a433-565d377b56a1', '40a9a5a7-95c3-427e-84ef-cb9db5397afb'),
('ebddb62d-2a73-4284-b7eb-820314d16311', '40decc60-a949-4e37-afaa-da923866b123'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', '420b8452-be82-4810-96a6-46be516a417f'),
('695f8e8c-fc4d-45d1-b956-543b99e5cf10', '42eeb9eb-e3e1-4c2e-85db-88b37be1d86f'),
('7f8d704e-889d-4a7b-9c35-2fc54a8df043', '430bfe26-dbc5-429d-a346-a9d24591d9ac'),
('ebddb62d-2a73-4284-b7eb-820314d16311', '4847e83b-0d44-4250-9da4-7bc67a1e3218'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', '4bb128e8-e72f-4531-b26d-e2defa839514'),
('934d87e9-c30d-47e5-8cdd-f9990c37302c', '4bcff15d-d2fb-48a8-a690-62a99cdb93b5'),
('7f8d704e-889d-4a7b-9c35-2fc54a8df043', '4c172d3f-c065-42e7-bd50-eb12b425cb94'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', '4d8e0417-8550-4daf-853e-39981ffc7ed5'),
('8e0786d3-2181-4fb6-96b1-e64c144e3fdb', '4f7ecb82-b626-42e5-b3d9-02917d5b9db5'),
('d856d3c0-4c71-459e-8ed9-0d05264c576f', '4f9349b3-5bca-4ec4-a585-3900dfa730f1'),
('5abcac49-36a2-4d1e-a2ce-13785f238f19', '4fa27ffb-8b49-4871-b07a-e05d2aa46e12'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', '51719c89-c0a4-4ead-ba0e-9db595a34c1b'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', '52f89ad0-22f2-4392-9c15-7d320653766a'),
('f51b8f94-455e-460f-89ee-b09c05a5aeed', '532396f4-8579-46a5-b26e-437ce399928e'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', '53eb7612-4e0b-48ed-96b3-a73ed54ab9ae'),
('7814a29a-e10e-48d7-916c-399da4940470', '53f9f881-67fe-4ecb-aadb-f4005fffd025'),
('7f8d704e-889d-4a7b-9c35-2fc54a8df043', '5420f028-f4fe-4ac0-8640-0ff260896576'),
('48bcbbca-0beb-4301-a6f3-ef5ad981d728', '564bb41b-f2f9-4175-bdaa-d5f66335c524'),
('842d09ab-614f-434d-a4ae-6d311c8cc00e', '56721dd7-a8b4-4c7f-a133-dfcea86eaaaa'),
('40af90f5-bb4e-4842-8361-33b6b8501956', '579643cb-f4ac-421b-a1a0-da192a5be8be'),
('5abcac49-36a2-4d1e-a2ce-13785f238f19', '57fdf89e-fc75-4809-8a83-984bb38e73d0'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', '59b5ba38-16eb-4e8f-954e-6e75d1f73987'),
('40af90f5-bb4e-4842-8361-33b6b8501956', '5a521fd8-27ed-454e-8269-01ba36bac101'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', '5c094e64-c70c-4d8b-a5f1-7aafe3960bc7'),
('0f2fa7e5-4330-4aa7-ad97-908c96d45684', '5cf65635-7c03-4207-b2ab-fbffaae2118f'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '5d18c79e-ca89-46bd-bb1a-8f79a4f032d5'),
('0f2fa7e5-4330-4aa7-ad97-908c96d45684', '5dbaad09-dc15-49ae-a240-25fdaa5b2458'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '5de132ab-795e-4ea3-9fc9-eca5ae3214af'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', '61f58153-e2a6-42c8-acb2-d6d63376bf7b'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', '6224499b-bb76-4256-8174-590637a8fe26'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', '62297443-ded1-4f49-8b2a-c0596459f379'),
('032b7d85-236c-4483-9fd3-b8c2cd411d07', '64060c14-8c30-4276-96cc-05703b927b51'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', '640c4296-2406-4c7f-9e52-03ac417d8a4f'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', '65b606af-a15c-4ac5-b26f-f516ac7db440'),
('0f2fa7e5-4330-4aa7-ad97-908c96d45684', '65e48eb1-5123-4ee7-8e4d-80863de612d3'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', '6663a74b-0a35-43a7-ba8a-d3374cccb1f4'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', '66e1651e-012c-4e0d-8a31-f7991993d802'),
('032b7d85-236c-4483-9fd3-b8c2cd411d07', '67472add-1b38-4680-9787-18f4868d2129'),
('236a5d9e-755b-4733-ac9f-a78f57818a2d', '67b55fc0-3c2a-4536-9959-2f0f3f098b27'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', '67be7fcf-db11-4324-9ddf-04077debe8d7'),
('7814a29a-e10e-48d7-916c-399da4940470', '67e1fa3a-4c3f-4724-816b-dfa66de0aeaa'),
('608598a7-b665-40e0-b050-84e13d28044c', '68403b0a-2c4a-4ddd-baee-24169a067a20'),
('934d87e9-c30d-47e5-8cdd-f9990c37302c', '697a9b81-e4cb-4130-b041-d90359f06a31'),
('85368e06-28b2-4fc0-a6ff-681721cb56e2', '69b5203a-c90c-4751-b3d3-cfbb8cb1045d'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', '6bbf8c1a-32c7-4602-a295-66f132760c53'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', '6cdb231a-8d9d-4746-8074-84c921c0a8db'),
('c9723f2f-49a0-4e13-b801-ddbb0af5602f', '6f51fbd7-48d8-4ae0-85bc-e57e2b99ee89'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '6f888433-3bf2-4480-81c6-7145f1708afc'),
('7814a29a-e10e-48d7-916c-399da4940470', '719d56be-39fe-4bbc-8733-d79cbee082ec'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', '735b94c9-2575-4069-9e02-2c157899162c'),
('c9723f2f-49a0-4e13-b801-ddbb0af5602f', '73e0963e-7b91-40ad-81e7-9a1d1125bed8'),
('032b7d85-236c-4483-9fd3-b8c2cd411d07', '74e4b55f-073d-45c9-b812-d506a8f96b41'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', '79865998-811d-426b-8399-5bd74cfe4f23'),
('82fb0629-a475-4995-a433-565d377b56a1', '7aac7a52-15c5-4c88-b88c-4a260b2852ef'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', '7c3200a3-ad9f-4f8e-9397-1d8d9ebf26c8'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', '7c9a3c8e-c10d-49b8-a697-674d53a5670e'),
('e460a6d9-fe91-415c-8ea8-6fc394fe40be', '7e5872d4-a9ba-44f3-80fe-b9ef316eb3bb'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', '7f8b00a5-016c-4bd0-b170-b8e1f7d4d4c7'),
('695f8e8c-fc4d-45d1-b956-543b99e5cf10', '805e5a16-051e-44d0-a9a0-fcfa0638e6b0'),
('8e0786d3-2181-4fb6-96b1-e64c144e3fdb', '81309e0d-a7ff-46f1-8b52-ef89e52c1c07'),
('085db67f-d82e-4586-a7b2-04f93530a7ce', '8177516e-8f66-43c9-8202-cb8d877144cc'),
('f51b8f94-455e-460f-89ee-b09c05a5aeed', '81b75a72-4f11-46ff-a020-3cb1ed8099c2'),
('236a5d9e-755b-4733-ac9f-a78f57818a2d', '83e7e791-0acf-4032-8579-76fb77eb47ff'),
('46f109fd-8f08-4e56-a65f-5c56ff0f848c', '8581ca6e-7424-4c54-8614-e41d3800de85'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', '85b5c8d8-abb3-440d-8f4e-d2ec8c05537d'),
('d856d3c0-4c71-459e-8ed9-0d05264c576f', '85fcb46e-80cd-44c9-bb8d-b6a26132163c'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', '86e04af8-f03c-44a1-8316-0a92436d656a'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', '8835eea1-751e-4f3e-8043-900856c28263'),
('0f2fa7e5-4330-4aa7-ad97-908c96d45684', '888f2f7d-4ee0-4e73-b93f-848a09cc6309'),
('c9723f2f-49a0-4e13-b801-ddbb0af5602f', '8c96afa1-aad6-42db-b576-ac4a6cdc3a19'),
('608598a7-b665-40e0-b050-84e13d28044c', '8cb9e544-09ab-468f-abab-db35ebf62a85'),
('7814a29a-e10e-48d7-916c-399da4940470', '8cf9d3f5-2259-42c2-8c30-0d36d2266289'),
('82fb0629-a475-4995-a433-565d377b56a1', '8d434861-4dad-472d-91c9-88571ba7cf64'),
('8e0786d3-2181-4fb6-96b1-e64c144e3fdb', '8d7ad7f2-038a-4489-b62f-92f790b0acea'),
('085db67f-d82e-4586-a7b2-04f93530a7ce', '8e7fe3de-2e98-4eda-8841-1ee631b7248c'),
('0f81b946-e7f7-4ea6-8dd4-1d0f64e2885a', '8e83e7f7-ede8-492d-a33c-25b540ddef5c'),
('7b027902-2fa0-4871-a774-8dfd156772f2', '8f0edfe7-85f0-4275-8dc9-73f4be535b5e'),
('40af90f5-bb4e-4842-8361-33b6b8501956', '8fd3e2fa-9f40-4575-8821-ceb7dc743777'),
('baeb0f94-f9ac-4c1c-8494-1325480e42d2', '9033a9da-224d-41b4-9f0c-4d9deeaeb19a'),
('8e0786d3-2181-4fb6-96b1-e64c144e3fdb', '911dc898-589e-4be4-9fda-7b8765db80b2'),
('7814a29a-e10e-48d7-916c-399da4940470', '91d2f1ae-e8fd-4cec-82bf-711201f04146'),
('7f8d704e-889d-4a7b-9c35-2fc54a8df043', '928e0341-6fca-445f-aeb8-726af2495e29'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', '93011997-9f85-4286-8d3b-c9171f14978f'),
('032b7d85-236c-4483-9fd3-b8c2cd411d07', '94873062-80ea-4db5-836b-4493a428f13b'),
('784b80e2-31c6-43aa-88b4-69dbec1887a6', '951ce452-49e7-47c3-b73b-d652e9715b77'),
('baeb0f94-f9ac-4c1c-8494-1325480e42d2', '958e25a5-dd1d-410e-b276-84356515e007'),
('0f81b946-e7f7-4ea6-8dd4-1d0f64e2885a', '962c36e2-0a08-4955-8547-51c5ca992f33'),
('44fdaf0b-8384-476d-a15c-441c2b0ff799', '967651f7-fdbe-47c2-82df-d186db7d18ed'),
('085db67f-d82e-4586-a7b2-04f93530a7ce', '9766ffa8-bf0e-4903-9dd9-b0bd89ab1b07'),
('40af90f5-bb4e-4842-8361-33b6b8501956', '98ca6ee0-33bd-4e3b-8560-a76f972b1257'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', '9a138fbf-03e2-4be7-bb9a-13f0986adff5'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', '9bce098e-d715-45e6-b9ed-a25062459f26'),
('46f109fd-8f08-4e56-a65f-5c56ff0f848c', '9c2d3182-4771-4c6d-a61e-dfc335c31c77'),
('7814a29a-e10e-48d7-916c-399da4940470', '9ca336be-1b80-4776-a9d1-ac6fb2f5ea9f'),
('ebddb62d-2a73-4284-b7eb-820314d16311', '9d953a00-4867-460c-87a1-5a718ca19dbf'),
('842d09ab-614f-434d-a4ae-6d311c8cc00e', '9edf1e0f-e002-4a44-8be6-c56233b2eb6c'),
('5abcac49-36a2-4d1e-a2ce-13785f238f19', 'a0347f20-dc17-4a5c-be60-a26becd0f070'),
('608598a7-b665-40e0-b050-84e13d28044c', 'a1358f72-9f33-475f-9b7b-4f7b2f0cb9e3'),
('ebddb62d-2a73-4284-b7eb-820314d16311', 'a23c3b82-bfff-4cce-88a1-2538391f2c4d'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', 'a4284a50-dd51-4b9c-8f9b-d4714d1cc36a'),
('46f109fd-8f08-4e56-a65f-5c56ff0f848c', 'a4440204-5686-4ee9-9d21-43867c294aa5'),
('85368e06-28b2-4fc0-a6ff-681721cb56e2', 'a6e16225-e508-4193-89a3-3ce990670b83'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', 'a78f43fb-942b-4c64-9616-53ea1f70aeb1'),
('7814a29a-e10e-48d7-916c-399da4940470', 'a9c44552-1b1e-43c6-b297-b6ed0e51817e'),
('85368e06-28b2-4fc0-a6ff-681721cb56e2', 'a9d4150a-f95b-4ba9-a4a5-6bab125e52c7'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', 'aa7322b4-af3d-4661-84f0-b09979ddad03'),
('baeb0f94-f9ac-4c1c-8494-1325480e42d2', 'ab0ee267-9920-4d70-b982-fbb7a2f8cffe'),
('5abcac49-36a2-4d1e-a2ce-13785f238f19', 'ab48df87-c0ce-4aab-8f0e-b8db28257bc2'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'ac803e57-8105-4c0c-bd68-e1e355a7c1a8'),
('baeb0f94-f9ac-4c1c-8494-1325480e42d2', 'acac30ba-5f90-4a93-87d7-8dd4e54dcc9e'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', 'ae98d148-acd9-4a84-8af5-300d49460632'),
('f51b8f94-455e-460f-89ee-b09c05a5aeed', 'af33f126-8a50-4da8-a7da-0e6615049c7e'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', 'b112ffc5-1765-4f20-97a5-7f73055e11ca'),
('842d09ab-614f-434d-a4ae-6d311c8cc00e', 'b1d40bd2-008b-458c-921c-af0f45d5fb92'),
('48bcbbca-0beb-4301-a6f3-ef5ad981d728', 'b3ffee76-68e9-41a7-8091-e916a44629b9'),
('934d87e9-c30d-47e5-8cdd-f9990c37302c', 'b42fc1c8-c2cf-4d6b-b4d7-f343b1d85986'),
('d856d3c0-4c71-459e-8ed9-0d05264c576f', 'b4c28ecc-ed0f-4314-acae-71505b56622c'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'b4fae322-eb11-4264-bff4-1d199f62d1ef'),
('842d09ab-614f-434d-a4ae-6d311c8cc00e', 'b4fbc59a-4707-4c3d-8669-0d89a238e10f'),
('f51b8f94-455e-460f-89ee-b09c05a5aeed', 'b582da1d-db1e-45fd-9f70-ed7131eb4778'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', 'b643dd7a-f50f-433f-83eb-564aa23b3819'),
('784b80e2-31c6-43aa-88b4-69dbec1887a6', 'b7e4172e-b4c6-421d-8ba6-b3ff77d5a64f'),
('44fdaf0b-8384-476d-a15c-441c2b0ff799', 'b8451466-be2c-43bb-86b6-bec343c4a08e'),
('7814a29a-e10e-48d7-916c-399da4940470', 'b8f024a3-8017-42d2-9436-aab1af50861c'),
('032b7d85-236c-4483-9fd3-b8c2cd411d07', 'b9221c37-de5a-4f9c-b63e-5094d49926a9'),
('c9723f2f-49a0-4e13-b801-ddbb0af5602f', 'b948b214-fe62-4b08-9379-2c94d2481aba'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', 'ba63dac6-ad91-4160-afe5-7dc2fe924887'),
('7f8d704e-889d-4a7b-9c35-2fc54a8df043', 'bb7a931f-c2e6-4b06-ace8-0d46ee9c7496'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', 'bbccc79c-cf04-4f63-8ed5-b6d675c7a9ea'),
('032b7d85-236c-4483-9fd3-b8c2cd411d07', 'bd399d74-5a9c-4535-a7f3-a706c61d1afa'),
('8e0786d3-2181-4fb6-96b1-e64c144e3fdb', 'be105b09-7a4f-434d-b4b5-9ee9f9ab05ec'),
('4e1b1aaf-4fb5-43ab-b4a3-044020c9d4f0', 'c0313160-d968-4b21-a79e-97381cf602d7'),
('695f8e8c-fc4d-45d1-b956-543b99e5cf10', 'c0e7200d-5cac-4210-af7a-16ba5a686744'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', 'c4aa337a-23ae-4568-a9dc-445dac67115f'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', 'c58e7081-bfc2-4aa8-803d-c708ca71f553'),
('784b80e2-31c6-43aa-88b4-69dbec1887a6', 'c5f3ed72-e699-43f4-9c70-f8bd3cd28eca'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', 'c66ce11c-efe5-491a-b772-77fcd0584b4a'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'c687e666-2130-4a0c-939d-7f3e1ae37d97'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'c7713173-ad10-49f2-9802-1b0d03f3e3e1'),
('236a5d9e-755b-4733-ac9f-a78f57818a2d', 'c7c5d7b7-557a-43dd-8647-0e805449cd98'),
('7f8d704e-889d-4a7b-9c35-2fc54a8df043', 'c86d0b9a-3efc-4a51-9bc3-80f02f22770b'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'c9462ce8-9607-4e40-9e46-4789933d141b'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', 'cc253f63-5d1f-4ead-b70a-118c87c4dd5e'),
('85368e06-28b2-4fc0-a6ff-681721cb56e2', 'cc8934df-9188-456f-9d5b-cea19b8d41e5'),
('48bcbbca-0beb-4301-a6f3-ef5ad981d728', 'cd96beb2-d006-4470-b97c-676397930483'),
('236a5d9e-755b-4733-ac9f-a78f57818a2d', 'cd9d8e0b-da0b-4b19-96af-24a19ac64632'),
('53f5aad6-75ed-4841-9788-e27b28622191', 'ce5fb742-7908-4c6c-8760-16588c0d3547'),
('fe9b711f-e7ed-4a06-bfee-64a6f7d3e75c', 'cf3e1929-aa75-41f8-8a32-035d48bac5b1'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', 'd048de38-d315-45b0-8e7f-cf2e4ef49a58'),
('46f109fd-8f08-4e56-a65f-5c56ff0f848c', 'd06e1689-153a-48be-b33a-41e475332029'),
('e0c1e973-8650-4564-8977-a4d8d44b71d6', 'd0b0d7fe-fcd7-413d-ab4a-04ba7b876241'),
('40af90f5-bb4e-4842-8361-33b6b8501956', 'd34e9af5-91b6-44a5-a7b0-b4b7f5ff879f'),
('46f109fd-8f08-4e56-a65f-5c56ff0f848c', 'd76dd968-9888-4564-a23f-5949ae48b4af'),
('e7ce5ab1-bf36-43d0-a918-46b07c3276da', 'd7c5a04d-032a-4b3a-984e-62e46da0c00a'),
('44fdaf0b-8384-476d-a15c-441c2b0ff799', 'd9c62a5c-3061-435c-b4c3-fdb8d0eeb7ce'),
('7814a29a-e10e-48d7-916c-399da4940470', 'da6fa70d-f9b7-457d-88a1-5f4447505c8c'),
('7b027902-2fa0-4871-a774-8dfd156772f2', 'db0c9da2-309f-4400-9373-f4387293167b'),
('82fb0629-a475-4995-a433-565d377b56a1', 'ddb99aac-a6c2-47ef-895c-fd5509ba3921'),
('40af90f5-bb4e-4842-8361-33b6b8501956', 'e0f96823-b3cf-46d1-86b3-3c482a056cd4'),
('44fdaf0b-8384-476d-a15c-441c2b0ff799', 'e194fbc9-4f88-4721-8987-866cea8811cc'),
('934d87e9-c30d-47e5-8cdd-f9990c37302c', 'e23721ef-7ae0-4620-97e5-b82c155bd4c3'),
('085db67f-d82e-4586-a7b2-04f93530a7ce', 'e3a85db8-c9be-4ca0-a20f-1264e23cfcfd'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', 'e3b0d453-8a07-4fa9-aa3a-e926f6dc47b4'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', 'e677962d-ec17-4ec4-9d6b-efdd4cd7cb00'),
('7b027902-2fa0-4871-a774-8dfd156772f2', 'e69f2233-9f7c-4943-9763-d4a25f6c493a'),
('608598a7-b665-40e0-b050-84e13d28044c', 'e71d36d4-6b7f-443f-b891-7ff000dd53b8'),
('76510da0-0fb0-4cc0-a686-18f77c3d62df', 'e8b5bc5b-bd85-40d2-b75d-d2fa7350a34a'),
('0c0da1e6-0e22-4e80-aff6-c27f3c0f5d73', 'e9e955d2-6fac-43f1-ba91-f2e7fec71288'),
('d856d3c0-4c71-459e-8ed9-0d05264c576f', 'ea170fb7-e9aa-4206-8911-2d97b6d11649'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', 'ef08565e-6999-482d-8463-fe06722acf1c'),
('82fb0629-a475-4995-a433-565d377b56a1', 'ef39e76b-64b3-4863-bed7-7e03b3488453'),
('baeb0f94-f9ac-4c1c-8494-1325480e42d2', 'f0aaf4ac-6038-4f8f-bd9a-19b77cf05352'),
('c9723f2f-49a0-4e13-b801-ddbb0af5602f', 'f0c17439-3931-4d1e-ae24-3c44920cf1d4'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'f1fe21a0-d91a-42a0-9541-0128546dbd46'),
('8b58d628-a64d-4bbd-b2d7-cb92cbe19923', 'f373d502-8bd7-4025-b0c2-1810c0b1cd7e'),
('40af90f5-bb4e-4842-8361-33b6b8501956', 'f3d66525-8579-482d-bbc1-e10388d253d0'),
('ebddb62d-2a73-4284-b7eb-820314d16311', 'f5dcb798-665f-4e1d-8b29-f555a6562d5b'),
('40af90f5-bb4e-4842-8361-33b6b8501956', 'f65fb204-8913-4b0d-88a9-ede395555c7c'),
('5abcac49-36a2-4d1e-a2ce-13785f238f19', 'f6eba783-56db-4665-9d8c-6a87f09d7ab4'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', 'f70676fb-becb-4b7c-aea9-9df00e7392cc'),
('47d2efc9-267a-4742-bfd3-b577020b40fc', 'f9da52b4-df89-4c19-8a35-3fbf0054dc46'),
('608598a7-b665-40e0-b050-84e13d28044c', 'fab6664c-432f-4099-9311-7db24ffbac5e'),
('98816971-bc93-4c30-bd4a-5d46af97c89a', 'fafadbdb-856d-4002-aa8d-32edc6fb7a26'),
('82fb0629-a475-4995-a433-565d377b56a1', 'fbae511c-0da6-4a41-a487-44b6ec47594a'),
('d856d3c0-4c71-459e-8ed9-0d05264c576f', 'fbf884a9-03fe-420b-86ba-c63891b6e9aa'),
('d856d3c0-4c71-459e-8ed9-0d05264c576f', 'fe197585-4713-442f-abcc-9163af24b9d9'),
('baeb0f94-f9ac-4c1c-8494-1325480e42d2', 'fe218d7b-86cb-4417-a6d4-ccebd0efd537'),
('59aebd05-4b61-426c-bcab-65c884e5c5ae', 'ffb81804-4696-470d-b03e-53dd37ee7b31');

-- --------------------------------------------------------

--
-- Table structure for table `_LoanDocumentToUploadedDocument`
--

CREATE TABLE IF NOT EXISTS `_LoanDocumentToUploadedDocument` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_LoanToLoanDocument`
--

CREATE TABLE IF NOT EXISTS `_LoanToLoanDocument` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_PanAndITCodeByStatusToPanAndITCodeByStatusList`
--

CREATE TABLE IF NOT EXISTS `_PanAndITCodeByStatusToPanAndITCodeByStatusList` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_PanAndITCodeByStatusToPanAndITCodeByStatusList`
--

INSERT INTO `_PanAndITCodeByStatusToPanAndITCodeByStatusList` (`A`, `B`) VALUES
('078f12dd-e7be-4a1f-bc28-8cdeef05b9af', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('24eb2f8e-7f6d-412f-a735-9e1c395245ef', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('2ea39a54-a0fc-47ba-ac2b-d4ddf68b718f', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('2f8c4436-7930-4110-bc49-e475dd7bb9e4', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('33feae33-c645-4fa5-aabb-0604da13cf1e', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('3b8287d2-c86e-47d2-8427-543a4f6b8615', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('4bf02b08-95b1-46fa-b7cd-64156bc64155', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('6f436501-b22b-4f83-9d5d-ac29cfb678cb', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('98c575f4-fda7-4531-9607-9025ed0d954c', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('a585453b-2545-4cd2-b922-c6c0f5a0465a', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('aec88c89-a31c-4462-abae-1fc11853832d', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc'),
('e3f64e4c-cad8-4cc0-85a1-d57fc7be7bde', 'b87f420a-c4a7-4323-8e94-1422a0fe17bc');

--
-- Indexes for dumped tables
--


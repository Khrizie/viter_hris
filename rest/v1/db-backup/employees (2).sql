-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2026 at 02:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viter_hris_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_aid` int(11) NOT NULL,
  `employee_is_active` tinyint(1) NOT NULL,
  `employee_first_name` varchar(128) NOT NULL,
  `employee_middle_name` varchar(128) NOT NULL,
  `employee_last_name` varchar(128) NOT NULL,
  `employee_email` varchar(255) NOT NULL,
  `employee_created` datetime NOT NULL,
  `employee_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_aid`, `employee_is_active`, `employee_first_name`, `employee_middle_name`, `employee_last_name`, `employee_email`, `employee_created`, `employee_updated`) VALUES
(66, 1, 'Chloe Marie Faith', 'De Leon', 'Aala', 'aala@gmail.com', '2026-04-17 15:29:55', '2026-04-27 08:04:02'),
(67, 1, 'Jervie Moises', 'Ramos', 'Agonia', 'jm@gmail.com', '2026-04-17 15:39:16', '2026-04-20 08:53:27'),
(68, 0, 'bogart', 'fsfsf', 'fsfs', 'sdgsgsdgsdg', '2026-04-17 15:40:09', '2026-04-20 08:54:49'),
(70, 1, 'Khrizie Maeren', 'Suarez', 'De Silos', 'km@gmail.com', '2026-04-20 08:54:41', '2026-04-20 08:54:41'),
(73, 1, 'gartbow', 'chris', 'hehe', 'hehe@gmail.com', '2026-04-20 13:39:10', '2026-04-20 13:39:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

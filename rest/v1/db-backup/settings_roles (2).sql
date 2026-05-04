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
-- Table structure for table `settings_roles`
--

CREATE TABLE `settings_roles` (
  `role_aid` int(11) NOT NULL,
  `role_is_active` tinyint(1) NOT NULL,
  `role_name` varchar(128) NOT NULL,
  `role_code` varchar(50) NOT NULL,
  `role_description` text NOT NULL,
  `role_created` datetime NOT NULL,
  `role_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_roles`
--

INSERT INTO `settings_roles` (`role_aid`, `role_is_active`, `role_name`, `role_code`, `role_description`, `role_created`, `role_updated`) VALUES
(7, 0, 'Princess Chloe Marie Faith', '', 'tombits s', '2026-04-15 14:54:52', '2026-04-20 15:04:32'),
(13, 1, 'Khrizie Maeren ', '', 'forMyself', '2026-04-16 10:06:13', '2026-04-16 12:20:35'),
(14, 1, 'Moises', '', 'Hinati ang Bulador', '2026-04-16 10:24:28', '2026-04-16 10:24:28'),
(15, 1, 'Rainier', '', 'pakak', '2026-04-16 10:29:20', '2026-04-16 11:59:03'),
(17, 1, 'Admin', '', 'hahaha', '2026-04-16 12:33:12', '2026-04-16 12:33:12'),
(18, 1, 'Developers', '', 'dadad', '2026-04-16 12:33:25', '2026-04-16 12:33:25'),
(19, 1, 'sfs', '', 'fsfsf', '2026-04-17 15:18:26', '2026-04-17 15:18:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `settings_roles`
--
ALTER TABLE `settings_roles`
  ADD PRIMARY KEY (`role_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `settings_roles`
--
ALTER TABLE `settings_roles`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

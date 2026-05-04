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
-- Table structure for table `settings_users`
--

CREATE TABLE `settings_users` (
  `users_aid` int(11) NOT NULL,
  `users_is_active` tinyint(1) NOT NULL,
  `users_first_name` varchar(255) NOT NULL,
  `users_last_name` varchar(255) NOT NULL,
  `users_email` varchar(255) NOT NULL,
  `users_role_id` varchar(20) NOT NULL,
  `users_password` varchar(255) NOT NULL,
  `users_created` datetime NOT NULL,
  `users_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_users`
--

INSERT INTO `settings_users` (`users_aid`, `users_is_active`, `users_first_name`, `users_last_name`, `users_email`, `users_role_id`, `users_password`, `users_created`, `users_updated`) VALUES
(1, 1, 'gartbow', 'asdasd', 'adadad@gmail.com', '17', '', '2026-04-20 14:25:43', '2026-04-20 15:03:36'),
(2, 1, 'chloe', 'asdasd', 'adadad@gmail.com', '17', '', '2026-04-20 14:27:37', '2026-04-20 14:27:37'),
(3, 1, 'jervie', 'asdasd', 'adadad@gmail.com', '17', '', '2026-04-20 14:27:55', '2026-04-20 14:27:55'),
(4, 1, 'Moises', 'asdasd', 'sdgsgsdgsdg@gmail.com', '13', '', '2026-04-20 14:31:54', '2026-04-20 14:31:54'),
(5, 1, 'chlowwwe', 'asdasd', 'aala@gmail.com', '17', '', '2026-04-20 15:01:57', '2026-04-20 15:01:57'),
(6, 1, 'khrizie maeren', 'de silos', 'khrizie@gmail.com', '17', '', '2026-04-27 09:04:13', '2026-04-27 09:04:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `settings_users`
--
ALTER TABLE `settings_users`
  ADD PRIMARY KEY (`users_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `settings_users`
--
ALTER TABLE `settings_users`
  MODIFY `users_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

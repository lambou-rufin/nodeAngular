-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 12 fév. 2023 à 04:46
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nodecafejs`
--

-- --------------------------------------------------------

--
-- Structure de la table `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `uuid` varchar(200) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `contactNumber` varchar(20) DEFAULT NULL,
  `paymentMethod` varchar(50) NOT NULL,
  `total` int(11) NOT NULL,
  `productDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`productDetails`)),
  `createdBy` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `bill`
--

INSERT INTO `bill` (`id`, `uuid`, `name`, `email`, `contactNumber`, `paymentMethod`, `total`, `productDetails`, `createdBy`) VALUES
(1, 'bf5001e0-93c7-11ed-ad14-8d297110b563', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com'),
(2, 'bce38860-940c-11ed-94b6-bbe443c5416d', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com'),
(3, 'ffc9e2e0-940d-11ed-b732-2ffed816c7b6', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com'),
(4, '80af52a0-940e-11ed-83d4-ad7432c4ab45', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com'),
(5, 'c283bd60-940e-11ed-b1ce-0d09c50b733b', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com'),
(6, 'c44e27b0-940f-11ed-8231-a95a74fb9812', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com'),
(7, '6efaf8d0-941c-11ed-af2f-6b61fd6cc0ae', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com'),
(8, '3de135e0-941f-11ed-81a4-f3b33202be9b', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com'),
(9, '473df180-9480-11ed-a519-ebe36b8bc1a4', 'lamborufin', 'lamborufin@gmail.com', '123123123', 'cash', 123, '[{\"id\":1,\"name\":\"black coffe\",\"price\":99,\"category\":\"coffe\",\"quantity\":1}]', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'bleu'),
(2, 'avocat12'),
(3, 'Rice'),
(4, 'avocat'),
(16, 'riw bleu'),
(17, 'balahazo'),
(18, 'ice cream'),
(19, 'mbizo'),
(20, 'patate douce'),
(21, 'avocat');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `name`, `categoryId`, `description`, `price`, `status`) VALUES
(1, 'vary', 4, 'pizza sakafo', 80000, 'false'),
(2, 'test1', 2, 'test1 description', 4001, 'true'),
(5, 'rice', 3, 'test3 description', 40000, 'true'),
(7, 'pizza', 4, 'pizza description', 30000, 'true'),
(8, 'voanjo', 5, 'tena tsara', 5000, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `contactNumber` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `contactNumber`, `email`, `password`, `status`, `role`) VALUES
(1, 'admin', '123656566', 'admin@gmail.com', 'ruffin', 'true', 'admin'),
(3, 'lambo', '0344511309', 'lambonirinarufin@gmail.com', '123123', 'true', 'user'),
(4, 'nirina', '0341244578', 'nirina@gmail.com', '123123', 'false', 'user'),
(5, 'jjjjjjjj', '0341244578', 'johnylegenie@gmail.com', '123123', 'true', 'user'),
(6, 'koto', '0354555445', 'rakoto@gmail.com', '123456', 'false', 'user'),
(7, 'rojo', '0354555445', 'rojo@gmail.com', '123456', 'false', 'user'),
(8, 'haja', '0354555445', 'haja@gmail.com', '123456', 'false', 'user'),
(9, 'haja', '0354555445', 'hasiana@gmail.com', '123456', 'false', 'user'),
(11, 'lambo', '0344511309', 'vony@gmail.com', '654789', 'false', 'user'),
(12, 'lambo2', '0344511309', 'vonylambo2@gmail.com', '654789', 'false', 'user'),
(13, 'lambo2', '0344511309', 'vonylambo222@gmail.com', '654789', 'false', 'user'),
(14, 'lambo22', '0344511309', 'vonylambo2222@gmail.com', '654789', 'false', 'user'),
(15, 'lambo22', '0344511309', 'vonylambo4@gmail.com', '654789', 'false', 'user'),
(16, 'rojo', '0312544548', 'rojo222@gmail.com', '123456789', 'false', 'user'),
(17, 'rufin', '1234567897', 'rufinnnnn@gmail.com', '123456789', 'true', 'user'),
(18, 'lanja', '1234567899', 'lanja@gmail.com', '123456789', 'true', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

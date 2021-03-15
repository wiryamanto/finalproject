-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 15 Mar 2021 pada 12.50
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_express`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name_category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id_category`, `name_category`) VALUES
(14, 'Action'),
(15, 'Animation'),
(16, 'Horror'),
(17, 'Sci-fi'),
(18, 'Fantasy'),
(19, 'Comedy'),
(20, 'Thriller'),
(21, 'Drama'),
(22, 'Adventure');

-- --------------------------------------------------------

--
-- Struktur dari tabel `film`
--

CREATE TABLE `film` (
  `id_film` int(50) NOT NULL,
  `judul_film` varchar(50) NOT NULL,
  `rating` int(10) NOT NULL,
  `tahun_rilis` int(4) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `film`
--

INSERT INTO `film` (`id_film`, `judul_film`, `rating`, `tahun_rilis`, `id_category`) VALUES
(1, '1917', 7, 2020, 21),
(2, 'Ipman', 8, 2019, 14),
(5, 'sonic hedgehog', 7, 2020, 22),
(6, 'furious7', 8, 2015, 14),
(7, 'IT(chapter 2)', 7, 2019, 16),
(8, 'stand by me', 8, 2014, 21),
(9, 'avenger (infinity war)', 8, 2018, 22),
(10, 'pet sematary', 6, 2019, 16),
(11, 'suicide squad', 6, 2016, 14),
(12, 'frozen', 5, 2012, 15),
(16, 'train to busan', 5, 2020, 20),
(17, 'train to busan pt.2', 7, 2020, 16),
(18, 'tomorrow land', 6, 2015, 17),
(19, 'dolittle', 6, 2020, 18),
(20, 'koala kumal', 7, 2018, 19);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indeks untuk tabel `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id_film`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `film`
--
ALTER TABLE `film`
  MODIFY `id_film` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

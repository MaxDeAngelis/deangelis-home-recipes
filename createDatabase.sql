-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Oct 22, 2017 at 01:44 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `recipes`
--

DELIMITER $$
--
-- Functions
--

DROP FUNCTION IF EXISTS `NewRecipe`$$
CREATE FUNCTION `NewRecipe`() RETURNS int(11)
BEGIN
	DECLARE tempID INT(11);
	DECLARE tempName VARCHAR(45);

	SET tempName = (SELECT UNIX_TIMESTAMP());

	INSERT INTO recipes (name) 
		VALUES (tempName);

	SET tempID = (SELECT recipeId
			FROM recipes 
			WHERE name = tempName);

	UPDATE recipes 
			SET name = ""
			WHERE recipeId = tempID;

	RETURN tempID;
END$$

DROP FUNCTION IF EXISTS `RegisterUser`$$
CREATE FUNCTION `RegisterUser`(newFirstName VARCHAR(45), newLastName VARCHAR(45), newUserName VARCHAR(45), newEmail VARCHAR(45), newRole VARCHAR(45)) RETURNS int(11)
BEGIN
	DECLARE tempUserId INT(11);

	INSERT INTO users (userName, status, roleType) 
		VALUES (newUserName, "request", newRole);

	SET tempUserId = (SELECT userId 
			FROM users 
			WHERE userName = newUserName);

	INSERT INTO person (firstName, lastName, email, personId) 
			VALUES (newFirstName, newLastName, newEmail, tempUserId);

	RETURN true;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
`commentId` int(11) NOT NULL,
  `recipeId` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE `ingredients` (
`ingredientId` int(11) NOT NULL,
  `ingredientName` varchar(45) NOT NULL,
  `defaultUnit` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
`personId` int(11) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ratingref`
--

DROP TABLE IF EXISTS `ratingref`;
CREATE TABLE `ratingref` (
`ratingId` int(11) NOT NULL,
  `recipeId` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipeingredients`
--

DROP TABLE IF EXISTS `recipeingredients`;
CREATE TABLE `recipeingredients` (
`refId` int(11) NOT NULL,
  `recipeId` int(11) DEFAULT NULL,
  `ingredientId` int(11) DEFAULT NULL,
  `quantity` varchar(10) DEFAULT NULL,
  `units` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=720 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes` (
`recipeId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL DEFAULT '',
  `steps` varchar(2048) NOT NULL,
  `servings` int(11) NOT NULL DEFAULT '0',
  `cookTime` varchar(45) NOT NULL DEFAULT '00:00' COMMENT 'Minutes',
  `prepTime` varchar(45) NOT NULL DEFAULT '00:00' COMMENT 'Minutes',
  `ownerId` int(11) NOT NULL DEFAULT '0',
  `public` tinyint(4) NOT NULL DEFAULT '0',
  `category` varchar(45) NOT NULL,
  `season` varchar(45) NOT NULL COMMENT '1 Winter\\\\\\\\n2 Spring\\\\\\\\n3 Summer\\\\\\\\n4 Fall',
  `deleted` tinyint(1) DEFAULT '0',
  `modDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `picture` varchar(256) NOT NULL DEFAULT 'images/no-image-uploaded.png'
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
`userId` int(11) NOT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'request',
  `roleType` varchar(45) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
 ADD PRIMARY KEY (`commentId`), ADD UNIQUE KEY `commentId_UNIQUE` (`commentId`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
 ADD PRIMARY KEY (`ingredientId`), ADD UNIQUE KEY `ingredientId_UNIQUE` (`ingredientId`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
 ADD PRIMARY KEY (`personId`), ADD UNIQUE KEY `personId_UNIQUE` (`personId`), ADD KEY `personId` (`personId`);

--
-- Indexes for table `ratingref`
--
ALTER TABLE `ratingref`
 ADD PRIMARY KEY (`ratingId`), ADD UNIQUE KEY `ratingId_UNIQUE` (`ratingId`), ADD KEY `recipeId_idx` (`recipeId`), ADD KEY `recipeId_idx1` (`recipeId`);

--
-- Indexes for table `recipeingredients`
--
ALTER TABLE `recipeingredients`
 ADD PRIMARY KEY (`refId`), ADD UNIQUE KEY `refId_UNIQUE` (`refId`), ADD KEY `recipeId` (`recipeId`), ADD KEY `ingredientId` (`ingredientId`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
 ADD PRIMARY KEY (`recipeId`), ADD KEY `ownerId` (`ownerId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`userId`), ADD UNIQUE KEY `userId_UNIQUE` (`userId`), ADD UNIQUE KEY `userName_UNIQUE` (`userName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
MODIFY `ingredientId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=104;
--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
MODIFY `personId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `ratingref`
--
ALTER TABLE `ratingref`
MODIFY `ratingId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `recipeingredients`
--
ALTER TABLE `recipeingredients`
MODIFY `refId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=720;
--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
MODIFY `recipeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=194;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipeingredients`
--
ALTER TABLE `recipeingredients`
ADD CONSTRAINT `ingredientId` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients` (`ingredientId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `recipeId` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`recipeId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
ADD CONSTRAINT `ownerId` FOREIGN KEY (`ownerId`) REFERENCES `person` (`personId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

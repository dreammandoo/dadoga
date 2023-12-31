-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ssafit_final
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ssafit_final
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ssafit_final` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;
USE `ssafit_final` ;

-- -----------------------------------------------------
-- Table `ssafit_final`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `loginid` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL DEFAULT 'userid',
  `email` VARCHAR(45) NOT NULL,
  `age` INT UNSIGNED NULL DEFAULT NULL,
  `createdtime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `exp` INT UNSIGNED NOT NULL DEFAULT 0,
  `level` INT UNSIGNED NOT NULL DEFAULT 1,
  `gender` TINYINT NOT NULL,
  `img` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userid_UNIQUE` (`loginid` ASC) VISIBLE,
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ssafit_final`.`recruit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`recruit` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `writerid` INT UNSIGNED NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `content` VARCHAR(200) NOT NULL,
  `datetime` DATETIME NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `part` VARCHAR(45) NOT NULL,
  `gender` INT NOT NULL,
  `level` INT UNSIGNED NOT NULL DEFAULT 1,
  `appliers` INT UNSIGNED NOT NULL DEFAULT 0,
  `applierslimit` INT UNSIGNED NOT NULL,
  `createdtime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `img` VARCHAR(100) NULL DEFAULT NULL,
  `done` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `writerid_idx` (`writerid` ASC) VISIBLE,
  CONSTRAINT `fk_recruit_user`
    FOREIGN KEY (`writerid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ssafit_final`.`apply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`apply` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `recruitid` INT UNSIGNED NOT NULL,
  `creatorid` INT UNSIGNED NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `content` VARCHAR(100) NOT NULL,
  `createdtime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `recruitit_idx` (`recruitid` ASC) VISIBLE,
  INDEX `creatorid_idx` (`creatorid` ASC) VISIBLE,
  UNIQUE INDEX (`recruitid` ASC, `creatorid` ASC) VISIBLE,
  INDEX `fk_applytitle_user_idx` (`title` ASC) VISIBLE,
  CONSTRAINT `fk_apply_recruit`
    FOREIGN KEY (`recruitid`)
    REFERENCES `ssafit_final`.`recruit` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_apply_user`
    FOREIGN KEY (`creatorid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_applytitle_user`
    FOREIGN KEY (`title`)
    REFERENCES `ssafit_final`.`user` (`nickname`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
ALTER TABLE apply ADD UNIQUE (recruitid, creatorid);


-- -----------------------------------------------------
-- Table `ssafit_final`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`comment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `recruitid` INT UNSIGNED NOT NULL,
  `creatorid` INT UNSIGNED NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `content` VARCHAR(100) NOT NULL,
  `createdtime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `recruitid_idx` (`recruitid` ASC) VISIBLE,
  INDEX `creatorid_idx` (`creatorid` ASC) VISIBLE,
  UNIQUE INDEX (`recruitid` ASC, `creatorid` ASC) VISIBLE,
  INDEX `fk_commenttitle_idx` (`title` ASC) VISIBLE,
  CONSTRAINT `fk_comment_recruit`
    FOREIGN KEY (`recruitid`)
    REFERENCES `ssafit_final`.`recruit` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`creatorid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_commenttitle`
    FOREIGN KEY (`title`)
    REFERENCES `ssafit_final`.`user` (`nickname`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
ALTER TABLE comment ADD UNIQUE (recruitid, creatorid);

-- -----------------------------------------------------
-- Table `ssafit_final`.`recommend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`recommend` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fromid` INT UNSIGNED NOT NULL,
  `toid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fromid_idx` (`fromid` ASC) VISIBLE,
  INDEX `toid_idx` (`toid` ASC) VISIBLE,
  CONSTRAINT `fk_recommend_fromid`
    FOREIGN KEY (`fromid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_recommend_toid`
    FOREIGN KEY (`toid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ssafit_final`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`message` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `senderid` INT UNSIGNED NOT NULL,
  `receiverid` INT UNSIGNED NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `content` VARCHAR(100) NOT NULL,
  `checked` TINYINT(1) NOT NULL DEFAULT 0,
  `createdtime` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `senderid_idx` (`senderid` ASC) VISIBLE,
  INDEX `receiverid_idx` (`receiverid` ASC) VISIBLE,
  CONSTRAINT `fk_message_sender`
    FOREIGN KEY (`senderid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_message_receiver`
    FOREIGN KEY (`receiverid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ssafit_final`.`todo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`todo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userid` INT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `done` TINYINT(1) NOT NULL DEFAULT 0,
  `content` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userid_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `fk_todo_user`
    FOREIGN KEY (`userid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ssafit_final`.`timer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`timer` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userid` INT UNSIGNED NOT NULL,
  `event` VARCHAR(45) NOT NULL,
  `timer` TIME NOT NULL DEFAULT 0,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `event_UNIQUE` (`event` ASC) VISIBLE,
  INDEX `userid_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `fk_timer_user`
    FOREIGN KEY (`userid`)
    REFERENCES `ssafit_final`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ssafit_final`.`loginuser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafit_final`.`loginuser` (
  `loginid` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`loginid`),
  CONSTRAINT `loginuser_user`
    FOREIGN KEY (`loginid`)
    REFERENCES `ssafit_final`.`user` (`loginid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

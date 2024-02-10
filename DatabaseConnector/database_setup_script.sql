-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema stocktracker
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema stocktracker
-- -----------------------------------------------------

-- Added to nuke database so all tables are wiped to decrease likelyhood of persistent old tables
DROP DATABASE `stocktracker` IF EXISTS;

CREATE SCHEMA IF NOT EXISTS `stocktracker` ;
USE `stocktracker` ;

-- -----------------------------------------------------
-- Table `stocktracker`.`tracked_tickers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stocktracker`.`tracked_tickers` (
  `ticker` CHAR(5) NOT NULL,
  `tickerid` INT(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`tickerid`),
  UNIQUE INDEX `ticker_UNIQUE` (`ticker` ASC) VISIBLE,
  UNIQUE INDEX `tickerid_UNIQUE` (`tickerid` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stocktracker`.`ticker_dataset`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stocktracker`.`ticker_dataset` (
  `tickerid` INT(10) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `interval` INT NOT NULL,
  `open` DECIMAL(10,2) UNSIGNED NOT NULL,
  `high` DECIMAL(10,2) UNSIGNED NOT NULL,
  `low` DECIMAL(10,2) UNSIGNED NOT NULL,
  `close` DECIMAL(10,2) UNSIGNED NOT NULL,
  PRIMARY KEY (`tickerid`, `timestamp`, `interval`),
  CONSTRAINT `fk_ticker_dataset_1`
    FOREIGN KEY (`tickerid`)
    REFERENCES `stocktracker`.`tracked_tickers` (`tickerid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

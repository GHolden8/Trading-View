-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stocktracker` DEFAULT CHARACTER SET utf8 ;
USE `stocktracker` ;

-- -----------------------------------------------------
-- Table `mydb`.`tracked_tickers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stocktracker`.`tracked_tickers` (
  `ticker` CHAR(5) NOT NULL,
  PRIMARY KEY (`ticker`),
  UNIQUE INDEX `ticker_UNIQUE` (`ticker` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ticker_dataset`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stocktracker`.`ticker_dataset` (
  `ticker` CHAR(5) NOT NULL,
  `timestamp` DATE NOT NULL,
  `interval` INT NOT NULL,
  `open` DECIMAL(2) UNSIGNED NOT NULL,
  `high` DECIMAL(2) UNSIGNED NOT NULL,
  `low` DECIMAL(2) UNSIGNED NOT NULL,
  `close` DECIMAL(2) UNSIGNED NOT NULL,
  PRIMARY KEY (`ticker`, `timestamp`, `interval`),
  CONSTRAINT `ticker`
    FOREIGN KEY (`ticker`)
    REFERENCES `mydb`.`tracked_tickers` (`ticker`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = ascii;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

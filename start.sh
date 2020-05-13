sudo apt update
sudo apt install -y mysql-server

sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'techfeed';
FLUSH PRIVILEGES;

sudo apt install -y mongodb

sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y npm


CREATE TABLE `College` (
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `City` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `State` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Department` (
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Name`,`ColName`),
  KEY `ColName` (`ColName`),
  CONSTRAINT `Department_ibfk_1` FOREIGN KEY (`ColName`) REFERENCES `College` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Class` (
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DepName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Timetable` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Name`,`DepName`,`ColName`),
  KEY `DepName` (`DepName`,`ColName`),
  CONSTRAINT `Class_ibfk_1` FOREIGN KEY (`DepName`, `ColName`) REFERENCES `Department` (`name`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

  CREATE TABLE `Course` (
  `CID` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ClassName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DepName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CID`,`ColName`),
  KEY `ClassName` (`ClassName`,`DepName`,`ColName`),
  CONSTRAINT `Course_ibfk_1` FOREIGN KEY (`ClassName`, `DepName`, `ColName`) REFERENCES `Class` (`name`, `depname`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

  CREATE TABLE `Students` (
  `Github` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LinkedIN` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Instagram` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RollNo` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MobileNo` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IsRep` tinyint(1) DEFAULT NULL,
  `EmailId` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ClassName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DepName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RollNo`,`ColName`),
  KEY `ClassName` (`ClassName`,`DepName`,`ColName`),
  CONSTRAINT `Students_ibfk_1` FOREIGN KEY (`ClassName`, `DepName`, `ColName`) REFERENCES `Class` (`name`, `depname`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Studies` (
  `RollNo` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `CID` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`CID`,`RollNo`,`ColName`),
  KEY `RollNo` (`RollNo`,`ColName`),
  KEY `CID` (`CID`,`ColName`),
  CONSTRAINT `Studies_ibfk_1` FOREIGN KEY (`RollNo`, `ColName`) REFERENCES `Students` (`rollno`, `colname`),
  CONSTRAINT `Studies_ibfk_2` FOREIGN KEY (`CID`, `ColName`) REFERENCES `Course` (`cid`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Teachers` (
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `MobileNo` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EmailId` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Name`,`EmailId`,`ColName`),
  KEY `ColName` (`ColName`),
  CONSTRAINT `Teachers_ibfk_1` FOREIGN KEY (`ColName`) REFERENCES `College` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Teaches` (
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `EmailId` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `CID` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`CID`,`Name`,`EmailId`,`ColName`),
  KEY `Name` (`Name`,`EmailId`,`ColName`),
  KEY `CID` (`CID`,`ColName`),
  CONSTRAINT `Teaches_ibfk_1` FOREIGN KEY (`Name`, `EmailId`, `ColName`) REFERENCES `Teachers` (`name`, `emailid`, `colname`),
  CONSTRAINT `Teaches_ibfk_2` FOREIGN KEY (`CID`, `ColName`) REFERENCES `Course` (`cid`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE `Announcement` (
  `Name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EmailId` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Link` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ClassName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DepName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  KEY `Name` (`Name`,`EmailId`,`ColName`),
  KEY `ClassName` (`ClassName`,`DepName`,`ColName`),
  CONSTRAINT `Announcement_ibfk_1` FOREIGN KEY (`Name`, `EmailId`, `ColName`) REFERENCES `Teachers` (`name`, `emailid`, `colname`),
  CONSTRAINT `Announcement_ibfk_2` FOREIGN KEY (`ClassName`, `DepName`, `ColName`) REFERENCES `Class` (`name`, `depname`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `AuthStudent` (
  `RollNo` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`RollNo`,`ColName`),
  CONSTRAINT `AuthStudent_ibfk_1` FOREIGN KEY (`RollNo`, `ColName`) REFERENCES `Students` (`rollno`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `AuthTeacher` (
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `EmailId` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Name`,`EmailId`,`ColName`),
  CONSTRAINT `AuthTeacher_ibfk_1` FOREIGN KEY (`Name`, `EmailId`, `ColName`) REFERENCES `Teachers` (`name`, `emailid`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Chapters` (
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Number` int(11) DEFAULT NULL,
  `CID` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Name`,`ColName`,`CID`),
  KEY `CID` (`CID`,`ColName`),
  CONSTRAINT `Chapters_ibfk_1` FOREIGN KEY (`CID`, `ColName`) REFERENCES `Course` (`cid`, `colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Materials` (
  `MatName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ChapName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `link` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CID` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ColName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`MatName`,`ChapName`,`CID`,`ColName`),
  KEY `ChapName` (`ChapName`,`ColName`,`CID`),
  CONSTRAINT `Materials_ibfk_1` FOREIGN KEY (`ChapName`, `ColName`, `CID`) REFERENCES `Chapters` (`name`, `colname`, `cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

  insert into College values('PSG','COIMBATORE','TN');
insert into College values('CIT','COIMBATORE','TN');
insert into College values('NIT','TRICHY','TN');

insert into Department values('AMCS','PSG');
  insert into Department values('CS','PSG');
    insert into Department values('ECE','PSG');

insert into Class values('TCS2018','PSG','AMCS','5e903e794b72c43c5e30aa8b');
insert into Class values('TCS2019','PSG','AMCS','5e903e794b72c43c5e30aa8b');
insert into Class values('SS2018','PSG','AMCS','5e903e794b72c43c5e30aa8b');
insert into Class values('DS2018','PSG','AMCS','5e903e794b72c43c5e30aa8b');



USE testDB;

Create table College(Name varchar(50),City varchar(25),State varchar(25),PRIMARY KEY (Name));

Create table Department(Name varchar(50),ColName varchar(50),PRIMARY KEY (Name,ColName),FOREIGN KEY (ColName) REFERENCES College(Name));

Create table Class(Name varchar(50),ColName varchar(50),DepName varchar(50),Timetable varchar(300),PRIMARY KEY (Name,DepName,ColName),FOREIGN KEY (DepName,ColName) REFERENCES Department(Name,ColName));

Create table Course(CID varchar(10),Name varchar(50),ClassName varchar(50),ColName varchar(50),DepName varchar(50),FOREIGN KEY (ClassName,DepName,ColName) REFERENCES Class(Name,DepName,ColName),PRIMARY KEY (CID,ColName));

Create table Students(RollNo varchar(10),Name varchar(50),MobileNo varchar(10),IsRep bool,EmailId varchar(50),ClassName varchar(50),ColName varchar(50),DepName varchar(50),FOREIGN KEY (ClassName,DepName,ColName) REFERENCES Class(Name,DepName,ColName),PRIMARY KEY (RollNo,ColName));

Create table Studies(RollNo varchar(10),CID varchar(10),ColName varchar(50),FOREIGN KEY (RollNo,ColName) REFERENCES Students(RollNo,ColName),FOREIGN KEY (CID,ColName) REFERENCES Course(CID,ColName),primary key(cid,rollNo,ColName));

Create table Teachers(Name varchar(50),MobileNo varchar(15),EmailId varchar(100),ColName varchar(50),primary key(Name,EmailId,ColName),FOREIGN KEY (ColName) REFERENCES College(Name));

create table Teaches(Name varchar(50),EmailId varchar(100),CID varchar(10),ColName varchar(50),FOREIGN KEY (Name,EmailId,ColName) REFERENCES Teachers(Name,EmailId,ColName),FOREIGN KEY (CID,ColName) REFERENCES Course(CID,ColName), primary key(cid,name,EmailId,ColName));

create table Chapters(Name varchar(50),Number int,CID varchar(10),ColName varchar(50),Primary key(Name,ColName,CID),FOREIGN KEY (CID,ColName) REFERENCES Course(CID,ColName));

create table Materials(MatName varchar(100),ChapName varchar(50),link varchar(300),CID varchar(10),ColName varchar(50), Primary key(MatName,ChapName,CID,ColName),FOREIGN KEY (ChapName,ColName,CID) REFERENCES Chapters(Name,ColName,CID));

-- create table Exams(ExDate date,CID varchar(10),ClassName varchar(50),primary key(ExDate,className,cid),foreign key (ClassName) REFERENCES Class(Name),FOREIGN KEY (CID) REFERENCES Course(CID));

-- create table Tests(TestDate date,CID varchar(10),ClassName varchar(50),foreign key (ClassName) REFERENCES Class(Name),FOREIGN KEY (CID) REFERENCES Course(CID),primary key(testdate,cid,className));

create table AuthStudent(RollNo varchar(10),Password varchar(150),ColName varchar(50),primary key(RollNo,ColName),foreign key (RollNo,ColName) references Students(RollNo,ColName));

create table AuthTeacher(Name varchar(50),EmailId varchar(100),Password varchar(150),ColName varchar(50),foreign key (Name,EmailID,ColName) references Teachers(Name,EmailID,ColName),primary key(Name,EmailId,ColName));

--INSERT INTO `testDB`.`College` (`Name`, `City`, `State`) VALUES ('PSG', 'CBE', 'TN');
--INSERT INTO `testDB`.`Department` (`Name`, `ColName`) VALUES ('AMCS', 'PSG');
--INSERT INTO `testDB`.`Class` (`Name`, `DepName`, `Timetable`,`ColName`) VALUES ('TCS_2018', 'AMCS', 'link_in_bio','PSG');
--INSERT INTO `testDB`.`Students` (`RollNo`,`IsRep`, `Name`, `MobileNo`, `EmailId`, `ClassName`,`ColName`,`DepName`) VALUES ('18pt21',false,'Manojkumar', '9524702558', 'manojkumarmmk@icloud.com', 'TCS_2018','PSG','AMCS');
--INSERT INTO `testDB`.`Teachers` (`Name`, `MobileNo`, `EmailId`) VALUES ('Saranya', '9600212868', 'saranya@gmail.com');
--INSERT INTO `testDB`.`Course` (`CID`, `Name`) VALUES ('18XT45', 'Networks and Data Communication');
--INSERT INTO `testDB`.`Teaches` (`CID`, `Name`) VALUES ('18XT45', 'Saranya');
--INSERT INTO `testDB`.`Studies` (`CID`, `RollNo`) VALUES ('18XT45', '18pt21');
--INSERT INTO `testDB`.`Chapters` (`Name`, `Number`, `CID`) VALUES ('Data', '1', '18XT45');
--INSERT INTO `testDB`.`Materials` (`MatName`, `ChapName`, `link`) VALUES ('Book', 'Data', 'link_in_bio');
--INSERT INTO `testDB`.`Exams` (`ExDate`, `CID`, `ClassName`) VALUES ('2020-06-22', '18XT45', 'TCS_2018');
--INSERT INTO `testDB`.`Tests` (`TestDate`, `CID`, `ClassName`) VALUES ('2020-06-22', '18XT45', 'TCS_2018');
--
--INSERT INTO `Students` (`RollNo`,`IsRep`, `Name`, `MobileNo`, `EmailId`, `ClassName`,`ColName`, `DepName`) VALUES ('18pt21',0,'Manoj Kumar', '9524702558', 'manojkumarmaths1000@gmail.com', 'TCS_2018','PSG','AMCS');
--
--select * from College;
--select d.Name from College as c inner join Department as d on c.Name= d.ColName ;
--select c.Name from Class as c inner join Department as d on c.depName= d.Name and d.colName=c.colName;
--

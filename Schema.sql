USE testDB;

Create table College(Name varchar(50),City varchar(25),State varchar(25),PRIMARY KEY (Name));

Create table Department(Name varchar(50),ColName varchar(50),PRIMARY KEY (Name),FOREIGN KEY (ColName) REFERENCES College(Name));

Create table Class(Name varchar(50),DepName varchar(50),Timetable varchar(300),PRIMARY KEY (Name),FOREIGN KEY (DepName) REFERENCES Department(Name));

Create table Course(CID varchar(10),Name varchar(50),PRIMARY KEY (CId));

Create table Students(RollNo varchar(10),Name varchar(50),MobileNo varchar(10),IsRep bool,EmailId varchar(50),ClassName varchar(50),FOREIGN KEY (ClassName) REFERENCES Class(Name),PRIMARY KEY (RollNo));

Create table Studies(RollNo varchar(10),CID varchar(10),FOREIGN KEY (RollNo) REFERENCES Students(RollNo),FOREIGN KEY (CID) REFERENCES Course(CID),primary key(cid,rollNo));

Create table Teachers(Name varchar(50),MobileNo varchar(15),EmailId varchar(100),primary key(Name,EmailId) );

create table Teaches(Name varchar(50),EmailId varchar(100),CID varchar(10),FOREIGN KEY (Name,EmailId) REFERENCES Teachers(Name,EmailId),FOREIGN KEY (CID) REFERENCES Course(CID), primary key(cid,name,EmailId));

create table Chapters(Name varchar(50),Number int,CID varchar(10),Primary key(Name),FOREIGN KEY (CID) REFERENCES Course(CID));

create table Materials(MatName varchar(100),ChapName varchar(50),link varchar(300),Primary key(MatName,ChapName),FOREIGN KEY (ChapName) REFERENCES Chapters(Name));

create table Exams(ExDate date,CID varchar(10),ClassName varchar(50),primary key(ExDate,className,cid),foreign key (ClassName) REFERENCES Class(Name),FOREIGN KEY (CID) REFERENCES Course(CID));

create table Tests(TestDate date,CID varchar(10),ClassName varchar(50),foreign key (ClassName) REFERENCES Class(Name),FOREIGN KEY (CID) REFERENCES Course(CID),primary key(testdate,cid,className));

create table AuthStudent(RollNo varchar(10),Password varchar(150),primary key(RollNo),foreign key (RollNo) references Students(RollNo));

create table AuthTeacher(Name varchar(50),EmailId varchar(100),Password varchar(150),foreign key (Name,EmailID) references Teachers(Name,EmailID),primary key(Name,EmailId));

INSERT INTO `testDB`.`College` (`Name`, `City`, `State`) VALUES ('PSG', 'CBE', 'TN');
INSERT INTO `testDB`.`Department` (`Name`, `ColName`) VALUES ('AMCS', 'PSG');
INSERT INTO `testDB`.`Class` (`Name`, `DepName`, `Timetable`) VALUES ('TCS_2018', 'AMCS', 'link_in_bio');
INSERT INTO `testDB`.`Students` (`RollNo`,`IsRep`, `Name`, `MobileNo`, `EmailId`, `ClassName`) VALUES ('18pt21',false,'Manojkumar', '9524702558', 'manojkumarmmk@icloud.com', 'TCS_2018');
INSERT INTO `testDB`.`Teachers` (`Name`, `MobileNo`, `EmailId`) VALUES ('Saranya', '9600212868', 'saranya@gmail.com');
INSERT INTO `testDB`.`Course` (`CID`, `Name`) VALUES ('18XT45', 'Networks and Data Communication');
INSERT INTO `testDB`.`Teaches` (`CID`, `Name`) VALUES ('18XT45', 'Saranya');
INSERT INTO `testDB`.`Studies` (`CID`, `RollNo`) VALUES ('18XT45', '18pt21');
INSERT INTO `testDB`.`Chapters` (`Name`, `Number`, `CID`) VALUES ('Data', '1', '18XT45');
INSERT INTO `testDB`.`Materials` (`MatName`, `ChapName`, `link`) VALUES ('Book', 'Data', 'link_in_bio');
INSERT INTO `testDB`.`Exams` (`ExDate`, `CID`, `ClassName`) VALUES ('2020-06-22', '18XT45', 'TCS_2018');
INSERT INTO `testDB`.`Tests` (`TestDate`, `CID`, `ClassName`) VALUES ('2020-06-22', '18XT45', 'TCS_2018');

select * from College;
select Department.Name from College inner join Department where College.Name='mmk';
select Class.Name from College inner join Department inner join Class where College.Name='PSG' and Department.Name='AMCS';


USE testDB;

Create table College(
    Name varchar(50),
    City varchar(25),
    State varchar(25),
    PRIMARY KEY (Name)
);

Create table Department(
    Name varchar(50),
    ColName varchar(50),
    PRIMARY KEY (Name,ColName),
    FOREIGN KEY (ColName) REFERENCES College(Name)
);

Create table Class(
    Name varchar(50),
    ColName varchar(50),
    DepName varchar(50),
    Timetable varchar(300),
    PRIMARY KEY (Name,DepName,ColName),
    FOREIGN KEY (DepName,ColName) REFERENCES Department(Name,ColName)
);

Create table Course(
    CID varchar(10),
    Name varchar(50),
    ClassName varchar(50),
    ColName varchar(50),
    DepName varchar(50),
    FOREIGN KEY (ClassName,DepName,ColName) REFERENCES Class(Name,DepName,ColName),
    PRIMARY KEY (CID,ColName)
);

Create table Students(
    Github varchar(50),
    LinkedIN varchar(50),
    Instagram varchar(50),
    RollNo varchar(10),
    Name varchar(50),
    MobileNo varchar(10),
    IsRep bool,
    EmailId varchar(50),
    ClassName varchar(50),
    ColName varchar(50),
    DepName varchar(50),
    FOREIGN KEY (ClassName,DepName,ColName) REFERENCES Class(Name,DepName,ColName),
    PRIMARY KEY (RollNo,ColName)
);

Create table Studies(
    RollNo varchar(10),
    CID varchar(10),
    ColName varchar(50),
    FOREIGN KEY (RollNo,ColName) REFERENCES Students(RollNo,ColName),
    FOREIGN KEY (CID,ColName) REFERENCES Course(CID,ColName),
    primary key(cid,rollNo,ColName)
);

Create table Teachers(
    Name varchar(50),
    MobileNo varchar(15),
    EmailId varchar(100),
    ColName varchar(50),
    primary key(Name,EmailId,ColName),
    FOREIGN KEY (ColName) REFERENCES College(Name)
);

create table Teaches(
    Name varchar(50),
    EmailId varchar(100),
    CID varchar(10),
    ColName varchar(50),
    FOREIGN KEY (Name,EmailId,ColName) REFERENCES Teachers(Name,EmailId,ColName),
    FOREIGN KEY (CID,ColName) REFERENCES Course(CID,ColName), 
    primary key(cid,name,EmailId,ColName)
);

create table Chapters(
    Name varchar(50),
    Number int,
    CID varchar(10),
    ColName varchar(50),
    Primary key(Name,ColName,CID),
    FOREIGN KEY (CID,ColName) REFERENCES Course(CID,ColName)
);

create table Materials(
    MatName varchar(100),
    ChapName varchar(50),
    link varchar(1000),
    CID varchar(10),
    ColName varchar(50),
    Primary key(MatName,ChapName,CID,ColName),
    FOREIGN KEY (ChapName,ColName,CID) REFERENCES Chapters(Name,ColName,CID)
);

create table AuthStudent(
    RollNo varchar(10),
    Password varchar(150),
    ColName varchar(50),
    primary key(RollNo,ColName),
    foreign key (RollNo,ColName) references Students(RollNo,ColName)
);

create table AuthTeacher(
    Name varchar(50),
    EmailId varchar(100),
    Password varchar(150),
    ColName varchar(50),
    foreign key (Name,EmailID,ColName) references Teachers(Name,EmailID,ColName),
    primary key(Name,EmailId,ColName)
);

CREATE TABLE Announcement (
    Name VARCHAR(50),
    EmailId VARCHAR(100),
    Link VARCHAR(1000),
    ClassName VARCHAR(50),
    ColName VARCHAR(50),
    DepName VARCHAR(50),
    primary key(Name,EmailId,Link,ClassName,ColName,DepName),
    FOREIGN KEY (Name , EmailID , ColName) REFERENCES Teachers (Name , EmailID , ColName),
    FOREIGN KEY (ClassName , DepName , ColName) REFERENCES Class (Name , DepName , ColName)
);

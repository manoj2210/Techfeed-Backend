const createTables=[
    'Create table College(Name varchar(50),City varchar(25),State varchar(25),PRIMARY KEY (Name));',
    'Create table Department(Name varchar(50),ColName varchar(50),PRIMARY KEY (Name),FOREIGN KEY (ColName) REFERENCES College(Name));',
    'Create table Class(Name varchar(50),DepName varchar(50),Timetable varchar(300),PRIMARY KEY (Name),FOREIGN KEY (DepName) REFERENCES Department(Name));',
    'Create table Course(CID varchar(10),Name varchar(50),PRIMARY KEY (CId));',
    'Create table Students(RollNo varchar(10),Name varchar(50),MobileNo varchar(15),IsRep bool,EmailId varchar(50),ClassName varchar(50),FOREIGN KEY (ClassName) REFERENCES Class(Name),PRIMARY KEY (RollNo));',
    'Create table Studies(RollNo varchar(10),CID varchar(10),FOREIGN KEY (RollNo) REFERENCES Students(RollNo),FOREIGN KEY (CID) REFERENCES Course(CID),primary key(cid,rollNo));',
    'Create table Teachers(Name varchar(50),MobileNo varchar(15),EmailId varchar(100),primary key(Name,EmailId) );',
    'create table Teaches(Name varchar(50),EmailId varchar(100),CID varchar(10),FOREIGN KEY (Name,EmailId) REFERENCES Teachers(Name,EmailId),FOREIGN KEY (CID) REFERENCES Course(CID), primary key(cid,name,EmailId));',
    'create table Chapters(Name varchar(50),Number int,CID varchar(10),Primary key(Name),FOREIGN KEY (CID) REFERENCES Course(CID));',
    'create table Materials(MatName varchar(100),ChapName varchar(50),link varchar(300),Primary key(MatName,ChapName),FOREIGN KEY (ChapName) REFERENCES Chapters(Name));',
    'create table Exams(ExDate date,CID varchar(10),ClassName varchar(50),primary key(ExDate,className,cid),foreign key (ClassName) REFERENCES Class(Name),FOREIGN KEY (CID) REFERENCES Course(CID));',
    'create table Tests(TestDate date,CID varchar(10),ClassName varchar(50),foreign key (ClassName) REFERENCES Class(Name),FOREIGN KEY (CID) REFERENCES Course(CID),primary key(TestDate,cid,className));',
    'create table AuthStudent(RollNo varchar(10),Password varchar(150),primary key(RollNo),foreign key (RollNo) references Students(RollNo));',
    'create table AuthTeacher(Name varchar(50),EmailId varchar(100),Password varchar(150),foreign key (Name,EmailID) references Teachers(Name,EmailID),primary key(Name,EmailId));'
];
module.exports=function(db){
    for(const i of createTables){
        db.query(i)
            .then(rows=>{
                console.log(rows);
            },err => {
                return db.close().then( () => { throw err; } )
            })
            .catch(err=>{
                console.log(err);
            });
    }
    db.close();
};
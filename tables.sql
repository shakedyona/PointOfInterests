/*CREATE TABLE Users(
	Username varchar(30) primary key,
	Password varchar(10) not null,
	FirstName varchar(50) not null,
	LastName varchar (50) not null,
	City varchar(50) not null,
	Country varchar(50) not null,
	Email varchar(50) not null, 
	LastPointName1 varchar(30),
	LastPointName2 varchar(30),
	FOREIGN KEY (LastPointName1) REFERENCES Points(PointName),
	FOREIGN KEY (LastPointName2) REFERENCES Points(PointName),
);*/

CREATE TABLE Users(
	Username varchar(30) primary key,
	Password varchar(10) not null,
	FirstName varchar(50) not null,
	LastName varchar (50) not null,
	City varchar(50) not null,
	Country varchar(50) not null,
	Email varchar(50) not null, 
);


Create TABLE Users_Questions(
	Username varchar(30) PRIMARY KEY,
	QuestionID1 int NOT NULL,
	Answer1 varchar(40) NOT NULL,
	QuestionID2 int NOT NULL,
	Answer2 varchar(40) NOT NULL,
	FOREIGN KEY (Username) REFERENCES Users(Username),
	FOREIGN KEY (QuestionID1) REFERENCES Questions(QuestionID),
	FOREIGN KEY (QuestionID2) REFERENCES Questions(QuestionID)
);

Create TABLE Questions(
	QuestionID INTEGER PRIMARY KEY IDENTITY(1,1),
	Question varchar(30) not null,
	
);

Create TABLE Categories(
	CategoryName varchar(30) PRIMARY KEY not null,
	
);

Create TABLE Points(
	PointID INTEGER IDENTITY(1,1),
	PointName varchar(30) PRIMARY KEY not null,
	CategoryName varchar(30) not null,
	Image image not null,
	ViewNum INTEGER default 0 not null,
	Description varchar(200) not null,
	Rate decimal(3,2) not null default 0 check(Rate between 0 and 1),
	Review1 varchar(200) not null,
	DateReview1 date not null,	
	Review2 varchar(200) not null,
	DateReview2 date not null,	
	CONSTRAINT valid_DateReview1 check (DateReview1 BETWEEN '01-JAN-1900' AND SYSDATETIME() ),
	CONSTRAINT valid_DateReview2 check (DateReview2 BETWEEN '01-JAN-1900' AND SYSDATETIME() ),	
	FOREIGN KEY (CategoryName) REFERENCES Categories(CategoryName),
	
);

Create TABLE Users_Favorits(
	Username varchar(30) ,
	PointName varchar(30),
	FOREIGN KEY (Username) REFERENCES Users(Username),
	FOREIGN KEY (PointName) REFERENCES Points(PointName),
	PRIMARY KEY (Username,PointName)
);


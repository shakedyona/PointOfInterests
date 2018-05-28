CREATE TABLE Users(
	Username varchar(30) primary key,
	Password varchar(10) not null,
	FirstName varchar(50) not null,
	LastName varchar (50) not null,
	City varchar(50) not null,
	Country varchar(50) not null,
	Email varchar(50) not null,
);

Create TABLE Users_Categories(
	Username varchar(30) NOT NULL,
	Category varchar(30),
	FOREIGN KEY (Username) REFERENCES Users(Username),
	FOREIGN KEY (Category) REFERENCES Categories(CategoryName),
	PRIMARY KEY(Username,Category),
);

Create TABLE Users_Questions(
	Username varchar(30) PRIMARY KEY,
	Answer1 varchar(40) NOT NULL,
	Answer2 varchar(40) NOT NULL,
	FOREIGN KEY (Username) REFERENCES Users(Username),
);


Create TABLE Points(
	PointID INTEGER IDENTITY(1,1),
	PointName varchar(30) PRIMARY KEY not null,
	CategoryName varchar(30) not null,
	Image image not null, /////////////////check image
	ViewNum INTEGER default 0 not null,/////////////change not null
	Description varchar(200) not null,//////////////////change number 1000
	Rate decimal(3,2) not null default 0 check(Rate between 0 and 1),	
	NumOfRate INTEGER not null
	SumOfRate 
	FOREIGN KEY (CategoryName) REFERENCES Categories(CategoryName),
	
);

Create TABLE Points_review(	
	Username varchar(30) PRIMARY KEY not null,
	Review1 varchar(200) not null,
	DateReview1 date not null,	
	Review2 varchar(200) not null,
	DateReview2 date not null,
	FOREIGN KEY (PointID) REFERENCES Points(PointID),
	CONSTRAINT valid_DateReview1 check (DateReview1 BETWEEN '01-JAN-1900' AND SYSDATETIME() ),
	CONSTRAINT valid_DateReview2 check (DateReview2 BETWEEN '01-JAN-1900' AND SYSDATETIME() ),	
);

Create TABLE Users_Favorits(
	Username varchar(30) not null,
	PointName varchar(30) not null,
	FOREIGN KEY (Username) REFERENCES Users(Username),
	FOREIGN KEY (PointName) REFERENCES Points(PointName),
	PRIMARY KEY (Username,PointName),
);

Create TABLE Users_Last_Point(
	SearchID INTEGER IDENTITY(1,1),
	Username varchar(30) not null,
	SearchPointName varchar(30) not null,
	FOREIGN KEY (Username) REFERENCES Users(Username),
	FOREIGN KEY (SearchPointName) REFERENCES Points(PointName),
	PRIMARY KEY (Username,SearchPointName),
);


Create TABLE Categories(
	CategoryName varchar(30) PRIMARY KEY not null,	
);
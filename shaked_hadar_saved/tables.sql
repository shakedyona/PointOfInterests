CREATE TABLE Users(
	Username VARCHAR(30) PRIMARY KEY NOT NULL,
	Password VARCHAR(10) NOT NULL,
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR (50) NOT NULL,
	City VARCHAR(50) NOT NULL,
	Country VARCHAR(50) NOT NULL,
	Email VARCHAR(50) NOT NULL,
);

Create TABLE Users_Categories(
	Username VARCHAR(30) NOT NULL,
	Category VARCHAR(30) NOT NULL,
	FOREIGN KEY (Username) REFERENCES Users(Username),
	FOREIGN KEY (Category) REFERENCES Categories(CategoryName),
	PRIMARY KEY(Username,Category),
);

Create TABLE Users_Questions(
	Username VARCHAR(30) PRIMARY KEY NOT NULL,
	Answer1 VARCHAR(40) NOT NULL,
	Answer2 VARCHAR(40) NOT NULL,
	FOREIGN KEY (Username) REFERENCES Users(Username),
);


Create TABLE Points(
	PointID INTEGER IDENTITY(1,1) NOT NULL,
	PointName VARCHAR(30) PRIMARY KEY NOT NULL,
	CategoryName VARCHAR(30) NOT NULL,
	Image VARCHAR(1000)  NOT NULL,
	ViewNum INTEGER DEFAULT 0 NOT NULL,
	Description VARCHAR(max) NOT NULL,
	Rate decimal,	
	NumOfRate INTEGER DEFAULT 0 NOT NULL,
	SumOfRate INTEGER DEFAULT 0 NOT NULL,
	FOREIGN KEY (CategoryName) REFERENCES Categories(CategoryName),
	
);

Create TABLE Reviews(	
	PointName VARCHAR(30) NOT NULL,
	Username VARCHAR(30) NOT NULL,
	ReviewID INTEGER IDENTITY(1,1) NOT NULL,
	Review VARCHAR(max),
	DateReview VARCHAR(1000) NOT NULL,	
	FOREIGN KEY (PointName) REFERENCES Points(PointName),
	FOREIGN KEY (Username) REFERENCES Users(Username),
	PRIMARY KEY (PointName,Username),
);

Create TABLE Rates(	
	PointName VARCHAR(30) NOT NULL,
	Username VARCHAR(30) NOT NULL,
	Rate INTEGER NOT NULL,
	FOREIGN KEY (PointName) REFERENCES Points(PointName),
	FOREIGN KEY (Username) REFERENCES Users(Username),
	PRIMARY KEY (PointName,Username),
);

Create TABLE Users_Favorits(
	Username VARCHAR(30) NOT NULL,
	PointName VARCHAR(30) NOT NULL,
	FavoritID INTEGER IDENTITY(1,1),
	OrderID INTEGER DEFAULT 0 NOT NULL,
	FOREIGN KEY (Username) REFERENCES Users(Username),
	FOREIGN KEY (PointName) REFERENCES Points(PointName),
	PRIMARY KEY (Username,PointName),
);


Create TABLE Categories(
	CategoryName VARCHAR(30) PRIMARY KEY NOT NULL,	
);
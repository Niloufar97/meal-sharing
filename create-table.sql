-- Active: 1715369482326@@dpg-cotke57109ks73amile0-a.oregon-postgres.render.com@5432@meal_sharing_ywn2@public
 CREATE TABLE Meal(
   meal_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   title VARCHAR(200) NOT NULL,
   description  TEXT NOT NULL,
   location VARCHAR(100),
   _when TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   max_reservations INT  NOT NULL,
   price DECIMAL(5,2),  
   created_date DATE,
   img TEXT
);

CREATE TABLE Review(
   review_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   title VARCHAR(100) NOT NULL,
   description TEXT NOT NULL,
   meal_id INT NOT NULL references Meal(meal_id),
   stars INT,  
   created_date DATE
);

 CREATE TABLE Reservation(
   reservation_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   number_of_guests INT not null,
   meal_id INT NOT NULL references Meal(meal_id),
   created_date TIMESTAMP,
   contact_phonenumber VARCHAR(50),
   contact_name VARCHAR(100),
   contact_email VARCHAR(100)
);
CREATE DATABASE IF NOT EXISTS get_it_api;

USE get_it_api;

CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    url_image VARCHAR(255) NOT NULL DEFAULT '',
    total_quantity INT NOT NULL,
    price DECIMAL(9, 2) NOT NULL,
    size VARCHAR(255),
    points_converter DECIMAL(9, 2) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY `name` (name)
);

CREATE TABLE IF NOT EXISTS users (
		id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    points DECIMAL(9, 2) DEFAULT 0,
    role VARCHAR(100) NOT NULL DEFAULT 'customer',
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sales (
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	seller_id INT NOT NULL,
	total_price DECIMAL(9,2) NOT NULL,
	total_points DECIMAL(9,2) NOT NULL,
	delivery_address VARCHAR(100) NOT NULL,
	delivery_number VARCHAR(50) NOT NULL,
	sale_date DATETIME NOT NULL,
	status VARCHAR(50) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (seller_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS sales_products (
		sale_id INT NOT NULL,
		product_id INT NOT NULL,
		quantity INT NOT NULL,
		PRIMARY KEY(sale_id, product_id),
		FOREIGN KEY (product_id) REFERENCES products(id),
		FOREIGN KEY (sale_id) REFERENCES sales(id)
);

INSERT INTO users (id, name, email, password, role, points) VALUES
	(1, 'Get It Admin Jordan', 'jordan@getit.com', '$2a$12$NInfMuqnKFrxYxH6x3ZGd.vKM/BZi1X/cRvIOYBkLVdqVMzeFidwi
', 'administrator'), -- password: 'jordanadminsitrator'
	(2, 'Jhon Doe', 'jhondoeshop@emal.com', '$2a$12$jXWtManRMG2hiPBygu3fD.1iILWGbKaL6Bqbc6qbpGPbz0S3LqWWS', 'seller'), -- password: 'jhondoeseller'
	(3, 'Eddie Vedder', 'eddiev@email.com', '$2a$12$uSgBEhVFYPrxFA5UL.nlzOmrZlPk6qn0PkPceS/bPPhJ1KxJyPdfu', 'customer', 1250); -- password: 'eddieveddercustomer'

INSERT INTO products (id, name, price, url_image, total_quantity, points_converter, size) VALUES
	(1, 'Fender Stratocaster', 990.90, 'http://localhost:3001/images/fender_strato.jpg', 5, 1.50),
	(2, 'Bose Headphone', 125.50, 'http://localhost:3001/images/bose_headphone.jpg', 10, 1.25),
	(3, 'Iphone 15', 2600, 'http://localhost:3001/images/iphone.jpg', 2, 3),
	(4, 'Nike Shoes Soft-Ride', 200, 'http://localhost:3001/images/nike_shoes.jpg', 10, 0.75, '38, 39, 40, 41, 42'),
	(5, 'Smart Watch', 400, 'http://localhost:3001/images/smart_watch.jpg', 4, 1),
	(6, 'Aloha SurfBoard', 70, 'http://localhost:3001/images/aloha_surfboat.jpg', 30, 0.50)
const db = require('./db');

db.runQuery('CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, price DECIMAL(10,2) NOT NULL, stock INT NOT NULL, name VARCHAR(200) NOT NULL,description VARCHAR(1000) NOT NULL, image VARCHAR(200) NOT NULL)').then(
    (result) => {
        console.log(result);
    },

    (error) => {
        console.log(error);
    }
);

db.runQuery('CREATE TABLE categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(200) NOT NULL, status TINYINT(2) DEFAULT 0)').then(
    (result) => {
        console.log(result);
    },

    (error) => {
        console.log(error);
    }
);

db.runQuery('CREATE TABLE products_categories (product_id INT NOT NULL, category_id INT NOT NULL, PRIMARY KEY (product_id, category_id) )').then(
    (result) => {
        console.log(result);
    },

    (error) => {
        console.log(error);
    }
);

//products items
db.runQuery(`INSERT INTO products (id , price, stock, name, description , image )
    VALUES (NULL, 23.00, 5, 'Laptop Bag', 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 'p1.jpg'),
    (NULL, 12.99, 9, 'Mens Casual Premium Slim Fit T-Shirts', 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans.', 'p2.jpg'),
    (NULL, 56.78, 2, 'Mens Cotton Jacket', 'Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day', 'p3.jpg'),
    (NULL, 34.78, 0, 'Mens Casual Slim Fit', 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description', 'p4.jpg'),
    (NULL, 102.32, 25, "John Hardy Women's Legends Naga Gold", "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.", 'p5.jpg'),
    (NULL, 7.00, 20, 'Solid Gold Petite Micropave', 'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.', 'p6.jpg'),
    (NULL, 9.99, 12, 'White Gold Plated Princess', "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...", 'p7.jpg'),
    (NULL, 21.00, 10, 'WD 2TB Elements Portable External Hard Drive - USB 3.0', 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system', 'p8.jpg'),
    (NULL, 67.50, 70, 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application', 'p9.jpg'),
    (NULL, 500.89, 9, 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor', '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag', 'p10.jpg'),
    (NULL, 467.50, 10, 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz', 'p11.jpg')
     `).then(
    (result) => {
        console.log(result);
    },

    (error) => {
        console.log(error);
    }
);

//categories items
db.runQuery(`INSERT INTO categories (id , name, status )
    VALUES (NULL, 'Bags', 1),
    (NULL, 'Clothes', 1),
    (NULL, 'Jewelry', 1),
    (NULL, 'PC components', 1),
    (NULL, 'Monitors', 1)  `).then(
    (result) => {
        console.log(result);
    },

    (error) => {
        console.log(error);
    }
);

//products_categories items
db.runQuery(`INSERT INTO products_categories (product_id, category_id)
    VALUES (1,1), (2,2), (3,2), (4,2), (5,3), (6,3), (7,3), (8,4), (9,4), (10,5), (11,5) `).then(
    (result) => {
        console.log(result);
    },

    (error) => {
        console.log(error);
    }
);

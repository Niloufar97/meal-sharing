-- Active: 1715369482326@@dpg-cotke57109ks73amile0-a.oregon-postgres.render.com@5432@meal_sharing_ywn2@public
INSERT INTO
    meal(
        title,
        description,
        max_reservations,
        location,
        _when,
        price,
        created_date,
        img
    )
VALUES
    (
        'Italian Pasta Night',
        'Indulge in a delicious array of traditional Italian pasta dishes.',
        30,
        'Café Bella Vista',
        '2024-08-14 19:00:00',
        20.00,
        '2024-08-06 18:40:00',
        'src/client/assets/images/mealPictures/pasta.jpg'
    ),
    (
        'Sushi Extravaganza',
        'Experience the art of sushi-making with our expert chefs.',
        20,
        'Tokyo Sushi Bar',
        '2023-08-18 17:30:00',
        28.50,
        '2023-08-06 20:15:00',
        'src/client/assets/images/mealPictures/sushi.webp'
    ),
    (
        'Kebab house',
        'the complete collection of different Kebabs',
        25,
        '707 Green Acres Ln',
        '2023-09-17 11:00:00',
        16.99,
        '2023-09-06 22:05:00',
        'src/client/assets/images/mealPictures/kebab.jpg'
    ),
    (
        'Vegetarian Delight',
        'A delightful vegetarian spread featuring farm-fresh produce and innovative dishes.',
        15,
        '909 Spice Blvd',
        '2024-10-09 20:30:00',
        17.50,
        '2024-10-06 23:30:00',
        'src/client/assets/images/mealPictures/vegg.jpg'
    ),
    (
        'Taco Extravaganza',
        'Celebrate Taco Tuesday with a variety of delicious tacos and Mexican-inspired treats.',
        30,
        '1010 Sugar St',
        '2025-04-16 14:00:00',
        12.25,
        '2025-03-07 01:15:00',
        'src/client/assets/images/mealPictures/taco.jpg'
    );


INSERT INTO
    reservation(
        number_of_guests,
        meal_id,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email
    )
VALUES
    (
        3,
        2,
        '2024-08-14 19:00:00',
        '22334455',
        'Asghar',
        'Asghar@gmail.com'
    ),
    (
        4,
        5,
        '2024-08-14 19:00:00',
        '99334455',
        'Amir',
        'Amir123@gmail.com'
    ),
    (
        15,
        4,
        '2024-08-14 19:00:00',
        '22334455',
        'Akbar',
        'Akbar321@gmail.com'
    );

INSERT INTO
    review(
        title,
        description,
        meal_id,
        stars,
        created_date
    )
VALUES
    (
        'nice sushi experience',
        'The Sushi Extravaganza was an amazing experience. The sushi was fresh and beautifully presented.',
        2,
        4,
        '2024-08-14 19:00:00'
    ),
    (
        'Nice Tacos',
        'A flavorful delight earning a solid four-star rating.',
        5,
        5,
        '2024-09-14 19:00:00'
    ),
    (
        'Very nice pasta',
        'very nice and delicious and ontime',
        1,
        3,
        '2024-06-14 19:00:00'
    )
    ;
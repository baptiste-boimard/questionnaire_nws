ALTER ROLE postgres SUPERUSER;
DROP TABLE IF EXISTS 'user';
CREATE TABLE user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email TEXT NOT NULL,
    password TEXT,
    registred BOOLEAN NOT NULL,
    emailToken STRING,
);
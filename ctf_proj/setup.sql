CREATE DATABASE IF NOT EXISTS ctf_db;
USE ctf_db;

CREATE TABLE IF NOT EXISTS answers (
  id INT PRIMARY KEY,
  flag VARCHAR(255) NOT NULL
);

TRUNCATE TABLE answers;

INSERT INTO answers (id, flag) VALUES
(1, 'pizzaexpress'),
(2, 'mumbai'),
(3, 'hackocat'),
(4, 'target@email.com'),
(5, 'github'),
(6, 'hi'),
(7, 'flag{123$}');

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
(3, 'cat'),
(4, 'mahapatraabheek0@gmail.com'),
(5, 'github'),
(6, 'ironeye_abheek'),
(7, 'H1DD3N_1N_PL41N_51GH7');

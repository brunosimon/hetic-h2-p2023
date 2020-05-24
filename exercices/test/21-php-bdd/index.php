<?php

include './config.php';

// Connexion variables
define('DB_HOST', 'localhost');
define('DB_PORT', '8889');
define('DB_NAME', 'hetic_p2023_first');
define('DB_USER', 'root');
define('DB_PASS', 'root');

$pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';port='.DB_PORT, DB_USER, DB_PASS);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

// // Get all users
// $query = $pdo->query('SELECT * FROM users');
// $users = $query->fetchAll();

$exec = $pdo->exec('INSERT INTO users (login, password, age, gender) VALUES (\'bueno\', \'azerty\', 27, \'male\')');

echo '<pre>';
var_dump($exec);
echo '</pre>';
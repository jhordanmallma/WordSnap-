<?php
// config.php
$host = "localhost";
$dbname = "bdlogin";
$user = "root";      // Usuario por defecto en XAMPP
$password = "";      // Contraseña por defecto (vacía)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("ERROR: No se pudo conectar. " . $e->getMessage());
}
?>

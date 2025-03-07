<?php
header("Content-Type: application/json"); // Asegura respuesta en JSON
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "config.php"; // Conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["email"]) && filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $email = trim($_POST["email"]);

        try {
            // Verificar si el correo ya está registrado en newsletter_subscribers
            $stmt = $pdo->prepare("SELECT id FROM newsletter_subscribers WHERE email = :email");
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(["status" => "error", "message" => "Este correo ya está registrado."]);
                exit();
            }

            // Insertar el nuevo correo en newsletter_subscribers
            $stmt = $pdo->prepare("INSERT INTO newsletter_subscribers (email) VALUES (:email)");
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "¡Te has suscrito con éxito!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Error al guardar el correo."]);
            }
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => "Error en la base de datos: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Correo no válido."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>

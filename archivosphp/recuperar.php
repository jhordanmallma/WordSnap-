<?php
// archivos php/recuperar.php
session_start();
require_once "config.php";

$message = "";
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = trim($_POST['correo']);

    if (empty($correo)) {
        $errors[] = "Por favor, ingresa tu correo electrónico.";
    } elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Por favor, ingresa un correo electrónico válido.";
    } else {
        // Verificar si el correo existe en la base de datos
        $sql = "SELECT id FROM usuarios WHERE correo = :correo";
        if ($stmt = $pdo->prepare($sql)) {
            $stmt->bindParam(":correo", $correo, PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowCount() == 1) {
                // Generar token de reseteo
                $token = bin2hex(random_bytes(16));
                // Establecer expiración (1 hora a partir de ahora)
                $expiracion = date("Y-m-d H:i:s", strtotime("+1 hour"));

                // Actualizar la base de datos con el token y la expiración
                $sql_update = "UPDATE usuarios SET reset_token = :token, reset_expiration = :expiracion WHERE correo = :correo";
                if ($stmt_update = $pdo->prepare($sql_update)) {
                    $stmt_update->bindParam(":token", $token, PDO::PARAM_STR);
                    $stmt_update->bindParam(":expiracion", $expiracion, PDO::PARAM_STR);
                    $stmt_update->bindParam(":correo", $correo, PDO::PARAM_STR);
                    if ($stmt_update->execute()) {
                        // En un entorno real se enviaría un correo con el enlace.
                        // Para la demostración se muestra el enlace directamente:
                        $message = "Se ha enviado un enlace de recuperación a tu correo.<br>";
                        $message .= "Para fines de demostración, haz clic en el siguiente enlace: ";
                        $message .= "<a href='reset_password.php?token=$token'>Recuperar contraseña</a>";
                    } else {
                        $errors[] = "Error al actualizar el token. Intenta de nuevo.";
                    }
                }
            } else {
                $errors[] = "No se encontró ningún usuario con ese correo.";
            }
        } else {
            $errors[] = "Error en la consulta. Intenta de nuevo.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperar Contraseña</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .recovery-container {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 90%;
    }
    .recovery-container h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    .recovery-container label {
      display: block;
      margin: 10px 0 5px;
    }
    .recovery-container input[type="email"] {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    .recovery-container button {
      width: 100%;
      padding: 10px;
      margin-top: 20px;
    }
    .error {
      color: red;
      margin-bottom: 10px;
    }
    .message {
      color: green;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="recovery-container">
    <h2>Recuperar Contraseña</h2>
    <?php 
      if (!empty($errors)) {
          echo '<div class="error"><ul>';
          foreach($errors as $error) {
              echo '<li>' . htmlspecialchars($error) . '</li>';
          }
          echo '</ul></div>';
      }
      if (!empty($message)) {
          echo '<div class="message">' . $message . '</div>';
      }
    ?>
    <form action="recuperar.php" method="POST">
      <label for="correo">Ingresa tu correo electrónico:</label>
      <input type="email" name="correo" id="correo" required>
      <button type="submit">Enviar enlace de recuperación</button>
    </form>
    <p>Recuerda, si ya tienes cuenta, <a href="../login.html">inicia sesión</a></p>
  </div>
</body>
</html>

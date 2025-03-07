<?php
// archivos php/reset_password.php
session_start();
require_once "config.php";

$errors = [];
$message = "";
$token = isset($_GET['token']) ? $_GET['token'] : '';

if (empty($token)) {
    $errors[] = "Token inválido.";
} else {
    // Verificar que el token exista y no haya expirado
    $sql = "SELECT id, reset_expiration FROM usuarios WHERE reset_token = :token";
    if ($stmt = $pdo->prepare($sql)) {
        $stmt->bindParam(":token", $token, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() == 1) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (strtotime($user['reset_expiration']) < time()) {
                $errors[] = "El token ha expirado. Solicita un nuevo enlace de recuperación.";
            }
        } else {
            $errors[] = "Token inválido.";
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && empty($errors)) {
    $new_password = trim($_POST['new_password']);
    $confirm_password = trim($_POST['confirm_password']);

    if (empty($new_password)) {
        $errors[] = "Por favor, ingresa una nueva contraseña.";
    }
    if (empty($confirm_password)) {
        $errors[] = "Por favor, confirma la nueva contraseña.";
    }
    if ($new_password !== $confirm_password) {
        $errors[] = "Las contraseñas no coinciden.";
    }

    if (empty($errors)) {
        $hash = password_hash($new_password, PASSWORD_DEFAULT);
        // Actualizar la contraseña y eliminar el token
        $sql_update = "UPDATE usuarios SET contrasena = :contrasena, reset_token = NULL, reset_expiration = NULL WHERE reset_token = :token";
        if ($stmt_update = $pdo->prepare($sql_update)) {
            $stmt_update->bindParam(":contrasena", $hash, PDO::PARAM_STR);
            $stmt_update->bindParam(":token", $token, PDO::PARAM_STR);
            if ($stmt_update->execute()) {
                $message = "Contraseña actualizada exitosamente. Ahora puedes <a href='../login.html'>iniciar sesión</a>.";
            } else {
                $errors[] = "Error al actualizar la contraseña. Inténtalo de nuevo.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restablecer Contraseña</title>
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
    .reset-container {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 90%;
    }
    .reset-container h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    .reset-container label {
      display: block;
      margin: 10px 0 5px;
    }
    .reset-container input[type="password"] {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    .reset-container button {
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
  <div class="reset-container">
    <h2>Restablecer Contraseña</h2>
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
    <?php if (empty($message) && empty($errors)) { ?>
    <form action="reset_password.php?token=<?php echo htmlspecialchars($token); ?>" method="POST">
      <label for="new_password">Nueva contraseña:</label>
      <input type="password" name="new_password" id="new_password" required>
      
      <label for="confirm_password">Confirmar nueva contraseña:</label>
      <input type="password" name="confirm_password" id="confirm_password" required>
      
      <button type="submit">Restablecer contraseña</button>
    </form>
    <?php } ?>
  </div>
</body>
</html>

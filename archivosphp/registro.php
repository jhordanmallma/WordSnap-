<?php
// archivos php/registro.php
session_start();
require_once "config.php"; // Asegúrate de que config.php está en el mismo directorio

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir y limpiar datos del formulario
    $correo = trim($_POST['correo']);
    $contrasena = trim($_POST['contrasena']);
    $confirm_password = trim($_POST['confirm_password']);

    // Validación de datos
    if (empty($correo)) {
        $errors[] = "Por favor ingresa un correo electrónico.";
    } elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Por favor ingresa un correo electrónico válido.";
    }
    if (empty($contrasena)) {
        $errors[] = "Por favor ingresa una contraseña.";
    }
    if (empty($confirm_password)) {
        $errors[] = "Por favor confirma tu contraseña.";
    }
    if ($contrasena !== $confirm_password) {
        $errors[] = "Las contraseñas no coinciden.";
    }

    // Verificar si el correo ya está registrado
    if (empty($errors)) {
        $sql = "SELECT id FROM usuarios WHERE correo = :correo";
        if ($stmt = $pdo->prepare($sql)) {
            $stmt->bindParam(":correo", $correo, PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $errors[] = "El correo ya está registrado.";
            }
        } else {
            $errors[] = "Error al preparar la consulta.";
        }
    }

    // Si no hay errores, proceder a registrar el usuario
    if (empty($errors)) {
        $hash = password_hash($contrasena, PASSWORD_DEFAULT);
        $sql = "INSERT INTO usuarios (correo, contrasena) VALUES (:correo, :contrasena)";
        if ($stmt = $pdo->prepare($sql)) {
            $stmt->bindParam(":correo", $correo, PDO::PARAM_STR);
            $stmt->bindParam(":contrasena", $hash, PDO::PARAM_STR);
            if ($stmt->execute()) {
                // Registro exitoso: redirigir a la página de inicio de sesión
                header("Location: ../login.html");
                exit;
            } else {
                $errors[] = "Algo salió mal. Por favor, inténtalo de nuevo.";
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
  <title>Registro de Usuario</title>
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
    .register-container {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 90%;
    }
    .register-container h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    .register-container label {
      display: block;
      margin: 10px 0 5px;
    }
    .register-container input[type="email"],
    .register-container input[type="password"] {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    .register-container button {
      width: 100%;
      padding: 10px;
      margin-top: 20px;
    }
    .error {
      color: red;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="register-container">
    <h2>Registro de Usuario</h2>
    <?php 
      if (!empty($errors)) {
          echo '<div class="error"><ul>';
          foreach($errors as $error) {
              echo '<li>' . htmlspecialchars($error) . '</li>';
          }
          echo '</ul></div>';
      }
    ?>
    <form action="registro.php" method="POST">
      <label for="correo">Correo electrónico:</label>
      <input type="email" name="correo" id="correo" required>
      
      <label for="contrasena">Contraseña:</label>
      <input type="password" name="contrasena" id="contrasena" required>
      
      <label for="confirm_password">Confirmar contraseña:</label>
      <input type="password" name="confirm_password" id="confirm_password" required>
      
      <button type="submit">Registrarse</button>
    </form>
    <p>¿Ya tienes cuenta? <a href="../login.html">Inicia sesión</a></p>
  </div>
</body>
</html>

<?php
session_start();
require_once "config.php";

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];
    
    // Consulta para obtener los datos del usuario
    $sql = "SELECT id, contrasena, intentos, bloqueado_hasta FROM usuarios WHERE correo = :correo";
    if($stmt = $pdo->prepare($sql)){
        $stmt->bindParam(":correo", $correo, PDO::PARAM_STR);
        $stmt->execute();
        
        if($stmt->rowCount() == 1){
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Verificar si la cuenta está bloqueada
            $bloqueado_hasta = $user['bloqueado_hasta'];
            if(!is_null($bloqueado_hasta) && strtotime($bloqueado_hasta) > time()){
                $remaining = strtotime($bloqueado_hasta) - time();
                echo "Cuenta bloqueada. Intenta nuevamente en " . ceil($remaining/60) . " minutos.";
                exit;
            }
            
            // Verificar la contraseña
            if(password_verify($contrasena, $user['contrasena'])){
                // Credenciales correctas, reiniciamos el contador de intentos y desbloqueamos la cuenta
                $sql_update = "UPDATE usuarios SET intentos = 0, bloqueado_hasta = NULL WHERE id = :id";
                $stmt_update = $pdo->prepare($sql_update);
                $stmt_update->bindParam(":id", $user['id'], PDO::PARAM_INT);
                $stmt_update->execute();
                
                // Se establece la sesión y se redirige al usuario
                $_SESSION['user_id'] = $user['id'];
                
                // Quitar o comentar el echo para evitar que se envíe contenido antes de la cabecera
                // echo "Inicio de sesión exitoso. Bienvenido!";
            
                // Descomentar la redirección
                header("Location: ../index.html");
                exit;
            }
            else {
                // Contraseña incorrecta: se incrementa el contador de intentos
                $intentos = $user['intentos'] + 1;
                $sql_update = "UPDATE usuarios SET intentos = :intentos WHERE id = :id";
                $stmt_update = $pdo->prepare($sql_update);
                $stmt_update->bindParam(":intentos", $intentos, PDO::PARAM_INT);
                $stmt_update->bindParam(":id", $user['id'], PDO::PARAM_INT);
                $stmt_update->execute();
                
                // Si se superan los 3 intentos, se bloquea la cuenta durante 15 minutos
                if($intentos >= 3){
                    $bloqueoTiempo = date("Y-m-d H:i:s", strtotime("+15 minutes"));
                    $sql_bloqueo = "UPDATE usuarios SET bloqueado_hasta = :bloqueado_hasta WHERE id = :id";
                    $stmt_bloqueo = $pdo->prepare($sql_bloqueo);
                    $stmt_bloqueo->bindParam(":bloqueado_hasta", $bloqueoTiempo, PDO::PARAM_STR);
                    $stmt_bloqueo->bindParam(":id", $user['id'], PDO::PARAM_INT);
                    $stmt_bloqueo->execute();
                    echo "Cuenta bloqueada por múltiples intentos fallidos. Intenta nuevamente en 15 minutos.";
                } else {
                    echo "Correo o contraseña incorrectos. Intentos fallidos: " . $intentos;
                }
            }
        } else {
            echo "Correo o contraseña incorrectos.";
        }
    }
} else {
    header("Location: ../login.html");
    
    exit;
}
?>

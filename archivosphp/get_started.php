<?php
session_start();
if(isset($_SESSION['user_id'])){
    // Si el usuario ya ha iniciado sesión, redirige a la página principal
    header("Location: ../index.html");
    exit;
} else {
    // Si el usuario no está autenticado, redirige a la página de registro (Sign Up)
    header("Location: registro.php");
    exit;
}
?>
<?php
header("Access-Control-Allow-Origin: *"); // Cho phép mọi Frontend truy cập
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "luminahome_db";
$username = "root";
$password = ""; 


try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    echo json_encode(["error" => "Lỗi kết nối: " . $exception->getMessage()]);
    exit();
}
?>
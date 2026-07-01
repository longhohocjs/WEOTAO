<?php
include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $query = "SELECT * FROM products ORDER BY id DESC";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        
        $products = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row['specs'] = json_decode($row['specs']);
            $products[] = $row;
        }
        echo json_encode($products);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Lỗi: " . $e->getMessage()]);
    }
}
?>
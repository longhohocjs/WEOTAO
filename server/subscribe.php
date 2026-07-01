<?php
include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $email = isset($input['email']) ? trim($input['email']) : '';

    // 1. Kiểm tra email có trống không
    if (empty($email)) {
        echo json_encode(["status" => "error", "message" => "Vui lòng nhập địa chỉ email."]);
        exit();
    }

    // 2. Kiểm tra định dạng email hợp lệ
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Định dạng email không hợp lệ."]);
        exit();
    }

    try {
        // 3. Kiểm tra xem email này đã đăng ký trước đó chưa
        $check_query = "SELECT id FROM subscribers WHERE email = :email LIMIT 1";
        $check_stmt = $conn->prepare($check_query);
        $check_stmt->bindParam(':email', $email);
        $check_stmt->execute();

        if ($check_stmt->rowCount() > 0) {
            echo json_encode(["status" => "error", "message" => "Email này đã được đăng ký nhận tin trước đó rồi ạ."]);
            exit();
        }

        // 4. Tiến hành lưu vào database
        $query = "INSERT INTO subscribers (email) VALUES (:email)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Đăng ký nhận bản tin LuminaHome thành công!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Có lỗi xảy ra, vui lòng thử lại sau."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Lỗi hệ thống: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Phương thức không hợp lệ."]);
}
?>
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $message = isset($input['message']) ? trim($input['message']) : '';

    if (empty($message)) {
        echo json_encode(["reply" => "Xin chào! Bạn cần tư vấn về dòng chip Intel nào?"]);
        exit();
    }

    $lowercasedMessage = mb_strtolower($message, 'UTF-8');
    $reply = "";

    // Logic trả lời tự động dựa trên từ khóa Chip Intel
    if (strpos($lowercasedMessage, 'chào') !== false || strpos($lowercasedMessage, 'hi') !== false) {
        $reply = "Xin chào! Tôi là trợ lý AI chuyên về phần cứng Intel. Tôi có thể giúp gì cho cấu hình máy tính của bạn?";
    } elseif (strpos($lowercasedMessage, 'giá') !== false || strpos($lowercasedMessage, 'bao nhiêu') !== false) {
        $reply = "Dạ hiện tại bên mình đang có các dòng: Ultra 9 285K giá 16.490.000đ, Ultra 7 265K giá 11.290.000đ và dòng siêu máy chủ Xeon Platinum chuyên dụng ạ.";
    } elseif (strpos($lowercasedMessage, 'ultra') !== false || strpos($lowercasedMessage, 'ai') !== false) {
        $reply = "Dòng Intel Core Ultra mới tích hợp sẵn nhân NPU (Neural Processing Unit) xử lý AI cục bộ cực mạnh, giúp tăng tốc độ render video, chạy chatbot offline và tiết kiệm điện năng hơn.";
    } elseif (strpos($lowercasedMessage, 'xeon') !== false || strpos($lowercasedMessage, 'server') !== false) {
        $reply = "Intel Xeon là dòng chip chuyên dụng cho máy chủ (Server), giả lập đồ họa hoặc ảo hóa với số nhân luồng cực khủng và hỗ trợ bộ nhớ sửa lỗi ECC để chạy liên tục 24/7.";
    } else {
        $reply = "Cảm ơn câu hỏi của bạn. Bạn có thể hỏi các từ khóa như 'giá cả', 'tính năng AI của Core Ultra' hoặc 'dòng chip Xeon máy chủ' để tôi tư vấn chính xác nhé!";
    }

    echo json_encode(["reply" => $reply]);
}
?>
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

// Kiểm tra xem đã định nghĩa trong config chưa, nếu chưa mới dùng chuỗi rỗng
$apiKey = defined('GEMINI_API_KEY') ? GEMINI_API_KEY : "AQ.Ab8RN6KGMB77QWWAAQOGbpdNJzrKVE0LwI34ui9ZWmeK4XOEJQ";

if (empty($apiKey)) {
    echo json_encode(["reply" => "Lỗi hệ thống: Chưa cấu hình API Key trong file config."]);
    exit();
}

$apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . $apiKey;

// =========================================================
// KHỐI KIẾN THỨC CHUẨN TỪ APPLE (KNOWLEDGE BASE - IPHONE 17)
// =========================================================
$appleKnowledge = "
[THÔNG TIN CÁC PHIÊN BẢN & CẤU HÌNH CHIP]:
- iPhone 17 & iPhone 17 Slim (Air): Tích hợp dòng Chip A19 (tiến trình 3nm thế hệ mới), tối ưu hiệu năng đồ họa và xử lý mượt mà các tác vụ Apple Intelligence.
- iPhone 17 Pro & iPhone 17 Pro Max: Sở hữu siêu chip A19 Pro cùng cấu hình RAM được nâng cấp lên 12GB mạnh mẽ nhất từ trước đến nay, chuyên dụng cho việc chạy các mô hình AI cục bộ phức tạp.

[THÔNG TIN MÀN HÌNH PROMOTION TRÊN TOÀN BỘ CÁC DÒNG]:
- Toàn bộ iPhone 17 Series (bao gồm cả bản tiêu chuẩn và bản Slim) đều được trang bị màn hình Super Retina XDR hỗ trợ công nghệ ProMotion 120Hz mượt mà.
- Màn hình thế hệ mới được trang bị lớp phủ kính cường lực chống phản chiếu ánh sáng siêu việt, chống trầy xước vượt trội hơn hẳn lớp Ceramic Shield cũ.

[THÔNG TIN ACTION BUTTON & CẢM BIẾN LỰC]:
- Toàn bộ dòng iPhone 17 Series sở hữu Action Button tích hợp cảm biến đa phản hồi lực xúc giác (Haptic Feedback). Nhấn giữ để kích hoạt nhanh: Chế độ im lặng, Mở Camera, Bật đèn pin, Ghi âm tức thì hoặc Chạy các phím tắt tự động (Shortcuts).

[THÔNG TIN ĐỘT PHÁ VỀ CAMERA]:
- Camera Trước (Selfie): Toàn bộ 4 phiên bản iPhone 17 Series đều sở hữu cảm biến trước nâng cấp lên 24 megapixel (6 thấu kính), cho ảnh chụp chân thực và sắc nét vượt bậc.
- iPhone 17 Pro Max sở hữu hệ thống ba camera sau đều đạt độ phân giải 48 megapixel, bao gồm cả ống kính góc siêu rộng và ống kính telephoto zoom quang học.

[THÔNG TIN KIẾN TRÚC DYNAMIC ISLAND MỚI]:
- Riêng dòng iPhone 17 Pro Max được Apple tinh chỉnh thu nhỏ diện tích cụm Dynamic Island đáng kể nhờ công nghệ thấu kính kim loại (Metalens) mới cho hệ thống Face ID, giải phóng thêm không gian hiển thị trên màn hình.

[THÔNG TIN PHÂN PHỐI & GIÁ BÁN THAM KHẢO]:
- iPhone 17 (Tiêu chuẩn): Màn hình 6.1 inch. Giá khởi điểm từ 22.999.000đ.
- iPhone 17 Slim / Air (Siêu mỏng): Phiên bản hoàn toàn mới với thiết kế siêu mỏng nhẹ, sang trọng, màn hình 6.6 inch. Giá khởi điểm từ 28.999.000đ.
- iPhone 17 Pro: Màn hình 6.3 inch, khung Titanium cứng cáp, RAM 12GB. Giá từ 28.999.000đ.
- iPhone 17 Pro Max: Màn hình 6.9 inch cực đại, Dynamic Island thu nhỏ, RAM 12GB. Giá từ 34.999.000đ.
";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $message = isset($input['message']) ? trim($input['message']) : '';

    if (empty($message)) {
        echo json_encode(["reply" => "Dạ shop em xin chào! Anh/chị cần em tư vấn thông tin gì về siêu phẩm iPhone 17 Series vừa ra mắt ạ?"]);
        exit();
    }

    // Cấu hình System Instruction bao gồm CẢ tính cách VÀ toàn bộ kiến thức cứng của iPhone 17
    $systemPrompt = "Bạn là trợ lý AI bán hàng chuyên nghiệp tại Apple Store. Nhiệm vụ của bạn là tư vấn cho khách hàng dựa trên dữ liệu chính thức sau:\n\n" . 
                    $appleKnowledge . "\n\n" .
                    "QUY TẮC TRẢ LỜI:\n" .
                    "1. Khách hàng có thể viết tắt/sai chính tả như 'Phone 17', 'ip17', 'pro max', 'slim', 'air'... Hãy hiểu là họ đang hỏi về sản phẩm trong dữ liệu.\n" .
                    "2. Chỉ trả lời dựa vào thông tin được cung cấp ở trên. Không tự bịa thông số.\n" .
                    "3. Nếu khách hỏi vấn đề nằm ngoài dữ liệu (như chip Intel, hãng khác, hoặc nhờ viết code...), hãy từ chối lịch sự và hướng họ hỏi về các phiên bản, màn hình ProMotion, camera, Dynamic Island hoặc giá bán của iPhone 17.\n" .
                    "4. Trả lời ngắn gọn, tinh tế, tối đa 2-3 câu. Xưng hô thân thiện, lễ phép.";

    // Cấu trúc JSON phẳng, chuẩn hóa để gửi lên Gemini API
    $data = [
        "contents" => [
            [
                "parts" => [
                    ["text" => $message] // Chỉ gửi duy nhất câu hỏi của khách ở đây
                ]
            ]
        ],
        "systemInstruction" => [
            "parts" => [
                ["text" => $systemPrompt] // Ép toàn bộ kiến thức và luật vào hệ thống tư duy của AI
            ]
        ],
        "generationConfig" => [
            "temperature" => 0.3, // Để 0.3 giúp AI vừa đủ linh hoạt nhận diện từ viết tắt, vừa không nói nhảm
            "maxOutputTokens" => 300
        ]
    ];

    // --- GỌI API GEMINI BẰNG CURL ---
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Bỏ qua xác thực SSL nếu server local lỗi
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        echo json_encode(["reply" => "Dạ, hệ thống kết nối đang bận, anh/chị vui lòng thử lại sau giây lát ạ!"]);
        exit();
    }

    // Giải mã dữ liệu JSON nhận được từ Gemini
    $result = json_decode($response, true);

    if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
        $aiReply = $result['candidates'][0]['content']['parts'][0]['text'];
        echo json_encode(["reply" => trim($aiReply)]);
    } else {
        // BẬT DEBUG: Trả về toàn bộ lỗi thực tế để biết tại sao không gọi được sang Google
        echo json_encode([
            "reply" => "Dạ, hiện tại hệ thống đang gặp lỗi kết nối API.",
            "debug_error_curl" => $curlError,                 // Kiểm tra lỗi mạng mạng cURL
            "debug_http_code" => curl_getinfo($ch, CURLINFO_HTTP_CODE), // Kiểm tra mã phản hồi (200, 400, 403, 404)
            "debug_raw_response" => $result                   // Xem chi tiết lỗi Google trả về (Sai key, sai model...)
        ]);
    }
}

?>
import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTheme } from "./context/ThemeContext";
import { useCart } from "./context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Camera,
  Mic,
  Flashlight,
  Settings,
  Palette,
  Monitor,
  Layers,
  Sliders,
  ArrowRight,
  RotateCcw,
  Music,
  VolumeX,
  Sun,
  Moon,
  Smartphone,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
  Battery,
  Cpu,
  Sparkles,
  CreditCard,
  Truck,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

function App() {
  // Danh sách các cam kết dịch vụ (Value Propositions)
  const benefits = [
    {
      icon: <Truck size={28} />,
      title: "Giao hàng miễn phí",
      desc: "Nhận hàng nhanh chóng tận nhà hoàn toàn miễn phí cho mọi đơn hàng.",
    },
    {
      icon: <CreditCard size={28} />,
      title: "Trả góp linh hoạt",
      desc: "Hỗ trợ trả góp lãi suất 0% qua thẻ tín dụng hoặc các ví điện tử liên kết.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Bảo hành chính hãng",
      desc: "Yên tâm mua sắm với chế độ bảo hành 1 đổi 1 trong 12 tháng tại các trung tâm ủy quyền.",
    },
    {
      icon: <HelpCircle size={28} />,
      title: "Hỗ trợ 24/7",
      desc: "Đội ngũ chuyên viên kỹ thuật luôn sẵn sàng giải đáp mọi thắc mắc của bạn.",
    },
  ];

  // Danh sách các cột liên kết ở Footer
  const footerLinks = [
    {
      title: "Khám Phá",
      links: ["iPhone 16 Pro", "iPhone 16", "Phụ kiện"],
    },
    {
      title: "Dịch Vụ Apple",
      links: ["Store Online", "Trade In", "Trả góp 0%", "Ứng dụng"],
    },
    {
      title: "Tài Khoản",
      links: ["Quản lý ID", "Tài khoản "],
    },
    {
      title: "Giá Trị Cốt Lõi",
      links: [
        "Môi trường",
        "Trải nghiệm người dùng",
        "Quyền riêng tư",
        "Tính năng ẩn",
      ],
    },
  ];

  const models = [
    {
      id: "standard",
      name: "iPhone 17 Pro",
      tagline: "Sức mạnh vượt trội. Vừa vặn lòng bàn tay.",
      price: "Từ 32.890.000đ",
      screen: "6.3 inch",
      displayTech: "Super Retina XDR",
      chip: "Chip A19 Pro",
      battery: "Thời gian xem video Lên đến 31 giờ",
      img: "https://i.postimg.cc/26X8Ywzw/iphone-17-pro-cam-01.png", // Thay bằng ảnh thực tế
    },
    {
      id: "plus",
      name: "iPhone 17 Pro Max",
      tagline: "Màn hình lớn hơn. Pin bền bỉ hơn.",
      price: "Từ 35.590.000đ",
      screen: "6.9 inch",
      displayTech: "Super Retina XDR",
      chip: "Chip A19 Pro",
      battery: "Thời gian xem video lên đến 37 giờ",
      img: "https://24hstore.vn/images/products/2025/09/10/large/iphone-17-pro-max-xanh-01.png", // Thay bằng ảnh thực tế
    },
  ];

  const { theme, toggleTheme } = useTheme();
  const {
    cart,
    wishlist,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    toggleWishlist,
  } = useCart();

  // Hiệu ứng AOS

  useEffect(() => {
    AOS.init({
      duration: 800, // thời gian animation
      once: true, // chỉ chạy 1 lần
    });
  }, []);

  const [products, setProducts] = useState([]);

  const [performanceMode, setPerformanceMode] = useState("stock");

  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isWishlistModalOpen, setWishlistModalOpen] = useState(false);

  const [isChatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      text: "Xin chào! Tôi là AI cố vấn công nghệ Apple. Bạn cần tư vấn thông số hay so sánh giữa các phiên bản iPhone 17, 17 Pro hay 17 Pro Max?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const colorOptions = [
    {
      id: "cosmic-std",
      name: "Cam Vũ Trụ",
      code: "#E65C00",
      img: "https://i.postimg.cc/26X8Ywzw/iphone-17-pro-cam-01.png", // Thay bằng ảnh Cam của bạn
    },
    {
      id: "blue-std",
      name: "Xanh Đậm",
      code: "#1E293B",
      img: "https://24hstore.vn/images/products/2025/09/10/large/iphone-17-pro-xanh-01.png", // Thay bằng ảnh Xanh của bạn
    },
    {
      id: "silver-std",
      name: "Bạc",
      code: "#E2E8F0",
      img: "https://24hstore.vn/images/products/2025/09/10/large/iphone-17-pro-bac-01.png", // Ảnh nền trắng bạn vừa gửi
    },
  ];

  // State lưu màu đang chọn (Mặc định là Cam Vũ Trụ)
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const actionList = [
    {
      id: "silent",
      name: "Chế độ im lặng",
      icon: <VolumeX size={16} />,
      islandText: "Im lặng",
      islandSub: "Đang bật",
      islandColor: "text-red-500",
    },
    {
      id: "shazam",
      name: "Nhận dạng nhạc",
      icon: <Music size={16} />,
      islandText: "Listening...",
      islandSub: "Shazam",
      islandColor: "text-blue-400",
    },
    {
      id: "camera",
      name: "Camera",
      icon: <Camera size={16} />,
      islandText: "Camera",
      islandSub: "Sẵn sàng",
      islandColor: "text-emerald-400",
    },
    {
      id: "torch",
      name: "Đèn pin",
      icon: <Flashlight size={16} />,
      islandText: "Đèn pin",
      islandSub: "Bật",
      islandColor: "text-amber-400",
    },
    {
      id: "shortcut",
      name: "Phím tắt",
      icon: <Settings size={16} />,
      islandText: "Shortcuts",
      islandSub: "Đang chạy",
      islandColor: "text-purple-400",
    },
  ];

  // Lấy danh sách sản phẩm từ Backend PHP (Dữ liệu MySQL động)
  // useEffect(() => {
  //   fetch("https://weotao-backend.onrender.com/products.php")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!data.error) setProducts(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Lỗi kết nối API sản phẩm:", err);
  //       setLoading(false);
  //     });
  // }, []);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("https://weotao-backend.onrender.com/products.php")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Lỗi kết nối máy chủ");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       // Đảm bảo dữ liệu nhận về là một mảng
  //       if (data && !data.error) {
  //         setProducts(data);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Lỗi kết nối API sản phẩm:", err);
  //       setLoading(false);
  //     });
  // }, []);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 17 ",
      price: "23.290.000đ",
      image:
        "https://24hstore.vn/images/products/2025/09/10/large/iphone-17-xanh-lam-01.png", // Bạn thay bằng link ảnh của bạn
      description: "Thiết kế siêu mỏng cánh thế hệ mới.",
      specs: {
        screen: "6.3 inch Super Retina XDR",
        Chipset: "Apple A19",
        Camera: "48MP Dual Fusion",
        "Bộ nhớ": "256GB",
      },
    },
    {
      id: 2,
      name: "iPhone 17 Pro ",
      price: "32.899.000đ",
      image:
        "https://24hstore.vn/images/products/2025/09/10/large/iphone-17-pro-bac-01.png", // Bạn thay bằng link ảnh của bạn
      description: "Khung viền Titanium cấp độ 5.",
      specs: {
        screen: "6.3 inch Super Retina XDR",
        Chipset: "Apple A19 Pro",
        Camera: "48MP Dual Fusion",
        "Bộ nhớ": "256GB",
      },
    },

    {
      id: 3,
      name: "iPhone 17 Pro Max",
      price: "35.590.000đ",
      image:
        "https://24hstore.vn/images/products/2025/09/10/large/iphone-17-pro-max-xanh-01.png", // Bạn thay bằng link ảnh của bạn
      description: "Đỉnh cao công nghệ thế hệ mới.",
      specs: {
        screen: "6.3 inch Super Retina XDR",
        Chipset: "Apple A19 Pro Extreme",
        Camera: "48MP Pro Fusion",
        "Bộ nhớ": "256GB",
      },
    },
  ]);

  const gradientStyles = {
    stock: "from-blue-500 via-indigo-500 to-purple-500",
    turbo: "from-pink-500 via-rose-500 to-amber-500",
    extreme: "from-teal-500 via-cyan-500 to-blue-600",
  };

  // Tính tổng tiền của toàn bộ giỏ hàng
  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [activeAction, setActiveAction] = useState(actionList[1]); // Mặc định chọn Shazam giống ảnh demo
  const [clickTrigger, setClickTrigger] = useState(0);

  // Giả lập hiệu ứng bấm nút tự động khi đổi tính năng
  const handleSelectAction = (action) => {
    setActiveAction(action);
    setClickTrigger((prev) => prev + 1); // Kích hoạt hiệu ứng giật/bấm nút
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0A0A0A] dark:text-gray-100 font-sans transition-colors duration-500">
        <Helmet>
          <title>iPhone 17 Series - Kỷ Nguyên Apple Intelligence</title>
          <meta
            name="description"
            content="Khám phá siêu phẩm iPhone 17, 17 Pro, 17 Pro Max tích hợp chip Apple A19 Pro xử lý AI tiên tiến."
          />
        </Helmet>

        {/* 1. NAVBAR */}
        <nav className="border-b border-gray-200 dark:border-neutral-800 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            WEO<span className="text-slate-800 dark:text-white">TÁO</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#products"
              className="hover:opacity-90 font-medium text-sm hidden sm:inline-block transition-colors"
            >
              Sản phẩm
            </a>

            {/* Wishlist Icon */}
            <div
              onClick={() => setWishlistModalOpen(true)}
              className="relative cursor-pointer group"
              title="Sản phẩm yêu thích"
            >
              <Heart
                size={20}
                className="text-white-500 transition-transform group-hover:scale-110"
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Cart Icon */}
            <div
              onClick={() => setCartModalOpen(true)}
              className="relative cursor-pointer group"
              title="Xem giỏ hàng"
            >
              <ShoppingCart
                size={20}
                className="text-white-600 transition-transform group-hover:scale-110"
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-neutral-800 hover:scale-110 transition-transform cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="text-black-400" size={20} />
              ) : (
                <Moon className="text-white-600" size={20} />
              )}
            </button>
          </div>
        </nav>

        {/* 2. HERO SECTION */}
        <header className="relative w-full min-h-[650px] lg:min-h-[850px] flex flex-col justify-between px-6 md:px-12 lg:px-24 py-16 lg:py-20 overflow-hidden transition-colors duration-500 bg-white text-slate-900 dark:bg-neutral-950 dark:text-white">
          {/* 3. Ô SỐ 3: HÌNH ẢNH BACKGROUND TÁCH BIỆT (CẢ 2 ĐỀU PHÓNG TO CĂN GIỮA) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
            {/* ẢNH LIGHT MODE: Phóng to toàn màn hình, căn giữa và hòa trộn triệt tiêu nền trắng */}
            <img
              src="/img/b9506195-5cb0-4c35-b704-94e85697c808.png"
              alt="iPhone Light Background"
              className="block dark:hidden w-full h-full object-cover lg:object-contain transform scale-110 lg:scale-105 object-center opacity-90 mix-blend-multiply transition-all duration-500"
              draggable="false"
              fetchpriority="high"
            />

            {/* ẢNH DARK MODE: Ảnh góc nghiêng nghệ thuật phóng to căn giữa nguyên bản */}
            <img
              src="https://i.postimg.cc/vBySBFmW/Screenshot-2025-09-24-at-12-20-51-PM-1.webp"
              className="hidden dark:block w-full h-full object-cover lg:object-contain transform scale-110 lg:scale-105 object-center opacity-55 mix-blend-screen transition-all duration-500"
              draggable="false"
              fetchpriority="high"
            />

            {/* Lớp phủ gradient thông minh làm mờ chân trang (Light: mờ trắng, Dark: mờ đen) */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/10 dark:from-neutral-950 dark:via-transparent dark:to-neutral-950" />
          </div>

          {/* 4. Ô SỐ 4: TIÊU ĐỀ LỚN CHẠY DÀI TRÊN CÙNG */}
          <div className="relative z-10 w-full max-w-7xl mx-auto pt-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none drop-shadow-sm">
              <span
                data-aos="fade-right"
                className="block text-slate-900 dark:text-white mb-4"
              >
                iPhone 17 Pro Max
              </span>
              <span
                data-aos="fade-right"
                className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-indigo-400 dark:from-orange-100 dark:to-indigo-700"
              >
                Sức Mạnh Titanium
              </span>
            </h1>
          </div>

          {/* KHỐI NẰM DƯỚI: CHỨA ĐOẠN VĂN (Ô 1) VÀ FORM ĐĂNG KÝ (Ô 2) TRẢI RỘNG HAI BÊN */}
          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-10 lg:mt-32 pb-6">
            {/* 1. Ô SỐ 1: ĐOẠN VĂN MÔ TẢ PHÍA DƯỚI BÊN TRÁI (ĐÃ ĐỒNG BỘ nét chữ mảnh cao cấp) */}
            <div className="lg:col-span-5 xl:col-span-5 max-w-md lg:p-0">
              <p className="text-base sm:text-lg text-slate-9-600 dark:text-neutral-100 leading-relaxed font-light transition-colors duration-500">
                Trải nghiệm cấu trúc vật liệu mới siêu nhẹ kết hợp cùng hệ thống
                camera ẩn đỉnh cao. Đăng ký nhận thông tin ngay hôm nay để nhận
                đặc quyền mở bán sớm nhất.
              </p>
            </div>

            {/* Khoảng trống ở giữa để chừa không gian hiển thị */}
            <div className="hidden lg:block lg:col-span-2 xl:col-span-3"></div>

            {/* 2. Ô SỐ 2: KHỐI FORM ĐĂNG KÝ EMAIL KÝ NHẬN PHÍA DƯỚI BÊN PHẢI */}
            <div className="lg:col-span-5 xl:col-span-4 w-full bg-slate-100/90 border border-slate-200 dark:bg-neutral-900/50 dark:border-neutral-800 backdrop-blur-xl p-5 rounded-3xl shadow-xl dark:shadow-2xl">
              <p className="text-sm font-bold mb-3 text-slate-700 dark:text-neutral-300">
                Nhập email đăng ký nhận thông tin ưu đãi/đối tác:
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const emailEl = e.target.elements.heroEmail;
                  const emailValue = emailEl.value.trim();
                  if (!emailValue) return;

                  fetch("http://localhost/textTKLDP/server/subscribe.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: emailValue }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      alert(data.message);
                      if (data.status === "success") emailEl.value = "";
                    })
                    .catch(() => alert("Hệ thống gặp sự cố gửi mail."));
                }}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <input
                  name="heroEmail"
                  type="email"
                  required
                  placeholder="Nhập email kỹ sư/đối tác..."
                  className="flex-1 px-4 py-3 bg-white border border-slate-300 text-slate-900 dark:bg-neutral-950 dark:border-neutral-800 dark:text-gray-100 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-md whitespace-nowrap"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* 3. PRODUCTS SECTION */}
        <section
          id="products"
          className="px-6 lg:px-24 py-16 bg-white dark:bg-[#0E0E0E] transition-colors duration-500"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Khám Phá Danh Mục iPhone 17 Series
            </h2>
          </div>
          <div className="min-h-[600px] w-full">
            {loading ? (
              <div className="text-center py-12 font-medium text-blue-600 animate-pulse">
                Đang kết xuất danh mục Apple từ máy chủ...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
                {products.map((product) => {
                  const isFavorite = wishlist.some(
                    (item) => item.id === product.id,
                  );
                  return (
                    <div
                      key={product.id}
                      data-aos="fade-up"
                      className="group relative rounded-3xl border border-gray-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/20 overflow-hidden hover:bg-white dark:hover:bg-neutral-900/60 hover:-translate-y-1 hover:border-gray-200 dark:hover:border-neutral-700 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/40 transition-all duration-500 ease-out flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-100 w-full overflow-hidden bg-gray-100 dark:bg-neutral-800">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 hover:bg-white dark:hover:bg-black transition-all duration-300"
                          >
                            <Heart
                              size={18}
                              className={`transition-colors duration-300 ${
                                isFavorite
                                  ? "fill-rose-500 text-rose-500"
                                  : "text-gray-600 dark:text-gray-300 group-hover:text-rose-400"
                              }`}
                            />
                          </button>
                        </div>

                        <div className="p-6 space-y-3">
                          <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {product.name}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                            {product.description}
                          </p>

                          <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-gray-400">
                            {product.specs &&
                              Object.entries(product.specs).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="bg-gray-100/70 dark:bg-neutral-800/40 p-2 rounded-lg transition-colors duration-300 group-hover:bg-gray-100 dark:group-hover:bg-neutral-800/70"
                                  >
                                    <span className="font-semibold block text-gray-600 dark:text-gray-300">
                                      {key}
                                    </span>{" "}
                                    <span className="text-gray-700 dark:text-gray-400">
                                      {value}
                                    </span>
                                  </div>
                                ),
                              )}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-gray-100 dark:border-neutral-800/50 mt-4 flex items-center justify-between">
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                          {typeof product.price === "number"
                            ? Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(product.price)
                            : product.price}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:scale-110 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                        >
                          Chọn mua
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
        {/* 4. THÔNG SỐ KĨ THUẬT*/}
        <section
          id="apple-features"
          className="px-6 lg:px-24 py-20 bg-slate-50 dark:bg-[#090909] transition-colors duration-500 overflow-hidden"
        >
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4 animate-pulse">
              <Sparkles size={12} /> Tuyệt Tác Thiết Kế & Công Nghệ
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Đột Phá Diện Mạo. <br className="hidden sm:inline" />
              Tái Định Nghĩa Trải Nghiệm.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
              Khám phá những nâng cấp mang tính bước ngoặt từ lớp vỏ bọc
              Titanium bên ngoài cho đến chiều sâu hiển thị đỉnh cao bên trong.
            </p>
          </div>

          {/* Cấu trúc BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* =========================================================
                                         COLOR
           ========================================================= */}
            <div
              data-aos="fade-right"
              className="group relative md:col-span-2 rounded-3xl border border-gray-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/30 p-8 flex flex-col md:flex-row gap-8 justify-between hover:shadow-2xl transition-all duration-500 ease-out min-h-[380px]"
            >
              {/* Nội dung văn bản & Khối nút chọn màu bên trái */}
              <div className="max-w-xs flex flex-col justify-between relative z-10">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                      Color
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Công nghệ CVD mới thấm sâu hạt màu vào cấu trúc lớp vỏ.
                      Lựa chọn các tùy chọn màu sắc bên dưới để chiêm ngưỡng
                      tuyệt tác thương mại.
                    </p>
                  </div>

                  {/* BỘ 6 NÚT CHỌN MÀU THỰC TẾ */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-neutral-500 uppercase block mb-4">
                      Phiên bản: {selectedColor.name}
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color)}
                          style={{ backgroundColor: color.code }}
                          className={`w-8 h-8 rounded-full cursor-pointer shadow-md transition-all duration-300 relative ${
                            selectedColor.id === color.id
                              ? "scale-110 ring-2 ring-indigo-500 ring-offset-4 dark:ring-offset-neutral-900"
                              : "hover:scale-105 opacity-80 hover:opacity-100"
                          } ${color.code === "#FFFFFF" ? "border border-gray-300" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Khu vực hiển thị hình ảnh Điện thoại (Luôn hiển thị rõ nét) */}
              <div className="relative flex-1 h-64 md:h-full min-h-[260px] bg-slate-100 dark:bg-neutral-950/20 rounded-2xl border border-slate-200/40 dark:border-neutral-800/30 overflow-hidden flex items-center justify-center">
                <img
                  src={selectedColor.img}
                  alt={selectedColor.name}
                  className="w-full h-full object-contain p-4 transition-all duration-500 ease-in-out transform scale-100"
                />
              </div>
            </div>
            {/* =========================================================
                                         DISPLAY
           ========================================================= */}
            <div
              data-aos="fade-left"
              className="group relative rounded-3xl border border-gray-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/30 p-8 flex flex-col justify-between hover:shadow-2xl  transition-all duration-500 ease-out overflow-hidden min-h-[440px]"
            >
              {/* Layout Nội dung chính phía trên */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Display
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  Tích hợp OLED Tandem siêu sáng cùng ProMotion 120Hz, mang lại
                  độ phân giải cực hạn.
                </p>

                {/* Ảnh Demo Màn hình */}
                <div className="w-full h-60 rounded-xl bg-slate-100 dark:bg-neutral-950/50 border border-slate-200/40 dark:border-neutral-800/30 overflow-hidden relative">
                  <img
                    src="https://i.postimg.cc/7hHYrZT4/ai-ios-small.jpg"
                    alt="Display Demo"
                    className="w-full h-full object-fit"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-semibold">
                      Tái định nghĩa độ nét
                    </span>
                  </div>
                </div>
              </div>

              {/* KHU VỰC BIẾN ĐỔI: BUTTON <=> BOX THÔNG SỐ (Sử dụng Framer Motion) */}
              <div className="mt-6 relative min-h-[44px] flex items-end">
                <AnimatePresence mode="wait">
                  {!isExpanded ? (
                    /* TRẠNG THÁI 1: NÚT BẤM XEM THÔNG SỐ CHƯA KÍCH HOẠT */
                    <motion.button
                      key="specs-btn"
                      layoutId="specs-container"
                      onClick={() => setIsExpanded(true)}
                      className="w-full py-3 px-4 bg-blue-600 bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer group/btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>Xem thông số kĩ thuật</span>
                      <ArrowRight
                        size={14}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </motion.button>
                  ) : (
                    /* TRẠNG THÁI 2: BIẾN THÀNH BOX THÔNG SỐ (ẨN HOÀN TOÀN CHỮ NÚT CŨ) */
                    <motion.div
                      key="specs-box"
                      layoutId="specs-container"
                      className="w-full bg-slate-100 dark:bg-neutral-950/80 rounded-xl p-4 border border-slate-200/60 dark:border-neutral-800/60 space-y-3 z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      {/* Tiêu đề nhỏ bên trong box */}
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-neutral-800">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-black  dark:text-white font-semibold">
                          Thông số kĩ thuật
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn hành vi bubble event
                            setIsExpanded(false);
                          }}
                          className="text-gray-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-[10px] font-medium"
                        >
                          <RotateCcw size={10} /> Thu nhỏ
                        </button>
                      </div>

                      {/* Danh sách thông số gọn gàng hiển thị thay thế */}
                      <div className="space-y-1.5 text-xs text-slate-700 dark:text-neutral-300 font-mono">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tấm nền:</span>{" "}
                          <span className="font-semibold text-right">
                            OLED Tandem
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tần số:</span>{" "}
                          <span className="font-semibold text-right">
                            ProMotion 120Hz
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Độ sáng:</span>{" "}
                          <span className="font-semibold text-right">
                            2000 nits (Peak)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Mật độ:</span>{" "}
                          <span className="font-semibold text-right">
                            460 ppi
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
        {/* =========================================================
                                     Dynamic Island
           ========================================================= */}
        <div
          data-aos="fade-up"
          className="group relative md:col-span-3 rounded-3xl border border-gray-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/30 p-8 flex mx-auto -mt-14 mb-20  flex-col lg:flex-row gap-8 justify-between overflow-hidden hover:shadow-2xl transition-all duration-500 min-h-[480px] max-w-[900px]"
        >
          {/* 1. KHỐI BÊN TRÁI: DANH SÁCH MENU TÍNH NĂNG ĐỂ CLICK */}
          <div className="flex flex-col justify-between max-w-sm z-10 pl-0 lg:pl-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                Dynamic Island
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Khu vực tương tác phần cứng được tối ưu diện tích, tự động co
                giãn linh hoạt để cập nhật thông báo và trạng thái theo thời
                gian thực.
              </p>

              {/* Menu dọc mô phỏng theo ảnh mẫu */}
              <div className="flex flex-col gap-2.5">
                {actionList.map((item) => {
                  const isSelected = activeAction.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectAction(item)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 w-fit text-left cursor-pointer ${
                        isSelected
                          ? "bg-slate-100 text-slate-900 border-slate-300 dark:bg-neutral-800 dark:text-white dark:border-neutral-700 shadow-sm"
                          : "bg-transparent text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-neutral-300"
                      }`}
                    >
                      <span
                        className={`p-1.5 rounded-lg ${isSelected ? "bg-blue-500 text-white" : "bg-slate-100 dark:bg-neutral-800 text-gray-400"}`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. KHỐI BÊN PHẢI: MÔ PHỎNG ĐIỆN THOẠI + DYNAMIC ISLAND CO GIÃN THEO NÚT BẤM */}
          <div className="flex-1 relative min-h-[320px]  flex items-center justify-center lg:justify-end pr-0 lg:pr-12">
            {/* Đường nối chỉ định phát ra từ icon đang chọn bay vào nút vật lý */}
            <div className="absolute right-[225px] top-[53%] transform -translate-y-1/2 z-20 hidden sm:flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAction.id}
                  initial={{ scale: 0, x: -20, opacity: 0 }}
                  animate={{ scale: 1, x: 0, opacity: 1 }}
                  exit={{ scale: 0, x: 20, opacity: 0 }}
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-lg border border-neutral-700"
                >
                  {activeAction.icon}
                </motion.div>
              </AnimatePresence>
              <div className="w-12 h-[1px] bg-gradient-to-r from-black/50 via-black to-black dark:from-white/20 dark:to-white border-dashed border-t" />
            </div>

            {/* Khung viền sườn máy và Màn hình trước phối cảnh 2.5D */}
            <div className="relative w-[240px] h-[440px] bg-neutral-900 rounded-[42px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[4px] border-neutral-800 flex flex-col overflow-hidden">
              {/* NÚT VẬT LÝ ACTION BUTTON (Ở sườn trái của máy - hiển thị phía góc trên) */}
              <motion.div
                key={`btn-${clickTrigger}`}
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-[22%] w-[3px] h-7 bg-neutral-600 rounded-r shadow-md z-30"
              />
              {/* Hai nút âm lượng phía dưới nút Action */}
              <div className="absolute left-0 top-[31%] w-[3px] h-10 bg-neutral-700 rounded-r" />
              <div className="absolute left-0 top-[42%] w-[3px] h-10 bg-neutral-700 rounded-r" />

              {/* MÀN HÌNH ĐIỆN THOẠI BÊN TRONG */}
              <div className="w-full h-full rounded-[34px] bg-gradient-to-b from-emerald-950/40 via-neutral-950 to-neutral-950 relative p-3 pt-5 flex flex-col items-center">
                {/* ĐẢO THÔNG MINH DYNAMIC ISLAND (Co giãn động cực mượt theo State nút bấm) */}
                <motion.div
                  layout
                  animate={{
                    width: activeAction.id === "silent" ? 190 : 180,
                    height: 34,
                    borderRadius: 99,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="bg-black border border-neutral-800 shadow-xl px-3 flex items-center justify-between z-20 overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeAction.id}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="w-full flex items-center justify-between gap-2"
                    >
                      {/* Cụm Icon & Text hiển thị nội dung trên đảo */}
                      <div className="flex items-center gap-2">
                        <span className={activeAction.islandColor}>
                          {activeAction.icon}
                        </span>
                        <span className="text-[10px] text-white font-medium tracking-wide whitespace-nowrap">
                          {activeAction.islandText}
                        </span>
                      </div>

                      {/* Trạng thái bên phải Đảo thông minh */}
                      <div className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider whitespace-nowrap pr-1">
                        {activeAction.islandSub}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Số giờ nền mờ đặc trưng màn hình khóa iOS */}
                <div className="text-white/10 font-light text-[64px] font-sans tracking-tighter select-none mt-16 leading-none">
                  9:41
                </div>

                {/* Hiệu ứng sóng âm phát ra âm thầm nếu chọn tính năng phát nhạc */}
                {activeAction.id === "shazam" && (
                  <div className="absolute bottom-16 flex items-center gap-1">
                    {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, h * 6, 8] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="w-[2px] bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 5. COMPARE MODELS */}
        <section className="px-6 lg:px-24 py-24 bg-white dark:bg-[#090909] transition-colors duration-500">
          <div className="max-w-6xl mx-auto">
            {/* Tiêu đề */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                Chọn phiên bản phù hợp với bạn.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                So sánh chi tiết cấu hình và kích thước giữa hai phiên bản tiêu
                chuẩn thế hệ mới.
              </p>
            </div>

            {/* Khung so sánh dạng 2 Cột */}
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
            >
              {models.map((model) => (
                <div
                  key={model.id}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Hình ảnh mô hình (Hover sẽ phóng to nhẹ) */}
                  <div className="w-full h-72 flex items-center justify-center mb-8 relative">
                    <img
                      src={model.img}
                      alt={model.name}
                      className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Tên & Giá */}
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
                    {model.name}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-neutral-400 mb-3 font-medium px-6">
                    {model.tagline}
                  </p>
                  <span className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-neutral-900 px-4 py-1.5 rounded-full mb-8">
                    {model.price}
                  </span>

                  <hr className="w-full border-slate-100 dark:border-neutral-800/60 mb-8" />

                  {/* Danh sách thông số so sánh trực quan */}
                  <div className="w-full space-y-8 text-slate-800 dark:text-neutral-200">
                    {/* 1. Màn hình */}
                    <div className="flex flex-col items-center">
                      <Smartphone className="text-black-500 mb-2" size={22} />
                      <span className="text-lg font-black">{model.screen}</span>
                      <span className="text-xs text-gray-400 mt-0.5">
                        {model.displayTech}
                      </span>
                    </div>

                    {/* 2. Cấu hình Chip */}
                    <div className="flex flex-col items-center">
                      <Cpu className="text-black-500 mb-2" size={22} />
                      <span className="text-base font-bold px-4">
                        {model.chip}
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5">
                        Tiến trình 3nm tối tân
                      </span>
                    </div>

                    {/* 3. Thời lượng Pin */}
                    <div className="flex flex-col items-center">
                      <Battery className="text-black-500 mb-2" size={22} />
                      <span className="text-base font-bold">
                        {model.battery}
                      </span>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className="mt-12 w-full max-w-xs space-y-3">
                    <button className="w-full py-3 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs rounded-full shadow-md transition-colors cursor-pointer">
                      Mua ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. MODAL GIỎ HÀNG */}
        {isCartModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setCartModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-neutral-800">
              <div className="p-6 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
                <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <ShoppingCart size={20} className="text-black-600" /> Giỏ Hàng
                </h2>
                <button
                  onClick={() => setCartModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl bg-gray-100 dark:bg-neutral-800 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[50vh] custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm">
                    Giỏ hàng trống.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800/60 bg-slate-50/50 dark:bg-neutral-900/20"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-black-600 font-bold">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="p-1 rounded bg-gray-200 dark:bg-neutral-800 cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-1 rounded bg-gray-200 dark:bg-neutral-800 cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="p-6 border-t border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950/40">
                <div className="flex justify-between text-base font-bold mb-4">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-black-600">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalCartPrice)}
                  </span>
                </div>
                <button
                  onClick={() =>
                    alert("Đang kết nối cổng VNPay đặt trước sản phẩm!")
                  }
                  disabled={cart.length === 0}
                  className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm shadow-lg hover:scale-90  disabled:opacity-50 cursor-pointer text-center"
                >
                  Đặt Hàng Ngay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 7. MODAL SẢN PHẨM YÊU THÍCH */}
        {isWishlistModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setWishlistModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-neutral-800">
              <div className="p-6 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
                <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <Heart size={20} className="text-black-500 fill-black-500" />{" "}
                  Danh Sách Yêu Thích
                </h2>
                <button
                  onClick={() => setWishlistModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl bg-gray-100 dark:bg-neutral-800 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[55vh] custom-scrollbar">
                {wishlist.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm">
                    Chưa có sản phẩm yêu thích.
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800/60 bg-slate-50/50 dark:bg-neutral-900/20"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 space-y-0.5">
                        <h4 className="font-bold text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-black-600 font-bold ">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            addToCart(item);
                            setWishlistModalOpen(false);
                            setCartModalOpen(true);
                          }}
                          className="px-3 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold hover:scale-110  cursor-pointer"
                        >
                          Mua ngay
                        </button>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="p-2 text-gray-500 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 8. FOOTER */}
        <footer className="bg-slate-50 dark:bg-[#090909] border-t border-slate-200/60 dark:border-neutral-800/60 transition-colors duration-500 font-sans">
          {/* =========================================================
           KHỐI 1: VALUE PROPOSITIONS (TIỆN ÍCH MUA HÀNG)
         ========================================================= */}
          <div className="max-w-7xl mx-auto px-6 lg:px-24 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-slate-200/60 dark:border-neutral-800/40">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start space-y-3 group"
              >
                <div className="p-3 text-white dark:text-black bg-black dark:bg-white rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 group-hover:-translate-y-1 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {benefit.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          {/* =========================================================
           KHỐI 2: DISCLAIMER & SITEMAP LINKS
         ========================================================= */}
          <div className="max-w-7xl mx-auto px-6 lg:px-24 py-12">
            {/* Văn bản ghi chú nhỏ (Disclaimers) kiểu Apple */}
            <div className="text-[11px] text-gray-400 dark:text-neutral-500 leading-relaxed space-y-2 mb-12 pb-8 border-b border-slate-200/60 dark:border-neutral-800/40">
              <p>
                * Các tính năng sẽ được phát hành dần thông qua các bản cập nhật
                phần mềm iOS 18 và iOS 19 tiếp theo. Một số ngôn ngữ và vùng
                quốc gia có thể cần thêm thời gian để tối ưu hóa hoàn toàn.
              </p>
              <p>
                1. Màn hình Super Retina XDR có các góc bo tròn theo đường cong
                đẹp mắt và nằm bo gọn trong một hình chữ nhật chuẩn. Khi đo theo
                hình chữ nhật chuẩn.
              </p>
              <p>
                2. Thời lượng pin phụ thuộc vào cấu hình mạng và nhiều yếu tố
                khác, kết quả thực tế có thể thay đổi tùy theo quá trình sử dụng
                cá nhân.
              </p>
            </div>

            {/* Sơ đồ liên kết trang (Sitemap Grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {footerLinks.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                    {section.title}
                  </h5>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href="#"
                          className="text-xs text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:underline transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* =========================================================
              KHỐI 3: COPYRIGHT & LEGAL INFO
           ========================================================= */}
            <div className="pt-8 border-t border-slate-200/60 dark:border-neutral-800/40 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-400 dark:text-neutral-500">
              <div>
                Copyright © 2026 Bảo lưu mọi quyền. Thiết kế giao diện bởi ứng
                dụng của bạn.
              </div>

              {/* Các liên kết chính sách pháp lý */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-end">
                <a
                  href="#"
                  className="hover:text-slate-700 dark:hover:text-neutral-300 hover:underline"
                >
                  Chính Sách Bảo Mật
                </a>
                <span className="text-slate-200 dark:text-neutral-800">|</span>
                <a
                  href="#"
                  className="hover:text-slate-700 dark:hover:text-neutral-300 hover:underline"
                >
                  Điều Khoản Sử Dụng
                </a>
                <span className="text-slate-200 dark:text-neutral-800">|</span>
                <a
                  href="#"
                  className="hover:text-slate-700 dark:hover:text-neutral-300 hover:underline"
                >
                  Bán Hàng và Hoàn Tiền
                </a>
                <span className="text-slate-200 dark:text-neutral-800">|</span>
                <a
                  href="#"
                  className="hover:text-slate-700 dark:hover:text-neutral-300 hover:underline"
                >
                  Sơ Đồ Trang Web
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;

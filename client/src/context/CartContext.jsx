import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("lumina_cart")) || [],
  );
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("lumina_wishlist")) || [],
  );

  useEffect(() => {
    localStorage.setItem("lumina_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("lumina_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // 1. Thêm vào giỏ hàng (Đã có)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 2. Tăng số lượng sản phẩm trực tiếp trong giỏ
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // 3. Giảm số lượng sản phẩm (Nếu về 0 thì tự động xóa khỏi giỏ)
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // 4. Xóa hẳn sản phẩm ra khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isExist = prevWishlist.some((item) => item.id === product.id);
      if (isExist) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

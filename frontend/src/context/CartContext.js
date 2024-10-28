import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

export const CartConextProvider = ({children}) =>{
    const [cart,setCart] = useState([]);

    // Add to cart function
    const addToCart = (product) =>{
        // check if already product exist in cart
        const existingProduct = cart.find(item => item.id === product.id);

        if(existingProduct){
            // if product exist then increase quantity
            setCart(cart.map(item => item.id === product.id ? {...item,quantity:item.quantity+1}:item))
        }else{
            // if product doesnt exist add it to cart
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    }

    // Remove from Cart function
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // Update item quantity in cart
    const updateCartItemQuantity = (productId, quantity) => {
        setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
        ));
    };

    // Clear Cart function
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );

}



// Contains backend / server functions only 
// The frontend apis should be used at component level if needed

import swell from './backend'

// Add an item to the current cart
export const addToCart = async ({product_id, quantity, options, purchase_options}) => {
    const cart = await swell.cart.addItem({product_id,quantity,options,purchase_options});
    return cart;
}

// Remove item from the current cart
export const removeFromCart = async ({id}) => {
    const cart = await swell.cart.removeItem(id);
    return cart;
}

// Change the product quantity
export const updateProductQuantity = async (id,quantity) => {
    const cart = await swell.cart.updateItem(id,{quantity})
    return cart;
}   

// Empty the compleet current cart
export const emptyCart = async () => {
    const cart = await swell.cart.setItems([]);
    return cart;
}

// get a cart by id (via localstorage)
export const getCart = async (id) => {
    const cart = await swell.get(`/carts/${id}`);
    return cart;
}

// List all carts that arent abandoned 
// Usefull for debugging
export const getAllCarts = async () => {
    const carts = await swell.get('/carts', {
        where: { active: true }
      });
      return carts
}
// add to cart button

'use client';

import swell from '../../../lib/swell/frontend'
import { useCart, useCartFlyout } from '../../../state/store';
import { useRouter } from 'next/router';
import styles from './product.module.scss';

const CartButton = ({product}) => {
    const cartState = useCart();
    const cartFlyout = useCartFlyout();


    async function addToCart(productId) {
        await swell.cart.addItem({
          product_id: productId,
          quantity: 1,
        })
        const cart = await swell.cart.get()
        cartState.setCartID(cart.id);
        window.scrollTo(0, 0)
        cartFlyout.openFlyout();
      }

      return (
        <>
        <button className={styles.button}
        onClick={()=> addToCart(product.id)}>
          Add To Cart
        </button>
        </>
      )

}

export default CartButton;
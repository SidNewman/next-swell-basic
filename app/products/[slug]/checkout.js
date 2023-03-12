// instant checkout button

'use client';
import { NextResponse } from 'next/server'
import swell from '../../../lib/swell/frontend'
import styles from './product.module.scss';

const Checkout = ({product}) => {

  const {purchase_options} = product || {}
  const {subscription} = purchase_options || {}

    async function checkout(productId) {
        await swell.cart.setItems([])
        await swell.cart.addItem({
          product_id: productId,
          quantity: 1,
        })
        const cart = await swell.cart.get()
        window.open(cart.checkout_url)
      }

      if(subscription?.active){
        return (
          <>
          </>
        )
      } else {
        return (
          <button className={styles.button} onClick={() => checkout(product.id)}>Checkout Now</button>
      )
      }
}

export default Checkout;
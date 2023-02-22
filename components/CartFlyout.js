'use client'

import swell from '../lib/swell/frontend';
import { useEffect, useState } from 'react';
import { useCartFlyout } from '../state/store';
import styles from './CartFlyout.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import { Closer } from './icons';

const CartFlyout = () => {

    const cartFlyout = useCartFlyout()
    const [cart, setCart] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()


    useEffect(() => {
        let _id = localStorage.getItem('cid');
        async function fetchCart() {
          const c = await swell.cart.get()
          setCart(c)
          setIsLoading(false);
        }
        fetchCart();
      }, [cartFlyout,cart]);


      const closeFlyout = () => {
        cartFlyout.closeFlyout()
    }


    const removeItem = async (id) => {
        const r  = await swell.cart.removeItem(id)
  }

  const openFullCart = () => {
      closeFlyout()
      router.push('/cart')
  }

       
  return (
    <div className={`${styles.wrapper} ${cartFlyout.isFlyoutOpen() ? styles.open : styles.closed}`}>
        {/* get the current cart items */}
        {isLoading && <div className={styles.loading}><h2>Your cart is loading...</h2></div>}
        {cart && 
        <>
        {cart.item_quantity == 0 ? <><div onClick={closeFlyout}><Closer /></div> <h2>Your cart is empty</h2></> : 
        
        <>
        <div onClick={closeFlyout}><Closer /></div>
        <h2>Cart</h2>
<h3 className={styles.totals}>£{cart.sub_total}</h3>
<div className={styles.lineItems}>
    {/* loop through items in cart */}
    {cart && cart.items.map((item,i)=>{
        const {name, images, slug, options, quantity} = item.product || {}
        return (
            <div id={item.id} key={i} className={styles.lineItem}>
                <div className={styles.lineItem_Media}><Image style={{objectFit: 'cover'}} src={images[0].file.url} layout="fill" alt={name} /></div>
                <div className={styles.lineItem_Info}>
                    <h3>{name}</h3>
                    <h3>Quantity: {item.quantity}</h3>
                    <h3>Price: {item.price_total}</h3>
                    <div className={styles.dangerPrompt} onClick={()=> removeItem(item.id)}>Remove</div>
                </div>
            </div>
        )
      
    })}
    <div className={`${styles.flyoutFooter}`}>
        <Link onClick={closeFlyout} className={styles.button} href="/cart">VIEW FULL CART</Link>
        <a className={styles.button} href={cart.checkout_url}>CHECKOUT</a>
    </div>
</div>
    
     
        </>
        }
        </>
        
        }
       
    </div>
)

}

export default CartFlyout;
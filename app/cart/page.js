'use client'

import swell from '../../lib/swell/frontend';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './cart.module.scss';

const CartPage =  () => {
    
    const [cart, setCart] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let _id = localStorage.getItem('cid');
        async function fetchCart() {
          const c = await swell.cart.get()
          setCart(c)
          setIsLoading(false);
        }
        fetchCart();
      }, [cart]);

      const removeItem = async (id) => {
            const r  = await swell.cart.removeItem(id)
      }


    return (
        <div className={styles.wrapper}>
            {/* get the current cart items */}
            {isLoading && <div className={styles.loading}><h1>Your cart is loading...</h1></div>}
            {cart && 
            <>
            {cart.item_quantity == 0 ? <h1>Your cart is empty</h1> : 
            
            <>
            
            <h1>Cart</h1>
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, pariatur minima! A veritatis mollitia dolores animi molestias odit quod. Illum adipisci assumenda doloribus laboriosam recusandae sint ad esse porro consequuntur enim dolor deserunt ipsa, suscipit magni ea dolore inventore accusamus vel quibusdam, sunt rerum ab nemo. Adipisci, tenetur velit. Quos!</p>
            <br />
            <div className={styles.allCart}>
            <div className={styles.lineItems}>
                {cart.items.map((item,i)=>{
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
            </div>
            <div className={`${styles.cartSummary} blue`}>
                <div className={styles.title}>SUBTOTAL: £{cart.sub_total}</div>
                <div className={styles.title}>ITEM COUNT: {cart.item_quantity}</div>
                <Link className={styles.button} href="/products">BROWSE PRODUCTS</Link>
                <a className={styles.button} href={cart.checkout_url}>CHECKOUT</a>
                {/* <p>Shipping calculated at next step</p> */}
            </div>
            </div>
            </>
            }
            </>
            
            }
           
        </div>
    )
}

export default CartPage;
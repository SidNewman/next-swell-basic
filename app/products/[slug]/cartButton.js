// add to cart button

'use client';

import swell from '../../../lib/swell/frontend'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart, useCartFlyout } from '../../../state/store';
import { useRouter } from 'next/router';
import styles from './product.module.scss';

const CartButton = ({product}) => {

    const cartState = useCart();
    const cartFlyout = useCartFlyout();
    const [account, setAccount] = useState();
    const {purchase_options} = product || {}
    const {subscription} = purchase_options || {}

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

      async function createSubscribtion(productId){
        await swell.subscriptions.create({
          product_id: productId,
        })
      }

      useEffect(()=>{
        async function getInfo(){
            const a = await swell.account.get()
            if(a == null || a == undefined){
                router.push('/account/login')
            } else {
                setAccount(a);
            }
        }
        getInfo()
    },[])

      // user must be logged in to start a new subscription
      if(subscription?.active){
        if(account){
          return (
            <>
            <button className={styles.button} onClick={()=> createSubscribtion(product.id)}>
              Subscribe now
            </button>
            </>
          )
        } else {
          return (
            <>
            <Link href="/account">
            <button className={styles.button}>
              You must login or create an account to subscribe
            </button>
            </Link>
            </>
          )
        }  
      } else {
        return (
          <>
          <button className={styles.button}
          onClick={()=> addToCart(product.id)}>
            Add To Cart
          </button>
          </>
        )
      }
}

export default CartButton;
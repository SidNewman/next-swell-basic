'use client'

import { useEffect, useState } from 'react'
import swell from '../../../lib/swell/frontend';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from '../account.module.scss'

const Orders = () => {

    const [account, setAccount] = useState();
    const [orders, setOrders] = useState();
    const router = useRouter()

    const requestOrders = (id) => {
        fetch('/api/account/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              _id: id
            }),
          })
            .then((res) => res.json())
            .then((res)=>{
                setOrders(res.results);
            })
            .catch((error) => {
              console.log(error)
            })
    }

    useEffect(()=>{
        async function getInfo(){
            const a = await swell.account.get()
            if(a == null || a == undefined){
                router.push('/account/login')
            } else {
                setAccount(a);
                requestOrders(a.id)
            }
        }
        getInfo()
    },[])

    const logUserOut = async () => {
        const a = await swell.account.logout()
        return a
    }

    const reRouteUser = () => {
        alert('successfully logged out')
        router.push('/account/login')
    }

    return(
        <div className={styles.container}>
            {!account ? 
            <></>
            : 
            <>
                <h1 className="mt-20 mb-20 text-4xl font-bold text-center uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">Account</h1>
                <div className={`${styles.innerAccount} ${styles.orderHistory}`}>
                <aside className={styles.panel}>
                    <div className='flex justify-between'>
                    <h1>hello {account.first_name}!</h1>
                    <button onClick={()=>{
                        logUserOut().then(reRouteUser)
                    }}>log out</button>
                    </div>
                    <br/>
                    <Link href="/account">
                    <button style={{lineHeight: '3'}}>
                        Back to dashboard
                    </button>
                    </Link>
                </aside>

                <section className='col-span-2'>
                    <h2>Your Orders</h2>
                    <div className='grid grid-cols-3 gap-8'>
                        {
                        orders ? orders.map((o,i)=>{
                            return (
                                <div className={styles.orderList} key={i}>
                                    <div className={styles.orderMeta}>
                                        <div><b># {o.number}</b></div>
                                        <div><b>{new Date(o.date_created).toDateString()}</b></div>
                                        <div><b>£{o.sub_total}</b></div>
                                    </div>
                                    <div>
                                        {o.items.map((item,i)=>{
                                            const {product_name, images, slug, options, quantity} = item || {}
                                            return (
                                                <div id={item.id} key={i} className={styles.orderItem}>
                                                        <div className={styles.orderItem_Info}>
                                                            <h3>{product_name}</h3>
                                                            <h3>Quantity: {item.quantity}</h3>
                                                            <h3>Price: £{item.price_total}</h3>
                                                        </div>
                                                    </div>
                                                    )
                
                                        })}
                                    </div>
                                    { 
                                    o.subscription_id ? 
                                    <div className={`${styles.orderMeta} ${styles.orderFooter}`}>
                                    <Link href={`/account/subscription/${o.subscription_id}`}>
                                        <button>Manage</button>
                                    </Link>
                                   </div>
                                : 
                                <div className={`${styles.orderMeta} ${styles.orderFooter}`}>
                                <button>Re-order</button>
                            </div>
                                    }
                                   
                                    
                                </div>
                            )
                        })
                        : 'Loading...'
                        }
                    </div>
                </section>
                </div>
            </>
           }
        </div>
    ) 
}

export default Orders
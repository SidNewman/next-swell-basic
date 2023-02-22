'use client'

import { useEffect, useState } from 'react'
import swell from '../../lib/swell/frontend';
import { useIsLoggedIn } from '../../state/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Breaker } from './breaker';
import { Info } from './info';
import { Shipping } from './shipping';
import { Payment } from './payment';


import styles from './account.module.scss'

const Account = () => {

    const isLoggedIn = useIsLoggedIn()
    const [account, setAccount] = useState();
    const router = useRouter()


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

    const logUserOut = async () => {
        const a = await swell.account.logout()
        return a
    }

    const reRouteUser = () => {
        alert('successfully logged out')
        router.push('/account/login')
    }

    console.log(account)

    return(
        <div className={styles.container}>
            {!account ? 
            <></>
            : 
            <>
                <h1 className="mt-20 mb-20 text-4xl font-bold text-center uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">Account</h1>
                <div className={styles.innerAccount}>
                <aside className={styles.panel}>
                    <div className={styles.intro}>
                    <h1>hello {account.first_name}!</h1>
                    <button onClick={()=>{
                        logUserOut().then(reRouteUser)
                    }}>log out</button>
                    </div>
                    <h2>Welcome to your account dashboard</h2>
                    <Info account={account} />
                </aside>

                <aside className={styles.panel}>
                    {account.shipping ?
                    <>
                    <Shipping id={account.id} _account={account} />
                    </>
                    :
                    <>
                    <p>You haven't added your shipping info yet.</p>
                    <br/>
                    <p>Your shipping info will appear here after you make your first order.</p>
                    </>
                    }
                </aside>


                <aside className={styles.panel}>
                    {account.order_count > 0 ? 
                    <div className='flex justify-center items-center h-full'>
                        <Link href="/account/orders"><button className='p-8 text-2xl'>View orders</button></Link>
                    </div>
                    : <div className='flex justify-center items-center h-full'>
                    <Link href="/products"><button className='p-8 text-2xl'>No Orders yet :(</button></Link>
                </div>
                    }
                </aside>

                <aside className={`${styles.panel} ${styles.yellow}`}>
                    {account.billing ?
                    <>
                    <Payment account={account} />
                    </>
                    : <>Your card info will appear here after you make your first purchase.</>
                    }
                </aside>
                </div>
            </>
           }
        </div>
    ) 
}

export default Account
import { useState } from "react"

import styles from './account.module.scss'

export const Info = ({account}) => {
    return (
        <>
            <div className='flex justify-between mb-4'>
                <p className={styles.infoTitle}>Quick info</p>
                <button>edit</button>
            </div>
            <div><span>{account.name}</span></div>
            <div><span>{account.email}</span></div>
            <br/>
            <div>Email marketing: <span>{account.email_optin ? 'On' : 'Off'}</span></div>      
            <div>Credit Balance: <span>{account.balance}</span></div>      
            <div>Total Order count: <span>{account.order_count}</span></div>
        </>
    )
}
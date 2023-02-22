import { useState } from "react"

import styles from './account.module.scss'

export const Payment = ({account}) => {
    return (
        <>
         <div className='flex justify-between mb-4'>
            <p className={styles.infoTitle}>Payment Methods</p>
         </div>
         <div><span>{account.billing.card.brand}</span></div>
         <div><span>xxxx xxxx xxxx {account.billing.card.last4}</span></div>
          <div><span>{account.billing.card.exp_month}</span> / <span>{account.billing.card.exp_year}</span></div>
        </>
    )
}
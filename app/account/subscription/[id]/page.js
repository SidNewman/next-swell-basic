'use client'
import swell from '../../../../lib/swell/frontend';
import { useEffect, useState } from 'react';

const ManageSubPage = () => {

    useEffect(()=>{
        async function getInfo(){
            const o = await swell.subscriptions.list()
            setOrders(o);
        }
        getInfo()
    },[])
  
    return (
        <div>
            <h1>Manage Subscription</h1>
           
           

        </div>
    )
}

export default ManageSubPage;
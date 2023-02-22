import Image from 'next/image'
import Layout from '../../../components/layout';
import parse from 'html-react-parser';
import Images from './images';

import CartButton from './cartButton';
import Checkout from './checkout';

import styles from './product.module.scss'

import {getProductBySlug} from '../../../lib/swell/products'

const PDP = async ({params}) => {
    const product = await getProductBySlug(params.slug);

    return (
        <div className="flex flex-col justify-between">
          <div className={styles.contentWrapper}>
            <div className={styles.imageWrapper}>
             <Images product={product} />
            </div>
            <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
              <div className={styles.stickyContainer}>
                <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
                  {product.name}
                </h1>
                <h1 className="mt-3 text-4xl font-bold sm:text-3xl sm:tracking-tight lg:text-3xl">
                  £{product.price}
                </h1>
                {product.variants && product.variants.count > 1 ? 
                <div className='mt-4'>
                <h2 className='mb-0'>Select an option:</h2>
                 <select>
                   {product.variants.results.map((variant,i)=>{
                    //  console.log(variant)
                     return (
                       <option key={i} value={variant.id}>{variant.name}</option>
                     )
                   })}
                 </select>
               </div>
               
               : null
              }
               
                <CartButton product={product} />
                <Checkout product={product} />
                <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
                  Description
                </div>
                <div>
                  {parse(`${product.description}`)}
                </div>
              </div>
              </div>
          </div>
        </div>
    )
   
}

export default PDP;
'use client';

import Image from 'next/image'
import Link from 'next/link'

import styles from './ProductCard.module.scss'

export default function ProductCard({ product }) {

  // console.log(product)
  const {options} = product || {}
  
  return (
    <Link href={`/products/${product.slug}`}>
        <div className={`${styles.wrapper}`}>
          <Image
            alt=""
            src={product.images[0].file.url}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="mt-4 flex flex-col items-start justify-between text-base font-medium gap-2">
          <h3>{product.name}</h3>
          <div className={styles.priceDetails}>
            <p>£{product.price}</p>
            {options.length > 0 ? <> <div>|</div>  <p>{options[0].values.length} variants available</p> </>: null}
          </div>
        </div>
    </Link>
  )
}
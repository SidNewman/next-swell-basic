import ProductCard from '../../components/ProductCard'
import {getAllProducts, getProductCats} from '../../lib/swell/products';
import Link from 'next/link';

import styles from './products.module.scss';

const AllProducts = async () => {
    const products = await getAllProducts();
    const cats = await getProductCats();

    return (
        <>
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="sm:py-15 mx-auto max-w-7xl py-16">
              <div className="text-center">
                <p
                  className="mt-1 text-2xl font-bold uppercase text-gray-900"
                  >
                  All Products
                </p>
              </div>
              <div className='mt-8'>
                <p>Filter by category</p>
                <div className='flex gap-6 mt-6 flex-wrap leading-[2.5]'>
                {cats &&
                cats.results.map((c,i) => (
                  <div key={i}>
                    <Link className={styles.filterBy} href={`/products/refine/${c.slug}`}>
                      {c.name}
                    </Link>
                  </div>
                ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-10 mb-36 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products &&
                products.results.map((p) => (
                  <ProductCard product={p} key={p.id} />
                ))}
            </div>
          </div>
        </>
      )
}

export default AllProducts;
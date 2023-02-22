import styles from './home.module.scss'

import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
    return (
        <>
          <div className={styles.hero}>
            <Image src="/img/header1.jpg" alt="demo home hero" layout='fill' style={{objectFit: 'cover'}} />
            <Link href="/account">
            <div className={styles.promoBadge}>10% off your first order when you create an account with us.</div>
            </Link>
          </div>
          <div className={styles.wrapper}>
              <div className="text-center">
                <h1>Welcome to the demo store</h1>
              </div>           
          </div>

          <div className={`${styles.wrapper} ${styles.row} justify-center`}>
            <div className={styles.featuredCat}>
              <Image src="/img/hoodie-tile.jpg" alt="demo product 1" layout='fill' style={{objectFit: 'cover'}} />
            </div>
            <div className='flex flex-col justify-center'>
              <h3>THE BIG CHILL</h3>
              <p>Ease into the season with relaxed essentials.</p>
              <Link href="/products">
              <button>Shop All</button> 
              </Link>
            </div>
          </div>

          <div className={`${styles.wrapper} ${styles.row} blue`}>
            <div className={styles.featuredCat}>
              <Image src="/img/sports-tile.jpg" alt="demo product 1" layout='fill' style={{objectFit: 'cover'}} />
            </div>
            <div className='flex flex-col justify-center'>
              <h3>YOUR MOVE</h3>
              <p>Get set for new adventures in performance-led pieces that move with you.</p>
              <Link href="/products/refine/sports">
            <button>Shop Sportswear</button>       
            </Link>
            </div>
          </div>
        </>
      )
}

export default Home;
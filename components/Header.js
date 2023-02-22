import Link from 'next/link'
import AlertBar from './AlertBar'
import styles from './Header.module.scss'

export default function Header({ scrollHandler }) {
  return (
    <>
    <AlertBar />
    <header className={styles.wrapper}>
      <div className={styles.inner}>
     <div>
       <Link href="/">Home</Link>
       <Link href="/about">About</Link>
       <Link href="/products">Products</Link>
       </div>
       <div>
       <Link href="/account">Account</Link>
       <Link href="/cart">Cart</Link>
     </div>
     </div>
    </header>
    </>
  )
}
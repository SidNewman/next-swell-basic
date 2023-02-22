import CartFlyout from './CartFlyout';
// import { getCart } from '../lib/swell/cart';
import Header from "./Header"

export default async function Layout({ children }) {
  return (
      <>
      <Header />
        <main>{children}</main>
      </>
    )
  }
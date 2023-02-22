import '../styles/globals.css'
import Header from '../components/Header'
import CartFlyout from '../components/CartFlyout'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Asap:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
          <div className='mt-8'>
            {children}
          </div>
          <CartFlyout />
      </body>
    </html>
  )
}

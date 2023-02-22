const About = () => {
    return (
        <>
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="mt-1 text-2xl font-bold uppercase text-gray-900">About</p>
              </div>
              <div className='mt-8'>
                <div className='flex flex-col gap-6 mt-6'>
                <h2>Made with ❤️ using Next &amp; Swell 😍</h2>
                  <p>This demo store uses the <a href="https://www.swell.is/" target="_blank">Swell</a> platform to create an awesome headless ecommerce experience on the JAM stack!</p>
                  <p>The code is setup to use both the backend and frontend apis depending on what your use case is. Paired with the power of Next.js (v13), it provides all ecommerce features you could need, including subscriptions, bundles &amp; customer credit out of the box.</p>
                  <p>So far this build includes:</p>
                  <ul>
                    <li>Displaying products</li>
                    <li>PDP</li>
                    <li>Cart flyout / drawer</li>
                    <li>Cart page</li>
                    <li>Dynamic checkout button</li>
                    <li>Swell hosted checkout</li>
                    <li>Customer account creation</li>
                    <li>Customer account login / dashboard</li>
                    <li>Ability for customers to view their previous orders</li>
                    <li>Next Backend API post only routes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )
}

export default About;
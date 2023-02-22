import ProductCard from '../../../../components/ProductCard'
import swell from '../../../../lib/swell/frontend';

const Page = async ({params}) => {

    const products = await swell.products.list({
      limit: 25,
      page: 1,
      $filters: {
        category: [params.cat],
      }
    })

    return (
        <>
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p
                  className="mt-1 text-2xl font-bold uppercase text-gray-900"
                >
                  All Products within the <span>'{params.cat}'</span> category
                </p>
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

export default Page;
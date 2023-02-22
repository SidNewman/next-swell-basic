const swell = require('swell-node').init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PRIVATE_SWELL_KEY);

// List all products in the store with no filters
export const getAllProducts = async () => {
    const products = await swell.get('/products', {
        where: { active: true },
        limit: 25,
        page: 1,
      });
    return products;
}

// get a single product based on its slug
export const getProductBySlug = async (s) => {
    const product = await swell.get(`/products/${s}`);
    return product;
}

// get a list of products filtered by category
export const getProductsByCat = async (id) => {
    const products = await swell.get(`/categories/${id}`, {
        where: { active: true },
        limit: 25,
        page: 1,
      });
    return products;
}

// get all product categories ready fopr filtering on the front end
export const getProductCats = async () => {
    const c = await swell.get('/categories', {
        where: {
          active: true
        },
        limit: 25,
        page: 1
      });
      return c;
}

// get all products by search terms
export const getProductsBySearch = async (s) => {
    const products = await swell.get('/products', {
        where: { active: true },
        searcxh: s,
        limit: 25,
        page: 1,
      });
    return products;
}

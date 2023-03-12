import swell from './backend';

// Create new subscription for a product
// NOTE: customer must be signed in
export const createNewSub = async (id, pid) => {
    const sub = await swell.post('/subscriptions', {
        account_id: id,
        product_id: pid,
        quantity: 1,
      });
      return sub;
}


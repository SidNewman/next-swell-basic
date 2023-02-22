const swell = require('swell-node').init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PRIVATE_SWELL_KEY);

export default async function handler(req, res) {

    if (req.method !== 'POST') {
      return res.status(404).json({ error: 'must be a POST request' })
    } else {
  
      const {
        body: { _id },
      } = req

    if (!_id) {
      console.warn('No account id provided')
      return res
        .status(404)
        .json({ error: 'Must contain an account id to list the customers orders' })
    }
  
      const orders = await swell.get('/orders', {
        where: {
          account_id: _id,
        },
        limit: 25,
        page: 1,
        });
      res.statusCode = 200
      res.json(orders)
      return orders
    }
    }
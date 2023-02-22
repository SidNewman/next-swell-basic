import swell from 'swell-js';
swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY)

// log the user in and fetch their details2
export default async function handler(req, res) {

    if (req.method !== 'POST') {
      return res.status(404).json({ error: 'must be a POST request' })
    } else {
  
      const {
        body: { email, password },
      } = req

    if (!email || !password) {
      console.warn('No email or password provided')
      return res
        .status(404)
        .json({ error: 'Must contain an email address and password to sign into account' })
    }
    
      const account = await swell.account.login(email, password)
      res.statusCode = 200
      res.json(account)
      return account
    }
    }
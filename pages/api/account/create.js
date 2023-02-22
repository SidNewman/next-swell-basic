const swell = require('swell-node').init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PRIVATE_SWELL_KEY);

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'must be a POST request' })
  } else {

    const {
      body: { email, name, surname, password, marketing },
    } = req

      // honeypot
  if (req.body.fullname !== '') {
    console.warn('Stuck in honey 🍯')
    return res.status(200).json({ status: 202 })
  }

  if (!email || !password) {
    console.warn('No email or password provided')
    return res
      .status(404)
      .json({ error: 'Must contain an email address and password to create an account' })
  }

    const payload = {
      email,
      first_name: name,
      last_name: surname,
      password,
      email_optin: marketing
    }


    const account = await swell.post('/accounts', payload)
    res.statusCode = 200
    res.json(account)
    return account
  }
  }
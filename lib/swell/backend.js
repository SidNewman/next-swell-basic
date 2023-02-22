// default to the backend api to run the store
const swell = require('swell-node');

const SWELL_STORE_ID = process.env.NEXT_PUBLIC_SWELL_STORE_ID
const SWELL_PUBLIC_KEY = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
const SWELL_PRIVATE_KEY = process.env.NEXT_PRIVATE_SWELL_KEY

swell.init(SWELL_STORE_ID, SWELL_PUBLIC_KEY, SWELL_PRIVATE_KEY)

export default swell
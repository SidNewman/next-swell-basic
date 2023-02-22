// Prepare swell for frontend api use
import swell from 'swell-js';

const SWELL_STORE_ID = process.env.NEXT_PUBLIC_SWELL_STORE_ID
const SWELL_PUBLIC_KEY = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
const SWELL_PRIVATE_KEY = process.env.NEXT_PRIVATE_SWELL_KEY

swell.init(SWELL_STORE_ID, SWELL_PUBLIC_KEY)

export default swell
// import swell from './frontend'
import swell from './backend'

export const createNewAccount = async (email,fname,lname, password) => {
    const account = await swell.post('/accounts',{
        email: email,
        first_name: fname,
        last_name: lname,
        password: password
    })
    return account;
}  

// export const customerLogIn = async (email,password) => {
//     const account = await swell.account.login(email,password)
//     return account
// }

// export const customerLogOut = async () => {
//     const account = swell.account.logout()
//     return account
// }

// export const getCustomer = async () => {
//     const account = await swell.account.get()
//     return account
// }
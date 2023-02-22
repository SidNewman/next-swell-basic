import { hookstate, useHookstate } from '@hookstate/core';
import { localstored } from '@hookstate/localstored';

const cartFlyout = hookstate(false);
const isUserLogged = hookstate(false);
const cartSession = hookstate('');

// toggle the cart flyout / cart drawer
export const useCartFlyout = () => {
  const state = useHookstate(cartFlyout)
  return {
    openFlyout() {
      return state.set(true)
    },
    closeFlyout() {
        return state.set(false)
      },
    isFlyoutOpen() {
      return state.get()
    },
  }
}

// controls the users current cart id - persits to local storage
export const useCart = () => {
  const state = useHookstate([{ id: '' }],
        localstored({
            key: 'cid'
        }))
  return{
    setCartID(id){
      return state.set(id)
    },
    getCartID(){
      return state.get()
    }
  }
}


 export const useIsLoggedIn = () => {
  const state = useHookstate(isUserLogged)
  return {
    logIn() {
      return state.set(true)
    },
    logOut() {
        return state.set(false)
      },
    isLoggedIn() {
      return state.get()
    },
  }
 }



// 63729c0d6de5e300136809d1
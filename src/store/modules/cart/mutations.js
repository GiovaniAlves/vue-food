export default {
   ADD_PRODUCTS_CART (state, product) {
      state.products.push({
         qty: 1,
         identify: product.identify,
         product
      })
   },
   REMOVE_PRODUCT_CART (state, product) {
      // Array.filter, como o próprio nome já sugere, serve para filtrar itens de um array
      state.products = state.products.filter((prodCart) => {
         return prodCart.identify !== product.identify
      })
   },
   INCREMENT_QTY_PRODUCT_CART (state, product) {
      // Array.map permite que você aplique uma transformação para cada elemento do seu array
      state.products = state.products.map((prodCart, index) => {
         if (prodCart.identify === product.identify) {
            state.products[index].qty++
         }

         return state.products[index]
      })
   },
   DECREMENT_QTY_PRODUCT_CART (state, product) {
      // Array.map permite que você aplique uma transformação para cada elemento do seu array
      state.products = state.products.map((prodCart, index) => {
         if (prodCart.identify === product.identify) {
            state.products[index].qty--
         }

         if (state.products[index].qty > 0) {
            return state.products[index]
         }
      })
   },
   CLEAR_CART (state) {
      state.products = []
   }
}

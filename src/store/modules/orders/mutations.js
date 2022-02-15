export default {
   SET_ORDERS (state, orders) {
      state.myOrders = orders
   },
   SET_ORDER (state, order) {
      state.myOrders.data = order
   }
}

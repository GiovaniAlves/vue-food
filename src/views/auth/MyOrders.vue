<template>
   <div>
      <div class="my-4">
         <h1 class="title-tenant">Meus Pedidos</h1>
      </div>

      <div class="my-orders my-6">
         <div class="my-table-header mb-3">
            <div class="text-center"><b>Nª Pedido</b></div>
            <div class="text-center"><b>Data</b></div>
            <div class="text-center"><b>Valor Total</b></div>
            <div class="text-center"><b>Detalhes</b></div>
         </div>

         <div
            v-for="(order, index) in myOrderes.data" :key="index"
            class="my-table"
         >
            <div class="text-center">{{ order.identify }}</div>
            <div class="text-center">{{ order.date }}</div>
            <div class="text-center">{{ order.total }}</div>
            <div class="text-center"><a href="detalhes-pedido.html" class="btn btn-success">Detalhes</a></div>
         </div>

      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
   name: 'MyOrders',
   computed: {
      ...mapState({
         myOrderes: state => state.orders.myOrders
      })
   },
   created () {
      this.getMyOrders()
         .catch(() => this.$vToastify.error('Falha ao carregar os pedidos', 'Erro'))
   },
   methods: {
      ...mapActions([
         'getMyOrders'
      ])
   }
}
</script>

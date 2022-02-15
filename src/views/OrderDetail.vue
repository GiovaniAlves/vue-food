<template>
   <div>
      <div class="row my-4 mx-0 details">
         <div class="col-12 mb-2">
            <h1 class="title-tenant h2">Detalhes do Pedido: <strong>{{ order.identify }}</strong></h1>
         </div>
         <div class="col-sm-6">
            <ul class="p-0">
               <li><b>Número:</b> {{ order.identify }}</li>
               <li><b>Total:</b> R$ {{ order.total }}</li>
               <li><b>Data:</b> {{ order.date }}</li>
               <li><b>Status:</b> <span class="badge bg-success text-light p-2">{{ order.status }}</span></li>
            </ul>
         </div>
         <div class="col-sm-6">
            <ul class="p-0">
               <li v-if="order.table.identify">
                  <span>Mesa</span>
                  <ul class="p-0">
                     <li><b>Identificador:</b> {{ order.table.identify }}</li>
                     <li><b>Descrição:</b> {{ order.table.description }}</li>
                  </ul>
               </li>
               <li v-if="order.client.name">
                  <span>Cliente</span>
                  <ul class="p-0">
                     <li><b>Nome:</b> {{ order.client.name }}</li>
                     <li><b>E-mail:</b> {{ order.client.email }}</li>
                  </ul>
               </li>
            </ul>
         </div>
      </div> <!-- details order -->

      <hr>

      <div class="row my-4">
         <div class="col-12">
            <h4>Produtos</h4>
         </div>

         <div
            v-for="(product, index) in order.products" :key="index"
            class="col-12 col-md-6 col-lg-4 my-1"
         >
            <div class="details-card">
               <img class="card-img-top" :src="product.image" :alt="product.name">
               <div class="details-card-body">
                  <h5>{{ product.title }}</h5>
                  <p><b>R$ {{ product.price }}</b></p>
               </div>
            </div>
         </div>

      </div>
      <!-- products order -->
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'DetailOrder',
   props: ['identify'],
   data () {
      return {
         order: {
            identify: '',
            total: '',
            date: '',
            status: '',
            company: {
               name: '',
               image: ''
            },
            table: {
               identify: '',
               description: ''
            },
            client: {
               name: '',
               email: ''
            },
            products: []
         }
      }
   },
   created () {
      console.log(this.identify)
      this.getOrderByIdentify(this.identify)
         .then((response) => {
            this.order = Object.assign(this.order, response.data.data)
         })
         .catch(() => {
            this.$router.push({ name: 'myOrders' })
            this.$vToastify.error('Falha ao carregar o pedido', 'Erro')
         })
   },
   methods: {
      ...mapActions([
         'getOrderByIdentify'
      ])
   }
}
</script>

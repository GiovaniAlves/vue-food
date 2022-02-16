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
                  <span><b>Mesa</b></span>
                  <ul class="p-0">
                     <li>Identificador: {{ order.table.identify }}</li>
                     <li>Descrição: {{ order.table.description }}</li>
                  </ul>
               </li>
               <li v-if="order.client.name">
                  <span><b>Cliente</b></span>
                  <ul class="p-0">
                     <li>Nome: {{ order.client.name }}</li>
                     <li>E-mail: {{ order.client.email }}</li>
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

      <!-- Evaluations -->
      <hr>
      <button
         class="btn btn-success"
         @click="openModalEvaluation">
         Avaliar o Pedido
      </button>

      <modal name="evaluation-order" height="280">
         <div class="px-md-3 py-4 mb-1">
            <h3 class="text-center">Avaliar o pedido: {{ identify }}</h3>
            <strong>Nota:</strong>
            <vue-stars
               v-model="evaluation.stars"
               name="demo"
               :active-color="'#ffdd00'"
               :inactive-color="'#999999'"
               :shadow-color="'#ffff00'"
               :hover-color="'#dddd00'"
               :max="5"
               :readonly="false"
               :char="'★'"
               :inactive-char="''"
               :class="''"
            />
            <div class="form-group">
               <textarea
                  v-model="evaluation.comment"
                  class="form-control" name="comment"
                  cols="50"
                  rows="4"
                  placeholder="Comentário"></textarea>
            </div>
            <button
               @click="sendEvaluation"
               :disabled="loadSendEvaluation"
               class="btn btn-info">
               <span v-if="loadSendEvaluation">Avaliando...</span>
               <span v-else>Avaliar</span>
            </button>
         </div>
      </modal>
      <!-- Evaluations -->
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
            evaluations: [],
            products: []
         },
         evaluation: {
            stars: 1,
            comment: ''
         },
         loadSendEvaluation: false
      }
   },
   created () {
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
         'getOrderByIdentify',
         'evaluationOrder'
      ]),
      hideModalEvaluation () {
         this.$modal.hide('evaluation-order')
      },
      sendEvaluation () {
         this.loadSendEvaluation = true
         const params = {
            identify: this.identify,
            ...this.evaluation
         }

         this.evaluationOrder(params)
            .then((response) => {
               console.log(response.data.data)
               this.order.evaluations.push(response.data.data)
               this.$vToastify.success('Avaliação enviada com sucesso', 'Parabéns')
            })
            .catch(() => {
               this.$vToastify.error('Falha ao enviar a avaliação', 'Erro')
            })
            .finally(() => {
               this.loadSendEvaluation = false
               this.hideModalEvaluation()
            })
      },
      openModalEvaluation () {
         this.$modal.show('evaluation-order')
      }
   }
}
</script>

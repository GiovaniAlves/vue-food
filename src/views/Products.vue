<template>
   <div class="products">
      <!-- About Tenant and Categories -->
      <h1 class="my-4 title-tenant text-center">{{ company.name }}</h1>
      <div class="row">

         <div class="list-categories">
            <a
               @click.prevent="filterByCategory('')"
               class="list-categories__item"
               :style=" categoryInFilter('') "
               href="#"
            >
               <div class="icon"><i class="fas fa-utensils"></i></div>
               <span> Todas </span>
            </a>
            <a
               v-for="(category, index) in company.categories.data" :key="index"
               @click.prevent="filterByCategory(category.identify)"
               :style=" categoryInFilter(category.identify) "
               class="list-categories__item"
               href="#"
            >
               <div class="icon"><i class="fas fa-utensils"></i></div>
               <span> {{ category.name }} </span>
            </a>
         </div>

      </div>
      <!-- Cards Produtos -->
      <div class="row my-4">

         <div v-if="productsCompany.data.length === 0">
            Nenhum produto
         </div>

         <div class="col-lg-4 col-md-6 mb-4" v-for="(product, index) in productsCompany.data" :key="index">
            <div
               :class="['card--flat', 'h-100', {'disabled': productInCart(product)}]"
            >
               <a href="#">
                  <div class="card-image">
                     <img
                        v-if="product.image"
                        class="card-img-top"
                        :src="product.image"
                        alt="">
                     <img
                        v-else
                        class="card-img-top"
                        src="@/assets/imgs/pizza.png"
                        alt="">
                  </div>
               </a>
               <div class="card-body">
                  <h4 class="card-title">
                     <a href="#">{{ product.title }}</a>
                  </h4>
                  <h5>{{ formatPrice(product.price) }}</h5>
                  <p class="card-text">{{ product.description }}</p>
               </div>
               <div class="card-footer card-footer-custom">
                  <a href="#" @click.prevent="addProductsCart(product)">
                     Adicionar no Carrinho <i class="fas fa-cart-plus"></i>
                  </a>
               </div>
            </div>
         </div>

      </div>
      <!-- /.row -->
   </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import formatPriceMixin from '@/mixins/format-price'

export default {
   name: 'Products',
   data () {
      return {
         filters: {
            categories: ''
         }
      }
   },
   computed: {
      ...mapState({
         company: state => state.companies.companySelected,
         productsCompany: state => state.companies.productsInCompanySelected,
         productsCart: state => state.cart.products
      })
   },
   mixins: [
      formatPriceMixin
   ],
   created () {
      if (this.company.name === '') {
         return this.$router.push({ name: 'home' })
      }

      this.getCategoriesByCompany(this.company.uuid)
         .catch(() => this.$vToastify.error('Falha ao carregar as categorias', 'Erro'))

      this.loadProducts()
   },
   methods: {
      ...mapActions([
         'getCategoriesByCompany',
         'getProductsByCompany'
      ]),
      ...mapMutations({
         addProductsCart: 'ADD_PRODUCTS_CART'
      }),
      categoryInFilter (identify) {
         return identify === this.filters.categories ? { background: '#fbd560' } : ''
      },
      filterByCategory (identify) {
         this.filters.categories = identify

         this.loadProducts()
      },
      loadProducts () {
         const params = {
            token_company: this.company.uuid
         }

         if (this.filters.categories) {
            params.categories = [
               this.filters.categories
            ]
         }

         this.getProductsByCompany(params)
            .catch(() => this.$vToastify.error('Falha ao carregar os produtos', 'Erro'))
      },
      productInCart (product) {
         let inCart = false

         this.productsCart.map((prodCart) => {
            if (prodCart.identify === product.identify) {
               inCart = true
            }
         })

         return inCart
      }
   }
}
</script>

<style scoped>

</style>

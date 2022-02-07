<template>
   <div class="home">
      <div class="row">

         <div class="col-lg-12">
            <h1 class="my-4 title-tenant">Restaurantes</h1>
            <div class="row my-4">

               <div class="col-lg-4 col-md-4 col-6 mb-4" v-for="(company, index) in companies.data" :key="index">
                  <div class="restaurant-card">
                     <a class="logo" href="#">
                        <img
                           v-if="company.logo"
                           class="card-img-top"
                           :src="company.logo"
                           :alt="company.name">
                        <img
                           v-else
                           class="card-img-top"
                           src="@/assets/imgs/vue-food.png"
                           :alt="company.name">
                     </a>
                     <div class="restaurant-card-body">
                        <h3>
                           <router-link :to="{name: 'products'}">{{ company.name }}</router-link>
                        </h3>
                     </div>
                  </div>
               </div>

            </div>
            <!-- /.row -->
         </div>
         <!-- /.col-lg-9 -->
      </div>
      <!-- /.row -->
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'Home',
   mounted () {
      this.getCompanies()
   },
   computed: {
      companies () {
         return this.$store.state.companies.items
      }
   },
   methods: {
      ...mapActions([
         'getCompanies'
      ])
   }
}
</script>

<template>
   <div>
      <HeaderComponent />

      <!-- Page Content -->
      <div class="container container-body mt-3">
         <router-view/>
      </div>

      <FooterComponent />
   </div>
</template>

<script>
import HeaderComponent from '@/layouts/_partials/HeaderComponent'
import FooterComponent from '@/layouts/_partials/FooterComponent'

export default {
   name: 'Website',
   components: { FooterComponent, HeaderComponent }
}
</script>

<style  scoped>
@import url('./../assets/css/vuefood.css');
</style>

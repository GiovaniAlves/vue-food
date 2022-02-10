<template>
   <div id="app">
      <Preloader/>
      <router-view />
   </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Preloader from '@/components/Preloader'

export default {
   name: 'Default',
   components: { Preloader }
}
</script>

<style  scoped>
@import url('./../assets/css/reset.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css');
</style>

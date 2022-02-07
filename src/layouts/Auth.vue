<template>
   <div>
      <!-- Page Content -->
      <div class="container container-body">
         <router-view/>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Auth'
}
</script>

<style scoped>
@import url('./../assets/css/auth.css');
</style>

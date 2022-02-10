<template>
   <div class="preloader" v-if="loading">
      <img src="@/assets/imgs/preloader.gif" :alt="textPreloader">
      <p>{{ textPreloader }}</p>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: 'Preloader',
   computed: {
      ...mapState({
         loading: state => state.preloader,
         textPreloader: state => state.textPreloader
      })
   }
}
</script>

<style scoped>

</style>

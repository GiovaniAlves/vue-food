<template>
   <div>
      <!-- register -->
      <div class="d-flex justify-content-center h-100 my-5">
         <div class="user_card">
            <div class="d-flex justify-content-center">
               <div class="brand_logo_container">
                  <img src="@/assets/imgs/vue-food.png" class="brand_logo" alt="Logo">
               </div>
            </div>
            <div class="d-flex justify-content-center form_container">
               <form>
                  <div class="input-group">
                     <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                     </div>
                     <input
                        v-model="user.name"
                        type="text"
                        name=""
                        class="form-control input_user"
                        value=""
                        placeholder="Nome">
                  </div>
                  <div class="input-group">
                     <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                     </div>
                     <input
                        v-model="user.email"
                        type="text"
                        name=""
                        class="form-control input_user"
                        value=""
                        placeholder="E-mail">
                  </div>
                  <div class="input-group">
                     <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                     </div>
                     <input
                        v-model="user.password"
                        type="password"
                        name=""
                        class="form-control input_pass"
                        value=""
                        placeholder="Senha">
                  </div>
                  <div class="d-flex justify-content-center login_container">
                     <button
                        @click="registerUser"
                        :disabled="loading"
                        type="button"
                        name="button"
                        class="btn login_btn"
                     >
                        <span v-if="loading">Cadastrando...</span>
                        <span v-else>Cadastrar</span>
                     </button>
                  </div>
               </form>
            </div>

            <div class="mt-4">
               <div class="d-flex justify-content-center links">
                  Já tem conta?
                  <router-link :to="{name: 'login'}"> Login</router-link>
               </div>
            </div>
         </div>
      </div>
      <!-- register -->
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'Register',
   data () {
      return {
         user: {
            name: '',
            email: '',
            password: ''
         },
         loading: false
      }
   },
   methods: {
      ...mapActions([
         'register'
      ]),
      registerUser () {
         this.loading = true

         this.register(this.user)
            .then(response => console.log(response.data))
            .catch(() => this.$vToastify.error('Falha ao carregar as empresas', 'Erro'))
            // eslint-disable-next-line no-return-assign
            .finally(() => this.loading = false)
      }
   }
}
</script>

<style scoped>

</style>

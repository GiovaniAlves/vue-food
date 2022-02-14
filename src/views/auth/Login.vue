<template>
   <div>
      <!-- login -->
      <div class="d-flex justify-content-center h-100 my-5">
         <div class="user_card">
            <div class="d-flex justify-content-center">
               <div class="brand_logo_container">
                  <img src="@/assets/imgs/vue-food.png" class="brand_logo" alt="Logo">
               </div>
            </div>
            <div class="d-flex justify-content-center form_container">
               <form @submit.prevent="loginUser">

                  <div class="text-danger" v-if="errors.email">
                     {{ errors.email[0] || '' }}
                  </div>
                  <div class="input-group">
                     <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                     </div>
                     <input
                        v-model="user.email"
                        :class="['form-control', 'input_user', {'is-invalid': errors.email}]"
                        type="text"
                        name=""
                        value=""
                        placeholder="E-mail">
                  </div>

                  <div class="text-danger" v-if="errors.password">
                     {{ errors.password[0] || '' }}
                  </div>
                  <div class="input-group">
                     <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                     </div>
                     <input
                        v-model="user.password"
                        :class="['form-control', 'input_pass', {'is-invalid': errors.password}]"
                        type="password"
                        name=""
                        value=""
                        placeholder="Senha">
                  </div>
                  <div class="d-flex justify-content-center mt-3 login_container">
                     <button
                        :disabled="loading"
                        type="submit"
                        name="button"
                        class="btn login_btn"
                     >
                        <span v-if="loading">Logando...</span>
                        <span v-else>Login</span>
                     </button>
                  </div>
               </form>
            </div>

            <div class="mt-4">
               <div class="d-flex justify-content-center links">
                  Não tem uma conta?
                  <router-link :to="{name: 'register'}"> Cadastre-se!</router-link>
               </div>
            </div>
         </div>
      </div>
      <!-- login-->
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'Login',
   data () {
      return {
         user: {
            email: '',
            password: ''
         },
         loading: false,
         errors: {
            email: '',
            password: ''
         }
      }
   },
   computed: {
      deviceName () {
         return `${navigator.appCodeName} ${navigator.platform} ${this.user.email}`
      }
   },
   methods: {
      ...mapActions([
         'login'
      ]),
      loginUser () {
         this.resetErrors()
         this.loading = true

         const params = {
            device_name: this.deviceName,
            ...this.user
         }

         this.login(params)
            .then(() => this.$router.push({ name: 'home' }))
            .catch((error) => {
               const errorResponse = error.response

               if (errorResponse.status === 422) {
                  this.errors = Object.assign(this.errors, errorResponse.data.errors)
               } else if (errorResponse.status === 404) {
                  this.$vToastify.error('Credenciais Inválidas', 'Erro')
               }
            })
            // eslint-disable-next-line no-return-assign
            .finally(() => this.loading = false)
      },
      resetErrors () {
         this.errors = {
            email: '',
            password: ''
         }
      }
   }
}
</script>

<style scoped>

</style>

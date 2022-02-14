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
               <form @submit.prevent="registerUser">
                  <div class="text-danger" v-if="errors.name">
                     {{ errors.name[0] || '' }}
                  </div>
                  <div class="input-group">
                     <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                     </div>
                     <input
                        v-model="user.name"
                        :class="['form-control', 'input_user', {'is-invalid': errors.name}]"
                        type="text"
                        name=""
                        value=""
                        placeholder="Nome">
                  </div>

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
                  <div class="d-flex justify-content-center login_container">
                     <button
                        :disabled="loading"
                        type="submit"
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
         loading: false,
         errors: {
            name: '',
            email: '',
            password: ''
         }
      }
   },
   methods: {
      ...mapActions([
         'register'
      ]),
      registerUser () {
         this.resetErrors()
         this.loading = true

         this.register(this.user)
            .then(() => {
               this.$router.push({ name: 'login' })
               this.$vToastify.success('Casdastrado com sucesso. Agora faça o login para entrar!', 'Parabéns!')
            })
            .catch((error) => {
              const errorResponse = error.response

               if (errorResponse.status === 422) {
                  this.errors = Object.assign(this.errors, errorResponse.data.errors)
               }
            })
            // eslint-disable-next-line no-return-assign
            .finally(() => this.loading = false)
      },
      resetErrors () {
         this.errors = {
            name: '',
            email: '',
            password: ''
         }
      }
   }
}
</script>

<style scoped>

</style>

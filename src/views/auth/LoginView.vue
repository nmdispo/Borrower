<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const router = useRouter()

const theme = ref('light')
const email = ref('')
const actualPassword = ref('')
const maskedPassword = ref('')
let revealTimeout = null

const roles = ref([
  { title: 'RENTEE', route: '/renteelogin' },
  { title: 'RENTER', route: '/renterlogin' },
])

function handlePasswordInput(e) {
  const newChar = e.data || ''
  const newValue = e.target.value

  if (newValue.length < actualPassword.value.length) {
    actualPassword.value = actualPassword.value.slice(0, newValue.length)
    maskedPassword.value = '•'.repeat(actualPassword.value.length)
    return
  }

  actualPassword.value += newChar
  maskedPassword.value = '•'.repeat(actualPassword.value.length - 1) + newChar

  clearTimeout(revealTimeout)
  revealTimeout = setTimeout(() => {
    maskedPassword.value = '•'.repeat(actualPassword.value.length)
  }, 1000)
}

async function login(role) {
  if (!email.value || !actualPassword.value) {
    alert('Please enter your email and password.')
    return
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: actualPassword.value,
  })

  if (error) {
    alert('Login failed: ' + error.message)
    return
  }

  const destination = roles.value.find((r) => r.title === role)
  if (destination) {
    router.push(destination.route)
  }
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app
        :style="{
          backgroundImage: `url('/images/yellowback.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <v-main>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" class="mx-auto">
                <v-card class="mx-auto elevation-24 pa-6">
                  <v-row class="d-flex justify-center my-4">
                    <v-img src="/images/EBlogo.png" :width="300" />
                  </v-row>

                  <h1 class="text-center" style="font-size: 40px">Welcome to</h1>
                  <h2 class="text-center" style="font-size: 70px">EASY BORROW</h2>
                  <h3 class="text-center" style="font-size: 20px">Share smarter, Earn faster</h3>

                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="email"
                      label="Email"
                      variant="outlined"
                      bg-color="yellow-lighten-1 rounded-lg elevation-5"
                    />

                    <v-text-field
                      :value="maskedPassword"
                      label="Password"
                      variant="outlined"
                      bg-color="yellow-lighten-1 rounded-lg elevation-5"
                      @input="handlePasswordInput"
                    />

                    <div class="text-center mt-6">
                      <v-menu open-on-click>
                        <template v-slot:activator="{ isHovering, props }">
                          <v-btn
                            color="yellow-lighten-2"
                            v-bind="props"
                            :elevation="isHovering ? 24 : 10"
                            size="large"
                            class="font-weight-bold rounded-pill mx-auto pa-6"
                            type="submit"
                            block
                          >
                            login as
                          </v-btn>
                        </template>

                        <v-list class="text-center" bg-color="yellow-lighten-2 rounded-xl">
                          <v-list-item
                            v-for="(role, index) in roles"
                            :key="index"
                            @click="login(role.title)"
                          >
                            <v-list-item-title>{{ role.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>

                    <v-divider class="my-5" />

                    <h5 class="text-center font-light" style="font-size: 18px">
                      Don't have an account?
                      <RouterLink to="/register" class="register-button">REGISTER</RouterLink>
                    </h5>
                  </v-form>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.register-button {
  text-decoration: none;
}
.theme--light .register-button {
  color: black;
}
.theme--dark .register-button {
  color: white;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const theme = ref('light')
const email = ref('')

const menuItems = ref([
  { title: 'RENTEE', route: '/renteelogin' },
  { title: 'RENTER', route: '/renterlogin' },
])

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Validate email and login
function handleLogin(route) {
  if (!email.value.includes('@') || !email.value.includes('.com')) {
    alert('Please enter a valid email that contains "@" and ".com"')
    return
  }

  const namePart = email.value.split('@')[0]
  localStorage.setItem('userEmail', namePart)
  router.push(route)
}

// Password logic
const actualPassword = ref('')
const maskedPassword = ref('')
let revealTimeout

function onPasswordInput(e) {
  const newChar = e.data || ''
  const newValue = e.target.value

  if (newValue.length < actualPassword.value.length) {
    actualPassword.value = newValue
    maskedPassword.value = '•'.repeat(newValue.length)
    return
  }

  actualPassword.value += newChar
  maskedPassword.value = '•'.repeat(actualPassword.value.length - 1) + newChar

  clearTimeout(revealTimeout)
  revealTimeout = setTimeout(() => {
    maskedPassword.value = '•'.repeat(actualPassword.value.length)
  }, 1000)
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-responsive class="border rounded">
        <v-app
          :theme="theme"
          :style="{
            backgroundImage: `url('/public/images/yellowback.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <v-divider class="my-10"></v-divider>

          <v-main>
            <v-container>
              <v-row>
                <v-col cols="12" md="6" class="mx-auto">
                  <v-card class="mx-auto elevation-24">
                    <v-row class="d-flex justify-center my-6">
                      <v-col cols="12" md="6" class="d-flex justify-center align-center">
                        <v-img
                          :width="400"
                          aspect-ratio="16/0"
                          cover
                          src="./images/EBlogo.png"
                        ></v-img>
                      </v-col>
                    </v-row>

                    <h1 class="text-center" style="font-size: 40px">Welcome to</h1>
                    <h2 class="text-center" style="font-size: 70px">EASY BORROW</h2>
                    <h3 class="text-center" style="font-size: 20px">Share smarter, Earn faster</h3>

                    <v-spacer class="my-5"></v-spacer>

                    <v-card-text class="pt-4">
                      <v-form fast-fail @submit.prevent>
                        <!-- EMAIL INPUT -->
                        <v-text-field
                          v-model="email"
                          label="Email"
                          variant="outlined"
                          bg-color="yellow-lighten-1 rounded-lg elevation-5"
                        ></v-text-field>

                        <!-- PASSWORD INPUT -->
                        <v-text-field
                          :value="maskedPassword"
                          label="Password"
                          variant="outlined"
                          bg-color="yellow-lighten-1 rounded-lg elevation-5"
                          @input="onPasswordInput"
                        ></v-text-field>

                        <h4 class="text-center font-semibold" style="font-size: 15px">
                          Forgot Password?
                        </h4>

                        <v-spacer class="my-10"></v-spacer>

                        <!-- LOGIN MENU -->
                        <div class="text-center">
                          <v-menu open-on-click>
                            <template v-slot:activator="{ isHovering, props }">
                              <v-btn
                                color="yellow-lighten-2"
                                v-bind="props"
                                :elevation="isHovering ? 24 : 10"
                                size="large"
                                class="font-weight-bold mt-4 rounded-pill mx-auto pa-6"
                                type="submit"
                                block
                              >
                                login as
                              </v-btn>
                            </template>

                            <v-spacer class="my-5"></v-spacer>

                            <v-list class="text-center" bg-color="yellow-lighten-2 rounded-xl">
                              <v-list-item
                                v-for="(item, index) in menuItems"
                                :key="index"
                                :value="item"
                                @click="handleLogin(item.route)"
                              >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>

                        <v-divider class="my-5"></v-divider>

                        <h5 class="text-center font-light" style="font-size: 18px">
                          Don't have an account?
                          <RouterLink to="/register" class="register-button"> REGISTER </RouterLink>
                        </h5>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-main>
        </v-app>
      </v-responsive>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.light-background,
.dark-background {
  background-image: url('/public/images/yellowback.jpg');
  background-size: cover;
  background-position: center;
}
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

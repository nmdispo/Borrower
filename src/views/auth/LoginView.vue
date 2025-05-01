<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const theme = ref('light')
const menuItems = ref([
  { title: 'RENTEE', route: '/renteedashboard' },
  { title: 'RENTER', route: '/renterdashboard' },
])

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Password logic
const actualPassword = ref('')
const maskedPassword = ref('')
let revealTimeout

function onPasswordInput(e) {
  const newChar = e.data || '' // last character typed
  const newValue = e.target.value

  // If user deletes
  if (newValue.length < actualPassword.value.length) {
    actualPassword.value = newValue
    maskedPassword.value = '•'.repeat(newValue.length)
    return
  }

  // Update actual password
  actualPassword.value += newChar

  // Mask all but the last char
  maskedPassword.value = '•'.repeat(actualPassword.value.length - 1) + newChar

  // Re-mask the last character after 1 second
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
                    <h2 class="text-center" style="font-size: 60px">EASY BORROW</h2>
                    <h3 class="text-center" style="font-size: 20px">Share smarter, earn faster</h3>

                    <v-spacer class="my-5"></v-spacer>

                    <v-card-text class="pt-4">
                      <v-form fast-fail @submit.prevent>
                        <v-text-field
                          label="Email"
                          variant="outlined"
                          bg-color="yellow-lighten-1 rounded-lg elevation-5"
                        ></v-text-field>

                        <!-- Custom password field -->
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

                            <v-list class="text-center" bg-color="yellow-lighten-2 rounded-xl">
                              <v-list-item
                                v-for="(item, index) in menuItems"
                                :key="index"
                                :value="item"
                                @click="router.push(item.route)"
                              >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>

                        <v-hover v-slot="{ isHovering, props }">
                          <v-btn
                            v-bind="props"
                            :elevation="isHovering ? 24 : 6"
                            size="large"
                            color="yellow-lighten-2"
                            class="font-weight-bold mt-4 rounded-pill mx-auto pa-6"
                            type="submit"
                            prepend-icon="mdi-google"
                            block
                            >Sing in with Google</v-btn
                          >
                        </v-hover>
                        <v-divider class="my-5"></v-divider>

                        <h5 class="text-center font-light" style="font-size: 18px">
                          Don't have an account?
                          <RouterLink to="/register" class="register-button"> REGISTER</RouterLink>
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
.light-background {
  background-image: url('/public/images/yellowback.jpg');
  background-size: cover;
  background-position: center;
}

.dark-background {
  background-image: url('/public/images/yellowback.jpg');
  background-size: cover;
  background-position: center;
}
.rentee-button {
  color: black;
  text-decoration: none;
  display: block;
  width: 100%;
}
.renter-button {
  color: black;
  text-decoration: none;
  display: block;
  width: 100%;
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

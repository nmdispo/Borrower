<script setup>
import { ref } from 'vue'

const theme = ref('light')
const item1 = [{ title: 'RENTEE' }]
const item2 = [{ title: 'RENTER' }]

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
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
            backgroundImage: `url('/public/images/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <v-card class="mx-auto elevation-10 rounded-lg" style="max-width: 900px; margin: auto">
            <v-row class="d-flex justify-center my-6">
              <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <v-img max-width="100%" aspect-ratio="16/9" cover src="./images/EBlogo.png"></v-img>
              </v-col>
            </v-row>

            <v-card-title class="text-center">
              <h5 style="font-size: 40px" class="display-1">Welcome to</h5>
              <p style="font-size: 60px" class="display-2">EASY BORROW</p>
              <p style="font-size: 20px" class="subtitle-1">Share smarter, earn faster.</p>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <v-main>
                <v-container>
                  <v-row class="d-flex justify-center">
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="Email"
                        variant="outlined"
                        bg-color="yellow-darken-1 rounded-lg"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Password"
                        variant="outlined"
                        type="password"
                        bg-color="yellow-darken-1 rounded-lg"
                      >
                      </v-text-field>
                      <p class="text-center font-weight-medium" style="font-size: 15px">
                        Forgot password?
                      </p>

                      <div class="text-center">
                        <v-menu open-on-hover>
                          <template v-slot:activator="{ props }">
                            <v-btn
                              color="yellow-darken-1"
                              class="font-weight-bold mt-6 rounded-pill"
                              v-bind="props"
                              >LOG IN AS
                            </v-btn>
                          </template>

                          <v-list bg-color="yellow-darken-1" class="text-center mt-4 rounded-5">
                            <v-list-item
                              v-for="(item, index1) in item1"
                              :key="index1"
                              :value="index1"
                            >
                              <RouterLink to="/renteedashboard" class="rentee-button">
                                <v-list-item-title class="font-weight-medium">
                                  {{ item.title }}

                                  <v-list-item
                                    v-for="(item, index2) in item2"
                                    :key="index2"
                                    :value="index2"
                                  >
                                    <RouterLink to="/renterdashboard" class="renter-button">
                                      <v-list-item-title class="font-weight-medium">
                                        {{ item.title }}
                                      </v-list-item-title>
                                    </RouterLink>
                                  </v-list-item>
                                </v-list-item-title>
                              </RouterLink>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                      <v-btn
                        size="large"
                        color="yellow-lighten-2"
                        class="font-weight-bold mt-4 rounded-pill"
                        prepend-icon="mdi-google"
                        width="400"
                        type="submit"
                        block
                        >Sign in with Google</v-btn
                      >

                      <v-divider class="my-5"></v-divider>

                      <h5 class="text-center" style="font-size: larger">
                        Don't have an account?
                        <RouterLink to="/register" class="register-button">REGISTER </RouterLink>
                      </h5>
                    </v-col>
                  </v-row>
                </v-container>
              </v-main>
            </v-card-text>
          </v-card>
        </v-app>
      </v-responsive>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.light-background {
  background-image: url('/public/images/background.jpg');
  background-size: cover;
  background-position: center;
}

.dark-background {
  background-image: url('/public/images/background.jpg');
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
  color: black;
  text-decoration: none;
}
</style>

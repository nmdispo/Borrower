<script setup>
import { ref } from 'vue'

const theme = ref('light')

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
            backgroundImage: `url('/public/images/')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <v-divider class="my-10"></v-divider>

          <v-main>
            <v-container>
              <v-row>
                <v-col cols="12" md="6" class="mx-auto">
                  <v-card class="mx-auto elevation-10" :bg-color="yellow - lighten - 5">
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
                    <h3 class="text-center" style="font-size: 20px">
                      Share smarter, earn faster.>
                    </h3>

                    <v-spacer class="my-5"></v-spacer>

                    <v-card-text class="pt-4">
                      <v-form fast-fail @submit.prevent>
                        <v-text-field
                          label="Email"
                          variant="outlined"
                          bg-color="yellow-darken-1 rounded-lg"
                        ></v-text-field>

                        <v-text-field
                          type="password"
                          label="Password"
                          variant="outlined"
                          bg-color="yellow-darken-1 rounded-lg"
                        ></v-text-field>

                        <v-btn
                          size="large"
                          color="yellow-lighten-2"
                          class="font-weight-bold mt-4 rounded-pill"
                          type="submit"
                          block
                          >Submit</v-btn
                        >
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

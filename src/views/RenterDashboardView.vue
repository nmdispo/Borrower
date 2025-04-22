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
            backgroundImage: `url('/public/images/wewe.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <v-container>
            <v-row class="d-flex justify-center my-6">
              <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <v-img :width="400" aspect-ratio="16/0" cover src="./images/EBlogo.png"></v-img>
              </v-col>
            </v-row>
          </v-container>
          <h5 class="text-center" style="font-size: 40px">Welcome to</h5>
          <p1 class="text-center" style="font-size: 60px">EASY BORROW</p1>
          <p2 class="text-center" style="font-size: 20px">Share smarter, earn faster.</p2>
          <v-spacer class="my-5"></v-spacer>
          <v-main>
            <v-container>
              <v-row class="d-flex justify-center">
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Student ID"
                    variant="outlined"
                    bg-color="yellow-darken-1 rounded-lg"
                  >
                  </v-text-field>

                  <v-btn
                    size="large"
                    color="yellow-lighten-2"
                    class="font-weight-bold mt-4 rounded-pill"
                    type="submit"
                    block
                    ><RouterLink to="/dashboard" class="login-button">LOGIN</RouterLink></v-btn
                  >

                  <v-divider class="my-5"></v-divider>
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
.login-button {
  color: black;
  text-decoration: none;
}
</style>

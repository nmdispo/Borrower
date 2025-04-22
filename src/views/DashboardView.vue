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
            backgroundImage: `url('/public/images/bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
        </v-app>
      </v-responsive>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.light-background {
  background-image: url('/public/images/bg.jpg');
  background-size: cover;
  background-position: center;
}

.dark-background {
  background-image: url('/public/images/bg.jpg');
  background-size: cover;
  background-position: center;
}
.back-button {
  color: black;
  text-decoration: none;
}
</style>

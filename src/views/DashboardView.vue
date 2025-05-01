<script setup>
import { ref } from 'vue'

const theme = ref('light')
</script>

<template>
  <v-responsive class="border rounded">
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

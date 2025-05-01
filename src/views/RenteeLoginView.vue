<script setup>
import { ref } from 'vue'

const theme = ref('light')
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-spacer class="my-8"></v-spacer>
      <v-img
        tyle="position: relative; left: 20px;"
        :width="200"
        aspect-ratio="16/0"
        cover
        src="./images/EBlogo.png"
      ></v-img>
      <v-responsive class="border rounded">
        <v-app>
          <v-main>
            <v-container>
              <v-row>
                <v-col cols="12" md="6"> </v-col>
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
  background-image: url('/public/images/wiggle.png');
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

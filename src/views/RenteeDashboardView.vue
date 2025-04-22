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
            backgroundImage: `url('/public/images/wiggle.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <v-divider class="my-10"></v-divider>

          <v-main>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card class="mx-auto" prepend-icon="$vuetify" subtitle="The #1 Vue UI Library">
                    <template v-slot:title>
                      <span class="font-weight-black">Welcome to Vuetify</span>
                    </template>

                    <v-card-text class="bg-surface-light pt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione
                      debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat
                      totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
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

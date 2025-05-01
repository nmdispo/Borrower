<script>
import { ref } from 'vue'

export default {
  name: 'MyNavbar',
  setup() {
    const logo = ref(new URL('../public/images/yellowback.jpg', import.meta.url).href)

    return {
      logo,
    }
  },
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <v-img :width="250" aspect-ratio="16/0" cover src="./images/EBlogo.png"></v-img>
    </div>
    <div class="button-container rounded-xl">
      <v-row class="d-flex justify-center my-6">
        <v-col cols="6" sm="2">
          <v-btn
            variant="outlined"
            color="yellow-lighten-2"
            size="large"
            class="font-weight-bold mt-5 rounded-pill text-black"
            type="submit"
            block
            style="color: black !important"
          >
            Home
          </v-btn>
        </v-col>
        <v-col cols="6" sm="2">
          <v-btn
            variant="outlined"
            color="yellow-lighten-2"
            size="large"
            class="font-weight-bold mt-5 rounded-pill text-black"
            type="submit"
            block
            style="color: black !important"
          >
            Rentals
          </v-btn>
        </v-col>
        <v-col cols="6" sm="2">
          <v-btn
            variant="outlined"
            color="yellow-lighten-2"
            size="large"
            class="font-weight-bold mt-5 rounded-pill text-black"
            type="submit"
            block
            style="color: black !important"
          >
            Messages
          </v-btn>
        </v-col>
        <v-col cols="6" sm="2">
          <v-btn
            variant="outlined"
            color="yellow-lighten-2"
            size="large"
            class="font-weight-bold mt-5 rounded-pill text-black"
            type="submit"
            block
            style="color: black !important"
          >
            Profile
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  color: white;
  justify-content: space-between;
}

.navbar-left {
  margin-right: 20px;
  margin-left: 100px; /* Added margin-left to move image right */
  margin-top: 20px;
}

.logo {
  height: 40px;
  width: auto;
}

.navbar-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  gap: 15px;
}

.navbar-links li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-links li a:hover {
  color: #ffcc00;
}

.bg-surface-variant {
  background-color: #f0f4c3;
}
.button-container {
  /* display: flex;  Removed this */
  /* align-items: flex-start;  Removed this */
  width: 80%; /* Ensure the button container takes up available width */
  background-color: #ffcc00;
}
</style>

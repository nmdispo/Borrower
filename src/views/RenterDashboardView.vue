<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const userFirstName = ref('User')
const currentRentals = ref([])

onMounted(async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (user) {
    const metadata = user.user_metadata
    if (metadata && metadata.first_name) {
      userFirstName.value = metadata.first_name
    }

    const { data: rentals } = await supabase.from('items').select('*').eq('owner_id', user.id)

    currentRentals.value = rentals || []
  }
})

function navigateTo(path) {
  router.push(path)
}

function goToListedItem(itemId) {
  router.push({ path: '/rentals', query: { slide: '1', focus: itemId } })
}
</script>

<template>
  <v-app :theme="theme">
    <v-main>
      <v-container fluid class="py-6">
        <!-- Navigation -->
        <v-row justify="center" align="center" class="mb-6">
          <v-col cols="auto" class="d-flex align-center">
            <v-img src="/images/EBlogo.png" width="160" height="160" contain />
            <v-sheet class="nav-container px-6 py-2 ml-4" color="white">
              <v-row align="center" no-gutters>
                <v-btn text class="nav-btn nav-btn-home">Home</v-btn>
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/rentals' }"
                  @click="navigateTo('/rentals')"
                  >Rentals</v-btn
                >

                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renterprofile' }"
                  @click="navigateTo('/renterprofile')"
                  >Profile</v-btn
                >
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- Yellow Section -->
        <div class="yellow-section py-8 px-4">
          <!-- Hello -->
          <v-row justify="center" class="mb-4">
            <h2 class="hello-text">HELLO, {{ userFirstName.toUpperCase() }}!</h2>
          </v-row>

          <!-- Welcome Text -->
          <v-row justify="center" class="mb-2">
            <p class="welcome-text">Welcome to Easy Borrow</p>
          </v-row>

          <!-- Divider -->
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>

          <!-- Action Buttons -->
          <v-row justify="center" class="mb-6" align="center">
            <router-link to="/rentals" style="text-decoration: none">
              <v-btn class="nav-btn mx-4 px-10 py-4">List an Item</v-btn>
            </router-link>

            <router-link
              :to="{ path: '/rentals', query: { slide: '2' } }"
              style="text-decoration: none"
            >
              <v-btn class="nav-btn mx-4 px-10 py-4">View Bookings</v-btn>
            </router-link>
          </v-row>

          <!-- Divider -->
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>

          <!-- Current Rentals Section -->
          <v-row justify="center" class="mb-4">
            <h2 class="section-title">Current Rentals</h2>
          </v-row>

          <v-row justify="center" class="mb-2">
            <p class="section-subtitle">Here's what you currently listed</p>
          </v-row>

          <v-row justify="center" class="mt-4" dense>
            <v-col cols="12" sm="6" md="4" v-for="(rental, index) in currentRentals" :key="index">
              <v-card
                class="rental-card pa-4"
                elevation="3"
                @click="goToListedItem(rental.id)"
                style="cursor: pointer"
              >
                <v-img :src="rental.images || rental.image" height="160" cover></v-img>
                <v-card-title class="rental-title mt-2">
                  {{ rental.title || rental.name }}
                </v-card-title>
                <v-card-text class="rental-info">
                  <div><strong>Rental Fee:</strong> ₱{{ rental.rental_fee || rental.fee }}</div>
                  <div><strong>Quantity:</strong> {{ rental.quantity }}</div>
                  <div>
                    <strong>Available Dates:</strong>
                    {{
                      (rental.available_dates && JSON.parse(rental.available_dates))
                        ?.map((date) => new Date(date).toLocaleDateString())
                        .join(', ') || 'N/A'
                    }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jaldi&family=Kaushan+Script&display=swap');

.nav-container {
  border: 2px solid #ffd700;
  border-radius: 15px;
  display: inline-block;
  width: fit-content;
}
.nav-btn {
  font-weight: bold;
  color: black !important;
  margin-right: 20px;
  border-radius: 20px;
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
.nav-btn.active {
  border: 1px solid black;
}
.nav-btn-home {
  border: 1px solid black !important;
  pointer-events: none;
}
.yellow-section {
  background-color: #fff170;
  min-height: 100vh;
  padding: 40px;
  border-radius: 16px;
}
.hello-text {
  font-size: 50px;
  font-weight: 900;
  letter-spacing: 3px;
  color: #000000;
  font-family: 'Kaushan Script', cursive;
}
.welcome-text {
  font-size: 20px;
  color: black;
  font-family: 'Jaldi', sans-serif;
}
.custom-divider {
  width: 95%;
  height: 2px;
  background-color: black;
  border-radius: 2px;
}
.section-title {
  font-size: 32px;
  font-weight: bold;
  color: #000;
  font-family: 'Kaushan Script', cursive;
  letter-spacing: 1px;
}
.section-subtitle {
  font-size: 18px;
  color: #000;
  font-family: 'Jaldi', sans-serif;
}
.rental-card {
  background-color: white;
  border-radius: 16px;
  transition: box-shadow 0.3s;
}
.rental-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.rental-title {
  font-weight: bold;
  font-size: 20px;
  color: #000;
}
.rental-info {
  font-family: 'Jaldi', sans-serif;
  font-size: 16px;
  color: #333;
  margin-top: 8px;
}
</style>

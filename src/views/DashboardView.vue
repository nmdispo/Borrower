<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const userFirstName = ref('User')
const currentRentals = ref([])

const valueRentals = ref([
  {
    name: 'Electric Drill',
    image: '/images/electricdrill.jpg',
    rentalFee: '150.00',
    location: 'Butuan City',
    contact: '09100904430',
    quantity: '2pcs.',
    availdate: 'May 23-25, 2025',
    description: 'Powerful electric drill for various tasks.',
  },
  {
    name: 'Mountain Bike',
    image: '/images/mountainbike2.jpg',
    rentalFee: '70.00',
    location: 'Ampayon City',
    contact: '09706222752',
    quantity: '1pc.',
    availdate: 'May 16 &17, 2025',
    description: 'Durable mountain bike for off-road adventures.',
  },
  {
    name: 'Prom Dress',
    image: '/images/promdress.jpg',
    rentalFee: '300.00',
    location: 'Brgy. Buhangin',
    contact: '09912329365',
    quantity: '1pc.',
    availdate: 'May 20,2025',
    description: 'Elegant prom dress, perfect for special occasions.',
  },
  {
    name: 'Rain Boots',
    image: '/images/rainboots2.jpg',
    rentalFee: '20.00',
    location: 'Brgy. Ampayon',
    contact: '09123894622',
    quantity: '3pc.',
    availdate: 'May 14-23, 2025',
    description: 'Waterproof rain boots to keep your feet dry.',
  },
  {
    name: 'Scientific Calculator',
    image: '/images/scical2.jpg',
    rentalFee: '30.00',
    location: 'Los Angeles, Butuan City',
    contact: '09478523690',
    quantity: '1 unit',
    availdate: 'Available during weekdays',
    description: 'Standard scientific calculator for mathematical and scientific computations.',
  },
  {
    name: 'E-bikes',
    image: '/images/ebike2.jpg',
    rentalFee: '150.00',
    location: 'Brgy. Baan',
    contact: '09869022752',
    quantity: '1pc.',
    availdate: 'May 10-15, 2025',
    description: 'Convenient e-bikes for easy commuting.',
  },
  {
    name: 'Tent 4-Person',
    image: '/images/tent.jpg',
    rentalFee: '270.00',
    location: 'Agusan del Norte (can be transported)',
    contact: '09638521479',
    quantity: '1 unit',
    availdate: 'Weekends and holidays preferred',
    description: 'Spacious tent suitable for up to four people, ideal for camping trips.',
  },
  {
    name: 'Safety Vest',
    image: '/images/vest.jpg',
    rentalFee: '20.00',
    location: 'Baan Km. 3',
    contact: '09051237894',
    quantity: '1 pc',
    availdate: 'Available on short notice',
    description: 'High-visibility safety vest for construction, events, or roadside emergencies.',
  },
])

onMounted(async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error('Error getting user:', error)
    return
  }

  if (user) {
    const metadata = user.user_metadata
    if (metadata && metadata.first_name) {
      userFirstName.value = metadata.first_name
    }
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

          <div class="item-list-yellow rounded-lg pa-6">
            <h3 class="list-header text-center">View Bookings</h3>
            <div class="underline mb-6"></div>

            <v-row justify="start" class="mt-4 dense">
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                v-for="(rental, index) in valueRentals"
                :key="index"
              >
                <v-card class="rental-card pa-6" elevation="6">
                  <v-img :src="rental.image" height="160" cover></v-img>
                  <v-card-title class="rental-title mt-2">{{ rental.name }}</v-card-title>
                  <v-card-text class="rental-info">
                    <v-dialog max-width="600">
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn
                          color="yellow-lighten-2"
                          class="font-weight-bold mt-2 rounded-pill mx-auto pa-2"
                          v-bind="activatorProps"
                          text="View details"
                          variant="flat"
                          block
                        ></v-btn>
                      </template>

                      <template v-slot:default="{ isActive }">
                        <v-card class="text-center">
                          <v-card-title class="font-weight-bold">ITEM DETAILS</v-card-title>
                          <v-row>
                            <v-col>
                              <v-card-text>
                                Item name: <br />{{ valueRentals[index].name }}</v-card-text
                              >
                            </v-col>
                            <v-col>
                              <v-card-text>
                                Rental fee: <br />₱{{ valueRentals[index].rentalFee }}</v-card-text
                              >
                            </v-col>
                            <v-col>
                              <v-card-text>
                                Location: <br />{{ valueRentals[index].location }}</v-card-text
                              >
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-card-text>
                                Contact Number: <br />{{ valueRentals[index].contact }}</v-card-text
                              >
                            </v-col>
                            <v-col>
                              <v-card-text>
                                Available date: <br />{{
                                  valueRentals[index].availdate
                                }}</v-card-text
                              >
                            </v-col>
                            <v-col>
                              <v-card-text>
                                Quantity: <br />{{ valueRentals[index].quantity }}</v-card-text
                              >
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-card-text>
                                Description: <br />{{
                                  valueRentals[index].description
                                }}</v-card-text
                              >
                            </v-col>
                          </v-row>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="yellow-lighten-2"
                              class="font-weight-bold mt-2 rounded-pill mx-auto pa-2"
                              v-bind="activatorProps"
                              text="EXIT"
                              variant="flat"
                              block
                              @click="isActive.value = false"
                            ></v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>

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

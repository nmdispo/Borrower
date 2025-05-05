<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const userFirstName = ref('')

// Sample rental data
const valueRentals = ref([
  {
    name: 'Electric Drill',
    image: '/images/electricdrill.jpg',
    rentalFee: '150.00',
  },
  {
    name: 'Mountain Bike',
    image: '/images/mountainbike2.jpg',
    rentalFee: '70.00',
  },
  {
    name: 'Prom Dress',
    image: '/images/promdress.jpg',
    rentalFee: '300.00',
  },
  {
    name: 'Rain Boots',
    image: '/images/rainboots2.jpg',
  },
  {
    name: 'E-bikes',
    image: '/images/ebike2.jpg',
    rentalFee: '150.00',
  },
])

const nearbyRentals = ref([
  {
    name: 'Filipiniana',
    image: '/images/filipiniana2.jpg',
    location: 'Baan Km. 3',
  },
  {
    name: 'Chemistry Book',
    image: '/images/chemistrybook2.jpg',
    location: 'Ampayon',
  },
  {
    name: 'Karaoke Machine',
    image: '/images/karaoke.jpg',
    location: 'Camella Homes',
  },
  {
    name: 'Chairs & Tables',
    image: '/images/chairstable.jpg',
    location: 'Lumina',
  },
  {
    name: 'Vans',
    image: '/images/vans.jpg',
    location: 'BMC',
  },
])

const availabilityRentals = ref([
  {
    name: 'Laboratory Gown',
    image: '/images/labgown.jpg',
    availdate: 'May 23-25, 2025',
  },
  {
    name: 'Scientific Calculator',
    image: '/images/scical2.jpg',
    availdate: 'May 16 &17, 2025',
  },
  {
    name: 'Arnis Stick',
    image: '/images/arnis.jpg',
    availdate: 'May 20,2025',
  },
  {
    name: 'Tent 4-Person',
    image: '/images/tent.jpg',
    availdate: 'May 14-23, 2025',
  },
  {
    name: 'Safety Vest ',
    image: '/images/vest.jpg',
    availdate: 'May 10-15, 2025',
  },
])

onMounted(() => {
  const storedName = localStorage.getItem('userFirstName')
  userFirstName.value = storedName ? storedName : 'Nikki'
})

function navigateTo(path) {
  router.push(path)
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
                  :class="{ active: route.path === '/renteeRentals' }"
                  @click="navigateTo('renteeRentals')"
                  >Rentals</v-btn
                >
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteeprofile' }"
                  @click="navigateTo('/renteeprofile')"
                  >Profile</v-btn
                >
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <div class="yellow-section py-8 px-4">
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>
          <v-row justify="center" class="mb-4">
            <h2 class="hello-text">HELLO, NIKKI!</h2>
          </v-row>

          <!-- Welcome Text -->
          <v-row justify="center" class="mb-2">
            <p class="welcome-text">Welcome to Easy Borrow</p>
          </v-row>

          <!-- Black Line -->
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>

          <v-row justify="start" class="mb-6">
            <h2 class="section-title" style="padding-left: 50px">Value Rentals</h2>
          </v-row>

          <v-row justify="center" class="mt-4" dense>
            <v-col cols="12" sm="6" md="2" v-for="(rental, index) in valueRentals" :key="index">
              <v-card class="rental-card pa-5" elevation="3">
                <v-img :src="rental.image" height="160" cover></v-img>
                <v-card-title class="rental-title mt-2">{{ rental.name }}</v-card-title>
                <v-card-text class="rental-info">
                  <v-dialog max-width="400">
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
                              Rental fee: <br />₱{{ valueRentals[index].rentalFee }}</v-card-text
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

          <v-row justify="start" class="mb-6">
            <h2 class="section-title" style="padding-left: 50px">Nearby Rentals</h2>
          </v-row>

          <v-row justify="center" class="mt-4" dense>
            <v-col cols="12" sm="6" md="2" v-for="(rental, index) in nearbyRentals" :key="index">
              <v-card class="rental-card pa-5" elevation="3">
                <v-img :src="rental.image" height="160" cover></v-img>
                <v-card-title class="rental-title mt-2">{{ rental.name }}</v-card-title>
                <v-card-text class="rental-info">
                  <v-dialog max-width="400">
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
                              Location: <br />{{ nearbyRentals[index].location }}</v-card-text
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
          <v-row justify="start" class="mb-6">
            <h2 class="section-title" style="padding-left: 50px">Availability</h2>
          </v-row>

          <v-row justify="center" class="mt-4" dense>
            <v-col
              cols="12"
              sm="6"
              md="2"
              v-for="(rental, index) in availabilityRentals"
              :key="index"
            >
              <v-card class="rental-card pa-5" elevation="3">
                <v-img :src="rental.image" height="160" cover></v-img>
                <v-card-title class="rental-title mt-2">{{ rental.name }}</v-card-title>
                <v-card-text class="rental-info">
                  <v-dialog max-width="400">
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
                              Available Dates: <br />{{
                                availabilityRentals[index].availdate
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

          <v-row justify="center" class="mb-8">
            <div
              class="custom-divider mx-auto"
              style="border-top: 3px solid black; width: 95%"
            ></div>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jaldi&family=Kaushan+Script&display=swap');

.nav-container {
  border: 3px solid #ffd700;
  border-radius: 10px;
  display: inline-block;
  width: fit-content;
}
.navigation-container {
  border: 3px solid #ffd700;
  border-radius: 10px;
  max-width: 730px;
  width: 100%;
}
.nav-location-container {
  border: 3px solid #ffd700;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
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
  font-family: 'Lexend Exa', sans-serif;
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

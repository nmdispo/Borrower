<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const userFirstName = ref('')

const bookingSuccessDialog = ref(false)

function showBookingSuccessDialog() {
  bookingSuccessDialog.value = true
}

function closeBookingSuccessDialog() {
  bookingSuccessDialog.value = false
}

function handleBookButtonClick(detailsDialogActive) {
  // In a real application, you would perform your booking logic here
  console.log('Booking initiated...')

  // Close the "View details" dialog
  detailsDialogActive.value = false

  // Open the "Booking Successful!" dialog after a short delay (optional)
  setTimeout(() => {
    showBookingSuccessDialog()
  }, 300) // Adjust the delay as needed
}

// ... other script code

// Sample rental data
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
    name: 'Filipiniana',
    image: '/images/filipiniana2.jpg',
    rentalFee: '300.00',
    location: 'Brgy. Buhangin',
    contact: '09123456789',
    quantity: '1 set',
    availdate: 'Available on request',
    description: 'Traditional Filipino attire, perfect for cultural events.',
  },
  {
    name: 'Chemistry Book',
    image: '/images/chemistrybook2.jpg',
    rentalFee: '60.00',
    location: 'Butuan City Proper',
    contact: '09987654321',
    quantity: '1 copy',
    availdate: 'Throughout the academic year',
    description: 'University-level chemistry textbook (specify edition if needed).',
  },
  {
    name: 'Chairs & Tables',
    image: '/images/chairstable.jpg',
    rentalFee: '400.00',
    location: 'Ampayon',
    contact: '09171234567',
    quantity: '1 set (4 chairs, 1 table)',
    availdate: 'Flexible, please inquire',
    description: 'Set of sturdy chairs and a rectangular table, suitable for events or gatherings.',
  },
  {
    name: 'Camping Chair',
    image: '/images/campingchair.jpg',
    rentalFee: '120.00',
    location: 'Bayugan City (can be transported)',
    contact: '09567890123',
    quantity: '1 pc',
    availdate: 'Available for weekends and holidays',
    description: 'Lightweight and foldable camping chair for outdoor comfort.',
  },
  {
    name: 'Chairs & Tables',
    image: '/images/chairstable.jpg',
    rentalFee: '400.00',
    location: 'Ampayon',
    contact: '09171234567',
    quantity: '1 set (4 chairs, 1 table)',
    availdate: 'Flexible, please inquire',
    description: 'Set of sturdy chairs and a rectangular table, suitable for events or gatherings.',
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
    name: 'Arnis Stick',
    image: '/images/arnis.jpg',
    rentalFee: '15.00',
    location: 'Doongan, Butuan City',
    contact: '09291478523',
    quantity: '1 pair',
    availdate: 'Please coordinate schedule',
    description: 'Traditional rattan sticks used for the Filipino martial art of Arnis.',
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
  {
    name: 'Laboratory Gown',
    image: '/images/labgown.jpg',
    rentalFee: '50.00',
    location: 'ASHS, Butuan City',
    contact: '09384569127',
    quantity: '1 pc',
    availdate: 'During school terms',
    description: 'White laboratory gown for science experiments and lab work.',
  },
  {
    name: 'Camera',
    image: '/images/camera.jpg',
    rentalFee: '500.00',
    location: 'Poblacion, Butuan City',
    contact: '09753698142',
    quantity: '1 unit',
    availdate: 'Please book in advance',
    description: 'Digital camera suitable for photography and videography.',
  },
])

onMounted(() => {
  const storedName = localStorage.getItem('userFirstName')
  userFirstName.value = storedName ? storedName : 'Ella'
})

function navigateTo(path) {
  router.push(path)
}

const loaded = ref(false)
const loading = ref(false)

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}
</script>

<template>
  <v-app :theme="theme">
    <v-main>
      <v-container fluid class="py-6">
        <v-row justify="center" align="center" class="mb-6">
          <v-col cols="auto" class="d-flex align-center">
            <v-img src="/images/EBlogo.png" width="160" height="160" contain />
            <v-sheet class="nav-container px-6 py-2 ml-4" color="white">
              <v-row align="center" no-gutters>
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteelogin' }"
                  @click="navigateTo('renteelogin')"
                  >Home</v-btn
                >
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
                  :class="{ active: route.path === '/renteeProfile' }"
                  @click="navigateTo('/renteeProfile')"
                  >Profile</v-btn
                >
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <v-container justify="center" align="center" class="mb-6 py-6">
          <v-sheet class="navigation-container px-1 py-1" color="white">
            <v-row align="center" no-gutters>
              <v-col>
                <v-text-field
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  density="compact"
                  label="Search templates"
                  variant="solo"
                  hide-details
                  single-line
                  @click:append-inner="onClick"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>

        <div class="yellow-section py-8 px-4">
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>
          <v-row justify="center" class="mb-4">
            <h2 class="hello-text">HELLO, NIKKI!</h2>
          </v-row>

          <v-row justify="center" class="mb-2">
            <p class="welcome-text">Welcome to Easy Borrow</p>
          </v-row>

          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>

          <v-row justify="start" class="mb-6">
            <h2 class="section-title" style="padding-left: 50px"></h2>
          </v-row>

          <v-row justify="center" class="mt-4" dense>
            <v-col cols="12" sm="6" md="3" v-for="(rental, index) in valueRentals" :key="index">
              <v-card class="rental-card pa-6" elevation="3">
                <v-img :src="rental.image" height="200" style="object-fit: contain"></v-img>
                <v-card-title class="rental-title mt-2">{{ rental.name }}</v-card-title>
                <v-card-text class="rental-info">
                  <v-dialog max-width="500">
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
                              Available date: <br />{{ valueRentals[index].availdate }}</v-card-text
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
                              Description: <br />{{ valueRentals[index].description }}</v-card-text
                            >
                          </v-col>
                        </v-row>

                        <v-card-actions>
                          <v-col>
                            <v-btn
                              color="yellow-lighten-2"
                              class="font-weight-bold mt-2 rounded-pill pa-2"
                              v-bind="activatorProps"
                              text="EXIT"
                              variant="flat"
                              block
                              @click="isActive.value = false"
                            ></v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              color="primary"
                              class="font-weight-bold mt-2 rounded-pill pa-4 ml-2"
                              text="BOOK"
                              variant="flat"
                              size="large"
                              @click="handleBookButtonClick(isActive)"
                            ></v-btn>
                          </v-col>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-15"> </v-spacer>
          <v-row justify="center" class="mb-8">
            <div
              class="custom-divider mx-auto"
              style="border-top: 3px solid black; width: 95%"
            ></div>
          </v-row>
        </div>

        <v-dialog v-model="bookingSuccessDialog" persistent max-width="400">
          <v-card>
            <v-card-title class="text-h5 primary lighten-1 white--text">
              <v-icon left>mdi-check-circle-outline</v-icon>
              Booking Successful!
            </v-card-title>
            <v-card-text>
              Your booking has been confirmed. Please contact the number given by the owner.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="closeBookingSuccessDialog"> Okay </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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

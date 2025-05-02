<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const router = useRouter()

const itemName = ref('')
const rentalFee = ref(null)
const description = ref('')
const photo = ref(null)
const location = ref('')
const availableDates = ref([])
const bookedDates = ref([])
const currentRentals = ref([])

onMounted(() => {
  const savedRentals = localStorage.getItem('currentRentals')
  if (savedRentals) {
    currentRentals.value = JSON.parse(savedRentals)
  }
})

function handleUpload(e) {
  const file = e.target.files[0]
  if (file) {
    photo.value = URL.createObjectURL(file)
  }
}

function getDateString(date) {
  const normalized = new Date(date)
  normalized.setHours(0, 0, 0, 0)
  return normalized.toISOString().split('T')[0]
}

function toggleDate({ date }) {
  const dateStr = getDateString(date)

  if (availableDates.value.includes(dateStr)) {
    // Move to booked
    availableDates.value = availableDates.value.filter((d) => d !== dateStr)
    bookedDates.value.push(dateStr)
  } else if (bookedDates.value.includes(dateStr)) {
    // Clear the date
    bookedDates.value = bookedDates.value.filter((d) => d !== dateStr)
  } else {
    // Make available
    availableDates.value.push(dateStr)
  }
}

function getDayClass(date) {
  const dateStr = getDateString(date)
  if (availableDates.value.includes(dateStr)) return 'available'
  if (bookedDates.value.includes(dateStr)) return 'booked'
  return ''
}

function addToList() {
  currentRentals.value.push({
    name: itemName.value,
    image: photo.value || '/images/sample-item.jpg',
    rentalPeriod: availableDates.value.join(', '),
    fee: `₱${parseFloat(rentalFee.value).toFixed(2)}`,
    description: description.value,
    location: location.value,
  })
  localStorage.setItem('currentRentals', JSON.stringify(currentRentals.value))
  alert('Item listed successfully!')
  router.push('/renterdashboard')
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="py-6">
        <!-- Navigation -->
        <v-row justify="center" align="center" class="mb-6">
          <v-col cols="auto" class="d-flex align-center">
            <v-img src="/images/EBlogo.png" width="160" height="160" contain />
            <v-sheet class="nav-container px-6 py-2 ml-4" color="white">
              <v-row align="center" no-gutters>
                <v-btn text class="nav-btn" @click="router.push('/renterdashboard')">Home</v-btn>
                <v-btn text class="nav-btn nav-btn-home">Rentals</v-btn>
                <v-btn text class="nav-btn" @click="router.push('/messages')">Messages</v-btn>
                <v-btn text class="nav-btn" @click="router.push('/profile')">Profile</v-btn>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- Divider -->
        <v-row justify="center" class="mb-8">
          <div class="custom-divider mx-auto"></div>
        </v-row>

        <!-- Listing Form -->
        <div class="yellow-section py-6 px-4">
          <!-- Inputs -->
          <v-row class="mb-4">
            <v-col cols="12" sm="6">
              <v-text-field v-model="itemName" label="Item Name" variant="solo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="rentalFee"
                label="Rental Fee (₱)"
                type="number"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12">
              <v-textarea
                label="Description"
                placeholder="Optional"
                variant="solo-filled"
                auto-grow
                v-model="description"
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- Image upload & calendar -->
          <v-row class="mb-4">
            <v-col cols="12" sm="6">
              <v-sheet class="image-upload-box d-flex align-center justify-center" color="#fff170">
                <v-img v-if="photo" :src="photo" height="120" />
                <v-icon v-else size="64">mdi-camera</v-icon>
              </v-sheet>
              <v-file-input
                hide-details
                accept="image/*"
                @change="handleUpload"
                prepend-icon="mdi-upload"
                label="Upload photo"
              ></v-file-input>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="calendar-box pa-4">
                <div class="calendar-header mb-2">Select Dates</div>
                <Datepicker :multi-dates="true" :day-class="getDayClass" @day-click="toggleDate" />
                <p class="text-caption mt-2">Click a date to toggle: Available → Booked → Clear</p>
              </div>
            </v-col>
          </v-row>

          <!-- Location -->
          <v-row class="mb-4">
            <v-col cols="12">
              <v-text-field
                v-model="location"
                prepend-inner-icon="mdi-map-marker"
                label="Location"
                variant="solo"
              />
            </v-col>
          </v-row>

          <v-row class="mb-6">
            <v-col cols="12">
              <v-img src="/images/sample-map.png" height="180" cover class="rounded-lg"></v-img>
            </v-col>
          </v-row>

          <!-- Submit -->
          <v-row justify="center">
            <v-btn class="submit-btn" color="yellow darken-2" @click="addToList"
              >Add to the list</v-btn
            >
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.nav-container {
  border: 2px solid #ffd700;
  border-radius: 15px;
  display: inline-block;
}
.nav-btn {
  font-weight: bold;
  color: black !important;
  margin-right: 20px;
  border-radius: 20px;
  background-color: white;
}
.nav-btn-home {
  border: 1px solid black !important;
  pointer-events: none;
}
.yellow-section {
  background-color: #fff170;
  border-radius: 16px;
}
.custom-divider {
  width: 95%;
  height: 2px;
  background-color: black;
  border-radius: 2px;
}
.image-upload-box {
  width: 100%;
  height: 140px;
  border-radius: 12px;
  border: 1px dashed #333;
}
.calendar-box {
  background-color: white;
  border-radius: 12px;
}
.calendar-header {
  font-weight: bold;
  font-size: 16px;
}
.submit-btn {
  border-radius: 30px;
  padding: 16px 40px;
  font-size: 16px;
  font-weight: bold;
}
:deep(.dp__cell.available) {
  background-color: #4caf50 !important;
  color: white !important;
  border-radius: 8px;
}
:deep(.dp__cell.booked) {
  background-color: #f44336 !important;
  color: white !important;
  border-radius: 8px;
}
:deep(.dp__cell.available) {
  background-color: #4caf50 !important;
  color: white !important;
  border-radius: 8px;
}

:deep(.dp__cell.booked) {
  background-color: #f44336 !important;
  color: white !important;
  border-radius: 8px;
}
</style>

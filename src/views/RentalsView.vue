<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const router = useRouter()
const currentRentals = ref([])
const viewIndex = ref(0) // 0: Add Item, 1: Listed Items, 2: Bookings

const itemName = ref('')
const description = ref('')
const location = ref('')
const photo = ref(null)
const availableDates = ref([])
const quantity = ref(1)
const rentalFee = ref('')
const editingIndex = ref(null)

const bookings = ref([
  {
    name: 'Electric Drill',
    location: 'Ampayon, Butuan City',
    image: '/images/electricdrill.jpg',
    rentalPeriod: '2023-10-01, 2023-10-02',
    quantity: 1,
    fee: 200,
  },
])
function handleUpload(e) {
  const file = e.target.files[0]
  if (file) photo.value = URL.createObjectURL(file)
}

function getDayClass(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const iso = d.toISOString().split('T')[0]
  return availableDates.value.map((d) => new Date(d).toISOString().split('T')[0]).includes(iso)
    ? 'available'
    : ''
}

function formatDateList(dates) {
  return dates.map((date) => new Date(date).toLocaleDateString()).join(', ')
}

function addToList() {
  if (!availableDates.value.length) {
    alert('Please select at least one available date.')
    return
  }
  const newItem = {
    name: itemName.value,
    description: description.value,
    location: location.value,
    image: photo.value || '/images/sample-item.jpg',
    rentalPeriod: formatDateList(availableDates.value),
    quantity: quantity.value,
    fee: rentalFee.value,
    rawDates: [...availableDates.value],
  }
  if (editingIndex.value !== null) {
    currentRentals.value[editingIndex.value] = newItem
    editingIndex.value = null
  } else {
    currentRentals.value.push(newItem)
  }
  localStorage.setItem('currentRentals', JSON.stringify(currentRentals.value))
  resetForm()
  viewIndex.value = 1
}

function editItem(index) {
  const item = currentRentals.value[index]
  itemName.value = item.name
  description.value = item.description
  location.value = item.location
  photo.value = item.image
  rentalFee.value = item.fee
  quantity.value = item.quantity
  availableDates.value = item.rawDates || []
  editingIndex.value = index
  viewIndex.value = 0
}

function resetForm() {
  itemName.value = ''
  description.value = ''
  location.value = ''
  photo.value = null
  rentalFee.value = ''
  quantity.value = 1
  availableDates.value = []
  editingIndex.value = null
}

function deleteItem(index) {
  if (confirm('Are you sure you want to delete this item?')) {
    currentRentals.value.splice(index, 1)
    localStorage.setItem('currentRentals', JSON.stringify(currentRentals.value))
  }
}

function handleKeyPress(e) {
  if (e.key === 'ArrowLeft') {
    viewIndex.value = (viewIndex.value + 2) % 3
  } else if (e.key === 'ArrowRight') {
    viewIndex.value = (viewIndex.value + 1) % 3
  }
}

watchEffect(() => {
  const slideParam = router.currentRoute.value.query.slide
  const slideNum = parseInt(slideParam)
  if (!isNaN(slideNum) && slideNum >= 0 && slideNum <= 2) {
    viewIndex.value = slideNum
  }
})

onMounted(() => {
  const saved = localStorage.getItem('currentRentals')
  currentRentals.value = saved ? JSON.parse(saved) : []
  window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="py-6">
        <!-- NAVIGATION -->
        <v-row justify="center" align="center" class="mb-6">
          <v-col cols="auto" class="d-flex align-center">
            <v-img src="/images/EBlogo.png" width="160" height="160" contain />
            <v-sheet class="nav-container px-6 py-2 ml-4" color="white">
              <v-row align="center" no-gutters>
                <v-btn text class="nav-btn" @click="router.push('/renterdashboard')">Home</v-btn>
                <v-btn text class="nav-btn nav-btn-home">Rentals</v-btn>
                <v-btn text class="nav-btn" @click="router.push('/renterprofile')">Profile</v-btn>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- DIVIDER -->
        <v-row justify="center" class="mb-6">
          <div class="custom-divider mx-auto"></div>
        </v-row>

        <!-- DOT NAVIGATION -->
        <v-row justify="center" class="mb-6">
          <v-col cols="auto">
            <div class="dot-nav">
              <span :class="{ dot: true, active: viewIndex === 0 }" @click="viewIndex = 0"></span>
              <span :class="{ dot: true, active: viewIndex === 1 }" @click="viewIndex = 1"></span>
              <span :class="{ dot: true, active: viewIndex === 2 }" @click="viewIndex = 2"></span>
            </div>
          </v-col>
        </v-row>

        <!-- ADD NEW ITEM -->
        <div v-if="viewIndex === 0" class="item-list-yellow rounded-lg pa-6">
          <h3 class="list-header text-center">Add New Item</h3>
          <div class="underline mb-6"></div>
          <v-row class="mb-4">
            <v-col cols="12" sm="6">
              <v-text-field v-model="itemName" label="Item Name" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="location" label="Location" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="description" label="Description" rows="3" />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field v-model="quantity" type="number" label="Quantity" />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field v-model="rentalFee" type="number" prefix="₱" label="Rental Fee" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-file-input label="Upload Photo" accept="image/*" @change="handleUpload" />
              <v-img v-if="photo" :src="photo" class="mt-2 rounded-lg" height="120" cover />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="calendar-box pa-4">
                <div class="calendar-header mb-2">Select Available Dates</div>
                <Datepicker v-model="availableDates" :multi-dates="true" :day-class="getDayClass" />
                <p class="text-caption mt-2">Click a date to toggle availability</p>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn color="yellow darken-2" @click="addToList">
                {{ editingIndex !== null ? 'Save Changes' : 'Add to the list' }}
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <!-- LISTED ITEMS -->
        <div v-else-if="viewIndex === 1" class="item-list-yellow rounded-lg pa-6">
          <h3 class="list-header text-center">My Listed Items</h3>
          <div class="underline mb-6"></div>
          <v-row dense>
            <v-col v-for="(it, i) in currentRentals" :key="i" cols="12" class="mb-4">
              <v-sheet
                class="d-flex justify-space-between align-center pa-4 rounded-xl"
                elevation="2"
                color="white"
              >
                <div class="d-flex align-center item-clickable" @click="editItem(i)">
                  <v-img :src="it.image" width="120" height="120" class="rounded-lg" cover />
                  <v-col class="item-info">
                    <div class="font-weight-bold mb-1 text-lg">{{ it.name }}</div>
                    <div class="mb-1">Location: {{ it.location }}</div>
                    <div class="mb-1">Description: {{ it.description }}</div>
                    <div class="mb-1">Available date(s): {{ it.rentalPeriod }}</div>
                    <div class="mb-1">Rental Fee: ₱{{ it.fee }}</div>
                    <div>Quantity: {{ it.quantity }}</div>
                  </v-col>
                </div>
                <v-btn icon color="red" @click.stop="deleteItem(i)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </div>

        <!-- BOOKINGS PLACEHOLDER -->
        <!-- BOOKINGS VIEW -->
        <div v-else class="item-list-yellow rounded-lg pa-6">
          <h3 class="list-header text-center">View Bookings</h3>
          <div class="underline mb-6"></div>
          <v-row dense>
            <v-col v-for="(booking, index) in bookings" :key="index" cols="12" class="mb-4">
              <v-sheet class="d-flex flex-column pa-4 rounded-xl" elevation="2" color="white">
                <div
                  class="d-flex align-center item-clickable justify-space-between"
                  @click="toggleBookingDetails(index)"
                >
                  <div class="d-flex align-center">
                    <v-img :src="booking.image" width="100" height="100" class="rounded-lg" cover />
                    <v-col class="item-info">
                      <div class="font-weight-bold mb-1 text-lg">{{ booking.name }}</div>
                      <div class="mb-1">Location: {{ booking.location }}</div>
                      <div class="mb-1">Rental Fee: ₱{{ booking.fee }}</div>
                      <div class="mb-1">Quantity: {{ booking.quantity }}</div>
                      <div class="booking-label">Rental Period: {{ booking.rentalPeriod }}</div>
                      <div class="booking-label">Booked</div>
                    </v-col>
                  </div>
                  <v-icon>{{
                    expandedBookingIndex === index ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </div>

                <v-expand-transition>
                  <div v-if="expandedBookingIndex === index" class="mt-3 pl-3">
                    <div><strong>Description:</strong> {{ booking.description }}</div>
                    <div>
                      <strong>Booking Dates:</strong> {{ formatDateList(booking.bookingDates) }}
                    </div>
                    <div><strong>Rentee Name:</strong> {{ booking.renteeName }}</div>
                    <div><strong>Contact:</strong> {{ booking.renteeContact }}</div>
                  </div>
                </v-expand-transition>
              </v-sheet>
            </v-col>
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
}
.nav-btn {
  font-weight: bold;
  color: black !important;
  margin-right: 20px;
  border-radius: 20px;
}
.nav-btn-home {
  border: 1px solid black !important;
  pointer-events: none;
}
.custom-divider {
  width: 95%;
  height: 2px;
  background: black;
}
.item-list-yellow {
  background: #fff170;
}
.list-header {
  font-family: 'Kaushan Script', cursive;
  font-size: 2rem;
}
.underline {
  height: 2px;
  background: #000;
  margin: 0.5rem auto 1.5rem;
  width: 60%;
}
.item-info {
  padding-left: 20px;
}
.calendar-box {
  background: white;
  border-radius: 12px;
}
.calendar-header {
  font-weight: bold;
  font-size: 16px;
}
:deep(.dp__cell.available) {
  background-color: #4caf50 !important;
  color: white !important;
  border-radius: 8px;
}
.item-clickable {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.item-clickable:hover {
  background-color: #ffec99;
}
.dot-nav {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: gray;
  cursor: pointer;
  transition: background 0.3s ease;
}
.dot.active {
  background: black;
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { supabase } from '@/utils/supabase.js'

const router = useRouter()
const is_public = ref(true)
const viewIndex = ref(0)

const title = ref('')
const images = ref(null)
const available_dates = ref([])
const quantity = ref(1)
const rental_fee = ref('')
const location = ref('')
const description = ref('')
const editingIndex = ref(null)
const owner_id = ref(null)
const currentRentals = ref([])

function handleUpload(e) {
  const file = e.target.files[0]
  if (file) images.value = URL.createObjectURL(file)
}

function getDayClass(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const iso = d.toISOString().split('T')[0]
  return available_dates.value.map((d) => new Date(d).toISOString().split('T')[0]).includes(iso)
    ? 'available'
    : ''
}

function formatDateList(datesJson) {
  try {
    const dates = JSON.parse(datesJson)
    return dates
      .map((d) =>
        new Date(d).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      )
      .join(', ')
  } catch {
    return ''
  }
}

async function addToList() {
  if (!available_dates.value.length) {
    alert('Please select at least one available date.')
    return
  }

  if (!owner_id.value) {
    alert('User not authenticated. Please log in again.')
    return
  }

  const formattedDates = available_dates.value.map((date) => new Date(date).toISOString())
  const newItem = {
    title: title.value,
    images: images.value || '/images/sample-item.jpg',
    quantity: quantity.value,
    rental_fee: rental_fee.value,
    available_dates: JSON.stringify(formattedDates),
    owner_id: owner_id.value,
    location: location.value,
    description: description.value,
  }

  if (editingIndex.value !== null) {
    const { error } = await supabase
      .from('items')
      .update(newItem)
      .eq('id', currentRentals.value[editingIndex.value].id)
    if (error) {
      console.error('Update error:', error)
      return alert('Error updating item.')
    }
    editingIndex.value = null
  } else {
    const { error } = await supabase.from('items').insert([newItem])
    if (error) {
      console.error('Insert error:', error)
      return alert('Error adding item. Check console.')
    }
  }

  resetForm()
  fetchRentals()
  viewIndex.value = 1
}

function editItem(index) {
  const item = currentRentals.value[index]
  title.value = item.title
  images.value = item.images
  rental_fee.value = item.rental_fee
  quantity.value = item.quantity
  location.value = item.location || ''
  description.value = item.description || ''
  try {
    available_dates.value = JSON.parse(item.available_dates || '[]')
  } catch {
    available_dates.value = []
  }
  editingIndex.value = index
  viewIndex.value = 0
}

function resetForm() {
  title.value = ''
  images.value = null
  rental_fee.value = ''
  quantity.value = 1
  available_dates.value = []
  location.value = ''
  description.value = ''
  editingIndex.value = null
}

async function deleteItem(index) {
  const confirmDelete = confirm('Are you sure you want to delete this item?')
  if (!confirmDelete) return

  const id = currentRentals.value[index].id
  const { error } = await supabase.from('items').delete().eq('id', id)
  if (!error) fetchRentals()
}

function handleKeyPress(e) {
  if (e.key === 'ArrowLeft') viewIndex.value = (viewIndex.value + 2) % 3
  else if (e.key === 'ArrowRight') viewIndex.value = (viewIndex.value + 1) % 3
}

watchEffect(() => {
  const slideParam = router.currentRoute.value.query.slide
  const slideNum = parseInt(slideParam)
  if (!isNaN(slideNum) && slideNum >= 0 && slideNum <= 2) {
    viewIndex.value = slideNum
  }
})

async function fetchRentals() {
  const { data: userData } = await supabase.auth.getUser()
  owner_id.value = userData?.user?.id
  const { data, error } = await supabase.from('items').select('*').eq('owner_id', owner_id.value)
  if (!error) currentRentals.value = data
}

onMounted(() => {
  fetchRentals()
  window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <v-row class="mb-4">
    <v-col cols="12" sm="6">
      <v-switch v-model="is_public" label="Make this item public" />
    </v-col>
  </v-row>

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
                <v-btn text class="nav-btn" @click="router.push('/rentermessages')">Messages</v-btn>
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

        <!-- VIEWS -->
        <div v-if="viewIndex === 0" class="item-list-yellow rounded-lg pa-6">
          <h3 class="list-header text-center">Add New Item</h3>
          <div class="underline mb-6"></div>

          <v-row class="mb-4">
            <v-col cols="12" sm="6">
              <v-text-field v-model="title" label="Item Name" />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field v-model="quantity" type="number" label="Quantity" />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field v-model="rental_fee" type="number" prefix="₱" label="Rental Fee" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="location" label="Location" />
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12">
              <v-textarea v-model="description" label="Item Description" rows="3" />
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" sm="6">
              <v-file-input label="Upload Photo" accept="image/*" @change="handleUpload" />
              <v-img v-if="images" :src="images" class="mt-2 rounded-lg" height="120" cover />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="calendar-box pa-4">
                <div class="calendar-header mb-2">Select Available Dates</div>
                <Datepicker
                  v-model="available_dates"
                  :multi-dates="true"
                  :day-class="getDayClass"
                />
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
                  <v-img :src="it.images" width="120" height="120" class="rounded-lg" cover />
                  <v-col class="item-info">
                    <div class="font-weight-bold mb-1 text-lg">{{ it.title }}</div>
                    <div class="mb-1">
                      Available date(s): {{ formatDateList(it.available_dates) }}
                    </div>
                    <div class="mb-1">Rental Fee: ₱{{ it.rental_fee }}</div>
                    <div class="mb-1">Location: {{ it.location }}</div>
                    <div class="mb-1">Quantity: {{ it.quantity }}</div>
                    <div class="mb-1">Description: {{ it.description }}</div>
                  </v-col>
                </div>
                <v-btn icon color="red" @click.stop="deleteItem(i)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </div>

        <div v-else class="item-list-yellow rounded-lg pa-6">
          <h3 class="list-header text-center">View Bookings</h3>
          <div class="underline mb-6"></div>
          <p class="text-center">No bookings yet. (Placeholder for booking data)</p>
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

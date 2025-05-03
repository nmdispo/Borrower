<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const activeIndex = ref(0)
const currentPath = ref(route.path)

const userFirstName = ref('')

onMounted(() => {
  const storedName = localStorage.getItem('userFirstName')
  userFirstName.value = storedName ? storedName : 'Ella'
})

function navigateTo(path) {
  router.push(path)
}
watchEffect(() => {
  currentPath.value = route.path
})

const messages = ref([
  { name: 'Jannah', preview: '2 messages from Jannah', avatar: '👩', status: 'online' },
  { name: 'Honey', preview: '5 messages from Honey', avatar: '🧑', status: 'online' },
  { name: 'Dan', preview: 'Thank you!', avatar: '🧔', status: 'online' },
  { name: 'Joseph', preview: 'You replied to Joseph', avatar: '👨‍💼', status: 'online' },
  { name: 'Marian', preview: "Thanks ma'am", avatar: '👩', status: 'online' },
  { name: 'Andrei', preview: 'You replied to Andrei', avatar: '👨‍💼', status: 'online' },
  { name: 'Yuri', preview: 'You replied to Yuri', avatar: '🧑', status: 'online' },
  { name: 'Beth', preview: 'You replied to Beth', avatar: '👩', status: 'online' },
  { name: 'Queen', preview: 'Queen unsent a message', avatar: '👑', status: 'online' },
])

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
        <!-- Navigation -->
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
                  :class="{ active: route.path === '/renteeMessages' }"
                  @click="navigateTo('renteeMessages')"
                  >Messages</v-btn
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

        <div class="yellow-section py-8 px-4">
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>
          <v-row justify="center" class="mb-4">
            <h2 class="hello-text">Messages</h2>
          </v-row>

          <!-- Welcome Text -->

          <!-- Black Line -->

          <v-row justify="center" class="mb-8">
            <div
              class="custom-divider mx-auto"
              style="border-top: 3px solid black; width: 95%"
            ></div>
          </v-row>
          <v-row>
            <div></div>
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

          <v-list class="px-4" lines="two">
            <v-list-item
              v-for="(msg, index) in messages"
              :key="index"
              :class="index === activeIndex ? 'bg-indigo-lighten-4 rounded-lg' : ''"
              @click="activeIndex = index"
            >
              <template #prepend>
                <v-avatar color="white">
                  <span class="text-h6">{{ msg.avatar }}</span>
                </v-avatar>
                <v-icon color="green" size="10" class="ml-1 mt-5">mdi-circle</v-icon>
              </template>

              <v-list-item-title class="font-weight-bold text-lg">{{ msg.name }}</v-list-item-title>
              <v-list-item-subtitle class="text-body-2">{{ msg.preview }}</v-list-item-subtitle>

              <template #append>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-list-item>
          </v-list>
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

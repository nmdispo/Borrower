<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const userFirstName = ref('')
const profileImage = ref('/images/default-profile.png') // Default image path

onMounted(() => {
  const storedName = localStorage.getItem('userFirstName')
  userFirstName.value = storedName ? storedName : 'Ella'

  //  Load profile image from local storage if available
  const storedImage = localStorage.getItem('profileImage')
  if (storedImage) {
    profileImage.value = storedImage
  }
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

// Function to handle profile image selection
const selectProfileImage = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      profileImage.value = e.target.result
      localStorage.setItem('profileImage', e.target.result) // Save to local storage
    }

    reader.readAsDataURL(file)
  }
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
                >
                  Home
                </v-btn>
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteeRentals' }"
                  @click="navigateTo('renteeRentals')"
                >
                  Rentals
                </v-btn>
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteeMessages' }"
                  @click="navigateTo('renteeMessages')"
                >
                  Messages
                </v-btn>
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteeProfile' }"
                  @click="navigateTo('/renteeProfile')"
                >
                  Profile
                </v-btn>
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
            <h2 class="hello-text">Profile</h2>
          </v-row>

          <v-row justify="center" class="mb-8">
            <div
              class="custom-divider mx-auto"
              style="border-top: 3px solid black; width: 95%"
            ></div>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <div class="d-flex flex-column align-center">
                <v-avatar size="200" class="mb-2">
                  <v-img
                    src="/images/profilepic.jpeg"
                    alt="Profile"
                    cover
                    aspect-ratio="16/3"
                  ></v-img>
                </v-avatar>
                <div class="d-flex">
                  <input
                    type="file"
                    accept="image/*"
                    @change="selectProfileImage"
                    style="display: none"
                    ref="profileImageInput"
                  />
                  <v-btn icon @click="$refs.profileImageInput.click()">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <h1 class="text-center" style="font-size: 30px">Queen- Anns Sajolga</h1>
                <h2 class="text-center" style="font-size: 20px">queenanns.07@gmail.com</h2>
              </div>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-8">
            <div
              class="custom-divider mx-auto"
              style="border-top: 3px solid black; width: 95%"
            ></div>
          </v-row>
          <v-row justify="start" class="mb-6">
            <h2 class="section-title" style="padding-left: 50px">Profile Information</h2>
          </v-row>
          <v-row justify="start" class="mb-6">
            <h3 class="section-title" style="padding-left: 50px">Password and Security</h3>
          </v-row>
          <v-row justify="start" class="mb-6">
            <h4 class="section-title" style="padding-left: 50px">Activity Log</h4>
          </v-row>
          <v-row justify="start" class="mb-6">
            <h5 class="section-title" style="padding-left: 50px">Business Integration</h5>
          </v-row>
          <v-row justify="start" class="mb-6">
            <h6 class="section-title" style="padding-left: 50px">Community Standard</h6>
          </v-row>
          <v-row justify="start" class="mb-6">
            <v-icon
              icon="mdi-delete-forever"
              size="x-large"
              class="mr-4"
              style="padding-left: 16px; color: red; margin-top: 8px"
            ></v-icon>
            <h6 class="section-title" style="color: red">Delete account</h6>
          </v-row>
        </div>
        <v-row justify="center" class="mb-8">
          <div class="custom-divider mx-auto" style="border-top: 3px solid black; width: 95%"></div>
        </v-row>
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

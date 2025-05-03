<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const activeIndex = ref(null)
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
  {
    name: 'Jannah',
    preview: '2 messages from Jannah',
    avatar: '👩',
    status: 'online',
    id: 'jannah',
  },
  { name: 'Honey', preview: '5 messages from Honey', avatar: '🧑', status: 'online', id: 'honey' },
  { name: 'Dan', preview: 'Thank you!', avatar: '🧔', status: 'online', id: 'dan' },
  {
    name: 'Joseph',
    preview: 'You replied to Joseph',
    avatar: '👨‍💼',
    status: 'online',
    id: 'joseph',
  },
  { name: 'Marian', preview: "Thanks ma'am", avatar: '👩', status: 'online', id: 'marian' },
  {
    name: 'Andrei',
    preview: 'You replied to Andrei',
    avatar: '👨‍💼',
    status: 'online',
    id: 'andrei',
  },
  { name: 'Yuri', preview: 'You replied to Yuri', avatar: '🧑', status: 'online', id: 'yuri' },
  { name: 'Beth', preview: 'You replied to Beth', avatar: '👩', status: 'online', id: 'beth' },
  { name: 'Queen', preview: 'Queen unsent a message', avatar: '👑', status: 'online', id: 'queen' },
])

const loaded = ref(false)
const loading = ref(false)

// Pop-up messenger variables
const dialog = ref(false)
const selectedUser = ref(null)
const newMessage = ref('')
const chatMessages = ref([]) // To hold messages for the current user

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}

function openMessengerPopup(message) {
  selectedUser.value = message
  dialog.value = true
  // In a real application, you'd fetch messages for this user here
  chatMessages.value = [
    { text: `Chatting with ${message.name}...`, isSent: false }, // Dummy message
  ]
}

function sendMessage() {
  if (newMessage.value.trim() !== '' && selectedUser.value) {
    chatMessages.value.push({ text: newMessage.value, isSent: true })
    newMessage.value = ''
    // In a real application, you'd send the message to the server for selectedUser.value.id
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
              @click="openMessengerPopup(msg)"
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

        <v-dialog v-model="dialog" width="auto">
          <v-card v-if="selectedUser">
            <v-toolbar color="#fff170" flat>
              <v-toolbar-title class="font-weight-bold">{{ selectedUser.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="message-area pa-4" style="height: 300px; overflow-y: auto">
              <div
                v-for="(chatMsg, index) in chatMessages"
                :key="index"
                :class="{ sent: chatMsg.isSent, received: !chatMsg.isSent }"
                class="mb-2"
              >
                <v-chip v-if="!chatMsg.isSent" class="mr-2" color="#e0f7fa" label small>{{
                  selectedUser.avatar
                }}</v-chip>
                <span
                  class="message-text rounded-pill pa-2"
                  :style="{ 'background-color': chatMsg.isSent ? '#e6ee9c' : '#f0f4c3' }"
                  >{{ chatMsg.text }}</span
                >
                <v-chip v-if="chatMsg.isSent" class="ml-2" color="#e6ee9c" label small>👤</v-chip>
              </div>
            </v-card-text>
            <v-card-actions class="pa-2">
              <v-text-field
                v-model="newMessage"
                placeholder="Send a message"
                variant="outlined"
                rounded="pill"
                hide-details
                class="flex-grow-1 mr-2"
                @keyup.enter="sendMessage"
              ></v-text-field>
              <v-btn icon color="#ffd700" @click="sendMessage">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Styles (unchanged) */
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

.message-area {
  display: flex;
  flex-direction: column;
}

.sent {
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
}

.received {
  align-items: flex-start;
  justify-content: flex-start;
  display: flex;
}

.message-text {
  padding: 8px 12px;
  border-radius: 18px;
  word-break: break-word;
}
</style>

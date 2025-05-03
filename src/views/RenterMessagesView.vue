<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = ref('')
const activeIndex = ref(0)
const currentPath = ref(route.path)

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

function navigateTo(path) {
  router.push(path)
}
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
                <v-btn text class="nav-btn" @click="navigateTo('/renterdashboard')">Home</v-btn>
                <v-btn text class="nav-btn" @click="navigateTo('/rentals')">Rentals</v-btn>
                <v-btn text class="nav-btn nav-btn-active">Messages</v-btn>
                <v-btn text class="nav-btn" @click="navigateTo('/renterprofile')">Profile</v-btn>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- MESSAGES PANEL -->
        <div class="item-list-yellow rounded-lg pa-6">
          <h3 class="list-header text-center">Messages</h3>
          <div class="underline mb-6"></div>

          <!-- Search -->
          <v-row justify="center" class="mb-4">
            <v-text-field
              v-model="search"
              append-inner-icon="mdi-magnify"
              placeholder="Search Messenger"
              hide-details
              variant="solo"
              flat
              class="rounded-pill"
              style="max-width: 400px"
            />
          </v-row>

          <!-- Messages List -->
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
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');

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
.nav-btn-active {
  border: 1px solid black !important;
  pointer-events: none;
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
.v-list-item {
  cursor: pointer;
  transition: background-color 0.2s;
}
</style>

<template>
  <v-container fluid class="messenger-view py-6">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card rounded="lg">
          <v-toolbar color="#fff170" flat>
            <v-btn icon @click="$router.go(-1)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title class="font-weight-bold">{{ userName }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-avatar right>
              <span class="text-h6">{{ userAvatar }}</span>
            </v-avatar>
          </v-toolbar>
          <v-card-text class="message-area pa-4" style="height: 400px; overflow-y: auto">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="{ sent: message.isSent, received: !message.isSent }"
              class="mb-2"
            >
              <v-chip v-if="!message.isSent" class="mr-2" color="#e0f7fa" label small>{{
                userAvatar
              }}</v-chip>
              <span
                class="message-text rounded-pill pa-2"
                :style="{ 'background-color': message.isSent ? '#e6ee9c' : '#f0f4c3' }"
                >{{ message.text }}</span
              >
              <v-chip v-if="message.isSent" class="ml-2" color="#e6ee9c" label small>{{
                loggedInAvatar
              }}</v-chip>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = ref(route.params.userId)
const userName = ref('')
const userAvatar = ref('')
const loggedInAvatar = ref('👤') // Replace with the logged-in user's avatar
const newMessage = ref('')
const messages = ref([])

// Dummy message data - replace with your actual data fetching logic
const allMessagesData = {
  jannah: [
    { text: 'Hello there! How may I help you?', isSent: false },
    { text: 'Can I see more photos of the property?', isSent: true },
    { text: 'Certainly, please find them attached.', isSent: false },
    { text: 'Okay, thank you for the information.', isSent: true },
  ],
  honey: [
    { text: 'Hi, just checking if the rental is still available.', isSent: false },
    { text: 'Yes, it is!', isSent: true },
  ],
  // Add more message data for other users
}

// Dummy user data - replace with your actual data fetching logic
const usersData = {
  jannah: { name: 'Jannah', avatar: '👩' },
  honey: { name: 'Honey', avatar: '🧑' },
  dan: { name: 'Dan', avatar: '🧔' },
  joseph: { name: 'Joseph', avatar: '👨‍💼' },
  marian: { name: 'Marian', avatar: '👩' },
  andrei: { name: 'Andrei', avatar: '👨‍💼' },
  yuri: { name: 'Yuri', avatar: '🧑' },
  beth: { name: 'Beth', avatar: '👩' },
  queen: { name: 'Queen', avatar: '👑' },
}

onMounted(() => {
  if (usersData[userId.value]) {
    userName.value = usersData[userId.value].name
    userAvatar.value = usersData[userId.value].avatar
  }
  if (allMessagesData[userId.value]) {
    messages.value = allMessagesData[userId.value]
  }
})

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    messages.value.push({ text: newMessage.value, isSent: true })
    newMessage.value = ''
    // In a real application, you would send this message to the server
  }
}
</script>

<style scoped>
.messenger-view {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
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

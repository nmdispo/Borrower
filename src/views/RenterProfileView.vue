<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const router = useRouter()

const userMeta = ref({})
const profilePicUrl = ref('/images/default-avatar.png')
const editable = ref(false)
const loading = ref(false)
const fileInput = ref(null)

const form = ref({
  full_name: '',
  phone: '',
  address: '',
  role: '',
  school_id: '',
  photo: '',
})

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.error('User fetch failed:', error?.message)
    return
  }

  const user = data.user
  userMeta.value = user.user_metadata || {}

  form.value = {
    full_name: userMeta.value.full_name || '',
    phone: userMeta.value.phone || '',
    address: userMeta.value.address || '',
    role: userMeta.value.role || '',
    school_id: userMeta.value.school_id || '',
    photo: '',
  }

  loadProfileImage(user.id)
})

function navigateTo(path) {
  router.push(path)
}

const toggleEdit = () => {
  editable.value = !editable.value
}

const triggerFileUpload = () => {
  if (fileInput.value) fileInput.value.click()
}

const uploadPhoto = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  loading.value = true

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    console.error('Failed to get user:', userError?.message)
    loading.value = false
    return
  }

  const userId = userData.user.id
  const filePath = `${userId}/profile.jpg`

  const { error: uploadError } = await supabase.storage.from('user-photos').upload(filePath, file, {
    cacheControl: '3600',
    upsert: true,
  })

  if (uploadError) {
    console.error('Upload failed:', uploadError.message)
    loading.value = false
    return
  }

  await loadProfileImage(userId)
  loading.value = false
}

const loadProfileImage = async (userId) => {
  const filePath = `${userId}/profile.jpg`

  const { data, error } = await supabase.storage.from('user-photos').getPublicUrl(filePath)

  if (error || !data?.publicUrl) {
    console.error('Image fetch failed:', error?.message)
    profilePicUrl.value = '/images/default-avatar.png'
    return
  }

  profilePicUrl.value = `${data.publicUrl}?t=${Date.now()}`
}

const saveProfile = async () => {
  loading.value = true

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: form.value.full_name,
      phone: form.value.phone,
      address: form.value.address,
      role: form.value.role,
      school_id: form.value.school_id,
    },
  })

  if (error) {
    console.error('Profile update failed:', error.message)
  } else {
    userMeta.value = { ...form.value }
    editable.value = false
  }

  loading.value = false
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
                <v-btn text class="nav-btn" @click="navigateTo('/rentermessages')">Messages</v-btn>
                <v-btn text class="nav-btn nav-btn-active">Profile</v-btn>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- PROFILE CARD -->
        <v-card class="item-list-yellow rounded-xl mx-auto pa-6" max-width="600">
          <h3 class="list-header text-center mb-4">My Profile</h3>
          <div class="underline mb-6"></div>

          <!-- Profile Picture -->
          <v-row justify="center" class="mb-2">
            <v-avatar size="120">
              <v-img
                :src="profilePicUrl"
                alt="Profile"
                cover
                @error="profilePicUrl = '/images/default-avatar.png'"
              />
            </v-avatar>
          </v-row>

          <!-- Upload Photo Button -->
          <v-row justify="center" class="mb-4">
            <v-btn color="primary" @click="triggerFileUpload" :loading="loading">
              Upload Photo
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="uploadPhoto"
            />
          </v-row>

          <!-- Form -->
          <v-form>
            <v-text-field
              v-model="form.full_name"
              label="Full Name"
              :readonly="!editable"
              class="mb-4"
            />
            <v-text-field v-model="form.phone" label="Phone" :readonly="!editable" class="mb-4" />
            <v-text-field
              v-model="form.address"
              label="Address"
              :readonly="!editable"
              class="mb-4"
            />
            <v-text-field v-model="form.role" label="Role" :readonly="!editable" class="mb-4" />
            <v-text-field
              v-model="form.school_id"
              label="School ID"
              :readonly="!editable"
              class="mb-4"
            />

            <!-- Buttons -->
            <v-row justify="center" class="mt-4">
              <v-btn v-if="!editable" color="primary" @click="toggleEdit">Edit Profile</v-btn>
              <v-btn v-else color="success" @click="saveProfile" :loading="loading">Save</v-btn>
              <v-btn v-if="editable" text @click="toggleEdit">Cancel</v-btn>
            </v-row>
          </v-form>
        </v-card>
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
</style>

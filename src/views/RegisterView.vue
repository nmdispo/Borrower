<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase.js'

const theme = ref('light')
const router = useRouter()

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const formAction = ref({ ...formActionDefault })

const validateForm = () => {
  const { firstName, lastName, email, phone, address, password, confirmPassword } = formData.value

  if (!firstName || !lastName || !email || !phone || !address || !password || !confirmPassword) {
    formAction.value.formErrorMessage = 'Please complete all fields.'
    return false
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    formAction.value.formErrorMessage = 'Enter a valid email address.'
    return false
  }

  if (!/^\d{11}$/.test(phone)) {
    formAction.value.formErrorMessage = 'Phone number must be 11 digits.'
    return false
  }

  if (password.length < 8) {
    formAction.value.formErrorMessage = 'Password must be at least 8 characters long.'
    return false
  }

  if (password !== confirmPassword) {
    formAction.value.formErrorMessage = 'Passwords do not match.'
    return false
  }

  return true
}

async function handleRegister() {
  formAction.value = { ...formActionDefault, formProcess: true }
  formAction.value.formErrorMessage = ''

  if (!validateForm()) {
    formAction.value.formProcess = false
    return
  }

  try {
    const { error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          full_name: `${formData.value.firstName} ${formData.value.lastName}`,
          first_name: formData.value.firstName,
          last_name: formData.value.lastName,
          phone: formData.value.phone,
          address: formData.value.address,
          role: 'RENTER',
          photo: null,
        },
      },
    })

    if (error) throw error

    formAction.value.formSuccessMessage = 'Registration successful! Please verify your email.'
    formAction.value.formProcess = false
    router.push('/')
  } catch (error) {
    formAction.value.formErrorMessage = error.message || 'An error occurred during registration.'
    formAction.value.formProcess = false
  }
}
</script>

<template>
  <v-app :theme="theme">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="mx-auto">
            <v-card class="mx-auto elevation-24 pa-6">
              <v-img src="@/assets/images/EBlogo.png" :width="300" class="mx-auto mb-4" />
              <h2 class="text-center mb-4">Register to EASY BORROW</h2>

              <v-form @submit.prevent="handleRegister">
                <v-text-field
                  v-model="formData.firstName"
                  label="First Name"
                  :rules="[v => !!v || 'First name is required']"
                  required
                />
                <v-text-field
                  v-model="formData.lastName"
                  label="Last Name"
                  :rules="[v => !!v || 'Last name is required']"
                  required
                />
                <v-text-field
                  v-model="formData.email"
                  label="Email"
                  type="email"
                  :rules="[
                    v => !!v || 'Email is required',
                    v => /.+@.+\..+/.test(v) || 'Email must be valid'
                  ]"
                  required
                />
                <v-text-field
                  v-model="formData.phone"
                  label="Phone Number"
                  :rules="[
                    v => !!v || 'Phone number is required',
                    v => /^\d{11}$/.test(v) || 'Phone number must be 11 digits'
                  ]"
                  required
                />
                <v-text-field
                  v-model="formData.address"
                  label="Address"
                  :rules="[v => !!v || 'Address is required']"
                  required
                />
                <v-text-field
                  v-model="formData.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[
                    v => !!v || 'Password is required',
                    v => v.length >= 8 || 'Password must be at least 8 characters'
                  ]"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                  required
                />
                <v-text-field
                  v-model="formData.confirmPassword"
                  label="Confirm Password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :rules="[
                    v => !!v || 'Please confirm your password',
                    v => v === formData.password || 'Passwords must match'
                  ]"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  required
                />
                <v-btn
                  :loading="formAction.formProcess"
                  type="submit"
                  block
                  color="yellow-darken-2"
                  class="mt-4"
                >
                  {{ formAction.formProcess ? 'Registering...' : 'REGISTER NOW' }}
                </v-btn>
              </v-form>

              <v-alert
                v-if="formAction.formErrorMessage"
                type="error"
                class="mt-4"
                closable
                @click:close="formAction.formErrorMessage = ''"
              >
                {{ formAction.formErrorMessage }}
              </v-alert>
              <v-alert
                v-if="formAction.formSuccessMessage"
                type="success"
                class="mt-4"
                closable
                @click:close="formAction.formSuccessMessage = ''"
              >
                {{ formAction.formSuccessMessage }}
              </v-alert>

              <v-divider class="my-5" />
              <h5 class="text-center">
                Already have an account?
                <RouterLink to="/" class="text-decoration-none font-weight-bold">
                  Click here to LOGIN
                </RouterLink>
              </h5>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
.font-weight-bold {
  font-weight: bold;
}
</style>

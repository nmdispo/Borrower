<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')

// Password logic
const actualPassword = ref('')
const displayPassword = ref('')
const actualConfirmPassword = ref('')
const displayConfirmPassword = ref('')

let passwordTimeout = null
let confirmTimeout = null

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function handlePasswordInput(newVal) {
  const oldVal = displayPassword.value
  const oldLength = oldVal.length
  const newLength = newVal.length

  if (newLength < oldLength) {
    // Deletion
    actualPassword.value = actualPassword.value.slice(0, newLength)
  } else {
    // Addition
    const addedChar = newVal[newLength - 1]
    actualPassword.value += addedChar
  }

  displayPassword.value =
    '•'.repeat(newLength - 1) + actualPassword.value[actualPassword.value.length - 1]

  clearTimeout(passwordTimeout)
  passwordTimeout = setTimeout(() => {
    displayPassword.value = '•'.repeat(actualPassword.value.length)
  }, 1000)
}

function handleConfirmPasswordInput(newVal) {
  const oldVal = displayConfirmPassword.value
  const oldLength = oldVal.length
  const newLength = newVal.length

  if (newLength < oldLength) {
    actualConfirmPassword.value = actualConfirmPassword.value.slice(0, newLength)
  } else {
    const addedChar = newVal[newLength - 1]
    actualConfirmPassword.value += addedChar
  }

  displayConfirmPassword.value =
    '•'.repeat(newLength - 1) + actualConfirmPassword.value[actualConfirmPassword.value.length - 1]

  clearTimeout(confirmTimeout)
  confirmTimeout = setTimeout(() => {
    displayConfirmPassword.value = '•'.repeat(actualConfirmPassword.value.length)
  }, 1000)
}

function handleRegister() {
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !phone.value ||
    !address.value ||
    !actualPassword.value ||
    !actualConfirmPassword.value
  ) {
    alert('Please complete all fields.')
    return
  }

  if (!email.value.includes('@') || !email.value.includes('.com')) {
    alert('Please enter a valid email with "@" and ".com".')
    return
  }

  if (!/^\d{11}$/.test(phone.value)) {
    alert('Phone number must be exactly 11 digits.')
    return
  }

  if (actualPassword.value !== actualConfirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  localStorage.setItem('userFirstName', firstName.value)
  localStorage.setItem('userLastName', lastName.value)
  localStorage.setItem('userEmail', email.value)
  localStorage.setItem('userPhone', phone.value)
  localStorage.setItem('userAddress', address.value)

  router.push('/') // redirect
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3">
      <v-spacer></v-spacer>
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        slim
        @click="onClick"
      />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="mx-auto">
            <v-card class="mx-auto elevation-24 pa-6">
              <v-img src="./images/EBlogo.png" :width="300" class="mx-auto mb-4" />
              <h2 class="text-center mb-4">Register to EASY BORROW</h2>

              <v-form @submit.prevent="handleRegister">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  variant="outlined"
                  bg-color="yellow-lighten-1 rounded-lg"
                />
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  variant="outlined"
                  bg-color="yellow-lighten-1 rounded-lg"
                />
                <v-text-field
                  v-model="email"
                  label="Email"
                  variant="outlined"
                  bg-color="yellow-lighten-1 rounded-lg"
                />
                <v-text-field
                  v-model="phone"
                  label="Phone Number"
                  variant="outlined"
                  bg-color="yellow-lighten-1 rounded-lg"
                />
                <v-text-field
                  v-model="address"
                  label="Address"
                  variant="outlined"
                  bg-color="yellow-lighten-1 rounded-lg"
                />

                <v-text-field
                  :model-value="displayPassword"
                  label="Password"
                  variant="outlined"
                  bg-color="yellow-lighten-1 rounded-lg"
                  @update:modelValue="handlePasswordInput"
                />

                <v-text-field
                  :model-value="displayConfirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  bg-color="yellow-lighten-1 rounded-lg"
                  @update:modelValue="handleConfirmPasswordInput"
                />

                <v-btn
                  color="yellow-lighten-2"
                  class="font-weight-bold mt-4 rounded-pill pa-6"
                  type="submit"
                  block
                >
                  REGISTER NOW
                </v-btn>
              </v-form>

              <v-divider class="my-5" />

              <h5 class="text-center font-light" style="font-size: 18px">
                Already have an account?
                <RouterLink to="/" class="account-button">Click here to LOGIN</RouterLink>
              </h5>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.account-button {
  text-decoration: none;
  font-weight: bold;
}
.theme--light .account-button {
  color: black;
}
.theme--dark .account-button {
  color: white;
}
</style>

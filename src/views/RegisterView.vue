<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase.js'

const theme = ref('light')
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const actualPassword = ref('')
const displayPassword = ref('')
const actualConfirmPassword = ref('')
const displayConfirmPassword = ref('')
const formAction = ref({ ...formActionDefault })

let passwordTimeout = null
let confirmTimeout = null

function handlePasswordInput(newVal) {
  const oldLength = displayPassword.value.length
  const newLength = newVal.length
  if (newLength < oldLength) {
    actualPassword.value = actualPassword.value.slice(0, newLength)
  } else {
    actualPassword.value += newVal[newLength - 1]
  }
  displayPassword.value = '•'.repeat(newLength - 1) + actualPassword.value.slice(-1)
  clearTimeout(passwordTimeout)
  passwordTimeout = setTimeout(() => {
    displayPassword.value = '•'.repeat(actualPassword.value.length)
  }, 1000)
}

function handleConfirmPasswordInput(newVal) {
  const oldLength = displayConfirmPassword.value.length
  const newLength = newVal.length
  if (newLength < oldLength) {
    actualConfirmPassword.value = actualConfirmPassword.value.slice(0, newLength)
  } else {
    actualConfirmPassword.value += newVal[newLength - 1]
  }
  displayConfirmPassword.value = '•'.repeat(newLength - 1) + actualConfirmPassword.value.slice(-1)
  clearTimeout(confirmTimeout)
  confirmTimeout = setTimeout(() => {
    displayConfirmPassword.value = '•'.repeat(actualConfirmPassword.value.length)
  }, 1000)
}

async function handleRegister() {
  formAction.value = { ...formActionDefault, formProcess: true }

  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !phone.value ||
    !address.value ||
    !actualPassword.value ||
    !actualConfirmPassword.value
  ) {
    formAction.value.formErrorMessage = 'Please complete all fields.'
    formAction.value.formProcess = false
    return
  }

  if (!email.value.includes('@') || !email.value.includes('.com')) {
    formAction.value.formErrorMessage = 'Enter a valid email address.'
    formAction.value.formProcess = false
    return
  }

  if (!/^\d{11}$/.test(phone.value)) {
    formAction.value.formErrorMessage = 'Phone number must be 11 digits.'
    formAction.value.formProcess = false
    return
  }

  if (actualPassword.value !== actualConfirmPassword.value) {
    formAction.value.formErrorMessage = 'Passwords do not match.'
    formAction.value.formProcess = false
    return
  }

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: actualPassword.value,
    options: {
      data: {
        full_name: `${firstName.value} ${lastName.value}`,
        first_name: firstName.value,
        last_name: lastName.value,
        phone: phone.value,
        address: address.value,
        role: 'RENTER',
        photo: null,
      },
    },
  })

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formProcess = false
    return
  }

  formAction.value.formSuccessMessage = 'Registration successful! Please verify your email.'
  formAction.value.formProcess = false
  router.push('/')
}
</script>

<template>
  <v-app :theme="theme">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="mx-auto">
            <v-card class="mx-auto elevation-24 pa-6">
              <v-img src="./images/EBlogo.png" :width="300" class="mx-auto mb-4" />
              <h2 class="text-center mb-4">Register to EASY BORROW</h2>

              <v-form @submit.prevent="handleRegister">
                <v-text-field v-model="firstName" label="First Name" />
                <v-text-field v-model="lastName" label="Last Name" />
                <v-text-field v-model="email" label="Email" />
                <v-text-field v-model="phone" label="Phone Number" />
                <v-text-field v-model="address" label="Address" />
                <v-text-field
                  :model-value="displayPassword"
                  label="Password"
                  @update:modelValue="handlePasswordInput"
                />
                <v-text-field
                  :model-value="displayConfirmPassword"
                  label="Confirm Password"
                  @update:modelValue="handleConfirmPasswordInput"
                />
                <v-btn :loading="formAction.formProcess" type="submit" block color="yellow-darken-2"
                  >REGISTER NOW</v-btn
                >
              </v-form>

              <v-alert v-if="formAction.formErrorMessage" type="error" class="mt-4">
                {{ formAction.formErrorMessage }}
              </v-alert>
              <v-alert v-if="formAction.formSuccessMessage" type="success" class="mt-4">
                {{ formAction.formSuccessMessage }}
              </v-alert>

              <v-divider class="my-5" />
              <h5 class="text-center">
                Already have an account?
                <RouterLink to="/">Click here to LOGIN</RouterLink>
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
</style>

<template>
  <v-sheet width="400" class="mx-auto">
    <v-form @submit.prevent>
      <v-text-field v-model="email" label="Email" />
      <v-text-field v-model="password" label="Password" type="password" />
      <v-btn @click="submit" type="submit" block class="mt-2 bg-primary">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import HTTPRequest from '@/utils/HTTPRequest';

  const router = useRouter();
  const email = ref('');
  const password = ref('');

  async function submit() {
    if (email.value && password.value.length > 5) {
      const body = {
        email: email.value,
        password: password.value
      }
      const response = await HTTPRequest.post('/login', { body, withCredentials: true })
      if (response) {
        router.push({ name: 'Dashboard' });
      }
    } else {
      console.log('Fill all fields correctly.')
    }
  }
</script>
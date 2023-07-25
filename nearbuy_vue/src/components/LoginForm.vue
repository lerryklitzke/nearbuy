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
  import superagent from 'superagent';

  const email = ref('');
  const password = ref('');

  const router = useRouter();
  const goToDashboard = () => router.push({ name: 'Dashboard' });

  async function submit() {
    if (email.value && password.value.length > 5) {
      const body = {
        email: email.value,
        password: password.value
      }
      await superagent
        .post('http://localhost:2000/login')
        .send(body)
        .withCredentials()
        .then((res) => goToDashboard())
        .catch(() => console.log('Could not login.'))
    } else {
      console.log('Fill all fields correctly.')
    }
  }
</script>
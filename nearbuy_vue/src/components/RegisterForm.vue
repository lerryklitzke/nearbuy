<template>
  <v-sheet width="400" class="mx-auto">
    <v-form @submit.prevent>
      <v-text-field v-model="email" label="Email" />
      <v-text-field v-model="password1" label="Password" type="password" />
      <v-text-field v-model="password2" label="Repeat password" type="password" />
      <v-btn @click="submit" type="submit" block class="mt-2 bg-primary">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import superagent from 'superagent';

  const email = ref('');
  const password1 = ref('');
  const password2 = ref('');

  const router = useRouter();
  const goToLogin = () => router.push({ name: 'Login' });

  async function submit() {
    if (password1.value === password2.value) {
      const body = {
        email: email.value,
        password: password1.value
      }
      await superagent
        .post('http://localhost:2000/register')
        .send(body)
        .withCredentials()
        .then((res) => goToLogin())
        .catch(() => console.log('Could not register.'))
    } else {
      console.log('Repeat password doesn\'t match Password.')
    }
  }
</script>
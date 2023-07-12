<template>
  <v-app-bar flat>
    <v-app-bar-title style="cursor: pointer" @click="goToHome">
      <v-icon icon="mdi-handshake-outline" />
      NearBuy
    </v-app-bar-title>
    <v-btn @click="goToRegister">Register</v-btn>
    <v-btn @click="goToLogin" class="bg-primary">Login</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const goToHome = () => router.push({ name: 'Home' });
  const goToLogin = () => router.push({ name: 'Login' });
  const goToRegister = () => router.push({ name: 'Register' });
</script>

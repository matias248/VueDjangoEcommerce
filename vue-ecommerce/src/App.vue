<script setup lang="ts">

import Header from './components/Header.vue'
import NavigationPath from './components/shared/NavigationPath.vue';
</script>

<template>
  <main class="bg-slate-200	dark:bg-gray-900 min-h-screen min-w-screen ">
  <Header></Header>
  <NavigationPath/>
  <router-view />
  </main>

</template>


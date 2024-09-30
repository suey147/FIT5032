<script setup>
import BHeader from "./components/BHeader.vue";
import CountBookAPI from './views/CountBookAPI.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const showHeader = computed(() => {

  return route.name !== 'CountBookAPI';
})
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader/>
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
</style>

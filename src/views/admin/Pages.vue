<template>
  <div class="container">
    <h1 data-bs-toggle="tooltip" data-bs-placement="right">Все страницы</h1>
    <hr>
    <div class="home__pages">
      <div v-for="route in routes" class="home__link mb-2" :key="route.path">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes()

</script>
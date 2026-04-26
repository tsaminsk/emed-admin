<template>
  <div class="container">
    <h1 data-bs-toggle="tooltip" data-bs-placement="right">Home</h1>
    <hr>
    <div class="mb-2">
      <router-link to="/pages">Все страницы</router-link>
    </div>
    <div class="mb-2">
      <router-link to="/settings/menu-settings">Настройки темы</router-link>
    </div>
    <div class="mb-2">
      <router-link to="/widgets">Виджеты</router-link>
    </div>
    <div class="">
      <router-link to="/reference-books/html">/reference-books/html</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
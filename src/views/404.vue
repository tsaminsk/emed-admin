<template>
  <div class="container text-center p-4">
    <picture>
      <source srcset="/assets/images/404/not-found.avif" type="image/avif">
      <source srcset="/assets/images/404/not-found.webp" type="image/webp">
      <source srcset="/assets/images/404/not-found.png" type="image/png">
      <img src="/assets/images/404/not-found.png" alt="page not found" class="img-fluid">
    </picture>
    <h1>Страница не найдена</h1>
    <p>Возможно, вы перешли по неверной ссылке или страница была удалена.</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<script setup lang="ts">

</script>
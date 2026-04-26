<template>
  <div class="container py-3">
    <div v-if="article">
      <h1>{{ article?.title }}</h1>
      <p>{{ article?.author }}</p>
      <p>{{ new Date(article?.publishedAt).toLocaleString() }}</p>
      <p>{{ article?.description }}</p>
      <div class="my-3">
        <img :src="article?.urlToImage" alt="">
      </div>
      <a :href="article?.url" target="_blank">Читать далее</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMenuStore } from '@/stores/menu';

const route = useRoute()
const menuStore = useMenuStore()

const article = computed(() => menuStore.getCurrentArticle(route.params.article as string))
</script>
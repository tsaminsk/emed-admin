<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed<Record<string, any> | null>(() => {
  return route.meta.layout || null
})
</script>

<template>
  <component :is="layout">
    <router-view />
    <template v-if="layout && layout.__name === 'Default'" #footer>
      <div class="d-flex jastify-content-center align-items-end h-100 text-center p-4">
        <div class="d-flex mx-auto">eMED {{ new Date().getFullYear() }} &copy; All right reserved
        </div>
      </div>
    </template>
  </component>
</template>

<style scoped></style>

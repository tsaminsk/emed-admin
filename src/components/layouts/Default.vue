<template>
  <div class="default-layout">
    <div class="default-layout__content">
      <slot />
    </div>
    <footer class="default-layout__footer">
      <slot name="footer" />
      <img src="/assets/images/d-layout/left.png" class="default-layout__image default-layout__image-left" alt="">
      <img src="/assets/images/d-layout/base.png" class="default-layout__image default-layout__image-base" alt="">
      <img src="/assets/images/d-layout/right.png" class="default-layout__image default-layout__image-right" alt="">
    </footer>
  </div>
</template>

<script setup lang="ts">
defineExpose({
  name: 'Default',
})
</script>
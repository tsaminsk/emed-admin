<template>
  <div class="auth-page d-flex justify-content-between align-items-stretch">
    <div class="auth-page__slider">
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div v-for="i in 4" class="carousel-item" :class="{ active: i === 1 }">
            <div class="d-flex">
              <img :src="`/assets/images/slides/medical-${i}.webp`" alt="" loading="eager" decoding="async"
                fetchpriority="high" class="d-block w-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="auth-page__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
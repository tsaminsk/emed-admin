<template>
  <div class="container py-3">
    <div class="card">
      <div class="card-header">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    <br>
    <CustomSwitch v-model:modelValue="icon" positiveIcon="emoji-grin" negativeIcon="emoji-angry" label="Аттдыхайтен!"
      negativeLabel="Арбайтен!" />
    <hr>
    <div class="d-flex" style="gap: 16px">
      <Canabis v-if="icon" style="width: 40px;" />
      <RiotIcon v-else style="width: 40px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomSwitch from '@/components/form/CustomSwitch.vue'
import Canabis from '@/components/icons/Canabis.vue'
import RiotIcon from '@/components/icons/RiotIcon.vue'

const icon = ref(true)
</script>
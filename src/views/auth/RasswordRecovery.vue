<template>
  <div class="recovery-page d-flex jastify-content-center align-items-center">
    <div class="m-auto auth-page__card" style="width: 460px;">
      <!-- <div class="auth-page__card-head">
        <h1 class="auth-page__card-title text-center">eMED Portal
        </h1>
      </div> -->
      <div class="auth-page__card-body">
        <h5 class="auth-page__card-title text-center mb-4">Забыли пароль? 🔒</h5>
        <p class="auth-page__card-text">Введите свой адрес электронной почты, и мы вышлем вам инструкции по сбросу
          пароля.</p>
        <form>
          <FormInput v-model:value="email" label="Адрес электронной почты" name="email" type="email"
            placeholder="Введите адрес электронной почты" :status="status" :hint-text="hintText" class="mb-3"
            prefix-icon="envelope-open" clearable @blur="onBlur" @focus="onFocus" />
          <a href="#" class="btn btn-primary w-100  mb-3" :class="{ 'disabled': disabledBtn }">Отправить</a>
          <div class="d-flex justify-content-center">
            <a href="/login" class="ml-2"><i class="bi bi-chevron-left px-2"></i> <span class="ps-n1">Back to
                login</span></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/form/Input.vue'
import { ref, computed } from 'vue'

const email = ref('')
const status = ref<string | undefined>(undefined)
const hintText = ref<string | undefined>(undefined)


const onFocus = () => {
  status.value = undefined
  hintText.value = undefined
}

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const disabledBtn = computed(() => {
  return !email.value || !regex.test(email.value)
})

const onBlur = () => {
  if (disabledBtn.value) {
    status.value = 'error'
    hintText.value = 'Неверный адрес электронной почты'
  } else {
    status.value = 'success'
    hintText.value = 'Адрес электронной почты верный'
  }
}
</script>

<style lang="scss">
.recovery-page {
  min-height: 100%;
  height: calc(100vh - 160px);

  .auth-page__card {
    padding: 1rem;
    border: 1px solid color-mix(in sRGB, #2e263d 12%, #fff);
    border-radius: 6px;
    box-shadow: 0 0.25rem 0.625rem 0 rgba(46, 38, 61, 0.2);
    background-color: #fff;
  }
}
</style>
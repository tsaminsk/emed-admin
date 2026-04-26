<template>
  <div class="container login-page d-flex align-items-center justify-content-center p-5">
    <div class="auth-page__card">
      <div class="auth-page__card-body">
        <h1 class="auth-page__card-title mb-3">Welcome to eMED! 👋🏻</h1>
        <p class="auth-page__card-text mb-3">Please sign-in to your account and start the adventure</p>
        <form>
          <FormInput label="Адрес электронной почты" name="email" type="email"
            placeholder="Введите адрес электронной почты" class="mb-3" prefix-icon="envelope-open" clearable
            aria-describedby="emailHelp" />
          <FormInput label="Пароль" name="password" type="password" placeholder="Введите пароль" class="mb-3"
            prefix-icon="key" aria-describedby="passwordHelp" />
          <div class="d-flex justify-content-between mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Запомнить меня
              </label>
            </div>
            <a href="/recovery" class="ml-2">Забыли пароль?</a>
          </div>
          <a href="/" class="btn btn-primary w-100  mb-3">Войти</a>
          <div class="d-flex justify-content-center">
            <a href="/register" class="ml-2">Зарегистрироваться</a>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/form/Input.vue'

</script>

<style lang="scss">
.login-page {
  height: 100%;

  .auth-page__card {
    width: 100%;
    max-width: 400px;
  }
}
</style>
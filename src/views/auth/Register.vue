<template>
  <div class="container login-page d-flex align-items-center justify-content-center p-5">
    <div class="auth-page__card">
      <div class="auth-page__card-body">
        <h1 class="auth-page__card-title">Регистрация</h1>
        <form>
          <FormInput label="Адрес электронной почты" name="email" type="email"
            placeholder="Введите адрес электронной почты" class="mb-3" prefix-icon="envelope-open" clearable
            aria-describedby="emailHelp" />
          <FormInput label="Пароль" name="password" type="password" placeholder="Введите пароль" class="mb-3"
            prefix-icon="key" aria-describedby="passwordHelp" />
          <FormInput label="Повторите пароль" name="confirm-password" type="password" placeholder="Введите пароль"
            class="mb-3" prefix-icon="key" aria-describedby="passwordHelp" />
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="agree">
            <label class="form-check-label" for="agree">Я согласен с <router-link
                to="/conditions">условиями</router-link></label>
          </div>
          <a href="/" class="btn btn-primary w-100">Зарегистрироваться</a>
        </form>
        <div class="d-flex justify-content-center mt-4 gap-2">
          <span>Уже есть аккаунт?</span>
          <a href="/login" class="ml-2">Войти</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/form/Input.vue'
</script>
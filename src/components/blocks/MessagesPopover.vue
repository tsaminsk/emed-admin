<template>
  <div class="messages-popover position-relative">
    <a href="javascript:void(0)" class="messages-popover__link admin-layout__icon-link" @click="onChangeOpen">
      <i class="bi bi-chat" style="font-size: 24px;"></i>
      <span v-if="unreadMessagesCount"
        class="position-absolute start-100 translate-middle badge rounded-pill bg-danger">
        {{ unreadMessagesCount }}
        <span class="visually-hidden">непрочитанные сообщения</span>
      </span>
    </a>
    <div v-if="open" class="messages-popover__popup position-absolute p-3 pe-1">
      <div class="messages-popover__popup-header mb-3">
        <h6 class="messages-popover__popup-title">Сообщения</h6>
      </div>
      <div class="messages-popover__popup-body pe-2 custom-scroll">
        <template v-if="messagesStore.messages?.length">
          <div v-for="message in messagesStore.messages" :key="message.id" class="messages-popover__popup-item mb-3">
            <div class="messages-popover__popup-item-header">
              <div class="d-flex items-center">
                <i class="bi bi-chat-left-text me-2"></i>
                <h6 class="messages-popover__popup-item-title">{{ message.title }}</h6>
              </div>
              <div class="messages-popover__popup-item-body custom-scroll pb-1"
                :class="{ 'messages-popover__popup-item-body--open': message.open }">
                <p class="messages-popover__popup-item-text" v-html="message.text"></p>
              </div>
              <div class="messages-popover__popup-item-from d-flex">
                <div class="me-2">{{ message.from }} ({{ new
                  Date(message.date).toLocaleString() }}) <i :class="`bi bi-${message.read ? 'eye' : 'eye-slash'}`"></i>
                </div>
                <a href="javascript:void(0)" class="text-decoration-none"
                  @click="messagesStore.updateMessage(message.id, { open: !message.open, read: new Date() })">{{
                    message.open ? 'Свернуть' : 'Читать' }}</a>
              </div>
            </div>

          </div>
        </template>
        <div v-else class="messages-popover__popup-item mb-3">
          <div class="messages-popover__popup-item-header">
            <div class="d-flex items-center">
              <i class="bi bi-bell-slash me-2"></i>
              <div class="messages-popover__popup-item-title">Нет{{ messagesStore.settings.showUnread &&
                unreadMessagesCount === 0 ? ' непрочитанных '
                : ' '
              }}сообщений</div>
            </div>
          </div>
        </div>
      </div>
      <div class="messages-popover__popup-footer d-flex justify-content-center">
        <div v-show="!openSettings" class="messages-popover__popup-footer-action pt-2">
          <a href="javascript:void(0)" class="messages-popover__popup-footer-link" @click="openSettings = true"><i
              class="bi bi-list"></i></a>
        </div>
        <div v-show="openSettings" class="messages-popover__popup-settings w-100 position-relative pt-2">
          <a href="javascript:void(0)" class="messages-popover__popup-settings-close position-absolute"><i
              class="bi bi-x" @click="openSettings = false"></i></a>
          <div class="form-check messages-popover__popup-settings-item text-left">
            <input v-model="messagesStore.settings.showUnread" class="form-check-input" type="checkbox"
              id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Показывать только непрочитанные
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessagesStore } from '@/stores/messages'
import { computed, ref, nextTick } from 'vue'

const messagesStore = useMessagesStore()
const unreadMessagesCount = computed(() => messagesStore.unreadMessagesCount)

const open = ref(false)
const openSettings = ref(false)

const onChangeOpen = () => {
  open.value = !open.value
  const handler = (e: Event) => {
    if ((e.target as HTMLElement).closest('.messages-popover__link')) return

    if (!(e.target as HTMLElement).closest('.messages-popover__popup')) {
      document.removeEventListener('click', handler)
      open.value = false
    }
  }
  if (open.value) {
    document.addEventListener('click', handler)
  } else {
    document.removeEventListener('click', handler)
  }
}
</script>

<style lang="scss" scoped>
.messages-popover {

  &__link span {
    top: 6px;
  }

  &__popup {
    top: calc(100% + 22px);
    right: 0;
    width: min(80vw, 500px);
    background-color: var(--bg-color);
    color: var(--text-color);
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 8px;
      width: 12px;
      height: 12px;
      transform: translate3d(-50%, -50%, 0) rotate(45deg);
      background-color: var(--bg-color);
      border-top: 1px solid rgba(0, 0, 0, .15);
      border-left: 1px solid rgba(0, 0, 0, .15);
    }
  }

  &__popup-title {
    font-size: 21px;
  }

  &__popup-body {
    max-height: calc(100vh - 300px);
  }

  &__popup-item-body {
    position: relative;
    z-index: 1;
    max-height: 0;
    height: 0;
    opacity: 0;
    transition: max-height 0.3s linear, opacity 0.3s linear;

    &--open {
      height: auto;
      max-height: 600px;
      opacity: 1;
    }
  }

  &__popup-item-text {
    margin-bottom: 12px;
    padding: 0 6px 0 0;
    font-size: 14px;
    text-align: justify;
  }

  &__popup-item-from {
    position: relative;
    z-index: 2;
    font-size: 12px;
  }

  &__popup-footer {
    border-top: 1px solid var(--text-color);
  }

  &__popup-settings-close {
    top: 0;
    right: 0;
    font-size: 21px;
    cursor: pointer;
  }
}
</style>

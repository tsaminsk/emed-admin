<template>
  <div class="messages position-relative">
    <a href="javascript:void(0)" class="messages__link" @click="onChangeOpen">
      <i class="bi bi-chat-left-text" style="font-size: 24px;"></i>
      <span v-if="unreadMessagesCount" class="position-absolute translate-middle badge rounded-pill bg-danger">
        {{ unreadMessagesCount }}
        <span class="visually-hidden">непрочитанные сообщения</span>
      </span>
    </a>
    <teleport v-if="open" to="#drawer-body">
      <div class="messages__content d-flex flex-column pe-1">
        <div class="messages__content-body pe-2 custom-scroll">
          <template v-if="messagesStore.messages?.length">
            <div v-for="message in messagesStore.messages" :key="message.id" class="messages__content-item mb-3">
              <div class="messages__content-item-header">
                <div class="d-flex items-center">
                  <i class="bi bi-chat-left-text me-2"></i>
                  <h6 class="messages__content-item-title">{{ message.title }}</h6>
                </div>
                <div class="messages__content-item-body custom-scroll pb-1"
                  :class="{ 'messages__content-item-body--open': message.open }">
                  <p class="messages__content-item-text" v-html="message.text"></p>
                </div>
                <div class="messages__content-item-from d-flex">
                  <div class="me-2">{{ message.from }} ({{ new
                    Date(message.date).toLocaleString() }}) <i
                      :class="`bi bi-${message.read ? 'eye' : 'eye-slash'}`"></i>
                  </div>
                  <a href="javascript:void(0)" class="text-decoration-none"
                    @click="messagesStore.updateMessage(message.id, { open: !message.open, read: new Date() })">{{
                      message.open ? 'Свернуть' : 'Читать' }}</a>
                </div>
              </div>

            </div>
          </template>
          <div v-else class="messages__content-item mb-3">
            <div class="messages__content-item-header">
              <div class="d-flex items-center">
                <i class="bi bi-bell-slash me-2"></i>
                <div class="messages__content-item-title">Нет{{ messagesStore.settings.showUnread &&
                  unreadMessagesCount === 0 ? ' непрочитанных '
                  : ' '
                }}сообщений</div>
              </div>
            </div>
          </div>
        </div>
        <div class="messages__content-footer d-flex justify-content-center">
          <div v-show="!openSettings" class="messages__content-footer-action pt-2">
            <a href="javascript:void(0)" class="messages__content-footer-link" @click="openSettings = true"><i
                class="bi bi-list"></i></a>
          </div>
          <div v-show="openSettings" class="messages__content-settings w-100 position-relative pt-2">
            <a href="javascript:void(0)" class="messages__content-settings-close position-absolute"><i class="bi bi-x"
                @click="openSettings = false"></i></a>
            <div class="form-check messages__content-settings-item text-left">
              <input v-model="messagesStore.settings.showUnread" class="form-check-input" type="checkbox"
                id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Показывать только непрочитанные
              </label>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { useMessagesStore } from '@/stores/messages'
import { computed, ref, inject, onMounted } from 'vue'

const messagesStore = useMessagesStore()
const unreadMessagesCount = computed(() => messagesStore.unreadMessagesCount)

const open = ref(false)
const openSettings = ref(false)
const drawerData = inject('drawerData') as any

const onChangeOpen = () => {
  open.value = !open.value
  drawerData.width = 600
  drawerData.title = 'Сообщения'
  drawerData.showTitle = true
  drawerData.content = ''
  drawerData.offcanvas.show()
}

onMounted(() => {
  setTimeout(() => {
    drawerData.drawer?.addEventListener('hidden.bs.offcanvas', function () {
      open.value = false
    })
  }, 2000);
})

</script>

<style lang="scss" scoped>
.messages {

  &__link {
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--text-color-light);
    transition: color 0.3s ease-in-out;

    &:hover {
      color: var(--bs-primary);
    }

    span {
      top: 6px;
      right: -17px;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  &__content-body {
    flex: 1;
    max-height: calc(100vh - 150px);
  }

  &__content-item-body {
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

  &__content-item-text {
    margin-bottom: 12px;
    padding: 0 6px 0 0;
    font-size: 14px;
    text-align: justify;
  }

  &__content-item-from {
    position: relative;
    z-index: 2;
    font-size: 12px;
  }

  &__content-footer {
    border-top: 1px solid var(--text-color);
  }

  &__content-settings-close {
    top: 0;
    right: 0;
    font-size: 21px;
    cursor: pointer;
  }
}
</style>

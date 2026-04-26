<template>
  <nav class="navbar navbar-expand-lg user-dropdown">
    <div class="container-fluid">
      <a href="javascript:void(0)" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdownMenu"
        aria-controls="navbarDropdownMenu" aria-expanded="false" aria-label="Toggle navigation">
        <i class="bi bi-person-circle" style="font-size: 30px; color: var(--text-color, white)"></i>
      </a>
      <div class="collapse navbar-collapse" id="navbarDropdownMenu">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-nowrap text-ellipsis" href="#" id="navbarDropdownMenuLink"
              role="button" data-bs-toggle="dropdown" aria-expanded="false" style="max-width: 180px">
              {{ user.role }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#" @click.prevent="$router.push('/profile')"><i
                    class="bi bi-person"></i><span>Мой профиль</span></a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="$router.push('/devices')"><i
                    class="bi bi-hdd-stack"></i><span>Оборудование</span></a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="$router.push('/scanner')"><i
                    class="bi bi-activity"></i><span>Подключить сканер</span></a>
              </li>
              <li><a class="dropdown-item" href="#" @click.prevent="userStore.logout"><i class="bi bi-upload"
                    style="transform: rotate(90deg);"></i><span>Выйти</span></a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>

<style lang="scss" scoped>
.user-dropdown {
  :deep(.dropdown-menu) {
    left: auto;
    top: calc(100% + 18px);
    right: -10px;
    padding: 0.5rem 0;
    background-color: var(--bg-color);

    >li:not(.last-of-type) {

      margin-bottom: 10px;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: calc(50% - 10px);
      width: 12px;
      height: 12px;
      transform: translate3d(-50%, -50%, 0) rotate(45deg);
      background-color: var(--bg-color);
      border-top: 1px solid rgba(0, 0, 0, .15);
      border-left: 1px solid rgba(0, 0, 0, .15);
    }
  }

  :deep(.dropdown-item) {
    display: flex;
    gap: 8px;
    padding: 0.5rem 1rem;
    color: var(--text-color);
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
      background-color: var(--bs-primary);
      color: var(--bs-white-hover);
    }
  }

  .nav-link {
    color: var(--text-color);
    transition: color 0.3s ease-in-out;

    &:hover {
      color: var(--bs-primary);
    }
  }
}
</style>

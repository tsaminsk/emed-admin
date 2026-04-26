import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    role: 'Администратор',
    first_name: 'Иван',
    last_name: 'Иванов',
    middle_name: 'Иванович',
    email: 'zajkoa@mail.ru',
    phone: '+7 (999) 999-99-99',
    avatar: 'https://i.pravatar.cc/150?img=12',
  })

  const logout = () => {
    user.value = {
      role: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      email: '',
      phone: '',
      avatar: '',
    }

    router.push('/login')
  }

  return { user, logout }
})

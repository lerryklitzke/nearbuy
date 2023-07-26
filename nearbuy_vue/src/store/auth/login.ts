import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { HTTPRequest } from '@/utils/HTTPRequest';

export const useLoginStore = defineStore('login', () => {
  const router = useRouter();
  const login = async (params: { email: string, password: string }): Promise<void> => {
    try {
      const response = await HTTPRequest.post('/login', { body: params, withCredentials: true });
      if (response) {
        router.push({ name: 'Dashboard' });
      } 
    } catch (err: any) {
      console.log(err);
    }
  }

  return { login }
})
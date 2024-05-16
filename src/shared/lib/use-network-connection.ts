import { onBeforeMount, onBeforeUnmount, ref } from 'vue';

export const useNetworkConnection = () => {
  const isOnline = ref(navigator.onLine);

  function updateNetworkStatus() {
    isOnline.value = navigator.onLine;
  }

  onBeforeMount(() => {
    window.addEventListener('load', updateNetworkStatus);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('load', updateNetworkStatus);
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
  });

  return {
    isOnline,
  };
};

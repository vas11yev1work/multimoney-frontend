import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { router, worker } from './providers';
import './style.css';

dayjs.locale(ru);

if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

export const application = createApp(App).use(createPinia()).use(router);

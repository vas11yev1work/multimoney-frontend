import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import isBetween from 'dayjs/plugin/isBetween';
import weekday from 'dayjs/plugin/weekday';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { router, worker } from './providers';
import './style.css';

dayjs.locale(ru);
dayjs.extend(weekday);
dayjs.extend(isBetween);

if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

export const application = createApp(App).use(createPinia()).use(router);

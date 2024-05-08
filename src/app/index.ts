import ru from 'dayjs/locale/ru';
import { createPinia } from 'pinia';
import { setupCalendar } from 'v-calendar';
import { createApp } from 'vue';
import App from './App.vue';
import { router, worker } from './providers';
import 'v-calendar/style.css';

import './style.css';
import dayjs from 'dayjs';

dayjs.locale(ru);

if (import.meta.env.DEV) {
  worker
    .start({
      onUnhandledRequest: 'bypass',
    })
    .then(() => {});
}

export const application = createApp(App).use(createPinia()).use(setupCalendar, {}).use(router);

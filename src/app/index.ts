import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { router, worker } from './providers';

import './style.css';

if (import.meta.env.DEV) {
  worker
    .start({
      onUnhandledRequest: 'bypass',
    })
    .then(() => {});
}

export const application = createApp(App).use(createPinia()).use(router);

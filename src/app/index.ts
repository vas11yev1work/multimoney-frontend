import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './providers';

import './style.css';

export const application = createApp(App).use(createPinia()).use(router);

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { DatePicker } from 'ant-design-vue';
import SystemLayout from './layouts/SystemLayout.vue';
import './assets/main.css';

import App from './App.vue';
import Router from './router';

import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.component('SystemLayout', SystemLayout);
app.use(DatePicker);
app.use(createPinia());
app.use(Router);

app.mount('#app');

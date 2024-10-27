import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import loginRouter from './modules/login/router';

const app = createApp(App);

app.use(createPinia());
app.use(loginRouter);

app.mount('#app');

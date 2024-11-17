import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { DatePicker } from 'ant-design-vue';

import App from './App.vue';
import userRouter from './router';

import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.use(DatePicker);
app.use(createPinia());
app.use(userRouter);

app.mount('#app');

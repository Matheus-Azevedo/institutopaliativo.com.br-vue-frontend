import { createRouter, createWebHistory } from 'vue-router';
import adminRoutes from '../modules/Admin/router'; // Importe as rotas de admin
import accessRoutes from '../modules/Access/router'; // Importe as rotas de usuário

// Combine as rotas
const routes = [
  ...adminRoutes, // Rotas de admin
  ...accessRoutes, // Rotas de usuário
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

<template>
  <a-layout class="full-height-layout">
    <!-- Sidebar -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="sidebar-style"
    >
      <!-- Topo com Logo e Menu-1 -->
      <div class="sidebar-top">
        <div class="logo">
          <img
            v-if="!collapsed"
            src="../assets/logo.png"
            alt="Logo Image"
            class="logo"
          />
          <img
            v-else
            src="../assets/logo-short.png"
            alt="Logo Image"
            class="logo"
          />
        </div>
        <slot name="menu-1" :collapsed="collapsed" />
      </div>

      <!-- Base com Menu-2 -->
      <div class="sidebar-bottom">
        <a-menu
          name="menu-2"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
          class="menu-container"
        >
          <a-menu-item
            key="1"
            :style="{
              borderRadius: '0',
              margin: '0',
              width: '100%',
              backgroundColor: hoverColorPerfil,
            }"
            @mouseover="hoverColorPerfil = 'var(--inst-vermelho)'"
            @mouseleave="hoverColorPerfil = 'var(--inst-azul)'"
            title="Perfil"
            @click="() => $router.push('/perfil')"
          >
            <UserOutlined />
            <span v-if="!collapsed">Perfil</span>
          </a-menu-item>
          <a-menu-item
            key="2"
            :style="{
              borderRadius: '0',
              margin: '0',
              width: '100%',
              backgroundColor: hoverColorLogout,
            }"
            @mouseover="hoverColorLogout = 'var(--inst-vermelho)'"
            @mouseleave="hoverColorLogout = 'var(--inst-azul)'"
            title="Logout"
            @click="() => $router.push('/login')"
          >
            <LogoutOutlined />
            <span v-if="!collapsed">Logout</span>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>

    <!-- Main Layout -->
    <a-layout class="main-layout">
      <!-- Header -->
      <a-layout-header class="header-style">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <slot name="header" />
      </a-layout-header>

      <!-- Content -->
      <a-layout-content class="content-style"
        ><slot name="content" />
      </a-layout-content>
    </a-layout>
  </a-layout>

  <!-- Footer -->
  <a-layout-footer class="footer-style">
    Instituto Paliativo © 2024 - Todos os direitos reservados.
  </a-layout-footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
const hoverColorPerfil = ref('var(--inst-azul)');
const hoverColorLogout = ref('var(--inst-azul)');
</script>

<style scoped>
/* Layout principal ocupa 100% da viewport */
.menu-container {
  background: var(--inst-azul);
}

.full-height-layout {
  display: flex;
  height: 90vh;
}

/* Sidebar ocupa altura total */
.full-height-layout > .ant-layout-sider {
  height: 100%;
  background: var(--inst-azul);
}

/* Main Layout com flexbox para dividir o espaço */
.main-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden; /* Evitar overflow */
}

/* Header */
.header-style {
  background: var(--inst-branco);
  padding: 0;
  line-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: var(--inst-marrom);
}

/* Sidebar Logo */
.logo {
  height: 32px;
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--inst-branco);
}

/* Conteúdo ocupa o espaço restante */
.content-style {
  flex: 1;
  padding: 24px;
  margin: 16px;
  background: #fff;
  overflow: auto; /* Permitir rolagem se necessário */
  color: var(--inst-marrom);
}

/* Footer ocupa 20vh */
.footer-style {
  height: 10vh;
  background-color: var(--inst-azul);
  color: var(--inst-branco);
  text-align: center;
  line-height: 10vh;
}
</style>

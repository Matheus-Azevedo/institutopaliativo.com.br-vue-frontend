<template>
  <system-layout>
    <template #menu-1="{ collapsed }">
      <a-menu
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
            backgroundColor: hoverColorListUsers,
          }"
          @mouseover="hoverColorListUsers = 'var(--inst-vermelho)'"
          @mouseleave="hoverColorListUsers = 'var(--inst-azul)'"
          title="Listar Usuários"
          @click="() => changeScreen('list-users')"
        >
          <FileSearchOutlined />
          <span v-if="!collapsed">Listar Usuários</span>
        </a-menu-item>
      </a-menu>
    </template>
    <template #header>
      <h1>Instituto Paliativo - Módulo Administrador</h1>
    </template>
    <template #content>
      <div v-if="currentScreen === 'list-users'">
        <a-table
          bordered
          :data-source="dataSource"
          :columns="columns"
          :loading="loading"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              <a-popconfirm
                title="Tem certeza que deseja excluir?"
                @confirm="onDelete(record.id)"
              >
                <a>Excluir</a>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div>
    </template>
  </system-layout>
</template>

<script lang="ts" setup>
import { FileSearchOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { message } from 'ant-design-vue';

interface DataItem {
  id: string;
  nome: string;
  email: string;
  role: string;
  healthProfessionalRole: string | null;
}

const token = sessionStorage.getItem('token');
const loading = ref(false);
const selectedKeys = ref<string[]>(['1']);
const hoverColorListUsers = ref('var(--inst-azul)');
const currentScreen = ref('list-users');
const columns = ref([
  {
    title: 'Nome',
    dataIndex: 'nome',
    width: '30%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Especialidade',
    dataIndex: 'specialty',
    customRender: ({ record }: { record: DataItem }) => {
      return record.healthProfessionalRole || record.role;
    },
  },
  {
    title: 'Operação',
    dataIndex: 'operation',
  },
]);
const dataSource: Ref<DataItem[]> = ref([]);

// Função para buscar dados da API
const fetchUsers = async () => {
  loading.value = true;
  await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.message);
      }
      dataSource.value = data;
      loading.value = false;
      message.success('Usuários carregados com sucesso');
      return data;
    })
    .catch(error => {
      loading.value = false;
      message.error(`Erro ao buscar usuários: ${error.message}`);
    });
};

// Ciclo de vida do componente
onMounted(() => {
  fetchUsers(); // Chama a API quando o componente é montado
});

const changeScreen = (screen: string) => {
  currentScreen.value = screen;
};

const onDelete = async (id: string) => {
  loading.value = true;
  await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
      }
      dataSource.value = dataSource.value.filter(item => item.id !== id);
      loading.value = false;
      message.success('Usuário excluído com sucesso');
    })
    .catch(error => {
      loading.value = false;
      message.error(`Erro ao excluir usuário: ${error.message}`);
    });
  // dataSource.value = dataSource.value.filter(item => item.id !== key);
};
</script>

<style scoped></style>

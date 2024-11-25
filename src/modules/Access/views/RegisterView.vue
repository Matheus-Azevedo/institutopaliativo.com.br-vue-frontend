<template>
  <section id="register-container">
    <!-- Hero Image -->
    <div class="hero-image">
      <img src="../../../assets/hero.jpg" alt="Hero Image" />
    </div>

    <!-- Register Form -->
    <div class="form-container">
      <a-form
        class="register-form"
        :model="formState"
        name="register_form"
        ref="registerForm"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <div class="logo-image">
          <img src="../../../assets/logo.png" alt="Logo" />
        </div>
        <a-form-item
          class="form-container-item"
          label="Nome"
          name="username"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
          :rules="[
            {
              required: true,
              message: 'Por favor insira seu nome de usuário!',
            },
          ]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          class="form-container-item"
          label="Email"
          name="email"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
          :rules="[
            { required: true, message: 'Por favor insira seu email!' },
            { type: 'email', message: 'Por favor insira um email válido!' },
          ]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
          class="form-container-item"
          label="Tipo"
          name="selectOption"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
          :rules="[{ validator: validateSelectOption, trigger: 'change' }]"
        >
          <a-select
            v-model="formState.selectedOption"
            placeholder="Selecione uma opção"
            @change="handleSelectOption"
          >
            <a-select-option value="ADMIN">Admin</a-select-option>
            <a-select-option value="RECEPCIONISTA"
              >Recepcionista</a-select-option
            >
            <a-select-option value="PROFISSIONAL_SAUDE"
              >Profissional de saúde</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item
          v-if="formState.selectedOption === 'PROFISSIONAL_SAUDE'"
          class="form-container-item"
          label="Especialidade"
          name="specialty"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
          :rules="[
            {
              validator: validateSelectOptionSpecialty,
            },
          ]"
        >
          <a-select
            v-model="formState.specialty"
            placeholder="Selecione uma especialidade"
            @change="handleSelectSpecialty"
          >
            <a-select-option value="MEDICO">Médico</a-select-option>
            <a-select-option value="FISIOTERAPEUTA"
              >Fisioterapeuta</a-select-option
            >
            <a-select-option value="PSICOLOGO">Psicólogo</a-select-option>
            <a-select-option value="ENFERMEIRO">Enfermeiro</a-select-option>
            <a-select-option value="ARTETERAPEUTA"
              >Arteterapeuta</a-select-option
            >
            <a-select-option value="TERAPEUTA_OCUPACIONAL"
              >Terapeuta Ocupacional</a-select-option
            >
            <a-select-option value="FONOAUDIOLOGO"
              >Fonoaudiólogo</a-select-option
            >
            <a-select-option value="ASSISTENTE_SOCIAL"
              >Assistente Social</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item
          class="form-container-item"
          label="Senha"
          name="password"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
          :rules="[{ required: true, message: 'Por favor insira sua senha!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item
          class="form-container-item"
          label="Confirmação"
          name="confirm"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
          :rules="[{ validator: validatePasswordConfirmation }]"
        >
          <a-input-password v-model:value="formState.confirmPassword" />
        </a-form-item>

        <a-form-item class="btn-register-container">
          <a-button
            type="primary"
            html-type="submit"
            class="register-form-button"
            :loading="loading"
          >
            Registrar
          </a-button>
          Ou <router-link to="/login">faça login!</router-link>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

interface FormState {
  username: string;
  email: string;
  selectedOption: string;
  specialty: string;
  password: string;
  confirmPassword: string;
}

const formState = reactive<FormState>({
  username: '',
  email: '',
  selectedOption: '',
  specialty: '',
  password: '',
  confirmPassword: '',
});

import type { FormInstance } from 'ant-design-vue';

const registerForm = ref<FormInstance | null>(null);
const loading = ref<boolean>(false);
const router = useRouter();

const onFinish = () => {
  loading.value = true;
  const requestBody: Record<string, unknown> = {
    nome: formState.username,
    email: formState.email,
    senha: formState.password,
    role: formState.selectedOption,
  };

  // Adiciona 'specialty' ao objeto apenas se estiver preenchido
  if (formState.specialty) {
    requestBody.healthProfessionalRole = formState.specialty;
  }

  fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.message);
      }
      loading.value = false;
      message.success('Registro realizado com sucesso!');
      router.push('/login');
    })
    .catch(error => {
      loading.value = false;
      message.error(`Erro ao realizar o registro: ${error.message}`);
    });
};

const onFinishFailed = () => {
  message.error('Erro no registro. Verifique as informações fornecidas.');
};

const handleSelectOption = (value: string) => {
  formState.selectedOption = value;
};

const validateSelectOption = () => {
  if (!formState.selectedOption) {
    return Promise.reject(new Error('Por favor selecione uma opção!'));
  }
  return Promise.resolve();
};

const handleSelectSpecialty = (value: string) => {
  formState.specialty = value;
};

const validateSelectOptionSpecialty = () => {
  if (!formState.specialty) {
    return Promise.reject(new Error('Por favor selecione uma especialidade!'));
  }
  return Promise.resolve();
};

const validatePasswordConfirmation = () => {
  if (formState.password !== formState.confirmPassword) {
    return Promise.reject(new Error('As senhas não coincidem!'));
  }
  return Promise.resolve();
};
</script>

<style scoped>
#register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.hero-image {
  flex: 1;
  background-color: #f0f2f5; /* Optional background color */
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
}

.form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-image {
  display: flex;
  justify-content: center;
}

.form-container img {
  height: 70px;
  margin-bottom: 24px;
}

.register-form {
  width: 400px;
  border: 1px solid #d9d9d9;
  padding: 32px;
  border-radius: 6px;
}

.register-form-button {
  width: 100%;
}

.btn-register-container {
  text-align: center;
}

.btn-register-container button {
  margin-bottom: 16px;
}
</style>

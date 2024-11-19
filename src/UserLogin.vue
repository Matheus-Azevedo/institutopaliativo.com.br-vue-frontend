<template>
  <section id="login-container">
    <!-- Hero Image -->
    <div class="hero-image">
      <img src="../src/assets/hero.jpg" alt="Hero Image" />
    </div>

    <!-- Login Form -->
    <div class="form-container">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <div class="logo-image">
          <img src="../src/assets/logo.png" alt="Hero Image" />
        </div>
        <a-form-item
          label="Usuário"
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
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Senha"
          name="password"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
          :rules="[{ required: true, message: 'Por favor insira sua senha!' }]"
        >
          <a-input-password class="input" v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">
              Lembrar-me
            </a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Esqueceu a senha?</a>
        </a-form-item>

        <a-form-item class="btn-login-container">
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
            :loading="loading"
          >
            Log in
          </a-button>
          Ou <router-link to="/register">registre-se agora!</router-link>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useRouter } from 'vue-router';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

interface IUserData extends JwtPayload {
  role: string;
  healthProfessionalRole: string;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const loading = ref<boolean>(false);

const router = useRouter();

onMounted(() => {
  const savedUsername = localStorage.getItem('userPaliativo');
  if (savedUsername) {
    formState.username = savedUsername.replace(/"/g, '');
    formState.remember = true;
  }
});

const onFinish = () => {
  loading.value = true;

  fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: formState.username,
      password: formState.password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.message);
      }
      const userData: IUserData = jwtDecode(data.access_token);
      if (formState.remember) {
        localStorage.setItem(
          'userPaliativo',
          JSON.stringify(formState.username),
        );
      } else {
        localStorage.removeItem('userPaliativo');
      }
      sessionStorage.setItem('token', data.access_token);

      loading.value = false;
      message.success('Login realizado com sucesso!');

      if (userData && userData.healthProfessionalRole) {
        switch (userData.healthProfessionalRole) {
          case 'MEDICO':
            router.push('/doctor');
            break;
          case 'FISIOTERAPEUTA':
            router.push('/physiotherapist');
            break;
          case 'PSICOLOGO':
            router.push('/psychologist');
            break;
          case 'ENFERMEIRO':
            router.push('/nurse');
            break;
          case 'ARTETERAPEUTA':
            router.push('/art_therapist');
            break;
          case 'TERAPEUTA_OCUPACIONAL':
            router.push('/occupational_therapist');
            break;
          case 'FONOAUDIOLOGO':
            router.push('/speech_therapist');
            break;
          case 'ASSISTENTE_SOCIAL':
            router.push('/social_worker');
            break;
          default:
            router.push('/login');
            break;
        }
      } else if (userData && userData.role) {
        switch (userData.role) {
          case 'ADMIN':
            router.push('/admin');
            break;
          case 'RECEPCIONISTA':
            router.push('/receptionist');
            break;
          default:
            router.push('/login');
            break;
        }
      } else {
        // Token inválido ou sem os campos necessários
        message.error('Token inválido. Verifique suas credenciais.');
        router.push('/login'); // Ou outra rota segura
      }
    })
    .catch(error => {
      loading.value = false;
      message.error(`Erro ao realizar login: ${error.message}`);
    });
};

const onFinishFailed = () => {
  message.error('Login falhou. Por favor, verifique suas informações.');
};

const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>

<style scoped>
#login-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
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

.login-form {
  width: 400px;
  border: 1px solid #d9d9d9;
  padding: 32px;
  border-radius: 6px;
}

.login-form-forgot {
  float: right;
}

.login-form-button {
  width: 100%;
}

.btn-login-container {
  text-align: center;
}

.btn-login-container button {
  margin-bottom: 16px;
}
</style>

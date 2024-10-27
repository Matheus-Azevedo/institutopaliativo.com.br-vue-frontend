import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    // Configuração para os arquivos a serem lintados
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    // Configuração para os arquivos a serem ignorados
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // Configurações essenciais do ESLint para Vue
  ...pluginVue.configs['flat/essential'],

  // Configurações do TypeScript para Vue
  ...vueTsEslintConfig(),

  // Configurações do Vitest
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  // Configurações de formatação
  skipFormatting,

  // Definição das regras
  {
    rules: {
      semi: ['error', 'always'],
    },
  },
];

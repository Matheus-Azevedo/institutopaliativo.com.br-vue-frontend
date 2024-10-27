## Sistema de Prontuário - Frontend

Este é o frontend do sistema de prontuário para o Instituto Paliativo, desenvolvido para proporcionar uma interface intuitiva e acessível para profissionais de saúde e recepcionistas. O sistema permite a visualização, edição e gerenciamento das fichas de evolução e dados dos pacientes de forma organizada e eficiente.

### Funcionalidades Principais

1. **Interface de Usuário Intuitiva**

   - Navegação clara para acessar informações de pacientes, fichas de evolução e funcionalidades de gestão.
   - Acesso personalizado de acordo com o perfil de usuário (admin, profissional de saúde, recepcionista).

2. **Visualização de Fichas de Evolução**

   - Apresentação cronológica das evoluções de cada paciente, permitindo aos profissionais de saúde uma visão holística do histórico do paciente.
   - Opção de criar e editar fichas de evolução para cada especialidade, como médico, fisioterapeuta, psicólogo, entre outras.

3. **Cadastro e Gerenciamento de Pacientes**

   - Interface para recepcionistas gerenciarem o cadastro de novos pacientes e atualizarem dados existentes.
   - Permite a inserção de informações básicas como nome, idade, diagnóstico, histórico médico e contato de emergência.

4. **Plano de Cuidado e Ficha de Pré-atendimento**

   - Tela para registro e visualização do plano de cuidado interdisciplinar, discutido pela equipe de profissionais.
   - Acompanhamento de sintomas e indicadores através de fichas de pré-atendimento, com escalas numéricas para avaliar dor, náusea, fadiga, entre outros.

5. **Notificação de Equipe**
   - Sistema de notificações para informar os profissionais sempre que uma nova ficha de evolução for adicionada ao prontuário de um paciente.

### Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript utilizado para a construção de interfaces interativas e reativas.
- **Vue Router**: Gerenciamento de rotas, permitindo navegação entre as diferentes páginas do sistema.
- **Pinia**: Gerenciamento de estado global da aplicação, para compartilhamento eficiente de dados entre componentes.
- **Vite**: Ferramenta de build para desenvolvimento rápido e otimizado.
- **TypeScript**: Linguagem utilizada para garantir maior segurança de tipagem e melhorar a qualidade do código.

### Estrutura de Pastas

- **src/**: Contém os componentes, layouts, rotas, store (Pinia) e outros recursos principais do frontend.
  - **components/**: Componentes reutilizáveis na aplicação.
  - **layouts/**: Estruturas de layout base.
  - **store/**: Configurações e módulos do Pinia para gerenciar estados globais.
  - **views/**: Páginas principais da aplicação.

### Scripts Disponíveis

- **`dev`**: Executa o servidor de desenvolvimento (Vite).
- **`build`**: Compila o projeto para produção.
- **`preview`**: Previsualiza o build de produção.
- **`test:unit`**: Executa testes unitários com Vitest.
- **`lint`**: Verifica e corrige automaticamente o código usando ESLint.
- **`format`**: Formata o código com Prettier.

### Instalação e Configuração

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/institutopaliativo-frontend.git
   ```

2. **Navegue para o diretório do projeto**:

   ```bash
   cd institutopaliativo-frontend
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Configuração do ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias. Exemplo:

   ```bash
   VITE_API_URL=http://localhost:3000
   ```

5. **Execute o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

6. **Build para produção**:
   ```bash
   npm run build
   ```

### Testes

- **Testes Unitários**: Para executar os testes unitários, utilize o comando:
  ```bash
  npm run test:unit
  ```

### Contribuição

Se deseja contribuir com o projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch: `git checkout -b minha-feature`.
3. Realize suas alterações e faça commits: `git commit -m 'Minha nova feature'`.
4. Envie suas alterações: `git push origin minha-feature`.
5. Abra um Pull Request detalhando suas mudanças.

### Licença

Este projeto é licenciado sob a licença **MIT**.

---

Este frontend foi desenvolvido para proporcionar uma interface acessível e eficaz para o gerenciamento de cuidados paliativos no Instituto Paliativo. Assim como o backend, o sistema de frontend pode ser expandido e atualizado conforme as necessidades da instituição e dos profissionais de saúde evoluírem.

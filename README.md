# Auto Clubes - Aplicativo Mobile

## Descrição
Auto Clubes é um aplicativo mobile desenvolvido em React Native com Expo, focado em conectar entusiastas de automóveis. O aplicativo permite que usuários visualizem e interajam com clubes de carros, veículos à venda e eventos automotivos.

## Tecnologias Utilizadas
- React Native
- Expo
- React Navigation
- AsyncStorage
- React Native Paper
- Expo Vector Icons

## Estrutura do Projeto

### `/src`
Diretório principal do código fonte

#### `/src/screens`
Contém todas as telas do aplicativo:

1. **HomeScreen.js**
   - Tela inicial do aplicativo
   - Apresenta um resumo das principais funcionalidades
   - Navegação para outras seções

2. **ClubesScreen.js**
   - Lista de clubes de carros
   - Funcionalidades:
     - Visualização de clubes com imagens
     - Busca por nome ou localização
     - Adição de novos clubes
   - Dados locais armazenados em `clubesLocais`
   - Imagens carregadas de `assets/imagens.clubes`

3. **VeiculosScreen.js**
   - Marketplace de veículos
   - Funcionalidades:
     - Lista de veículos à venda
     - Busca por modelo ou localização
     - Visualização de preços e detalhes
     - Adição de novos veículos
   - Dados locais armazenados em `veiculosLocais`
   - Imagens carregadas de `assets/imagens.marketplace`

4. **EventosScreen.js**
   - Calendário de eventos automotivos
   - Funcionalidades:
     - Lista de eventos com imagens
     - Busca por título ou localização
     - Visualização de data, hora e descrição
     - Adição de novos eventos
   - Dados locais armazenados em `eventosLocais`
   - Imagens carregadas de `assets/imagens`

5. **FormClubeScreen.js**
   - Formulário para adicionar/editar clubes
   - Campos:
     - Nome do clube
     - Telefone
     - Endereço
     - Imagem
     - Descrição

6. **FormVeiculoScreen.js**
   - Formulário para adicionar/editar veículos
   - Campos:
     - Modelo
     - Preço
     - Telefone
     - Endereço
     - Imagem
     - Descrição

7. **FormEventoScreen.js**
   - Formulário para adicionar/editar eventos
   - Campos:
     - Título
     - Data
     - Hora
     - Local
     - Imagem
     - Descrição

#### `/src/navigation`
Configuração da navegação do aplicativo:

1. **index.js**
   - Configuração do React Navigation
   - Implementação do Tab Navigator para navegação principal
   - Implementação do Stack Navigator para formulários
   - Estilização da barra de navegação

#### `/src/services`
Serviços para gerenciamento de dados:

1. **clubesService.js**
   - Funções para gerenciar dados dos clubes
   - Operações CRUD usando AsyncStorage

2. **veiculosService.js**
   - Funções para gerenciar dados dos veículos
   - Operações CRUD usando AsyncStorage

3. **eventosService.js**
   - Funções para gerenciar dados dos eventos
   - Operações CRUD usando AsyncStorage

### `/assets`
Diretório de recursos estáticos:

1. **/imagens.clubes**
   - Imagens dos clubes de carros
   - Formato: JPG
   - Nomes específicos para cada clube

2. **/imagens.marketplace**
   - Imagens dos veículos à venda
   - Formato: JPG
   - Nomes específicos para cada veículo

3. **/imagens**
   - Imagens dos eventos
   - Formato: JPG
   - Nomes específicos para cada evento

## Funcionalidades Principais

### 1. Navegação
- Tab Navigator para navegação principal
- Stack Navigator para formulários
- Transições suaves entre telas
- Barra de navegação personalizada

### 2. Persistência de Dados
- Uso do AsyncStorage para armazenamento local
- Dados estruturados em JSON
- Operações CRUD para todas as entidades

### 3. Interface do Usuário
- Design moderno e responsivo
- Tema escuro consistente
- Cards com sombras e efeitos visuais
- Ícones intuitivos
- Barra de pesquisa em todas as listas

### 4. Gerenciamento de Imagens
- Upload de imagens
- Visualização em cards
- Armazenamento local
- Otimização de performance

## Como Executar o Projeto

1. Instalar dependências:
```bash
npm install
```

2. Iniciar o projeto:
```bash
npx expo start
```

3. Escanear o QR Code com o aplicativo Expo Go (Android) ou câmera (iOS)

## Considerações Técnicas

1. **Performance**
   - Lazy loading de imagens
   - Otimização de listas com FlatList
   - Gerenciamento eficiente de memória

2. **Segurança**
   - Validação de dados em formulários
   - Sanitização de inputs
   - Tratamento de erros

3. **Manutenibilidade**
   - Código modular e organizado
   - Componentes reutilizáveis
   - Comentários explicativos
   - Padrões de código consistentes

## Próximos Passos

1. Implementação de autenticação de usuários
2. Integração com backend
3. Notificações push
4. Compartilhamento de conteúdo
5. Sistema de avaliações e comentários 
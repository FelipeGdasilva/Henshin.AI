![Henshin.AI Demo](./screenshots/henshin.ai-demonstração.gif)

# 🦸‍♂️ Henshin.AI - Inteligência Adaptativa para Animes

O **Henshin.AI** (anteriormente AnimeBot) é um ecossistema **Fullstack** projetado para transformar o humor e a intenção do usuário em recomendações precisas de animes. O nome "Henshin" (Transformação) reflete tanto a cultura dos animes quanto a evolução técnica deste projeto: a transição de uma automação externa para um back-end moderno, resiliente e totalmente dinâmico.

---

## 🔄 A Evolução: Antes vs. Depois

Um dos pontos altos deste projeto foi o processo de **refatoração e amadurecimento técnico**. Saí de uma interface simples de automação para construir um ambiente imersivo com servidor próprio em Node.js e consumo de APIs em tempo real.

| Versão Anterior (AnimeBot) | Versão Atual (Henshin.AI) |
| :--- | :--- |
| ![Antes](./screenshots/demonstração-animebot-antigo.gif) | ![Depois](./screenshots/henshin.ai-demonstração.gif) |
| **Foco:** Automação via n8n e interface básica. | **Foco:** Back-end em Node.js, SDK oficial do Gemini e Resiliência. |
| **Visual:** Cores sólidas e animações simples. | **Visual:** Background tecnológico, Glassmorphism e Tipografia Dinâmica. |

---

## 🌟 Engenharia de Resiliência e Desafios Superados

Durante o desenvolvimento, enfrentei desafios reais de ambiente de produção, superados com ajustes arquiteturais maduros:

- **Evolução de SDK (Google GenAI):** Refatorei a integração do ecossistema de inteligência artificial para rodar na versão mais recente da biblioteca oficial do Google (`@google/genai`), garantindo chamadas otimizadas ao modelo **Gemini 2.5 Flash**.
- **Consumo Dinâmico e Arquitetura Limpa:** Migrei o sistema de uma base de dados estática local (antigo arquivo JSON) para consultas 100% dinâmicas via API do Jikan e IA, limpando o peso do projeto e garantindo respostas atualizadas em tempo real.
- **Modelagem Relacional Própria:** Criação dos scripts estruturais de banco de dados para garantir que a aplicação saiba exatamente como persistir históricos e logs de recomendação.
- **Design System Imersivo:** Interface focada em legibilidade e contraste, utilizando a fonte **Kanit** com pesos variados e efeitos de Glassmorphism para guiar o olhar do usuário.

---

## 🛠️ Tecnologias de Ponta

- **Back-end:** **Node.js & Express** (Arquitetura de API moderna com suporte a CORS, gerenciamento de rotas e tratamento rigoroso de erros).
- **IA Curatorial:** Integração avançada com a nova SDK do Google Gemini (`@google/genai`) usando o modelo ultra-rápido `gemini-2.5-flash`.
- **Front-end:** HTML5, CSS3 Avançado (Efeitos Visuais e Fluidez) e JavaScript Moderno (Vanilla JS Assíncrono).
- **APIs de Terceiros:** Integração direta com a Jikan API (Dados oficiais do MyAnimeList).
- **Banco de Dados:** Estrutura SQL pronta para persistência via **PostgreSQL / MySQL**.

---

## 📂 Estrutura do Ecossistema

- `/src` ou `/frontend`: Interface visual responsiva e lógica de consumo do usuário.
- `/backend`: O "Cérebro" da aplicação em Node.js.
  - `server.js`: Gerenciamento de rotas, chaves de ambiente e comunicação com a inteligência artificial.
  - `database.sql`: Scripts estruturais (`CREATE TABLE`) para modelagem das tabelas de animes e histórico de recomendações.
  - `package.json`: Gestão de scripts de automação (`npm start`) e dependências do ecossistema.
  - `.gitignore`: Proteção de dados sensíveis (`.env`) e módulos pesados de terceiros.

---

## 🚀 Próximos Passos (Roadmap)

- [ ] **Integração SQL Ativa:** Ligar as rotas do Express aos scripts do `database.sql` para salvar o histórico real de buscas.
- [ ] **Sistema de Favoritos:** Permitir que o usuário crie uma conta local para salvar suas melhores recomendações.
- [ ] **Migração para Next.js & Tailwind CSS:** Refatorar a aplicação para ganhar escalabilidade máxima no estilo e performance.

---

### 💡 Por que este projeto é único?

Diferente de buscadores comuns, o **Henshin.AI** foca na experiência humana. Ele entende se você busca relaxar após o trabalho ou se deseja a adrenalina de lutas épicas, tratando cada busca como uma interação emocional única através da IA.

---

tem como você corrigir esse também ## 👨‍💻 Como Executar o Projeto
1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/FelipeGdasilva/Henshin.AI.git]
   cd Henshin.AI
   ```
   2. **Configure o arquivo .env no diretório do Back-end:
   Crie um arquivo .env dentro da pasta do backend e insira sua chave da API do Google:

    GOOGLE_API_KEY=sua_chave_aqui
   ```
   3. **Inicie o Servidor de Back-end:
     cd backend
     npm install
     npm start
   ```
   4. **Abra o Front-end:
   Abra o arquivo index.html usando a extensão Live Server do VS Code ou diretamente no seu navegador preferido.
   ```

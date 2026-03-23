![Henshin.AI Demo](./screenshots/henshin.ai-demonstração.gif)

# 🦸‍♂️ Henshin.AI - Inteligência Adaptativa para Animes

O **Henshin.AI** (anteriormente AnimeBot) é um ecossistema **Fullstack** projetado para transformar o humor e a intenção do usuário em recomendações precisas de animes. O nome "Henshin" (Transformação) reflete tanto a cultura dos animes quanto a evolução técnica deste projeto: a transição de uma automação externa para um back-end resiliente e inteligente.

---

## 🔄 A Evolução: Antes vs. Depois

Um dos pontos altos deste projeto foi o processo de **refatoração e amadurecimento técnico**. Saí de uma interface simples para um ambiente imersivo e focado em UX, movendo a lógica para um servidor próprio.

| Versão Anterior (AnimeBot) | Versão Atual (Henshin.AI) |
| :--- | :--- |
| ![Antes](./screenshots/demonstração-animebot-antigo.gif) | ![Depois](./screenshots/henshin.ai-demonstração.gif) |
| **Foco:** Automação via n8n e interface básica. | **Foco:** Back-end em Node.js, Design System Moderno e Imersão. |
| **Visual:** Cores sólidas e animações simples. | **Visual:** Background tecnológico, Glassmorphism e Tipografia Dinâmica. |

---

## 🌟 Diferencial e Engenharia de Resiliência
O maior desafio superado foi a **dependência de APIs externas**. 

**A Solução de Arquitetura:**
- **Camada de Fallback (Node.js):** Desenvolvi um servidor Express que atua como escudo. Caso a API principal esteja instável, o sistema consome o `dados_animes.json` local via `fs.readFile`, garantindo que o usuário nunca fique sem resposta.
- **Configuração de Ambiente:** Utilização de scripts customizados no `package.json` para automação do workflow (`npm start`).
- **Design System Moderno:** Interface focada em legibilidade e contraste, utilizando a fonte **Kanit** com pesos variados para guiar o olhar do usuário.

---

## 🛠️ Tecnologias de Ponta
- **Back-end:** **Node.js & Express** (Arquitetura de API com suporte a CORS e tratamento de erros).
- **Front-end:** HTML5, CSS3 (Glassmorphism & Efeitos Visuais), JavaScript Moderno (Vanilla JS).
- **IA:** Integração com Google Gemini para curadoria inteligente.
- **Dados:** Jikan API & Banco de Dados Local para redundância.
- **Banco de Dados:** **SQL (PostgreSQL)** estruturado para persistência de dados.

---

## 📂 Estrutura do Ecossistema
- `/src`: Interface visual responsiva e lógica de consumo (Front-end).
- `server.js`: O "Cérebro" em Node.js para gerenciamento de rotas e resiliência.
- `dados_animes.json`: Catálogo de segurança (Local Database).
- `database.sql`: Modelagem das tabelas de animes e histórico de recomendações.
- `package.json`: Gestão de dependências e scripts de execução.

---

## 🚀 Próximos Passos (Roadmap)
- [ ] **Integração SQL:** Ativar a persistência real do histórico via banco de dados relacional.
- [ ] **Sistema de Favoritos:** Criar contas de usuário para salvar recomendações personalizadas.
- [ ] **Migração Tailwind:** Refatoração do estilo para maior escalabilidade no CSS.

---

### 💡 Por que este projeto é único?
Diferente de buscadores comuns, o **Henshin.AI** foca na experiência humana. Ele entende se você busca relaxar após o trabalho ou se deseja a adrenalina de lutas épicas, tratando cada busca como uma interação emocional única.

---

## 👨‍💻 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/FelipeGdasilva/Henshin.AI.git](https://github.com/FelipeGdasilva/Henshin.AI.git)

   2. **Inicie o Servidor de Back-end:**
   cd backend
   npm install
   npm start

   *O servidor estará rodando em http://localhost:3001.*
3. **Abra o Front-end:**
   Abra o arquivo index.html usando a extensão Live Server do VS Code ou diretamente no seu navegador preferido.




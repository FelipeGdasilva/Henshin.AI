// TODO: Substituir localhost pela URL do deploy quando o backend estiver online
const input = document.getElementById("mood-input");
const button = document.getElementById("search-button");
const resultsContainer = document.getElementById("movies-grid");
const resultsSection = document.getElementById("results");

input.addEventListener("input", () => {
  button.disabled = input.value.trim() === "";
});

button.addEventListener("click", async () => {
  const userText = input.value.trim();
  if (!userText) return;

  // Estado visual inicial
  button.disabled = true;
  button.innerText = "Buscando..."; 
  resultsSection.style.display = "block";

  // Limpa resultados anteriores antes de mostrar a mensagem de carregamento
  resultsContainer.innerHTML = "";

  // Mensagem de Resiliência
  resultsContainer.innerHTML = `
    <div id="loading-message" style="grid-column: 1/-1; text-align: center; color: #7c5cff; padding: 20px;">
      <div class="loading"></div>
      <p style="margin-top: 15px;">🤖 <b>Henshin.AI:</b> Consultando banco de dados resiliente...</p>
    </div>
  `;

  try {
    // Consumo de API Local: Porta 3001
    const response = await fetch("http://localhost:3001/animes");
    if (!response.ok) throw new Error("Erro na comunicação com o servidor");

    const objetoReal = await response.json();
    
    // Remove a mensagem de carregamento antes de renderizar
    const loadingMsg = document.getElementById("loading-message");
    if (loadingMsg) loadingMsg.remove();

    // Tratamento de Dados
    let animesParaRenderizar = [];
    if (objetoReal.animes && Array.isArray(objetoReal.animes)) {
        animesParaRenderizar = objetoReal.animes;
    } else if (Array.isArray(objetoReal)) {
        animesParaRenderizar = objetoReal;
    }

    if (animesParaRenderizar.length > 0) {
      renderAnimes(animesParaRenderizar);
    } else {
      resultsContainer.innerHTML = "<p style='color:white; grid-column: 1/-1;'>Nenhum anime encontrado no momento.</p>";
    }

  } catch (error) {
    resultsContainer.innerHTML = "<p style='color:#ff5fa2; grid-column: 1/-1;'>Erro ao conectar ao Backend. Verifique se o server.js está rodando na porta 3001!</p>";
  } finally {
    button.disabled = false;
    button.innerText = "Encontrar Animes";
  }
});

function renderAnimes(animes) {
  animes.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("movie-card", "fade-in");

    // Fallback de imagem
    const imageSource = anime.image && anime.image.trim() !== "" 
      ? anime.image 
      : "https://via.placeholder.com/300x450?text=Henshin+AI";

    card.innerHTML = `
      <div class="movie-poster">
        <img 
          src="${imageSource}" 
          alt="Poster de ${anime.title || 'Anime'}" 
          onerror="this.onerror=null; this.src='https://via.placeholder.com/300x450?text=Erro+ao+Carregar';"
        >
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${anime.title || "Título Indisponível"}</h3>
        <p class="movie-overview">${anime.description || "Descrição em breve..."}</p>
      </div>
    `;
    
    resultsContainer.appendChild(card);
  });
}
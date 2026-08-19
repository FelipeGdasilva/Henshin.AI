const input = document.getElementById("mood-input");
const button = document.getElementById("search-button");
const resultsContainer = document.getElementById("movies-grid");
const resultsSection = document.getElementById("results");
const searchCard = document.querySelector(".search-card");
const assistant = document.querySelector(".assistant-fixed");

input.addEventListener("input", () => {
  button.disabled = input.value.trim() === "";
});

button.addEventListener("click", async () => {
  const userText = input.value.trim();
  if (!userText) return;

  button.disabled = true;
  button.innerHTML = "<span>⚡</span> Escaneando..."; 
  searchCard.classList.add("scanning"); 
  
  if (assistant) {
    assistant.style.filter = "drop-shadow(0 0 50px #7c5cff) brightness(1.2)";
  }

  resultsSection.style.display = "block";
  resultsContainer.innerHTML = "";

  resultsContainer.innerHTML = `
    <div id="loading-message" style="grid-column: 1/-1; text-align: center; color: #7c5cff; padding: 20px;">
      <div class="loading"></div>
      <p style="margin-top: 15px; font-family: 'Orbitron', sans-serif; letter-spacing: 1px;">
        🤖 <b>Henshin.AI:</b> Sincronizando com a base de dados...
      </p>
    </div>
  `;

  try {
    const response = await fetch("http://localhost:3001/animebot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ chatInput: userText }) 
    });

    if (!response.ok) throw new Error("Erro na comunicação com o servidor");

    const objetoReal = await response.json();
    
    const loadingMsg = document.getElementById("loading-message");
    if (loadingMsg) loadingMsg.remove();

    let animesParaRenderizar = [];
    if (objetoReal.animes && Array.isArray(objetoReal.animes)) {
        animesParaRenderizar = objetoReal.animes;
    } else if (Array.isArray(objetoReal)) {
        animesParaRenderizar = objetoReal;
    }

    if (animesParaRenderizar.length > 0) {
      renderAnimes(animesParaRenderizar);
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      resultsContainer.innerHTML = "<p style='color:white; grid-column: 1/-1;'>Nenhum anime encontrado no momento.</p>";
    }

  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML = `
      <div style="grid-column: 1/-1; color:#ff5fa2; padding: 20px; border: 1px solid #ff5fa2; border-radius: 10px; background: rgba(255, 95, 162, 0.1);">
        <p><b>ERRO DE CONEXÃO:</b> O Henshin.AI não conseguiu alcançar o servidor.</p>
        <p style="font-size: 12px; margin-top: 10px;">Verifique se o seu node server.js está rodando na porta 3001.</p>
      </div>
    `;
  } finally {
    button.disabled = false;
    button.innerHTML = '<span class="play-icon">▶</span> Encontrar Animes';
    searchCard.classList.remove("scanning"); 
    
    if (assistant) {
      assistant.style.filter = "drop-shadow(0 0 20px rgba(124, 92, 255, 0.6))"; 
    }
  }
});

function renderAnimes(animes) {
  animes.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // Lógica para capturar a imagem ou acionar a Hina Chibi
    let imageSource = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

    // Se o backend indicou erro no Jikan ou a imagem veio vazia:
    // USAMOS '../images/' PARA SAIR DA PASTA JS E ENTRAR NA PASTA IMAGES
    if (imageSource === "MOSTRAR_HINA_ERRO" || !imageSource) {
      imageSource = "./src/images/hina-erro.png"; 
    }

    const title = anime.title || "Título Indisponível";
    const description = anime.synopsis || anime.description || "Descrição em breve...";

    card.innerHTML = `
      <div class="movie-poster">
        <img 
          src="${imageSource}" 
          alt="Poster de ${title}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='../images/hina-erro.png';"
        >
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${title}</h3>
        <p class="movie-overview">${description}</p>
      </div>
    `;
    
    resultsContainer.appendChild(card);
  });
}
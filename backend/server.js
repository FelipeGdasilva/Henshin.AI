require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const {GoogleGenAI} = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Henshin.AI API</h1><p>O sistema de resiliência está online!</p>');
});

async function buscarAnimeNaInternet(nomeDoAnime){
    try{
        console.log(`Buscando dados de "${nomeDoAnime}" na API do jikan...`);
        const resposta = await axios.get('https://api.jikan.moe/v4/anime',{
            params:{ q: nomeDoAnime, limit: 1}
        });

        const dadosDoAnime = resposta.data.data[0];
        if(dadosDoAnime){
            console.log(` nenhum anime encontrado para: "${nomeDoAnime}"`);
            return null;
        }

        return{
            title: dadosDoAnime.title,
            description: dadosDoAnime.synopsis,
            image: dadosDoAnime.images.jpg.large_image_url,
        };
    }catch (error){
        console.error(" Erro ao conectar na API do Jikan:", error.message);
        return null;
    }
}

app.get('/animes', (req, res) => {
    const caminhoDoArquivo = path.join(__dirname, 'dados_animes.json');

    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Erro ao ler arquivo:", err);
            return res.status(500).json({ mensagem: "Erro ao ler os dados localmente" });
        }
        try {
            const jsonSaida = JSON.parse(data);
            res.json(jsonSaida);
        } catch (parseErr) {
            console.error("❌ Erro de sintaxe no JSON:", parseErr); 
            res.status(500).json({ mensagem: "Erro no formato do banco de dados local" });
        }
    });
});
 

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });


app.post('/animebot', async (req, res) => {
  try {
    const { chatInput } = req.body;
    console.log(`◽ Mensagem do usuário: ${chatInput}`);

    const prompt = `Você é a Hina, uma assistente de IA fã de animes e boxeadora. O usuário disse: "${chatInput}". Sugira exatamente 3 animes reais que combinem com o estado emocional dele. Devolva APENAS os nomes dos animes separados por vírgula, sem numeração, sem aspas e sem pontos finais. Exemplo: Naruto, Bleach, One Piece`;

    const result = await genAI.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    const responseText = result.text;

    const nomesDosAnimes = responseText.split(',').map(nome => nome.replace(/["']/g, "").trim());
    console.log(`◽ A Hina escolheu os animes: ${nomesDosAnimes.join(', ')}`);

    const animesComDados = [];

    for (const nome of nomesDosAnimes) {
      if (!nome) continue;
      
      console.log(`Buscando dados de "${nome}" na API do jikan...`);
      
      const urlJikan = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nome)}&limit=1`;
      const jikanRes = await fetch(urlJikan);
      const jikanData = await jikanRes.json();

      if (jikanData.data && jikanData.data.length > 0) {
        animesComDados.push(jikanData.data[0]);
      } else {
        console.log(`nenhum anime encontrado para: "${nome}"`);
      }
    }

    return res.json({ animes: animesComDados });

  } catch (error) {
    console.error("❌ Erro no motor da IA:", error.message);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`🚀 Henshin.AI rodando em http://localhost:${PORT}`);
});
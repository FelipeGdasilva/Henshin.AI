require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Instância do Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Função de tempo de espera
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

app.get('/', (req, res) => {
    res.send('<h1>Henshin.AI API</h1><p>O sistema de resiliência total está online!</p>');
});

// SISTEMA DE RESILIÊNCIA MULTI-NÍVEL (JIKAN -> KITSU -> HINA FALLBACK)
async function buscarAnimeNaInternet(nomeDoAnime) {
    // 1. TENTATIVA NO JIKAN (Plano A)
    try {
        console.log(`🔎 Buscando "${nomeDoAnime}" no Jikan...`);
        await esperar(500);

        const resJikan = await axios.get('https://api.jikan.moe/v4/anime', {
            params: { q: nomeDoAnime, limit: 1 },
            headers: { 'User-Agent': 'HenshinAI-App/1.0' },
            timeout: 3000
        });

        const dadosJikan = resJikan.data.data[0];
        if (dadosJikan) return dadosJikan;

    } catch (error) {
        console.log(`⚠️ Jikan falhou para "${nomeDoAnime}". Ativando Plano B (Kitsu)...`);
    }

    // 2. TENTATIVA NA KITSU API (Plano B)
    try {
        const resKitsu = await axios.get('https://kitsu.io/api/edge/anime', {
            params: { 'filter[text]': nomeDoAnime },
            timeout: 3000
        });

        const animeKitsu = resKitsu.data.data[0];
        if (animeKitsu) {
            console.log(`✅ Capa resgatada com sucesso via Kitsu API!`);
            return {
                title: animeKitsu.attributes.canonicalTitle,
                synopsis: animeKitsu.attributes.synopsis,
                images: {
                    jpg: {
                        large_image_url: animeKitsu.attributes.posterImage?.large || animeKitsu.attributes.posterImage?.medium
                    }
                }
            };
        }
    } catch (error) {
        console.log(`⚠️ Kitsu também indisponível para "${nomeDoAnime}".`);
    }

    // 3. FALLBACK VISUAL COM A HINA CHIBI (Plano C)
    console.log(`🛡️ Ativando Hina Chibi Fallback para "${nomeDoAnime}".`);
    return null;
}

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
            
            let dadosDoAnime = await buscarAnimeNaInternet(nome);
            
            // Se nenhuma das APIs de imagem respondeu, envia o identificador do Fallback da Hina
            if (!dadosDoAnime) {
                dadosDoAnime = {
                    title: nome,
                    synopsis: `Recomendação especial da Hina para o seu momento! (Devido a uma oscilação na API externa de capas, a imagem oficial não pôde ser carregada).`,
                    images: { 
                        jpg: { 
                            large_image_url: "MOSTRAR_HINA_ERRO" 
                        } 
                    }
                };
            }

            animesComDados.push(dadosDoAnime);
        }

        return res.json({ animes: animesComDados });

    } catch (error) {
        console.error("❌ Erro no motor da IA:", error.message);
        
        return res.json({ 
            animes: [
                {
                    title: "Hajime no Ippo",
                    synopsis: "Recomendação especial de backup da Hina! (O motor de IA está temporariamente ocupado, tente novamente em instantes).",
                    images: { 
                        jpg: { 
                            large_image_url: "MOSTRAR_HINA_ERRO" 
                        } 
                    }
                }
            ] 
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Henshin.AI rodando em http://localhost:${PORT}`);
});
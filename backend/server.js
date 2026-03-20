const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// --- NOVO: Rota de Boas-vindas para testar o servidor ---
app.get('/', (req, res) => {
    res.send('<h1>Henshin.AI API</h1><p>O sistema de resiliência está online!</p>');
});

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
            console.error("❌ Erro de sintaxe no JSON:", parseErr); // Ajuda no debug
            res.status(500).json({ mensagem: "Erro no formato do banco de dados local" });
        }
    });
});

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`🚀 Henshin.AI rodando em http://localhost:${PORT}`);
});
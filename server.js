import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Habilita CORS
app.use(cors());

// 🔑 Chave válida (vem do .env)
const VALID_KEY = process.env.VALID_KEY;

// Middleware para validar chave
function validarChave(req, res, next) {
  const chave = req.headers['x-api-key'];
  if (!chave) {
    return res.status(401).json({ erro: 'Chave não fornecida' });
  }
  if (chave !== VALID_KEY) {
    return res.status(403).json({ erro: 'Chave inválida', recebido: chave });
  }
  next();
}

// Endpoint protegido
app.get('/dados', validarChave, (req, res) => {
  res.json({
    mensagem: 'Acesso autorizado ✅',
    dados: [1, 2, 3, 4],
    timestamp: new Date().toISOString()
  });
});

// Endpoint público
app.get('/status', (req, res) => {
  res.json({ api: 'rodando', endpoints: ['/status', '/dados'] });
});

// Servir index.html
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`🚀 API rodando em https://automatic-space-fortnight-4jp9jpx5pg3qxqv-3000.app.github.dev/`);
});

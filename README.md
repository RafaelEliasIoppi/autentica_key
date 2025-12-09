# 🚀 API com Express + Painel de Monitoramento

Este projeto é uma **API Node.js com Express** protegida por **API Key**, acompanhada de um **painel web interativo** em `index.html` que permite monitorar:
- Status da API
- Tempo de resposta dos endpoints
- Códigos de status HTTP retornados

---

## 📂 Estrutura do Projeto

. ├── index.html # Painel de monitoramento com Chart.js ├── server.js # Código da API em Express ├── package.json # Dependências e scripts └── .env # Chave secreta usada para autenticação

Código

---

## 📦 Tecnologias Utilizadas
- **Node.js + Express** → Servidor HTTP
- **CORS** → Permitir requisições externas
- **dotenv** → Gerenciar variáveis de ambiente
- **Chart.js** → Gráficos interativos no painel
- **HTML + CSS + JS** → Interface de monitoramento

---

## ⚙️ Instalação

Clone o repositório e instale as dependências:

```bash
git clone <seu-repositorio>
cd <seu-repositorio>
npm install
🔑 Configuração
Crie um arquivo .env na raiz do projeto com sua chave de acesso:

env
VALID_KEY=minha_chave_secreta
▶️ Executando a API
Inicie o servidor:

bash
npm start
Por padrão, a API roda na porta 3000. Exemplo de saída no terminal:

Código
🚀 API rodando em http://localhost:3000
📡 Endpoints
Público
GET /status Retorna o status da API e lista de endpoints disponíveis.

Exemplo de resposta:

json
{
  "api": "rodando",
  "endpoints": ["/status", "/dados"]
}
Protegido
GET /dados Necessita do header x-api-key com a chave válida definida no .env.

Exemplo de requisição:

bash
curl -H "x-api-key: minha_chave_secreta" http://localhost:3000/dados
Exemplo de resposta:

json
{
  "mensagem": "Acesso autorizado ✅",
  "dados": [1, 2, 3, 4],
  "timestamp": "2025-12-09T17:17:00.000Z"
}
🌐 Painel de Monitoramento (index.html)
O arquivo index.html serve como dashboard visual para acompanhar a API em tempo real.

Funcionalidades:
Campo para inserir a API Key

Botões de controle:

▶️ Iniciar → começa a coleta de dados

⏹️ Parar → interrompe a coleta

🧹 Limpar → reseta gráficos e dados

Exibição dos resultados dos endpoints /status e /dados

Gráficos interativos:

Linha → tempo de resposta

Scatter → status HTTP (200, 401, 403)

Como usar:
Abra http://localhost:3000/index.html no navegador.

Digite sua chave no campo Chave.

Clique em Iniciar para começar o monitoramento.

Observe os gráficos e os dados atualizados a cada 3 segundos.

🛠️ Melhorias sugeridas
Limitar número de pontos nos gráficos para evitar sobrecarga.

Adicionar campo para configurar URL da API (caso rode em outro servidor).

Tratar erros de rede com try/catch nos fetch.

📜 Licença
Este projeto é de uso livre para estudos e pode ser adaptado conforme necessário.

Código

---


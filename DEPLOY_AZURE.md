# 🚀 Deploy no Azure - Guia Rápido

## 📋 Pré-requisitos

- Conta no Azure ([criar conta gratuita](https://azure.microsoft.com/free/))
- Azure CLI instalada ([instalar](https://docs.microsoft.com/cli/azure/install-azure-cli))
- Conta no GitHub (para CI/CD automático)

---

## 🎯 Opção 1: Deploy Manual com Azure CLI

### 1. Login no Azure
```bash
az login
```

### 2. Criar Resource Group
```bash
az group create \
  --name autentica-key-rg \
  --location brazilsouth
```

### 3. Deploy usando Template ARM
```bash
az deployment group create \
  --resource-group autentica-key-rg \
  --template-file azure-deploy.json \
  --parameters webAppName=autentica-key-app validApiKey=sua_chave_secreta_aqui
```

### 4. Deploy do Código
```bash
az webapp up \
  --resource-group autentica-key-rg \
  --name autentica-key-app \
  --runtime "NODE:20-lts" \
  --sku B1
```

---

## 🔄 Opção 2: Deploy Automático com GitHub Actions

### 1. Criar Service Principal no Azure
```bash
az ad sp create-for-rbac \
  --name "autentica-key-github" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/autentica-key-rg \
  --sdk-auth
```

### 2. Configurar Secrets no GitHub
No seu repositório GitHub, vá em **Settings > Secrets and variables > Actions**:

- `AZURE_CREDENTIALS`: Cole o JSON completo do comando anterior
- `AZURE_WEBAPP_NAME`: `autentica-key-app`

### 3. Push para Main
```bash
git add .
git commit -m "Deploy configuration for Azure"
git push origin main
```

O GitHub Actions irá automaticamente fazer o deploy! 🎉

---

## 🐳 Opção 3: Deploy via Docker Container

### 1. Build da imagem
```bash
docker build -t autentica-key .
```

### 2. Testar localmente
```bash
docker run -p 3000:3000 -e VALID_KEY=sua_chave_secreta autentica-key
```

### 3. Push para Azure Container Registry (opcional)
```bash
# Criar ACR
az acr create \
  --resource-group autentica-key-rg \
  --name autenticakeyacr \
  --sku Basic

# Login
az acr login --name autenticakeyacr

# Tag e push
docker tag autentica-key autenticakeyacr.azurecr.io/autentica-key:latest
docker push autenticakeyacr.azurecr.io/autentica-key:latest
```

---

## ⚙️ Configurar Variáveis de Ambiente no Azure

```bash
az webapp config appsettings set \
  --resource-group autentica-key-rg \
  --name autentica-key-app \
  --settings VALID_KEY=sua_chave_secreta_aqui
```

---

## 🔍 Monitorar a Aplicação

### Ver logs em tempo real
```bash
az webapp log tail \
  --resource-group autentica-key-rg \
  --name autentica-key-app
```

### Abrir no navegador
```bash
az webapp browse \
  --resource-group autentica-key-rg \
  --name autentica-key-app
```

---

## 🧪 Testar a API no Azure

Depois do deploy, sua API estará disponível em:
```
https://autentica-key-app.azurewebsites.net
```

### Testar endpoint público
```bash
curl https://autentica-key-app.azurewebsites.net/status
```

### Testar endpoint protegido
```bash
curl -H "x-api-key: sua_chave_secreta" \
  https://autentica-key-app.azurewebsites.net/dados
```

---

## 💰 Custos Estimados

- **Free Tier (F1)**: Grátis, com limitações
- **Basic (B1)**: ~$13/mês - Recomendado para produção
- **Standard (S1)**: ~$70/mês - Auto-scaling e slots de deployment

---

## 🔒 Segurança - Próximos Passos

1. **Habilitar HTTPS Only** (já configurado no template)
2. **Configurar Azure Key Vault** para secrets
3. **Adicionar Azure Application Insights** para monitoramento
4. **Configurar Custom Domain** (opcional)
5. **Implementar rate limiting** via Azure API Management

---

## 📚 Recursos Úteis

- [Documentação Azure App Service](https://docs.microsoft.com/azure/app-service/)
- [Node.js no Azure](https://docs.microsoft.com/azure/app-service/quickstart-nodejs)
- [GitHub Actions para Azure](https://docs.microsoft.com/azure/app-service/deploy-github-actions)

---

## 🆘 Troubleshooting

### Erro: "Application failed to start"
```bash
# Verificar logs
az webapp log tail --name autentica-key-app --resource-group autentica-key-rg
```

### Erro: "Module not found"
```bash
# Garantir que package.json tem "type": "module"
# Verificar se node_modules foi instalado corretamente
```

### Reiniciar aplicação
```bash
az webapp restart \
  --name autentica-key-app \
  --resource-group autentica-key-rg
```

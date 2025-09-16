# Use imagem oficial do Node.js LTS
FROM node:22-bullseye-slim

# Cria diretório de trabalho
WORKDIR /usr/src/app

# Copia arquivos de dependências primeiro (melhor cache)
COPY package*.json ./

# Instala dependências (incluindo dev dependencies para build se necessário)
RUN npm ci --only=production && npm cache clean --force

# Copia o restante do código
COPY . .

# Muda para usuário node (já existe na imagem base)
USER node

# Expõe a porta do Apollo Gateway
EXPOSE 4000

# Define variáveis de ambiente para produção
ENV NODE_ENV=production
ENV PORT=4000

# Comando para iniciar o app
CMD ["node", "index.js"]

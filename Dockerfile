# Use imagem oficial do Node.js
FROM node:20

# Cria diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install --production

# Copia o restante do código
COPY . .

# Expõe a porta padrão (ajuste se necessário)
EXPOSE 4000

# Comando para iniciar o app
CMD ["node", "index.js"]

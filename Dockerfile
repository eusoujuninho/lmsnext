# Especifica a imagem base oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de configuração do projeto e instala todas as dependências
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["yarn", "dev"]

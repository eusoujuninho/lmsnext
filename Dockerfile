# Especifica a imagem base oficial do Node.js
FROM node:18-alpine3.16

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos necessários para a instalação de dependências
COPY package.json yarn.lock ./

# Instala todas as dependências
RUN yarn install --frozen-lockfile

# Gera o Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["yarn", "dev"]

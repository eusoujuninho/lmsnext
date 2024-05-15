#!/bin/bash

# Define o nome do serviço da aplicação no Docker Compose
APP_SERVICE_NAME="app"

echo "Construindo e iniciando os serviços com Docker Compose..."
# Usar docker-compose para construir e iniciar os serviços
docker-compose up -d --build

# Obter o ID do container da aplicação
APP_CONTAINER_ID=$(docker-compose ps -q $APP_SERVICE_NAME)

if [ ! -z "$APP_CONTAINER_ID" ]; then
  echo "Container da aplicação rodando em: http://localhost:3000"
  echo "Container ID: $APP_CONTAINER_ID"
else
  echo "Falha ao iniciar o container da aplicação."
fi

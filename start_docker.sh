#!/bin/bash

# Nome da imagem Docker
IMAGE_NAME="lms"

# Construir a imagem Docker
echo "Construindo a imagem Docker..."
docker build -t $IMAGE_NAME .

# Verificar se já existe um container rodando e pará-lo
CONTAINER_ID=$(docker ps -q -f name=$IMAGE_NAME)
if [ ! -z "$CONTAINER_ID" ]; then
    echo "Parando o container existente..."
    docker stop $CONTAINER_ID
    docker rm $CONTAINER_ID
fi

# Rodar o container Docker
echo "Iniciando o container Docker..."
docker run -p 3000:3000 -d --name $IMAGE_NAME $IMAGE_NAME

echo "Container rodando em: http://localhost:3000"

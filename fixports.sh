#!/bin/bash

# Busca por processos que estão utilizando a porta 3000
pid=$(lsof -ti:3000)

# Verifica se algum processo foi encontrado
if [ -z "$pid" ]
then
  echo "Nenhum processo está utilizando a porta 3000."
else
  echo "Matando os processos que estão utilizando a porta 3000..."
  # Mata os processos
  kill -9 $pid
  echo "Processos finalizados."
fi

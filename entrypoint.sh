#!/bin/sh

# Espera o volume estar pronto
sleep 2

# Instala dependências caso estejam faltando (útil pra dev)
npm install

# Desabilita o debugger
export NODE_OPTIONS=""

# Build inicial
npx nx build teddy-api

# Roda com nodemon para hot reload confiável
npx nodemon

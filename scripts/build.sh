#!/bin/bash

# Pobieranie wartości z pliku .env
source .env

# Budowanie obrazu Docker
docker build -t master_backend .

#docker build -t master_backend -f ../Dockerfile ../

# Uruchamianie kontenera Docker i przekazywanie zmiennych środowiskowych

docker run --env-file .env master_backend

#docker run --env-file ../.env master_backend
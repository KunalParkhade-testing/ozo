PROJECT_NAME := ozo
BACKEND_DIR := backend
FRONTEND_DIR := frontend
DOCKER_COMPOSE := docker-compose.yml

.PHONY: all build up down logs clean

all: build up

build:
	docker-compose -f $(DOCKER_COMPOSE) build

up:
	docker-compose -f $(DOCKER_COMPOSE) up -d

down:
	docker-compose -f $(DOCKER_COMPOSE) down

logs:
	docker-compose -f $(DOCKER_COMPOSE) logs -f

clean:
	docker-compose -f $(DOCKER_COMPOSE) down --volumes --remove-orphans
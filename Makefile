# Teddy Monorepo - Makefile
# Comandos para facilitar o desenvolvimento

.PHONY: help run stop build logs clean test install dev restart force-restart

# Comando padrão - mostra ajuda
help:
	@echo "🚀 Teddy Monorepo - Comandos Disponíveis:"
	@echo ""
	@echo "  make run        - Iniciar aplicação (mostra logs diretamente)"
	@echo "  make run-bg     - Iniciar aplicação em background"
	@echo "  make restart    - Reiniciar aplicação (para e inicia novamente)"
	@echo "  make force      - Forçar reinício (remove containers e recria)"
	@echo "  make stop       - Parar todos os containers"
	@echo "  make build      - Rebuildar containers"
	@echo "  make logs       - Ver logs da aplicação"
	@echo "  make clean      - Limpar containers e volumes"
	@echo "  make dev        - Executar em modo desenvolvimento local"
	@echo "  make test       - Executar testes"
	@echo "  make install    - Instalar dependências"
	@echo "  make help       - Mostrar esta ajuda"
	@echo ""

# Reiniciar aplicação (para e inicia novamente)
restart:
	@echo "🔄 Reiniciando aplicação..."
	docker-compose down
	docker-compose up --build

# Forçar reinício (remove containers e recria)
force:
	@echo "⚡ Forçando reinício da aplicação..."
	docker-compose down --remove-orphans
	docker-compose up --build --force-recreate

# Iniciar aplicação com Docker Compose (mostra logs diretamente)
run:
	@echo "🚀 Iniciando aplicação..."
	docker-compose up --build

# Iniciar aplicação em background (sem logs)
run-bg:
	@echo "🚀 Iniciando aplicação em background..."
	docker-compose up --build -d
	@echo "✅ Aplicação rodando em http://localhost:3000/api"
	@echo "📊 Use 'make logs' para ver os logs"

# Parar containers
stop:
	@echo "🛑 Parando containers..."
	docker-compose down
	@echo "✅ Containers parados"

# Rebuildar containers
build:
	@echo "🔨 Rebuilding containers..."
	docker-compose build --no-cache
	@echo "✅ Build concluído"

# Ver logs da aplicação
logs:
	@echo "📋 Logs da aplicação:"
	docker-compose logs -f teddy-api

# Limpar containers e volumes
clean:
	@echo "🧹 Limpando containers e volumes..."
	docker-compose down -v --remove-orphans
	docker system prune -f
	@echo "✅ Limpeza concluída"

# Desenvolvimento local (sem Docker)
dev:
	@echo "🔧 Iniciando desenvolvimento local..."
	npm install
	npx nx serve teddy-api

# Executar testes
test:
	@echo "🧪 Executando testes..."
	npm run test

# Instalar dependências
install:
	@echo "📦 Instalando dependências..."
	npm install
	@echo "✅ Dependências instaladas"

# Status dos containers
status:
	@echo "📊 Status dos containers:"
	docker-compose ps

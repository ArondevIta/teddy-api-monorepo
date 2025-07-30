.PHONY: help run stop rebuild logs clean restart

help:
	@echo "🚀 Teddy Monorepo - Available Commands:"
	@echo ""
	@echo "  make run        - Start application"
	@echo "  make restart    - Restart application (stop and start again)"
	@echo "  make stop       - Stop all containers"
	@echo "  make rebuild    - Rebuild containers"
	@echo "  make logs       - View application logs"
	@echo "  make clean      - Clean containers and volumes"
	@echo "  make help       - Show this help"
	@echo ""

restart:
	@echo "####################################################"
	@echo "# Restart docker-compose.yml application #"
	@echo "####################################################"
	docker-compose down
	docker-compose up --build

run:
	@echo "####################################################"
	@echo "# Running docker-compose.yml application #"
	@echo "####################################################"
	docker-compose up --remove-orphans


rebuild:
	@echo "####################################################"
	@echo "# Rebuild docker-compose.yml application #"
	@echo "####################################################"
	docker-compose up --build


stop:
	@echo "####################################################"
	@echo "# Stopping docker-compose.yml containers #"
	@echo "####################################################"
	docker-compose down
	@echo "✅ Containers stopped"

logs:
	@echo "####################################################"
	@echo "# Logs docker-compose.yml application #"
	@echo "####################################################"
	docker-compose logs -f teddy-api

clean:
	@echo "####################################################"
	@echo "# Clean docker-compose.yml containers #"
	@echo "####################################################"
	docker-compose down -v --remove-orphans
	docker system prune -f
	@echo "✅ Cleanup completed"


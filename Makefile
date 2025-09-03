init:
	bash scripts/bash/init.sh
run:
	bash scripts/bash/start.sh
stop:
	bash scripts/bash/stop.sh
clean:
	bash scripts/bash/clean.sh
status:
	docker compose ps
console:
	docker exec -it router mongosh
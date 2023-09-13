export:
	docker-compose up mongodb -d
	docker-compose exec mongo mongoexport --uri="mongodb://root:root123@mongo:27017/engagement?authSource=admin&readPreference=primary" --collection=users --out=users.json
	rm -rf dataset/users.json
	docker-compose cp mongo:./users.json ./dataset/users.json
import:
	docker-compose up mongo -d
	docker-compose cp ./dataset/users.json mongo:./users.json
	docker-compose exec mongo mongoimport --uri="mongodb://root:root123@mongo:27017/engagement?authSource=admin&readPreference=primary" --collection=users --drop --file=users.json
	docker-compose exec mongo mongoimport --uri="mongodb://root:root123@mongo:27017/engagement?authSource=admin&readPreference=primary" --collection=schedules --drop --file=schedules.json

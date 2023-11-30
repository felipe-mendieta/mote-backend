docker-compose up -d mongodb
docker build -t felipe98mz/mote:v1 .
docker run -d -p 3000:3000 felipe98mz/moteBack:v1
#kill docker image
#docker kill $(docker ps -q)

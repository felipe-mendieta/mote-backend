docker-compose up -d mongodb
docker build -t felipe98mz/mote:v1 .
docker run -d -p 3002:3002 felipe98mz/moteBack:v1
#kill docker image
#docker kill $(docker ps -q)

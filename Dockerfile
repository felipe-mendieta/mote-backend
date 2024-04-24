#deploy node application
FROM node:18.16.0

# Create app directory
WORKDIR /usr/src/app

#copy all porject to workdir
COPY . .

#insall node dependencies
RUN npm install

#Expose port 3000
EXPOSE 3000

#set environment variable
ENV NODE_ENV=production

#run node application
CMD [ "npm", "start" ]

# Engagement backend - NodeJS

Este proyecto se basa en el manejo de datos relacionados con la medición en tiempo real del engagement estudiantil. Maneja logueo de usuarios y registro de datos en tiempo real que los estudiantes envian durante una sesión de clase.

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Licencia](#licencia)

## Instalación

1. Hacer fork de este proyecto en tu espacio personal
2. Clonar el repositorio desde tu espacio personal en tu computadora
3. Instalar dependencias, con el comando `npm install`
4. Iniciar mongo con Docker, con el comando, o cada vez que necesitemos desplegar el entorno de desarrollo `docker-compose up mongodb -d`
5. Cargar datos iniciales, con el comando `npm run seed:random`
6. Comprobar ambiente de desarrollo, con el comando `npm run dev`
7. Probar endpoints con Postman o Insomnia.

## Arquitecutra
Basamos la arquitectura del proyecto en CLEAN ARCHITECTURE
```
└── Frameworks, Web: Frontend en Angular
  ├── Controllers: routes, middlewares
    ├─── Use Cases: services
      ├─── Entities: entities
 
```
- Entities: Enterprise Business Rules. Entidades bases de todo nuestro negocio. Ejm: Poll, Question, User, etc.
- Uses Cases: Application Business Rules. Tenemos todo lo relacionado con la lógica del negocio.
- Controllers: Interfaces Adapters. Son los que brindan acceso.
- Web: Framewroks and Drivers. 

Esta arquitectura en forma de capas tendría el siguiente esquema:
Controllers (Routes, Middlewares) <-> Services <-> Libs(Models)

### Flujo de Trabajo 

Controladores: Encontramos los routes y middlewares.
- Los controladores acceden a la capa de servicios.

Servicios: donde se encuentra la lógica de negocio
- Los servicios usan las librerías.

- Las librerías se encargan de contactarse a la capa de entidades
- Las librerías se contactan a otras fuentes de datos: API externa o base de datos.

Nota: El flujo de los middlewares es: 

Request -> Middlewares -> Response

### Entidades

- User: Colección de usuarios


## Configuración

El proyecto ya viene con una configuración por defecto, de la siguiente manera:

```
.
├── README.md
├── dataset
├── docker-compose.yml
├── makefile
├── node_modules
├── package-lock.json
├── package.json
├── scripts
└── src
  ├── app.js
  ├── index.js
  ├── config
  ├── database
  ├── dtos
  ├── middlewares
  ├── routes
  └── services
```

### Scripts

- El comando `npm run start` inicia el servidor de node en modo producción.
- El comando `npm run dev` inicia un servidor con livereload.
- El comando `npm run e2e` se corren pruebas e2e para verificiar el correcto funcionamiento de los endpoints.
- El comando `npm run seed:random` corre un carga de datos inicial.


## Licencia

Este proyecto se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).

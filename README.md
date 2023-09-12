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
5. Cargar datos iniciales, con el comando `npm run seed:init`
6. Comprobar ambiente de desarrollo, con el comando `npm run dev`
7. Probar endpoints con Postman o Insomnia.

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

### Entidades

- User: Colección de usuarios


## Licencia

Este proyecto se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).

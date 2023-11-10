# Blog API

## Descripción del proyecto

Este proyecto es una pia de un blog, que permitirá a los usuarios, registrarse, iniciar sesión, subir post, comentar post, ver post, se podrá subir imagenes , ir al perfíl de un usuario. La aplicación está construida utilizando node.js, express y utiliza la baase de datos PostgreSQL para almacenar la información.

## Características principales
1. Crear Post
2. Subir imagenes
3. Registrar 
4. loguearse con un usuario
5. utiliza websockets para cuando de cree un post, este se emita a todos los clientes
6. Comentar Post
7. Eliminar Post
8. Actualizar Post

## Tecnologias utilizadas
1. express: Un framework minimalista de Node.js que facilita la creación de apicaciones web y APIs.
2. express-rate-limit: Middleware de express qie limita la cantidad de solicitudes que un cliente puede hacer en un periodo de tiempo especificado. Previene malware que haga demasiadas peticiones por unidad de tiempo.
3. firebase: Una platforma de desarrollo de aplicaciones móviles y web que proporciona herramientas para crear, mejorar y hacer crecer aplicaciones
4. postgreSQL. un ssistema de gestón de bases de datos realciones de código abierto
5. sequelize: un ORM (object -relational Mapping) para bases de datos SQL que simplifica la interacción con la base de datos y proporciona una capa de abstración SQL
6. jsonwebtokens:  JWT (JSON web token) esun estandad que esta dentro del documento RFC 7519.
7. socket.io. Libreria que nos ayuda en la comuniación en tiempo real.

## Requisitos previos pra utilizar el proyecto
1. Tener node instalado en el equipo
2. Tener postgreSQL instalado
3. Tener creada una base de datos ne postgreSQL
4. Tener una instancia de firabase creada con almacenamiento en firestore

## Como ejecutar el proyecto
1. Clonar el repositorio
2. Ejecutar
```
npm install
```
 3. crearse la base de datos local con portgreSQL
4. Crearse una app de firebase e inicializar firestore
5. clonar el .env.template y renombrarlo
6. llenar las variables de entorno
7. instalar nodemon como dependencia de desarrollo
8. levantar el modo de desarrollo utilizando el comando:
```
npm run start:dev
```
 
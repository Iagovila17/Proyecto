Instalación y Ejecución Local
Para ejecutar el proyecto en tu entorno local, sigue los siguientes pasos:

1. Requisitos Previos
Asegúrate de tener instalado lo siguiente:

Java Development Kit (JDK) 17 o superior
Node.js (LTS) y npm
(Tu Base de Datos, ej: MySQL) o Docker si usas un contenedor.
2. Configuración del Backend
Clona el repositorio:
Bash

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio/backend
Configura tu base de datos y actualiza el archivo src/main/resources/application.properties (o application.yml) con tus credenciales.
Properties

spring.datasource.url=jdbc:mysql://localhost:3306/nombre_de_tu_base_de_datos
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=update # O 'create' si es la primera vez
# Configura aquí las credenciales de PayPal si es necesario
Compila y ejecuta la aplicación Spring Boot:
Bash

./mvnw spring-boot:run # Para Maven
# o si usas Gradle
./gradlew bootRun # Para Gradle
El backend estará disponible en http://localhost:8080 (o el puerto configurado).
3. Configuración del Frontend
Navega al directorio del frontend:
Bash

cd ../frontend
Instala las dependencias:
Bash

npm install
# o si usas Yarn
yarn install
Inicia la aplicación React:
Bash

npm run dev
# o si usas Yarn
yarn dev
El frontend se abrirá en http://localhost:5173 (o el puerto indicado por Vite).

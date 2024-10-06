# Imagen base de Node.js
FROM node:16-alpine

# Crear directorio de trabajo
WORKDIR /programas

# Copiar package.json y package-lock.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto 5000
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]

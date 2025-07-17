# Stage 1: Build-Umgebung mit Node.js
# Hier wird die React-App gebaut.
FROM node:20-alpine AS builder

# Arbeitsverzeichnis im Container setzen
WORKDIR /app

# package.json und package-lock.json kopieren, um Dependencies zu installieren
COPY package*.json ./

# Alle Abhängigkeiten installieren
RUN npm install

# Den gesamten Quellcode der App kopieren
COPY . .

# Die Produktions-Build der React-App erstellen
# Hierbei werden die statischen HTML-, CSS- und JS-Dateien im Ordner /app/build erzeugt.
RUN npm run build


# Stage 2: Produktions-Umgebung mit Nginx
# Hier werden die gebauten Dateien von einem schlanken Webserver ausgeliefert.
FROM nginx:stable-alpine

# Die gebauten Dateien aus dem "builder"-Stage in das Nginx-Verzeichnis kopieren
COPY --from=builder /app/build /usr/share/nginx/html

# Die benutzerdefinierte Nginx-Konfiguration kopieren, um React-Router zu unterstützen
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Den Port 80 freigeben, auf dem Nginx standardmäßig läuft
EXPOSE 80

# Den Befehl zum Starten des Nginx-Servers definieren
CMD ["nginx", "-g", "daemon off;"]

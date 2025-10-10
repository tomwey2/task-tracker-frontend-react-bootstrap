# Schritt-für-Schritt-Anleitung
Um die React-Anwendung in einem Docker-Container laufen zu lassen, müssen zwei Dateien im Hauptverzeichnis des Projekts erstellt werden: Dockerfile und nginx.conf.

## Schritt 1: Dockerfile erstellen
Das Dockerfile ist die Bauanleitung für Ihr Docker-Image. Es enthält einen sogenannten "Multi-Stage-Build". Das bedeutet, dass zuerst eine Umgebung mit Node.js erstellt wird, um die App zu bauen, und kopieren dann die fertigen, statischen Dateien in ein sehr schlankes Webserver-Image. Dadurch wird das finale Image klein und sicher.

## Schritt 2: Nginx-Konfiguration erstellen
Da es sich bei der Anwendung um eine Single-Page-Application (SPA) handelt, muss der Webserver so konfiguriert werden, dass er bei jeder Anfrage (z.B. bei einem Neuladen der Seite unter /project/123) immer die index.html ausliefert. React-Router übernimmt dann die Anzeige der richtigen Komponente.

## Schritt 3: Docker-Image bauen
Im Hauptverzeichnis des Projekts (wo sich das Dockerfile befindet) den folgenden Befehl ausführen. Dieser Befehl liest das Dockerfile und baut ein Image mit dem Namen task-tracker-frontend.

    docker build -t task-tracker-frontend .

(den Punkt . am Ende nicht vergessen. Er gibt an, dass der aktuelle Ordner der Kontext für den Build ist.)

## Schritt 4: Docker-Container starten
Nachdem das Image erfolgreich gebaut wurde, kann einen Container daraus gestartet werden.

    docker run -d -p 8080:80 --name mein-task-tracker task-tracker-frontend

## Was bedeuten die Befehle?
- docker run: Startet einen neuen Container.
- -d: Startet den Container im "detached" Modus (im Hintergrund)
- -p 8080:80: Leitet den Port 8080 Ihres Servers auf den Port 80 innerhalb des Containers um. Die Anwendung kann jetzt im Browser unter http://DEINE_SERVER_IP:8080 aufgerufen werden.
- --name mein-task-tracker: Gibt dem Container einen leicht wiedererkennbaren Namen.
- task-tracker-frontend: Der Name des Images, das verwendet werden soll.

## Wichtiger Hinweis: API-URL für die Produktion
Die React-App muss wissen, unter welcher URL das Backend-API auf dem Server erreichbar ist. In der Entwicklung verwenden Sie wahrscheinlich http://localhost:PORT. Für die Produktion müssen Sie die echte Server-URL verwenden.

Der beste Weg, dies zu tun, ist die Verwendung von Umgebungsvariablen in React. Erstellen Sie eine Datei namens .env.production im Stammverzeichnis Ihres Projekts und fügen Sie die URL hinzu:

    REACT_APP_API_URL=http://api.deine-domain.de/api

Wenn Sie nun npm run build ausführen (was im Dockerfile passiert), wird React diese Variable verwenden. In Ihrem Code greifen Sie darauf mit process.env.REACT_APP_API_URL zu.

Die Auswahl passiert automatisch durch `react-scripts`, das Build-Skript, das von Create React App verwendet wird. Es funktioniert so:

1.  **`npm start`**: Dieser Befehl startet den Entwicklungsserver. `react-scripts` setzt hierbei die Umgebungsvariable `NODE_ENV` auf `'development'`. Dadurch wird die `.env.development` Datei geladen. Dieser Befehl startet die Anwendung lokal.

2.  **`npm run build`**: Dieser Befehl erstellt die Produktions-Version deiner App. `react-scripts` setzt `NODE_ENV` auf `'production'`. Dadurch wird die `.env.production` Datei geladen. Dieser Befehl steht so im Dockerfile.

Diese Logik ist fest in `react-scripts` eingebaut. Du musst also nichts weiter konfigurieren.

# Instand Feed ein Newsticker mit Websockets und Notifikationen
# Einführung
In meiner Projektarbeit an der Hochschule Karlsruhe habe ich einen Newsticker programmiert, der als Referenz für den Einsatz von *neuen* Technologien. Dazu werden neue Nachrichten über Websockets an den Browser des Benutzers geschickt. Damit auch keine dieser Nachrichten verpasst werden, zeigt das Betriebssystem eine Benachrichtigung an.  
Da die Nachrichten ohne Verzögerung an den Nutzer weitergeleitet werden, wird die Webapplikation *InstantFeed* genannt.

Dabei habe ich mich um die Probleme gekümmert, die mich am meisten gestört haben. Ich nutze den Ticker von www.kicker.de um dort Fußballspiele zu verfolgen. Dabei sind Tuniere wie der DFB Pokal und auch Ligaspiel in meinem Interesse. Oftmals finden dabei mehrere Spiele gleichzeitig statt.

# Technologien
InstantFeed ist eine Client-Server Anwendung. Der Server ist dabei für die persistierung und Abfrage der Daten zuständig. Eingesetzt wird dazu ein Express web server. Dieser ist in Javascript geschrieben und läuft in Node.js. Die Daten speichert Express in der NoSQL Datenbank MongoDB. Auf der Frontendseite kommt AngularJs zum Einsatz.

## Probleme von herkömmlichen Newstickern
Viele Webseiten werden heute noch als statische Webseite ausgeliefert, die nach dem laden keine weitere Interaktion mit dem Server vornimmt. Dabei wird man oft nicht über neue Nachrichten in einem Feed informiert. Somit ist ein neuladen der Webseite nötig um diese auf Neuerungen zu überprüfen.  
Durch das ständige laden einer Webseite werden neben den neuen Daten auch viele alte Daten erneut vom Server abgefragt und geladen. Dieser Vorgang erhöht die Netzauslastung unnötig.

Bei mehreren parallelen Spielen müssen die verschiedenen Feeds in unterschiedlichen Tabs geöffnet werden. Die Mögichkeit mehrere, ausgewählte Feeds in einen zu Mischen ist auch nicht gegeben. Das Problem der unnötig geladen Daten ist dabei für jeden einzelnen Tab vorhanden. Somit multipliziert sich das Problem für jeden Feed der vorfolgt werden soll.  
Durch mehrere Feeds in verschiedenen Tabs sind gegebenfalls Tabs im Hintergrund und Änderung in diesen werden verpasst. Dies kann soll durch ein Benachrichtigung des Betriebssystem gelöst werden.


## Lösungen
Die Lösungen für die Probleme aus dem letzten Abschnitt werden im Folgenden erläutert. Dabei wird immmer die Blickwinkel von der Webapplikation InstantFeed aus sein. Zuerst werden Websockets erklärt. Dann werden die Desktopnotifikationen erklärt. Zum Abschluss gehe ich auf die personalisierte Feeds eingehen.

### Websockets
* longpulling
* Server -> Client Communikation
* HTTP overhead (TCP)
* Bilder HTTP
* Listener mit callback


### Notifications
* Desktopnotifikationen
* Berechtigung


### User defined Feeds
* Abfrage zu topics
* Clientseitige filter vor Websocket Nachrichten
* Speicherung im Local Storage

## Fazit


## Ausblick
* Eingehende Nachrichten
* Notifications einstellbar

## Anhang
https://github.com/KordonDev/InstantFeed  
https://nodejs.org/  
expressjs.com  
mongoosejs.com  
https://angularjs.org/

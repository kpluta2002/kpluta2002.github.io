const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');

const app = express();

// Ustawienie kluczy VAPID
const vapidKeys = {
    publicKey: 'BD4h0kDPs4timAR7AaOoKkJKPV2HueOnYwb3vBeXMHrIW4XTs8Z-z-I2xOqZ0Wd47BeZQ4gKn21X1U3S6eMSvV4',
    privateKey: 'VHAL6AQ_cVpEn_WJyxXVNugZW5dQypfCdrf-MRnMcw0'
};

webPush.setVapidDetails(
    'mailto:kpluta@edu.cdv.pl', // Twoje dane kontaktowe (np. email)
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

app.use(bodyParser.json());

// Endpoint do subskrypcji
app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    // Można tu zapisać subskrypcję do bazy danych

    res.status(201).json({});

    // Wysyłanie powiadomienia do subskrybenta
    const payload = JSON.stringify({ title: 'Nowa zawartość', body: 'Zobacz nasze nowe kotki!' });

    webPush.sendNotification(subscription, payload)
        .catch(err => {
            console.error("Błąd podczas wysyłania powiadomienia: ", err);
        });
});

// Uruchomienie serwera
const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});

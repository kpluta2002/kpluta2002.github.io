window.onload = () => {
    'use strict';
    if ('Notification' in window && 'serviceWorker' in navigator) {
        // Rejestracja service workera
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('Service Worker zarejestrowany:', registration);
    
            // Zapytaj użytkownika o zgodę na otrzymywanie powiadomień
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log('Zgoda na powiadomienia udzielona.');
    
                    // Uzyskaj subskrypcję
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: 'BD4h0kDPs4timAR7AaOoKkJKPV2HueOnYwb3vBeXMHrIW4XTs8Z-z-I2xOqZ0Wd47BeZQ4gKn21X1U3S6eMSvV4'
                    }).then(subscription => {
                        console.log('Subskrypcja:', subscription);
    
                        // Wyślij subskrypcję do serwera
                        fetch('/subscribe', {
                            method: 'POST',
                            body: JSON.stringify(subscription),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(response => {
                            if (response.ok) {
                                console.log('Subskrypcja wysłana do serwera');
                            }
                        }).catch(err => {
                            console.error('Błąd podczas wysyłania subskrypcji:', err);
                        });
                    }).catch(err => {
                        console.error('Błąd podczas subskrypcji:', err);
                    });
                } else {
                    console.log('Użytkownik odmówił zgody na powiadomienia');
                }
            });
        }).catch(err => {
            console.error('Błąd podczas rejestracji service workera:', err);
        });
    }
};
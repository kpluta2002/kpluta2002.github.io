const webPush = require('web-push');

// Wygenerowanie kluczy VAPID
const vapidKeys = webPush.generateVAPIDKeys();

console.log("Public VAPID Key:", vapidKeys.publicKey);
console.log("Private VAPID Key:", vapidKeys.privateKey);

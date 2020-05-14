firebase.initializeApp({
    apiKey: "AIzaSyDz4E7cWDIMedScuc4TvGdEawhWGOLn4SQ",
    authDomain: "class-royale.firebaseapp.com",
    databaseURL: "https://class-royale.firebaseio.com",
    projectId: "class-royale",
    storageBucket: "class-royale.appspot.com",
    messagingSenderId: "670502096879",
    appId: "1:670502096879:web:d06e9f32378e0296fbf01a",
    measurementId: "G-F4CZ8W9P2B"
});

var db = firebase.firestore();
var cards = db.document("cards/cards");
var games = db.collection("games");
var users = db.collection("users");
var emails = db.collection("emails");

var storage = firebase.storage().ref();
var cardThumbnails = storage.child('card_thumbnails')

function addCard() {
    var name = document.getElementById("cardName").textContent;
    var type = document.getElementById("cardType").textContent;
    var description = document.getElementById("cardDescription").textContent;
    var rarity = document.getElementById("cardRarity").textContent;
    var thumbnail = document.getElementById("cardThumbnail");

    var seed = Math.round(Math.random());

    switch (rarity) {
        case "Common":
            if (["Person", "Normal"].includes(type)) {

            }
            break;
        case "Normal":
            if (["Person", "Normal"].includes(type)) {

            }
            break;
        case "Rare":
            if (["Person", "Normal"].includes(type)) {

            }
            break;
        case "Ultra Rare":
            if (["Person", "Normal"].includes(type)) {

            }
            break;
        case "Legendary":
            if (["Person", "Normal"].includes(type)) {

            }
            break;
        case "Mythical":
            break;
    }

    var HP = 0;
    var attackDamage = 0;

    TODO("Use rarity to generate HP and attackDamage");

    cards.collection(type).doc(name).get().then(function (doc) {
        if (!doc.exists) {
            cards.collection(type).doc(name).set({
                name: name,
                HP: HP,
                type: type,
                description: description,
                rarity: rarity,
                level: 0,
                attackDamage: attackDamage,
                XP: 0,
                xpToLevelUp: 1000
            }).then(function() {
                console.log("Successfully added card ${name} of type ${type}!");
                return alert("Successfully added card ${name} of type ${type}!");
            }).catch(function (e) {
                console.log(e);
                return alert("Error occurred! Please contact a developer!");
            });
        } else {
            console.log(`Card ${name} of type ${type} already exists.`);
            return alert(`Card ${name} of type ${type} already exists. Please try something else!`);
        }
    }).catch(function (e) {
        console.log(e);
        return alert("Error occurred! Please contact a developer!");
    });
}

function testGame(name1, name2) {
    emails.doc(name1).get().then(function (doc) {
        var uid = doc.data().uid;

        var gameDoc = games.doc();
        gameDoc.set({
            status: "PENDING",
            "user1": {
                "uid": uid,
                "name": name1
            }
        }).then(function () {
            console.log(`User ${name1} with uid ${uid} created game ${gameDoc.id}.`);
        });

        return gameDoc.id;
    }).then(function (gameId) {
        emails.doc(name2).get().then(function (doc) {
            var uid = doc.data().uid;

            games.doc(gameId).update({
                status: "CHECKING",
                ["queue." + uid]: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function () {
                var seconds = firebase.firestore.FieldValue.serverTimestamp().seconds * 1000;
                console.log(`User ${name2} with uid ${uid} joined queue for game ${gameId} at ${seconds}.`);
            });
        });
    });
}

function startGame(name) {
    emails.doc(name).get().then(function (doc) {
        var uid = doc.data().uid;

        var gameDoc = games.doc();
        gameDoc.set({
            status: "PENDING",
            user1: {
                uid: uid,
                name: name
            }
        }).then(function () {
            console.log(`User ${name} with uid ${uid} created game ${gameDoc.id}.`);
        });
    });
}

function joinGame(gameId, name) {
    emails.doc(name).get().then(function (doc) {
        var uid = doc.data().uid;

        games.doc(gameId).update({
            status: "CHECKING",
            ["queue." + uid]: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function () {
            console.log(`User ${name} with uid ${uid} joined queue for game ${gameId} at ${firebase.firestore.FieldValue.serverTimestamp()}.`);
        });
    });
}
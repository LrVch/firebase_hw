const functions = require('firebase-functions');
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().fierbase)

exports.sendMessage = functions.firestore
  .document('prodacts/{productId}')
  .onCreate(event => {
    console.log('event', event._path);
    // const docId = event.params.productId
    // const name = event.data.data().name

    // const productRef = admin.firestore().collection('products').doc(docId)

    return Promise.resolve()

    // return productRef.update({message: `Nice ${name}! - Love Cloud Fonctions`})
  })



/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const cors = require("cors")({origin: true});

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books: ", error.message);
      res.status(500).send("Error counting books");
    }
  });
});
exports.capitalizeBookData = onDocumentCreated("books/{docId}", async (event)=>{
  try {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }
    const bookData = snapshot.data();
    const docRef = snapshot.ref;
    // Capitalizing the data
    const capitalizedTitle = bookData.name.toUpperCase();

    // Updating the document with capitalized data
    await docRef.set({
      name: capitalizedTitle,
    }, {merge: true});

    console.log(`Document ${snapshot.id} updated with capitalized data`);
  } catch (error) {
    console.error("Error capitalizing book data: ", error.message);
  }
});

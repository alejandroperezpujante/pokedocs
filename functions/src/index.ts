import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});
import {algoliaIndex} from "./utils";
admin.initializeApp();


export const addPokemonToAlgolia = functions.region("europe-west1").firestore.document("pokemons/{pokemonId}")
    .onCreate(async (snap) => {
      const data = snap.data();
      const pokemonData = {userUid: data.userUid, name: data.name, sprite: data.sprite};
      const objectID = snap.id;
      algoliaIndex.saveObjects([{...pokemonData, objectID}]);
    });

export const UpdatePokemonInAlgolia = functions.region("europe-west1").firestore.document("pokemons/{pokemonId}")
    .onUpdate(async (snap) => {
      const data = snap.after.data();
      const pokemonData = {userUid: data.userUid, name: data.name, sprite: data.sprite};
      const objectID = snap.after.id;
      algoliaIndex.saveObjects([{...pokemonData, objectID}]);
    });

export const DeletePokemonInAlgolia = functions.region("europe-west1").firestore.document("pokemons/{pokemonId}")
    .onDelete(async (snap) => algoliaIndex.deleteObject(snap.id));

export const changeUserEmail = functions.region("europe-west1").https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const {newEmail, userUid} = req.body;

    if (!req.headers.authorization?.startsWith("Bearer ")) {
      res.status(401).send("An authorization header is required");
      return;
    }
    const idToken = req.headers.authorization?.split("Bearer ")[1];

    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken as string);
      const decodedUid = decodedIdToken.uid;
      if (decodedUid !== userUid) {
        res.status(403).send("Unauthorized");
        return;
      }
    } catch (error) {
      res.status(403).send("Unauthorized");
      return;
    }

    try {
      await admin.auth().updateUser(userUid, {email: newEmail});
      res.status(200).send("Email changed");
      return;
    } catch (error) {
      res.status(500).send(error);
      return;
    }
  });
});

export const changeUserPassword = functions.region("europe-west1").https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const {newPassword, userUid} = req.body;

    if (!req.headers.authorization?.startsWith("Bearer ")) {
      res.status(401).send("An authorization header is required");
      return;
    }
    const idToken = req.headers.authorization?.split("Bearer ")[1];

    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken as string);
      const decodedUid = decodedIdToken.uid;
      if (decodedUid !== userUid) {
        res.status(403).send("Unauthorized");
        return;
      }
    } catch (error) {
      res.status(403).send("Unauthorized");
      return;
    }

    try {
      await admin.auth().updateUser(userUid, {password: newPassword});
      res.status(200).send("Password changed");
    } catch (error) {
      res.status(500).send(error);
      return;
    }
  });
});

export const changeUserUsername = functions.region("europe-west1").https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const {newUsername, userUid} = req.body;

    if (!req.headers.authorization?.startsWith("Bearer ")) {
      res.status(401).send("An authorization header is required");
      return;
    }
    const idToken = req.headers.authorization?.split("Bearer ")[1];

    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken as string);
      const decodedUid = decodedIdToken.uid;
      if (decodedUid !== userUid) {
        res.status(403).send("Unauthorized");
        return;
      }
    } catch (error) {
      res.status(403).send("Unauthorized");
      return;
    }

    try {
      await admin.auth().updateUser(userUid, {displayName: newUsername});
      res.status(200).send("Username changed");
    } catch (error) {
      res.status(500).send(error);
      return;
    }
  });
});
